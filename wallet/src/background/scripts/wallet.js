import {
  apiClient,
  passphrase,
  cryptography,
  transactions,
  codec,
} from "@liskhq/lisk-client";
import cryptojs from "crypto-js";
import client from "./client";
const Mnemonic = passphrase.Mnemonic;

const wallet = {
  lockWallet: function () {
    this.account = undefined;
    this.password = undefined;
    this.passphrase = undefined;
  },
  setPassword: function (password) {
    this.password = password;
  },
  createPassphrase: function () {
    this.passphrase = Mnemonic.generateMnemonic();
    return this.passphrase;
  },
  loadPassphrase: function (passphrase) {
    if (Mnemonic.validateMnemonic(passphrase)) {
      this.passphrase = passphrase;
      return this.saveWallet();
    } else {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  },
  saveWallet: function () {
    const encryptedPassphrase = cryptojs.AES.encrypt(
      this.passphrase,
      this.password
    ).toString();
    const self = this;
    return new Promise((resolve) => {
      chrome.storage.local.set(
        { passphrase: encryptedPassphrase },
        function () {
          const { privateKey, publicKey } =
            cryptography.getPrivateAndPublicKeyFromPassphrase(self.passphrase);
          const binaryAddress = cryptography.getAddressFromPassphrase(
            self.passphrase
          );
          const address = cryptography.getLisk32AddressFromPassphrase(
            self.passphrase
          );
          self.account = {
            passphrase: self.passphrase,
            privateKey,
            publicKey,
            binaryAddress,
            address,
          };
          resolve();
        }
      );
    });
  },
  unlockWallet: function (password) {
    let self = this;
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["passphrase"], function (result) {
        let passphrase = cryptojs.AES.decrypt(
          result.passphrase,
          password
        ).toString(cryptojs.enc.Utf8);
        if (Mnemonic.validateMnemonic(passphrase)) {
          const { privateKey, publicKey } =
            cryptography.getPrivateAndPublicKeyFromPassphrase(passphrase);
          const binaryAddress =
            cryptography.getAddressFromPassphrase(passphrase);
          const address =
            cryptography.getLisk32AddressFromPassphrase(passphrase);
          self.account = {
            passphrase: passphrase,
            privateKey,
            publicKey,
            binaryAddress,
            address,
          };
          resolve(true);
        } else {
          reject();
        }
      });
    });
  },
  haveWallet: function () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["passphrase"], function (result) {
        if (result.passphrase !== undefined) resolve(true);
        else reject();
      });
    });
  },
  createPassword: function (password) {
    this.password = password;
  },
  isLocked: function () {
    return this.account === undefined;
  },
  getAccount: function () {
    let self = this;
    return new Promise((resolve) => {
      client
        .getAccount(this.account.address)
        .then((data) => {
          let accountData = self.account;
          accountData.balance = data.summary.balance;
          accountData.network = client.network;
          resolve(accountData);
        })
        .catch(() => {
          let accountData = self.account;
          accountData.balance = "0";
          accountData.network = client.network;
          resolve(accountData);
        });
    });
  },
  sendLSK: function (recipientAddress, amount) {
    let self = this;
    return new Promise((resolve) => {
      if (recipientAddress.startsWith("lsk")) {
        recipientAddress =
          cryptography.getAddressFromLisk32Address(recipientAddress);
      }
      client.getAccount(self.account.address).then((data) => {
        let transaction = transactions.signTransaction(
          {
            $id: "lisk/transfer-transaction",
            title: "Transfer transaction asset",
            type: "object",
            required: ["amount", "recipientAddress", "data"],
            properties: {
              amount: {
                dataType: "uint64",
                fieldNumber: 1,
              },
              recipientAddress: {
                dataType: "bytes",
                fieldNumber: 2,
                minLength: 20,
                maxLength: 20,
              },
              data: {
                dataType: "string",
                fieldNumber: 3,
                minLength: 0,
                maxLength: 64,
              },
            },
          },
          {
            moduleID: 2,
            assetID: 0,
            fee: BigInt(500000),
            nonce: BigInt(data.sequence.nonce),
            senderPublicKey: Buffer.from(this.account.publicKey, "hex"),
            asset: {
              amount: BigInt(transactions.convertLSKToBeddows(amount)),
              recipientAddress: Buffer.from(recipientAddress, "hex"),
              data: "send token",
            },
          },
          client.networkIdentifier,
          self.account.passphrase
        );
        const encodedAsset = codec.codec.encode(
          {
            $id: "lisk/transfer-transaction",
            title: "Transfer transaction asset",
            type: "object",
            required: ["amount", "recipientAddress", "data"],
            properties: {
              amount: {
                dataType: "uint64",
                fieldNumber: 1,
              },
              recipientAddress: {
                dataType: "bytes",
                fieldNumber: 2,
                minLength: 20,
                maxLength: 20,
              },
              data: {
                dataType: "string",
                fieldNumber: 3,
                minLength: 0,
                maxLength: 64,
              },
            },
          },
          transaction.asset
        );
        let encodedTransaction = codec.codec.encode(
          {
            $id: "lisk/transaction",
            type: "object",
            required: [
              "moduleID",
              "assetID",
              "nonce",
              "fee",
              "senderPublicKey",
              "asset",
            ],
            properties: {
              moduleID: { dataType: "uint32", fieldNumber: 1, minimum: 2 },
              assetID: { dataType: "uint32", fieldNumber: 2 },
              nonce: { dataType: "uint64", fieldNumber: 3 },
              fee: { dataType: "uint64", fieldNumber: 4 },
              senderPublicKey: {
                dataType: "bytes",
                fieldNumber: 5,
                minLength: 32,
                maxLength: 32,
              },
              asset: { dataType: "bytes", fieldNumber: 6 },
              signatures: {
                type: "array",
                items: { dataType: "bytes" },
                fieldNumber: 7,
              },
            },
          },
          {
            ...transaction,
            asset: encodedAsset,
          }
        );
        client
          .sendTransaction(encodedTransaction.toString("hex"))
          .then(resolve);
      });
    });
  },
};
export default wallet;

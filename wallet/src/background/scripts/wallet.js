import {
  apiClient,
  passphrase,
  cryptography,
  transactions,
} from "@liskhq/lisk-client";
import cryptojs from "crypto-js";
import config from "../configs/config";
const Mnemonic = passphrase.Mnemonic;

const wallet = {
  init: function () {
    let self = this;
    this.network = "privatenet";
    apiClient.createWSClient(config.networks[this.network]).then((client) => {
      self.client = client;
    });
  },
  lockWallet:function(){
    this.account = undefined;
    this.password = undefined;
    this.passphrase = undefined;
  },
  changeNetwork: function (net) {
    let self = this;
    console.log(config);
    return new Promise((resolve) => {
      apiClient.createWSClient(config.networks[net]).then((client) => {
        self.client = client;
        self.network = net;
        resolve();
      });
    });
  },
  setPassword: function (password) {
    this.password = password;
  },
  createPassphrase: function () {
    this.passphrase = Mnemonic.generateMnemonic();
    return this.passphrase;
  },
  loadPassphrase: function (passphrase) {
    console.log(passphrase);
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
          console.log(self.account);
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
    return new Promise((resolve) => {
      this.client.account
        .get(this.account.binaryAddress)
        .then((accountInfo) => {
          console.log(accountInfo);
          let accountData = this.account;
          accountData.balance = accountInfo.token.balance.toString();
          resolve(accountData);
        })
        .catch(() => {
          let accountData = this.account;
          accountData.balance = "0";
          resolve(accountData);
        });
    });
  },
  sendTransaction: function (recipientAddress, amount) {
    if (recipientAddress.startsWith("lsk")) {
      try {
        recipientAddress =
          cryptography.getAddressFromLisk32Address(recipientAddress);
      } catch (e) {
        return new Promise((resolve, reject) => {
          reject();
        });
      }
    }
    return new Promise((resolve) => {
      this.client.account.get(this.account.binaryAddress).then((account) => {
        this.client.transaction
          .create(
            {
              moduleID: 2,
              assetID: 0,
              fee: BigInt(500000),
              nonce: account.sequence.nonce,
              asset: {
                amount: BigInt(transactions.convertLSKToBeddows(amount)),
                recipientAddress: Buffer.from(recipientAddress, "hex"),
                data: "send token",
              },
              senderPublicKey: Buffer.from(this.account.publicKey, "hex"),
            },
            this.account.passphrase
          )
          .then((transaction) => {
            this.client.transaction.send(transaction).then(resolve);
          });
      });
    });
  },
};
export default wallet;

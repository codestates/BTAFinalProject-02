/*global chrome*/
const {
  passphrase,
  cryptography,
  apiClient,
  transactions,
} = require("@liskhq/lisk-client");
const cryptojs = require("crypto-js");

apiClient.createWSClient("ws://34.125.144.144:9000/ws").then((client) => {
  client.account
    .get("2ab00e25cc7f4c4764da1c97b0eefd13550c30d4")
    .then(console.log);
});

const { Mnemonic } = passphrase;
let mnemonic;
let password;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  trySwitch(request, sendResponse);
});

async function trySwitch(request, sendResponse) {
  switch (request.type) {
    case "setPassword":
      password = cryptojs.SHA256(request.password).toString();
      sendResponse({ success: "success" });
      break;

    case "createMnemonic":
      mnemonic = Mnemonic.generateMnemonic();
      sendResponse({ mnemonic });
      break;

    case "setWalletHash":
      if (request.mnemonic) {
        mnemonic = request.mnemonic;
      }
      const walletString = password + mnemonic;
      const hashedPassword = cryptojs.SHA256(walletString).toString();

      const result1 = await setHashLocalStorage(hashedPassword);
      const result2 = await setPublicKeyLocalStorage();

      const total = await Promise.all([result1, result2]);
      console.log(total);
      sendResponse({ result: "success" });
      break;

    default:
      break;
  }
}

function setHashLocalStorage(hashedPassword) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ hash: hashedPassword }, () => {
      resolve("success");
    });
  });
}

function setPublicKeyLocalStorage() {
  return new Promise((resolve, reject) => {
    const key = cryptography.getPrivateAndPublicKeyFromPassphrase(mnemonic);
    chrome.storage.local.set(
      { publicKey: key.publicKey.toString("hex") },
      () => {
        resolve("success");
      }
    );
  });
}

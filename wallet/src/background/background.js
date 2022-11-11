/*global chrome*/
const { passphrase, apiClient, transactions } = require("@liskhq/lisk-client");
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
      password = request.password;
      sendResponse({ success: "success" });
      break;

    case "createMnemonic":
      mnemonic = Mnemonic.generateMnemonic();
      sendResponse({ mnemonic });
      break;

    case "walletEncrypt":
      if (request.mnemonic) {
        mnemonic = request.mnemonic;
      }
      const encrypted = cryptojs.AES.encrypt(mnemonic, password).toString();

      const result1 = await setHashLocalStorage(encrypted);

      await Promise.all([result1]);
      sendResponse({ result: "success" });
      break;

    case "walletDecrypt":
      const bytes = cryptojs.AES.decrypt(request.encrypted, request.password);
      const decrypted = bytes.toString(cryptojs.enc.Utf8);
      mnemonic = decrypted;

      sendResponse({ result: "success" });
      break;

    default:
      break;
  }
}

function setHashLocalStorage(hashedPassword) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ encrypted: hashedPassword }, () => {
      resolve("success");
    });
  });
}

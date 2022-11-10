/*global chrome*/
const passphrase = require("@liskhq/lisk-passphrase");

export function setMnemonicCode() {
  const { Mnemonic } = passphrase;
  const mnemonic = Mnemonic.generateMnemonic();

  chrome.storage.local.set({ mnemonic }, () => {
    console.log("OK!");
  });
}

export function getMnemonicCode() {
  return new Promise((resolve) => {
    chrome.storage.local.get("mnemonic", (res) => {
      resolve(res.mnemonic);
    });
  });
}

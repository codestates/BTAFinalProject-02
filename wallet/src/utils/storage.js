/*global chrome*/

export function setPassword(password) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: "setPassword", password }, (res) => {
      resolve(res.success);
    });
  });
}

export function getMnemonicCode() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: "createMnemonic" }, (res) => {
      resolve(res.mnemonic);
    });
  });
}

export function setWalletHash(mnemonic) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: "setWalletHash", mnemonic }, (res) => {
      console.log("=== 결과 ===");
      console.log(res);
      resolve(res);
    });
  });
}

export function getWalletHash() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("hash", (res) => {
      resolve(res.hash);
    });
  });
}

export function getPublicKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("publicKey", (res) => {
      resolve(res.publicKey);
    });
  });
}

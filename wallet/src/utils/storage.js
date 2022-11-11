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

export function walletEncrypt(mnemonic) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: "walletEncrypt", mnemonic }, (res) => {
      resolve(res);
    });
  });
}

export function walletDecrypt(password) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("encrypted", (res) => {
      chrome.runtime.sendMessage(
        { type: "walletDecrypt", encrypted: res.encrypted, password },
        (res) => {
          resolve(res);
        }
      );
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

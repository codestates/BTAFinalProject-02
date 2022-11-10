/*global chrome*/
const passphrase = require("@liskhq/lisk-passphrase");

export function setPublicKey() {
  const { Mnemonic } = passphrase;
  const mnemonicCode = Mnemonic.generateMnemonic();

  chrome.storage.local.set(
    {
      mnemonicCode,
    },
    () => {
      console.log("OK!");
    }
  );
}

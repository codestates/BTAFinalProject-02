/*global chrome*/
import wallet from "./scripts/wallet";
wallet.init();
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request) {
    trySwitch(request, port);
  });
});

async function trySwitch(request, port) {
  console.log(request);
  switch (request.type) {
    case "setPassword":
      wallet.setPassword(request.password);
      port.postMessage({ type: "setPassword", result: true });
      break;

    case "createPassphrase":
      let passphrase = wallet.createPassphrase();
      port.postMessage({ type: "createPassphrase", passphrase });
      break;

    case "saveWallet":
      wallet
        .saveWallet()
        .then(() => {
          port.postMessage({ type: "saveWallet", result: true });
        })
        .catch(() => {
          port.postMessage({ type: "saveWallet", result: false });
        });
      break;

    case "loadPassphrase":
      wallet
        .loadPassphrase(request.passphrase)
        .then(() => {
          port.postMessage({ type: "loadPassphrase", result: true });
        })
        .catch(() => {
          port.postMessage({ type: "loadPassphrase", result: false });
        });
      break;

    case "unlockWallet":
      wallet
        .unlockWallet(request.password)
        .then(() => {
          port.postMessage({ type: "unlockWallet", result: true });
        })
        .catch(() => {
          port.postMessage({ type: "unlockWallet", result: false });
        });
      break;

    case "haveWallet":
      wallet
        .haveWallet()
        .then(() => {
          port.postMessage({ type: "haveWallet", result: true });
        })
        .catch(() => {
          port.postMessage({ type: "haveWallet", result: false });
        });
      break;

    case "isLocked":
      port.postMessage({ type: "isLocked", isLocked: wallet.isLocked() });
      break;

    case "getAccount":
      wallet.getAccount().then((account) => {
        port.postMessage({ type: "getAccount", account: account });
      });
      break;

    case "sendTransaction":
      wallet
        .sendTransaction(request.recipientAddress, request.amount)
        .then(() => {
          port.postMessage({ type: "sendTransaction", result: true });
        })
        .catch(() => {
          port.postMessage({ type: "sendTransaction", result: false });
        });
      break;

    case "changeNetwork":
      wallet
        .changeNetwork(request.net)
        .then(() => {
          port.postMessage({ type: "changeNetwork", result: true });
        })
        .catch(() => {
          port.postMessage({ type: "changeNetwork", result: false });
        });
      break;

    case "lockWallet":
      wallet.lockWallet();
      port.postMessage({ type: "lockWallet", result: true});
      break;

    default:
      break;
  }
}

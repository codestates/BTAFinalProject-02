/*global chrome*/
import wallet from "./scripts/wallet";
import client from "./scripts/client";

client.init();
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request) {
    trySwitch(request, port);
  });
});

async function trySwitch(request, port) {
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
        port.postMessage({ type: "changeNetwork", network: account.network });
      });
      break;

    case "sendLSK":
      wallet
        .sendLSK(request.recipientAddress, request.amount)
        .then(() => {
          port.postMessage({ type: "sendLSK", result: true });
        })
        .catch((e) => {
          console.log(e);
          port.postMessage({ type: "sendLSK", result: false });
        });
      break;

    case "changeNetwork":
      client
        .changeNetwork(request.net)
        .then(() => {
          port.postMessage({ type: "changeNetwork", network: request.net });
          wallet.getAccount().then((account) => {
            port.postMessage({ type: "getAccount", account: account });
          });
        })
        .catch(() => {
          port.postMessage({ type: "changeNetwork", newtwork: request.net });
        });
      break;

    case "lockWallet":
      wallet.lockWallet();
      port.postMessage({ type: "lockWallet", result: true });
      break;
    case "getCurrentNet":
      port.postMessage({ type: "getCurrentNet", network: client.network });
      return;

    default:
      break;
  }
}

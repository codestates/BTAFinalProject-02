/*global chrome*/

const port = chrome.runtime.connect();

port.onMessage.addListener(function (msg) {
  if (msg.type === "setPassword") callbacks.setPassword(msg.result);
  else if (msg.type === "createPassphrase")
    callbacks.createPassphrase(msg.passphrase);
  else if (msg.type === "saveWallet") callbacks.saveWallet(msg.result);
  else if (msg.type === "unlockWallet") callbacks.unlockWallet(msg.result);
  else if (msg.type === "haveWallet") callbacks.haveWallet(msg.result);
  else if (msg.type === "isLocked") callbacks.isLocked(msg.isLocked);
  else if (msg.type === "getAccount") callbacks.getAccount(msg.account);
  else if (msg.type === "loadPassphrase") callbacks.loadPassphrase(msg.result);
  else if (msg.type === "sendLSK") callbacks.sendLSK(msg.result);
  else if (msg.type === "changeNetwork") callbacks.changeNetwork(msg.network);
  else if (msg.type === "lockWallet") callbacks.lockWallet(msg.result);
  else if (msg.type === "getCurrentNet") callbacks.getCurrentNet(msg.network);
});

let callbacks = {};

export function setPassword(password, callback) {
  callbacks.setPassword = callback;
  port.postMessage({ type: "setPassword", password });
}

export function createPassphrase(callback) {
  callbacks.createPassphrase = callback;
  port.postMessage({ type: "createPassphrase" });
}

export function saveWallet(callback) {
  callbacks.saveWallet = callback;
  port.postMessage({ type: "saveWallet" });
}

export function unlockWallet(password, callback) {
  callbacks.unlockWallet = callback;
  port.postMessage({ type: "unlockWallet", password });
}

export function haveWallet(callback) {
  callbacks.haveWallet = callback;
  port.postMessage({ type: "haveWallet" });
}

export function isLocked(callback) {
  callbacks.isLocked = callback;
  port.postMessage({ type: "isLocked" });
}

export function getAccount(callback) {
  callbacks.getAccount = callback;
  port.postMessage({ type: "getAccount" });
}

export function loadPassphrase(passphrase, callback) {
  callbacks.loadPassphrase = callback;
  port.postMessage({ type: "loadPassphrase", passphrase });
}

export function sendLSK(recipientAddress, amount, callback) {
  callbacks.sendLSK = callback;
  port.postMessage({ type: "sendLSK", recipientAddress, amount });
}

export function changeNetwork(net, callback) {
  callbacks.changeNetwork = callback;
  port.postMessage({ type: "changeNetwork", net });
}

export function lockWallet(callback) {
  callbacks.lockWallet = callback;
  port.postMessage({ type: "lockWallet" });
}

export function getCurrentNet(callback) {
  callbacks.getCurrentNet = callback;
  port.postMessage({ type: "getCurrentNet" });
}

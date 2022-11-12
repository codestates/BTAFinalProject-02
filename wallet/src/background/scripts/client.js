import {
  apiClient,
  passphrase,
  cryptography,
  transactions,
} from "@liskhq/lisk-client";
import cryptojs from "crypto-js";
import config from "../configs/config";

const io = require("socket.io-client");

const client = {
  network: "privatenet",
  endpoint: config.networks.privatenet,
  init: function () {
    this.request("get.network.status").then((answer) => {
      this.networkIdentifier = Buffer.from(
        answer.result.data.networkIdentifier,
        "hex"
      );
    });
  },
  changeNetwork: function (net) {
    return new Promise((resolve) => {
      this.network = net;
      this.endpoint = config.networks[this.network];
      this.request("get.network.status").then((answer) => {
        this.networkIdentifier = Buffer.from(
          answer.result.data.networkIdentifier,
          "hex"
        );
        resolve();
      });
    });
  },
  request: async function (method, params) {
    let self = this;
    return new Promise((resolve) => {
      const socket = io(self.endpoint, {
        forceNew: true,
        transports: ["websocket"],
      });

      socket.emit("request", { jsonrpc: "2.0", method, params }, (answer) => {
        socket.close();

        resolve(answer);
      });
    });
  },
  getAccount: function (address) {
    return new Promise((resolve) => {
      this.request("get.accounts", { address }).then((answer) => {
        resolve(answer.result.data[0]);
      });
    });
  },
  sendTransaction: function (transaction) {
    let self = this;
    return new Promise((resolve) => {
      const socket = io(self.endpoint, {
        forceNew: true,
        transports: ["websocket"],
      });
      socket.emit(
        "request",
        {
          jsonrpc: "2.0",
          method: "post.transactions",
          params: {
            transaction: transaction,
          },
        },
        (answer) => {
          socket.close();
          resolve(answer);
        }
      );
    });
  },
};
export default client;

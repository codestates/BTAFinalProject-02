console.log("1")
const passphrase = require('@liskhq/lisk-passphrase')
const transactions = require("@liskhq/lisk-transactions")
const {apiClient} = require("@liskhq/lisk-client")
apiClient.createWSClient("ws://34.125.144.144:9000/ws").then(client=>{
    client.account.get("2ab00e25cc7f4c4764da1c97b0eefd13550c30d4").then(console.log)
})
console.log("1")

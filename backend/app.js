require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const transactionRouter = require("./routes/transaction");
const blockRouter = require('./routes/block')
const accountRouter = require('./routes/account')
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');
const app = express();


const {PORT, MONGO_URI} = process.env;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description:
                "",
        },
        servers: [
            {
                url: "http://34.125.144.144:4500",
            },
        ],
    },
    apis: [
        "./routes/account.js",
        "./routes/block.js",
        "./routes/transaction.js"
    ],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.use(express.json());
app.use(cors())
mongoose.Promise = global.Promise;


// CONNECT TO MONGODB SERVER
mongoose
    .connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.use("/transactions", transactionRouter);
app.use("/blocks", blockRouter);
app.use("/accounts", accountRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

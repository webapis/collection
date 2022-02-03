require('dotenv').config()
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { launchOptions } = require('./puppeteerOptions')
const puppeteer = require("puppeteer");

BeforeAll(async function () {

    //Initialize puppetteer
    global.browser = await puppeteer.launch(launchOptions);

    
})

Before(async function () {

        global.page = await global.browser.newPage()
        await global.page.setViewport({
            width: 1200,
            height: 1250,
            deviceScaleFactor: 1,
        });
        const clnt = await client.connect()
        const collection = clnt.db("ecom").collection("collection2023");
        const response = await collection.insertOne({ greeting: "hello" })
        clnt.close()
 
})

After(async function () {
    debugger
    await global.page.close()
})
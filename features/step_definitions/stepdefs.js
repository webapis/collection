const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const fs = require('fs');



Given('website is visited', { timeout: 250000 }, async function () {
  await global.page.setRequestInterception(true);
  global.page.on('request', req => {
    const url = req._url
    const resourceType = req.resourceType();

    const body = fs.readFileSync(`${process.cwd()}/V5691AZ_21AU_GN262_01_02.jpg`)
    if (url.includes('atlas')) {
      // const data = fs.readFileSync(`${process.cwd()}/mockData/data.json`)

      // req.respond({
      //   status: 200,
      //   contentType: 'application/json',
      //   body: data
      // });
  
      req.continue();
    } else
      if (resourceType === 'image') {

        req.respond({
          status: 200,
          contentType: 'image/jpeg',
          body
        });

      } else {
        req.continue();
      }
  });
  await global.page.goto('http://localhost:8888')
  await global.page.waitForSelector('.p-component')
  debugger;
});


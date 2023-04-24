const expect = require("chai").expect;
const webhook = require("../webhook");
//Skipped over the requirement of using dialogflow by saving a dummy request in test folder
//We assume that the request sent by dialogflow to be in correct form
const request = require("./fulfillment-request.json");
const fetch = require("node-fetch");

//Test for webhook to work properly (status 200) and return 3 links
it("Should Return 3 links", async () => {
  await fetch("http://localhost:8080/dialogflow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(request),
  })
    .then((res) =>
      res.json().then((data) => ({ status: res.status, body: data }))
    )
    .then((obj) => {
      expect(obj.status).to.equal(200);
      expect(obj.body.payload.richContent[0].length).to.equal(3);
    });
});

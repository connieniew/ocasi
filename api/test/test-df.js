const expect = require("chai").expect;
const uuid = require("uuid");
const dialogflow = require("dialogflow");

const projectId = "ocasi-qjhidr";
const sessionId = uuid.v1();
const credentials = {
  client_email: "dialogflow-xvwlon@ocasi-qjhidr.iam.gserviceaccount.com",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXzefMmQi7pjsN\nH/OrXofj/G4W2ng8YfK+Dfl/ZZXeVNf30FAcfKUurd85KfOYyQNl+e4echgTa2aM\ng+jkykVul8lHMj9ZcNxMkxc4piK2DE1xgwpaeWcZw9wSvRoP43GAlGP3I+GOhOIl\n3U+qJDDgUGkaswECwUNiPDCoQzdjdhmLttqRgIN6kZ0fZDBEWApw5C+1TMwkyjxo\nhjZy5wj86u2L3ZIFgeMkpB978XrMUDZOIo+YnudxbwY+jGM4nRcxYA5MLlnAUM3F\nW1ksULKU5dIXb5WLD1ox0YLEAZexaVh1Ffepszb+FHk/tl8JxatUUi+T3Ux+1UyK\nDwU0zxVNAgMBAAECggEAHFYzuUhg/q7hsyP+bYKwqk2jsQmH3znnU3BnUgSnTLXs\nU+R9GHh/giUfmhR5oZbHhPTwAPxvT+F66jmJ87zhqBdzPQ+KhPaOXtmzo2MhTLFJ\n2/1edynY0WfH9ofxK6Psa/tQMwv5mqq1PU6Vntw4tMOqQXC+0btJ21TW+Mk2tS73\nh84eEr+6bBrQ4YEDd2BwzvW56KqpagwqIieEpQuuBsA3A3cKPWLEFIIzH8LJTH3d\nf7CPKd0BB1eo15wkCnR4bGM1eAz1Wg7BsN/Y5ZrISmCmbrxgmrW6nBQAb3S14Nog\nAhkgOK0ibLfDlI7Gt7oo1H/ltxqGko2f961ExHyUgQKBgQDvg7i4CEZglBe25oBi\nryTusgN7DzWLCHwHpykcNvrWOFSCJWHAhFot5i5/T0XhOVqSQ0YsmeZMjsNMmHwD\nNI3pa+NHElzcjurp4NY9h9Yow75ENrfl7SX8Oe/SoXE9RjQFLoVXmJBNuYlTO4O7\nMR/CZZo+vj56Poz0Al9kylKsDQKBgQDmqGgaNeDAisjSgR9FYgj+dhUU5ynUbvG6\nTSWgrh3+uaILFaA5bszXq2trA+ccHeE4Amkdrvm6Pq1TfA9I5gNXsPEz8tc7vveu\nB3zy50nMdq0sxHogXFndtrbhMQCdILQK9ymVBXMUhr43uNWfl5eKKge0alcm8Ueh\nmRjCWe9+QQKBgA1Oex+2Tfqln5+otK9G3b1pJGpc0PO1d/aQ4ebQYyUtofxNCV5B\nvCTaqfCmvdIidpazqB1oO3Q7ZjxGKHWhINU8CjdznLcgNYri0+Q9PLetEFAH3jWm\n9DpMGbfRAlKOKOu0xvGz5yh6S1fVcZ8fvoz1Shl8RkpSWVBhJV2bI/atAoGBAJLO\nPPPxtsrVilvwsuaGLxNGNMTJHGaI9nGNCJXsPEsT+37ylLf5PYdHI2dJZJ8QpXfw\nkNbDt05C9i5cl53eR+JYTCy0MyljsmChg3VWoDHyluYXZ2ORY+EpmdxaQ/m+Btmz\n1lNy1HwMBqWQjua0pU7a0WyTAkVW7DB+MLQCadwBAoGAXCHm5U+nOfKN0fiL8x6m\nRZOAKlhPwDcs9gbZsPNAf44H18Xuv9A5GPFYM6acKjYApFR6nUTSOhcH/IH/S4Qb\nrw9Qz7qAQ/XGApjVvepj/sLBs4k9pJAP9z3BhdP9KhZj7+BkJ88/AdVqhp70n2bV\nAvwWKwfJXlK/STjYVuMeP94=\n-----END PRIVATE KEY-----\n",
};
const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

//To run test, simply run npm test on terminal with api folder as root directory

//Simple response from hello
it("Should Return Welcome Intent", async () => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: "hello",
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  //Test if intent is detected
  console.log("Detected intent");
  const result = await responses[0].queryResult;
  //Test if the answer is correct
  expect(result.fulfillmentText).to.equal(
    "Hey there! I'm ready to answer any questions you have about post-immigration to Canada!"
  );
});

//test using part of keyword or slight misspell
it("Should Return Canada Resume Intent", async () => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "resume",
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = await responses[0].queryResult.intent;
  expect(result.displayName).to.equal("Canadian Resume");

  const request2 = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "Canada Resum",
        languageCode: "en-US",
      },
    },
  };

  const responses2 = await sessionClient.detectIntent(request2);
  const result2 = await responses2[0].queryResult.intent;
  expect(result2.displayName).to.equal("Canadian Resume");
});

//Test using different word that have the same meaning as the keyword
it("Should Return COVID Info Intent", async () => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "covid",
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = await responses[0].queryResult.intent;
  expect(result.displayName).to.equal("COVID info");

  const request2 = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "coronavirus",
        languageCode: "en-US",
      },
    },
  };

  const responses2 = await sessionClient.detectIntent(request2);
  const result2 = await responses2[0].queryResult.intent;
  expect(result2.displayName).to.equal("COVID info");
});

//Test showing different intent even though there is similar word
it("Should Return Correct Intent on Work", async () => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "work hours",
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = await responses[0].queryResult.intent;
  expect(result.displayName).to.equal("Overtime Hours of Work");

  const request2 = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "I want to find work",
        languageCode: "en-US",
      },
    },
  };

  const responses2 = await sessionClient.detectIntent(request2);
  const result2 = await responses2[0].queryResult.intent;
  expect(result2.displayName).to.equal("WorkSearchingIntent");

  const request3 = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "write off work from home expenses",
        languageCode: "en-US",
      },
    },
  };

  const responses3 = await sessionClient.detectIntent(request3);
  const result3 = await responses3[0].queryResult.intent;
  expect(result3.displayName).to.equal("Work From Home Expenses");
});

//Test Followups
it("Should Return OHIP follow up intent", async () => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "ohip",
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = await responses[0].queryResult.intent;
  expect(result.displayName).to.equal("How to get OHIP");

  const request2 = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "no",
        languageCode: "en-US",
      },
    },
  };

  const responses2 = await sessionClient.detectIntent(request2);
  const result2 = await responses2[0].queryResult.intent;
  expect(result2.displayName).to.equal("How to get OHIP - no");

  const request3 = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "yes",
        languageCode: "en-US",
      },
    },
  };

  const responses3 = await sessionClient.detectIntent(request3);
  const result3 = await responses3[0].queryResult.intent;
  expect(result3.displayName).to.equal("How to get OHIP - yes");
});

//Test returning Fallback Intent if no match can be found
it("Should return Default Fallback Intent", async () => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "scam",
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = await responses[0].queryResult.intent;
  expect(result.displayName).to.equal("Default Fallback Intent");
  expect(result.isFallback).to.equal(true);

  const request2 = {
    session: sessionPath,
    queryInput: {
      text: {
        text: "tree",
        languageCode: "en-US",
      },
    },
  };

  const responses2 = await sessionClient.detectIntent(request2);
  const result2 = await responses2[0].queryResult.intent;
  expect(result2.displayName).to.equal("Default Fallback Intent");
  expect(result2.isFallback).to.equal(true);
});

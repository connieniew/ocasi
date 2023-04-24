const express = require('express')
const { WebhookClient, Payload, Platforms } = require('dialogflow-fulfillment')
const app = express()
const google = require('googleapis').google
const progSearch = google.customsearch('v1')
const credentials = require('./google-search.json')

app.use(express.static('static'));

app.post('/dialogflow', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  let intentMap = new Map()
  intentMap.set('Default Fallback Intent', getSearchResults)
  agent.handleRequest(intentMap)
})

app.get('/', (req, res) => {
    res.send('Files served!');
});

async function getSearchResults(agent) {
    const query = agent.query
    await progSearch.cse.list({
        key: credentials.apiKey,
        q: query,
        cx: credentials.searchEngineId,
        num: 3
    }).then((result) => {
        agent.add("I didn't quite get that, here are some popular links related to your question:")
        let payload = {
            "richContent": [
              []
            ]
          }
        result.data.items.map((item) => {
              payload.richContent[0].push({
                "type": "button",
                "text": item.title,
                "icon": {
                  "type": "chevron_right",
                  "color": "#FF9800"
                },
                "link": item.link
              })
        });
        agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}))
        agent.add("was that helpful?")
        return Promise.resolve(agent);
    }).catch((err) => {
        console.log(err)
        agent.add("I didn't quite get that, could you re-word your question?")
    })

}

app.listen(process.env.PORT || 8080)

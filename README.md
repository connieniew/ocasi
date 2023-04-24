
# OCASI - Team 2

## Description 
 
Our chatbot is trained to answer user questions by using the frequently asked questions on settlement.org. The chatbot returns popular answers based on the question it was asked. The purpose of the chatbot is to help streamline the search process that users have to go through when they visit settlement.org. The chatbot combines the google search bar on the front page, the various FAQs within the site, popular articles and the forum questions. Having a chatbot on the home page that can give popular answers and resources would help users avoid navigating through the site to answer a specific concern of theirs. The chatbot also can find resources and answers using keywords, which is helpful for users (most of which are new settlers to Ontario) if english is not their first language.

## Key Features

The most important feature of the application is responding to questions asked by the user. To do this, we used DialogFlow as the base for our chatbot. We trained our chatbot to respond to questions pertaining to popular articles found on [settlement.org](https://settlement.org/) and the first few results displayed to their discussion forum. The chatbot returns a clickable link that will take them to an appropriate article/ discussion forum relevant to their question. Using DialogFlow intents, we took questions from settlement.org and reworded them to use as training phrases for our chatbot. Thus when our chatbot receives a question, it will attempt to use DialogFlow’s NLP to match it to one of our intents, and the intent will return a response back.

Another feature of our chatbot is the followup after the user asks a question and we have returned a link. Our intents ask the user if the link that we provided them is relevant to what they were looking for. In the event that it is not, then we provide them with an alternative link where they can search on [settlement.org](https://settlement.org/) themselves.

The last feature our chatbot has happens in the event where a user asks the chatbot a question that we can not match to any of our intents. We provide a fallback intent that will be used in this scenario, where we use a webhook to perform a custom google search on [settlement.org](https://settlement.org/) and return the top 3 results that match the search phrase. We used Node and Express for this webhook.

The former 2 features of our chatbot were ones that we decided to implement given that we were lacking communication between our project partners (OCASI). These are assumptions that we made because we think these features can be helpful to the users of the chatbot.

## Instructions

The Heroku deployment can be found with this link: [https://csc301-ocasi.herokuapp.com/](https://csc301-ocasi.herokuapp.com/)

The chatbot was created so that it can be hosted on any webpage. For this section, we will assume that the user has accessed this chatbot from the homepage of settlement.org.

On the homepage of settlement.org, there is an icon on the bottom right.
![Homepage Chatbot Icon](https://i.imgur.com/YDYB6EL.png)

To open the chatbot, click in the icon. 

To test the chatbot popular articles response, type in a question such as "I lost my drivers license"
![Asking a Question](https://i.imgur.com/yr7e4Fw.png)
The results will have a clickable link which will take you to the resource related to the question.

The chatbot has asked if the result was helpful. To test the chatbot follow-up, type in "no" or "yes". Depending on your answer the chatbot will either return an affirmation if "yes" or a link to the discussion board if "no".
![Follow-up to No](https://i.imgur.com/ltsh1S2.png)

 To test the custom google search result, type in a question or keyword that does not match a current intent such as "scam".
 ![Default Intent Search](https://i.imgur.com/yXBoWbv.png)
The custom search also has follow-ups as mentioned above.

To exit the chatbot click on the "x" button in the bottom right corner (the same spot where the chatbot icon was to open the chatbot)
 
 ## Development requirements
Note that the API key in google-search.json is specifically for our DialogFlow project. If you would like to use a different project, generate your API key and replace it in the file.

The custom search engine can also be changed by replacing your search engine id in the google-search.json file.

If you are using your own DialogFlow chatbot, you must also replace the chatbot UI script in the index.html file which renders the dummy page and chatbot. If you would like to use the chatbot in an actual website, remember to use your own chatbot UI script which can be found in the DialogFlow console under Integrations.

This codebase uses javascript, Node.js, Express, Chai and Mocha.To set up the codebase, first clone the repository. In your terminal go to the repository and install all dependencies using npm install. Run this command again in the directory labelled api.

To run your changes locally, in your terminal go to the api directory and run the command npm run tunnel. This will locally serve ngrok which exposes your local server to the internet. After you have run this command copy the generated url and paste it into your DialogFlow fulfillment console. This will allow DialogFlow to use your local server to call the webhook. With ngrok still running, in a different terminal go to the api directory and run node webhook.js. This will locally host the webhook as well as the html dummy webpage.

To view your changes in the chatbot and webpage, go to localhost:8080 (or whichever port if you have specified it to be something else).

### About Unit Testing

To run or modify the unit tests you must have Mocha and Chai frameworks available. The tests can be run with the command "npm test" in the api directory. The tests for DialogFlow and the webhook have been separated in the repository. Unit testing DialogFlow is mainly done by checking for the correct response when the user gives an input. If you have decided to modify DialogFlow intents or if you are running your own DialogFlow project, these tests must be updated. By using the DialogFlow API, we can test DialogFlow responses and intents without going through the frontend code.

For testing webhook responses, we used the fetch method (Node.js requires the ‘node-fetch’ package to use fetch). By using a dummy fulfillment request that is copied from a test in DialogFlow, we take away the dependency of the webhook unit test on DialogFlow. Since the webhook uses google custom search, the returning result and link might change depending on their popularity at the time. Therefore, we tested for a status 200 and 3 links returned for response instead. Since the number of custom searches that can be used per day is limited, we kept the webhook unit test to be one test only.

 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * What deployment tool(s) are you using and how

Our workflow consisted of updating other group members over messenger for new code and branches as well as pull requests (PRs). Unfortunately, we were not able to assign multiple people in PRs in GitHub. Instead, we would post in our group chat that a PR was available or to check-out and test a branch we worked on. Then group members would test that everything works and then give the go ahead for the owner to merge the PR. Much of our PRs were created while the group was having our update/check-ins which made the process faster.

Our coding process involved members individually (sometimes in pairs/groups for debugging) completing tasks that were decided upon during our planning. During the coding process and before creating a PR, we would test our changes locally so that we can check that the app works and passes tests before deployment. To do this we locally hosted the webhook and html webpage using Node.js and to connect our locally hosted webhook to DialogFlow fulfillment we used ngrok to expose our local server to the internet. After locally testing, we would then go through the PR process outlined above. When the PR is merged, it is passed on to the CI/CD process by Git Actions, our chosen CI/CD technology, which runs tests and then deploys to Heroku, which hosts our app. After deployment, we would then check our production changes.

For CI/CD we are using GitActions. We chose GitActions because it is connected to GitHub directly and no deployment is need like Jenkins. Our partners didn’t specify any required CI/CD so we used the simplest to implement. We also chose GitActions because a good portion of the team members has used it to deploy to Heroku, our hosting technology, which would make the process of setting up CI/CD much faster than using a new technology. Additionally, we only need to host a dummy webpage that will hold the chatbot and a webhook so there were no overly complicated integrations that we had to consider. We used “connect to Github” function in Heroku for first 3 attempts of CD, yet we have multiple folders under our main Github repo, and Heroku does not deploy properly. These failed attempts were showed under the activity log in the Environment button on the repo’s main page. We switched to using a workflow file to configure GitActions. The actions are triggered when a pull request is merged to master. We decided not to trigger the actions on every push to master because ideally, no one should be able to push their code to master. All code should be added to master though merging after peer reviews. When a pull request is merged, tests will run. If tests pass, the app is deployed using Heroku CLI. Below is an image of the automatic deployments on Heroku: 
![Deployments Image](https://i.imgur.com/S3j2JC0.png)

 ## Licenses 

Since our partner has not yet specified a license, we will choose to not have one. Without a license, the codebase is under exclusive copyright. We chose to do this since we didn’t want to risk the codebase being modified and distributed in the case our partners wanted it to be private. The repository for the codebase is currently private and much of the chatbot is in DialogFlow so we don’t expect not having a license as something that will be a problem for now.


  

  

  

# OCASI Chatbot Team 2

  

  

  

>  _Note:_ This document is meant to evolve throughout the planning phase of your project. That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration.

  

  

  

>  **This document will serve as a master plan between your team, your partner and your TA.**

  

  

  

## Product Details

  

  

  

#### Q1: What are you planning to build?

  

  

A chatbot on the front page of immigration support website that can give an answer or point to appropriate resources that a user is looking for when they enter a question about settlement/immigration in Canada. This chatbot will be an extension of an already existing website: [https://settlement.org/](https://settlement.org/) .

  

  

OCASI: Ontario Council of Agencies Serving Immigrants is an organization that supports newcomers to Canada with disabilities, mental health issues, youths, LGBTQ+ and others. For example how would you help someone who has gone through gender based violence? They give resources on topics as such, by coordinating with immigrant-serving agencies. Their homepage: [https://ocasi.org/](https://ocasi.org/).

  

  

OCASI has a large forum on [https://settlement.org/](https://settlement.org/) for new settlers in Canada to discuss any inquiry or worries about their new settlement. This forum has been manually moderated since 2000 but many repeat questions (eg. What should I do when I lose my PR card?) appear. Settlers who come into the forum may also not know exactly what they're looking for and may be overwhelmed with the many topics on the forum (eg. The topic of citizenship consists of many situations, such as getting a PR card, what services are available for new settlers, deadlines for immigration application form, services for refugees). A chatbot would be able to filter repeat questions by detecting keywords and providing the appropriate resources. The chatbot would also be able to suggest topics that an inquiring user would need help with. Some sensitive questions that newcomers may find too hard to ask on a forum can also be handled by the chatbot. (For example, someone who has gone through discrimination or violence, would be able to trigger the chatbot’s resources for help with the keywords “discrimination”, “violence”)

  

  

The chatbot will be situated on a corner of the site where the user can see, and they can click an icon to open it up. After the chatbot opens up, the user will be prompted with some starter topics. The user will select their topic and begin typing their question. The chatbot would detect what kind of question they are asking (by finding keywords) and providing the appropriate response/resources.

  

  

Below is an example of Virgin Mobile's chat with an agent system, which we will follow as a template. As soon as the user clicks "let's chat" on the right of the screen, the chatbot pops up with topics they can choose from. In our context, the topics would consist of but won't be limited to: Immigration and Citizenship, Housing, Health, Employment, Education, Other. After choosing the topic, the user will be able to type in their question, and the chatbot will give the appropriate response. If the question is not comprehensible, the chatbot will ask the user to type in the question again. A user who is inquiring about their PR card would click the "Immigration and Citizenship" topic and type in the question "What should I do if I lost my PR card?".

  

  

-  ![Front Page](https://i.imgur.com/7z2B9sc.jpg)

  

  

-  ![Topic Select](https://i.imgur.com/OkQvVkL.jpg)

  

  

-  ![Chat Bot](https://i.imgur.com/o5yGZpN.jpg)

  

  

#### Q2: Who are your target users?

  

Our target users are recent immigrants, settlers and possible settlers to Ontario who have questions left unanswered by the IRCC (Immigration, Refugees and Citizenship Canada). These settlers range from well-educated and skilled workers who require information about transferring certifications, youth looking for citizenship processes and eligibility, and refugees. One example of our target users:

  

  

![https://i.imgur.com/sbcMfRG.png](https://i.imgur.com/sbcMfRG.png)

  

Another example:

![https://i.imgur.com/lB9Qzvt.png](https://i.imgur.com/lB9Qzvt.png)

  

#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

  

  

While the IRCC can help new settlers, many settlers still have questions about settling in Ontario. OCASI provides further help to these people through settlement.org. OCASI has observed that many people do not check previously asked questions before they ask a question on the forum. It was also noted that many users have similar questions which can be answered by one of the various resources available on the site. The chatbot streamlines this Q&A process by essentially directing user questions/keywords to previously answered forum questions or a popular resource. The forum has 15 years of discussion which can be beneficial as their questions have likely been answered before.

  

  

### Benefits of the chatbot:

  

*  **Save users time**

  

Calling OCASI, searching or asking on the forum might take minutes to several hours. With the chatbot, users only need a few seconds to type a question and wait for it to provide the search result. If no desired forum page or resource is returned, the chatbot can direct users to the forum itself or contact information.

  

*  **Allow users to discover new information**

  

A large amount of data has accumulated in the forum during 15 years of discussion. Letting the chatbot search for the users may return different results or posts they missed.

  

*  **A smaller language barrier**

  

New settlers oftentimes do not have perfect english. Making a phone call might be stressful, and they might not understand. Using a chatbot gives them the opportunity to translate words they do not know.

  

  

  

#### Q4: How will you build it?

  

  

Our technology stack will include Drupal and .NET as they are used by our partners for the website we will be adding the chatbot to. While most of the site currently uses .NET our partners are making a transition to Drupal and so we will be mainly working with this framework. Drupal is written in PHP and .NET can be written in many languages but the site employs JavaScript. Since we will be mostly working with Drupal, we will use a modularity/component based architecture for our chatbot.

  

A simple diagram: ![https://i.imgur.com/nEAcPVR.png](https://i.imgur.com/nEAcPVR.png)

  

  

Our deployment will be automated by a CI/CD tool. We will use Github Actions for this project. This tool is integrated with GitHub repository so no additional sites and accounts are needed. It has a variety of pre-made workflow templates that can be used, which allows writing the workflow faster and easier. We also have considered Circle CI since it supports a variety of APIs and is scalable for cross platform. However, since our project is a modification to a pre-built website, it does not require the variety Circle CI provides. GitLab is also a valid choice we have considered, since it has a good visualization of the workflows and provides a variety of support features like Circle CI. However, we think that what Github Actions provides is enough for our project, and the ability to check code and workflow at the same place provides an easier development environment.

  

  

Each push and merge will be tested with unit tests (not sure which yet, since we don’t know the details about the testing structure), which will be automated and included as a step in our CI/CD workflow. For testing in production, we will use canary deployment, which deploys our project to a subset of users. This allows us to test our project on live production traffic, and can easily roll back to the previous version if the new version has problems. A/B deployment is also considered, since it is similar to canary deployment, but the subset of users that is tested has some specific conditions (eg. HTTP header or geolocation). However, our project’s new functionality is tailored towards all users rather than users under specific conditions. Therefore, we think that a biased test environment is not desired.

  

  

#### Q5: What are the user stories that make up the MVP?

  

  

1. As a current immigrant renter who doesn’t have the best English, I would like to know what my tenant rights are as a renter so I can avoid having my rights infringed.

  

* Acceptance Criteria: Chatbot should use auto-correct and be able to work with keywords that do not have perfect phrasing.

  

2. As an OCASI member, I want to be able to update the information the chatbot gives so that it’s always up to date.

  

* Acceptance Criteria: There should be an way to edit the chatbot’s responses.

  

3. As a current immigrant who only has a phone who wants to return back to my home country, I want to know what will happen if I do so so I can avoid negative consequences.

  

* Acceptance Criteria: Chatbot should also work on mobile devices.

  

4. As someone who recently got a work visa to Canada and is planning to move there, I wish to know what I should do before I leave my current country so that I don’t get blindsided upon arrival in Canada.

  

* Acceptance Criteria: When the user types in a keyword/question into the chatbot, it should respond with the relevant information based on the keywords typed in.

  

5. As a Permanent Resident who is not the best with computers, I want to know more about how the Ontario healthcare system works so that I know what my OHIP Card covers.

  

* Acceptance Criteria: Chat Icon should be clearly visible on the front page and easy to use for those who are not the best with technology.

  

  

----

  

  

  

  

## Process Details

  

  

  

  

#### Q6: What are the roles & responsibilities on the team?

  

  

##### Roles:

  

  

  

Roles of the team include backend developer, frontend developer, product designer, sprint planner and partner liason. The backend developer and frontend developers will work to implement features in their respective stack. The product designer's main role is to create rough and finished drawings of the UI. The sprint planner will be responsible for keeping meeting minutes, ensuring that the sprint tasks and the work board is up to date and organized as well as checking task progress. The partner liason's role will be to relay messages, and updates to the partner as well as set meetings with the partner.

  

  

  

##### Member Roles:

  

  

###### Da Eun Chung (frontend developer, delivery planner):

  

  

Da Eun will work on anything needed on the frontend including but not limited to UI implementation. She will also be working as a delivery planner to keep meeting minutes, organize the work board, make sure tasks are up to date and checking to see if deadlines can be met. Her technical strengths include Swift, React.js and Objective C. Her weaknesses include Go, client-server protocols and backend development.

  

  

###### Elena Wang (frontend developer, product designer):

  

  

Elena will work on the frontend by helping with UI implementation and helping to connect to the backend. She will also help to design the UI for the chatbot, by creating mockups and diagrams. Her technical strengths include javascript (React.js), Python and C. Her technical weaknesses include databases, API’s and Go.

  

  

###### Ming Liu (frontend developer):

  

Ming will work on the frontend with UI implementation and make sure its consistency with the website. He will also work on the interaction between frontend and backend. His technical strength includes JavaScript, Python and Java. His weaknesses include swift, databases and backend development.

  

  

###### Benjamin Zhuo (back-end developer):

  

  

Benjamin will work on the back-end portion of the project. His technical strengths include Python, Java ,and C. His weaknesses include front-end development, and Javascript, and testing.

  

  

###### Shu-Shuan Wang (back-end developer):

  

  

Shu-Shuan will work on the back-end portion of the project. She has some experiences with Python, Java , C, and MS Azure on keywords extractions. She also has some experiences on CICD using Jenkins. Her weaknesses include frontend delopement, databases and debugging.

  

###### Hrithik Shukla (back-end developer):

Hrithik will work on the back-end portion of the project. His technical strengthes include Python, Java, SQL, and C. His weaknesses include APIs,  front-end development, and testing.

  

#### Q7: What operational events will you have as a team?

  

  

##### Planned Meetings:

  

  

We are planning to have weekly team meetings online to discuss our task progression, any blockers, and update the work board with future tasks. Some will be short to just provide updates, whereas others will be longer to plan the future tickets. During ticket planning we will plan the upcoming tasks, prioritize tasks, rate tasks on their complexity and assign tasks to members. Additionally we will have ad hoc check-ins and updates through Facebook messenger or Slack and code reviews and peer-programming when necessary. Our weekly team meeting will be on Thursday 10:00pm.

  

  

  

We will also have one meeting with our partners through Google Meets to ask questions regarding our MVP proposal and another meeting to review said proposal.

  

  

Update: We have had our first meeting with our partner, which is outlined below, but have yet to schedule a follow-up meeting to review our proposal. We will discuss reoccurring meetings with them during our follow-up meeting.

  

  

##### Past Meetings:

  

  

In our first partner meeting, we learned about OCASI, what they do, and discussed project expectations. We discussed the functionality of the chatbot, the users who will be using it and guidelines for the project. Our project partner just recently hired a new IT senior manager and therefore did not have all the technical details available for the project. It was decided that because of the upcoming deadline that the technical details would be sent to us and we would email them a draft of our proposal for review. If a meeting is required to review the proposal then it will be set at that time. For meeting minutes and actions items please see:

  

  

[OCASI Project Partner Meeting Minutes June 1st 2020](https://docs.google.com/document/d/1HllOooqjoHA7CKd4tXxgZFyvrRtwDw4CL6fRVZXAYXo/edit?usp=sharinghttp://  "OCASI Partner Meeting Minutes 01/06/2020")

  

  

  

#### Q8: What artifacts will you use to self-organize?

  

  

  

##### Trello Board:

  

  

This will be used to create task tickets, assign priority of the ticket, assign complexity of the ticket (to estimate how long the ticket will take) as well as the team member(s) who will be responsible for the ticket. The board will also track the progress from backlog to in-progress to done (the assignee will move this task through the flow). The board will also be used as a hub for documents and other resources the team will work on and need access to. To view the board please go see: [Trello Board Invite CSC301](http://https://trello.com/invite/b/of8tqGlu/5418fcd1a30429d629c61e710c603f22/csc301  "Trello Board Invite CSC301")

  

  

  

##### Ticket planning & Meeting minutes:

  

  

The tasks on the Trello board will be discussed, planned and assigned during ticket planning. By referring to meeting minutes the delivery planner will then create the task ticket and add to the board. Prioritization and ticket estimation will be done through team discussions and tasks will be assigned by role and/or if a member would like to work on it.

  

  

  

Trello Board: This will be used to create task tickets, assign priority of the ticket, assign complexity of the ticket (to estimate how long the ticket will take) as well as the team member(s) who will be responsible for the ticket. The board will also track the progress from backlog to in-progress to done (the asignee will move this task through the flow).

  

  

  

  

Sprint planning/Meeting minutes: The tasks on the Trello board will be discussed, planned and assigned during sprint planning. By referring to meeting minutes the sprint planner will then create the task ticket and add to the board. Prioritization and ticket estimation will be done through team discussions and tasks will be assigned by role and/or if a member would like to work on it.

  

  

  

  

#### Q9: What are the rules regarding how your team works?

  

  

##### Working Culture

  

  

Our working culture will focus mainly on how to meet deadlines and deliver our project while respecting people’s work habits during the current pandemic. Our team members have varying schedules (different time zone, full-time work, other courses) and so we do not expect immediate replies from each other and understand that while the project is important we may have other priorities. That being said, we will expect some team etiquette such as replying within a 12 hour window and informing members well beforehand if a blocker will delay work.

  

  

  

##### Communication:

  

  

We will communicate quick updates, issues, announcements and meeting set-up with team members either through Facebook messenger or Slack. The frequency will depend on upcoming deadlines. For longer communications like ticket planning or resolving a bug we will use Google meets to communicate. We will communicate with our partner through email when setting up meetings or providing brief updates and use Google meets to discuss or present anything that requires a lot of back and forth.

  

  

  

##### Meetings:

  

  

While we will try to accommodate all members, some team members may be busy or unavailable (work, classes, time-zone difference) during a meeting time, meeting minutes will be available for any members who missed a meeting to catch-up. Action items will be tasks in the work board and the progress of the action item will be updated by who is assigned to the task and monitored by the delivery planner. Members are encouraged to inform the team if they believe an action item will be difficult to complete before the deadline or if the completion time estimation for the task needs to be re-evaluated. From there the team will regroup to find a proper resolution.

  

  

  

##### Conflict Resolution:

  

  

Non-responsive members: As a team, we understand that members may be busy with other tasks. We will give members a 12 hour window (because of the time zone difference for some) to respond. If it is urgent we can try to contact them through various channels (Slack, Facebook, email). If non-responsiveness is a recurring issue and members feel blocked by it, then we will bring it up during our weekly meeting to resolve as a team.

  

  

  

1. Indecision: We will make decisions as a team, as such, we will take into consideration all opinions and options when making a decision. If there is indecision in the team we will present the options being considered and go through the pros and cons of each option to come to a conclusion.

  

  

  

2. Conflicting estimation for tickets: We will vote for ticket estimation and if there are conflicting estimates we can discuss the discrepancy. Much like planning poker we will vote at the same time and any conflicting estimates will be discussed.

  

  

  

3. Missed deadlines: As a team we will make and agree upon any deadlines for tickets and features. As long as members notify the team in advance that they may not be able to meet a deadline, we can help the member with their issue. If a member constantly misses deadlines we will bring it up during our weekly meeting to ask said member if there are any specific challenges that they are facing. If so, we can help the member overcome challenges and if it is out of our purview we will consult the TA for additional advice/resolution.

  

  

  

----

  

  

  

### Highlights

  

  

1. For our project, we decided to use kanban as opposed to scrum delivery method. While scrum does give us more structure with sprint planning, we were worried that we may need to continuously make changes to tasks and goals as we continue this project. We chose kanban because of the flexibility it gives us to set deadlines along the way, and it allows us to make changes to tasks during development. Additionally, team members were interested in switching roles throughout the project, which is more in line with kanban.

  

  

2. Another team process we decided on was weekly check-ins and ticket planning. We thought of doing a combination of daily check-ins, retrospectives, and delivery planning but due to individuals' schedules we thought that streamlining this process into one meeting per week would be a good start point. Any pressing updates will be done via Facebook messenger or Slack and larger tasks such as delivery planning will be done during the weekly meeting. As we don't yet know how much time we will need to put into check-ins, retrospectives and delivery planning, we will re-discuss any changes needed to our meeting schedule in the future.

  

  

3. When deciding how the chatbot will be displayed on the website our discussion with our partners led to a chatbot design much like on the virgin mobile website (see question 1). The chatbot will be displayed on the front page of the website before the user sees the frequently asked questions section or the forum section. We chose to show the chatbot on the home page so that users will be swayed to use the chatbot before trying to search for questions/answers in the forum and so that they will be exposed to the chatbot before asking a new question in the forum. The expectation is that if users see the chatbot before they get to the forum, they can get streamlined answers and resources and won't post an already existing question. A rough idea of where the chatbot will be placed:

  

  

![Imgur](https://i.imgur.com/rLJArZB.png)
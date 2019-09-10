# Frontend Skill Assessment
Welcome to the assignment for candidates applying for a frontend position at Falcon.io.

## Background
As part of the hiring process we're evaluating the candidate's technical capabilities through a simple skill assessment. The assessment is divided into several steps:

1) **Home assignment:** After being handed the skill assessment you will spend apprx. 5-10 hours at home preparing a solution following the brief described further down.
See section: [Home assignment](#home-assignment) to learn more about this step.

1) **Submission:** After you've submitted your result it will be evaluated by two or more members of the frontend team at Falcon.io. You'll typically hear back from us within a week unless communicated otherwise. See sections: [How to submit](#how-to-submit) and [How we evaluate](#how-we-evaluate) to learn more about the submission step.

2) **Workshop:** Depending on the outcome of the evalutation you'll be invited for an on-site _(or remote depending on your location and availability)_ workshop where we'll actively work with your solution, solidfying and extending it with features.
See section: [Workshop](#workshop) to learn more about this step.

3) **Final evaluation:** After the workshop we'll make a final evaluation on the process as a whole.
This will also be the final step of the hiring process. Unless communicated otherwise, we expect to return with feedback withing a work week.

## Home assignment
As per step 1 you're tasked with creating a prototype of a simple Task Manager application _(a.k.a. Todo app)_ using your framework (or none) of choice, Angular, React, Vue etc. It's up to you.

You add your solution in the `/client` folder including a `README.md` file.

Unless agreed otherwise, we expect the submission to be handed in within 10 days. The net amount of time expected on the assignment is ~5-10 hours.
If you, for any reason, estimate that you cannot finish the assignment within the timeframe please be communicative about an ETA.

### Business requirements
Below you find the business requirements for the application. 

**The result of your submission should cover the following use cases:**
A user should be able to...
1) create a task with a title and optional description
2) edit a task
3) delete a task
4) complete a task
5) see a list of tasks

### Technical requirements
At Falcon.io we use [Angular](https://angular.io/) as the main platform to build applications, however you're free to use any framework and libraries to implement the application, or even go vanilla.
The important thing is that you feel comfortable in solving the core tasks and can defend your choices and patterns in a potential workshop.

Regardless of your framework and library choices certain areas are expected to be address. These will be considered doing the evaluations:

1) You display modern best practices and good code hygiene.
2) You stay (as much as possible) within the provided API setup. Any deviations you can defend with objective arguments.
3) You follow Git practices and your commit history tells the story of how you iterated on the task.
4) The application meets accessibility standards.
5) The application is scalable, maintainable and pragmatic in its structure. Both on code and file level.
6) The application is built for testability, demonstrated by actual tests.
7) Complicated or non-obvious choices in the code must be supported by code-level comments.
8) The `README.md` must contain a brief _(a few lines)_ explanation of how you solved the task, as well as objective arguments for potential changes to the boilerplate.

Read more about how we evaluate your submission [here](#how-we-evaluate).

### API Layer
To support the development of the Task Manager we've provided a REST API layer implementing CRUD actions for a `task` resource. You can find the API layer in the folder `/server`.
It's important that you use this API to develop your solution as it will both ease the evaluation as well as creating a common ground for the workshop.

Read more about [how to work with the REST API here](/API_DOC.md)

## Workshop
Depending on the outcome of the evalutation you'll be invited for an on-site _(or remote depending on your location and availability)_ workshop where we'll actively work with your solution. More specifically you will, in collaboration with two members of our Frontend team, extend your solution with new features.

The workshop will apprx. take 3 hours and consists of initial briefing, hands-on development and conclusion.

At the workshop we will develop your solution with the following features (in order):

> ⚠️ **IMPORTANT:** It's important that you **do not** implement the following use cases in your solution prior to the workshop, e.g. as part of the home assigmment or otherwise. These features are reserved as part of the collaborative sessions during the workshop. You're of course welcome to consider _how_ you would implement them as well as bringing notes, ideas, questions etc. in preparation for the workshop.

**During the workshop the following use cases should be covered:**
A user should be able to...
1) setting priority of task
2) group tasks in multiple lists
3) experience realtime updates across browsers
4) use the application offline

More details about the format, use cases and content will be layed out at the initial briefing.

The goal of the workshop **is not** to work against the clock and test how much can be produced in 3 hours. The goal is to get a feel of how you work in a collaborative setting, how you approach and priorities feature development, how well you can leverage your knowledge and how you handle impediments and seek sparring.

## How to submit
You submit your result via a repo on GitHub.
Clone this repo and point the remotes to your own public repo and you should be good to go.

Make sure that you have a Git history with meaningful commits that tells the story of how you solved the task.
A single init commit (or similar) contaning the entire solution is highly discouraged and will prevent us from doing proper evaluation.

Make sure to provide guidance on how to run your solution in a `README.md`. Also use the this file to highlight if there are any particular aspects of your solution you want us to consider.

Make sure to fix the versions of any node_modules.
This will ensure that the runtime environments will match.
```
# AVOID
"some-package": "^0.3.1"

# GOOD
"some-package": "0.3.1"
```
Alternatively, you can create a Docker image holding the runtime environment.

> ⚠️ **IMPORTANT:** A static Zip/RAR file containing the solution is not considered a valid submission and will be disregarded.

Once you're ready to submit send link to the remote GitHub repo to **frontend-assignment@falcon.io**

## How we evaluate
When we evaluate your home assignemnt, before the onsite workshop, there are some main areas that we will weigh in:

#### Does your Git history reveal your workflow?
When taking a first look at your Git repo we assess how you've iterated on the task.
We do this by glancing through your Git commits. This will give us an idea of how you've priorised the work and how you've iterated on the development.
E.g. how are business critical vs. non-critical implementations balanced?
Therefore make sure that your commit messages provide specific context, e.g.:
```
# AVOID
some fixes

# GOOD
fix(list): fix issues with the tasks list
```

#### Does your solution work out-of-the-box?
Next, we read through your `README.md` and follow your instructions.
Did you add custom steps? Do they work? Or, does it requires manual debugging to get up and running?

#### To what degree are the accepteance criteria met?
Once everything is up and running, dev server, API etc., we open your solution in a browser and click around.
Does it work? Are the requirements met? If not, we ask "why" and seek for answers in `README.md` or code-level comments.

#### How does it work?
Provided that all of the acceptance criteria are up to standard, we start looking into how you implemented the solution.
I.e. How did you decide to structure the application? How is it architectured? How do you manage state in the application? How scalable is your application?
How performant is it? Which coding patterns and constructs do you utilise?
Where and how do you handle edge cases? What about error handling? Is it accessible?

#### How's the sense of quality?
While assessing the inner workings we also take a step back and look at the overall solution.
How is it crafted? Does it feel solid, yet simple, in its execution? Is it built using common sense and pragmatic thinking?
Is it well-tested? Is a good understanding of UX and application patterns applied?
Is there a coherent idea submerging from the code and structure? What's the level of code smells?
Are linting rules strictly followed?

Equally there are areas that will **NOT** weight heavily in our evaluation:

#### Visual design quality
We do not evaluate the overall visual look and feel.
We expect that your main focus is spend on developing and fine-tuning application logic.
We do, however, expect that you show an understanding of common UX patterns and best practices, and can make good use of these when making UI/UX decisions.

#### Timeframe
If nothing else is agreed, we expect the submission to be handed in within 10 days. However, we do not evaluate you on the time you spent on the assignment.
I.e. we do not count the days from when you received the assignment till you submit, neither do we consider time intervals between your Git commits.


---
Please direct any questions to **frontend-assignment@falcon.io**
Enjoy!

Kind regards,
The frontend team @ Falcon.io
****

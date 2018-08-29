# Performance Task

These tasks are oriented around creating an application that tracks user feedback on events that they have attended. Each tasks builds on the previous to build an increasingly complex view of event statistics.

Each task will be accomplished by implementing a stubbed function that takes predefined arguments. Each task is complete when it passes the provided testing suite. The results of tasks will also be displayed in a pre-built UI which invokes each of the stubbed functions.

## Guidelines
* Only edit `src/tasks.js`
* There is no need to modify the UI - you should not modify the tests or any other file!
* We are expecting this to be hard! Please ask for help if you are stuck. We are also assessing your ability to explain problems, solicit feedback, and pair program. Part of that assessment involves you asking for help when you need it.
* The following commands are provided
  * `yarn test` or `npm test`
    * Jest test runner that watches what files you edit and runs the appropriate tests
  * `yarn start` or `npm start`
    * Small React app that will provide a helpful ui for you to visualize what you are creating. Located at http://localhost:3000 or similar port

## Setup

__Requirements__
* node 6.9.2 or greater
* npm 3.10.9 or greater

To setup the environment install all dependencies. We've provided a yarn file for quicker setup.

- `yarn` or `npm install`

## Schema of data
> This is an overview of the data used in this performance task

Event
- Id
- Name

Rating
- EventId
- UserId
- Rating

User
- Id
- Username
- Name
- Groups (List of group names)

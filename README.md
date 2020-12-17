# Git-Food UI

## Overview
This repository includes the relevant code base used to deploy the UI on Heroku. 

**Deployed UI:** https://git-food-ui.herokuapp.com/

To find the complimentary back-end API code base, its deployment instructions, and deployment location, please visit the following repository: 

https://github.com/Git-Food/delivery

Please note that our application was bootsrapped using `create-react-app`. As such, we have supplied the default `create-react-app` readme at the bottom for reference.

## Relevant Project Documentation & Presentation

**Presentation:** Video linked [here](www.youtube.com)

All relevant Project documentation can be viewed in our sharepoint [Project Documentation Folder](https://northeastern.sharepoint.com/:f:/s/Fit/ElOVh2COQF1HiinugLhexDsBWroZ5DJ4_e9nemJrSCzguw?e=gizhMW). The Project Documentation Folder includes the following documents:
* Regular Meeting Notes
* Design Document
* UML Activity Diagram
* UML Class Diagram
* User Stories
* UI Wireframe

## Deployment Instructions:
1) [Clone repository](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
2) Decide whether to deploy to Heroku via [Heroku CLI & Git](https://devcenter.heroku.com/articles/git) or via [Github Integration](https://devcenter.heroku.com/articles/github-integration)
3) Using the Heroku CLI or the Heroku website, go the settings of the application and configure the following buildpack: https://github.com/mars/create-react-app-buildpack
4) Create a Firebase project
    * Set up Authentication
    * Enable Email/Password Sign-in as a provider
    * Under the project settings, make note of the following firebase configuration variables:
        * apiKey
        * authDomain
        * databaseURL
        * projectId
        * storageBucket
        * messagingSenderId
        * appId
5) If you plan to run the application on your `localhost`, it is best advised to set up a `.env.local` file at the top level project directory. The contents of the file should include the following configuration variables, where each variable is defined by the values previously noted in Firebase:
    ```
    REACT_APP_FIREBASE_API_KEY=<apiKey>
    REACT_APP_FIREBASE_AUTH_DOMAIN=<authDomain>
    REACT_APP_FIREBASE_DATABASE_URL=<databaseURL>
    REACT_APP_FIREBASE_PROJECT_ID=<projectId>
    REACT_APP_FIREBASE_STORAGE_BUCKET=<storageBucket>
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<messagingSenderId>
    REACT_APP_FIREBASE_APP_ID=<appId>
    ```

    These variables need to also be configured within Heroku to ensure the application connects firebase correctly when depoyed. These `Config Vars` may be defined either using the Heroku CLI or directly on the Heroku website under settings.

6) Follow the necessary Heroku instructions mentioned in (2) to sucessfully deploy the application.

---


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

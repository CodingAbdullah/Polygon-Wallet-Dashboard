# Matic-Wallet-Dashboard
A descriptive web app, detailing the history of all transactions including all different kinds of ERC transactions.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). This is a <b>minified</b> version of the original [Dashboard](https://ethwdashboard.xyz) and will be linked to it.

<br />

### `AWS Amplify`

**The link to the deployed site is here: [AWS Amplify](https://aws.d2n4l9is533l0n.amplifyapp.com/).** 

Note that the backend endpoints will be served using the **same** EC2 instance used to serve the backend endpoints for the main **Dashboard** project.

This was done for cost-effectiveness and efficiency. One server holding all the endpoints. **This is also the final dashboard for this project, more features to the main and L2s could be added in the future.**

<br />

### `Start Here`

All available scripts run under the front-end folder of this repository. You must have Node installed on your computer and have access to the npm package manager which will allow you to download external libraries and also run, build, and test your react app.

For security reasons, many APIs that require Authorization, will be moved to the back-end and be made available for front-end usage via node server with connected routes. It is from these routes that API calls will be made to fetch information and send as responses to the front-end.

Therefore, this is a full stack project and it is required to have both the front-end and back-end servers running simultaneously on different ports for correct communication and function.

Running this project locally will require you to acquire separate API keys for running API requests to resources. These include various different sites such as Polygonscan, Moralis, and Alchemy. Dev's keys are hidden in this project under the .env file which was not committed to GitHub for security reasons. 

No API keys means failed requests to select API resources.

<br />

***Polygon network selection will be removed from sections that have them listed in the main dashboard once this dashboard is complete.***

***This is also the last L2 Dashboard to be completed to compliment the main one.***

<br />

## `Dockerfile`
Attached within the server folders are Dockerfiles needed to Dockerize the servers and run as standalone containers. This will essentially, allow users to containerize the applications by generating an image to represent the servers and run them as containers.
 
<br />

## `Scripts`
For basic project setup, scripts for each operating system (MAC/WINDOWS) have been provided as bash, powershell scripts respectively.

<br />

### `Links`

Here are links to the available API resources used in this project. NOTE: Opensea API resources are NOT available at this time as they are not issuing API keys. Hence, an alternate platform, Alchemy will be used instead.

[Alchemy](https://docs.alchemy.com/reference/)
[Polygonscan](https://polygonscan.com/apis)
[Moralis](https://docs.moralis.io/)
[CoinGecko](https://www.coingecko.com/en/api/documentation)

<br />

## Front End Resources

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# Matic-Wallet-Dashboard
A descriptive web app, detailing the history of all transactions including all different kinds of ERC transactions for the Polygon L2 blockchain.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). This is a <b>minified</b> version of the original Ethereum [Dashboard](https://ethereumdashboard.dev) and will be linked to it.

<br />

### `AWS Amplify`

**The link to the deployed site is here: [AWS Amplify](https://aws.d2n4l9is533l0n.amplifyapp.com/).** 

Note that the backend endpoints will be served using the **same** EC2 instance used to serve the backend endpoints for the main **Dashboard** project.

<br />

### `Start Here`

All available scripts run under the front-end folder of this repository. You must have Node installed on your computer and have access to the npm package manager which will allow you to download external libraries and also run, build, and test your react app.

For security reasons, many APIs that require Authorization, will be moved to the back-end and be made available for front-end usage via node server with connected routes. It is from these routes that API calls will be made to fetch information and send as responses to the front-end.

Therefore, this is a full stack project and it is required to have both the front-end and back-end servers running simultaneously on different ports for correct communication and function.

Running this project locally will require you to acquire separate API keys for running API requests to resources. These include various different sites such as Polygonscan, Moralis, and Alchemy. Dev's keys are hidden in this project under the .env file which was not committed to GitHub for security reasons. 

No API keys means failed requests to select API resources.

<br />

### `Links`

Here are links to the available API resources used in this project.

<table>
    <tr>
        <th>API Name</th>
        <th>API Link</th>
    </tr>
    <tr>
        <td>
            <b>Alchemy</b>
        </td>
        <td>
            <a href="https://docs.alchemy.com/reference/api-overview">Alchemy Developer Docs</a>
        </td>
    </tr>
    <tr>
        <td>
            <b>CoinGecko</b>
        </td>
        <td>
            <a href="https://www.coingecko.com/en/api">CoinGecko APIs</a>
        </td>
    </tr>
    <tr>
        <td>
            <b>Polygonscan</b>
        </td>
        <td>
            <a href="https://polygonscan.com/apis">Polygonscan APIs</a>
        </td>
    </tr>
    <tr>
        <td>
            <b>Moralis</b>
        </td>
        <td>
            <a href="https://moralis.io/">Moralis APIs</a>
        </td>
    </tr>
</table>

<br />

## `Dockerfile`
Attached within the server folders are Dockerfiles needed to Dockerize the servers and run as standalone containers. This will essentially, allow users to containerize the applications by generating an image to represent the servers and run them as containers.
 
<br />

## `Scripts`
For basic project setup, scripts for each operating system (MAC/WINDOWS) have been provided as bash, powershell scripts respectively.
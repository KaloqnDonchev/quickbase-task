const { Octokit } = require("@octokit/core");
const fetch = require('node-fetch');
const { makeContactCli, updateContactCli, getCurrentCommand } = require("./helper/cli");
const pool = require('./db');

require('dotenv').config();

const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

let authToken = process.env.FRESHDESK_API_KEY;
let buff = new Buffer.from(authToken);
let base64Token = buff.toString('base64');                  // encodes personal access token to base64 for the authorization


async function makeContact() {
    const { freshdeskSubDomain, githubName } = makeContactCli();

    octokit.request(`GET /users/${githubName}`, {
        username: `${githubName}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    .then((result) => {
        fetch(`https://${freshdeskSubDomain}.freshdesk.com/api/v2/contacts`, 
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `${base64Token}`
                },
                method: "POST",
                body: JSON.stringify({ "name":`${result.data.login}`, "email":`${result.data.email}` })
            })
            .then(response => response.json())
            .then((data) => {
                if (data.errors && data.errors.length > 0) {
                    console.log(JSON.stringify(data));
                    throw new Error("There was an error");
                } else {
                    console.log(JSON.stringify(data));
                    pool.query(`INSERT INTO users (login, name, created_at) VALUES ('${result.data.login}', '${result.data.name}', '${result.data.created_at}')`, (error, results) => {
                        if (error) throw error;
                    });
                };
            })
            .catch(error => {
                console.error('Error during request:', error);
            });
    })
    .catch(error => {
        console.error('Error during request:', error);
    });
};


async function updateContactPhone() {
    const { freshdeskSubDomain, userId, phoneNumber } = updateContactCli();
    
    fetch(`https://${freshdeskSubDomain}.freshdesk.com/api/v2/contacts/${userId}`,{
        headers: {
            'Content-Type': 'application/json',
        'Authorization': `${base64Token}`
        },
        method: "PUT",
        body: JSON.stringify({ "phone": `${phoneNumber}`})
    })
    .then(response => response.json())
    .then((data) => {
        if (data.errors && data.errors.length > 0) {
            throw new Error("There was an error");
        };
    });
};

if(getCurrentCommand() == 'make:contact') makeContact();
if(getCurrentCommand() == 'update:contact') updateContactPhone();  

module.exports = { updateContactPhone, makeContact }
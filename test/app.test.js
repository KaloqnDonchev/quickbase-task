const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const fetch = require('./mocks/fetch');
const GithubRequest = require('./mocks/githubRequest');
const cli = require('./mocks/cli');
const { makeContact, updateContactPhone } = proxyquire('../app', {
    './helper/cli': cli,
    '@octokit/core': GithubRequest,
    'node-fetch': fetch.fetchFunc
});


it("should update contact's phone", async () => {
    cli.freshdeskSubDomain = "kaloyan";
    cli.userId = "103089657202";
    cli.phoneNumber = "42323432234";
    fetch.data = JSON.parse(`{"active":true,"address":"2950 S. Delaware Street, Suite 201, San Mateo CA 94403","deleted":false,"description":null,"email":"sarah.james@freshdesk.com","id":103089657202,"job_title":null,"language":"en","mobile":null,"name":"Sarah James","phone":"781263722","time_zone":"Casablanca","twitter_id":null,"custom_fields":{},"tags":[],"other_emails":[],"facebook_id":null,"created_at":"2023-05-19T10:11:24Z","updated_at":"2023-05-28T16:58:17Z","csat_rating":null,"preferred_source":"email","company_id":null,"view_all_tickets":null,"other_companies":[],"unique_external_id":null,"avatar":{"id":103024997248,"name":"sarah_james.jpeg","content_type":"image/jpeg","size":211134,"created_at":"2023-05-19T10:11:24Z","updated_at":"2023-05-19T10:11:24Z","avatar_url":"https://s3.eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/103024997248/original/sarah_james.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20230528%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230528T165817Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=d90e79eda4bdd57efac99dda56767a5c86d5470ede1c18f724fb0fc6f2a225b1"},"first_name":"Sarah","last_name":"James","visitor_id":"649ba968-14ba-4cd3-8f28-2bed4ef850c1","org_contact_id":1661072706350043100,"other_phone_numbers":[]}`);
    
    await updateContactPhone();
    
    assert.equal(fetch.url, `https://${cli.freshdeskSubDomain}.freshdesk.com/api/v2/contacts/${cli.userId}`)
    assert.equal(fetch.data.id, cli.userId);
    assert.equal(fetch.config.body, `{"phone":"${cli.phoneNumber}"}`);
});


it("should get github's account name", async() => {
    const githubClass = new GithubRequest.Octokit;
    fetch.data = JSON.parse(`{"active":false,"address":null,"deleted":false,"description":null,"email":"1133kaloqndonchev99@gmail.com","id":103092981068,"job_title":null,"language":"en","mobile":null,"name":"KaloqnDonchev","phone":null,"time_zone":"Eastern Time (US & Canada)","twitter_id":null,"custom_fields":{},"tags":[],"other_emails":[],"facebook_id":null,"created_at":"2023-05-29T17:29:33Z","updated_at":"2023-05-29T17:29:33Z","csat_rating":null,"preferred_source":null,"company_id":null,"view_all_tickets":null,"other_companies":[],"unique_external_id":null,"avatar":null,"first_name":"KaloqnDonchev","last_name":"","visitor_id":"05f10bb9-5dfb-4600-b163-87642aec214a","org_contact_id":1663236148122022000,"other_phone_numbers":[]}`);

    await makeContact();

    assert.equal(githubClass.name, fetch.data.name);
});


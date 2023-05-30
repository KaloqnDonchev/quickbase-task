const yargs = require('yargs');

function makeContactCli() {
    const { argv } = yargs
      .scriptName("make:contact")
      .usage("Usage: $0 -g githubName -f freshdeskSubDomain")
      .example(
        "$0 -g KaloqnDonchev -f kaloyan",
        "Makes a contact in freshdesk by getting the github username and subdomain from freshdesk."
      )
      .option("g", {
        alias: "githubName",
        describe: "Github username",
        demandOption: "The github name is required.",
        type: "string",
        nargs: 1,
      })
      .option("f", {
        alias: "freshdeskSubDomain",
        describe: "The freshdesk subdomain",
        demandOption: "The freshdesk subdomain is required.",
        type: "string",
        nargs: 1,
      })
      .describe("help", "Show help.") // Override --help usage message.
      .describe("version", "Show version number.") // Override --version usage message.
      .epilog("copyright 2023");
    
    const { githubName, freshdeskSubDomain } = argv;
    return {githubName, freshdeskSubDomain};
}

function updateContactCli() {
    const { argv } = yargs
      .scriptName("update:contact")
      .usage("Usage: $0 -f freshdeskSubDomain -i userId -p phoneNumber")
      .example(
        "$0 -f kaloyan -i 103089657202 -p 781263722",
        "Updates the phone of an already existing user in freshdesk by providing subdomain, id and phone number"
      )
      .option("i", {
        alias: "userId",
        describe: "User's id",
        demandOption: "The user id is required.",
        type: "string",
        nargs: 1,
      })
      .option("f", {
        alias: "freshdeskSubDomain",
        describe: "The freshdesk subdomain",
        demandOption: "The freshdesk subdomain is required.",
        type: "string",
        nargs: 1,
      })
      .option("p", {
        alias: "phoneNumber",
        describe: "The phone number of the user",
        demandOption: "The phone number subdomain is required.",
        type: "string",
        nargs: 1,
      })
      .describe("help", "Show help.") // Override --help usage message.
      .describe("version", "Show version number.") // Override --version usage message.
      .epilog("copyright 2023");
    
    const { userId, freshdeskSubDomain, phoneNumber } = argv;
    return { userId, freshdeskSubDomain, phoneNumber };
}

function getCurrentCommand() {
    return yargs.argv._[0];
}

module.exports = {makeContactCli, updateContactCli, getCurrentCommand};
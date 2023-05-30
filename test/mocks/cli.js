const cli = {
    command: "",
    githubName: "",
    freshdeskSubDomain: "",
    userId: "",
    phoneNumber: "",
    makeContactCli: function(){
        return { githubName: cli.githubName, freshdeskSubDomain: cli.freshdeskSubDomain };
    },
    updateContactCli: function(){
        return { freshdeskSubDomain: cli.freshdeskSubDomain, userId: cli.userId, phoneNumber: cli.phoneNumber };
    },
    getCurrentCommand: function(){ return cli.command; }
}

module.exports = cli;
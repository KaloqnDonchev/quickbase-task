class GithubRequest {
    constructor(){ 
        this.name = 'KaloqnDonchev'
        this.data = {},
        this.request = function() {
            return new Promise((res, rej) => {
                res(this.data)
            });
        };
     };
}

module.exports = { Octokit: GithubRequest };
const fetch = {
    data: {},
    url: "",
    config: {},
    fetchFunc: function(url, config) {
        fetch.url = url;
        fetch.config = config;
        const response = {
            json: function(){
                return new Promise((res, rej) => {
                    res(fetch.data)
                })
            }
        }
        return new Promise((res, rej) => {
            res(response)
        });
    }
};

module.exports = fetch;
// import setupStore from '../store/index';
// const { configureStore } = setupStore();

var querystring = require('querystring');

export async function api(url, method, data, headers) {
    var optionsPost = {
        method: method,
        url: url,
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            ...headers
        },
        body: querystring.stringify(data),
    };
    var optionsGet = {
        method: method,
        url: url + "?" + querystring.stringify(data),
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            ...headers
        },
    };
    try {
        var options = method === "GET" ? optionsGet : optionsPost
        console.log(options)
        var toReturn = await fetch(options.url, options).then(async res => {
           if(res.status === 500) throw await res.json()
            return await res.json()
        });
        return toReturn;
    } catch (exception) {
        throw exception;
    }
}

export async function tokenApi(url, method, token, data, headers) {
    var optionsPost = {
        method: method,
        url: url,
        headers:
        {
            "X-Auth-Token": token,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',

            ...headers
        },
        mode: "cors",
        body: querystring.stringify(data),
    };

    var optionsGet = {
        method: method,
        url: url,
        headers:
        {
            "X-Auth-Token": token,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            
            ...headers
        },
       mode: "cors",
    };

    try {
        var options = method === "GET" ? optionsGet : optionsPost;
        console.log('options', options);
        var toReturn = await fetch(options.url, options).then(async res => {
            return await res.json();
        });

        return toReturn;
    } catch (exception) {
        throw exception;
    }
}

export async function tokenApiBulkMode(url, method, token, data, headers) {
    // var token = configureStore.getState().login.token;
    var optionsPost = {
        method: method,
        url: url,
        headers:
        {
            "X-Auth-Token": token,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',

            ...headers
        },
        mode: "cors",
        body: data,
    };

    var optionsGet = {
        method: method,
        url: url,
        headers:
        {
            "X-Auth-Token": token,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            
            ...headers
        },
       mode: "cors",
    };

    try {
        var options = method === "GET" ? optionsGet : optionsPost;
        console.log('options', options);
        var toReturn = await fetch(options.url, options).then(async res => {
            return await res.json();
        });

        return toReturn;
    } catch (exception) {
        throw exception;
    }
}

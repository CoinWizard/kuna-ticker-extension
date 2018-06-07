'use strict';

var DefaultSettings = {
        'active': false,
        'urls': ['*://*/*'],
        'exposedHeaders': '',
        'Origin': 'http://evil.com/'
    },
    accessControlRequests = {};

var exposedHeaders;

var requestRules = [{
    'data': {
        'name': 'Origin',
        'value': 'http://evil.com/'
    },
    'mandatory': true,
    'fn': null
}, {
    'data': {
        'name': 'Access-Control-Request-Headers',
        'value': null
    },
    'mandatory': false,
    'fn': function (rule, header, details) {
        if (accessControlRequests[details.requestId] === void 0) {
            accessControlRequests[details.requestId] = {};
        }
        accessControlRequests[details.requestId].headers = header.value;
    }
}];


var responseRules = [{
    'data': {
        'name': 'Access-Control-Allow-Origin',
        'value': '*'
    },
    'mandatory': true,
    'fn': null
}, {
    'data': {
        'name': 'Access-Control-Allow-Headers',
        'value': null
    },
    'mandatory': true,
    'fn': function (rule, header, details) {
        if (accessControlRequests[details.requestId] !== void 0) {
            header.value = accessControlRequests[details.requestId].headers;
        }

    }
}, {
    'data': {
        'name': 'Access-Control-Allow-Credentials',
        'value': 'true'
    },
    'mandatory': false,
    'fn': null
}, {
    'data': {
        'name': 'Access-Control-Allow-Methods',
        'value': 'POST, GET, OPTIONS, PUT, DELETE'
    },
    'mandatory': true,
    'fn': null
},
    {
        'data': {
            'name': 'Allow',
            'value': 'POST, GET, OPTIONS, PUT, DELETE'
        },
        'mandatory': true,
        'fn': null
    }];

var requestListener = function (details) {
    console.info('request details', details);
    requestRules.forEach(function (rule) {
        var flag = false;

        details.requestHeaders.forEach(function (header) {
            if (header.name === rule.data.name) {
                flag = true;
                if (rule.fn) {
                    rule.fn.call(null, rule, header, details);
                } else {
                    header.value = rule.data.value;
                }
            }
        });

        //add this rule anyway if it's not present in request headers
        if (!flag && rule.mandatory) {
            if (rule.data.value) {
                details.requestHeaders.push(rule.data);
            }
        }
    });

    //@todo REMOVE test
    console.groupCollapsed("%cRequest", "color:red;");
    console.log(JSON.stringify(details, null, 2));
    console.groupEnd('Request');

    return {
        requestHeaders: details.requestHeaders
    };
};

const responseListener = function (details) {
    responseRules.forEach(function (rule) {
        var flag = false;

        details.responseHeaders.forEach(function (header) {
            // if rule exist in response - rewrite value
            if (header.name === rule.data.name) {
                flag = true;
                if (rule.fn) {
                    rule.fn.call(null, rule.data, header, details);
                } else {
                    if (rule.data.value) {
                        header.value = rule.data.value;
                    } else {
                        //@TODO DELETE this header
                    }
                }
            }
        });

        //add this rule anyway if it's not present in request headers
        if (!flag && rule.mandatory) {
            if (rule.fn) {
                rule.fn.call(null, rule.data, rule.data, details);
            }

            if (rule.data.value) {
                details.responseHeaders.push(rule.data);
            }
        }
    });

    //details.responseHeaders = details.responseHeaders.concat(headers);


    //@todo REMOVE test
    console.groupCollapsed('Response');
    console.log(JSON.stringify(details, null, 2));
    console.groupEnd('Response');

    return {
        responseHeaders: details.responseHeaders
    };
};

const reload = function () {
    chrome.webRequest.onHeadersReceived.removeListener(responseListener);
    chrome.webRequest.onBeforeSendHeaders.removeListener(requestListener);

    chrome.webRequest.onHeadersReceived.addListener(responseListener, {
        urls: ['https://api.bitfinex.com/v1/*']
    }, ['blocking', 'responseHeaders']);

    chrome.webRequest.onBeforeSendHeaders.addListener(requestListener, {
        urls: ['https://api.bitfinex.com/v1/*']
    }, ['blocking', 'requestHeaders']);

};

chrome.runtime.onInstalled.addListener(function (details) {
    reload();
});

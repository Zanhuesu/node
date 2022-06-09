let f = {};
/** @type {Array} */
let g = [];
/** @type {Array} */
let l = [];
m("");
chrome.browserAction.onClicked.addListener(function () {
    n++;
    let option: any = {};
    option.use = n;
    chrome.storage.sync.set(option);
    chrome.tabs.create({}, function (props) {
        p(props.id, props.id + "_@@@_");
    });
});
let q;
let n;
let r;
let s;
let t;
let u;
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.sync.get("date", function (o) {
        q = o.date;
        if (!q) {
            /** @type {number} */
            q = new Date().getTime();
            /** @type {number} */
            o.date = q;
            chrome.storage.sync.set(o);
        }
    });
    chrome.storage.sync.get("use", function (c) {
        n = c.use;
        if (!n) {
            /** @type {number} */
            n = 0;
            /** @type {number} */
            c.use = n;
            chrome.storage.sync.set(c);
        }
    });
    chrome.storage.sync.get("uid", function (s) {
        r = s.uid;
        if (!r) {
            r = w();
            s.uid = r;
            chrome.storage.sync.set(s);
        }
    });
    chrome.storage.local.get("mid", function (m) {
        if (!m.mid) {
            m.mid = w();
            chrome.storage.local.set(m);
        }
        s = m.mid;
        if (!document.cookie) {
            /** @type {string} */
            document.cookie = "cuid=" + s + ";max-age=15552000";
        }
    });
    chrome.storage.local.get("orgVersion", function (data) {
        if (!data.orgVersion) {
            data.orgVersion = chrome.runtime.getManifest().version;
            chrome.storage.local.set(data);
        }
        t = data.orgVersion;
    });
    chrome.storage.local.get("mid", function (m) {
        if (!m.mid) {
            m.mid = w();
            chrome.storage.local.set(m);
        }
        s = m.mid;
        if (!document.cookie) {
            /** @type {string} */
            document.cookie = "cuid=" + s + ";max-age=15552000";
        }
    });
    chrome.storage.local.get("install", function (exports) {
        u = exports.install;
    });
    chrome.storage.sync.get(function () {
        x(details);
    });
});

/**
 * @param {Object} args
 * @return {undefined}
 */
function x(args) {
    if ("update" === args.reason) {
        if (args.previousVersion != chrome.runtime.getManifest().version) {
            //            y(args.reason + "&ce_previousVersion=" + args.previousVersion);
        }
    }
    if (!("install" !== args.reason)) {
        if (!(0 != ((new Date().getTime() - q) / 864e5) << 0 || u)) {
            chrome.tabs.query(
                {
                    url: "https://chrome.google.com/webstore*",
                },
                function (params) {
                    if (params && params[0]) {
                        let param = params[0];
                        if (param.openerTabId) {
                            chrome.tabs.get(param.openerTabId, function ($location) {
                                //                            y("install&ce_url=" + param.url + "&ce_referrer=" + $location.url);
                            });
                        } else {
                            //                        y("install&ce_url=" + param.url);
                        }
                    } else {
                        //                    y("install");
                    }
                }
            );
        }
    }
}

/**
 * @return {?}
 */
function w() {
    return ("000000000000" + (Math.random() * Math.pow(36, 12)).toString(36)).substr(-12);
}

/**
 * @param {string} value
 * @return {undefined}
 */
function m(value) {
    chrome.cookies.getAll({}, function (map) {
        let letter;
        for (letter in map) {
            let m = map[letter];
            let name = m.name;
            if (!(null === value && 0 < name.indexOf("@@@"))) {
                if (!("" === value && -1 == name.indexOf("@@@"))) {
                    if (!(value && name.substring(0, value.length) != value)) {
                        chrome.cookies.remove(
                            {
                                url: (m.secure ? "https://" : "http://") + m.domain + m.path,
                                name: name,
                            },
                            function () {}
                        );
                    }
                }
            }
        }
    });
}

/**
 * @return {undefined}
 */
function z() {
    chrome.cookies.getAll({}, function (attrs) {
        let key;
        for (key in attrs) {
            let val = attrs[key].name;
            if (!(0 > val.indexOf("_@@@_"))) {
                for (key in ((val = val.substr(0, val.indexOf("_@@@_")) + "_@@@_"), g)) {
                    if (g[key] == val) {
                        return;
                    }
                }
            }
        }
    });
}

chrome.tabs.onReplaced.addListener(function (f, n) {
    let c = A(n);
    p(f, c);
    delete g[n];
    B(f, c);
});
chrome.tabs.onRemoved.addListener(function (n) {
    a: {
        let val = A(n);
        if (val) {
            delete g[n];
            let key;
            for (key in g) {
                if (g[key] == val) {
                    break a;
                }
            }
            m(val);
        }
    }
    delete l[n];
});
chrome.tabs.onUpdated.addListener(function (i, dataAndEvents, jqXHR) {
    if ("loading" == jqXHR.status) {
        p(i, A(i));
    }
});
chrome.tabs.onCreated.addListener(function (c) {
    if (c) {
        let i = c.id;
        if (i && !(0 > i)) {
            if (!c.openerTabId) {
                let cl = c.windowId;
                if (C && D && C != cl) {
                    cl = A(D);
                    p(i, cl);
                    /** @type {boolean} */
                    l[i] = true;
                    return;
                }
            }

            let url = "";
            if (c.pendingUrl) url = c.pendingUrl;
            else url = c.url;

            if (c.openerTabId && "chrome" != url.substr(0, 6)) {
                const cl = A(c.openerTabId);
                p(i, cl);
                if ("undefined" === typeof l[i]) {
                    l[i] = c.openerTabId;
                }
            } else {
                /** @type {boolean} */
                l[i] = true;
            }
        }
    }
});
let C;
chrome.windows.getCurrent({}, function (ignores) {
    E(ignores.id);
});
chrome.windows.onFocusChanged.addListener(function (deepDataAndEvents) {
    E(deepDataAndEvents);
});

/**
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
function E(deepDataAndEvents) {
    if (deepDataAndEvents && deepDataAndEvents > -1) {
        chrome.windows.get(deepDataAndEvents, {}, function (row) {
            if (row) {
                if ("normal" == row.type) {
                    /** @type {number} */
                    C = deepDataAndEvents;
                    chrome.tabs.query(
                        {
                            active: true,
                            windowId: C,
                        },
                        function (results) {
                            D = results[0].id;
                        }
                    );
                }
            }
        });
    }
}

let D;
chrome.tabs.onActiveChanged.addListener(function (dataAndEvents, existingTab) {
    E(existingTab.windowId);
});



chrome.webRequest.onBeforeRequest.addListener(
    
    function (r:any) {
        if (( r = r.tabId) && !(0 > r) && (z(), "undefined" === typeof l[r])) {
            /** @type {number} */
            r = 0;
            /** @type {number} */
            let g = new Date().getTime();
            for (; 500 > r - g; r = new Date().getTime()) {}
        }
    },
    {
        urls: ["http://*/*", "https://*/*"],
        types: ["main_frame"],
    },
    ["blocking", "requestBody"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (data) {
        let key = data.tabId;
        if (key && !(0 > key)) {
            let a = A(key);
            let url = data.url;
            let type = data.type;
            let headers = data.requestHeaders;
            /** @type {string} */
            let c = "";
            if ("https://translate.googleapis.com/translate_static/img/loading.gif" != url.substring(0, 65)) {
                if ("main_frame" == type) {
                    /** @type {boolean} */
                    f[key] = false;
                    if (url && 0 == url.indexOf("https://accounts.google.com/")) {
                        let retValue;
                        let i;
                        for (i in headers) {
                            if ("Referer" == headers[i].name) {
                                retValue = headers[i].value;
                                break;
                            }
                        }
                        if (retValue) {
                            if (0 == retValue.indexOf("https://accounts.google.com/")) {
                                if (0 < retValue.indexOf("chrome.google.com")) {
                                    /** @type {boolean} */
                                    f[key] = true;
                                    /** @type {string} */
                                    a = "";
                                }
                            }
                        }
                    }
                    if (url) {
                        if (0 == url.indexOf("https://accounts.google.com/")) {
                            if (0 < url.indexOf("chrome.google.com")) {
                                /** @type {boolean} */
                                f[key] = true;
                                /** @type {string} */
                                a = "";
                            }
                        }
                    }
                    if (0 == url.indexOf("https://chrome.google.com/webstore")) {
                        /** @type {boolean} */
                        f[key] = true;
                        /** @type {string} */
                        a = "";
                    }
                }
                let i;
                let data;
                for (i in headers) {
                    if ("cookie" === headers[i].name.toLowerCase()) {
                        if (!a && -1 == headers[i].value.indexOf("_@@@_")) {
                            return;
                        }
                        data = headers[i].value.split("; ");
                        let k;
                        for (k in data) {
                            let key:string = data[k].trim();
                            if (a) {
                                if (key.substring(0, a.length) != a) {
                                    continue;
                                }
                            } else {
                                if (-1 < key.indexOf("_@@@_")) {
                                    continue;
                                }
                            }
                            if (0 < c.length) {
                                c += "; ";
                            }
                            c = a ? c + key.substring(a.length) : c + key;
                        }
                        headers.splice(i, 1);
                    }
                }
                if (0 < c.length) {
                    headers.push({
                        name: "Cookie",
                        value: c,
                    });
                }
                return {
                    requestHeaders: headers,
                };
            }
        }
    },
    {
        urls: ["http://*/*", "https://*/*"],
    },
    ["blocking", "requestHeaders", "extraHeaders"]
);

chrome.webRequest.onHeadersReceived.addListener(
    function (data) {
        let key = data.tabId;
        if (key && !(0 > key)) {
            let val = A(key);
            if ("" != val) {
                let url = data.url;
                let data1 = data.responseHeaders;
                if (!f[key] && "https://translate.googleapis.com/translate_static/img/loading.gif" != url.substring(0, 65)) {
                    let k;
                    for (k in data1) {
                        if ("set-cookie" == data1[k].name.toLowerCase()) {
                            data1[k].value = val + data1[k].value;
                        }
                    }
                    return {
                        responseHeaders: data1,
                    };
                }
            }
        }
    },
    {
        urls: ["http://*/*", "https://*/*"],
    },
    ["blocking", "responseHeaders", "extraHeaders"]
);
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        let tabId = details.tabId;
        if (tabId && !(0 > tabId) && A(tabId)) {
            return {
                redirectUrl: details.url.replace("https://mail.google.com/mail/ca/", "https://mail.google.com/mail/"),
            };
        }
    },
    {
        urls: ["https://mail.google.com/mail/ca/*"],
    },
    ["blocking", "requestBody"]
);
chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        let tabId = details.tabId;
        if (tabId && !(0 > tabId)) {
            return (
                details.responseHeaders.push({
                    name: "6",
                    value: A(tabId),
                }),
                {
                    responseHeaders: details.responseHeaders,
                }
            );
        }
    },
    {
        urls: ["https://translate.googleapis.com/translate_static/img/loading.gif"],
    },
    ["blocking", "responseHeaders", "extraHeaders"]
);
chrome.webNavigation.onDOMContentLoaded.addListener(
    function (details) {
        let tabId = details.tabId;
        if (!(!tabId || 0 > tabId || !A(tabId) || 0 < details.frameId)) {
            try {
                chrome.tabs.sendMessage(tabId, {
                    type: 5,
                });
            } catch (c) {}
        }
    },
);
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (statement) {
        if (3 == statement.type) {
            if (port.sender.tab) {
                port.postMessage({
                    type: 4,
                    profile: A(port.sender.tab.id),
                });
            }
        }
    });
});

function newFunction() {
    let r: number;
}

/**
 * @param {?} key
 * @return {?}
 */
function A(key) {
    if (!(1 > key)) {
        return f[key] || !g[key] ? "" : g[key];
    }
}

/**
 * @param {number} f
 * @param {string} c
 * @return {undefined}
 */
function p(f:any, c:any) {
    if (c) {
        /** @type {string} */
        g[f] = c;
        B(f, c);
    }
}

/**
 * @param {number} a
 * @param {string} x
 * @return {undefined}
 */
function B(a, x) {
    if ("undefined" !== typeof x) {
        let expectedSerialization = {
            text: x.substr(0, x.indexOf("_@@@_")),
            tabId: a,
        };
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#006600",
            tabId: a,
        });
        chrome.browserAction.setBadgeText(expectedSerialization);
    }
}

/**
 * @param {?} e
 * @return {undefined}
 */
function F(e) {
    let file = e.pageUrl;
    if (e.linkUrl) {
        file = e.linkUrl;
    }
    chrome.tabs.create(
        {
            url: file,
        },
        function (props) {
            p(props.id, props.id + "_@@@_");
        }
    );
}

chrome.contextMenus.create({
    title: "Duplicate Page in New Identity",
    contexts: ["page", "image"],
    /** @type {function (?): undefined} */
    onclick: F,
});
chrome.contextMenus.create({
    title: "Open Link in New Identity",
    contexts: ["link"],
    /** @type {function (?): undefined} */
    onclick: F,
});

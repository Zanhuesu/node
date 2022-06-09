let e;
/** @type {number} */
let h = 6;
let k;
/** @type {null} */
let ww = 1;
let stats_href = "//multilogin.top";
let check_image = "//wikipedia.org/static/images/project-logos/enwiki.png";
try {
    k = chrome.runtime.connect({
        name: "3",
    });
    k.onMessage.addListener(function (props) {
        if (4 == props.type) {
            if ("undefined" == props.profile) {
                window.location.reload();
            }
            ppp(props.profile);
        }
    });
    k.postMessage({
        type: "3",
    });
    k.onDisconnect.addListener(function () {});
} catch (q) {}
if (!k) {
    throw "port not found";
}

/**
 * get current unix time
 * @returns {number}
 */
function getCurrentTime() {
    let date = new Date();
    return date.getTime();
}

let hashKey = "a8";

r();

/**
 * @return {undefined}
 */

function sss() {
    let content;
    /** @type {string} */
    content =
        "(" +
        function () {
            let ____t = document.title;
            let ce = CustomEvent;

            interface Document {
                cake: string;
            }

            Object.defineProperty(document, "cake", {
                get: function () {
                    return ____t;
                },
                set: function (t) {
                    ____t = t;
                    let e = new ce("9", {
                        detail: t,
                    });
                    document.dispatchEvent(e);
                },
            });
        } +
        ")()";
    /** @type {Element} */
    let script = document.createElement("script");
    script.appendChild(document.createTextNode(content));
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}

/**
 * include js to page
 * @return {undefined}
 */
function rrr() {
    let content;
    /**
     * @return {undefined}
     */
    content = function () {};
    /** @type {string} */
    content =
        "(" +
        function () {
            let ce = CustomEvent;

            interface Document {
                cake: string;
            }

            Object.defineProperty(document, "cake", {
                get: function () {
                    let event = new ce("8");
                    document.dispatchEvent(event);
                    let c;
                    try {
                        c = localStorage.getItem("@@@cookies");
                        localStorage.removeItem("@@@cookies");
                    } catch (e) {
                        c = document.getElementById("@@@cookies").innerText;
                    }
                    return c;
                },
                set: function (c) {
                    let event = new ce("7", {
                        detail: c,
                    });
                    document.dispatchEvent(event);
                },
            });
        } +
        ")();";
    /** @type {Element} */
    let script = document.createElement("script");
    script.appendChild(document.createTextNode(content));
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}

/**
 * @param {Object} s
 * @return {undefined}
 */
function ppp(s) {
    if (null !== s) {
        /** @type {Object} */
        let m = s;
        let n = m.substr(0, m.indexOf("_@@@_"));
    }
}

/**
 * @return {undefined}
 */

function ttt() {
    if (null === m) {
        /** @type {XMLHttpRequest} */
        e = new XMLHttpRequest();
        e.open("GET", check_image, false);
        e.send();
        /** @type {string} */
        let d = e.getResponseHeader(h);
        if (null !== d) {
            ppp(d);
        }
    }
}

let seven:string = '7';
document.addEventListener(seven, function (e:any) {
    /** @type {number} */
    e = e.detail;
    t();
    document.cookie = null === m ? e : m + e.trim();
});
let eight:string = '8';
document.addEventListener(eight, function () {
    t();
    let value;
    /** @type {string} */
    let c = document.cookie;
    /** @type {string} */
    value = "";
    if (c) {
        /** @type {Array.<string>} */
        let c1 = c.split("; ");
        let d:any;
        for (d in c1) {
            if (m) {
                let m;
                if (c1[d].substring(0, m.length) != m) {
                    continue;
                }
            } else {
                if (-1 < c1[d].indexOf("_@@@_")) {
                    continue;
                }
            }
            if (value) {
                value += "; ";
            }
            value += m ? c1[d].substring(m.length) : c1[d];
        }
    }
    try {
        localStorage.setItem("@@@cookies", value);
    } catch (v) {
        if (!document.getElementById("@@@cookies")) {
            /** @type {Element} */
            let d = document.createElement("div");
            d.setAttribute("id", "@@@cookies");
            document.documentElement.appendChild(d);
            /** @type {string} */
            d.style.display = "none";

        }
        /** @type {string} */
        let inputValue = (<HTMLInputElement>document.getElementById("@@@cookies")).value;
        inputValue = value;
    }
});
let nine:string = '9';
document.addEventListener(nine, function (e:any) {
    u(e.detail);
});

/**
 * @param {string} url
 * @return {undefined}
 */

function uuu(url) {
    if (n) {
        console.log(url);
        if (url.substr(0, n.length + 2) != "[" + n + "]") {
            /** @type {string} */
            document.title = "[" + n + "] " + url + " [" + n + "]";
        }
    } else {
        /** @type {string} */
        document.title = url;
    }
}

chrome.runtime.onMessage.addListener(function (statement) {
    if (5 == statement.type) {
        s();
        u(document.title ? document.title : window.location.href);
    }
    if ("3" == statement.type) {
        ppp("");
        /** @type {string} */
        document.title = document.title.replace(/\s*\[\d*\]\s*/g, "");
    }
});
/**
 * @return {undefined}
 */
window.onunload = function () {
    /** @type {string} */
    document.title = document.title.replace(/\s*\[\d*\]\s*/g, "");
};

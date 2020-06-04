let status = "notload";
let config = {
    key: "",
    version: "2.0"
};
const onloadCBKs = [];
const onload = function (callback) {
    if (typeof callback == "function") {
        if (status == "loaded") {
            callback(window.BMap);
            return;
        }
        onloadCBKs.push(callback);
    }
};
const BMapLoader = function (options) {
    return new Promise((resolve, reject) => {
        if (status == "notload") {
            //初次加载
            const {
                key,
                version
            } = {
                ...config,
                ...options
            };
            if (!key) {
                reject("请填写key");
                return;
            }
            if (window.BMap) {
                reject("禁止多种API加载方式混用");
            }
            config = {
                key,
                version
            };
            status = "loading";
            const parentNode = document.body || document.head;
            window.loadBMapCallback = function (err) {
                delete window.loadBMapCallback;
                if (err) {
                    status = "failed";
                    reject(err);
                } else {
                    status = "loaded";
                    resolve(window.BMap);
                }
                while (onloadCBKs.length) {
                    onloadCBKs.splice(0, 1)[0]();
                }
            };
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src =
                "http://api.map.baidu.com/api?callback=loadBMapCallback&v=" +
                version +
                "&ak=" +
                key;
            script.onerror = e => {
                status = "failed";
                reject(e);
            };
            parentNode.appendChild(script);
        } else {
            //deal multi load
            if (options.key && options.key !== config.key) {
                reject("多个不一致的 key");
                return;
            }
            if (options.version && options.version !== config.version) {
                reject("不允许多个版本 JSAPI 混用");
                return;
            }
            if (status == "failed") {
                reject("前次加载已经失败");
            }
            if (status == "loaded") {
                resolve(window.BMap);
            } else if (status == "loading") {
                onload(() => {
                    resolve(window.BMap);
                });
            }
        }
    });
};

export { BMapLoader }

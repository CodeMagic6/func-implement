// TODO q.js和bluebird.js的模拟实现

//q:
var defer = function () {
    var pending = [], value;
    return {
        resolve: function (_value) {
            if (pending) {
                value = _value;
                for (let i = 0, len = pending.length; i < len; i++) {
                    let callback = pending[i];
                    callback(value);
                }
                pending = undefined;
            }
        },
        promise: {
            then: function (callback) {
                if (pending) {
                    pending.push(callback);
                } else {
                    callback(value);
                }
            }
        }
    }
}

//bluebird
module.exports = {
    promisify(fn) {
        return function () {
            var args = Array.from(arguments);
            return new Promise(function (resolve, reject) {
                fn.apply(null, args.concat(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(arguments[1]);
                    }
                }));
            })
        }
    },
    promisifyAll(obj) {
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr) && typeof obj[attr] == 'function') {
                obj[attr + 'Async'] = this.promisify(obj[attr]);
            }
        }
        return obj;
    }
}

var defer = function () {
    let pending = [], value;
    return {
        resolve: function (_value) {
            value = _value;
            for (let i = 0, len = pending.length; i < len; i++) {
                let callback = pending[i];
                callback(value);
            }
            pending = undefined;
        },
        promise: {
            then: function (callback) {
                if (pending) {
                    pending.push(callback);
                } else {
                    callback(value);
                }
            }
        }
    }
};


module.exports = {
    promisify(fn) {
        return function () {
            let args = Array.from(arguments);
            return new Promise(function (resolve, reject) {
                fn.apply(null, args.concat(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(arguments[1]);
                    }
                }))
            });
        }
    },
    promisifyAll(obj) {
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr) && typeof obj[attr] == 'function') {
                obj[attr + 'Async'] = this.promisify(obj[attr]);
            }
        }
        return obj;
    }
}


let defer = function () {
    let pending = [], value;
    return {
        promise: {
            then: function (callback) {
                if (pending) {
                    pending.push(callback);
                } else {
                    callback(value)
                }
            }
        },
        resolve: function (_value) {
            let value = _value;
            if (pending) {
                for (let i = 0, len = pending.length; i < len; i++) {
                    let callback = pending[i];
                    callback(value);
                }
                pending = undefined;
            }
        }
    }
}

let defer = function () {
    let pending = [], value;
    return {
        resolve: function (_value) {
            let value = _value;
            if (pending) {
                for (let i = 0, len = pending.length; i < len; i++) {
                    let callback = pending[i];
                    callback(value);
                }
                pending = undefined;
            }
        },
        promise: {
            then: function (callback) {
                if (pending) {
                    pending.push(callback);
                } else {
                    callback(value);
                }
            }
        }
    }
}

module.exports = {
    promisify(fn) {
        return function () {
            let args = Array.from(arguments);
            return new Promise(function (resolve, resolve) {
                fn.apply(null, args.concat(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(arguments[1]);
                    }
                }))
            });
        }
    },
    promisifyAll(obj) {
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr) && typeof obj[attr] == 'function') {
                obj[attr + 'Async'] = this.promisify(obj[attr]);
            }
        }
        return obj;
    }
}
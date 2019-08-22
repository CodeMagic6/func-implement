const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
  let self = this;
  self.status = PENDING;
  self.value = undefined;
  // collect resolve and reject callback functions
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];

  // 成功的处理函数
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(function () {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onResolvedCallbacks.map(cb => cb(value));
      }
    })
  }

  // 失败的处理函数
  function reject(reason) {
    setTimeout(function () {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.value = reason;
        self.onRejectedCallbacks.map(cb => cb(reason));
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {

  let self = this;
  let promise2;

  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
    return value
  };
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {
    throw reason
  };

  if (self.status === FULFILLED) {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  if (self.status === REJECTED) {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  if (self.status === PENDING) {
    promise2 = new Promise(function (resolve, reject) {

      self.onResolvedCallbacks.push(function (value) {
        try {
          let x = onFulfilled(value);
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      self.onRejectedCallbacks.push(function (value) {
        try {
          let x = onRejected(value);
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })

    })
  }
  return promise2;
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

Promise.resolve = function (value) {
  return new Promise(resolve => {
    resolve(value);
  })
}

Promise.reject = function (reason) {
  return new Promise(reject => {
    reject(reason);
  })
}

Promise.defer = Promise.deferred = function () {
  let defer = {}
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  })
  return defer;
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let done = gen(promises.length, resolve);
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function (data) {
        done(i, data);
      }, reject)
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  })
}

function gen(times, cb) {
  let count = 0,
    result = [];
  return function (i, data) {
    result[i] = data;
    if (++count === times) {
      cb(result)
    }
  }
}

function resolvePromise(promise2, x, resolve, reject) {

  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  let called = false,
    then;
  if (x !== null && ((typeof x === 'function' || typeof x === 'object'))) {
    try {
      then = x.then
      if (typeof then === 'function') {
        then.call(x, function (y) {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, function (e) {
          if (called) return;
          called = true;
          reject(e)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e)
    }
  } else {
    resolve(x)
  }
}

module.exports = Promise;
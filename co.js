// TODO co函数的实现

function co(gen){
    let it = gen();
    return new Promise(function(resolve, reject){
        !function next(lastValue){
            let { value, done } = it.next(lastValue);
            if(done){
                resolve(value);
            } else {
                value.then(next, reason => reject(reason));
            }
        }();
    });
}

// co函数关键，1，一个自执行的next函数。 2，
function co(gen){
    let it = gen();
    return new Promise(function(resolve, reject){
        !function next(lastValue){
            let { value, done } = it.next(lastValue);
            if(done){
                resolve(value);
            } else {
                value.then(next, reason => reject(reason));
            }
        }();
    });
}
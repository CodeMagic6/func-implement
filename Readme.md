1，定义状态变量 pending onFulfilled onRejected 且状态只能从pending变成其他两种中的一种，且不可逆

2，Promise构造函数中定义成功的处理函数数组，及失败的回调函数数组。onFulfilledCallbacks, onRejectedCallbacks

3，定义resolve，reject函数

4，执行executor(resolve, reject)

5，Promise的原型上拓展then方法，then方法中存在三种可能，1，状态仍然是pending，2，状态已经是onFulfilled，3，状态已经是onRejected

6，then返回一个Promise，then的返回值x的处理

7，全程try，catch的捕获与处理

8，针对返回值x的情况处理，比如其类型可能是Promise，function, object, value

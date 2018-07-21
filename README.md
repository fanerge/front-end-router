# front-end-router
## 实现原理
###	hash路由
1.	通过在 window 对象上监听 hashchange 事件触发为每个hash值设置的回调函数（更换当前组件及更改组件state等）。
2.	我们可以通过 location 对象的hash属性获取当前哈希部分（如'#red'包括'#'号）。         
3.	我们可以用 Array 和 Object 来实现浏览器的前进后退功能。
4.	具体原理可参见代码中的注释。

##	h5路由
1.	通过在 window 对象上监听 popstate 事件，注：调用history.pushState()或者history.replaceState()不会触发popstate事件. popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法).
2.	为各个路径绑定监听回调函数，以便路由匹配时触发。
3.	由于 history 对象 的 PushState 和 replaceState 只能添加和修改历史记录中的条目并不会触发 popstate 上的回调函数，所以我们需要用用代码触发对应的回调函数。
4.	具体原理可参见代码中的注释。

[点击这里查看demo](https://fanerge.github.io/front-end-router/)
[MDN-popstate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onpopstate)
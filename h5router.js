class H5Routers {
	constructor(){
		// 保存应用所有的路由以key:value形式
		this.routers = {};
		// 在初始化时监听popstate事件
		this._bindPopState();
	}
	
	// 初始化路由
	init(path){
		history.replaceState({path: path}, null, path);
		this.routers[path] && this.routers[path]();
	}
	
	// 将路径和对应回调函数加入hashMap储存
	route(path, callback){
		debugger;
		this.routers[path] = callback || function(){};
	}
	
	// 触发路由对应回调
	go(path){
		 history.pushState({path: path}, null, path);
		this.routers[path] && this.routers[path]();
	}
	
	
	
	// 监听popstate事件
	_bindPopState(){
		window.addEventListener('popstate', e => {
			const path = e.state && e.state.path;
			this.routers[path] && this.routers[path]();
		});
	}
}

// 使用路由
Router = new H5Routers();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

// 因为测试页面放在这个目录下https://fanerge.github.io/front-end-router/，所以下面路由都以/front-end-router/开始
Router.route('/front-end-router/', function() {
  changeBgColor('yellow');
});
Router.route('/front-end-router/blue', function() {
  changeBgColor('blue');
});
Router.route('/front-end-router/green', function() {
  changeBgColor('green');
});

ul.addEventListener('click', e => {
  if (e.target.tagName.toUpperCase() === 'A') {
    e.preventDefault();
    Router.go(e.target.getAttribute('href'));
  }
});







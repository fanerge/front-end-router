class HashRouters {
	constructor(){
		// 以键值对形式存储路由，格式为path：callback
		this.routers = {};
		// 当前路由的URL（hash部分）
		this.currentUrl = '';
		
		// 绑定事件的this为该实例
		this.route = this.route.bind(this);
		this.refresh = this.refresh.bind(this);
		
		// 在实例化时就需要绑定对于事件
		window.addEventListener('load', this.refresh, false);
		window.addEventListener('hashchange', this.refresh, false);
	}
	
	// 将path路径与对应的callback函数存储
	route(path, callback){
		this.routers[path] = callback || function(){};
	}
	
	// 刷新
	refresh(){
		let array = Object.keys(this.routers);
		// 获取当前URL中的hash部分
		this.currentUrl = window.location.hash.slice(1) || '/';
		if(array.includes(this.currentUrl)){
			this.routers[this.currentUrl]();
		}else{
			alert('该path不在该应用中，我们将开发404页面代替')
		}
		// 执行当前hash路径的callback函数
		
	}
}

// 使用路由
Router = new HashRouters();

function changeBgColor(color){
	let content = document.querySelector('body');
	content.style.backgroundColor = color;
}

Router.route('/', () => {
	changeBgColor('yellow')
});

Router.route('/blue', () => {
	changeBgColor('blue')
});

Router.route('/color/red', () => {
	changeBgColor('red')
});

Router.route('/color/red', () => {
	changeBgColor('red')
});




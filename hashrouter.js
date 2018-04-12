class HashRouters {
	constructor(){
		// 以键值对形式存储路由，格式为path：callback
		this.routers = {};
		// 当前路由的URL（hash部分）
		this.currentUrl = '';
		// 记录使用过的路由
		this.history = [];
		// 作为路由指针，指向当前路由即为this.history的末尾
		this.currentIndex = this.history.length - 1;
		
		// 绑定事件的this为该实例
		this.refresh = this.refresh.bind(this);
		// 前进和后退
		// 默认不可能有前进和后退动作
		this.isForward = false;
		this.isBack = false;
		this.back = this.back.bind(this);
		this.forward = this.forward.bind(this);
		
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
			if(!this.isBack && !this.isForward){
				// 后退
				// 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
				// 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
				// 避免再次造成指针的不匹配,我们直接截取指针之前的数组
				// 此操作同时与浏览器自带后退功能的行为保持一致
				if(this.currentIndex === this.history.length - 1){
					this.history = this.history.slice(0, this.currentIndex + 1);
					this.history.push(this.currentUrl);
					this.currentIndex++;
				}
				
				if(this.currentIndex < this.history.length - 1){
					this.history = this.history.splice(this.currentIndex, 0, this.currentUrl );
					this.currentIndex++;
				}
				
				this.routers[this.currentUrl]();
				console.log('指针:', this.currentIndex, 'history:', this.history);
				this.isBack = false;
				this.isForward = false;				
			}
			
		}else{
			alert('该path不在该应用中，我们将开发404页面代替')
		}
		// 执行当前hash路径的callback函数
	}
	
	// 前进
	forward(){
		this.isForward = true;
		if (this.currentIndex >= this.history.length - 1 ){
			this.currentIndex = this.history.length - 1
		}else{
			this.currentIndex = this.currentIndex + 1;
			location.hash = `#${this.history[this.currentIndex]}`;
			this.routers[this.history[this.currentIndex]]();
		}
		console.log('指针:', this.currentIndex, 'history:', this.history);
	}
	// 后退
	back(){
		// 如果指针小于0的话就不存在对应hash路由了,因此锁定指针为0即可	
		// 后退操作设置为true
		this.isBack = true;
		if (this.currentIndex <= 0 ){
			this.currentIndex = 0
		}else{
			this.currentIndex = this.currentIndex - 1;
			// 指针后退后，location.hash也应该发生变化
			location.hash = `#${this.history[this.currentIndex]}`;
			// 执行指针目前指向hash路由对应的callback
			this.routers[this.history[this.currentIndex]]();
		}
		console.log('指针:', this.currentIndex, 'history:', this.history);
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

// 前进后退
let forward = document.querySelector('#forward');
let back = document.querySelector('#back');
forward.addEventListener('click', Router.forward, false)
back.addEventListener('click', Router.back, false)

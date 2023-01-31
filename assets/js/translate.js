/**
 * 国际化，网页自动翻译。
 */
var translate = {
	/*
	 * 当前的版本
	 */
	version:1.0,
	/*
	 * 翻译的对象，也就是 new google.translate.TranslateElement(...)
	 */
	translate:null,
	/*
	 * 支持哪些语言切换，包括：de,hi,lt,hr,lv,ht,hu,zh-CN,hy,uk,mg,id,ur,mk,ml,mn,af,mr,uz,ms,el,mt,is,it,my,es,et,eu,ar,pt-PT,ja,ne,az,fa,ro,nl,en-GB,no,be,fi,ru,bg,fr,bs,sd,se,si,sk,sl,ga,sn,so,gd,ca,sq,sr,kk,st,km,kn,sv,ko,sw,gl,zh-TW,pt-BR,co,ta,gu,ky,cs,pa,te,tg,th,la,cy,pl,da,tr
	 */
	includedLanguages:'zh-CN,en,it',
	/*
	 * 资源文件url的路径
 	 */
	resourcesUrl:'//res.zvo.cn/translate',
	/*
	 * 当前的版本
	 */
	//localLanguage:'zh-CN',
	localLanguage:'it',
	
	/**
	 * google翻译执行的
	 */
	googleTranslateElementInit:function(){
		var selectId = 'translate';
		if(document.getElementById('translate').innerHTML.indexOf('translateSelectLanguage') > 0){
			//已经创建过了，那就不在创建了
			selectId = '';
		}
		
		translate.translate = new google.translate.TranslateElement(
			{
				//这参数没用，请忽略
				pageLanguage: 'zh-CN',
				//一共80种语言选择，这个是你需要翻译的语言，比如你只需要翻译成越南和英语，这里就只写en,vi
				//includedLanguages: 'de,hi,lt,hr,lv,ht,hu,zh-CN,hy,uk,mg,id,ur,mk,ml,mn,af,mr,uz,ms,el,mt,is,it,my,es,et,eu,ar,pt-PT,ja,ne,az,fa,ro,nl,en-GB,no,be,fi,ru,bg,fr,bs,sd,se,si,sk,sl,ga,sn,so,gd,ca,sq,sr,kk,st,km,kn,sv,ko,sw,gl,zh-TW,pt-BR,co,ta,gu,ky,cs,pa,te,tg,th,la,cy,pl,da,tr',
	            includedLanguages: translate.includedLanguages,
				//选择语言的样式，这个是面板，还有下拉框的样式，具体的记不到了，找不到api~~  
				layout: 0,
				//自动显示翻译横幅，就是翻译后顶部出现的那个，有点丑，设置这个属性不起作用的话，请看文章底部的其他方法
				//autoDisplay: false, 
				//disableAutoTranslation:false,
				//还有些其他参数，由于原插件不再维护，找不到详细api了，将就了，实在不行直接上dom操作
			}, 
			selectId //触发按钮的id
		);
	},
	
	/**
	 * 初始化，如加载js、css资源
	 */
	init:function(){
		/****** 先判断当前协议，定义资源路径  ******/
		var protocol = window.location.protocol;
		if(window.location.protocol == 'file:'){
			//本地的，那就用http
			protocol = 'http:';
		}
		if(this.resourcesUrl.indexOf('://') == -1){
			//还没设置过，进行设置
			this.resourcesUrl = protocol + this.resourcesUrl;
		}
		
		//this.resourcesUrl = 'file:///Users/apple/git/translate';
		
		/*********** 判断translate 的id是否存在，不存在就创建一个  */
		if(document.getElementById('translate') == null){
			var body_trans = document.getElementsByTagName('body')[0];
			var div = document.createElement("div");  //创建一个script标签
			div.id="translate";
			body_trans.appendChild(div);
		}
	},
	/**
	 * 执行翻译操作
	 */
	execute:function(){
		/****** 先加载资源  ******/
		var head0 = document.getElementsByTagName('head')[0];
		var script = document.createElement("script");  //创建一个script标签
		script.type = "text/javascript";
		//script.async = true;
		script.src = this.resourcesUrl+'/js/element.js';
		head0.appendChild(script);
	},
}


try{
	translate.init();
	//translate.execute();
}catch(e){ console.log(e); }
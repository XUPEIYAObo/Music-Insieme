
		function delete1(id)
		{
			localStorage.removeItem(id);
			this.Storage.writeData();
		}
		var Storage =
		{
			saveData:function()//save msg data
			{
				var data = document.querySelector("#post textarea");
                  if(data.value != "")
				  {
                      var time = new Date().getTime() + Math.random() * 5;//getTime是Date对象中的方法，作用是返回 1970年01月01日至今的毫秒数
					  localStorage.setItem(time, data.value + "|" + "匿名发言者" + "|" + this.getDateTime());//将毫秒数存入Key值中，可以降低Key值重复率
           
						data.value = "";
                      this.writeData();
                  }
                  else
                  {
                      alert("Please leave your message！");
                 }
              },
              writeData:function()//output data
              {
                 var dataHtml = "", data = "";
                  for(var i = localStorage.length-1; i >= 0; i--)//效率更高的循环方法
                  {
                      data = localStorage.getItem(localStorage.key(i)).split("|");
					  dataHtml += "<span style=>" + data[1] + "<span style=\"float:right\">" + data[2] + "</span><p><span class=\"msg\">" + data[0] + "<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" + localStorage.key(i) + ");\" value=\"删除\"/>" + "</span></p>";
                  }
                  document.getElementById("comment").innerHTML = dataHtml;
              },
              getDateTime:function()//获取日期时间，例如 2012-03-08 12:58:58
              {
                  var isZero = function(num)//私有方法，自动补零
                  {
                      if(num < 10)
                     {
                          num = "0" + num;
                      }
                      return num;
                  }
                  
                  var d = new Date();
                  return d.getFullYear() + "-" + isZero(d.getMonth() + 1) + "-" + isZero(d.getDate()) + " " + isZero(d.getHours()) + ":" + isZero(d.getMinutes()) + ":" + isZero(d.getSeconds());
              }            
          }
		  
		  //分享到百度贴吧
		  	var _title,_source,_sourceUrl,_pic,_showcount,_desc,_summary,_site;
		    var  _url = 'https://www.bilibili.com/';
		  	function shareToTieba(event){
		  	    event.preventDefault();
		  	    // var _shareUrl = 'http://tieba.baidu.com/f/commit/share/openShareApi?';
		  	    //     _shareUrl += 'title=' + encodeURIComponent(_title||document.title);  //分享的标题
		  	    //     _shareUrl += '&url=' + encodeURIComponent(_url||document.location);  //分享的链接
				var	_shareUrl =  'https://www.xiaohongshu.com/explore/63d860ea000000001d011576?app_platform=ios&app_version=7.73.1&share_from_user_hidden=true&type=normal&xhsshare=WeixinSession&appuid=615aa96e000000000201fcd0&apptime=1675128365'
				window.open(_shareUrl,'_blank');
		  	}
          
          window.onload = function()
          {
              Storage.writeData();//当打开页面的时候，先将localStorage中的数据输出一边，如果没有数据，则输出空
              document.getElementById("postBt").onclick = function(){Storage.saveData();}//发表评论按钮添加点击事件，作用是将localStorage中的数据输出
          }




var text=document.querySelector('.navtext');
var nowsj=document.querySelector('.now .box');
var nows=document.querySelector('.now .t .s');
var oversj=document.querySelector('.over .box');
var overs=document.querySelector('.over .t .s');
var clear=document.querySelector('.nav .naver p')

text.onkeydown=function(e){
	if (e.keyCode==13) {
       var val=this.value;
       if (val=="") {
       	alert('内容不能为空！')
       	return;
       }
       var data=getData();
	   data.push({title:val,done:false});
	   text.value="";
	   saveData(data);
	   reload();
	}

}

function changestate(i,sta){
   var data=getData();
   data[i].done=sta;
   saveData(data);
   reload();
}
function changetext(i,text){
	var data=getData();
	if (data[i].title==text) {
		return;
	}
	data[i].title=text;
	saveData(data);
}
function del(i){
	var data=getData();
	data.splice(i,1);
	saveData(data);
	reload();
}
function  getData(){
	var data=JSON.parse(localStorage.getItem('todo'));
	return data||[];
}
function  saveData(data){
	localStorage.setItem('todo',JSON.stringify(data));
}
reload();
function reload(){
	var nowStr="";
	    overStr="";
	    nowNum="";
	    overNum="";
	 var data=getData();
	for (var i = 0; i < data.length; i++) {
		if (data[i].done==false) {
			nowStr+='<div class="sj"><div class="sk"></div><input type="checkbox" onclick=changestate('+i+',true)><p contenteditable onblur=changetext('+i+',this.innerHTML)>'+data[i].title+'</p><img src="1.png" alt="" width="25" height="25" onclick=del('+i+')></div>';
			nowNum++;
		}else{
			overStr+='<div class="sj"><div class="sk"></div><input type="checkbox" checked onclick=changestate('+i+',false)><p contenteditable onblur=changetext('+i+',this.innerHTML)>'+data[i].title+'</p><img src="1.png" alt="" width="25" height="25" onclick=del('+i+')></div>';
			overNum++;
		}
	}
	nowsj.innerHTML=nowStr;
	nows.innerHTML=nowNum;
	oversj.innerHTML=overStr;
	overs.innerHTML=overNum;
}
clear.onclick=function(e){
	// var data=getData();
	// data=[];
	// saveData(data);
	var ev=e||window.event;
	ev.preventDefault();
	localStorage.clear() ;
	reload();
}
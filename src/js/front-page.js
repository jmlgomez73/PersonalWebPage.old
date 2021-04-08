var TxtType=function(n,t,i){this.toRotate=t;this.el=n;this.loopNum=0;this.period=parseInt(i,10)||2e3;this.txt="";this.tick();this.isDeleting=!1};TxtType.prototype.tick=function(){var r=this.loopNum%this.toRotate.length,t=this.toRotate[r],i,n;this.txt=this.isDeleting?t.substring(0,this.txt.length-1):t.substring(0,this.txt.length+1);this.el.innerHTML='<span class="wrap">'+this.txt+"<\/span>";i=this;n=200-Math.random()*100;this.isDeleting&&(n/=3);this.isDeleting||this.txt!==t?this.isDeleting&&this.txt===""&&(this.isDeleting=!1,this.loopNum++,n=500):(n=this.period,this.isDeleting=!0);setTimeout(function(){i.tick()},n)};window.onload=function(){for(var r,u,i,t=document.getElementsByClassName("typewrite"),n=0;n<t.length;n++)r=t[n].getAttribute("data-type"),u=t[n].getAttribute("data-period"),r&&new TxtType(t[n],JSON.parse(r),u);i=document.createElement("style");i.type="text/css";i.innerHTML=`.typewrite > .wrap {
      color:#fff;
      border-right: 0.08em solid #2bbc8a;
      animation: blink-cursor 0.70s infinite;
  }
  @keyframes blink-cursor {
      0% { border-right: 0.08em solid #2bbc8a; }
      50% { border-right: 0.08em solid #2bbc8a; }
      51% { border-right: 0.08em solid transparent; }
      100% { border-right: 0.08em solid transparent; }
  }`;document.body.appendChild(i)}
(this["webpackJsonpobama-spillet"]=this["webpackJsonpobama-spillet"]||[]).push([[0],{11:function(e,a,t){e.exports=t.p+"static/media/obama.1bb75a73.png"},14:function(e,a,t){e.exports=t.p+"static/media/american-flag.8ced8f71.png"},21:function(e,a,t){e.exports=t.p+"static/media/obama-sangen.17e3cc89.mp3"},24:function(e,a,t){e.exports=t(35)},29:function(e,a,t){},35:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),s=t(20),i=t.n(s),r=(t(29),t(6)),c=t(7),m=t(9),l=t(8),u=t(22),h=t(1),p=t(14),b=t.n(p),d=t(11),v=t.n(d),w=function(e){Object(m.a)(t,e);var a=Object(l.a)(t);function t(){return Object(r.a)(this,t),a.apply(this,arguments)}return Object(c.a)(t,[{key:"handlePlay",value:function(){this.props.history.push("/play")}},{key:"componentDidMount",value:function(){(new Image).src=b.a,(new Image).src=v.a}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("div",{className:"container wrapper"},o.a.createElement("div",{className:"center"},o.a.createElement("h1",{className:"font-weight-bold display-2 text-white"},"Vokt dem for Obama"),o.a.createElement("button",{onClick:function(){return e.handlePlay()},className:"btn btn-american-blue"},o.a.createElement("h2",{className:"font-weight-bold text-white"},"Spill")),o.a.createElement("h3",{className:"font-weight-bold text-white"},"Hold musepekeren unna Obama"))))}}]),t}(n.Component),f=t(13),g=t(21),y=t.n(g),O=function(){function e(a,t){Object(r.a)(this,e),this.pos=void 0,this.acc=void 0,this.pos=a,this.acc=t}return Object(c.a)(e,[{key:"move",value:function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,n=this.pos.x+this.acc.x*t,o=this.pos.y+this.acc.y*t,s=a.w,i=a.h;n<0||n+s>e.x+e.w?this.acc.x=this.acc.x>0?-1:1:this.pos.x=n,o<0||o+i>e.y+e.h?this.acc.y=this.acc.y>0?-1:1:this.pos.y=o}}]),e}(),x=function(e,a){return Math.max(e,Math.floor(Math.random()*a))},D=function(e,a){return e.left<=a.x&&e.right>=a.x&&e.top<=a.y&&e.bottom>=a.y},E=function(e,a){var t=a.getBoundingClientRect();t&&(e.width=t.width,e.height=t.height)},S=function(e){Object(m.a)(t,e);var a=Object(l.a)(t);function t(){var e;Object(r.a)(this,t);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=a.call.apply(a,[this].concat(s))).canvas=o.a.createRef(),e.canvasWrapper=o.a.createRef(),e.obamaImg=new Image,e.americanFlag=new Image,e.obamaSong=new Audio(y.a),e.spawnInterval=null,e.updateInterval=null,e.obamas=[],e.obamaDimensions={w:50,h:50},e.obamaSpeed=1,e.mousePos=new DOMPoint,e.state={gameOver:!1,score:0,paused:!0},e.pauseGame=function(){e.setState({paused:!0}),e.obamaSong.pause()},e.resumeGame=function(){e.setState({paused:!1}),e.obamaSong.play()},e.handleStartGame=function(){console.log("start");var a=Object(f.a)(e).obamaSong;a.loop=!0,a.currentTime=0,e.setState({gameOver:!1,score:0}),e.obamas=[],e.updateInterval=window.requestAnimationFrame(e.updateObama),e.spawnInterval=window.setInterval(e.spawnObama,1e3)},e.handleGameOver=function(){e.obamaSong.pause(),e.obamaSong.currentTime=0,e.setState({gameOver:!0}),e.spawnInterval&&window.clearInterval(e.spawnInterval),e.updateInterval&&window.cancelAnimationFrame(e.updateInterval),e.props.onGameOver(e.state.score)},e.drawObamas=function(){var a=e.canvas.current,t=Object(f.a)(e),n=t.obamaImg,o=t.obamaDimensions,s=o.w,i=o.h;if(a){var r=a.getContext("2d");r&&(r.clearRect(0,0,a.width,a.height),e.obamas.forEach((function(e){var a=e.pos,t=a.x,o=a.y;r.drawImage(n,t,o,s,i)})))}},e.spawnObama=function(){if(e.canvas.current&&!e.state.paused){var a=e.canvas.current,t=a.width,n=a.height,o=e.obamaDimensions,s=o.w,i=o.h,r=x(s,t-s),c=x(i,n-i);e.obamas.push(new O({x:r,y:c},{x:Math.random()<.5?1:-1,y:Math.random()<.5?1:-1})),e.setState({score:e.obamas.length})}},e.updateObama=function(){if(e.canvas.current&&!e.state.paused){var a=e.canvas.current,t=a.width,n=a.height;e.obamas.forEach((function(a){a.move({x:0,y:0,w:t,h:n},{w:e.obamaDimensions.w,h:e.obamaDimensions.h},e.obamaSpeed);var o=new DOMRect(a.pos.x,a.pos.y,e.obamaDimensions.w,e.obamaDimensions.h);D(o,e.mousePos)&&e.handleGameOver()})),e.drawObamas(),e.state.gameOver||window.requestAnimationFrame(e.updateObama)}else window.requestAnimationFrame(e.updateObama)},e.updateObamaDimensions=function(){if(console.log(e.canvas.current),e.canvas.current){var a=e.canvas.current.width;a>3500?(e.obamaDimensions.w=200,e.obamaDimensions.h=256,e.obamaSpeed=5):a>2e3?(e.obamaDimensions.w=100,e.obamaDimensions.h=128,e.obamaSpeed=4):a>1200?(e.obamaDimensions.w=80,e.obamaDimensions.h=102,e.obamaSpeed=3):a>992?(e.obamaDimensions.w=60,e.obamaDimensions.h=77,e.obamaSpeed=3):a>768?(e.obamaDimensions.w=40,e.obamaDimensions.h=51,e.obamaSpeed=2):a>576?(e.obamaDimensions.w=20,e.obamaDimensions.h=26,e.obamaSpeed=2):(e.obamaDimensions.w=10,e.obamaDimensions.h=13,e.obamaSpeed=2)}},e}return Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,a=this.obamas,t=this.obamaImg,n=this.americanFlag,o=this.obamaDimensions,s=this.canvas.current,i=this.canvasWrapper.current;s&&i?(t.src=v.a,n.src=b.a,n.onload=function(){return e.handleStartGame()},E(s,i),this.updateObamaDimensions(),s.onresize=function(){E(s,i),e.updateObamaDimensions()},s.onmousemove=function(t){var n=e.mousePos=function(e,a){var t=e.getBoundingClientRect();return new DOMPoint(a.clientX-t.left,a.clientY-t.top)}(s,t);a.some((function(e){var a=new DOMRect(e.pos.x,e.pos.y,o.w,o.h);return D(a,n)}))&&e.handleGameOver()},s.onmouseleave=function(){e.pauseGame()},s.onmouseenter=function(){e.resumeGame()}):console.error("Failed to load references")}},{key:"componentWillUnmount",value:function(){this.handleGameOver()}},{key:"render",value:function(){var e=this.state.score,a=this.props.className;return o.a.createElement("div",{className:a,ref:this.canvasWrapper,style:{width:"80%",height:"80%"}},o.a.createElement("canvas",{className:"border border-white",ref:this.canvas,style:{backgroundImage:"url(".concat(this.americanFlag.src,")"),backgroundRepeat:"no-repeat",backgroundSize:"cover"}}),o.a.createElement("div",{className:"d-flex text-white text-bold"},o.a.createElement("div",{className:"display-2 mx-auto"},e)))}}]),t}(n.Component),j=function(e){Object(m.a)(t,e);var a=Object(l.a)(t);function t(){var e;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=a.call.apply(a,[this].concat(o))).state={playing:!0,score:0},e}return Object(c.a)(t,[{key:"handlePlayAgain",value:function(){this.setState({playing:!0,score:0})}},{key:"render",value:function(){var e=this,a=this.state,t=a.playing,n=a.score;return o.a.createElement("div",{className:"h-100 mt-4"},t?o.a.createElement(S,{className:"mx-auto",onGameOver:function(a){return e.setState({playing:!1,score:a})}}):o.a.createElement("div",{className:"wrapper"},o.a.createElement("div",{className:"center"},o.a.createElement("img",{className:"mb-1",src:v.a,width:"100",height:"auto",alt:"obama"}),o.a.createElement("h1",{className:"font-weight-bold display-2 text-white"},"Spillet er over"),o.a.createElement("h2",{className:"font-weight-bold text-american-blue mb-4"},"Antall Obamahoder f\xf8r du tapte:"),o.a.createElement("h2",{className:"font-weight-bold text-american-blue"},n),o.a.createElement("button",{onClick:function(){return e.handlePlayAgain()},className:"btn btn-american-blue"},o.a.createElement("h2",{className:"font-weight-bold text-white"},"Spill igjen")))))}}]),t}(n.Component),k=function(e){Object(m.a)(t,e);var a=Object(l.a)(t);function t(){return Object(r.a)(this,t),a.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(u.a,{basename:"/obama-spillet"},o.a.createElement(h.c,null,o.a.createElement(h.a,{exact:!0,path:"/",component:w}),o.a.createElement(h.a,{exact:!0,path:"/play",component:j})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.09c151f8.chunk.js.map
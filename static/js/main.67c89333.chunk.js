(this["webpackJsonpfinal-comp426"]=this["webpackJsonpfinal-comp426"]||[]).push([[0],{33:function(e,t,a){},51:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var s=a(2),n=a.n(s),r=a(44),i=a.n(r),c=a(20),o=a(5),l=(a(51),a(6)),u=a.n(l),h=a(19),p=a(28),d=a(10),j=a(11),b=a(13),m=a(12),v=(a(33),a(25));a(53),a(78);v.a.initializeApp({apiKey:"AIzaSyB-DMBKi2_wbv0hjXobVt1QWLaSKwZ6kJc",authDomain:"final-comp426.firebaseapp.com",projectId:"final-comp426",storageBucket:"final-comp426.appspot.com",messagingSenderId:"24353847634",appId:"1:24353847634:web:de8214c3a05ca07843e28b",measurementId:"G-QMTKDZKGPX"});var f=v.a.auth(),x=v.a.firestore(),O=a(1);function g(e){return Object(O.jsx)(y,{img:"".concat("/final-comp426","/bullet.png"),width:"4px",height:"16px",left:e.x,top:e.y})}function y(e){return Object(O.jsx)("img",{alt:"",src:e.img,width:e.width,height:e.height,style:{left:e.left,top:e.top}})}var k=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(d.a)(this,a),(s=t.call(this,e)).processKey=function(e){switch(e.key){case"ArrowLeft":s.movingLeft=10,s.movingRight=0;break;case"ArrowRight":s.movingRight=10,s.movingLeft=0;break;case" ":s.shoot()}},s.shoot=function(){var e=s.state.bullets;e.push({x:s.state.x+s.props.dimension/2,y:s.props.y-16}),s.setState({x:s.state.x,y:s.state.y,bullets:e}),s.props.onUpdateBullets(e)},s.movingLeft=0,s.movingRight=0,s.state={x:e.x,y:e.y,bullets:[]},s}return Object(j.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.keyEventListener=window.addEventListener("keydown",this.processKey),this.updateInterval=setInterval((function(){e.update()}),50)}},{key:"componentWillUnmount",value:function(){this.pauseGame()}},{key:"pauseGame",value:function(){window.removeEventListener("keydown",this.processKey),clearInterval(this.updateInterval)}},{key:"update",value:function(){this.movePlayer(),this.moveBullets()}},{key:"movePlayer",value:function(){this.movingLeft?(this.state.x>5?this.setState({x:this.state.x-5}):this.setState({x:0}),this.movingLeft-=1):this.movingRight&&(this.state.x<this.props.game_dimension-this.props.dimension-5?this.setState({x:this.state.x+5}):this.setState({x:this.props.game_dimension-this.props.dimension}),this.movingRight-=1),this.props.onUpdate(this.state.x,this.state.y)}},{key:"moveBullets",value:function(){for(var e=this.state.bullets,t=e.length-1;t>=0;t--)e[t].y-=20,e[t].y<0&&e.splice(t,1);this.setState({x:this.state.x,y:this.state.y,bullets:e}),this.props.onUpdateBullets(e)}},{key:"render",value:function(){var e=this.state.bullets.map((function(e,t){return Object(O.jsx)("div",{children:Object(O.jsx)(g,{x:e.x,y:e.y})},t)}));return Object(O.jsxs)("div",{children:[Object(O.jsx)(y,{img:"".concat("/final-comp426","/invader.png"),width:this.props.dimension+"px",height:this.props.dimension+"px",left:this.state.x,top:this.props.y}),e]})}}]),a}(n.a.Component),w=a(46),S=35,C=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(d.a)(this,a),(s=t.call(this,e)).state={aliens:s.props.aliens,bullets:s.props.bullets},s}return Object(j.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.updateInterval=setInterval((function(){e.update()}),50),this.newBulletInterval=setInterval((function(){e.setState({bullets:e.newBullet()})}),500)}},{key:"componentWillUnmount",value:function(){this.pauseGame()}},{key:"pauseGame",value:function(){clearInterval(this.updateInterval),clearInterval(this.newBulletInterval)}},{key:"update",value:function(){var e=this.moveAliens(),t=Object(w.a)(e,3),a=t[0],s=t[1],n=t[2];this.setState({bullets:this.updateBullets()}),this.props.onUpdate(a,s,this.props.aliens,n)}},{key:"moveAliens",value:function(){var e=this.props.x,t=this.props.y,a=this.props.movingRight;return a?(e+=5)===this.props.dimension-10-S*this.props.cols&&(t+=10,a=!1):10===(e-=5)&&(t+=10,a=!0),[e,t,a]}},{key:"updateBullets",value:function(){for(var e=this.state.bullets,t=e.length-1;t>=0;t--)e[t].y+=15,e[t].y>=this.props.dimension&&e.splice(t,1);return this.props.onUpdateBullets(e),e}},{key:"newBullet",value:function(){var e=this.state.bullets,t=this.getBottomAliens(),a=Math.floor(Math.random()*t.length);return e.push({x:this.props.x+t[a].col*S+17.5,y:this.props.y+t[a].row*S+S}),this.props.onUpdateBullets(e),e}},{key:"getBottomAliens",value:function(){for(var e=[],t=0;t<this.props.cols;t++){for(var a=this.props.rows-1;a>=0&&!this.props.aliens[a][t];)a-=1;-1!==a&&e.push({row:a,col:t})}return e}},{key:"render",value:function(){for(var e=[],t=0;t<this.props.aliens.length;t++)for(var a=0;a<this.props.aliens[0].length;a++)this.props.aliens[t][a]&&e.push({x:this.props.x+a*S,y:this.props.y+t*S});var s=e.map((function(e,t){return Object(O.jsx)("div",{children:Object(O.jsx)(_,{x:e.x,y:e.y})},t)})),n=this.state.bullets.map((function(e,t){return Object(O.jsx)("div",{children:Object(O.jsx)(I,{x:e.x,y:e.y})},t)}));return Object(O.jsxs)("div",{children:[s,n]})}}]),a}(n.a.Component),_=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(j.a)(a,[{key:"render",value:function(){return Object(O.jsx)(A,{img:"".concat("/final-comp426","/alien.png"),width:"35px",height:"35px",left:this.props.x,top:this.props.y})}}]),a}(n.a.Component),I=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(j.a)(a,[{key:"render",value:function(){return Object(O.jsx)(A,{img:"".concat("/final-comp426","/bullet2.png"),width:"2px",height:"15px",left:this.props.x,top:this.props.y})}}]),a}(n.a.Component);function A(e){return Object(O.jsx)("img",{src:e.img,alt:"",width:e.width,height:e.height,style:{left:e.left,top:e.top}})}var B=C,N=a(30),E=a.n(N),M=41.25,L=35,U=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).startGame=function(t){t.preventDefault(),e.setState({gameStart:!0})},e.player_x=null,e.player_y=null,e.state={alien_x:10,alien_y:10,movingRight:!0,alien_bullets:[],player_bullets:[],player_lives:3,aliens:e.createAlienCrowd(),score:0,gameOver:!1,gameStart:!1},e}return Object(j.a)(a,[{key:"updatePlayer",value:function(e,t){this.player_x=e,this.player_y=t}},{key:"updateAliens",value:function(e,t,a,s){this.setState({aliens:a,alien_x:e,alien_y:t,movingRight:s}),this.hitPlayer()&&this.setState({gameOver:!0})}},{key:"updateAlienBullets",value:function(e){this.setState({alien_bullets:e}),this.checkForCollision()}},{key:"updatePlayerBullets",value:function(e){this.setState({player_bullets:e}),this.checkForShot()}},{key:"hitPlayer",value:function(){if(this.collision(this.player_x,this.player_y,M,M,this.state.alien_x,this.state.alien_y,385,175))for(var e=this.state.aliens.length-1;e>=0;e--)for(var t=0;t<this.state.aliens[0].length;t++)if(this.state.aliens[e][t]&&this.collision(this.player_x,this.player_y,M,M,this.state.alien_x+t*L,this.state.alien_y+e*L,L,L))return!0;return!1}},{key:"checkForCollision",value:function(){for(var e=this.state.alien_bullets,t=this.state.player_lives,a=this.state.gameOver,s=e.length-1;s>=0;s--){var n=e[s];this.collision(n.x,n.y,2,15,this.player_x,this.player_y,M,M)&&(e.splice(s,1),0===(t-=1)&&(a=!0,this.updateFirebase(this.state.score)))}this.setState({alien_bullets:e,player_lives:t,gameOver:a})}},{key:"updateFirebase",value:function(){var e=Object(h.a)(u.a.mark((function e(t){var a,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=f.currentUser,e.prev=1,e.next=4,x.collection("users").doc(a.uid).get();case 4:if(s=e.sent,!(t>s.data().high_score)){e.next=13;break}return e.prev=6,e.next=9,x.collection("users").doc(a.uid).set({high_score:t,username:s.data().username});case 9:e.next=13;break;case 11:e.prev=11,e.t0=e.catch(6);case 13:e.next=17;break;case 15:e.prev=15,e.t1=e.catch(1);case 17:case"end":return e.stop()}}),e,null,[[1,15],[6,11]])})));return function(t){return e.apply(this,arguments)}}()},{key:"checkForShot",value:function(){for(var e=this.state.player_bullets,t=this.state.aliens,a=this.state.score,s=e.length-1;s>=0;s--){var n=e[s];if(this.collision(n.x,n.y,4,16,this.state.alien_x,this.state.alien_y,385,175))for(var r=!1,i=t.length-1;i>=0;i--){for(var c=0;c<t[0].length;c++)if(!r&&t[i][c]&&this.collision(n.x,n.y,4,16,this.state.alien_x+c*L,this.state.alien_y+i*L,L,L)){r=!0,e.splice(s,1),t[i][c]=0,a+=10;break}if(r)break}}this.allEmpty(t)?(t=this.createAlienCrowd(),this.setState({alien_x:10,alien_y:10,aliens:t,score:a,alien_bullets:e,movingRight:!0})):this.setState({aliens:t,score:a,alien_bullets:e})}},{key:"allEmpty",value:function(e){for(var t=0;t<e.length;t++)for(var a=0;a<e[0].length;a++)if(e[t][a])return!1;return!0}},{key:"createAlienCrowd",value:function(){for(var e=[],t=0;t<5;t++){for(var a=[],s=0;s<11;s++)a.push(1);e.push(a)}return e}},{key:"collision",value:function(e,t,a,s,n,r,i,c){return e<n+i&&e+a>n&&t<r+c&&t+s>r}},{key:"render",value:function(){var e=this;return this.state.gameOver?Object(O.jsx)("div",{className:"Game",children:Object(O.jsx)(G,{score:this.state.score})}):this.state.gameStart?Object(O.jsxs)("div",{className:"Game",children:[Object(O.jsx)(k,{onUpdate:function(t,a){e.updatePlayer(t,a)},onUpdateBullets:function(t){e.updatePlayerBullets(t)},x:this.props.dimension/2-20.625,y:.85*this.props.dimension,dimension:M,game_dimension:this.props.dimension}),Object(O.jsx)(B,{onUpdate:function(t,a,s,n){e.updateAliens(t,a,s,n)},onUpdateBullets:function(t){e.updateAlienBullets(t)},x:this.state.alien_x,y:this.state.alien_y,rows:5,cols:11,dimension:this.props.dimension,bullets:this.state.alien_bullets,aliens:this.state.aliens,movingRight:this.state.movingRight}),Object(O.jsx)("div",{className:"Lives",children:Object(O.jsxs)("p",{children:["LIVES: ",this.state.player_lives]})}),Object(O.jsx)("div",{className:"Score",children:Object(O.jsxs)("p",{children:["SCORE: ",this.state.score]})})]}):Object(O.jsx)("div",{className:"Game",children:Object(O.jsx)("a",{href:"",onClick:this.startGame,className:"StartGame",children:"CLICK TO START"})})}}]),a}(n.a.Component),G=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(d.a)(this,a),(s=t.call(this,e)).handleTweet=function(){var e=Object(h.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,E()({method:"post",url:"https://comp426-1fa20.cs.unc.edu/a09/tweets",withCredentials:!0,data:{body:"Just scored ".concat(s.props.score," points in Space Invaders!")}});case 4:s.setState({tweetMessage:"Shared your score to COMP426 Twitter!"}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),s.setState({tweetMessage:"Couldn't post tweet! Login to comp426.com"});case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),s.reloadGame=function(e){e.preventDefault(),window.location.reload(!1)},s.getJoke=Object(h.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E()({method:"get",url:"https://icanhazdadjoke.com/",headers:{Accept:"text/plain"}});case 2:t=e.sent,s.setState({joke:t.data});case 4:case"end":return e.stop()}}),e)}))),s.state={joke:"",tweetMessage:""},s.getJoke(),s}return Object(j.a)(a,[{key:"render",value:function(){return Object(O.jsxs)("div",{className:"GameOver",children:[Object(O.jsx)("h3",{children:"GAME OVER"}),Object(O.jsxs)("p",{children:["Score: ",this.props.score]}),Object(O.jsx)("a",{href:"",onClick:this.reloadGame,children:"PLAY AGAIN"}),Object(O.jsx)("a",{href:"",onClick:this.handleTweet,children:"TWEET"}),Object(O.jsx)("p",{className:"tweetMessage",children:this.state.tweetMessage}),Object(O.jsxs)("p",{children:[Object(O.jsx)("span",{children:"A joke to cheer you up: "}),this.state.joke]})]})}}]),a}(n.a.Component),P=U,R=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).state={loggedIn:!1},e}return Object(j.a)(a,[{key:"componentDidMount",value:function(){var e=this;f.onAuthStateChanged((function(t){t&&e.setState({loggedIn:!0})}))}},{key:"render",value:function(){return this.state.loggedIn?Object(O.jsx)(o.a,{to:"/play"}):Object(O.jsxs)("div",{className:"Home",children:[Object(O.jsx)("h1",{children:"SPACE INVADERS"}),Object(O.jsxs)("h4",{children:[Object(O.jsx)(c.b,{to:"/login",children:"LOGIN"})," or ",Object(O.jsx)(c.b,{to:"/signup",children:"SIGN UP"})," to play"]})]})}}]),a}(n.a.Component),H=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).formChangeHandler=function(t){var a=t.target.name,s=t.target.value;e.setState(Object(p.a)({},a,s))},e.submitFormHandler=function(){var t=Object(h.a)(u.a.mark((function t(a){var s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),""!==e.state.email&&""!==e.state.password){t.next=4;break}return e.setState({errorMessage:"Must enter email/password"}),t.abrupt("return");case 4:return t.prev=4,t.next=7,f.signInWithEmailAndPassword(e.state.email,e.state.password);case 7:e.setState({signedIn:!0}),t.next=24;break;case 10:t.prev=10,t.t0=t.catch(4),s="",t.t1=t.t0.code,t.next="auth/invalid-email"===t.t1?16:"auth/user-not-found"===t.t1?18:"auth/wrong-password"===t.t1?20:22;break;case 16:return s="Invalid Email",t.abrupt("break",23);case 18:return s="Email not registered",t.abrupt("break",23);case 20:return s="Wrong password",t.abrupt("break",23);case 22:return t.abrupt("break",23);case 23:e.setState({errorMessage:s});case 24:case"end":return t.stop()}}),t,null,[[4,10]])})));return function(e){return t.apply(this,arguments)}}(),e.state={email:"",password:"",signedIn:!1,errorMessage:""},e}return Object(j.a)(a,[{key:"render",value:function(){return this.state.signedIn?Object(O.jsx)(o.a,{to:"/play"}):Object(O.jsxs)("div",{className:"Login",children:[Object(O.jsx)("h2",{children:"LOGIN"}),Object(O.jsxs)("form",{onSubmit:this.submitFormHandler,children:[Object(O.jsx)("input",{type:"text",name:"email",placeholder:"Email",onChange:this.formChangeHandler}),Object(O.jsx)("input",{type:"password",name:"password",placeholder:"Password",onChange:this.formChangeHandler}),Object(O.jsx)("p",{className:"errorMessage",children:this.state.errorMessage}),Object(O.jsxs)("div",{children:[Object(O.jsx)("a",{href:"",onClick:this.submitFormHandler,children:"SUBMIT"}),Object(O.jsx)("p",{children:Object(O.jsx)(c.b,{to:"/",children:"CANCEL"})})]})]})]})}}]),a}(n.a.Component),T=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).formChangeHandler=function(t){var a=t.target.name,s=t.target.value;e.setState(Object(p.a)({},a,s))},e.submitFormHandler=function(){var t=Object(h.a)(u.a.mark((function t(a){var s,n,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),""!==e.state.email&&""!==e.state.password&&""!==e.state.username){t.next=4;break}return e.setState({errorMessage:"Must enter username/email/password"}),t.abrupt("return");case 4:return t.prev=4,t.next=7,f.createUserWithEmailAndPassword(e.state.email,e.state.password);case 7:s=t.sent,n=s.user,e.addUser(n),e.setState({signedIn:!0}),t.next=27;break;case 13:t.prev=13,t.t0=t.catch(4),r="",t.t1=t.t0.code,t.next="auth/email-already-in-use"===t.t1?19:"auth/invalid-email"===t.t1?21:"auth/weak-password"===t.t1?23:25;break;case 19:return r="Email already registered",t.abrupt("break",26);case 21:return r="Invalid email",t.abrupt("break",26);case 23:return r="Password must be 6+ characters",t.abrupt("break",26);case 25:return t.abrupt("break",26);case 26:e.setState({errorMessage:r});case 27:case"end":return t.stop()}}),t,null,[[4,13]])})));return function(e){return t.apply(this,arguments)}}(),e.addUser=function(){var t=Object(h.a)(u.a.mark((function t(a){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{x.collection("users").doc(a.uid).set({username:e.state.username,high_score:0})}catch(s){}case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.state={username:"",email:"",password:"",signedIn:!1,errorMessage:""},e}return Object(j.a)(a,[{key:"render",value:function(){return this.state.signedIn?Object(O.jsx)(o.a,{to:"/play"}):Object(O.jsxs)("div",{className:"SignUp",children:[Object(O.jsx)("h2",{children:"CREATE AN ACCOUNT"}),Object(O.jsxs)("form",{children:[Object(O.jsx)("input",{type:"text",name:"username",placeholder:"Username",onChange:this.formChangeHandler}),Object(O.jsx)("input",{type:"text",name:"email",placeholder:"Email",onChange:this.formChangeHandler}),Object(O.jsx)("input",{type:"password",name:"password",placeholder:"Password",onChange:this.formChangeHandler}),Object(O.jsx)("p",{className:"errorMessage",children:this.state.errorMessage}),Object(O.jsxs)("div",{children:[Object(O.jsx)("a",{href:"",onClick:this.submitFormHandler,children:"SUBMIT"}),Object(O.jsx)("p",{children:Object(O.jsx)(c.b,{to:"/",children:"CANCEL"})})]})]})]})}}]),a}(n.a.Component),D=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).userSignOut=Object(h.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f.signOut();case 3:e.setState({signOut:!0}),t.next=8;break;case 6:t.prev=6,t.t0=t.catch(0);case 8:case"end":return t.stop()}}),t,null,[[0,6]])}))),e.state={signOut:!1},e}return Object(j.a)(a,[{key:"render",value:function(){return this.state.signOut?Object(O.jsx)(o.a,{to:"/"}):Object(O.jsxs)("div",{className:"Play",children:[Object(O.jsx)(W,{current:"play",signOut:this.userSignOut}),Object(O.jsx)(P,{dimension:550})]})}}]),a}(n.a.Component),F=function(e){Object(b.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).userSignOut=Object(h.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f.signOut();case 3:e.setState({signOut:!0}),t.next=8;break;case 6:t.prev=6,t.t0=t.catch(0);case 8:case"end":return t.stop()}}),t,null,[[0,6]])}))),e.getTopScores=function(){var t=Object(h.a)(u.a.mark((function t(a){var s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=e.state.leaderboard,t.prev=1,t.next=4,x.collection("users").orderBy("high_score","desc").limit(a).get();case 4:t.sent.forEach((function(e){s.push(e.data())})),t.next=10;break;case 8:t.prev=8,t.t0=t.catch(1);case 10:e.setState({leaderboard:s});case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}(),e.state={signOut:!1,leaderboard:[]},e.getTopScores(5),e}return Object(j.a)(a,[{key:"render",value:function(){if(this.state.signOut)return Object(O.jsx)(o.a,{to:"/"});var e=this.state.leaderboard.map((function(e,t){return Object(O.jsx)(K,{id:t,place:t+1,username:e.username,score:e.high_score},t)}));return Object(O.jsxs)("div",{className:"LeaderBoard",children:[Object(O.jsx)(W,{current:"leaderboard",signOut:this.userSignOut}),Object(O.jsx)(K,{id:-1,place:"place",username:"username",score:"score"},-1),e]})}}]),a}(n.a.Component),K=function(e){return-1===e.id?Object(O.jsxs)("div",{className:"LeaderBoardItem titles",children:[Object(O.jsx)("p",{children:e.place}),Object(O.jsx)("p",{children:e.username}),Object(O.jsx)("p",{children:e.score})]}):Object(O.jsxs)("div",{className:"LeaderBoardItem",children:[Object(O.jsx)("p",{children:e.place}),Object(O.jsx)("p",{children:e.username}),Object(O.jsx)("p",{children:e.score})]})},W=function(e){return"play"===e.current?Object(O.jsxs)("div",{className:"Header",children:[Object(O.jsx)("a",{className:"currentHeader",children:"PLAY"}),Object(O.jsx)(c.b,{to:"/leaderboard",children:"LEADERBOARD"}),Object(O.jsx)("a",{onClick:e.signOut,children:"SIGN OUT"})]}):Object(O.jsxs)("div",{className:"Header",children:[Object(O.jsx)(c.b,{to:"/play",children:"PLAY"}),Object(O.jsx)("a",{className:"currentHeader",children:"LEADERBOARD"}),Object(O.jsx)("a",{onClick:e.signOut,children:"SIGN OUT"})]})};i.a.render(Object(O.jsx)(c.a,{children:Object(O.jsxs)(o.d,{children:[Object(O.jsx)(o.b,{exact:!0,path:"/",component:R}),Object(O.jsx)(o.b,{exact:!0,path:"/login",component:H}),Object(O.jsx)(o.b,{exact:!0,path:"/signup",component:T}),Object(O.jsx)(o.b,{exact:!0,path:"/play",component:D}),Object(O.jsx)(o.b,{exact:!0,path:"/leaderboard",component:F})]})}),document.getElementById("root"))}},[[77,1,2]]]);
//# sourceMappingURL=main.67c89333.chunk.js.map
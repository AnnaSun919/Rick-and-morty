(this.webpackJsonprick_and_morty=this.webpackJsonprick_and_morty||[]).push([[0],{23:function(e,t,a){},24:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var c=a(1),n=a.n(c),r=a(18),s=a.n(r),i=(a(23),a(24),a(2)),o=a(0);var l=function(e){var t=e.props;return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("div",{className:"dropdown",children:Object(o.jsx)("div",{className:"menu",children:t.map((function(t,a){return Object(o.jsx)("div",{onClick:function(a){e.onShow(a,t),e.onOpen()},children:t},a)}))})})})};var u=function(e){return Object(o.jsxs)("div",{className:"nav-item",children:[Object(o.jsxs)("button",{type:"button",onClick:function(){return e.onOpen()},children:["Page ",e.pageNo," \u25be"]}),e.open&&e.children]})},j=function(e){return Object(o.jsx)("div",{className:"backdrop"})};var b=function(e){return Object(o.jsx)("div",{children:Object(o.jsxs)("form",{onSubmit:e.handleSearch,children:[Object(o.jsx)("label",{children:"Species"}),Object(o.jsx)("input",{placeholder:"Filter Species",name:"species"}),Object(o.jsx)("label",{children:"Name"}),Object(o.jsx)("input",{placeholder:"Filter Name",name:"name"}),Object(o.jsx)("label",{children:"Status"}),Object(o.jsx)("input",{placeholder:"Filter Status",name:"status"}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{children:"Created Date: From "}),Object(o.jsx)("input",{placeholder:"Filter Status",name:"startDate",type:"date"}),"to",Object(o.jsx)("input",{placeholder:"Filter Status",name:"endDate",type:"date"}),Object(o.jsx)("button",{type:"submit",children:"Submit"}),Object(o.jsx)("button",{type:"button",onClick:e.handleClear,children:"Clear"})]})})},d=a(5),p=a.n(d),O=a(8),h=a(4),x=a.n(h);var f=function(e){var t=e.characterNo,a=Object(c.useState)(null),n=Object(i.a)(a,2),r=n[0],s=n[1];return Object(c.useEffect)((function(){if(t)try{var e=function(){var e=Object(O.a)(p.a.mark((function e(t){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.get("https://rickandmortyapi.com/api/character/".concat(t));case 2:a=e.sent,console.log(a.data),s(a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();e(t)}catch(a){return a.request}}),[t]),Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("div",{children:r&&Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:"box2",children:[Object(o.jsx)("h1",{children:r.name}),Object(o.jsx)("button",{onClick:function(t){e.onHandleDetails(t,null,"close")},children:"X"}),Object(o.jsxs)("div",{className:"info_box",children:[Object(o.jsx)("img",{src:r.image,alt:"character"}),Object(o.jsxs)("span",{children:["Status : ",r.status,Object(o.jsx)("br",{}),"Species : ",r.species,Object(o.jsx)("br",{}),"Gender : ",r.gender,Object(o.jsx)("br",{}),"Orign : ",r.origin.name,Object(o.jsx)("br",{}),"Episode :",r.episode.map((function(e,t){return Object(o.jsxs)("div",{children:["Appeared Episode : EP",e.replace(/[^0-9]/g,"")]},t)}))]})]})]})})})})},m=a.p+"static/media/Rick_and_Morty_logo.42c8df0b.png",v="https://rickandmortyapi.com/api",g=function(e,t,a,n){var r=Object(c.useState)({totalPage:"",totalCharacter:"",character:""}),s=Object(i.a)(r,2),o=s[0],l=s[1],u=Object(c.useState)([]),j=Object(i.a)(u,2),b=j[0],d=j[1],h=Object(c.useState)(null),f=Object(i.a)(h,2),m=f[0],g=f[1];return Object(c.useEffect)((function(){function c(){return(c=Object(O.a)(p.a.mark((function c(){var s,i,o,u,j,b,d,O,h,f,m,S,k;return p.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return s=[],c.next=3,x.a.get("".concat(v,"/character/?page=").concat(n));case 3:if(i=c.sent,!e){c.next=49;break}if(!t){c.next=33;break}return o=e.species,u=e.status,j=e.name,c.prev=9,c.next=12,x.a.get("".concat(v,"/character/?page=").concat(n,"&status=").concat(u,"&species=").concat(o,"&name=").concat(j));case 12:i=c.sent,c.next=18;break;case 15:c.prev=15,c.t0=c.catch(9),g("No Character found");case 18:if(!a){c.next=31;break}b=[],d=1,O=i.data.info.pages;case 22:if(!(d<=O)){c.next=30;break}return c.next=25,x.a.get("".concat(v,"/character/?page=").concat(d,"&status=").concat(u,"&species=").concat(o,"&name=").concat(j));case 25:i=c.sent,d++,b.push(i.data.results.filter((function(t){return e.startDate<=t.created&&t.created<=e.endDate}))),c.next=22;break;case 30:s=b.flat();case 31:c.next=49;break;case 33:if(!a){c.next=49;break}return c.next=36,x.a.get("".concat(v,"/character/?page=").concat(n));case 36:h=c.sent,f=h.data.info.pages,m=1,S=[];case 40:if(!(f>=m)){c.next=48;break}return c.next=43,x.a.get("".concat(v,"/character/?page=").concat(m));case 43:k=c.sent,m++,S.push(k.data.results.filter((function(t){return e.startDate<=t.created&&t.created<=e.endDate}))),c.next=40;break;case 48:s=S.flat();case 49:r(i.data.info.count),l({totalCharacter:i.data.info.count,character:i.data.results,totalPage:i.data.info.pages}),a&&(0===s.length&&g("Find no informaion"),l({totalCharacter:s.length,character:s}),r(s.length));case 52:case"end":return c.stop()}}),c,null,[[9,15]])})))).apply(this,arguments)}g(null);var r=function(e){var t=0;t=e%10===0?e/10:e/10+1;for(var a=[],c=1;c<=t;c++)a.push(c);d(a)};!function(){c.apply(this,arguments)}()}),[e,n,a,t]),{basic:o,pageNoArr:b,findNothing:m}};var S=function(){var e=Object(c.useState)(1),t=Object(i.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)(null),s=Object(i.a)(r,2),d=s[0],p=s[1],O=Object(c.useState)(!1),h=Object(i.a)(O,2),x=h[0],v=h[1],S=Object(c.useState)(null),k=Object(i.a)(S,2),N=k[0],y=k[1],D=Object(c.useState)(!1),C=Object(i.a)(D,2),F=C[0],w=C[1],_=Object(c.useState)(!1),E=Object(i.a)(_,2),A=E[0],P=E[1],M=Object(c.useState)(0),q=Object(i.a)(M,2),B=q[0],H=q[1],I=Object(c.useState)(!1),J=Object(i.a)(I,2),L=J[0],T=J[1],G=Object(c.useState)(1),R=Object(i.a)(G,2),X=R[0],z=R[1],K=g(N,F,x,a),Q=K.basic,U=K.pageNoArr,V=K.findNothing,W=function(e,t,a){e.preventDefault(),"close"===a?P(!1):(p(t),P(!0))},Y=function(e,t){e.preventDefault(),x||n(t%2===0?t/2:Math.ceil(t/2)),function(e){z(e),x?H(10*e-10,10*e):H(e%2===0?10:0)}(t)},Z=function(){T(!L)};return console.log(U),Object(o.jsxs)("div",{className:"box",children:[Object(o.jsx)("img",{src:m,alt:"rick and morty"}),!V&&Object(o.jsx)(u,{onOpen:Z,open:L,pageNo:X,children:Object(o.jsx)(l,{props:U,onShow:Y,onOpen:Z})}),Object(o.jsx)(b,{handleSearch:function(e){e.preventDefault(),n(1),z(1),Y(e,1);var t=e.target,a=t.species,c=t.name,r=t.status,s=t.startDate,i=t.endDate;s.value,i.value&&v(!0),a.value||a.value||c.value?w(!0):(s.value,i.value||v(!1)),y({species:a.value,name:c.value,status:r.value,startDate:s.value,endDate:i.value})},handleClear:function(e){e.preventDefault(),Array.from(document.querySelectorAll("input")).forEach((function(e){return e.value=""})),v(!1)}}),Object(o.jsx)("span",{children:V&&Object(o.jsx)("span",{children:V})}),!V&&Object(o.jsx)("div",{className:"character_container",children:Q.character&&Q.character.slice(B,B+10).map((function(e,t){return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:"item",onClick:function(t){W(t,e.id,"open")},children:[Object(o.jsx)("img",{src:e.image,alt:"img"}),Object(o.jsx)("br",{}),Object(o.jsx)("span",{children:e.name}),Object(o.jsx)("br",{}),Object(o.jsx)("span",{children:e.species}),Object(o.jsx)("br",{}),Object(o.jsx)("span",{children:e.status}),Object(o.jsx)("br",{}),Object(o.jsx)("span",{children:e.created.slice(0,10)}),Object(o.jsx)("br",{})]},t)})}))}),A&&Object(o.jsx)(j,{}),A&&Object(o.jsx)(f,{characterNo:d,onHandleDetails:W})]})};var k=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsx)(S,{})})},N=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,46)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),c(e),n(e),r(e),s(e)}))};s.a.render(Object(o.jsx)(n.a.StrictMode,{children:Object(o.jsx)(k,{})}),document.getElementById("root")),N()}},[[45,1,2]]]);
//# sourceMappingURL=main.1e73e8c8.chunk.js.map
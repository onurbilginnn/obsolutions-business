(this["webpackJsonpobsolutions-business"]=this["webpackJsonpobsolutions-business"]||[]).push([[1],{22:function(n,e,t){n.exports={InfoLinkContainer:"LinkContainer_InfoLinkContainer__5TW3H",InfoLink:"LinkContainer_InfoLink__Kh1I1",InfoLinkIcon:"LinkContainer_InfoLinkIcon__QMGda"}},35:function(n,e,t){"use strict";t(0);var i=t(36),a=t(22),c=t.n(a),s=t(2);e.a=function(n){var e={justifyContent:n.justify};return Object(s.jsxs)("div",{className:c.a.InfoLinkContainer,style:e,children:[Object(s.jsx)("a",{className:c.a.InfoLink,href:"https://github.com/onurbilginnn?tab=repositories",target:"_blank",rel:"noreferrer noopener",children:Object(s.jsx)(i.b,{size:"2em",className:c.a.InfoLinkIcon})}),Object(s.jsx)("a",{className:c.a.InfoLink,href:"https://www.linkedin.com/in/onur-bilgin-9134811a4/",target:"_blank",rel:"noreferrer noopener",children:Object(s.jsx)(i.c,{size:"2em",className:c.a.InfoLinkIcon})})]})}},37:function(n,e,t){n.exports={NavigationItem:"NavigationItem_NavigationItem__FKtYE",active:"NavigationItem_active__2MiNG",topBar_link:"NavigationItem_topBar_link__1I-Ur"}},46:function(n,e,t){n.exports={MainContainer:"Layout_MainContainer__3pAHM",CircleContainer:"Layout_CircleContainer__uDJ1O"}},54:function(n,e,t){},55:function(n,e,t){},64:function(n,e,t){},67:function(n,e,t){},69:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),c=t(17),s=t.n(c),o=(t(54),t(7)),r=(t(55),t(75)),l=t(76),j=t(74),b=t(23),d=t(37),u=t.n(d),h=t(2),x=function(n){return Object(h.jsx)("div",{className:u.a.NavigationItem+" "+n.classes,children:Object(h.jsx)(b.b,{to:n.link,exact:n.exact,activeClassName:u.a.active,children:n.children})})},O=t(40),m=function(){var n=Object(i.useState)({width:void 0,height:void 0}),e=Object(O.a)(n,2),t=e[0],a=e[1];return Object(i.useEffect)((function(){function n(){a({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",n),n(),function(){return window.removeEventListener("resize",n)}}),[]),t},f=t(35),g=t.p+"static/media/OB.58df086d.svg",p=t.p+"static/media/OBSolutions.d3972535.svg",v=(t(64),function(n){var e=m().width;return console.log(e),Object(h.jsx)("div",{children:Object(h.jsxs)(r.a,{bg:"light",expand:"lg",fixed:"top",children:[Object(h.jsx)(r.a.Brand,{children:e>990?Object(h.jsx)("img",{className:"top-nav-bar-big-logo",src:p,alt:"OB Solutions Logo"}):Object(h.jsx)("img",{className:"top-nav-bar-small-logo",src:g,alt:"OB Solutions Logo"})}),e<=990&&Object(h.jsx)(f.a,{}),Object(h.jsx)(r.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(h.jsx)(r.a.Collapse,{id:"basic-navbar-nav",children:Object(h.jsxs)(l.a,{children:[Object(h.jsx)(x,{classes:"mt-2 mr-3",exact:!0,link:"/",children:"Anasayfa"}),Object(h.jsx)(j.a,{className:"mr-3",title:"Eklentiler",id:"basic-nav-dropdown",children:Object(h.jsxs)(j.a,{className:"mr-3",title:"Word",id:"basic-nav-dropdown",children:[Object(h.jsx)(x,{classes:"ml-4",link:"/custom-contract",children:"Teklif Tasla\u011f\u0131"}),Object(h.jsx)(x,{classes:"ml-4",link:"/area-contract",children:"Alan Tasla\u011f\u0131"})]})}),Object(h.jsx)(x,{classes:"mt-2",link:"/contact",children:"\u0130leti\u015fim"})]})}),e>990&&Object(h.jsx)(f.a,{})]})})}),k=t(77),_=(t(67),function(n){var e=new Date;return Object(h.jsx)("div",{children:Object(h.jsx)(k.a,{children:Object(h.jsx)(k.a.Footer,{children:Object(h.jsxs)("div",{className:"copyrightContainer",children:[Object(h.jsx)("a",{href:"https://obsolutions.co/",target:"_blank",rel:"noreferrer",children:Object(h.jsx)("img",{src:p,className:"obSolutionsLogo mr-3",alt:"OB Solutions Logo"})}),Object(h.jsxs)("p",{className:"brandText",children:["Copyright \xa9 ",e.getFullYear()]})]})})})})}),I=t(46),L=t.n(I),N=function(n){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(v,{}),Object(h.jsxs)("div",{className:L.a.MainContainer,children:[n.children,Object(h.jsx)(_,{})]})]})},C=a.a.lazy((function(){return Promise.all([t.e(0),t.e(5)]).then(t.bind(null,128))})),w=a.a.lazy((function(){return Promise.all([t.e(0),t.e(4)]).then(t.bind(null,125))})),y=a.a.lazy((function(){return t.e(7).then(t.bind(null,122))})),B=a.a.lazy((function(){return t.e(6).then(t.bind(null,127))})),z=Object(h.jsxs)(o.d,{children:[Object(h.jsx)(o.b,{path:"/contact",exact:!0,component:y}),Object(h.jsx)(o.b,{path:"/custom-contract",exact:!0,component:w}),Object(h.jsx)(o.b,{path:"/area-contract",exact:!0,component:C}),Object(h.jsx)(o.b,{path:"/",exact:!0,component:B}),Object(h.jsx)(o.a,{to:"/"})]});var F=Object(o.g)((function(){return Object(h.jsx)(N,{children:Object(h.jsx)(i.Suspense,{fallback:Object(h.jsx)("p",{children:"Loading..."}),children:z})})})),S=function(n){n&&n instanceof Function&&t.e(8).then(t.bind(null,123)).then((function(e){var t=e.getCLS,i=e.getFID,a=e.getFCP,c=e.getLCP,s=e.getTTFB;t(n),i(n),a(n),c(n),s(n)}))};t(68);s.a.render(Object(h.jsx)(b.a,{basename:"/obsolutions-business",children:Object(h.jsx)(F,{})}),document.getElementById("root")),S()}},[[69,2,3]]]);
//# sourceMappingURL=main.327a0a8c.chunk.js.map
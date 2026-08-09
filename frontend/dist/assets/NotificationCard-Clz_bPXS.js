import{c as a,j as e,m as l}from"./index-BVARg_3O.js";import{C as d}from"./calendar-O_Q6YLFj.js";import{D as m}from"./ProgressBar-BbBw3A1y.js";import{C as _}from"./settings-K_FqZ6fv.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],n=a("Bell",h);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],q=a("CircleX",u);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],H=a("LayoutDashboard",k);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]],X=a("PenLine",y);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],g=a("Tag",x),p="_container_1scke_1",N="_header_1scke_12",v="_headerTitleRow_1scke_20",T="_bellIcon_1scke_26",j="_title_1scke_30",C="_unreadBadge_1scke_37",f="_markReadBtn_1scke_46",R="_list_1scke_62",w="_item_1scke_68",B="_unreadItem_1scke_79",b="_iconCircle_1scke_84",M="_content_1scke_94",I="_itemTitleRow_1scke_101",A="_itemTitle_1scke_101",$="_itemTime_1scke_113",z="_itemMessage_1scke_118",t={container:p,header:N,headerTitleRow:v,bellIcon:T,title:j,unreadBadge:C,markReadBtn:f,list:R,item:w,unreadItem:B,iconCircle:b,content:M,itemTitleRow:I,itemTitle:A,itemTime:$,itemMessage:z},L=[{id:"n1",title:"Inspection Appointment Confirmed",message:"Your inspection pass for 2023 Porsche 911 GT3 RS is set for Aug 14 at 10:00 AM.",time:"10 mins ago",unread:!0,icon:d,color:"#2563EB"},{id:"n2",title:"Trade-In Valuation Ready",message:"Your 2023 BMW M3 appraisal offer has been generated: $71,925 guaranteed payout.",time:"2 hours ago",unread:!0,icon:m,color:"#22C55E"},{id:"n3",title:"Price Drop Alert!",message:"2024 Audi RS6 Avant saved in your favorites had a $3,500 price reduction.",time:"1 day ago",unread:!1,icon:g,color:"#F59E0B"}],Y=({notifications:c=L,onMarkAllRead:o})=>{const i=c.filter(s=>s.unread).length;return e.jsxs("div",{className:t.container,children:[e.jsxs("div",{className:t.header,children:[e.jsxs("div",{className:t.headerTitleRow,children:[e.jsx(n,{size:20,className:t.bellIcon}),e.jsx("h3",{className:t.title,children:"Notifications"}),i>0&&e.jsxs("span",{className:t.unreadBadge,children:[i," New"]})]}),e.jsxs("button",{type:"button",className:t.markReadBtn,onClick:o,children:[e.jsx(_,{size:16})," Mark All Read"]})]}),e.jsx("div",{className:t.list,children:c.map(s=>{const r=s.icon||n;return e.jsxs(l.div,{className:`${t.item} ${s.unread?t.unreadItem:""}`,whileHover:{x:2},children:[e.jsx("div",{className:t.iconCircle,style:{background:`${s.color}15`,color:s.color},children:e.jsx(r,{size:18})}),e.jsxs("div",{className:t.content,children:[e.jsxs("div",{className:t.itemTitleRow,children:[e.jsx("span",{className:t.itemTitle,children:s.title}),e.jsx("span",{className:t.itemTime,children:s.time})]}),e.jsx("p",{className:t.itemMessage,children:s.message})]})]},s.id)})})]})};export{n as B,q as C,H as L,Y as N,X as P};

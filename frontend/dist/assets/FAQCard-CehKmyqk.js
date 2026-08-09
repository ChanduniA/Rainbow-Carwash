import{c as r,r as p,j as e,b as _,m as h}from"./index-BVARg_3O.js";import{C as m}from"./circle-help-djdLd3sR.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],q=r("ChevronDown",x);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],j=r("ChevronUp",u);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],g=r("FileText",f),y="_faqCard_e0e5i_1",C="_cardHeader_e0e5i_9",N="_headerIcon_e0e5i_18",v="_cardTitle_e0e5i_22",w="_faqList_e0e5i_29",I="_faqItem_e0e5i_35",T="_itemOpen_e0e5i_42",k="_questionBtn_e0e5i_46",H="_answerWrapper_e0e5i_66",z="_answerText_e0e5i_70",s={faqCard:y,cardHeader:C,headerIcon:N,cardTitle:v,faqList:w,faqItem:I,itemOpen:T,questionBtn:k,answerWrapper:H,answerText:z},F=({title:c="Frequently Asked Questions",faqs:o=[]})=>{const[i,d]=p.useState(0),l=a=>{d(i===a?null:a)};return e.jsxs("div",{className:s.faqCard,children:[e.jsxs("div",{className:s.cardHeader,children:[e.jsx(m,{size:20,className:s.headerIcon}),e.jsx("h3",{className:s.cardTitle,children:c})]}),e.jsx("div",{className:s.faqList,children:o.map((a,t)=>{const n=i===t;return e.jsxs("div",{className:`${s.faqItem} ${n?s.itemOpen:""}`,children:[e.jsxs("button",{type:"button",className:s.questionBtn,onClick:()=>l(t),children:[e.jsx("span",{children:a.question}),n?e.jsx(j,{size:16}):e.jsx(q,{size:16})]}),e.jsx(_,{children:n&&e.jsx(h.div,{className:s.answerWrapper,initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.25},children:e.jsx("p",{className:s.answerText,children:a.answer})})})]},t)})})]})};export{g as F,F as a};

import{r as m,j as e,x as y,G as j,S as p}from"./app-CHOqb3So.js";import{f,g as N,A as k,u as w}from"./AuthenticatedLayout-BZh9Gfib.js";import{P as v}from"./PrimaryButton-Cp4MViTk.js";import"./ApplicationLogo-Dr6o8huE.js";import"./transition-BJHXfEur.js";function S({filtersConfig:n,className:c="",url:i="",display:u,filters:b={}}){const[o,x]=m.useState(b);m.useEffect(()=>{x(b)},[b]);const g=(s,t)=>{const{value:l,checked:r,type:a}=s.target;x(d=>a==="checkbox"?{...d,[t]:r?[...d[t],l]:d[t].filter(h=>h!==l)}:{display:u,...d,[t]:l})};return e.jsxs("div",{className:`flex items-center space-x-2 ${c}`,children:[n.map(({name:s,placeholder:t,type:l="text",options:r})=>e.jsxs("div",{className:"flex flex-row items-center",children:[e.jsx("label",{className:"font-semibold mx-3 text-gray-900 dark:text-gray-100",children:t}),l==="select"?e.jsx("select",{name:s,value:o[s]||"all",onChange:a=>g(a,s),className:"py-1 px-8 border rounded",children:r.map(a=>e.jsx("option",{value:a,children:a},a))}):l==="checkbox"?e.jsx("div",{className:"flex space-x-2",children:r.map(a=>{var d;return e.jsxs("label",{className:"flex items-center space-x-1",children:[e.jsx("input",{type:"checkbox",value:a,checked:(d=o[s])==null?void 0:d.includes(a),onChange:h=>g(h,s),className:"mr-1"}),a]},a)})}):e.jsx("input",{type:l,name:s,value:o[s]||"",onChange:a=>g(a,s),placeholder:t,className:"py-1 px-5 border rounded"})]},s)),e.jsx(y,{href:route(i,o),className:"py-1 px-5 bg-blue-500 text-white rounded",children:"Filter"})]})}function C({viewMode:n,setViewMode:c,className:i=""}){return e.jsxs("div",{className:`flex space-x-2 ${i}`,children:[e.jsx("button",{onClick:()=>c("table"),className:`p-2 rounded-md ${n==="table"?"bg-blue-500 text-white":"bg-gray-200 dark:bg-gray-700"}`,children:e.jsx(f,{size:14,className:"text-xl"})}),e.jsx("button",{onClick:()=>c("grid"),className:`p-2 rounded-md ${n==="grid"?"bg-blue-500 text-white":"bg-gray-200 dark:bg-gray-700"}`,children:e.jsx(N,{size:14,className:"text-xl"})})]})}function F({auth:n,permissions:c,users:i}){const{can:u}=w(c),{data:b,setData:o}=j({}),[x,g]=m.useState("table");m.useEffect(()=>{const r=new URLSearchParams(location.search),a={};a.account_status=r.get("account_status"),a.role=r.get("role"),o(a),g(r.get("display")||"table")},[o]);const s=[{name:"account_status",placeholder:"Filter By Status",type:"select",options:["active","suspended"],defaultValue:"active"},{name:"role",placeholder:"Filter By Role",type:"select",options:["all","admin","job creator","job seeker"],defaultValue:"all"}],t=()=>e.jsx("div",{className:"overflow-x-auto mx-2",children:e.jsxs("table",{className:"w-full mt-4 text-left table-auto min-w-max border-collapse border border-blue-gray-200 dark:border-gray-700",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-gray-800 dark:text-gray-100",children:[e.jsx("th",{className:"p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800",children:"SNo"}),e.jsx("th",{className:"p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800",children:"Username"}),e.jsx("th",{className:"p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800",children:"Email"}),e.jsx("th",{className:"p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800",children:"Role"}),e.jsx("th",{className:"p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800",children:"Account Status"}),e.jsx("th",{className:"p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800",children:"Actions"})]})}),e.jsx("tbody",{children:i.map((r,a)=>e.jsxs("tr",{className:`text-gray-800 dark:text-gray-100 ${a%2===0?"bg-white dark:bg-gray-900":"bg-blue-gray-50/50 dark:bg-gray-800"}`,children:[e.jsx("td",{className:"p-2 border-b dark:border-gray-700",children:a+1}),e.jsx("td",{className:"p-2 border-b dark:border-gray-700",children:r.name}),e.jsx("td",{className:"p-2 border-b dark:border-gray-700",children:r.email}),e.jsx("td",{className:"p-2 border-b dark:border-gray-700",children:r.roles.length>0?r.roles.map(d=>d.name).join(", "):"No Roles"}),e.jsx("td",{className:"p-2 border-b dark:border-gray-700",children:r.account_status}),e.jsx("td",{className:"p-2 border-b dark:border-gray-700",children:e.jsxs("select",{className:"block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-400 focus:outline-none sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",children:[e.jsx("option",{value:"",children:"Select Action"}),e.jsx("option",{value:"view",children:"View"}),e.jsx("option",{value:"delete",children:"Delete"})]})})]},r.id))})]})}),l=()=>e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6",children:i.map(r=>e.jsxs("div",{className:"bg-neutral dark:bg-gray-900 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl",children:[e.jsx("div",{className:"flex justify-center mb-4",children:e.jsx("div",{className:"w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center",children:r.image?e.jsx("img",{src:r.image,alt:r.name,className:"w-12 h-12 rounded-full object-cover"}):e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-20 h-12 text-gray-500",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 12c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z"})})})}),e.jsxs("h3",{className:"font-semibold text-md text-gray-900 dark:text-gray-100",children:["Username: ",r.name]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-300 mb-2",children:["Email: ",r.email]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-300 mb-2",children:["Role:"," ",r.roles.length>0?r.roles.map(a=>a.name).join(", "):"No Roles"]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-300 mb-4",children:["Account Status: ",r.account_status]}),e.jsx(v,{className:"w-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",children:"View Details"})]},r.id))});return e.jsxs(k,{user:n.user,permissions:c,header:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Users"}),e.jsxs("div",{className:"flex",children:[e.jsx(S,{filtersConfig:s,className:"mr-10",url:"users.index",display:x,filters:b}),e.jsx(C,{viewMode:x,setViewMode:g,className:"mr-8"}),u("Create User")&&e.jsx(y,{href:route("users.create"),className:"inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150",children:"Add User"})]})]}),children:[e.jsx(p,{title:"Users"}),e.jsx("div",{className:"py-2 max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 overflow-x-hidden shadow-sm sm:rounded-lg m-2 p-6 px-0",children:x==="table"?t():l()})})]})}export{F as default};

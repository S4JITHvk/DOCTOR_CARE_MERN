import{c as f,r as o,j as s,_ as j}from"./index-DDg8tmzP.js";import{S as b}from"./Sidebar-DnT6ow9c.js";import{b as v,a as y}from"./validation-B-glGIGy.js";import{s as N}from"./userAuth-B5iPBnBM.js";import"./user-BohdSzpg.js";function E(){const x=f(e=>e.user),[r,l]=o.useState(""),[a,d]=o.useState(""),[i,g]=o.useState(!1),[c,n]=o.useState(""),p=()=>{g(!i)},w=async e=>{var u;e.preventDefault();let t="";const m=v(r);if(m.valid?y(a)?t="Confirm password can't be empty":r!==a&&(t="Passwords do not match"):t=m.message,t){n(t);return}const h={state:{email:(u=x.user)==null?void 0:u.email,action:"User_reset"}};(await N(h,r)).status===200?(j.success("Password reset successfully"),l(""),d(""),n("")):n("Failed to reset password")};return s.jsx("div",{className:"bg-gray-100",children:s.jsx("div",{className:"container mx-auto py-8",children:s.jsxs("div",{className:"grid grid-cols-4 sm:grid-cols-12 gap-6 px-4",children:[s.jsx(b,{}),s.jsx("div",{className:"col-span-4 sm:col-span-9 flex justify-center",children:s.jsxs("div",{className:"bg-white shadow rounded-lg p-6 w-full max-w-xl",children:[s.jsx("h1",{className:"mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500",children:"MIND CARE"}),s.jsx("h2",{className:"mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",children:"RESET PASSWORD"}),s.jsx("div",{className:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm",children:s.jsxs("form",{className:"space-y-6",onSubmit:w,children:[s.jsxs("div",{children:[s.jsx("label",{htmlFor:"password",className:"block text-sm font-medium leading-6 text-gray-900",children:"New password"}),s.jsxs("div",{className:"mt-2 relative",children:[s.jsx("input",{id:"password",name:"password",type:i?"text":"password",autoComplete:"new-password",required:!0,value:r,onChange:e=>l(e.target.value),className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"}),s.jsx("button",{type:"button",className:"absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none",onClick:p,children:i?s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19.071 4.929a1 1 0 010 1.414L5.757 19.071a1 1 0 01-1.414-1.414L17.657 4.929a1 1 0 011.414 0z"}),s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18 10l-5 5-5-5"})]}):s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 12a5 5 0 019.946 0M9 16h.01M15 16h.01"})]})})]})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"confirm-password",className:"block text-sm font-medium leading-6 text-gray-900",children:"Confirm Password"}),s.jsx("div",{className:"mt-2",children:s.jsx("input",{id:"confirm-password",name:"confirm-password",type:"password",autoComplete:"new-password",required:!0,value:a,onChange:e=>d(e.target.value),className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"})})]}),c&&s.jsx("p",{className:"text-red-500",children:c}),s.jsx("div",{children:s.jsx("button",{type:"submit",className:"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Reset Password"})})]})})]})})]})})})}export{E as default};
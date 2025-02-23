/*!
 * @file index.ts (remote-elements)
 * @description A browser library to safely serialize, deserialize and sync elements from a server.
 * @version v1.1.0
 *
 * Copyright (c) 2025 thebest12lines
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
let e;!function(e){let a=console.warn;let $=null;let _=console.error;e.serialize=(f)=>{return JSON.stringify({version:1,element:f.outerHTML})},e.syncElements=(r,t)=>{let o=t||{allowImages:!1,allowScripts:!1,_:!0}; o._&&a("Current options are configured to prevent self-XSS and malicious content. To bypass this please modify your options parameter.");let s=new WebSocket(r);return s.onmessage=r=>{try{let t=JSON.parse(r.data);if(1===t.version&&t.id&&t.element){let r=e.deserialize(t);if(($==r?void 0:r.querySelector("script"))&&!o.allowScripts)return void _("Data is not injected because the configuration forbids scripts, but the server sent one! (may be malicious)");if(($==r?void 0:r.querySelector("img"))&&!o.allowImages)return void _("Data is not injected because the configuration forbids scripts, but the server sent one! (may be malicious)");if(r){let e=document.getElementById(t.id);e?e.replaceWith(r):document.body.appendChild(r)}}}catch(e){_("Error processing WebSocket message:",e)}},s.onerror=e=>{_("WebSocket error:",e)},{close:()=>{s.close()}}},e.deserialize=e=>{let r=JSON.parse(e),{element:t}=r;return(new DOMParser).parseFromString(t,"text/html").body.firstElementChild},e.deserializeSafe=(e,r)=>{let t=r||{allowImages:!1,allowScripts:!1,__default:!0};t.__default&&a("Current options are configured to prevent cross-site scripting and malicious content. To bypass this please modify your options parameter.");let o=JSON.parse(e),{element_:s}=o,n=(new DOMParser).parseFromString(s,"text/html"),i=n.body.firstElementChild;return($==i?void 0:i.querySelector("script"))&&!t.allowScripts||($==i?void 0:i.querySelector("img"))&&!t.allowImages?(_("Data is not injected because the configuration forbids scripts, but the parameters sent one! (may be malicious)"),$):n.body.firstElementChild}}(e||(e={}));export default e;
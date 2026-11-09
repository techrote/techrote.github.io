(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Et=1e-9;function vn(n,e){return Math.hypot(n.x-e.x,n.y-e.y)}function xd(n){return Array.from({length:n.sides},(e,t)=>{const i=(n.rotation+t*360/n.sides)*Math.PI/180;return{x:n.x+n.radius*Math.cos(i),y:n.y+n.radius*Math.sin(i)}})}function sf(n,e=16){const t={x:n.x1,y:n.y1},i={x:n.x2,y:n.y2},s=Math.atan2(i.y-t.y,i.x-t.x),r=[];for(let o=0;o<=e;o++){const a=s+Math.PI/2-o*Math.PI/e;r.push({x:i.x+n.radius*Math.cos(a),y:i.y+n.radius*Math.sin(a)})}for(let o=0;o<=e;o++){const a=s-Math.PI/2-o*Math.PI/e;r.push({x:t.x+n.radius*Math.cos(a),y:t.y+n.radius*Math.sin(a)})}return r}function $n(n){switch(n.kind){case"rectangle":return[{x:n.x,y:n.y},{x:n.x+n.width,y:n.y},{x:n.x+n.width,y:n.y+n.height},{x:n.x,y:n.y+n.height}];case"circle":return Array.from({length:48},(e,t)=>{const i=t*Math.PI/24;return{x:n.x+n.radius*Math.cos(i),y:n.y+n.radius*Math.sin(i)}});case"polygon":return xd(n);case"slot":return sf(n);case"path":return n.points}}function Ts(n){return n.kind!=="path"||n.closed}function yd(n){return n.reduce((e,t,i)=>{const s=n[(i+1)%n.length];return e+t.x*s.y-s.x*t.y},0)/2}function Zs(n,e,t){return(e.x-n.x)*(t.y-n.y)-(e.y-n.y)*(t.x-n.x)}function _r(n,e,t){return Math.abs(Zs(e,t,n))<=Et&&n.x>=Math.min(e.x,t.x)-Et&&n.x<=Math.max(e.x,t.x)+Et&&n.y>=Math.min(e.y,t.y)-Et&&n.y<=Math.max(e.y,t.y)+Et}function rf(n,e,t,i){const s=Zs(n,e,t),r=Zs(n,e,i),o=Zs(t,i,n),a=Zs(t,i,e);return(s>Et&&r<-Et||s<-Et&&r>Et)&&(o>Et&&a<-Et||o<-Et&&a>Et)?!0:Math.abs(s)<=Et&&_r(t,n,e)||Math.abs(r)<=Et&&_r(i,n,e)||Math.abs(o)<=Et&&_r(n,t,i)||Math.abs(a)<=Et&&_r(e,t,i)}function Sd(n){const e=n.length;if(e<3||Math.abs(yd(n))<Et)return!1;for(let t=0;t<e;t++){if(vn(n[t],n[(t+1)%e])<Et)return!1;for(let i=t+1;i<e;i++)if(!(i===t+1||t===0&&i===e-1)&&rf(n[t],n[(t+1)%e],n[i],n[(i+1)%e]))return!1}return!0}function Md(n,e,t){const i=t.x-e.x,s=t.y-e.y,r=i*i+s*s;if(r<Et*Et)return vn(n,e);const o=Math.max(0,Math.min(1,((n.x-e.x)*i+(n.y-e.y)*s)/r));return vn(n,{x:e.x+o*i,y:e.y+o*s})}function ha(n,e){if(n.kind==="circle")return vn(e,{x:n.x,y:n.y})<=n.radius;if(n.kind==="rectangle")return e.x>=n.x&&e.x<=n.x+n.width&&e.y>=n.y&&e.y<=n.y+n.height;const t=$n(n);if(n.kind==="path"&&!n.closed)return!1;let i=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){const o=t[s],a=t[r];o.y>e.y!=a.y>e.y&&e.x<(a.x-o.x)*(e.y-o.y)/(a.y-o.y)+o.x&&(i=!i)}return i}function af(n,e,t){if(Ts(n)&&ha(n,e))return!0;const i=$n(n),s=n.kind==="path"&&!n.closed?i.length-1:i.length;return i.some((r,o)=>o<s&&Md(e,r,i[(o+1)%i.length])<=t)}function da(n){return n.kind==="rectangle"?{x:n.x+n.width/2,y:n.y+n.height/2}:n.kind==="circle"||n.kind==="polygon"?{x:n.x,y:n.y}:n.kind==="slot"?{x:(n.x1+n.x2)/2,y:(n.y1+n.y2)/2}:{x:n.points.reduce((e,t)=>e+t.x,0)/n.points.length,y:n.points.reduce((e,t)=>e+t.y,0)/n.points.length}}function ko(n,e,t){switch(n.kind){case"rectangle":case"circle":case"polygon":return{...n,x:n.x+e,y:n.y+t};case"slot":return{...n,x1:n.x1+e,y1:n.y1+t,x2:n.x2+e,y2:n.y2+t};case"path":return{...n,points:n.points.map(i=>({x:i.x+e,y:i.y+t}))}}}function Uc(n){switch(n.kind){case"rectangle":return $n(n).map((e,t)=>({name:"corner "+(t+1),point:e}));case"circle":return[{name:"radius",point:{x:n.x+n.radius,y:n.y}}];case"polygon":return[{name:"vertex / rotation",point:xd(n)[0]}];case"slot":{const e=n.x2-n.x1,t=n.y2-n.y1,i=n.radius/Math.hypot(e,t);return[{name:"endpoint A",point:{x:n.x1,y:n.y1}},{name:"endpoint B",point:{x:n.x2,y:n.y2}},{name:"radius",point:{x:(n.x1+n.x2)/2-t*i,y:(n.y1+n.y2)/2+e*i}}]}case"path":return n.points.map((e,t)=>({name:"vertex "+(t+1),point:e}))}}function of(n,e,t,i=!1){if(n.kind==="circle")return{...n,radius:vn({x:n.x,y:n.y},t)};if(n.kind==="polygon"){const l=t.x-n.x,c=t.y-n.y,h=Math.atan2(c,l)*180/Math.PI;return{...n,radius:Math.hypot(l,c),rotation:i?Math.round(h/15)*15:h}}if(n.kind==="path")return{...n,points:n.points.map((l,c)=>c===e?t:l)};if(n.kind==="slot"){if(e===0)return{...n,x1:t.x,y1:t.y};if(e===1)return{...n,x2:t.x,y2:t.y};const l=n.x2-n.x1,c=n.y2-n.y1,h=Math.hypot(l,c),d=(n.x1+n.x2)/2,u=(n.y1+n.y2)/2,p=Math.abs((-c*(t.x-d)+l*(t.y-u))/h);return{...n,radius:p}}const r=$n(n)[(e+2)%4];let o=t.x-r.x,a=t.y-r.y;if(i){const l=Math.max(Math.abs(o),Math.abs(a));o=Math.sign(o||1)*l,a=Math.sign(a||1)*l}return{...n,x:Math.min(r.x,r.x+o),y:Math.min(r.y,r.y+a),width:Math.abs(o),height:Math.abs(a)}}function lf(n){if(n.kind==="circle")return[{x:n.x,y:n.y},{x:n.x+n.radius,y:n.y},{x:n.x-n.radius,y:n.y},{x:n.x,y:n.y+n.radius},{x:n.x,y:n.y-n.radius}];if(n.kind==="slot")return[{x:n.x1,y:n.y1},{x:n.x2,y:n.y2},da(n)];const e=$n(n),t=e.slice(0,n.kind==="path"&&!n.closed?-1:void 0).map((i,s)=>{const r=e[(s+1)%e.length];return{x:(i.x+r.x)/2,y:(i.y+r.y)/2}});return[...e,...t,da(n)]}function cf(n,e){if(!Ts(e)||n.features.length===0)return"add";const t=$n(e);return n.features.some(i=>{const s=n.profiles.find(r=>r.id===i.profileId);return i.operation==="add"&&s&&s.id!==e.id&&t.every(r=>ha(s,r))})?"cut":"add"}const hf=/^[A-Za-z_][A-Za-z0-9_]{0,31}$/,df=/^[+-]?(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)$/;function Bo(n){return df.test(n.trim())}function gt(n){throw new Error("Invalid parametric expression: "+n)}function bd(n){if(n===void 0)return[];(!Array.isArray(n)||n.length>128)&&gt("parameters must be an array of at most 128");const e=new Set;return n.map(t=>{if(!t||typeof t!="object"||Array.isArray(t))return gt("malformed parameter");const i=t;return(typeof i.name!="string"||!hf.test(i.name)||i.name==="pi"||i.name==="e")&&gt("parameter name must be a valid identifier (pi/e reserved)"),e.has(i.name)&&gt("duplicate parameter "+i.name),e.add(i.name),(typeof i.expression!="string"||!i.expression.trim()||i.expression.length>256)&&gt("parameter "+i.name+" requires a short expression"),{name:i.name,expression:i.expression.trim()}})}function Ed(n){if(n===void 0)return[];(!Array.isArray(n)||n.length>2e3)&&gt("bindings must be an array of at most 2000");const e=new Set;return n.map(t=>{(!t||typeof t!="object"||Array.isArray(t))&&gt("malformed binding");const i=t;return(typeof i.target!="string"||i.target.length>128||!/^(profile|feature):[a-zA-Z0-9_-]{1,80}:[a-zA-Z0-9_.]+$/.test(i.target))&&gt("invalid expression target"),e.has(i.target)&&gt("duplicate expression target "+i.target),e.add(i.target),(typeof i.expression!="string"||!i.expression.trim()||i.expression.length>256)&&gt("binding requires a short expression"),{target:i.target,expression:i.expression.trim()}})}function Hl(n,e){(typeof n!="string"||!n.trim()||n.length>256)&&gt("expression is empty or too long");const t=[],i=/\s*(?:((?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|([()+\-*/^]))/y,s=n.trim();for(let d=0;d<s.length;){i.lastIndex=d;const u=i.exec(s);(!u||u.index!==d)&&gt("unsupported token near "+s.slice(d,d+12)),t.push({kind:u[1]?"number":u[2]?"name":"op",text:u[1]||u[2]||u[3]}),t.length>128&&gt("too many expression tokens"),d=i.lastIndex}let r=0,o=0;const a=()=>t[r],l=d=>((!Number.isFinite(d)||Math.abs(d)>1e15)&&gt("non-finite/overflow calculation"),d);function c(d=0){++o>70&&gt("expression nesting too deep");const u=t[r++];u||gt("incomplete expression");let p;if(u.kind==="number")p=Number(u.text);else if(u.kind==="name")p=u.text==="pi"?Math.PI:u.text==="e"?Math.E:e(u.text);else if(u.text==="(")p=c(0),a()?.text!==")"&&gt("missing closing parenthesis"),r++;else if(u.text==="+"||u.text==="-"){const g=c(3);p=u.text==="-"?-g:g}else gt("unexpected operator "+u.text);for(p=l(p);r<t.length;){const g=a(),_=g?.text==="+"||g?.text==="-"?1:g?.text==="*"||g?.text==="/"?2:g?.text==="^"?3:0;if(!_||_<d)break;r++;const m=c(_+(g.text==="^"?0:1));switch(g.text){case"+":p+=m;break;case"-":p-=m;break;case"*":p*=m;break;case"/":m===0&&gt("division by zero"),p/=m;break;case"^":p=Math.pow(p,m);break}p=l(p)}return o--,p}const h=c(0);return r!==t.length&&gt("trailing operator or expression"),l(h)}function ua(n){const e=new Map(n.map(r=>[r.name,r.expression])),t=new Map,i=new Set,s=r=>{const o=t.get(r);if(o!==void 0)return o;const a=e.get(r);a===void 0&&gt("unknown parameter "+r),i.has(r)&&gt("cyclic parameter dependency at "+r),i.add(r);try{const l=Hl(a,s);return t.set(r,l),l}finally{i.delete(r)}};for(const r of e.keys())s(r);return t}function As(n,e){const t=ua(e);return Hl(n,i=>{const s=t.get(i);return s===void 0&&gt("unknown parameter "+i),s})}const uf={rectangle:["x","y","width","height"],circle:["x","y","radius"],polygon:["x","y","radius","rotation","sides"],slot:["x1","y1","x2","y2","radius"],path:[]};function zo(n,e){const[t,i,s,...r]=e.split(":");if(r.length)return null;if(t==="feature"){if(s!=="z"&&s!=="depth")return null;const a=n.features.find(l=>l.id===i);return a?a[s]:null}if(t!=="profile")return null;const o=n.profiles.find(a=>a.id===i);if(!o)return null;if(o.kind==="path"){const a=/^points\.(\d+)\.(x|y)$/.exec(s);return a?o.points[Number(a[1])]?.[a[2]]??null:null}return uf[o.kind].includes(s)?o[s]:null}function ff(n){const e=bd(n.parameters),t=Ed(n.bindings),i=ua(e),s=n.profiles.map(a=>a.kind==="path"?{...a,points:a.points.map(l=>({...l}))}:{...a}),r=n.features.map(a=>({...a})),o={...n,profiles:s,features:r};for(const{target:a,expression:l}of t){const[c,h,d]=a.split(":");zo(o,a)===null&&gt("missing/unsupported binding target "+a);const u=Hl(l,p=>{const g=i.get(p);return g===void 0&&gt("unknown parameter "+p),g});if(c==="feature"){const p=r.find(g=>g.id===h);p[d]=u}else{const p=s.find(g=>g.id===h);if(p.kind==="path"){const[,g,_]=/^points\.(\d+)\.(x|y)$/.exec(d);p.points[Number(g)][_]=u}else p[d]=u}}return{...o,...n.parameters?{parameters:e}:{},...n.bindings?{bindings:t}:{}}}function Vl(n,e){if(!n.bindings?.length||JSON.stringify(n.parameters??[])!==JSON.stringify(e.parameters??[])||JSON.stringify(n.bindings)!==JSON.stringify(e.bindings??[]))return e;const t=n.bindings.filter(i=>{const s=zo(n,i.target),r=zo(e,i.target);return s===null||r===null||Math.abs(s-r)<1e-9});return{...e,bindings:t}}function Nc(n,e,t){return n.replace(/[A-Za-z_][A-Za-z0-9_]*/g,i=>i===e?t:i)}const bn=1e6;function tt(n,e){if(!n)throw new Error("Invalid flatCAD document: "+e)}function vr(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)}function Hs(n){return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=bn}function Yt(n){return typeof n=="number"&&Number.isFinite(n)&&Math.abs(n)<=bn}function Fc(n){return typeof n=="string"&&/^[a-zA-Z0-9_-]{1,80}$/.test(n)}function Ct(n){tt(vr(n),"root must be an object"),tt(n.schemaVersion===1||n.schemaVersion===2,"unsupported schema version"),tt(n.units==="mm","only mm units supported"),tt(typeof n.name=="string"&&n.name.length>0&&n.name.length<129,"name required (up to 128 characters)"),tt(Array.isArray(n.profiles)&&n.profiles.length<=1e3,"profiles must be an array of at most 1000"),tt(Array.isArray(n.features)&&n.features.length<=1e3,"features must be an array of at most 1000");const e=new Set,t=n.profiles.map(a=>{if(tt(vr(a)&&Fc(a.id)&&!e.has(a.id),"invalid/duplicate profile ID"),e.add(a.id),a.kind==="rectangle")return tt(Yt(a.x)&&Yt(a.y),"invalid rectangle coordinates"),tt(Hs(a.width)&&Hs(a.height),"invalid rectangle dimensions"),tt(Math.abs(a.x+a.width)<=bn&&Math.abs(a.y+a.height)<=bn,"rectangle outside extent"),{kind:"rectangle",id:a.id,x:a.x,y:a.y,width:a.width,height:a.height};if(a.kind==="circle")return tt(Yt(a.x)&&Yt(a.y),"invalid circle coordinates"),tt(Hs(a.radius),"invalid circle radius"),tt(Math.abs(a.x)+a.radius<=bn&&Math.abs(a.y)+a.radius<=bn,"circle outside extent"),{kind:"circle",id:a.id,x:a.x,y:a.y,radius:a.radius};if(tt(n.schemaVersion===2,"older project schemas cannot contain extended geometry"),a.kind==="polygon")return tt(Yt(a.x)&&Yt(a.y)&&Hs(a.radius)&&Yt(a.rotation),"invalid polygon coordinates or radius"),tt(typeof a.sides=="number"&&Number.isInteger(a.sides)&&a.sides>=3&&a.sides<=64,"polygon sides must be an integer from 3 to 64"),tt(Math.abs(a.x)+a.radius<=bn&&Math.abs(a.y)+a.radius<=bn,"polygon outside extent"),{kind:"polygon",id:a.id,x:a.x,y:a.y,radius:a.radius,sides:a.sides,rotation:a.rotation};if(a.kind==="slot"){tt(Yt(a.x1)&&Yt(a.y1)&&Yt(a.x2)&&Yt(a.y2)&&Hs(a.radius),"invalid slot parameters"),tt(Math.hypot(a.x2-a.x1,a.y2-a.y1)>1e-9,"slot endpoints cannot coincide");const l=a.radius;return tt([a.x1,a.y1,a.x2,a.y2].every(c=>Math.abs(c)+l<=bn),"slot outside extent"),{kind:"slot",id:a.id,x1:a.x1,y1:a.y1,x2:a.x2,y2:a.y2,radius:a.radius}}if(a.kind==="path"){tt(Array.isArray(a.points)&&a.points.length>=2&&a.points.length<=256&&typeof a.closed=="boolean","invalid line/path vertices");const l=a.points.map(c=>(tt(vr(c)&&Yt(c.x)&&Yt(c.y),"invalid path coordinate"),{x:c.x,y:c.y}));return tt(l.every((c,h)=>h===0||Math.hypot(c.x-l[h-1].x,c.y-l[h-1].y)>1e-9),"zero-length path segment"),a.closed&&tt(Sd(l)&&Math.abs(yd(l))>1e-9,"invalid closed polygon path"),{kind:"path",id:a.id,points:l,closed:a.closed}}throw new Error("Invalid flatCAD document: unsupported profile kind")}),i=new Set(t.filter(a=>a.kind!=="path"||a.closed).map(a=>a.id)),s=new Set,r=n.features.map((a,l)=>(tt(vr(a)&&Fc(a.id)&&!s.has(a.id)&&!i.has(a.id),"invalid/duplicate feature ID"),s.add(a.id),tt(typeof a.profileId=="string"&&i.has(a.profileId),"missing referenced profile"),tt(a.operation==="add"||a.operation==="cut","unsupported feature operation"),tt(l!==0||a.operation==="add","first feature must add material"),tt(Yt(a.z)&&Yt(a.depth)&&a.depth!==0&&Math.abs(a.depth)<=bn&&Math.abs(a.z+a.depth)<=bn,"invalid feature Z/depth (must be non-zero, signed and finite)"),{id:a.id,profileId:a.profileId,operation:a.operation,z:a.z,depth:a.depth})),o={schemaVersion:2,name:n.name,units:"mm",profiles:t,features:r};if(n.parameters!==void 0||n.bindings!==void 0){if(n.schemaVersion===1)throw new Error("Invalid flatCAD document: formulas require v2");n.parameters!==void 0&&(o.parameters=bd(n.parameters)),n.bindings!==void 0&&(o.bindings=Ed(n.bindings));const a=ff(o);return{...Ct({...a,parameters:void 0,bindings:void 0}),...o.parameters!==void 0?{parameters:o.parameters}:{},...o.bindings!==void 0?{bindings:o.bindings}:{}}}return o}const Oc=Ct({schemaVersion:2,name:"Mounting plate",units:"mm",profiles:[{id:"plate",kind:"rectangle",x:-50,y:-30,width:100,height:60},{id:"hole_l",kind:"circle",x:-35,y:0,radius:5},{id:"hole_r",kind:"circle",x:35,y:0,radius:5}],features:[{id:"base",profileId:"plate",operation:"add",z:0,depth:8},{id:"cut_l",profileId:"hole_l",operation:"cut",z:-1,depth:10},{id:"cut_r",profileId:"hole_r",operation:"cut",z:-1,depth:10}]});function pf(n,e){return Ct({...n,profiles:[...n.profiles,e]})}function wd(n,e){const t={...n,profiles:n.profiles.map(i=>i.id===e.id?e:i)};return Ct(Vl(n,t))}function mf(n,e){return Ct({...n,features:n.features.filter(t=>t.id!==e),bindings:n.bindings?.filter(t=>!t.target.startsWith("feature:"+e+":"))})}function Hi(n){return n+"_"+crypto.randomUUID().replaceAll("-","")}function gf(n,e,t){return e===null?t?[...n]:[]:t?n.includes(e)?n.filter(i=>i!==e):[...n,e]:n.includes(e)&&n.length>1?[...n]:[e]}function Ra(n,e){const t=new Map(n.profiles.map(i=>[i.id,i]));return[...new Set(e)].map(i=>t.get(i)).filter(i=>i!==void 0)}function _f(n,e){const t=Ra(n,e);return t.length===0?"add":n.features.length>0&&t.every(i=>cf(n,i)==="cut")?"cut":"add"}function Td(n,e,t,i,s){const r=Ra(n,e);if(r.length!==new Set(e).size||r.length===0)throw new Error("Select at least one existing profile");if(r.some(a=>!Ts(a)))throw new Error("Open paths cannot be extruded");const o=r.map(a=>({id:Hi("feature"),profileId:a.id,operation:t,z:i,depth:s}));return Ct({...n,features:[...n.features,...o]})}function vf(n,e){const t=new Map(e.map(i=>[i.id,i]));if(t.size!==e.length||e.some(i=>!n.profiles.some(s=>s.id===i.id)))throw new Error("Invalid group edit");return Ct(Vl(n,{...n,profiles:n.profiles.map(i=>t.get(i.id)??i)}))}function Ga(n,e){return n.left<e.right&&n.right>e.left&&n.top<e.bottom&&n.bottom>e.top}function Wa(n,e,t){return{left:n,right:n+t.width,top:e,bottom:e+t.height}}function xf(n){const{viewport:e,cursor:t,popup:i}=n,s=8,r=16,o=s,a=s,l=Math.max(s,e.width-i.width-s),c=Math.max(s,e.height-i.height-s),h=(_,m,f)=>Math.max(m,Math.min(f,_)),d=n.arrow?{left:n.arrow.x-r,right:n.arrow.x+r,top:n.arrow.y-r,bottom:n.arrow.y+r}:null,p=[{corner:"top-left",x:t.x,y:t.y},{corner:"top-right",x:t.x-i.width,y:t.y},{corner:"bottom-left",x:t.x,y:t.y-i.height},{corner:"bottom-right",x:t.x-i.width,y:t.y-i.height}].map((_,m)=>{let f=h(_.x,o,l);const w=h(_.y,a,c);let b=0;if(d&&Ga(Wa(f,w,i),d)){const T=[d.left-i.width,d.right].filter(C=>C>=o&&C<=l).filter(C=>!Ga(Wa(C,w,i),d)).sort((C,U)=>Math.abs(C-f)-Math.abs(U-f));T.length&&(b=T[0]-f,f=T[0])}const y=d&&Ga(Wa(f,w,i),d)?1:0,R=Math.abs(f-_.x)+Math.abs(w-_.y);return{..._,anchorX:_.x,x:f,y:w,sideShift:b,score:y*1e5+R+m*25}});p.sort((_,m)=>_.score-m.score);const g=p[0];return{x:g.x,y:g.y,corner:g.corner,arrowAvoidancePx:g.x-g.anchorX}}function yf(n,e){if(!Number.isFinite(n)||!Number.isFinite(e))throw new Error("Face and start heights must be finite");return Number((e-n).toPrecision(14))}function kc(n,e,t=.001){if(!Number.isFinite(n))return null;let i=null,s=t;for(const r of e){const o=Math.abs(r-n);o<=s&&(s=o,i=r)}return i}const Ad=["fusion","solidworks","onshape","blender"],Sf={fusion:"Fusion",solidworks:"SOLIDWORKS",onshape:"Onshape",blender:"Blender"},Fs={fusion:"MMB pan · Shift+MMB orbit · RMB orbit · wheel zoom",solidworks:"MMB orbit · Ctrl+MMB pan · Shift+MMB zoom",onshape:"RMB orbit · MMB/Ctrl+RMB pan · wheel zoom",blender:"MMB orbit · Shift+MMB pan · wheel zoom"};function Mf(n){return typeof n=="string"&&Ad.some(e=>e===n)}function Xa(n,e,t){return n==="fusion"?e===1?t.shift?"orbit":"pan":e===2?"orbit":"none":n==="solidworks"?e===1?t.ctrl?"pan":t.shift?"dolly":"orbit":"none":n==="onshape"?e===1?"pan":e===2?t.ctrl?"pan":"orbit":"none":e===1?t.shift?"pan":"orbit":"none"}function bf(n,e){return e?n==="orbit"?"pan":n==="pan"?"orbit":n:n}const Ef={rectangle:"Rectangle",circle:"Circle",polygon:"Polygon",path:"Polyline",slot:"Slot"};function xr(n,e){const t=n.profiles.find(a=>a.id===e.profileId);if(!t)return(e.operation==="cut"?"Cut":"Extrude")+" · Missing sketch";const i=n.profiles.filter(a=>a.kind===t.kind).findIndex(a=>a.id===t.id)+1,s=(e.operation==="cut"?"Cut":"Extrude")+" · "+Ef[t.kind]+" "+i,r=n.features.filter(a=>a.profileId===e.profileId&&a.operation===e.operation),o=r.findIndex(a=>a.id===e.id);return r.length>1&&o>0?s+" ("+(o+1)+")":s}function Bc(n){const e=n.z+n.depth,t=n.depth>0?"+"+n.depth:n.depth.toString();return"Z "+n.z+" → "+e+" mm · Δ"+t+" mm"}const fa=(n,e,t)=>({u:(n-e)*.70710678118,v:(n+e)*.40824829046-t*.8164965809,depth:(n+e)*.40824829046+t*.57735026919});function wf(n){const e=n.flatMap(o=>o?.vertices??[]);if(e.length===0)return{minU:-1,maxU:1,minV:-1,maxV:1};let t=1/0,i=-1/0,s=1/0,r=-1/0;for(let o=0;o+2<e.length;o+=3){const{u:a,v:l}=fa(e[o],e[o+1],e[o+2]);t=Math.min(t,a),i=Math.max(i,a),s=Math.min(s,l),r=Math.max(r,l)}return{minU:t,maxU:i,minV:s,maxV:r}}function Tf(n){const e=n.vertices,t=n.triangles,i=[],s=t.length/3,r=Math.max(1,Math.ceil(s/14e3));for(let o=0;o<s;o+=r){const l=[t[o*3],t[o*3+1],t[o*3+2]].map(U=>[e[U*3],e[U*3+1],e[U*3+2]]);if(l.some(U=>U.some(M=>!Number.isFinite(M))))continue;const c=l.map(U=>fa(U[0],U[1],U[2])),[h,d,u]=l,p=d[0]-h[0],g=d[1]-h[1],_=d[2]-h[2],m=u[0]-h[0],f=u[1]-h[1],w=u[2]-h[2],b=g*w-_*f,y=_*m-p*w,R=p*f-g*m,T=Math.hypot(b,y,R)||1,C=.35+.38*Math.abs(R/T)+.19*Math.abs(b/T)+.08*Math.abs(y/T);i.push({pts:c,depth:(c[0].depth+c[1].depth+c[2].depth)/3,light:C})}return i.sort((o,a)=>o.depth-a.depth),i}function Af(n,e){const t=n.getContext("2d");if(!t)return;const i=176,s=96,r=Math.max(1,Math.min(2,typeof devicePixelRatio=="number"?devicePixelRatio:1));n.width=Math.round(i*r),n.height=Math.round(s*r),t.setTransform(r,0,0,r,0,0),t.clearRect(0,0,i,s),t.fillStyle="#0b1928",t.fillRect(0,0,i,s),t.strokeStyle="#20384e",t.lineWidth=.7;for(let m=0;m<i;m+=16)t.beginPath(),t.moveTo(m,0),t.lineTo(m,s),t.stroke();for(let m=0;m<s;m+=16)t.beginPath(),t.moveTo(0,m),t.lineTo(i,m),t.stroke();const o=e.operation==="cut"?e.cutTool?.mesh??null:null,a=wf([e.mesh,o]),l=Math.max(1e-6,a.maxU-a.minU),c=Math.max(1e-6,a.maxV-a.minV),h=Math.min((i-20)/l,(s-20)/c,8),d=(a.maxU+a.minU)/2,u=(a.maxV+a.minV)/2,p=m=>i/2+(m.u-d)*h,g=m=>s/2+(m.v-u)*h,_=(m,f)=>{const w=Tf(m);for(const y of w){const R=y.pts;if(t.beginPath(),t.moveTo(p(R[0]),g(R[0])),t.lineTo(p(R[1]),g(R[1])),t.lineTo(p(R[2]),g(R[2])),t.closePath(),f)t.fillStyle="rgba(241,49,76,.36)";else{const T=Math.min(1,y.light);t.fillStyle=`rgb(${Math.round(38+T*59)},${Math.round(98+T*81)},${Math.round(161+T*75)})`}t.fill()}const b=m.edgeLines;t.strokeStyle=f?"rgba(255,102,123,.76)":"rgba(10,29,56,.8)",t.lineWidth=f?1.15:.75;for(let y=0;y+5<b.length;y+=6){const R=fa(b[y],b[y+1],b[y+2]),T=fa(b[y+3],b[y+4],b[y+5]);t.beginPath(),t.moveTo(p(R),g(R)),t.lineTo(p(T),g(T)),t.stroke()}};_(e.mesh,!1),o&&_(o,!0),n.dataset.featureId=e.featureId,n.dataset.operation=e.operation,n.dataset.cutOverlay=o?"true":"false",n.dataset.resultVolumeMm3=String(e.statistics.volumeMm3),e.cutTool&&(n.dataset.toolVolumeMm3=String(e.cutTool.statistics.volumeMm3))}class Rf{constructor(e,t,i,s=()=>{},r=(o,a,l)=>{const c=Number(l);Number.isFinite(c)&&this.onUpdate({...o,[a]:c})}){this.host=e,this.onUpdate=t,this.onDelete=i,this.onInspect=s,this.onFormula=r}lastDocument=null;lastFrames=null;currentDocument=null;lastTimeline=!1;activeFeatureId=null;buttons=new Map;editor=null;clearSelection(){this.activeFeatureId=null;for(const e of this.buttons.values())e.dataset.selected="false",e.setAttribute("aria-pressed","false");this.editor&&(this.editor.hidden=!0),this.onInspect(null,null)}inspect(){const e=this.activeFeatureId;this.onInspect(e,e?this.lastFrames?.find(t=>t.featureId===e)??null:null)}render(e,t){const i=!!this.host.closest("#history-timeline");if(this.lastDocument===e&&this.lastFrames===t&&this.lastTimeline===i)return;this.lastTimeline=i,this.lastDocument=e,this.lastFrames=t,this.currentDocument=e,this.activeFeatureId&&!e.features.some(l=>l.id===this.activeFeatureId)&&(this.activeFeatureId=null);const s=this.host.scrollTop;if(this.host.replaceChildren(),this.buttons.clear(),!e.features.length){this.host.textContent="No solid features yet. Select a shape and press E.",this.editor=null;return}const r=new Map(t?.map(l=>[l.featureId,l])),o=document.createElement("section");o.id="history-feature-editor",o.className="history-feature-editor",o.setAttribute("aria-label","Selected feature controls"),o.hidden=!0,this.editor=o,this.host.append(o);const a=document.createElement("div");a.className="history-tiles",a.setAttribute("aria-label",i?"Feature timeline, oldest first":"Feature history, newest first");for(const l of i?e.features:[...e.features].reverse()){const c=xr(e,l),h=document.createElement("button");h.type="button",h.className="history-row history-feature-card history-tile",h.dataset.featureId=l.id,h.dataset.operation=l.operation,h.dataset.selected=String(l.id===this.activeFeatureId),h.setAttribute("aria-pressed",String(l.id===this.activeFeatureId)),h.setAttribute("aria-label","Edit "+c),h.title=c+" · "+Bc(l);const d=document.createElement("canvas");d.className="history-thumbnail",d.width=176,d.height=96,d.setAttribute("role","img"),d.setAttribute("aria-label","Solid after "+c+(l.operation==="cut"?" including red cut-tool overlay":""));const u=r.get(l.id);if(u&&u.operation===l.operation)Af(d,u),h.dataset.thumbnailState="ready";else{h.dataset.thumbnailState="pending";const m=d.getContext("2d");m&&(m.fillStyle="#0b1928",m.fillRect(0,0,176,96),m.fillStyle="#7898b6",m.font="11px monospace",m.fillText("Rendering…",20,51))}const p=document.createElement("span");p.className="history-summary";const g=document.createElement("strong");g.className="history-feature-name",g.textContent=c;const _=document.createElement("small");_.className="history-feature-extent",_.textContent=Bc(l),p.append(g,_),h.append(d,p),h.onclick=()=>this.activate(l.id),this.buttons.set(l.id,h),a.append(h)}this.host.append(a),this.activeFeatureId&&(this.showEditor(this.activeFeatureId),this.inspect()),this.host.scrollTop=s}activate(e){this.activeFeatureId=this.activeFeatureId===e?null:e;for(const[t,i]of this.buttons){const s=t===this.activeFeatureId;i.dataset.selected=String(s),i.setAttribute("aria-pressed",String(s))}if(!this.activeFeatureId){this.editor&&(this.editor.hidden=!0),this.inspect();return}this.showEditor(this.activeFeatureId),this.inspect()}showEditor(e){const t=this.currentDocument?.features.find(p=>p.id===e),i=this.currentDocument,s=this.editor;if(!t||!i||!s)return;s.replaceChildren(),s.hidden=!1,s.dataset.featureId=e;const r=document.createElement("div");r.className="history-editor-heading";const o=document.createElement("strong");o.textContent=xr(i,t);const a=document.createElement("button");a.type="button",a.className="text-button",a.setAttribute("aria-label","Close feature controls"),a.textContent="×",a.onclick=()=>this.activate(e),r.append(o,a);const l=document.createElement("div");l.className="field-row";const c=document.createElement("select");c.setAttribute("aria-label",xr(i,t)+" operation");for(const p of["add","cut"]){const g=document.createElement("option");g.value=p,g.textContent=p==="add"?"Add":"Cut",g.selected=p===t.operation,c.add(g)}c.onchange=()=>this.onUpdate({...t,operation:c.value}),l.append(c),l.append(this.numberField("Start Z",t.z,p=>this.onFormula(t,"z",p),i.bindings?.find(p=>p.target==="feature:"+e+":z")?.expression)),l.append(this.numberField("Depth",t.depth,p=>this.onFormula(t,"depth",p),i.bindings?.find(p=>p.target==="feature:"+e+":depth")?.expression));const h=document.createElement("div");h.className="history-editor-actions";const d=this.lastFrames?.find(p=>p.featureId===e);if(d){const p=document.createElement("small");p.className="history-feature-volume",p.textContent="Solid "+d.statistics.volumeMm3.toFixed(2)+" mm³"+(d.cutTool?" · Red cutter "+d.cutTool.statistics.volumeMm3.toFixed(2)+" mm³":""),h.append(p)}const u=document.createElement("button");u.type="button",u.className="button danger history-feature-delete",u.title="Delete "+xr(i,t),u.textContent="Delete feature",u.onclick=()=>this.onDelete(t),h.append(u),s.append(r,l,h)}numberField(e,t,i,s){const r=document.createElement("label");r.className="field";const o=document.createElement("span");o.textContent=e;const a=document.createElement("input");return a.type="text",a.inputMode="decimal",a.value=s??String(t),a.dataset.expression=String(!!s),a.title=s?"="+t+" mm · linked formula":"Number or named parameter",a.setAttribute("aria-label",e),a.onchange=()=>{if(!a.value.trim()){a.value=s??String(t);return}i(a.value)},r.append(o,a),r}}function nr(n,e){if(!n||!n.edgeLines.length)return n;const t=e.profiles.filter(r=>r.kind==="circle"&&e.features.some(o=>o.profileId===r.id));if(!t.length)return n;const i=n.edgeLines,s=[];for(let r=0;r+5<i.length;r+=6){const[o,a,l,c,h,d]=i.slice(r,r+6),u=1e-4*Math.max(1,Math.abs(o),Math.abs(a),Math.abs(c),Math.abs(h));Math.abs(o-c)<u&&Math.abs(a-h)<u&&Math.abs(l-d)>u&&t.some(_=>{const m=Math.hypot(o-_.x,a-_.y);return Math.abs(m-_.radius)>Math.max(u,_.radius*1e-4)?!1:e.features.some(f=>{if(f.profileId!==_.id)return!1;const w=Math.min(f.z,f.z+f.depth),b=Math.max(f.z,f.z+f.depth);return Math.min(l,d)>=w-u&&Math.max(l,d)<=b+u})})||s.push(o,a,l,c,h,d)}return s.length===i.length?n:{...n,edgeLines:s}}class Cf{constructor(e,t,i){this.onChange=t,this.onError=i;const s=document.createElement("details");s.id="parameters-details",s.className="drawer",s.innerHTML='<summary>Parameters <span id="parameter-count" class="muted">0 named</span></summary><div class="drawer-content"><div id="parameters-summary" class="parameters-summary"></div><button id="parameters-edit" type="button" class="button">Manage parameters</button></div>';const r=e.querySelector("#profiles-details");e.insertBefore(s,r),this.count=s.querySelector("#parameter-count"),this.summary=s.querySelector("#parameters-summary"),s.querySelector("#parameters-edit").onclick=()=>this.open(),this.dialog=document.createElement("dialog"),this.dialog.id="parameters-dialog",this.dialog.className="settings-dialog",this.dialog.innerHTML='<div class="dialog-head"><div><strong>Named parameters</strong><small>Reusable exact values and chained expressions</small></div><button data-param-close type="button" aria-label="Close parameters">×</button></div><div id="parameter-rows" class="dialog-scroll parameter-rows"></div><footer><button id="parameter-add" type="button" class="button">+ Parameter</button><button data-param-close type="button" class="button primary">Done</button></footer>',document.body.append(this.dialog),this.rows=this.dialog.querySelector("#parameter-rows"),this.dialog.querySelectorAll("[data-param-close]").forEach(o=>o.onclick=()=>this.dialog.close()),this.dialog.querySelector("#parameter-add").onclick=()=>{if(!this.doc)return;let o=1;for(;this.doc.parameters?.some(a=>a.name==="param"+o);)o++;this.submit({...this.doc,parameters:[...this.doc.parameters??[],{name:"param"+o,expression:"10"}]})}}dialog;rows;summary;count;doc=null;get isOpen(){return this.dialog.open}open(){this.doc&&(this.renderRows(),this.dialog.showModal())}render(e){this.doc=e;const t=e.parameters??[];if(this.count.textContent=t.length+" named",this.summary.replaceChildren(),!t.length)this.summary.textContent="No named values";else{const i=ua(t);for(const s of t){const r=document.createElement("div");r.className="parameter-summary-row";const o=document.createElement("strong");o.textContent=s.name;const a=document.createElement("span");a.textContent=String(i.get(s.name))+" mm",r.append(o,a),this.summary.append(r)}}this.isOpen&&this.renderRows()}submit(e){try{this.onChange(Ct(e))}catch(t){this.onError(t instanceof Error?t.message:String(t)),this.doc&&this.renderRows()}}renderRows(){if(!this.doc)return;this.rows.replaceChildren();const e=this.doc,t=e.parameters??[],i=ua(t);for(const s of t){const r=document.createElement("div");r.className="parameter-row";const o=document.createElement("input");o.type="text",o.spellcheck=!1,o.value=s.name,o.setAttribute("aria-label","Parameter name "+s.name),o.onchange=()=>{const h=o.value.trim(),d=t.map(p=>({name:p.name===s.name?h:p.name,expression:Nc(p.expression,s.name,h)})),u=(e.bindings??[]).map(p=>({...p,expression:Nc(p.expression,s.name,h)}));this.submit({...e,parameters:d,bindings:u})};const a=document.createElement("input");a.type="text",a.spellcheck=!1,a.value=s.expression,a.setAttribute("aria-label","Parameter expression "+s.name),a.onchange=()=>this.submit({...e,parameters:t.map(h=>h.name===s.name?{...h,expression:a.value.trim()}:h)});const l=document.createElement("output");l.textContent=String(i.get(s.name))+" mm";const c=document.createElement("button");c.type="button",c.className="titlebar-action",c.title="Delete parameter "+s.name,c.textContent="×",c.onclick=()=>this.submit({...e,parameters:t.filter(h=>h.name!==s.name)}),r.append(o,a,l,c),this.rows.append(r)}}}function Pf(n,e,t,i=!1,s=!1){if(!Number.isFinite(e)||e===0||!Number.isFinite(t)||t<=0)return null;const r=(e<0?1:-1)*t*(i?.1:s?10:1);if(!n.trim())return null;const o=Number(n);if(Number.isFinite(o)){const l=Number((o+r).toPrecision(13));return Number.isFinite(l)?String(l):null}if(n.length>180)return null;const a=/^\((.+)\)\s*([+-])\s*(\d+(?:\.\d+)?)$/.exec(n.trim());if(a){const l=(a[2]==="-"?-1:1)*Number(a[3])+r,c=Number(l.toPrecision(13));return c===0?a[1]:"("+a[1]+")"+(c>=0?"+":"")+c}return"("+n.trim()+")"+(r>=0?"+":"")+Number(r.toPrecision(13))}const Df='input[type="number"],input[data-binding-target],input#extrude-z,input#extrude-depth,#history-feature-editor input[type="text"]';function Lf(n=document){const e=t=>{const i=t.target;if(!(i instanceof HTMLElement))return;const s=i.closest(Df);if(!s||s.disabled||s.readOnly||!s.getClientRects().length)return;const r=Number(s.step),o=s.step==="any"||!Number.isFinite(r)||r<=0?1:r,a=Pf(s.value,t.deltaY,o,t.shiftKey,t.ctrlKey||t.metaKey);a===null||a===s.value||(t.preventDefault(),s.focus({preventScroll:!0}),s.value=a,s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0})))};return n.addEventListener("wheel",e,{passive:!1}),()=>n.removeEventListener("wheel",e)}const Rd=220,Cd=180,wn=(n,e,t)=>Math.max(e,Math.min(t,n)),pa=(n,e)=>Math.min(65,Math.max(0,e.height-n));function Pd(n,e,t,i,s){t=wn(t,Math.min(Rd,s.width),s.width),i=wn(i,Math.min(Cd,s.height),s.height);const r=pa(i,s);return{left:Math.round(wn(n,0,1)*(s.width-t)),top:Math.round(r+wn(e,0,1)*(s.height-i-r)),width:t,height:i}}function Dd(n,e){const t=Math.max(0,e.width-n.width),i=pa(n.height,e),s=Math.max(0,e.height-n.height-i);return{x:t?wn(n.left/t,0,1):0,y:s?wn((n.top-i)/s,0,1):0}}function zc(n,e,t,i,s){const r=Math.min(Rd,s.width),o=Math.min(Cd,s.height);if(e==="move")return{...n,left:wn(n.left+t,0,Math.max(0,s.width-n.width)),top:wn(n.top+i,pa(n.height,s),Math.max(pa(n.height,s),s.height-n.height))};let a=n.left,l=n.top,c=n.left+n.width,h=n.top+n.height;return e.includes("w")&&(a=wn(a+t,0,c-r)),e.includes("e")&&(c=wn(c+t,a+r,s.width)),e.includes("s")&&(h=wn(h+i,l+o,s.height)),{left:a,top:l,width:c-a,height:h-l}}const Hc=()=>({width:Math.max(1,innerWidth),height:Math.max(1,innerHeight)});function If(){const n=document.querySelector(".floating-render-handle-layer");if(n)return n;const e=document.querySelector(".shell");if(!e)throw Error("Floating move handle requires workspace shell");const t=document.createElement("div");return t.className="floating-render-handle-layer",e.append(t),t}function Ld(n,e){const t=[];let i=()=>{};const s=If();function r(o,a){const l=document.createElement("button");if(l.type="button",l.className=o==="move"?"float-window-handle":"float-corner-grip",l.innerHTML=o==="move"?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>':"",o==="move"){l.dataset.floatHandle="",l.dataset.floatOwner=n.dataset.floatId??"tiled",l.hidden=!0,s.append(l);const u=()=>{const m=n.isConnected&&e.enabled?.()!==!1;if(l.hidden=!m,!m)return;const f=n.getBoundingClientRect(),w=n.classList.contains("floating-render-view")?131:101;l.style.left=Math.round(f.left+3)+"px",l.style.top=Math.round(f.top+3)+"px",l.style.width=Math.max(46,Math.round(f.width-w-3))+"px",l.style.zIndex=String(Math.max(1,Number(n.style.zIndex)||1))},p=new ResizeObserver(u);p.observe(n);const g=new MutationObserver(u);g.observe(n,{attributes:!0,attributeFilter:["style","class","hidden"]});const _=n.closest(".workbench-layout");_&&g.observe(_,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",u),i=()=>{p.disconnect(),g.disconnect(),window.removeEventListener("resize",u)},requestAnimationFrame(u)}else l.dataset.corner=o,n.append(l);l.title=a,l.setAttribute("aria-label",a),t.push(l);let c=null;const h=u=>{n.style.left=Math.round(u.left)+"px",n.style.top=Math.round(u.top)+"px",n.style.width=Math.round(u.width)+"px",n.style.height=Math.round(u.height)+"px",e.onChange(u)};l.addEventListener("pointerdown",u=>{if(u.button!==0||e.enabled?.()===!1)return;e.onActivate?.();const p=n.getBoundingClientRect();c={id:u.pointerId,x:u.clientX,y:u.clientY,rect:{left:p.left,top:p.top,width:p.width,height:p.height},changed:!1},l.setPointerCapture(u.pointerId),u.preventDefault(),u.stopPropagation()}),l.addEventListener("pointermove",u=>{if(!c||c.id!==u.pointerId)return;const p=zc(c.rect,o,u.clientX-c.x,u.clientY-c.y,Hc());Math.abs(p.left-c.rect.left)+Math.abs(p.top-c.rect.top)+Math.abs(p.width-c.rect.width)+Math.abs(p.height-c.rect.height)<.5||(c.changed=!0,h(p),u.preventDefault(),u.stopPropagation())});const d=u=>{if(!c||c.id!==u.pointerId)return;const p=c.changed;c=null,l.hasPointerCapture(u.pointerId)&&l.releasePointerCapture(u.pointerId),p&&e.onEnd(),u.preventDefault(),u.stopPropagation()};l.addEventListener("pointerup",d),l.addEventListener("pointercancel",d),l.addEventListener("keydown",u=>{if(e.enabled?.()===!1)return;e.onActivate?.();const g={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[u.key];if(!g)return;u.preventDefault(),u.stopPropagation();const _=n.getBoundingClientRect();h(zc({left:_.left,top:_.top,width:_.width,height:_.height},o,g[0]*(u.shiftKey?1:10),g[1]*(u.shiftKey?1:10),Hc())),e.onEnd()})}r("move","Move floating viewport");for(const o of["sw","se"])r(o,"Resize floating viewport from "+o.toUpperCase()+" corner");return()=>{i();for(const o of t)o.remove()}}const Id="flatcad.layout.v1",At={version:1,main:.56,solid:.54,docked:!1,tileMode:"split",tileOrder:["sketch","properties","solid"],dockX:.5,floatX:.58,floatY:.17,floatW:380,floatH:340,tiledSolidVisible:!0},Uf=["sketch","solid","properties"],Ii=n=>typeof n=="number"&&Number.isFinite(n);function Ud(n){return Array.isArray(n)&&n.length===3&&Uf.every(e=>n.includes(e))&&new Set(n).size===3}function Vs(n,e,t,i){if(!Number.isFinite(e)||e<=0||!Number.isFinite(n))return .5;const s=Math.max(1,e-8),r=Math.min(.9,t/s),o=Math.max(r,Math.min(.9,1-i/s));return Math.max(r,Math.min(o,n))}function ma(n){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid workspace layout");const e=n;if(e.version!==1||!Ii(e.main)||!Ii(e.solid)||typeof e.docked!="boolean"||e.main<=0||e.main>=1||e.solid<=0||e.solid>=1)throw new Error("Invalid workspace split settings");const t=e.tileMode===void 0?"split":e.tileMode,i=e.tileOrder===void 0?At.tileOrder:e.tileOrder,s=e.dockX===void 0?At.dockX:e.dockX,r=e.floatX===void 0?At.floatX:e.floatX,o=e.floatY===void 0?At.floatY:e.floatY,a=e.floatW===void 0?At.floatW:e.floatW,l=e.floatH===void 0?At.floatH:e.floatH,c=e.tiledSolidVisible===void 0?!0:e.tiledSolidVisible;if(t!=="split"&&t!=="columns"&&t!=="float"||!Ud(i)||!Ii(s)||s<0||s>1||!Ii(r)||r<0||r>1||!Ii(o)||o<0||o>1||!Ii(a)||a<220||a>3e3||!Ii(l)||l<180||l>3e3||typeof c!="boolean")throw new Error("Invalid workspace panel arrangement");return{version:1,main:e.main,solid:e.solid,docked:e.docked,tileMode:t,tileOrder:[...i],dockX:s,floatX:r,floatY:o,floatW:a,floatH:l,tiledSolidVisible:c}}function Nf(){try{const n=localStorage.getItem(Id);return n?ma(JSON.parse(n)):{...At,tileOrder:[...At.tileOrder]}}catch{return{...At,tileOrder:[...At.tileOrder]}}}function Vc(n){try{localStorage.setItem(Id,JSON.stringify(ma(n)))}catch{}}class Ff{constructor(e,t,i,s,r,o=()=>{}){this.outer=e,this.side=t,this.mainDivider=i,this.sideDivider=s,this.dockChange=r,this.onLayoutChange=o,this.state=Nf(),this.attach(i,"main"),this.attach(s,"solid"),this.apply(),this.dockChange(this.state.docked),window.addEventListener("resize",()=>this.apply())}state;get docked(){return this.state.docked}get dockX(){return this.state.dockX}get tileMode(){return this.state.tileMode}get tiledSolidVisible(){return this.state.tiledSolidVisible}setTiledSolidVisible(e){e!==this.state.tiledSolidVisible&&this.commit({...this.state,tiledSolidVisible:e})}get floatingPosition(){return{x:this.state.floatX,y:this.state.floatY}}get floatingRect(){return Pd(this.state.floatX,this.state.floatY,this.state.floatW,this.state.floatH,{width:innerWidth,height:innerHeight})}updateFloatingRect(e){const t=Dd(e,{width:innerWidth,height:innerHeight});this.state=ma({...this.state,floatX:t.x,floatY:t.y,floatW:e.width,floatH:e.height})}persistFloatingRect(){Vc(this.state),this.onLayoutChange()}get tileOrder(){return[...this.state.tileOrder]}setDocked(e){this.state.docked!==e&&(this.commit({...this.state,docked:e}),this.dockChange(e),this.apply())}setDockX(e){Number.isFinite(e)&&this.commit({...this.state,dockX:Math.max(0,Math.min(1,e))})}setTileMode(e){e!==this.state.tileMode&&this.commit({...this.state,tileMode:e})}setFloatPosition(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return;const i=Math.max(0,Math.min(1,e)),s=Math.max(0,Math.min(1,t));Math.abs(this.state.floatX-i)+Math.abs(this.state.floatY-s)<1e-5||this.commit({...this.state,floatX:i,floatY:s})}setTileOrder(e){if(!Ud(e))throw new Error("Invalid tile order");this.commit({...this.state,tileOrder:[...e]})}resetArrangement(){this.commit({...this.state,tileMode:At.tileMode,tileOrder:[...At.tileOrder],main:At.main,solid:At.solid,dockX:At.dockX,floatX:At.floatX,floatY:At.floatY,floatW:At.floatW,floatH:At.floatH})}commit(e){this.state=ma(e),Vc(this.state),this.apply(),this.onLayoutChange()}isStacked(){return window.matchMedia("(max-width:779px), (max-width:1100px) and (orientation:portrait)").matches}isThree(){return this.state.tileMode==="columns"&&!this.isStacked()}axes(e){return this.isThree()?{element:this.outer,axis:"horizontal",divider:e==="main"?this.mainDivider:this.sideDivider}:e==="main"?{element:this.outer,axis:this.isStacked()?"vertical":"horizontal",divider:this.mainDivider}:{element:this.side,axis:"vertical",divider:this.sideDivider}}limits(e,t){return this.isThree()?e==="main"?[220,380]:[180,220]:e==="solid"?[155,115]:t==="horizontal"?[300,300]:[230,230]}apply(){const e=this.isThree();this.outer.classList.toggle("three-tiles",e),this.outer.classList.toggle("float-solid",this.state.tileMode==="float"),this.outer.classList.toggle("tiled-solid-hidden",!this.state.tiledSolidVisible&&this.state.tileMode!=="float");const t=this.state.tileOrder.filter(i=>i!=="solid");for(const[i,s]of t.entries())this.outer.style.setProperty("--tile-"+s+"-visible-col",String(i*2+1));this.outer.dataset.tileMode=e?"columns":this.state.tileMode,this.outer.dataset.tileOrder=this.state.tileOrder.join(",");for(const[i,s]of this.state.tileOrder.entries())this.outer.style.setProperty("--tile-"+s+"-col",String(i*2+1));if(e){const i=Math.max(1,this.outer.clientWidth-16),s=Vs(this.state.main,i,220,400),r=i*(1-s),o=Vs(this.state.solid,r,180,220);this.outer.style.setProperty("--three-first",String(s*100)+"%"),this.outer.style.setProperty("--three-second",String((1-s)*o*100)+"%")}for(const i of["main","solid"]){const{element:s,axis:r,divider:o}=this.axes(i),a=r==="horizontal"?s.clientWidth:s.clientHeight,[l,c]=this.limits(i,r),h=Vs(this.state[i],a,l,c);e||s.style.setProperty(i==="main"?"--main-split":"--solid-split",(h*100).toFixed(5)+"%"),o.setAttribute("aria-orientation",r==="horizontal"?"vertical":"horizontal"),o.setAttribute("aria-valuenow",String(Math.round(h*100))),o.dataset.axis=r,o.dataset.ratio=String(h)}}update(e,t){const{element:i,axis:s}=this.axes(e),r=s==="horizontal"?i.clientWidth:i.clientHeight,[o,a]=this.limits(e,s);let l=t;if(this.isThree()&&e==="solid"){const h=Math.max(1,r-16),d=Vs(this.state.main,h,220,400);l=(t-d)/Math.max(.01,1-d)}const c=Vs(l,r,o,a);this.commit({...this.state,[e]:c})}attach(e,t){e.addEventListener("pointerdown",i=>{if(i.button!==0)return;i.preventDefault(),e.setPointerCapture(i.pointerId);const{element:s,axis:r}=this.axes(t),o=s.getBoundingClientRect(),a=d=>r==="horizontal"?d.clientX-o.left:d.clientY-o.top,l=r==="horizontal"?o.width:o.height,c=d=>{d.pointerId===i.pointerId&&this.update(t,(a(d)-4)/Math.max(1,l-8))},h=d=>{d.pointerId===i.pointerId&&(e.removeEventListener("pointermove",c),e.removeEventListener("pointerup",h),e.removeEventListener("pointercancel",h),e.hasPointerCapture(d.pointerId)&&e.releasePointerCapture(d.pointerId))};e.addEventListener("pointermove",c),e.addEventListener("pointerup",h),e.addEventListener("pointercancel",h)}),e.addEventListener("keydown",i=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(i.key))return;i.preventDefault();const{axis:s}=this.axes(t),r=s==="horizontal"?"ArrowLeft":"ArrowUp",o=s==="horizontal"?"ArrowRight":"ArrowDown",a=this.state[t],l=i.key==="Home"?.1:i.key==="End"?.9:i.key===r?a-.035:i.key===o?a+.035:a;this.update(t,l)}),e.addEventListener("dblclick",()=>this.update(t,At[t]))}}function Gc(n,e){const t=$n(n);return t.length<2?Number.POSITIVE_INFINITY:Math.min(...t.map((i,s)=>Md(e,i,t[(s+1)%t.length])))}function Of(n,e,t=.01){const[i,s,r]=e.point,o=new Map(n.profiles.map(l=>[l.id,l]));if(n.features.some(l=>{if(l.operation!=="cut")return!1;const c=o.get(l.profileId);if(!c||!ha(c,{x:i,y:s}))return!1;const h=Math.min(l.z,l.z+l.depth),d=Math.max(l.z,l.z+l.depth);return r>h+t&&r<d-t}))return null;const a=[];for(const l of n.features){const c=o.get(l.profileId);if(!c)continue;const h=Math.min(l.z,l.z+l.depth),d=Math.max(l.z,l.z+l.depth);if(!(r<h-t||r>d+t)){if(e.z!==null){if(!(Math.abs(e.z-l.z)<=t||Math.abs(e.z-(l.z+l.depth))<=t)||!ha(c,{x:i,y:s})&&Gc(c,{x:i,y:s})>t)continue}else if(Gc(c,{x:i,y:s})>t)continue;a.push(l)}}return a.length===1?a[0]:null}function Gl(n,e,t){if(!n)return"";const i=n.kind==="vertex"?"Vertex":"Face";return n.z===null?i+" · nonhorizontal (no Z latch)":e==="z"?i+" · Z "+n.z+" mm → Start Z":e==="depth"?i+" · Depth "+Number((n.z-t).toFixed(5))+" mm":i+" · Z "+n.z+" mm"}const qa=1e-6;function Ya(n,e,t,i,s,r,o){const a=i.x-t.x,l=i.y-t.y;if(e==="rectangle"||e==="centerRectangle"){let h=Math.abs(a),d=Math.abs(l);if(s){const p=Math.max(h,d);h=p,d=p}if(h<=qa||d<=qa)return null;const u=e==="centerRectangle";return{id:n,kind:"rectangle",x:u?t.x-h:Math.min(t.x,t.x+Math.sign(a||1)*h),y:u?t.y-d:Math.min(t.y,t.y+Math.sign(l||1)*d),width:u?h*2:h,height:u?d*2:d}}const c=Math.hypot(a,l);return c<=qa?null:e==="circle"?{id:n,kind:"circle",x:t.x,y:t.y,radius:c}:e==="polygon"?{id:n,kind:"polygon",x:t.x,y:t.y,radius:c,sides:r.sides,rotation:r.rotation}:{id:n,kind:"slot",x1:t.x,y1:t.y,x2:i.x,y2:i.y,radius:o}}const Gs={select:null,line:"╱",rectangle:"▭",centerRectangle:"▣",circle:"◯",polygon:"⬡",slot:"⬭",pan:null,extrude:"↥"},Ho=42,$s={angle:.55,velocity:0},xs=(n,e,t)=>Math.max(e,Math.min(t,n));function kf(n,e){const t=Math.cos(n.angle),i=Math.sin(n.angle),s=xs(e.x,-80,80),r=xs(e.y,-80,80),o=(s*i-r*t)/Ho,a=Math.max(0,(s*t+r*i)/Ho),l=n.velocity<-.025?-1:1,c=xs(o*.42+l*Math.min(.55,a*.65),-.45,.45),h=xs(n.velocity*.62+c,-.35,.35);return{angle:n.angle+h,velocity:h}}function Bf(n){const e=Math.abs(n.velocity)<.001?0:n.velocity*.81;return{angle:n.angle+e,velocity:e}}function zf(n,e,t=$s.angle,i=24,s=Ho){const o=Math.max(i+6,e.width),a=Math.max(i+6,e.height),l=n.x+Math.cos(t)*s-i/2,c=n.y+Math.sin(t)*s-i/2;return{x:Math.round(xs(l,3,o-i-3)),y:Math.round(xs(c,3,a-i-3))}}class Hf{constructor(e,t,i,s){this.canvas=e,this.events=s;const r=e.getContext("2d");if(!r)throw new Error("Canvas 2D is not supported");this.ctx=r,this.doc=t,this.prefs=i;const o=document.createElement("span");o.className="sketch-tool-cursor",o.setAttribute("aria-hidden","true"),o.hidden=!0;const a=e.parentElement;if(!a)throw Error("Sketch canvas requires a positioned wrapper");a.append(o),this.toolBadge=o,e.draggable=!1,e.style.userSelect="none",e.style.touchAction="none",e.addEventListener("dragstart",l=>l.preventDefault()),e.addEventListener("selectstart",l=>l.preventDefault()),this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(e),this.resize(),e.addEventListener("pointerenter",l=>this.updateToolBadge(l)),e.addEventListener("pointerleave",()=>this.hideToolBadge()),e.addEventListener("pointerdown",l=>this.pointerDown(l)),e.addEventListener("pointermove",l=>this.pointerMove(l)),e.addEventListener("pointerup",l=>this.pointerUp(l)),e.addEventListener("pointercancel",()=>{this.gesture=null,this.hideToolBadge(),this.draw()}),e.addEventListener("wheel",l=>this.wheel(l),{passive:!1}),e.addEventListener("contextmenu",l=>l.preventDefault())}ctx;observer;doc;prefs;selected=null;selectedIds=[];hover=null;tool="select";zoom=4;panX=0;panY=0;width=1;height=1;mounted=!1;gesture=null;pendingDraw=null;linePoints=[];lineCursor=null;highlightedSnap=null;extrude=null;slotRadius=3;lastPointer=null;toolBadge;pointerOnSketch=!1;orbit={...$s};orbitFrame=null;orbitPointer=null;setDocument(e){this.doc=e,this.draw()}setPreferences(e){this.prefs=e,this.draw()}setSelected(e,t=e?[e]:[]){this.selected=e,this.selectedIds=[...t],this.draw()}setTool(e){this.tool==="line"&&e!=="line"&&this.finishLine(!1),this.cancelPendingDraw(!1),this.tool=e,this.gesture=null,Gs[e]||(this.orbit={...$s}),this.canvas.style.cursor=e==="pan"?"grab":e==="select"?"default":"crosshair",this.refreshToolBadge(),this.pointerOnSketch&&this.drawToolBadgeAtPointer(),this.draw()}setSlotRadius(e){Number.isFinite(e)&&e>0&&(this.slotRadius=e)}setExtrudeHandle(e){this.extrude=e,this.draw()}getZoom(){return this.zoom}hasPendingDraw(){return this.pendingDraw!==null}cancelPendingDraw(e=!0){this.pendingDraw=null,delete this.canvas.dataset.drawStage,delete this.canvas.dataset.drawTool,e&&this.draw()}getSelectedPoint(){const e=this.doc.profiles.find(t=>t.id===this.selected);return e?this.toScreen(da(e)):null}getExtrudeArrowScreen(){return this.arrowScreen()}getLastPointerScreen(){return this.lastPointer?{...this.lastPointer}:null}getSelectionBounds(){const e=this.doc.profiles.filter(t=>this.selectedIds.includes(t.id)).flatMap(t=>$n(t).map(i=>this.toScreen(i)));return e.length===0?null:{left:Math.min(...e.map(t=>t.x)),right:Math.max(...e.map(t=>t.x)),top:Math.min(...e.map(t=>t.y)),bottom:Math.max(...e.map(t=>t.y))}}getViewport(){return{width:this.width,height:this.height}}dispose(){this.observer.disconnect(),this.stopOrbitAnimation(),this.toolBadge.remove()}hasPendingLine(){return this.linePoints.length>0}cancelLine(){this.linePoints=[],this.lineCursor=null,this.draw()}removeLastLinePoint(){this.linePoints.pop(),this.draw()}finishLine(e){if(this.linePoints.length<2)return this.cancelLine(),!1;if(e&&this.linePoints.length<3)return this.events.onStatus("Closed outlines need three or more points"),!1;const t=this.linePoints;if(e&&!Sd(t))return this.events.onStatus("Outline is self-intersecting or has zero area · edit vertices and retry"),!1;this.linePoints=[],this.lineCursor=null;try{this.events.onCreate({id:Hi("path"),kind:"path",points:t,closed:e})}catch(i){throw this.linePoints=t,i}finally{this.draw()}return!0}resize(){const e=this.canvas.getBoundingClientRect();this.width=Math.max(1,e.width),this.height=Math.max(1,e.height);const t=Math.min(3,devicePixelRatio||1);this.canvas.width=Math.round(this.width*t),this.canvas.height=Math.round(this.height*t),this.ctx.setTransform(t,0,0,t,0,0),this.mounted||(this.panX=this.width/2,this.panY=this.height/2,this.mounted=!0),this.draw()}screen(e){const t=this.canvas.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}refreshToolBadge(){const e=Gs[this.tool];this.toolBadge.hidden=!e||!this.pointerOnSketch,e?(this.toolBadge.textContent=e,this.toolBadge.dataset.cursorTool=this.tool):(this.toolBadge.textContent="",delete this.toolBadge.dataset.cursorTool,this.stopOrbitAnimation())}drawToolBadgeAtPointer(){if(!this.pointerOnSketch||!this.orbitPointer)return;const e=zf(this.orbitPointer,{width:this.width,height:this.height},this.orbit.angle);this.toolBadge.style.left=e.x+"px",this.toolBadge.style.top=e.y+"px",this.toolBadge.dataset.orbitAngle=this.orbit.angle.toFixed(4)}stopOrbitAnimation(){this.orbitFrame!==null&&cancelAnimationFrame(this.orbitFrame),this.orbitFrame=null}scheduleOrbitSettle(){if(this.orbitFrame!==null||!this.pointerOnSketch||!Gs[this.tool])return;const e=()=>{this.orbitFrame=null,!(!this.pointerOnSketch||!Gs[this.tool])&&(this.orbit=Bf(this.orbit),this.drawToolBadgeAtPointer(),this.orbit.velocity!==0&&(this.orbitFrame=requestAnimationFrame(e)))};this.orbitFrame=requestAnimationFrame(e)}updateToolBadge(e){const t=this.screen(e);this.pointerOnSketch=t.x>=0&&t.x<=this.width&&t.y>=0&&t.y<=this.height,this.pointerOnSketch?(Gs[this.tool]?this.orbitPointer&&(this.orbit=kf(this.orbit,{x:t.x-this.orbitPointer.x,y:t.y-this.orbitPointer.y})):this.orbit={...$s},this.orbitPointer=t,this.drawToolBadgeAtPointer(),this.scheduleOrbitSettle()):this.hideToolBadge(),this.refreshToolBadge()}hideToolBadge(){this.pointerOnSketch=!1,this.orbitPointer=null,this.stopOrbitAnimation(),this.orbit={...$s},this.toolBadge.hidden=!0}world(e){return{x:(e.x-this.panX)/this.zoom,y:(this.panY-e.y)/this.zoom}}toScreen(e){return{x:this.panX+e.x*this.zoom,y:this.panY-e.y*this.zoom}}maybeSnap(e,t,i){if(this.highlightedSnap=null,t.altKey)return e;const s=10/this.zoom;if(this.prefs.grid.snapGeometry){let a=null,l=s;for(const c of this.doc.profiles)if(!(typeof i=="string"?c.id===i:i?.includes(c.id)))for(const h of lf(c)){const d=vn(e,h);d<l&&(l=d,a=h)}if(a)return this.highlightedSnap=a,{...a}}let r=e,o=1/0;for(const a of this.prefs.grid.tiers){if(!a.snap)continue;const l={x:Math.round(e.x/a.spacing)*a.spacing,y:Math.round(e.y/a.spacing)*a.spacing},c=vn(e,l);c<o&&(r=l,o=c)}return o<1/0&&(this.highlightedSnap=r),r}hitProfile(e){for(let t=this.doc.profiles.length-1;t>=0;t--)if(af(this.doc.profiles[t],e,7/this.zoom))return this.doc.profiles[t].id;return null}hitHandle(e){const t=this.doc.profiles.find(s=>s.id===this.selected);if(!t||this.selectedIds.length!==1)return null;const i=Uc(t);for(let s=0;s<i.length;s++)if(vn(this.toScreen(i[s].point),e)<=11)return s;return null}arrowScreen(){if(!this.extrude||this.selected!==this.extrude.id)return null;const e=this.getSelectedPoint();if(!e)return null;const t=Math.sign(this.extrude.depth)||1,i=Math.max(35,Math.min(130,Math.abs(this.extrude.depth)*this.zoom));return{x:e.x+22,y:e.y-t*i}}pointerDown(e){if(e.button!==0&&e.button!==1)return;e.preventDefault();const t=this.screen(e);if(this.lastPointer=t,this.tool==="pan"||e.button===1)this.gesture={kind:"pan",from:t,origin:{x:this.panX,y:this.panY}};else if(this.pendingDraw&&this.pendingDraw.tool===this.tool){const i=this.pendingDraw,s=this.maybeSnap(this.world(t),e),r=Ya(Hi("sketch"),i.tool,i.from,s,e.shiftKey||i.shift,this.prefs.polygon,this.slotRadius);r?(this.cancelPendingDraw(!1),this.events.onCreate(r)):this.events.onStatus("Choose a second point with nonzero dimensions · Esc cancels"),this.draw();return}else if(this.extrude&&this.arrowScreen()&&vn(t,this.arrowScreen())<=16)this.gesture={kind:"depth",startY:t.y,startDepth:this.extrude.depth};else if(this.tool==="line"){const i=this.maybeSnap(this.world(t),e);this.linePoints.length>=3&&vn(this.toScreen(this.linePoints[0]),t)<12?this.finishLine(!0):e.detail>=2&&this.linePoints.length>=2?this.finishLine(!1):this.linePoints.length>=256?this.events.onStatus("Polyline limit is 256 vertices; finish or close the line"):(!this.linePoints.length||vn(i,this.linePoints.at(-1))>1e-8)&&(this.linePoints.push(i),this.lineCursor=i,this.events.onStatus("Click vertices · click start to close · Enter finish open · Esc cancel")),this.draw();return}else if(this.tool==="extrude"){const i=this.hitProfile(this.world(t)),s=e.ctrlKey||e.metaKey;this.events.onSelect(i,s),i&&!s?this.events.onExtrude(i,t):i||this.events.onStatus("Click a closed profile to extrude or cut"),this.draw();return}else if(this.tool==="select"){const i=this.hitProfile(this.world(t));if(e.ctrlKey||e.metaKey){this.events.onSelect(i,!0),this.draw();return}const s=this.hitHandle(t),r=this.doc.profiles.find(o=>o.id===this.selected);if(s!==null&&r)this.gesture={kind:"handle",original:r,index:s,preview:r};else{this.events.onSelect(i,!1);const o=this.doc.profiles.find(a=>a.id===i);if(o){const a=this.doc.profiles.filter(l=>this.selectedIds.includes(l.id));a.length>1?this.gesture={kind:"groupMove",originals:a,previews:a,from:this.world(t),duplicate:e.altKey}:this.gesture={kind:"move",original:o,from:this.world(t),preview:o,duplicate:e.altKey}}}}else{const i=this.maybeSnap(this.world(t),e);this.gesture={kind:"draw",tool:this.tool,from:i,to:i,shift:e.shiftKey}}this.gesture&&this.canvas.setPointerCapture(e.pointerId),this.draw()}pointerMove(e){const t=this.screen(e);if(this.lastPointer=t,this.updateToolBadge(e),this.tool==="line"&&this.linePoints.length&&(this.lineCursor=this.maybeSnap(this.world(t),e)),!this.gesture){this.pendingDraw&&(this.pendingDraw.to=this.maybeSnap(this.world(t),e),this.pendingDraw.shift=e.shiftKey);const s=this.hitProfile(this.world(t));(s!==this.hover||this.tool==="line"||this.pendingDraw)&&(this.hover=s,this.draw());return}const i=this.gesture;if(i.kind==="pan")this.panX=i.origin.x+t.x-i.from.x,this.panY=i.origin.y+t.y-i.from.y;else if(i.kind==="depth"){const s=(i.startY-t.y)/this.zoom,r=Math.round((i.startDepth+s)*10)/10,o=Math.abs(r)<.1?r<0?-.1:.1:r;this.extrude&&(this.extrude={...this.extrude,depth:o}),this.events.onExtrudeDepth(o)}else{const s=this.maybeSnap(this.world(t),e,i.kind==="move"||i.kind==="handle"?i.original.id:i.kind==="groupMove"?i.originals.map(r=>r.id):void 0);if(i.kind==="draw")i.to=s,i.shift=e.shiftKey;else if(i.kind==="move"){let r=s.x-i.from.x,o=s.y-i.from.y;e.shiftKey&&(Math.abs(r)>=Math.abs(o)?o=0:r=0),i.preview=ko(i.original,r,o)}else if(i.kind==="groupMove"){let r=s.x-i.from.x,o=s.y-i.from.y;e.shiftKey&&(Math.abs(r)>=Math.abs(o)?o=0:r=0),i.previews=i.originals.map(a=>ko(a,r,o))}else i.kind==="handle"&&(i.preview=of(i.original,i.index,s,e.shiftKey))}this.draw()}pointerUp(e){const t=this.gesture;if(t){this.canvas.hasPointerCapture(e.pointerId)&&this.canvas.releasePointerCapture(e.pointerId),this.gesture=null;try{if(t.kind==="draw"){const i=this.maybeSnap(this.world(this.screen(e)),e),s=Ya(Hi("sketch"),t.tool,t.from,i,t.shift||e.shiftKey,this.prefs.polygon,this.slotRadius);s?(this.cancelPendingDraw(!1),this.events.onCreate(s)):(this.pendingDraw={kind:"draw",tool:t.tool,from:t.from,to:t.from,shift:t.shift||e.shiftKey},this.canvas.dataset.drawStage="await-second-click",this.canvas.dataset.drawTool=t.tool,this.events.onStatus("First point fixed · click second point to finish · Esc cancels"))}else t.kind==="groupMove"?t.previews.some((i,s)=>JSON.stringify(i)!==JSON.stringify(t.originals[s]))&&(t.duplicate?this.events.onCreateMany(t.previews.map(i=>({...i,id:Hi("copy")}))):this.events.onEditMany(t.previews)):(t.kind==="move"||t.kind==="handle")&&JSON.stringify(t.preview)!==JSON.stringify(t.original)&&(t.kind==="move"&&t.duplicate?this.events.onCreate({...t.preview,id:Hi("copy")}):this.events.onEdit(t.preview))}finally{this.draw()}}}wheel(e){e.preventDefault();const t=this.screen(e),i=Math.max(.15,Math.min(200,this.zoom*Math.exp(-e.deltaY*.001))),s=i/this.zoom;this.panX=t.x-(t.x-this.panX)*s,this.panY=t.y-(t.y-this.panY)*s,this.zoom=i,this.events.onViewChange(this.zoom),this.draw()}drawGrid(){const e=this.ctx,t=this.world({x:0,y:this.height}),i=this.world({x:this.width,y:0});for(const s of this.prefs.grid.tiers){if(!s.enabled||s.spacing*this.zoom<8)continue;const r=(i.x-t.x)/s.spacing,o=(i.y-t.y)/s.spacing;if(!(r>500||o>500)){e.beginPath(),e.lineWidth=1,e.strokeStyle=s.color;for(let a=Math.ceil(t.x/s.spacing);a*s.spacing<=i.x;a++){const l=Math.round(this.toScreen({x:a*s.spacing,y:0}).x)+.5;e.moveTo(l,0),e.lineTo(l,this.height)}for(let a=Math.ceil(t.y/s.spacing);a*s.spacing<=i.y;a++){const l=Math.round(this.toScreen({x:0,y:a*s.spacing}).y)+.5;e.moveTo(0,l),e.lineTo(this.width,l)}e.stroke()}}e.lineWidth=1.4,e.strokeStyle="#466782",e.beginPath(),e.moveTo(this.panX,0),e.lineTo(this.panX,this.height),e.moveTo(0,this.panY),e.lineTo(this.width,this.panY),e.stroke()}paintShape(e,t=!1,i=!1,s=!1){const r=this.ctx,o=$n(e);if(!o.length)return;const a=this.toScreen(o[0]);r.beginPath(),r.moveTo(a.x,a.y);for(const l of o.slice(1)){const c=this.toScreen(l);r.lineTo(c.x,c.y)}if(Ts(e)&&r.closePath(),r.fillStyle=t?"#f0af5e20":i?"#76baf52b":"#64aaf519",r.strokeStyle=s?"#e1ad67":t?"#eeb76c":i?"#b7dcff":"#6caaf1",r.lineWidth=t?2.3:1.6,r.setLineDash(s?[5,4]:e.kind==="path"&&!e.closed?[8,4]:[]),Ts(e)&&r.fill(),r.stroke(),r.setLineDash([]),t&&!s&&this.selectedIds.length===1)for(const l of Uc(e)){const c=this.toScreen(l.point);r.fillStyle="#f9c889",r.strokeStyle="#61411e",r.lineWidth=1,r.fillRect(c.x-4,c.y-4,8,8),r.strokeRect(c.x-4,c.y-4,8,8)}if(e.kind!=="path"){const l=this.toScreen(da(e)),c=e.kind==="rectangle"?Bn(e.width)+" × "+Bn(e.height):e.kind==="circle"?"Ø "+Bn(2*e.radius):e.kind==="polygon"?e.sides+" sides · R"+Bn(e.radius):"Slot · R"+Bn(e.radius);r.font=this.sketchFont(),r.textAlign="center",r.fillStyle=t?"#ffd6a2":"#bddaf5",r.fillText(c,l.x,l.y+4)}}paintDraft(e){const t=Ya("draft",e.tool,e.from,e.to,e.shift,this.prefs.polygon,this.slotRadius);t&&$n(t).every(r=>Number.isFinite(r.x)&&Number.isFinite(r.y))&&this.paintShape(t,!1,!1,!0);const i=this.toScreen(e.to);this.ctx.font=this.sketchFont(),this.ctx.textAlign="left",this.ctx.fillStyle="#ffc786";const s=t?.kind==="rectangle"?Bn(t.width)+" × "+Bn(t.height)+" mm":Bn(vn(e.from,e.to))+" mm";if(this.ctx.fillText(s,i.x+12,i.y-12),this.pendingDraw){const r=this.toScreen(e.from);this.ctx.strokeStyle="#ffcd90",this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(r.x,r.y,6,0,Math.PI*2),this.ctx.stroke(),this.ctx.fillStyle="#ffc786",this.ctx.fillText("Click second point · Esc cancels",Math.max(12,Math.min(this.width-225,r.x+12)),Math.max(25,r.y-15))}}paintLine(){if(!this.linePoints.length)return;const e=this.ctx,t=this.toScreen(this.linePoints[0]);e.beginPath(),e.moveTo(t.x,t.y);for(const i of this.linePoints.slice(1)){const s=this.toScreen(i);e.lineTo(s.x,s.y)}if(this.lineCursor){const i=this.toScreen(this.lineCursor);e.lineTo(i.x,i.y)}e.strokeStyle="#e8af68",e.lineWidth=2,e.setLineDash([5,3]),e.stroke(),e.setLineDash([]),e.fillStyle="#ffcd90";for(const i of this.linePoints){const s=this.toScreen(i);e.beginPath(),e.arc(s.x,s.y,4,0,Math.PI*2),e.fill()}this.linePoints.length>=3&&(e.strokeStyle="#ffb76b",e.lineWidth=2,e.beginPath(),e.arc(t.x,t.y,9,0,Math.PI*2),e.stroke())}paintExtrude(){const e=this.arrowScreen(),t=this.getSelectedPoint();if(!e||!t||!this.extrude)return;const i=this.ctx;i.strokeStyle="#f6ba66",i.lineWidth=3,i.beginPath(),i.moveTo(t.x+22,t.y),i.lineTo(e.x,e.y),i.stroke(),i.fillStyle="#f6ba66";const s=this.extrude.depth<0?-1:1;i.beginPath(),i.moveTo(e.x,e.y-13*s),i.lineTo(e.x-11,e.y+10*s),i.lineTo(e.x-4,e.y+7*s),i.lineTo(e.x+4,e.y+7*s),i.lineTo(e.x+11,e.y+10*s),i.closePath(),i.fill(),i.textAlign="left",i.fillStyle="#ffd6a1",i.font=this.sketchFont(),i.fillText("↕ "+Bn(this.extrude.depth)+" mm",e.x+16,e.y+4)}sketchFont(){const{weight:e,sizePx:t,fontFamily:i}=this.prefs.sketchText;return e+" "+t+"px "+i}draw(){this.canvas.dataset.sketchTextFont=this.sketchFont(),this.canvas.dataset.viewPanX=String(this.panX),this.canvas.dataset.viewPanY=String(this.panY);const e=this.ctx;e.clearRect(0,0,this.width,this.height),e.fillStyle="#0b1422",e.fillRect(0,0,this.width,this.height),this.drawGrid();const t=this.gesture?.kind==="move"||this.gesture?.kind==="handle"?this.gesture.preview:null,i=this.gesture?.kind==="groupMove"?new Map(this.gesture.previews.map(s=>[s.id,s])):null;for(const s of this.doc.profiles){const r=i?.get(s.id)??(t?.id===s.id?t:s);this.paintShape(r,this.selectedIds.includes(r.id),r.id===this.hover,t?.id===s.id||!!i?.has(s.id))}if(this.gesture?.kind==="draw"?this.paintDraft(this.gesture):this.pendingDraw&&this.paintDraft(this.pendingDraw),this.paintLine(),this.paintExtrude(),this.highlightedSnap){const s=this.toScreen(this.highlightedSnap);e.strokeStyle="#6bdda9",e.lineWidth=1.5,e.beginPath(),e.arc(s.x,s.y,5,0,Math.PI*2),e.stroke()}e.textAlign="left",e.fillStyle="#7490a9",e.font=this.sketchFont(),e.fillText("XY · "+Bn(this.zoom)+" px/mm",12,this.height-14)}}function Bn(n){return Number.isFinite(n)?Number(n.toFixed(2)).toString():"—"}class Vf{worker=new Worker(new URL(""+new URL("kernel-worker-5QTFZnJs.js",import.meta.url).href,import.meta.url),{type:"module"});pending=new Map;nextId=1;constructor(){this.worker.onmessage=({data:e})=>{const t=this.pending.get(e.id);t&&(this.pending.delete(e.id),e.ok?t.resolve(e.action==="build"?{mesh:e.mesh,statistics:e.statistics,cutTool:e.cutTool,historyFrames:e.historyFrames}:e.blob):t.reject(new Error(e.message)))},this.worker.onerror=e=>{const t=new Error(e.message||"CAD worker failed");for(const i of this.pending.values())i.reject(t);this.pending.clear()}}request(e,t,i={}){const s=this.nextId++;return new Promise((r,o)=>{this.pending.set(s,{resolve:r,reject:o});const a={id:s,action:e,document:t,cutToolFeatureIds:i.cutToolFeatureIds,includeHistory:i.includeHistory};this.worker.postMessage(a)})}build(e,t={}){return this.request("build",e,t)}exportSTEP(e){return this.request("step",e)}dispose(){this.worker.terminate();for(const e of this.pending.values())e.reject(new Error("CAD kernel closed"));this.pending.clear()}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wl="180",ci={ROTATE:0,DOLLY:1,PAN:2},ys={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Gf=0,Wc=1,Wf=2,Nd=1,Xf=2,ai=3,Ci=0,ln=1,on=2,Zt=0,bs=1,Xc=2,qc=3,Yc=4,Fd=5,oi=100,qf=101,Yf=102,jf=103,Kf=104,Vo=200,Zf=201,$f=202,Jf=203,Go=204,Wo=205,Od=206,Qf=207,kd=208,ep=209,tp=210,np=211,ip=212,sp=213,rp=214,Xo=0,qo=1,Yo=2,Rs=3,jo=4,Ko=5,Zo=6,$o=7,Bd=0,ap=1,op=2,Ai=0,zd=1,Hd=2,Vd=3,Gd=4,Wd=5,Xd=6,qd=7,Yd=300,Cs=301,Ps=302,Jo=303,Qo=304,Ca=306,ir=1e3,Gi=1001,el=1002,Jt=1003,lp=1004,yr=1005,Xn=1006,ja=1007,Wi=1008,Jn=1009,jd=1010,Kd=1011,sr=1012,Xl=1013,ji=1014,qn=1015,pi=1016,ql=1017,Yl=1018,Ds=1020,Zd=35902,$d=35899,Jd=1021,Qd=1022,Rn=1023,rr=1026,Ls=1027,jl=1028,Kl=1029,eu=1030,Zl=1031,$l=1033,Qr=33776,ea=33777,ta=33778,na=33779,tl=35840,nl=35841,il=35842,sl=35843,rl=36196,al=37492,ol=37496,ll=37808,cl=37809,hl=37810,dl=37811,ul=37812,fl=37813,pl=37814,ml=37815,gl=37816,_l=37817,vl=37818,xl=37819,yl=37820,Sl=37821,Ml=36492,bl=36494,El=36495,wl=36283,Tl=36284,Al=36285,Rl=36286,cp=3200,hp=3201,Jl=0,dp=1,Ei="",pn="srgb",Is="srgb-linear",ga="linear",nt="srgb",ns=7680,jc=519,up=512,fp=513,pp=514,tu=515,mp=516,gp=517,_p=518,vp=519,Cl=35044,Kc="300 es",Yn=2e3,_a=2001;class Ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zc=1234567;const er=Math.PI/180,ar=180/Math.PI;function hi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]).toLowerCase()}function Be(n,e,t){return Math.max(e,Math.min(t,n))}function Ql(n,e){return(n%e+e)%e}function xp(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function yp(n,e,t){return n!==e?(t-n)/(e-n):0}function tr(n,e,t){return(1-t)*n+t*e}function Sp(n,e,t,i){return tr(n,e,1-Math.exp(-t*i))}function Mp(n,e=1){return e-Math.abs(Ql(n,e*2)-e)}function bp(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ep(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function wp(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Tp(n,e){return n+Math.random()*(e-n)}function Ap(n){return n*(.5-Math.random())}function Rp(n){n!==void 0&&(Zc=n);let e=Zc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cp(n){return n*er}function Pp(n){return n*ar}function Dp(n){return(n&n-1)===0&&n!==0}function Lp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ip(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Up(n,e,t,i,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),h=o((e+i)/2),d=r((e-i)/2),u=o((e-i)/2),p=r((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":n.set(a*h,l*d,l*u,a*c);break;case"YZY":n.set(l*u,a*h,l*d,a*c);break;case"ZXZ":n.set(l*d,l*u,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*p,a*c);break;case"YXY":n.set(l*p,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Tn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function it(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ec={DEG2RAD:er,RAD2DEG:ar,generateUUID:hi,clamp:Be,euclideanModulo:Ql,mapLinear:xp,inverseLerp:yp,lerp:tr,damp:Sp,pingpong:Mp,smoothstep:bp,smootherstep:Ep,randInt:wp,randFloat:Tp,randFloatSpread:Ap,seededRandom:Rp,degToRad:Cp,radToDeg:Pp,isPowerOfTwo:Dp,ceilPowerOfTwo:Lp,floorPowerOfTwo:Ip,setQuaternionFromProperEuler:Up,normalize:it,denormalize:Tn};class Ie{constructor(e=0,t=0){Ie.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ki{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3];const u=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==u||c!==p||h!==g){let m=1-a;const f=l*u+c*p+h*g+d*_,w=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const R=Math.sqrt(b),T=Math.atan2(R,f*w);m=Math.sin(m*T)/R,a=Math.sin(a*T)/R}const y=a*w;if(l=l*m+u*y,c=c*m+p*y,h=h*m+g*y,d=d*m+_*y,m===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=R,c*=R,h*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*d+l*p-c*u,e[t+1]=l*g+h*u+c*d-a*p,e[t+2]=c*g+h*p+a*u-l*d,e[t+3]=h*g-a*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),d=a(r/2),u=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Be(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($c.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($c.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),h=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*h,this.y=i+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ka.copy(this).projectOnVector(e),this.sub(Ka)}reflect(e){return this.sub(Ka.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ka=new L,$c=new Ki;class He{constructor(e,t,i,s,r,o,a,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],p=i[5],g=i[8],_=s[0],m=s[3],f=s[6],w=s[1],b=s[4],y=s[7],R=s[2],T=s[5],C=s[8];return r[0]=o*_+a*w+l*R,r[3]=o*m+a*b+l*T,r[6]=o*f+a*y+l*C,r[1]=c*_+h*w+d*R,r[4]=c*m+h*b+d*T,r[7]=c*f+h*y+d*C,r[2]=u*_+p*w+g*R,r[5]=u*m+p*b+g*T,r[8]=u*f+p*y+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,p=c*r-o*l,g=t*d+i*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*c-h*i)*_,e[2]=(a*i-s*o)*_,e[3]=u*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Za.makeScale(e,t)),this}rotate(e){return this.premultiply(Za.makeRotation(-e)),this}translate(e,t){return this.premultiply(Za.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Za=new He;function nu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function va(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Np(){const n=va("canvas");return n.style.display="block",n}const Jc={};function or(n){n in Jc||(Jc[n]=!0,console.warn(n))}function Fp(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Qc=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),eh=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Op(){const n={enabled:!0,workingColorSpace:Is,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===nt&&(s.r=di(s.r),s.g=di(s.g),s.b=di(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===nt&&(s.r=Es(s.r),s.g=Es(s.g),s.b=Es(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ei?ga:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return or("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return or("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Is]:{primaries:e,whitePoint:i,transfer:ga,toXYZ:Qc,fromXYZ:eh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:Qc,fromXYZ:eh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}}),n}const je=Op();function di(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Es(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let is;class kp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{is===void 0&&(is=va("canvas")),is.width=e.width,is.height=e.height;const s=is.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=is}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=va("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=di(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(di(t[i]/255)*255):t[i]=di(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Bp=0;class tc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=hi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push($a(s[o].image)):r.push($a(s[o]))}else r=$a(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function $a(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?kp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let zp=0;const Ja=new L;class Qt extends Ji{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,i=Gi,s=Gi,r=Xn,o=Wi,a=Rn,l=Jn,c=Qt.DEFAULT_ANISOTROPY,h=Ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zp++}),this.uuid=hi(),this.name="",this.source=new tc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ie(0,0),this.repeat=new Ie(1,1),this.center=new Ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ja).x}get height(){return this.source.getSize(Ja).y}get depth(){return this.source.getSize(Ja).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ir:e.x=e.x-Math.floor(e.x);break;case Gi:e.x=e.x<0?0:1;break;case el:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ir:e.y=e.y-Math.floor(e.y);break;case Gi:e.y=e.y<0?0:1;break;case el:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Yd;Qt.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,t=0,i=0,s=1){ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,y=(p+1)/2,R=(f+1)/2,T=(h+u)/4,C=(d+_)/4,U=(g+m)/4;return b>y&&b>R?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=T/i,r=C/i):y>R?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=T/s,r=U/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=C/r,s=U/r),this.set(i,s,r,t),this}let w=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(d-_)/w,this.z=(u-h)/w,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this.w=Be(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this.w=Be(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hp extends Ji{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new Qt(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Xn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new tc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Dn extends Hp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class iu extends Qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vp extends Qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,yn):yn.fromBufferAttribute(r,o),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Sr.copy(i.boundingBox)),Sr.applyMatrix4(e.matrixWorld),this.union(Sr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ws),Mr.subVectors(this.max,Ws),ss.subVectors(e.a,Ws),rs.subVectors(e.b,Ws),as.subVectors(e.c,Ws),gi.subVectors(rs,ss),_i.subVectors(as,rs),Ui.subVectors(ss,as);let t=[0,-gi.z,gi.y,0,-_i.z,_i.y,0,-Ui.z,Ui.y,gi.z,0,-gi.x,_i.z,0,-_i.x,Ui.z,0,-Ui.x,-gi.y,gi.x,0,-_i.y,_i.x,0,-Ui.y,Ui.x,0];return!Qa(t,ss,rs,as,Mr)||(t=[1,0,0,0,1,0,0,0,1],!Qa(t,ss,rs,as,Mr))?!1:(br.crossVectors(gi,_i),t=[br.x,br.y,br.z],Qa(t,ss,rs,as,Mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ti=[new L,new L,new L,new L,new L,new L,new L,new L],yn=new L,Sr=new Cn,ss=new L,rs=new L,as=new L,gi=new L,_i=new L,Ui=new L,Ws=new L,Mr=new L,br=new L,Ni=new L;function Qa(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ni.fromArray(n,r);const a=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),l=e.dot(Ni),c=t.dot(Ni),h=i.dot(Ni);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Gp=new Cn,Xs=new L,eo=new L;class Os{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Gp.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xs.subVectors(e,this.center);const t=Xs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Xs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(eo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xs.copy(e.center).add(eo)),this.expandByPoint(Xs.copy(e.center).sub(eo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ni=new L,to=new L,Er=new L,vi=new L,no=new L,wr=new L,io=new L;class Pa{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){to.copy(e).add(t).multiplyScalar(.5),Er.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(to);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Er),a=vi.dot(this.direction),l=-vi.dot(Er),c=vi.lengthSq(),h=Math.abs(1-o*o);let d,u,p,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(to).addScaledVector(Er,u),p}intersectSphere(e,t){ni.subVectors(e.center,this.origin);const i=ni.dot(this.direction),s=ni.dot(ni)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,i,s,r){no.subVectors(t,e),wr.subVectors(i,e),io.crossVectors(no,wr);let o=this.direction.dot(io),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vi.subVectors(this.origin,e);const l=a*this.direction.dot(wr.crossVectors(vi,wr));if(l<0)return null;const c=a*this.direction.dot(no.cross(vi));if(c<0||l+c>o)return null;const h=-a*vi.dot(io);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ft{constructor(e,t,i,s,r,o,a,l,c,h,d,u,p,g,_,m){ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,h,d,u,p,g,_,m)}set(e,t,i,s,r,o,a,l,c,h,d,u,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),r=1/os.setFromMatrixColumn(e,1).length(),o=1/os.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=o*h,p=o*d,g=a*h,_=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=u-_*c,t[9]=-a*l,t[2]=_-u*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*h,p=l*d,g=c*h,_=c*d;t[0]=u+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*h,p=l*d,g=c*h,_=c*d;t[0]=u-_*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*h,p=o*d,g=a*h,_=a*d;t[0]=l*h,t[4]=g*c-p,t[8]=u*c+_,t[1]=l*d,t[5]=_*c+u,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-u*d,t[8]=g*d+p,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*d+g,t[10]=u-_*d}else if(e.order==="XZY"){const u=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+_,t[5]=o*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wp,e,Xp)}lookAt(e,t,i){const s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),xi.crossVectors(i,un),xi.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),xi.crossVectors(i,un)),xi.normalize(),Tr.crossVectors(un,xi),s[0]=xi.x,s[4]=Tr.x,s[8]=un.x,s[1]=xi.y,s[5]=Tr.y,s[9]=un.y,s[2]=xi.z,s[6]=Tr.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],w=i[3],b=i[7],y=i[11],R=i[15],T=s[0],C=s[4],U=s[8],M=s[12],S=s[1],P=s[5],O=s[9],z=s[13],X=s[2],j=s[6],W=s[10],te=s[14],H=s[3],Q=s[7],de=s[11],Se=s[15];return r[0]=o*T+a*S+l*X+c*H,r[4]=o*C+a*P+l*j+c*Q,r[8]=o*U+a*O+l*W+c*de,r[12]=o*M+a*z+l*te+c*Se,r[1]=h*T+d*S+u*X+p*H,r[5]=h*C+d*P+u*j+p*Q,r[9]=h*U+d*O+u*W+p*de,r[13]=h*M+d*z+u*te+p*Se,r[2]=g*T+_*S+m*X+f*H,r[6]=g*C+_*P+m*j+f*Q,r[10]=g*U+_*O+m*W+f*de,r[14]=g*M+_*z+m*te+f*Se,r[3]=w*T+b*S+y*X+R*H,r[7]=w*C+b*P+y*j+R*Q,r[11]=w*U+b*O+y*W+R*de,r[15]=w*M+b*z+y*te+R*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*l*d-s*c*d-r*a*u+i*c*u+s*a*p-i*l*p)+_*(+t*l*p-t*c*u+r*o*u-s*o*p+s*c*h-r*l*h)+m*(+t*c*d-t*a*p-r*o*d+i*o*p+r*a*h-i*c*h)+f*(-s*a*h-t*l*d+t*a*u+s*o*d-i*o*u+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],w=d*m*c-_*u*c+_*l*p-a*m*p-d*l*f+a*u*f,b=g*u*c-h*m*c-g*l*p+o*m*p+h*l*f-o*u*f,y=h*_*c-g*d*c+g*a*p-o*_*p-h*a*f+o*d*f,R=g*d*l-h*_*l-g*a*u+o*_*u+h*a*m-o*d*m,T=t*w+i*b+s*y+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return e[0]=w*C,e[1]=(_*u*r-d*m*r-_*s*p+i*m*p+d*s*f-i*u*f)*C,e[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*f+i*l*f)*C,e[3]=(d*l*r-a*u*r-d*s*c+i*u*c+a*s*p-i*l*p)*C,e[4]=b*C,e[5]=(h*m*r-g*u*r+g*s*p-t*m*p-h*s*f+t*u*f)*C,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*f-t*l*f)*C,e[7]=(o*u*r-h*l*r+h*s*c-t*u*c-o*s*p+t*l*p)*C,e[8]=y*C,e[9]=(g*d*r-h*_*r-g*i*p+t*_*p+h*i*f-t*d*f)*C,e[10]=(o*_*r-g*a*r+g*i*c-t*_*c-o*i*f+t*a*f)*C,e[11]=(h*a*r-o*d*r-h*i*c+t*d*c+o*i*p-t*a*p)*C,e[12]=R*C,e[13]=(h*_*s-g*d*s+g*i*u-t*_*u-h*i*m+t*d*m)*C,e[14]=(g*a*s-o*_*s-g*i*l+t*_*l+o*i*m-t*a*m)*C,e[15]=(o*d*s-h*a*s+h*i*l-t*d*l-o*i*u+t*a*u)*C,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,p=r*h,g=r*d,_=o*h,m=o*d,f=a*d,w=l*c,b=l*h,y=l*d,R=i.x,T=i.y,C=i.z;return s[0]=(1-(_+f))*R,s[1]=(p+y)*R,s[2]=(g-b)*R,s[3]=0,s[4]=(p-y)*T,s[5]=(1-(u+f))*T,s[6]=(m+w)*T,s[7]=0,s[8]=(g+b)*C,s[9]=(m-w)*C,s[10]=(1-(u+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=os.set(s[0],s[1],s[2]).length();const o=os.set(s[4],s[5],s[6]).length(),a=os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Sn.copy(this);const c=1/r,h=1/o,d=1/a;return Sn.elements[0]*=c,Sn.elements[1]*=c,Sn.elements[2]*=c,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=d,Sn.elements[9]*=d,Sn.elements[10]*=d,t.setFromRotationMatrix(Sn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Yn,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===Yn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===_a)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Yn,l=!1){const c=this.elements,h=2/(t-e),d=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===Yn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===_a)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const os=new L,Sn=new ft,Wp=new L(0,0,0),Xp=new L(1,1,1),xi=new L,Tr=new L,un=new L,th=new ft,nh=new Ki;class Qn{constructor(e=0,t=0,i=0,s=Qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Be(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Be(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return th.makeRotationFromQuaternion(e),this.setFromRotationMatrix(th,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nh.setFromEuler(this),this.setFromQuaternion(nh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qn.DEFAULT_ORDER="XYZ";class nc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qp=0;const ih=new L,ls=new Ki,ii=new ft,Ar=new L,qs=new L,Yp=new L,jp=new Ki,sh=new L(1,0,0),rh=new L(0,1,0),ah=new L(0,0,1),oh={type:"added"},Kp={type:"removed"},cs={type:"childadded",child:null},so={type:"childremoved",child:null};class zt extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new L,t=new Qn,i=new Ki,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ft},normalMatrix:{value:new He}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(sh,e)}rotateY(e){return this.rotateOnAxis(rh,e)}rotateZ(e){return this.rotateOnAxis(ah,e)}translateOnAxis(e,t){return ih.copy(e).applyQuaternion(this.quaternion),this.position.add(ih.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sh,e)}translateY(e){return this.translateOnAxis(rh,e)}translateZ(e){return this.translateOnAxis(ah,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ar.copy(e):Ar.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(qs,Ar,this.up):ii.lookAt(Ar,qs,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),ls.setFromRotationMatrix(ii),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(oh),cs.child=e,this.dispatchEvent(cs),cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kp),so.child=e,this.dispatchEvent(so),so.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(oh),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,e,Yp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,jp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}zt.DEFAULT_UP=new L(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new L,si=new L,ro=new L,ri=new L,hs=new L,ds=new L,lh=new L,ao=new L,oo=new L,lo=new L,co=new ht,ho=new ht,uo=new ht;class An{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Mn.subVectors(e,t),s.cross(Mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Mn.subVectors(s,t),si.subVectors(i,t),ro.subVectors(e,t);const o=Mn.dot(Mn),a=Mn.dot(si),l=Mn.dot(ro),c=si.dot(si),h=si.dot(ro),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ri.x),l.addScaledVector(o,ri.y),l.addScaledVector(a,ri.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return co.setScalar(0),ho.setScalar(0),uo.setScalar(0),co.fromBufferAttribute(e,t),ho.fromBufferAttribute(e,i),uo.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(co,r.x),o.addScaledVector(ho,r.y),o.addScaledVector(uo,r.z),o}static isFrontFacing(e,t,i,s){return Mn.subVectors(i,t),si.subVectors(e,t),Mn.cross(si).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Mn.cross(si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return An.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return An.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;hs.subVectors(s,i),ds.subVectors(r,i),ao.subVectors(e,i);const l=hs.dot(ao),c=ds.dot(ao);if(l<=0&&c<=0)return t.copy(i);oo.subVectors(e,s);const h=hs.dot(oo),d=ds.dot(oo);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(hs,o);lo.subVectors(e,r);const p=hs.dot(lo),g=ds.dot(lo);if(g>=0&&p<=g)return t.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(ds,a);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return lh.subVectors(r,s),a=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(lh,a);const f=1/(m+_+u);return o=_*f,a=u*f,t.copy(i).addScaledVector(hs,o).addScaledVector(ds,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function fo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ge{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=je.workingColorSpace){if(e=Ql(e,1),t=Be(t,0,1),i=Be(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=fo(o,r,e+1/3),this.g=fo(o,r,e),this.b=fo(o,r,e-1/3)}return je.colorSpaceToWorking(this,s),this}setStyle(e,t=pn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pn){const i=su[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=Es(e.r),this.g=Es(e.g),this.b=Es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return je.workingToColorSpace(Gt.copy(this),e),Math.round(Be(Gt.r*255,0,255))*65536+Math.round(Be(Gt.g*255,0,255))*256+Math.round(Be(Gt.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Gt.copy(this),t);const i=Gt.r,s=Gt.g,r=Gt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=pn){je.workingToColorSpace(Gt.copy(this),e);const t=Gt.r,i=Gt.g,s=Gt.b;return e!==pn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(yi),this.setHSL(yi.h+e,yi.s+t,yi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(yi),e.getHSL(Rr);const i=tr(yi.h,Rr.h,t),s=tr(yi.s,Rr.s,t),r=tr(yi.l,Rr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new Ge;Ge.NAMES=su;let Zp=0;class Qi extends Ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=hi(),this.name="",this.type="Material",this.blending=bs,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Go,this.blendDst=Wo,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=Rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ns,this.stencilZFail=ns,this.stencilZPass=ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(i.blending=this.blending),this.side!==Ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Go&&(i.blendSrc=this.blendSrc),this.blendDst!==Wo&&(i.blendDst=this.blendDst),this.blendEquation!==oi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Rs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ns&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ns&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ns&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ss extends Qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Bd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new L,Cr=new Ie;let $p=0;class Pn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$p++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Cl,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix3(e),this.setXY(t,Cr.x,Cr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Tn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=it(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),i=it(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),i=it(i,this.array),s=it(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),i=it(i,this.array),s=it(s,this.array),r=it(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Cl&&(e.usage=this.usage),e}}class ru extends Pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class au extends Pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class xt extends Pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Jp=0;const _n=new ft,po=new zt,us=new L,fn=new Cn,Ys=new Cn,Ut=new L;class Xt extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nu(e)?au:ru)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new He().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,i){return _n.makeTranslation(e,t,i),this.applyMatrix4(_n),this}scale(e,t,i){return _n.makeScale(e,t,i),this.applyMatrix4(_n),this}lookAt(e){return po.lookAt(e),po.updateMatrix(),this.applyMatrix4(po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new xt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Ys.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(fn.min,Ys.min),fn.expandByPoint(Ut),Ut.addVectors(fn.max,Ys.max),fn.expandByPoint(Ut)):(fn.expandByPoint(Ys.min),fn.expandByPoint(Ys.max))}fn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ut));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ut.fromBufferAttribute(a,c),l&&(us.fromBufferAttribute(e,c),Ut.add(us)),s=Math.max(s,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<i.count;U++)a[U]=new L,l[U]=new L;const c=new L,h=new L,d=new L,u=new Ie,p=new Ie,g=new Ie,_=new L,m=new L;function f(U,M,S){c.fromBufferAttribute(i,U),h.fromBufferAttribute(i,M),d.fromBufferAttribute(i,S),u.fromBufferAttribute(r,U),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,S),h.sub(c),d.sub(c),p.sub(u),g.sub(u);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),a[U].add(_),a[M].add(_),a[S].add(_),l[U].add(m),l[M].add(m),l[S].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let U=0,M=w.length;U<M;++U){const S=w[U],P=S.start,O=S.count;for(let z=P,X=P+O;z<X;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const b=new L,y=new L,R=new L,T=new L;function C(U){R.fromBufferAttribute(s,U),T.copy(R);const M=a[U];b.copy(M),b.sub(R.multiplyScalar(R.dot(M))).normalize(),y.crossVectors(T,M);const P=y.dot(l[U])<0?-1:1;o.setXYZW(U,b.x,b.y,b.z,P)}for(let U=0,M=w.length;U<M;++U){const S=w[U],P=S.start,O=S.count;for(let z=P,X=P+O;z<X;z+=3)C(e.getX(z+0)),C(e.getX(z+1)),C(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,d=new L;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new Pn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=e(u,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ch=new ft,Fi=new Pa,Pr=new Os,hh=new L,Dr=new L,Lr=new L,Ir=new L,mo=new L,Ur=new L,dh=new L,Nr=new L;class Nt extends zt{constructor(e=new Xt,t=new Ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Ur.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(mo.fromBufferAttribute(d,e),o?Ur.addScaledVector(mo,h):Ur.addScaledVector(mo.sub(t),h))}t.add(Ur)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Pr.copy(i.boundingSphere),Pr.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(Pr.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Pr,hh)===null||Fi.origin.distanceToSquared(hh)>(e.far-e.near)**2))&&(ch.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(ch),!(i.boundingBox!==null&&Fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),b=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=w,R=b;y<R;y+=3){const T=a.getX(y),C=a.getX(y+1),U=a.getX(y+2);s=Fr(this,f,e,i,c,h,d,T,C,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=a.getX(m),b=a.getX(m+1),y=a.getX(m+2);s=Fr(this,o,e,i,c,h,d,w,b,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=w,R=b;y<R;y+=3){const T=y,C=y+1,U=y+2;s=Fr(this,f,e,i,c,h,d,T,C,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=m,b=m+1,y=m+2;s=Fr(this,o,e,i,c,h,d,w,b,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Qp(n,e,t,i,s,r,o,a){let l;if(e.side===ln?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Ci,a),l===null)return null;Nr.copy(a),Nr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Nr);return c<t.near||c>t.far?null:{distance:c,point:Nr.clone(),object:n}}function Fr(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Dr),n.getVertexPosition(l,Lr),n.getVertexPosition(c,Ir);const h=Qp(n,e,t,i,Dr,Lr,Ir,dh);if(h){const d=new L;An.getBarycoord(dh,Dr,Lr,Ir,d),s&&(h.uv=An.getInterpolatedAttribute(s,a,l,c,d,new Ie)),r&&(h.uv1=An.getInterpolatedAttribute(r,a,l,c,d,new Ie)),o&&(h.normal=An.getInterpolatedAttribute(o,a,l,c,d,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new L,materialIndex:0};An.getNormal(Dr,Lr,Ir,u.normal),h.face=u,h.barycoord=d}return h}class ur extends Xt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new xt(c,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(d,2));function g(_,m,f,w,b,y,R,T,C,U,M){const S=y/C,P=R/U,O=y/2,z=R/2,X=T/2,j=C+1,W=U+1;let te=0,H=0;const Q=new L;for(let de=0;de<W;de++){const Se=de*P-z;for(let Oe=0;Oe<j;Oe++){const $e=Oe*S-O;Q[_]=$e*w,Q[m]=Se*b,Q[f]=X,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[m]=0,Q[f]=T>0?1:-1,h.push(Q.x,Q.y,Q.z),d.push(Oe/C),d.push(1-de/U),te+=1}}for(let de=0;de<U;de++)for(let Se=0;Se<C;Se++){const Oe=u+Se+j*de,$e=u+Se+j*(de+1),et=u+(Se+1)+j*(de+1),qe=u+(Se+1)+j*de;l.push(Oe,$e,qe),l.push($e,et,qe),H+=6}a.addGroup(p,H,M),p+=H,u+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ur(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Us(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Kt(n){const e={};for(let t=0;t<n.length;t++){const i=Us(n[t]);for(const s in i)e[s]=i[s]}return e}function em(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ou(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const li={clone:Us,merge:Kt};var tm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wt extends Qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tm,this.fragmentShader=nm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Us(e.uniforms),this.uniformsGroups=em(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class lu extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=Yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new L,uh=new Ie,fh=new Ie;class En extends lu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(er*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,uh,fh),t.subVectors(fh,uh)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(er*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fs=-90,ps=1;class im extends zt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new En(fs,ps,e,t);s.layers=this.layers,this.add(s);const r=new En(fs,ps,e,t);r.layers=this.layers,this.add(r);const o=new En(fs,ps,e,t);o.layers=this.layers,this.add(o);const a=new En(fs,ps,e,t);a.layers=this.layers,this.add(a);const l=new En(fs,ps,e,t);l.layers=this.layers,this.add(l);const c=new En(fs,ps,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Yn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_a)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class cu extends Qt{constructor(e=[],t=Cs,i,s,r,o,a,l,c,h){super(e,t,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sm extends Dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new cu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ur(5,5,5),r=new Wt({name:"CubemapFromEquirect",uniforms:Us(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:Zt});r.uniforms.tEquirect.value=t;const o=new Nt(s,r),a=t.minFilter;return t.minFilter===Wi&&(t.minFilter=Xn),new im(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}class Js extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rm={type:"move"};class go{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Js,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Js,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Js,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(rm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Js;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class am extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class om{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Cl,this.updateRanges=[],this.version=0,this.uuid=hi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jt=new L;class Ti{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Tn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=it(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Tn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Tn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Tn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Tn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),i=it(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),i=it(i,this.array),s=it(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),i=it(i,this.array),s=it(s,this.array),r=it(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Pn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ti(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class lm extends Qt{constructor(e=null,t=1,i=1,s,r,o,a,l,c=Jt,h=Jt,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _o=new L,cm=new L,hm=new He;class Mi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=_o.subVectors(i,t).cross(cm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(_o),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||hm.getNormalMatrix(e),s=this.coplanarPoint(_o).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Oi=new Os,dm=new Ie(.5,.5),Or=new L;class ic{constructor(e=new Mi,t=new Mi,i=new Mi,s=new Mi,r=new Mi,o=new Mi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Yn,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],_=r[9],m=r[10],f=r[11],w=r[12],b=r[13],y=r[14],R=r[15];if(s[0].setComponents(c-o,p-h,f-g,R-w).normalize(),s[1].setComponents(c+o,p+h,f+g,R+w).normalize(),s[2].setComponents(c+a,p+d,f+_,R+b).normalize(),s[3].setComponents(c-a,p-d,f-_,R-b).normalize(),i)s[4].setComponents(l,u,m,y).normalize(),s[5].setComponents(c-l,p-u,f-m,R-y).normalize();else if(s[4].setComponents(c-l,p-u,f-m,R-y).normalize(),t===Yn)s[5].setComponents(c+l,p+u,f+m,R+y).normalize();else if(t===_a)s[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(e){Oi.center.set(0,0,0);const t=dm.distanceTo(e.center);return Oi.radius=.7071067811865476+t,Oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Or.x=s.normal.x>0?e.max.x:e.min.x,Or.y=s.normal.y>0?e.max.y:e.min.y,Or.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Or)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class sc extends Qi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const xa=new L,ya=new L,ph=new ft,js=new Pa,kr=new Os,vo=new L,mh=new L;class um extends zt{constructor(e=new Xt,t=new sc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)xa.fromBufferAttribute(t,s-1),ya.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=xa.distanceTo(ya);e.setAttribute("lineDistance",new xt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),kr.copy(i.boundingSphere),kr.applyMatrix4(s),kr.radius+=r,e.ray.intersectsSphere(kr)===!1)return;ph.copy(s).invert(),js.copy(e.ray).applyMatrix4(ph);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const f=h.getX(_),w=h.getX(_+1),b=Br(this,e,js,l,f,w,_);b&&t.push(b)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),f=Br(this,e,js,l,_,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const f=Br(this,e,js,l,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=Br(this,e,js,l,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Br(n,e,t,i,s,r,o){const a=n.geometry.attributes.position;if(xa.fromBufferAttribute(a,s),ya.fromBufferAttribute(a,r),t.distanceSqToSegment(xa,ya,vo,mh)>i)return;vo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(vo);if(!(c<e.near||c>e.far))return{distance:c,point:mh.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const gh=new L,_h=new L;class Sa extends um{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)gh.fromBufferAttribute(t,s),_h.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+gh.distanceTo(_h);e.setAttribute("lineDistance",new xt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rc extends Qt{constructor(e,t,i=ji,s,r,o,a=Jt,l=Jt,c,h=rr,d=1){if(h!==rr&&h!==Ls)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new tc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class hu extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Da extends Xt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,d=e/a,u=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const w=f*u-o;for(let b=0;b<c;b++){const y=b*d-r;g.push(y,-w,0),_.push(0,0,1),m.push(b/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<a;w++){const b=w+c*f,y=w+c*(f+1),R=w+1+c*(f+1),T=w+1+c*f;p.push(b,y,T),p.push(y,R,T)}this.setIndex(p),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Da(e.width,e.height,e.widthSegments,e.heightSegments)}}class ac extends Xt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new L,u=new L,p=[],g=[],_=[],m=[];for(let f=0;f<=i;f++){const w=[],b=f/i;let y=0;f===0&&o===0?y=.5/t:f===i&&l===Math.PI&&(y=-.5/t);for(let R=0;R<=t;R++){const T=R/t;d.x=-e*Math.cos(s+T*r)*Math.sin(o+b*a),d.y=e*Math.cos(o+b*a),d.z=e*Math.sin(s+T*r)*Math.sin(o+b*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(T+y,1-b),w.push(c++)}h.push(w)}for(let f=0;f<i;f++)for(let w=0;w<t;w++){const b=h[f][w+1],y=h[f][w],R=h[f+1][w],T=h[f+1][w+1];(f!==0||o>0)&&p.push(b,y,T),(f!==i-1||l<Math.PI)&&p.push(y,R,T)}this.setIndex(p),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class fm extends Xt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],i=new Set,s=new L,r=new L;if(e.index!==null){const o=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const d=l[c],u=d.start,p=d.count;for(let g=u,_=u+p;g<_;g+=3)for(let m=0;m<3;m++){const f=a.getX(g+m),w=a.getX(g+(m+1)%3);s.fromBufferAttribute(o,f),r.fromBufferAttribute(o,w),vh(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{const o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,d=3*a+(c+1)%3;s.fromBufferAttribute(o,h),r.fromBufferAttribute(o,d),vh(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new xt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function vh(n,e,t){const i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}class pm extends Wt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mm extends Qi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jl,this.normalScale=new Ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gm extends Qi{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jl,this.normalScale=new Ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class _m extends Qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vm extends Qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class du extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const xo=new ft,xh=new L,yh=new L;class xm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ie(512,512),this.mapType=Jn,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ic,this._frameExtents=new Ie(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;xh.setFromMatrixPosition(e.matrixWorld),t.position.copy(xh),yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yh),t.updateMatrixWorld(),xo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class La extends lu{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ym extends xm{constructor(){super(new La(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Sh extends du{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new ym}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Sm extends du{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Mm extends Xt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class bm extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Em{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class Pl extends om{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}const Mh=new ft;class wm{constructor(e,t,i=0,s=1/0){this.ray=new Pa(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new nc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Mh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Mh),this}intersectObject(e,t=!0,i=[]){return Dl(e,this,i,t),i.sort(bh),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Dl(e[s],this,i,t);return i.sort(bh),i}}function bh(n,e){return n.distance-e.distance}function Dl(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Dl(r[o],e,t,!0)}}class Eh{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Be(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Be(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const wh=new L,zr=new L,ms=new L,gs=new L,yo=new L,Tm=new L,Am=new L;class Rm{constructor(e=new L,t=new L){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){wh.subVectors(e,this.start),zr.subVectors(this.end,this.start);const i=zr.dot(zr);let r=zr.dot(wh)/i;return t&&(r=Be(r,0,1)),r}closestPointToPoint(e,t,i){const s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=Tm,i=Am){const s=10000000000000001e-32;let r,o;const a=this.start,l=e.start,c=this.end,h=e.end;ms.subVectors(c,a),gs.subVectors(h,l),yo.subVectors(a,l);const d=ms.dot(ms),u=gs.dot(gs),p=gs.dot(yo);if(d<=s&&u<=s)return t.copy(a),i.copy(l),t.sub(i),t.dot(t);if(d<=s)r=0,o=p/u,o=Be(o,0,1);else{const g=ms.dot(yo);if(u<=s)o=0,r=Be(-g/d,0,1);else{const _=ms.dot(gs),m=d*u-_*_;m!==0?r=Be((_*p-g*u)/m,0,1):r=0,o=(_*r+p)/u,o<0?(o=0,r=Be(-g/d,0,1)):o>1&&(o=1,r=Be((_-g)/d,0,1))}}return t.copy(a).add(ms.multiplyScalar(r)),i.copy(l).add(gs.multiplyScalar(o)),t.sub(i),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class Cm extends Sa{constructor(e=10,t=10,i=4473924,s=8947848){i=new Ge(i),s=new Ge(s);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let u=0,p=0,g=-a;u<=t;u++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=u===r?i:s;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}const h=new Xt;h.setAttribute("position",new xt(l,3)),h.setAttribute("color",new xt(c,3));const d=new sc({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Pm extends Sa{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new Xt;s.setAttribute("position",new xt(t,3)),s.setAttribute("color",new xt(i,3));const r=new sc({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(e,t,i){const s=new Ge,r=this.geometry.attributes.color.array;return s.set(e),s.toArray(r,0),s.toArray(r,3),s.set(t),s.toArray(r,6),s.toArray(r,9),s.set(i),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Dm extends Ji{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Th(n,e,t,i){const s=Lm(i);switch(t){case Jd:return n*e;case jl:return n*e/s.components*s.byteLength;case Kl:return n*e/s.components*s.byteLength;case eu:return n*e*2/s.components*s.byteLength;case Zl:return n*e*2/s.components*s.byteLength;case Qd:return n*e*3/s.components*s.byteLength;case Rn:return n*e*4/s.components*s.byteLength;case $l:return n*e*4/s.components*s.byteLength;case Qr:case ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ta:case na:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case nl:case sl:return Math.max(n,16)*Math.max(e,8)/4;case tl:case il:return Math.max(n,8)*Math.max(e,8)/2;case rl:case al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ol:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case cl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case hl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case dl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ul:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case fl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case pl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ml:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case gl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case _l:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case vl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case xl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case yl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ml:case bl:case El:return Math.ceil(n/4)*Math.ceil(e/4)*16;case wl:case Tl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Al:case Rl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lm(n){switch(n){case Jn:case jd:return{byteLength:1,components:1};case sr:case Kd:case pi:return{byteLength:2,components:1};case ql:case Yl:return{byteLength:2,components:4};case ji:case Xl:case qn:return{byteLength:4,components:1};case Zd:case $d:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function uu(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Im(n){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const h=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Um=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Om=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,km=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Gm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ym=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,eg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ng=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ig=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ag=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,og=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hg="gl_FragColor = linearToOutputTexel( gl_FragColor );",dg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ug=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,fg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_g=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Mg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Eg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Tg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ag=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Lg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ig=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ug=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ng=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Og=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$g=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,n_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,i_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,s_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,o_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,l_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,c_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,h_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,d_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,u_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,g_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,__=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,v_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,x_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,S_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,M_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,b_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,T_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,A_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,R_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,C_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,D_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,L_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const I_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,z_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,H_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,V_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,G_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,q_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Y_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,j_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,J_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ev=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,av=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ov=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:Um,alphahash_pars_fragment:Nm,alphamap_fragment:Fm,alphamap_pars_fragment:Om,alphatest_fragment:km,alphatest_pars_fragment:Bm,aomap_fragment:zm,aomap_pars_fragment:Hm,batching_pars_vertex:Vm,batching_vertex:Gm,begin_vertex:Wm,beginnormal_vertex:Xm,bsdfs:qm,iridescence_fragment:Ym,bumpmap_pars_fragment:jm,clipping_planes_fragment:Km,clipping_planes_pars_fragment:Zm,clipping_planes_pars_vertex:$m,clipping_planes_vertex:Jm,color_fragment:Qm,color_pars_fragment:eg,color_pars_vertex:tg,color_vertex:ng,common:ig,cube_uv_reflection_fragment:sg,defaultnormal_vertex:rg,displacementmap_pars_vertex:ag,displacementmap_vertex:og,emissivemap_fragment:lg,emissivemap_pars_fragment:cg,colorspace_fragment:hg,colorspace_pars_fragment:dg,envmap_fragment:ug,envmap_common_pars_fragment:fg,envmap_pars_fragment:pg,envmap_pars_vertex:mg,envmap_physical_pars_fragment:Tg,envmap_vertex:gg,fog_vertex:_g,fog_pars_vertex:vg,fog_fragment:xg,fog_pars_fragment:yg,gradientmap_pars_fragment:Sg,lightmap_pars_fragment:Mg,lights_lambert_fragment:bg,lights_lambert_pars_fragment:Eg,lights_pars_begin:wg,lights_toon_fragment:Ag,lights_toon_pars_fragment:Rg,lights_phong_fragment:Cg,lights_phong_pars_fragment:Pg,lights_physical_fragment:Dg,lights_physical_pars_fragment:Lg,lights_fragment_begin:Ig,lights_fragment_maps:Ug,lights_fragment_end:Ng,logdepthbuf_fragment:Fg,logdepthbuf_pars_fragment:Og,logdepthbuf_pars_vertex:kg,logdepthbuf_vertex:Bg,map_fragment:zg,map_pars_fragment:Hg,map_particle_fragment:Vg,map_particle_pars_fragment:Gg,metalnessmap_fragment:Wg,metalnessmap_pars_fragment:Xg,morphinstance_vertex:qg,morphcolor_vertex:Yg,morphnormal_vertex:jg,morphtarget_pars_vertex:Kg,morphtarget_vertex:Zg,normal_fragment_begin:$g,normal_fragment_maps:Jg,normal_pars_fragment:Qg,normal_pars_vertex:e_,normal_vertex:t_,normalmap_pars_fragment:n_,clearcoat_normal_fragment_begin:i_,clearcoat_normal_fragment_maps:s_,clearcoat_pars_fragment:r_,iridescence_pars_fragment:a_,opaque_fragment:o_,packing:l_,premultiplied_alpha_fragment:c_,project_vertex:h_,dithering_fragment:d_,dithering_pars_fragment:u_,roughnessmap_fragment:f_,roughnessmap_pars_fragment:p_,shadowmap_pars_fragment:m_,shadowmap_pars_vertex:g_,shadowmap_vertex:__,shadowmask_pars_fragment:v_,skinbase_vertex:x_,skinning_pars_vertex:y_,skinning_vertex:S_,skinnormal_vertex:M_,specularmap_fragment:b_,specularmap_pars_fragment:E_,tonemapping_fragment:w_,tonemapping_pars_fragment:T_,transmission_fragment:A_,transmission_pars_fragment:R_,uv_pars_fragment:C_,uv_pars_vertex:P_,uv_vertex:D_,worldpos_vertex:L_,background_vert:I_,background_frag:U_,backgroundCube_vert:N_,backgroundCube_frag:F_,cube_vert:O_,cube_frag:k_,depth_vert:B_,depth_frag:z_,distanceRGBA_vert:H_,distanceRGBA_frag:V_,equirect_vert:G_,equirect_frag:W_,linedashed_vert:X_,linedashed_frag:q_,meshbasic_vert:Y_,meshbasic_frag:j_,meshlambert_vert:K_,meshlambert_frag:Z_,meshmatcap_vert:$_,meshmatcap_frag:J_,meshnormal_vert:Q_,meshnormal_frag:ev,meshphong_vert:tv,meshphong_frag:nv,meshphysical_vert:iv,meshphysical_frag:sv,meshtoon_vert:rv,meshtoon_frag:av,points_vert:ov,points_frag:lv,shadow_vert:cv,shadow_frag:hv,sprite_vert:dv,sprite_frag:uv},he={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new Ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},an={basic:{uniforms:Kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Kt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Kt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Kt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Kt([he.points,he.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Kt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Kt([he.common,he.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Kt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Kt([he.sprite,he.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Kt([he.common,he.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Kt([he.lights,he.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};an.physical={uniforms:Kt([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Hr={r:0,b:0,g:0},ki=new Qn,fv=new ft;function pv(n,e,t,i,s,r,o){const a=new Ge(0);let l=r===!0?0:1,c,h,d=null,u=0,p=null;function g(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?t:e).get(y)),y}function _(b){let y=!1;const R=g(b);R===null?f(a,l):R&&R.isColor&&(f(R,1),y=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,y){const R=g(y);R&&(R.isCubeTexture||R.mapping===Ca)?(h===void 0&&(h=new Nt(new ur(1,1,1),new Wt({name:"BackgroundCubeMaterial",uniforms:Us(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ki.copy(y.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(fv.makeRotationFromEuler(ki)),h.material.toneMapped=je.getTransfer(R.colorSpace)!==nt,(d!==R||u!==R.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,d=R,u=R.version,p=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Nt(new Da(2,2),new Wt({name:"BackgroundMaterial",uniforms:Us(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=je.getTransfer(R.colorSpace)!==nt,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||u!==R.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=R,u=R.version,p=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function f(b,y){b.getRGB(Hr,ou(n)),i.buffers.color.setClear(Hr.r,Hr.g,Hr.b,y,o)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,y=1){a.set(b),l=y,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,f(a,l)},render:_,addToRenderList:m,dispose:w}}function mv(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,o=!1;function a(S,P,O,z,X){let j=!1;const W=d(z,O,P);r!==W&&(r=W,c(r.object)),j=p(S,z,O,X),j&&g(S,z,O,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,y(S,P,O,z),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function h(S){return n.deleteVertexArray(S)}function d(S,P,O){const z=O.wireframe===!0;let X=i[S.id];X===void 0&&(X={},i[S.id]=X);let j=X[P.id];j===void 0&&(j={},X[P.id]=j);let W=j[z];return W===void 0&&(W=u(l()),j[z]=W),W}function u(S){const P=[],O=[],z=[];for(let X=0;X<t;X++)P[X]=0,O[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:z,object:S,attributes:{},index:null}}function p(S,P,O,z){const X=r.attributes,j=P.attributes;let W=0;const te=O.getAttributes();for(const H in te)if(te[H].location>=0){const de=X[H];let Se=j[H];if(Se===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(Se=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(Se=S.instanceColor)),de===void 0||de.attribute!==Se||Se&&de.data!==Se.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function g(S,P,O,z){const X={},j=P.attributes;let W=0;const te=O.getAttributes();for(const H in te)if(te[H].location>=0){let de=j[H];de===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(de=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(de=S.instanceColor));const Se={};Se.attribute=de,de&&de.data&&(Se.data=de.data),X[H]=Se,W++}r.attributes=X,r.attributesNum=W,r.index=z}function _(){const S=r.newAttributes;for(let P=0,O=S.length;P<O;P++)S[P]=0}function m(S){f(S,0)}function f(S,P){const O=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;O[S]=1,z[S]===0&&(n.enableVertexAttribArray(S),z[S]=1),X[S]!==P&&(n.vertexAttribDivisor(S,P),X[S]=P)}function w(){const S=r.newAttributes,P=r.enabledAttributes;for(let O=0,z=P.length;O<z;O++)P[O]!==S[O]&&(n.disableVertexAttribArray(O),P[O]=0)}function b(S,P,O,z,X,j,W){W===!0?n.vertexAttribIPointer(S,P,O,X,j):n.vertexAttribPointer(S,P,O,z,X,j)}function y(S,P,O,z){_();const X=z.attributes,j=O.getAttributes(),W=P.defaultAttributeValues;for(const te in j){const H=j[te];if(H.location>=0){let Q=X[te];if(Q===void 0&&(te==="instanceMatrix"&&S.instanceMatrix&&(Q=S.instanceMatrix),te==="instanceColor"&&S.instanceColor&&(Q=S.instanceColor)),Q!==void 0){const de=Q.normalized,Se=Q.itemSize,Oe=e.get(Q);if(Oe===void 0)continue;const $e=Oe.buffer,et=Oe.type,qe=Oe.bytesPerElement,Y=et===n.INT||et===n.UNSIGNED_INT||Q.gpuType===Xl;if(Q.isInterleavedBufferAttribute){const Z=Q.data,pe=Z.stride,Ae=Q.offset;if(Z.isInstancedInterleavedBuffer){for(let ge=0;ge<H.locationSize;ge++)f(H.location+ge,Z.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ge=0;ge<H.locationSize;ge++)m(H.location+ge);n.bindBuffer(n.ARRAY_BUFFER,$e);for(let ge=0;ge<H.locationSize;ge++)b(H.location+ge,Se/H.locationSize,et,de,pe*qe,(Ae+Se/H.locationSize*ge)*qe,Y)}else{if(Q.isInstancedBufferAttribute){for(let Z=0;Z<H.locationSize;Z++)f(H.location+Z,Q.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Z=0;Z<H.locationSize;Z++)m(H.location+Z);n.bindBuffer(n.ARRAY_BUFFER,$e);for(let Z=0;Z<H.locationSize;Z++)b(H.location+Z,Se/H.locationSize,et,de,Se*qe,Se/H.locationSize*Z*qe,Y)}}else if(W!==void 0){const de=W[te];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(H.location,de);break;case 3:n.vertexAttrib3fv(H.location,de);break;case 4:n.vertexAttrib4fv(H.location,de);break;default:n.vertexAttrib1fv(H.location,de)}}}}w()}function R(){U();for(const S in i){const P=i[S];for(const O in P){const z=P[O];for(const X in z)h(z[X].object),delete z[X];delete P[O]}delete i[S]}}function T(S){if(i[S.id]===void 0)return;const P=i[S.id];for(const O in P){const z=P[O];for(const X in z)h(z[X].object),delete z[X];delete P[O]}delete i[S.id]}function C(S){for(const P in i){const O=i[P];if(O[S.id]===void 0)continue;const z=O[S.id];for(const X in z)h(z[X].object),delete z[X];delete O[S.id]}}function U(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:M,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function gv(n,e,t){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),t.update(h,i,d))}function a(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];t.update(p,i,1)}function l(c,h,d,u){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _v(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==Rn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const U=C===pi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Jn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==qn&&!U)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:R,maxSamples:T}}function vv(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Mi,a=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||s;return s=u,i=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const w=r?0:i,b=w*4;let y=f.clippingState||null;l.value=y,y=h(g,u,b,p);for(let R=0;R!==b;++R)y[R]=t[R];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,w=u.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,y=p;b!==_;++b,y+=4)o.copy(d[b]).applyMatrix4(w,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function xv(n){let e=new WeakMap;function t(o,a){return a===Jo?o.mapping=Cs:a===Qo&&(o.mapping=Ps),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Jo||a===Qo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new sm(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Ms=4,Ah=[.125,.215,.35,.446,.526,.582],Vi=20,So=new La,Rh=new Ge;let Mo=null,bo=0,Eo=0,wo=!1;const zi=(1+Math.sqrt(5))/2,_s=1/zi,Ch=[new L(-zi,_s,0),new L(zi,_s,0),new L(-_s,0,zi),new L(_s,0,zi),new L(0,zi,-_s),new L(0,zi,_s),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],yv=new L;class Ph{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=yv}=r;Mo=this._renderer.getRenderTarget(),bo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Mo,bo,Eo),this._renderer.xr.enabled=wo,e.scissorTest=!1,Vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Cs||e.mapping===Ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Mo=this._renderer.getRenderTarget(),bo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Xn,minFilter:Xn,generateMipmaps:!1,type:pi,format:Rn,colorSpace:Is,depthBuffer:!1},s=Dh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dh(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sv(r)),this._blurMaterial=Mv(r,e,t)}return s}_compileMaterial(e){const t=new Nt(this._lodPlanes[0],e);this._renderer.compile(t,So)}_sceneToCubeUV(e,t,i,s,r){const l=new En(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Rh),d.toneMapping=Ai,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const _=new Ss({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),m=new Nt(new ur,_);let f=!1;const w=e.background;w?w.isColor&&(_.color.copy(w),e.background=null,f=!0):(_.color.copy(Rh),f=!0);for(let b=0;b<6;b++){const y=b%3;y===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):y===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));const R=this._cubeSize;Vr(s,y*R,b>2?R:0,R,R),d.setRenderTarget(s),f&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=u,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Cs||e.mapping===Ps;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Nt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Vr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,So)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ch[(s-r-1)%Ch.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Nt(this._lodPlanes[s],c),u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Vi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Vi;m>Vi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vi}`);const f=[];let w=0;for(let C=0;C<Vi;++C){const U=C/_,M=Math.exp(-U*U/2);f.push(M),C===0?w+=M:C<m&&(w+=2*M)}for(let C=0;C<f.length;C++)f[C]=f[C]/w;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-i;const y=this._sizeLods[s],R=3*y*(s>b-Ms?s-b+Ms:0),T=4*(this._cubeSize-y);Vr(t,R,T,3*y,2*y),l.setRenderTarget(t),l.render(d,So)}}function Sv(n){const e=[],t=[],i=[];let s=n;const r=n-Ms+1+Ah.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-Ms?l=Ah[o-n+Ms-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,_=3,m=2,f=1,w=new Float32Array(_*g*p),b=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let T=0;T<p;T++){const C=T%3*2/3-1,U=T>2?0:-1,M=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];w.set(M,_*g*T),b.set(u,m*g*T);const S=[T,T,T,T,T,T];y.set(S,f*g*T)}const R=new Xt;R.setAttribute("position",new Pn(w,_)),R.setAttribute("uv",new Pn(b,m)),R.setAttribute("faceIndex",new Pn(y,f)),e.push(R),s>Ms&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Dh(n,e,t){const i=new Dn(n,e,t);return i.texture.mapping=Ca,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Vr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Mv(n,e,t){const i=new Float32Array(Vi),s=new L(0,1,0);return new Wt({name:"SphericalGaussianBlur",defines:{n:Vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zt,depthTest:!1,depthWrite:!1})}function Lh(){return new Wt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zt,depthTest:!1,depthWrite:!1})}function Ih(){return new Wt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zt,depthTest:!1,depthWrite:!1})}function oc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bv(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Jo||l===Qo,h=l===Cs||l===Ps;if(c||h){let d=e.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Ph(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Ph(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Ev(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&or("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function wv(n,e,t,i){const s={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const w=p.array;_=p.version;for(let b=0,y=w.length;b<y;b+=3){const R=w[b+0],T=w[b+1],C=w[b+2];u.push(R,T,T,C,C,R)}}else if(g!==void 0){const w=g.array;_=g.version;for(let b=0,y=w.length/3-1;b<y;b+=3){const R=b+0,T=b+1,C=b+2;u.push(R,T,T,C,C,R)}}else return;const m=new(nu(u)?au:ru)(u,1);m.version=_;const f=r.get(d);f&&e.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Tv(n,e,t){let i;function s(u){i=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,p){n.drawElements(i,p,r,u*o),t.update(p,i,1)}function c(u,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,u*o,g),t.update(p,i,g))}function h(u,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,i,1)}function d(u,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,u,0,_,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*_[w];t.update(f,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Av(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Rv(n,e,t){const i=new WeakMap,s=new ht;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(a);if(u===void 0||u.count!==d){let M=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let b=0;p===!0&&(b=1),g===!0&&(b=2),_===!0&&(b=3);let y=a.attributes.position.count*b,R=1;y>e.maxTextureSize&&(R=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const T=new Float32Array(y*R*4*d),C=new iu(T,y,R,d);C.type=qn,C.needsUpdate=!0;const U=b*4;for(let S=0;S<d;S++){const P=m[S],O=f[S],z=w[S],X=y*R*4*S;for(let j=0;j<P.count;j++){const W=j*U;p===!0&&(s.fromBufferAttribute(P,j),T[X+W+0]=s.x,T[X+W+1]=s.y,T[X+W+2]=s.z,T[X+W+3]=0),g===!0&&(s.fromBufferAttribute(O,j),T[X+W+4]=s.x,T[X+W+5]=s.y,T[X+W+6]=s.z,T[X+W+7]=0),_===!0&&(s.fromBufferAttribute(z,j),T[X+W+8]=s.x,T[X+W+9]=s.y,T[X+W+10]=s.z,T[X+W+11]=z.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new Ie(y,R)},i.set(a,u),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];const g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Cv(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const fu=new Qt,Uh=new rc(1,1),pu=new iu,mu=new Vp,gu=new cu,Nh=[],Fh=[],Oh=new Float32Array(16),kh=new Float32Array(9),Bh=new Float32Array(4);function ks(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Nh[s];if(r===void 0&&(r=new Float32Array(s),Nh[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ia(n,e){let t=Fh[e];t===void 0&&(t=new Int32Array(e),Fh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Pv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Dv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function Lv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function Iv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function Uv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;Bh.set(i),n.uniformMatrix2fv(this.addr,!1,Bh),It(t,i)}}function Nv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;kh.set(i),n.uniformMatrix3fv(this.addr,!1,kh),It(t,i)}}function Fv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;Oh.set(i),n.uniformMatrix4fv(this.addr,!1,Oh),It(t,i)}}function Ov(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function kv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function Bv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function zv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function Hv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Vv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function Gv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function Wv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function Xv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Uh.compareFunction=tu,r=Uh):r=fu,t.setTexture2D(e||r,s)}function qv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||mu,s)}function Yv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||gu,s)}function jv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||pu,s)}function Kv(n){switch(n){case 5126:return Pv;case 35664:return Dv;case 35665:return Lv;case 35666:return Iv;case 35674:return Uv;case 35675:return Nv;case 35676:return Fv;case 5124:case 35670:return Ov;case 35667:case 35671:return kv;case 35668:case 35672:return Bv;case 35669:case 35673:return zv;case 5125:return Hv;case 36294:return Vv;case 36295:return Gv;case 36296:return Wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Xv;case 35679:case 36299:case 36307:return qv;case 35680:case 36300:case 36308:case 36293:return Yv;case 36289:case 36303:case 36311:case 36292:return jv}}function Zv(n,e){n.uniform1fv(this.addr,e)}function $v(n,e){const t=ks(e,this.size,2);n.uniform2fv(this.addr,t)}function Jv(n,e){const t=ks(e,this.size,3);n.uniform3fv(this.addr,t)}function Qv(n,e){const t=ks(e,this.size,4);n.uniform4fv(this.addr,t)}function ex(n,e){const t=ks(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function tx(n,e){const t=ks(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function nx(n,e){const t=ks(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ix(n,e){n.uniform1iv(this.addr,e)}function sx(n,e){n.uniform2iv(this.addr,e)}function rx(n,e){n.uniform3iv(this.addr,e)}function ax(n,e){n.uniform4iv(this.addr,e)}function ox(n,e){n.uniform1uiv(this.addr,e)}function lx(n,e){n.uniform2uiv(this.addr,e)}function cx(n,e){n.uniform3uiv(this.addr,e)}function hx(n,e){n.uniform4uiv(this.addr,e)}function dx(n,e,t){const i=this.cache,s=e.length,r=Ia(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),It(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||fu,r[o])}function ux(n,e,t){const i=this.cache,s=e.length,r=Ia(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),It(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||mu,r[o])}function fx(n,e,t){const i=this.cache,s=e.length,r=Ia(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),It(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||gu,r[o])}function px(n,e,t){const i=this.cache,s=e.length,r=Ia(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),It(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||pu,r[o])}function mx(n){switch(n){case 5126:return Zv;case 35664:return $v;case 35665:return Jv;case 35666:return Qv;case 35674:return ex;case 35675:return tx;case 35676:return nx;case 5124:case 35670:return ix;case 35667:case 35671:return sx;case 35668:case 35672:return rx;case 35669:case 35673:return ax;case 5125:return ox;case 36294:return lx;case 36295:return cx;case 36296:return hx;case 35678:case 36198:case 36298:case 36306:case 35682:return dx;case 35679:case 36299:case 36307:return ux;case 35680:case 36300:case 36308:case 36293:return fx;case 36289:case 36303:case 36311:case 36292:return px}}class gx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Kv(t.type)}}class _x{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mx(t.type)}}class vx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const To=/(\w+)(\])?(\[|\.)?/g;function zh(n,e){n.seq.push(e),n.map[e.id]=e}function xx(n,e,t){const i=n.name,s=i.length;for(To.lastIndex=0;;){const r=To.exec(i),o=To.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){zh(t,c===void 0?new gx(a,n,e):new _x(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new vx(a),zh(t,d)),t=d}}}class ia{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);xx(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Hh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const yx=37297;let Sx=0;function Mx(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Vh=new He;function bx(n){je._getMatrix(Vh,je.workingColorSpace,n);const e=`mat3( ${Vh.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case ga:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Gh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Mx(n.getShaderSource(e),a)}else return r}function Ex(n,e){const t=bx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function wx(n,e){let t;switch(e){case zd:t="Linear";break;case Hd:t="Reinhard";break;case Vd:t="Cineon";break;case Gd:t="ACESFilmic";break;case Xd:t="AgX";break;case qd:t="Neutral";break;case Wd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Gr=new L;function Tx(){je.getLuminanceCoefficients(Gr);const n=Gr.x.toFixed(4),e=Gr.y.toFixed(4),t=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ax(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qs).join(`
`)}function Rx(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Cx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Qs(n){return n!==""}function Wh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Px=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ll(n){return n.replace(Px,Lx)}const Dx=new Map;function Lx(n,e){let t=Ve[e];if(t===void 0){const i=Dx.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ll(t)}const Ix=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qh(n){return n.replace(Ix,Ux)}function Ux(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Nx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Nd?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Xf?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ai&&(e="SHADOWMAP_TYPE_VSM"),e}function Fx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Cs:case Ps:e="ENVMAP_TYPE_CUBE";break;case Ca:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ox(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ps:e="ENVMAP_MODE_REFRACTION";break}return e}function kx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Bd:e="ENVMAP_BLENDING_MULTIPLY";break;case ap:e="ENVMAP_BLENDING_MIX";break;case op:e="ENVMAP_BLENDING_ADD";break}return e}function Bx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function zx(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Nx(t),c=Fx(t),h=Ox(t),d=kx(t),u=Bx(t),p=Ax(t),g=Rx(r),_=s.createProgram();let m,f,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qs).join(`
`),f.length>0&&(f+=`
`)):(m=[Yh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qs).join(`
`),f=[Yh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Ai?wx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Ex("linearToOutputTexel",t.outputColorSpace),Tx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qs).join(`
`)),o=Ll(o),o=Wh(o,t),o=Xh(o,t),a=Ll(a),a=Wh(a,t),a=Xh(a,t),o=qh(o),a=qh(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Kc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Kc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=w+m+o,y=w+f+a,R=Hh(s,s.VERTEX_SHADER,b),T=Hh(s,s.FRAGMENT_SHADER,y);s.attachShader(_,R),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(n.debug.checkShaderErrors){const O=s.getProgramInfoLog(_)||"",z=s.getShaderInfoLog(R)||"",X=s.getShaderInfoLog(T)||"",j=O.trim(),W=z.trim(),te=X.trim();let H=!0,Q=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,R,T);else{const de=Gh(s,R,"vertex"),Se=Gh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+j+`
`+de+`
`+Se)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(W===""||te==="")&&(Q=!1);Q&&(P.diagnostics={runnable:H,programLog:j,vertexShader:{log:W,prefix:m},fragmentShader:{log:te,prefix:f}})}s.deleteShader(R),s.deleteShader(T),U=new ia(s,_),M=Cx(s,_)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,yx)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sx++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=T,this}let Hx=0;class Vx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Gx(e),t.set(e,i)),i}}class Gx{constructor(e){this.id=Hx++,this.code=e,this.usedTimes=0}}function Wx(n,e,t,i,s,r,o){const a=new nc,l=new Vx,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,S,P,O,z){const X=O.fog,j=z.geometry,W=M.isMeshStandardMaterial?O.environment:null,te=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),H=te&&te.mapping===Ca?te.image.height:null,Q=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const de=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Se=de!==void 0?de.length:0;let Oe=0;j.morphAttributes.position!==void 0&&(Oe=1),j.morphAttributes.normal!==void 0&&(Oe=2),j.morphAttributes.color!==void 0&&(Oe=3);let $e,et,qe,Y;if(Q){const Qe=an[Q];$e=Qe.vertexShader,et=Qe.fragmentShader}else $e=M.vertexShader,et=M.fragmentShader,l.update(M),qe=l.getVertexShaderID(M),Y=l.getFragmentShaderID(M);const Z=n.getRenderTarget(),pe=n.state.buffers.depth.getReversed(),Ae=z.isInstancedMesh===!0,ge=z.isBatchedMesh===!0,We=!!M.map,wt=!!M.matcap,A=!!te,st=!!M.aoMap,Fe=!!M.lightMap,Ce=!!M.bumpMap,ve=!!M.normalMap,rt=!!M.displacementMap,xe=!!M.emissiveMap,ke=!!M.metalnessMap,Mt=!!M.roughnessMap,pt=M.anisotropy>0,E=M.clearcoat>0,v=M.dispersion>0,F=M.iridescence>0,G=M.sheen>0,$=M.transmission>0,V=pt&&!!M.anisotropyMap,Me=E&&!!M.clearcoatMap,se=E&&!!M.clearcoatNormalMap,_e=E&&!!M.clearcoatRoughnessMap,we=F&&!!M.iridescenceMap,ne=F&&!!M.iridescenceThicknessMap,ue=G&&!!M.sheenColorMap,De=G&&!!M.sheenRoughnessMap,Te=!!M.specularMap,ce=!!M.specularColorMap,Ue=!!M.specularIntensityMap,D=$&&!!M.transmissionMap,J=$&&!!M.thicknessMap,ae=!!M.gradientMap,ye=!!M.alphaMap,ee=M.alphaTest>0,K=!!M.alphaHash,Ee=!!M.extensions;let ze=Ai;M.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(ze=n.toneMapping);const ut={shaderID:Q,shaderType:M.type,shaderName:M.name,vertexShader:$e,fragmentShader:et,defines:M.defines,customVertexShaderID:qe,customFragmentShaderID:Y,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:ge,batchingColor:ge&&z._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&z.instanceColor!==null,instancingMorph:Ae&&z.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Is,alphaToCoverage:!!M.alphaToCoverage,map:We,matcap:wt,envMap:A,envMapMode:A&&te.mapping,envMapCubeUVHeight:H,aoMap:st,lightMap:Fe,bumpMap:Ce,normalMap:ve,displacementMap:u&&rt,emissiveMap:xe,normalMapObjectSpace:ve&&M.normalMapType===dp,normalMapTangentSpace:ve&&M.normalMapType===Jl,metalnessMap:ke,roughnessMap:Mt,anisotropy:pt,anisotropyMap:V,clearcoat:E,clearcoatMap:Me,clearcoatNormalMap:se,clearcoatRoughnessMap:_e,dispersion:v,iridescence:F,iridescenceMap:we,iridescenceThicknessMap:ne,sheen:G,sheenColorMap:ue,sheenRoughnessMap:De,specularMap:Te,specularColorMap:ce,specularIntensityMap:Ue,transmission:$,transmissionMap:D,thicknessMap:J,gradientMap:ae,opaque:M.transparent===!1&&M.blending===bs&&M.alphaToCoverage===!1,alphaMap:ye,alphaTest:ee,alphaHash:K,combine:M.combine,mapUv:We&&_(M.map.channel),aoMapUv:st&&_(M.aoMap.channel),lightMapUv:Fe&&_(M.lightMap.channel),bumpMapUv:Ce&&_(M.bumpMap.channel),normalMapUv:ve&&_(M.normalMap.channel),displacementMapUv:rt&&_(M.displacementMap.channel),emissiveMapUv:xe&&_(M.emissiveMap.channel),metalnessMapUv:ke&&_(M.metalnessMap.channel),roughnessMapUv:Mt&&_(M.roughnessMap.channel),anisotropyMapUv:V&&_(M.anisotropyMap.channel),clearcoatMapUv:Me&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:se&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:De&&_(M.sheenRoughnessMap.channel),specularMapUv:Te&&_(M.specularMap.channel),specularColorMapUv:ce&&_(M.specularColorMap.channel),specularIntensityMapUv:Ue&&_(M.specularIntensityMap.channel),transmissionMapUv:D&&_(M.transmissionMap.channel),thicknessMapUv:J&&_(M.thicknessMap.channel),alphaMapUv:ye&&_(M.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(ve||pt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!j.attributes.uv&&(We||ye),fog:!!X,useFog:M.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:z.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:Oe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,decodeVideoTexture:We&&M.map.isVideoTexture===!0&&je.getTransfer(M.map.colorSpace)===nt,decodeVideoTextureEmissive:xe&&M.emissiveMap.isVideoTexture===!0&&je.getTransfer(M.emissiveMap.colorSpace)===nt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===on,flipSided:M.side===ln,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ee&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&M.extensions.multiDraw===!0||ge)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ut.vertexUv1s=c.has(1),ut.vertexUv2s=c.has(2),ut.vertexUv3s=c.has(3),c.clear(),ut}function f(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)S.push(P),S.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(w(S,M),b(S,M),S.push(n.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function w(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function b(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){const S=g[M.type];let P;if(S){const O=an[S];P=li.clone(O.uniforms)}else P=M.uniforms;return P}function R(M,S){let P;for(let O=0,z=h.length;O<z;O++){const X=h[O];if(X.cacheKey===S){P=X,++P.usedTimes;break}}return P===void 0&&(P=new zx(n,S,M,r),h.push(P)),P}function T(M){if(--M.usedTimes===0){const S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function C(M){l.remove(M)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:R,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:U}}function Xx(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function qx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function jh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Kh(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d,u,p,g,_,m){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),e++,f}function a(d,u,p,g,_,m){const f=o(d,u,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(d,u,p,g,_,m){const f=o(d,u,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(d,u){t.length>1&&t.sort(d||qx),i.length>1&&i.sort(u||jh),s.length>1&&s.sort(u||jh)}function h(){for(let d=e,u=n.length;d<u;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Yx(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Kh,n.set(i,[o])):s>=r.length?(o=new Kh,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function jx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ge};break;case"SpotLight":t={position:new L,direction:new L,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function Kx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Zx=0;function $x(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Jx(n){const e=new jx,t=Kx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const s=new L,r=new ft,o=new ft;function a(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,w=0,b=0,y=0,R=0,T=0,C=0;c.sort($x);for(let M=0,S=c.length;M<S;M++){const P=c[M],O=P.color,z=P.intensity,X=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=O.r*z,d+=O.g*z,u+=O.b*z;else if(P.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(P.sh.coefficients[W],z);C++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const te=P.shadow,H=t.get(P);H.shadowIntensity=te.intensity,H.shadowBias=te.bias,H.shadowNormalBias=te.normalBias,H.shadowRadius=te.radius,H.shadowMapSize=te.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=P.shadow.matrix,w++}i.directional[p]=W,p++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(O).multiplyScalar(z),W.distance=X,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,i.spot[_]=W;const te=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,te.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[_]=te.matrix,P.castShadow){const H=t.get(P);H.shadowIntensity=te.intensity,H.shadowBias=te.bias,H.shadowNormalBias=te.normalBias,H.shadowRadius=te.radius,H.shadowMapSize=te.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=j,y++}_++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(O).multiplyScalar(z),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const te=P.shadow,H=t.get(P);H.shadowIntensity=te.intensity,H.shadowBias=te.bias,H.shadowNormalBias=te.normalBias,H.shadowRadius=te.radius,H.shadowMapSize=te.mapSize,H.shadowCameraNear=te.camera.near,H.shadowCameraFar=te.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=P.shadow.matrix,b++}i.point[g]=W,g++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(z),W.groundColor.copy(P.groundColor).multiplyScalar(z),i.hemi[f]=W,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const U=i.hash;(U.directionalLength!==p||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==f||U.numDirectionalShadows!==w||U.numPointShadows!==b||U.numSpotShadows!==y||U.numSpotMaps!==R||U.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=y+R-T,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,U.directionalLength=p,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=f,U.numDirectionalShadows=w,U.numPointShadows=b,U.numSpotShadows=y,U.numSpotMaps=R,U.numLightProbes=C,i.version=Zx++)}function l(c,h){let d=0,u=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){const b=c[f];if(b.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(b.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),u++}else if(b.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Zh(n){const e=new Jx(n),t=[],i=[];function s(h){c.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Qx(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Zh(n),e.set(s,[a])):r>=o.length?(a=new Zh(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const e0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function n0(n,e,t){let i=new ic;const s=new Ie,r=new Ie,o=new ht,a=new _m({depthPacking:hp}),l=new vm,c={},h=t.maxTextureSize,d={[Ci]:ln,[ln]:Ci,[on]:on},u=new Wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ie},radius:{value:4}},vertexShader:e0,fragmentShader:t0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Xt;g.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Nt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nd;let f=this.type;this.render=function(T,C,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const M=n.getRenderTarget(),S=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Zt),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=f!==ai&&this.type===ai,X=f===ai&&this.type!==ai;for(let j=0,W=T.length;j<W;j++){const te=T[j],H=te.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const Q=H.getFrameExtents();if(s.multiply(Q),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,H.mapSize.y=r.y)),H.map===null||z===!0||X===!0){const Se=this.type!==ai?{minFilter:Jt,magFilter:Jt}:{};H.map!==null&&H.map.dispose(),H.map=new Dn(s.x,s.y,Se),H.map.texture.name=te.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const de=H.getViewportCount();for(let Se=0;Se<de;Se++){const Oe=H.getViewport(Se);o.set(r.x*Oe.x,r.y*Oe.y,r.x*Oe.z,r.y*Oe.w),O.viewport(o),H.updateMatrices(te,Se),i=H.getFrustum(),y(C,U,H.camera,te,this.type)}H.isPointLightShadow!==!0&&this.type===ai&&w(H,U),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(M,S,P)};function w(T,C){const U=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Dn(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(C,null,U,u,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(C,null,U,p,_,null)}function b(T,C,U,M){let S=null;const P=U.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)S=P;else if(S=U.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=S.uuid,z=C.uuid;let X=c[O];X===void 0&&(X={},c[O]=X);let j=X[z];j===void 0&&(j=S.clone(),X[z]=j,C.addEventListener("dispose",R)),S=j}if(S.visible=C.visible,S.wireframe=C.wireframe,M===ai?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:d[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,U.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const O=n.properties.get(S);O.light=U}return S}function y(T,C,U,M,S){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===ai)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,T.matrixWorld);const z=e.update(T),X=T.material;if(Array.isArray(X)){const j=z.groups;for(let W=0,te=j.length;W<te;W++){const H=j[W],Q=X[H.materialIndex];if(Q&&Q.visible){const de=b(T,Q,M,S);T.onBeforeShadow(n,T,C,U,z,de,H),n.renderBufferDirect(U,null,z,de,T,H),T.onAfterShadow(n,T,C,U,z,de,H)}}}else if(X.visible){const j=b(T,X,M,S);T.onBeforeShadow(n,T,C,U,z,j,null),n.renderBufferDirect(U,null,z,j,T,null),T.onAfterShadow(n,T,C,U,z,j,null)}}const O=T.children;for(let z=0,X=O.length;z<X;z++)y(O[z],C,U,M,S)}function R(T){T.target.removeEventListener("dispose",R);for(const U in c){const M=c[U],S=T.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const i0={[Xo]:qo,[Yo]:Zo,[jo]:$o,[Rs]:Ko,[qo]:Xo,[Zo]:Yo,[$o]:jo,[Ko]:Rs};function s0(n,e){function t(){let D=!1;const J=new ht;let ae=null;const ye=new ht(0,0,0,0);return{setMask:function(ee){ae!==ee&&!D&&(n.colorMask(ee,ee,ee,ee),ae=ee)},setLocked:function(ee){D=ee},setClear:function(ee,K,Ee,ze,ut){ut===!0&&(ee*=ze,K*=ze,Ee*=ze),J.set(ee,K,Ee,ze),ye.equals(J)===!1&&(n.clearColor(ee,K,Ee,ze),ye.copy(J))},reset:function(){D=!1,ae=null,ye.set(-1,0,0,0)}}}function i(){let D=!1,J=!1,ae=null,ye=null,ee=null;return{setReversed:function(K){if(J!==K){const Ee=e.get("EXT_clip_control");K?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),J=K;const ze=ee;ee=null,this.setClear(ze)}},getReversed:function(){return J},setTest:function(K){K?Z(n.DEPTH_TEST):pe(n.DEPTH_TEST)},setMask:function(K){ae!==K&&!D&&(n.depthMask(K),ae=K)},setFunc:function(K){if(J&&(K=i0[K]),ye!==K){switch(K){case Xo:n.depthFunc(n.NEVER);break;case qo:n.depthFunc(n.ALWAYS);break;case Yo:n.depthFunc(n.LESS);break;case Rs:n.depthFunc(n.LEQUAL);break;case jo:n.depthFunc(n.EQUAL);break;case Ko:n.depthFunc(n.GEQUAL);break;case Zo:n.depthFunc(n.GREATER);break;case $o:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ye=K}},setLocked:function(K){D=K},setClear:function(K){ee!==K&&(J&&(K=1-K),n.clearDepth(K),ee=K)},reset:function(){D=!1,ae=null,ye=null,ee=null,J=!1}}}function s(){let D=!1,J=null,ae=null,ye=null,ee=null,K=null,Ee=null,ze=null,ut=null;return{setTest:function(Qe){D||(Qe?Z(n.STENCIL_TEST):pe(n.STENCIL_TEST))},setMask:function(Qe){J!==Qe&&!D&&(n.stencilMask(Qe),J=Qe)},setFunc:function(Qe,ei,kn){(ae!==Qe||ye!==ei||ee!==kn)&&(n.stencilFunc(Qe,ei,kn),ae=Qe,ye=ei,ee=kn)},setOp:function(Qe,ei,kn){(K!==Qe||Ee!==ei||ze!==kn)&&(n.stencilOp(Qe,ei,kn),K=Qe,Ee=ei,ze=kn)},setLocked:function(Qe){D=Qe},setClear:function(Qe){ut!==Qe&&(n.clearStencil(Qe),ut=Qe)},reset:function(){D=!1,J=null,ae=null,ye=null,ee=null,K=null,Ee=null,ze=null,ut=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,b=null,y=null,R=null,T=null,C=new Ge(0,0,0),U=0,M=!1,S=null,P=null,O=null,z=null,X=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,te=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=te>=1):H.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=te>=2);let Q=null,de={};const Se=n.getParameter(n.SCISSOR_BOX),Oe=n.getParameter(n.VIEWPORT),$e=new ht().fromArray(Se),et=new ht().fromArray(Oe);function qe(D,J,ae,ye){const ee=new Uint8Array(4),K=n.createTexture();n.bindTexture(D,K),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ee=0;Ee<ae;Ee++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(J,0,n.RGBA,1,1,ye,0,n.RGBA,n.UNSIGNED_BYTE,ee):n.texImage2D(J+Ee,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ee);return K}const Y={};Y[n.TEXTURE_2D]=qe(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=qe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=qe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=qe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(n.DEPTH_TEST),o.setFunc(Rs),Ce(!1),ve(Wc),Z(n.CULL_FACE),st(Zt);function Z(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function pe(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function Ae(D,J){return d[D]!==J?(n.bindFramebuffer(D,J),d[D]=J,D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=J),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=J),!0):!1}function ge(D,J){let ae=p,ye=!1;if(D){ae=u.get(J),ae===void 0&&(ae=[],u.set(J,ae));const ee=D.textures;if(ae.length!==ee.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let K=0,Ee=ee.length;K<Ee;K++)ae[K]=n.COLOR_ATTACHMENT0+K;ae.length=ee.length,ye=!0}}else ae[0]!==n.BACK&&(ae[0]=n.BACK,ye=!0);ye&&n.drawBuffers(ae)}function We(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const wt={[oi]:n.FUNC_ADD,[qf]:n.FUNC_SUBTRACT,[Yf]:n.FUNC_REVERSE_SUBTRACT};wt[jf]=n.MIN,wt[Kf]=n.MAX;const A={[Vo]:n.ZERO,[Zf]:n.ONE,[$f]:n.SRC_COLOR,[Go]:n.SRC_ALPHA,[tp]:n.SRC_ALPHA_SATURATE,[kd]:n.DST_COLOR,[Od]:n.DST_ALPHA,[Jf]:n.ONE_MINUS_SRC_COLOR,[Wo]:n.ONE_MINUS_SRC_ALPHA,[ep]:n.ONE_MINUS_DST_COLOR,[Qf]:n.ONE_MINUS_DST_ALPHA,[np]:n.CONSTANT_COLOR,[ip]:n.ONE_MINUS_CONSTANT_COLOR,[sp]:n.CONSTANT_ALPHA,[rp]:n.ONE_MINUS_CONSTANT_ALPHA};function st(D,J,ae,ye,ee,K,Ee,ze,ut,Qe){if(D===Zt){_===!0&&(pe(n.BLEND),_=!1);return}if(_===!1&&(Z(n.BLEND),_=!0),D!==Fd){if(D!==m||Qe!==M){if((f!==oi||y!==oi)&&(n.blendEquation(n.FUNC_ADD),f=oi,y=oi),Qe)switch(D){case bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xc:n.blendFunc(n.ONE,n.ONE);break;case qc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Yc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case qc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}w=null,b=null,R=null,T=null,C.set(0,0,0),U=0,m=D,M=Qe}return}ee=ee||J,K=K||ae,Ee=Ee||ye,(J!==f||ee!==y)&&(n.blendEquationSeparate(wt[J],wt[ee]),f=J,y=ee),(ae!==w||ye!==b||K!==R||Ee!==T)&&(n.blendFuncSeparate(A[ae],A[ye],A[K],A[Ee]),w=ae,b=ye,R=K,T=Ee),(ze.equals(C)===!1||ut!==U)&&(n.blendColor(ze.r,ze.g,ze.b,ut),C.copy(ze),U=ut),m=D,M=!1}function Fe(D,J){D.side===on?pe(n.CULL_FACE):Z(n.CULL_FACE);let ae=D.side===ln;J&&(ae=!ae),Ce(ae),D.blending===bs&&D.transparent===!1?st(Zt):st(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const ye=D.stencilWrite;a.setTest(ye),ye&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),xe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Z(n.SAMPLE_ALPHA_TO_COVERAGE):pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(D){S!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),S=D)}function ve(D){D!==Gf?(Z(n.CULL_FACE),D!==P&&(D===Wc?n.cullFace(n.BACK):D===Wf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pe(n.CULL_FACE),P=D}function rt(D){D!==O&&(W&&n.lineWidth(D),O=D)}function xe(D,J,ae){D?(Z(n.POLYGON_OFFSET_FILL),(z!==J||X!==ae)&&(n.polygonOffset(J,ae),z=J,X=ae)):pe(n.POLYGON_OFFSET_FILL)}function ke(D){D?Z(n.SCISSOR_TEST):pe(n.SCISSOR_TEST)}function Mt(D){D===void 0&&(D=n.TEXTURE0+j-1),Q!==D&&(n.activeTexture(D),Q=D)}function pt(D,J,ae){ae===void 0&&(Q===null?ae=n.TEXTURE0+j-1:ae=Q);let ye=de[ae];ye===void 0&&(ye={type:void 0,texture:void 0},de[ae]=ye),(ye.type!==D||ye.texture!==J)&&(Q!==ae&&(n.activeTexture(ae),Q=ae),n.bindTexture(D,J||Y[D]),ye.type=D,ye.texture=J)}function E(){const D=de[Q];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function se(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _e(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function we(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ue(D){$e.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),$e.copy(D))}function De(D){et.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),et.copy(D))}function Te(D,J){let ae=c.get(J);ae===void 0&&(ae=new WeakMap,c.set(J,ae));let ye=ae.get(D);ye===void 0&&(ye=n.getUniformBlockIndex(J,D.name),ae.set(D,ye))}function ce(D,J){const ye=c.get(J).get(D);l.get(J)!==ye&&(n.uniformBlockBinding(J,ye,D.__bindingPointIndex),l.set(J,ye))}function Ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Q=null,de={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,b=null,y=null,R=null,T=null,C=new Ge(0,0,0),U=0,M=!1,S=null,P=null,O=null,z=null,X=null,$e.set(0,0,n.canvas.width,n.canvas.height),et.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:pe,bindFramebuffer:Ae,drawBuffers:ge,useProgram:We,setBlending:st,setMaterial:Fe,setFlipSided:Ce,setCullFace:ve,setLineWidth:rt,setPolygonOffset:xe,setScissorTest:ke,activeTexture:Mt,bindTexture:pt,unbindTexture:E,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:we,texImage3D:ne,updateUBOMapping:Te,uniformBlockBinding:ce,texStorage2D:se,texStorage3D:_e,texSubImage2D:G,texSubImage3D:$,compressedTexSubImage2D:V,compressedTexSubImage3D:Me,scissor:ue,viewport:De,reset:Ue}}function r0(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ie,h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return p?new OffscreenCanvas(E,v):va("canvas")}function _(E,v,F){let G=1;const $=pt(E);if(($.width>F||$.height>F)&&(G=F/Math.max($.width,$.height)),G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const V=Math.floor(G*$.width),Me=Math.floor(G*$.height);d===void 0&&(d=g(V,Me));const se=v?g(V,Me):d;return se.width=V,se.height=Me,se.getContext("2d").drawImage(E,0,0,V,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+V+"x"+Me+")."),se}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),E;return E}function m(E){return E.generateMipmaps}function f(E){n.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(E,v,F,G,$=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let V=v;if(v===n.RED&&(F===n.FLOAT&&(V=n.R32F),F===n.HALF_FLOAT&&(V=n.R16F),F===n.UNSIGNED_BYTE&&(V=n.R8)),v===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(V=n.R8UI),F===n.UNSIGNED_SHORT&&(V=n.R16UI),F===n.UNSIGNED_INT&&(V=n.R32UI),F===n.BYTE&&(V=n.R8I),F===n.SHORT&&(V=n.R16I),F===n.INT&&(V=n.R32I)),v===n.RG&&(F===n.FLOAT&&(V=n.RG32F),F===n.HALF_FLOAT&&(V=n.RG16F),F===n.UNSIGNED_BYTE&&(V=n.RG8)),v===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(V=n.RG8UI),F===n.UNSIGNED_SHORT&&(V=n.RG16UI),F===n.UNSIGNED_INT&&(V=n.RG32UI),F===n.BYTE&&(V=n.RG8I),F===n.SHORT&&(V=n.RG16I),F===n.INT&&(V=n.RG32I)),v===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(V=n.RGB8UI),F===n.UNSIGNED_SHORT&&(V=n.RGB16UI),F===n.UNSIGNED_INT&&(V=n.RGB32UI),F===n.BYTE&&(V=n.RGB8I),F===n.SHORT&&(V=n.RGB16I),F===n.INT&&(V=n.RGB32I)),v===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(V=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(V=n.RGBA16UI),F===n.UNSIGNED_INT&&(V=n.RGBA32UI),F===n.BYTE&&(V=n.RGBA8I),F===n.SHORT&&(V=n.RGBA16I),F===n.INT&&(V=n.RGBA32I)),v===n.RGB&&(F===n.UNSIGNED_INT_5_9_9_9_REV&&(V=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(V=n.R11F_G11F_B10F)),v===n.RGBA){const Me=$?ga:je.getTransfer(G);F===n.FLOAT&&(V=n.RGBA32F),F===n.HALF_FLOAT&&(V=n.RGBA16F),F===n.UNSIGNED_BYTE&&(V=Me===nt?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(V=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(V=n.RGB5_A1)}return(V===n.R16F||V===n.R32F||V===n.RG16F||V===n.RG32F||V===n.RGBA16F||V===n.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function y(E,v){let F;return E?v===null||v===ji||v===Ds?F=n.DEPTH24_STENCIL8:v===qn?F=n.DEPTH32F_STENCIL8:v===sr&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ji||v===Ds?F=n.DEPTH_COMPONENT24:v===qn?F=n.DEPTH_COMPONENT32F:v===sr&&(F=n.DEPTH_COMPONENT16),F}function R(E,v){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Jt&&E.minFilter!==Xn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function T(E){const v=E.target;v.removeEventListener("dispose",T),U(v),v.isVideoTexture&&h.delete(v)}function C(E){const v=E.target;v.removeEventListener("dispose",C),S(v)}function U(E){const v=i.get(E);if(v.__webglInit===void 0)return;const F=E.source,G=u.get(F);if(G){const $=G[v.__cacheKey];$.usedTimes--,$.usedTimes===0&&M(E),Object.keys(G).length===0&&u.delete(F)}i.remove(E)}function M(E){const v=i.get(E);n.deleteTexture(v.__webglTexture);const F=E.source,G=u.get(F);delete G[v.__cacheKey],o.memory.textures--}function S(E){const v=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(v.__webglFramebuffer[G]))for(let $=0;$<v.__webglFramebuffer[G].length;$++)n.deleteFramebuffer(v.__webglFramebuffer[G][$]);else n.deleteFramebuffer(v.__webglFramebuffer[G]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[G])}else{if(Array.isArray(v.__webglFramebuffer))for(let G=0;G<v.__webglFramebuffer.length;G++)n.deleteFramebuffer(v.__webglFramebuffer[G]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let G=0;G<v.__webglColorRenderbuffer.length;G++)v.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[G]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=E.textures;for(let G=0,$=F.length;G<$;G++){const V=i.get(F[G]);V.__webglTexture&&(n.deleteTexture(V.__webglTexture),o.memory.textures--),i.remove(F[G])}i.remove(E)}let P=0;function O(){P=0}function z(){const E=P;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),P+=1,E}function X(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function j(E,v){const F=i.get(E);if(E.isVideoTexture&&ke(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&F.__version!==E.version){const G=E.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,E,v);return}}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+v)}function W(E,v){const F=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){Y(F,E,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+v)}function te(E,v){const F=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){Y(F,E,v);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+v)}function H(E,v){const F=i.get(E);if(E.version>0&&F.__version!==E.version){Z(F,E,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+v)}const Q={[ir]:n.REPEAT,[Gi]:n.CLAMP_TO_EDGE,[el]:n.MIRRORED_REPEAT},de={[Jt]:n.NEAREST,[lp]:n.NEAREST_MIPMAP_NEAREST,[yr]:n.NEAREST_MIPMAP_LINEAR,[Xn]:n.LINEAR,[ja]:n.LINEAR_MIPMAP_NEAREST,[Wi]:n.LINEAR_MIPMAP_LINEAR},Se={[up]:n.NEVER,[vp]:n.ALWAYS,[fp]:n.LESS,[tu]:n.LEQUAL,[pp]:n.EQUAL,[_p]:n.GEQUAL,[mp]:n.GREATER,[gp]:n.NOTEQUAL};function Oe(E,v){if(v.type===qn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Xn||v.magFilter===ja||v.magFilter===yr||v.magFilter===Wi||v.minFilter===Xn||v.minFilter===ja||v.minFilter===yr||v.minFilter===Wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Q[v.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Q[v.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Q[v.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,de[v.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,de[v.minFilter]),v.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Se[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Jt||v.minFilter!==yr&&v.minFilter!==Wi||v.type===qn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function $e(E,v){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",T));const G=v.source;let $=u.get(G);$===void 0&&($={},u.set(G,$));const V=X(v);if(V!==E.__cacheKey){$[V]===void 0&&($[V]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),$[V].usedTimes++;const Me=$[E.__cacheKey];Me!==void 0&&($[E.__cacheKey].usedTimes--,Me.usedTimes===0&&M(v)),E.__cacheKey=V,E.__webglTexture=$[V].texture}return F}function et(E,v,F){return Math.floor(Math.floor(E/F)/v)}function qe(E,v,F,G){const V=E.updateRanges;if(V.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,F,G,v.data);else{V.sort((ne,ue)=>ne.start-ue.start);let Me=0;for(let ne=1;ne<V.length;ne++){const ue=V[Me],De=V[ne],Te=ue.start+ue.count,ce=et(De.start,v.width,4),Ue=et(ue.start,v.width,4);De.start<=Te+1&&ce===Ue&&et(De.start+De.count-1,v.width,4)===ce?ue.count=Math.max(ue.count,De.start+De.count-ue.start):(++Me,V[Me]=De)}V.length=Me+1;const se=n.getParameter(n.UNPACK_ROW_LENGTH),_e=n.getParameter(n.UNPACK_SKIP_PIXELS),we=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let ne=0,ue=V.length;ne<ue;ne++){const De=V[ne],Te=Math.floor(De.start/4),ce=Math.ceil(De.count/4),Ue=Te%v.width,D=Math.floor(Te/v.width),J=ce,ae=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ue),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,Ue,D,J,ae,F,G,v.data)}E.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,se),n.pixelStorei(n.UNPACK_SKIP_PIXELS,_e),n.pixelStorei(n.UNPACK_SKIP_ROWS,we)}}function Y(E,v,F){let G=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(G=n.TEXTURE_3D);const $=$e(E,v),V=v.source;t.bindTexture(G,E.__webglTexture,n.TEXTURE0+F);const Me=i.get(V);if(V.version!==Me.__version||$===!0){t.activeTexture(n.TEXTURE0+F);const se=je.getPrimaries(je.workingColorSpace),_e=v.colorSpace===Ei?null:je.getPrimaries(v.colorSpace),we=v.colorSpace===Ei||se===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let ne=_(v.image,!1,s.maxTextureSize);ne=Mt(v,ne);const ue=r.convert(v.format,v.colorSpace),De=r.convert(v.type);let Te=b(v.internalFormat,ue,De,v.colorSpace,v.isVideoTexture);Oe(G,v);let ce;const Ue=v.mipmaps,D=v.isVideoTexture!==!0,J=Me.__version===void 0||$===!0,ae=V.dataReady,ye=R(v,ne);if(v.isDepthTexture)Te=y(v.format===Ls,v.type),J&&(D?t.texStorage2D(n.TEXTURE_2D,1,Te,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Te,ne.width,ne.height,0,ue,De,null));else if(v.isDataTexture)if(Ue.length>0){D&&J&&t.texStorage2D(n.TEXTURE_2D,ye,Te,Ue[0].width,Ue[0].height);for(let ee=0,K=Ue.length;ee<K;ee++)ce=Ue[ee],D?ae&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ce.width,ce.height,ue,De,ce.data):t.texImage2D(n.TEXTURE_2D,ee,Te,ce.width,ce.height,0,ue,De,ce.data);v.generateMipmaps=!1}else D?(J&&t.texStorage2D(n.TEXTURE_2D,ye,Te,ne.width,ne.height),ae&&qe(v,ne,ue,De)):t.texImage2D(n.TEXTURE_2D,0,Te,ne.width,ne.height,0,ue,De,ne.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){D&&J&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Te,Ue[0].width,Ue[0].height,ne.depth);for(let ee=0,K=Ue.length;ee<K;ee++)if(ce=Ue[ee],v.format!==Rn)if(ue!==null)if(D){if(ae)if(v.layerUpdates.size>0){const Ee=Th(ce.width,ce.height,v.format,v.type);for(const ze of v.layerUpdates){const ut=ce.data.subarray(ze*Ee/ce.data.BYTES_PER_ELEMENT,(ze+1)*Ee/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,ze,ce.width,ce.height,1,ue,ut)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,ue,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,Te,ce.width,ce.height,ne.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ae&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,ue,De,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,Te,ce.width,ce.height,ne.depth,0,ue,De,ce.data)}else{D&&J&&t.texStorage2D(n.TEXTURE_2D,ye,Te,Ue[0].width,Ue[0].height);for(let ee=0,K=Ue.length;ee<K;ee++)ce=Ue[ee],v.format!==Rn?ue!==null?D?ae&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,ce.width,ce.height,ue,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,Te,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ae&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ce.width,ce.height,ue,De,ce.data):t.texImage2D(n.TEXTURE_2D,ee,Te,ce.width,ce.height,0,ue,De,ce.data)}else if(v.isDataArrayTexture)if(D){if(J&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Te,ne.width,ne.height,ne.depth),ae)if(v.layerUpdates.size>0){const ee=Th(ne.width,ne.height,v.format,v.type);for(const K of v.layerUpdates){const Ee=ne.data.subarray(K*ee/ne.data.BYTES_PER_ELEMENT,(K+1)*ee/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,K,ne.width,ne.height,1,ue,De,Ee)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ue,De,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Te,ne.width,ne.height,ne.depth,0,ue,De,ne.data);else if(v.isData3DTexture)D?(J&&t.texStorage3D(n.TEXTURE_3D,ye,Te,ne.width,ne.height,ne.depth),ae&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ue,De,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Te,ne.width,ne.height,ne.depth,0,ue,De,ne.data);else if(v.isFramebufferTexture){if(J)if(D)t.texStorage2D(n.TEXTURE_2D,ye,Te,ne.width,ne.height);else{let ee=ne.width,K=ne.height;for(let Ee=0;Ee<ye;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,Te,ee,K,0,ue,De,null),ee>>=1,K>>=1}}else if(Ue.length>0){if(D&&J){const ee=pt(Ue[0]);t.texStorage2D(n.TEXTURE_2D,ye,Te,ee.width,ee.height)}for(let ee=0,K=Ue.length;ee<K;ee++)ce=Ue[ee],D?ae&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ue,De,ce):t.texImage2D(n.TEXTURE_2D,ee,Te,ue,De,ce);v.generateMipmaps=!1}else if(D){if(J){const ee=pt(ne);t.texStorage2D(n.TEXTURE_2D,ye,Te,ee.width,ee.height)}ae&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,De,ne)}else t.texImage2D(n.TEXTURE_2D,0,Te,ue,De,ne);m(v)&&f(G),Me.__version=V.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Z(E,v,F){if(v.image.length!==6)return;const G=$e(E,v),$=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+F);const V=i.get($);if($.version!==V.__version||G===!0){t.activeTexture(n.TEXTURE0+F);const Me=je.getPrimaries(je.workingColorSpace),se=v.colorSpace===Ei?null:je.getPrimaries(v.colorSpace),_e=v.colorSpace===Ei||Me===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const we=v.isCompressedTexture||v.image[0].isCompressedTexture,ne=v.image[0]&&v.image[0].isDataTexture,ue=[];for(let K=0;K<6;K++)!we&&!ne?ue[K]=_(v.image[K],!0,s.maxCubemapSize):ue[K]=ne?v.image[K].image:v.image[K],ue[K]=Mt(v,ue[K]);const De=ue[0],Te=r.convert(v.format,v.colorSpace),ce=r.convert(v.type),Ue=b(v.internalFormat,Te,ce,v.colorSpace),D=v.isVideoTexture!==!0,J=V.__version===void 0||G===!0,ae=$.dataReady;let ye=R(v,De);Oe(n.TEXTURE_CUBE_MAP,v);let ee;if(we){D&&J&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Ue,De.width,De.height);for(let K=0;K<6;K++){ee=ue[K].mipmaps;for(let Ee=0;Ee<ee.length;Ee++){const ze=ee[Ee];v.format!==Rn?Te!==null?D?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,0,0,ze.width,ze.height,Te,ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,Ue,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,0,0,ze.width,ze.height,Te,ce,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,Ue,ze.width,ze.height,0,Te,ce,ze.data)}}}else{if(ee=v.mipmaps,D&&J){ee.length>0&&ye++;const K=pt(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Ue,K.width,K.height)}for(let K=0;K<6;K++)if(ne){D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ue[K].width,ue[K].height,Te,ce,ue[K].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ue,ue[K].width,ue[K].height,0,Te,ce,ue[K].data);for(let Ee=0;Ee<ee.length;Ee++){const ut=ee[Ee].image[K].image;D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,0,0,ut.width,ut.height,Te,ce,ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,Ue,ut.width,ut.height,0,Te,ce,ut.data)}}else{D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Te,ce,ue[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ue,Te,ce,ue[K]);for(let Ee=0;Ee<ee.length;Ee++){const ze=ee[Ee];D?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,0,0,Te,ce,ze.image[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,Ue,Te,ce,ze.image[K])}}}m(v)&&f(n.TEXTURE_CUBE_MAP),V.__version=$.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function pe(E,v,F,G,$,V){const Me=r.convert(F.format,F.colorSpace),se=r.convert(F.type),_e=b(F.internalFormat,Me,se,F.colorSpace),we=i.get(v),ne=i.get(F);if(ne.__renderTarget=v,!we.__hasExternalTextures){const ue=Math.max(1,v.width>>V),De=Math.max(1,v.height>>V);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?t.texImage3D($,V,_e,ue,De,v.depth,0,Me,se,null):t.texImage2D($,V,_e,ue,De,0,Me,se,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),xe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,$,ne.__webglTexture,0,rt(v)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,$,ne.__webglTexture,V),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(E,v,F){if(n.bindRenderbuffer(n.RENDERBUFFER,E),v.depthBuffer){const G=v.depthTexture,$=G&&G.isDepthTexture?G.type:null,V=y(v.stencilBuffer,$),Me=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=rt(v);xe(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,V,v.width,v.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,se,V,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,V,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Me,n.RENDERBUFFER,E)}else{const G=v.textures;for(let $=0;$<G.length;$++){const V=G[$],Me=r.convert(V.format,V.colorSpace),se=r.convert(V.type),_e=b(V.internalFormat,Me,se,V.colorSpace),we=rt(v);F&&xe(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,we,_e,v.width,v.height):xe(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,we,_e,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,_e,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ge(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=i.get(v.depthTexture);G.__renderTarget=v,(!G.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j(v.depthTexture,0);const $=G.__webglTexture,V=rt(v);if(v.depthTexture.format===rr)xe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0);else if(v.depthTexture.format===Ls)xe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function We(E){const v=i.get(E),F=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const G=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),G){const $=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,G.removeEventListener("dispose",$)};G.addEventListener("dispose",$),v.__depthDisposeCallback=$}v.__boundDepthTexture=G}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const G=E.texture.mipmaps;G&&G.length>0?ge(v.__webglFramebuffer[0],E):ge(v.__webglFramebuffer,E)}else if(F){v.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[G]),v.__webglDepthbuffer[G]===void 0)v.__webglDepthbuffer[G]=n.createRenderbuffer(),Ae(v.__webglDepthbuffer[G],E,!1);else{const $=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=v.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,V)}}else{const G=E.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Ae(v.__webglDepthbuffer,E,!1);else{const $=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,V)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function wt(E,v,F){const G=i.get(E);v!==void 0&&pe(G.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&We(E)}function A(E){const v=E.texture,F=i.get(E),G=i.get(v);E.addEventListener("dispose",C);const $=E.textures,V=E.isWebGLCubeRenderTarget===!0,Me=$.length>1;if(Me||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=v.version,o.memory.textures++),V){F.__webglFramebuffer=[];for(let se=0;se<6;se++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[se]=[];for(let _e=0;_e<v.mipmaps.length;_e++)F.__webglFramebuffer[se][_e]=n.createFramebuffer()}else F.__webglFramebuffer[se]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let se=0;se<v.mipmaps.length;se++)F.__webglFramebuffer[se]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(Me)for(let se=0,_e=$.length;se<_e;se++){const we=i.get($[se]);we.__webglTexture===void 0&&(we.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&xe(E)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let se=0;se<$.length;se++){const _e=$[se];F.__webglColorRenderbuffer[se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[se]);const we=r.convert(_e.format,_e.colorSpace),ne=r.convert(_e.type),ue=b(_e.internalFormat,we,ne,_e.colorSpace,E.isXRRenderTarget===!0),De=rt(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,ue,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,F.__webglColorRenderbuffer[se])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(F.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(V){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Oe(n.TEXTURE_CUBE_MAP,v);for(let se=0;se<6;se++)if(v.mipmaps&&v.mipmaps.length>0)for(let _e=0;_e<v.mipmaps.length;_e++)pe(F.__webglFramebuffer[se][_e],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,_e);else pe(F.__webglFramebuffer[se],E,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(v)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let se=0,_e=$.length;se<_e;se++){const we=$[se],ne=i.get(we);let ue=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ue=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,ne.__webglTexture),Oe(ue,we),pe(F.__webglFramebuffer,E,we,n.COLOR_ATTACHMENT0+se,ue,0),m(we)&&f(ue)}t.unbindTexture()}else{let se=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(se=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,G.__webglTexture),Oe(se,v),v.mipmaps&&v.mipmaps.length>0)for(let _e=0;_e<v.mipmaps.length;_e++)pe(F.__webglFramebuffer[_e],E,v,n.COLOR_ATTACHMENT0,se,_e);else pe(F.__webglFramebuffer,E,v,n.COLOR_ATTACHMENT0,se,0);m(v)&&f(se),t.unbindTexture()}E.depthBuffer&&We(E)}function st(E){const v=E.textures;for(let F=0,G=v.length;F<G;F++){const $=v[F];if(m($)){const V=w(E),Me=i.get($).__webglTexture;t.bindTexture(V,Me),f(V),t.unbindTexture()}}}const Fe=[],Ce=[];function ve(E){if(E.samples>0){if(xe(E)===!1){const v=E.textures,F=E.width,G=E.height;let $=n.COLOR_BUFFER_BIT;const V=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=i.get(E),se=v.length>1;if(se)for(let we=0;we<v.length;we++)t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const _e=E.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let we=0;we<v.length;we++){if(E.resolveDepthBuffer&&(E.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Me.__webglColorRenderbuffer[we]);const ne=i.get(v[we]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,F,G,0,0,F,G,$,n.NEAREST),l===!0&&(Fe.length=0,Ce.length=0,Fe.push(n.COLOR_ATTACHMENT0+we),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Fe.push(V),Ce.push(V),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ce)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Fe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),se)for(let we=0;we<v.length;we++){t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,Me.__webglColorRenderbuffer[we]);const ne=i.get(v[we]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,ne,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const v=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function rt(E){return Math.min(s.maxSamples,E.samples)}function xe(E){const v=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ke(E){const v=o.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function Mt(E,v){const F=E.colorSpace,G=E.format,$=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==Is&&F!==Ei&&(je.getTransfer(F)===nt?(G!==Rn||$!==Jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function pt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=j,this.setTexture2DArray=W,this.setTexture3D=te,this.setTextureCube=H,this.rebindTextures=wt,this.setupRenderTarget=A,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=xe}function a0(n,e){function t(i,s=Ei){let r;const o=je.getTransfer(s);if(i===Jn)return n.UNSIGNED_BYTE;if(i===ql)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Yl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Zd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$d)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===jd)return n.BYTE;if(i===Kd)return n.SHORT;if(i===sr)return n.UNSIGNED_SHORT;if(i===Xl)return n.INT;if(i===ji)return n.UNSIGNED_INT;if(i===qn)return n.FLOAT;if(i===pi)return n.HALF_FLOAT;if(i===Jd)return n.ALPHA;if(i===Qd)return n.RGB;if(i===Rn)return n.RGBA;if(i===rr)return n.DEPTH_COMPONENT;if(i===Ls)return n.DEPTH_STENCIL;if(i===jl)return n.RED;if(i===Kl)return n.RED_INTEGER;if(i===eu)return n.RG;if(i===Zl)return n.RG_INTEGER;if(i===$l)return n.RGBA_INTEGER;if(i===Qr||i===ea||i===ta||i===na)if(o===nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Qr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Qr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===na)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===tl||i===nl||i===il||i===sl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===tl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===il)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===rl||i===al||i===ol)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===rl||i===al)return o===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ol)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ll||i===cl||i===hl||i===dl||i===ul||i===fl||i===pl||i===ml||i===gl||i===_l||i===vl||i===xl||i===yl||i===Sl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ll)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===cl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===dl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ul)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ml)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===gl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_l)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===yl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Sl)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ml||i===bl||i===El)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ml)return o===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===El)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wl||i===Tl||i===Al||i===Rl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===wl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Al)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ds?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const o0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class c0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new hu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Wt({vertexShader:o0,fragmentShader:l0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Nt(new Da(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h0 extends Ji{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new c0,f={},w=t.getContextAttributes();let b=null,y=null;const R=[],T=[],C=new Ie;let U=null;const M=new En;M.viewport=new ht;const S=new En;S.viewport=new ht;const P=[M,S],O=new bm;let z=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=R[Y];return Z===void 0&&(Z=new go,R[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=R[Y];return Z===void 0&&(Z=new go,R[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=R[Y];return Z===void 0&&(Z=new go,R[Y]=Z),Z.getHandSpace()};function j(Y){const Z=T.indexOf(Y.inputSource);if(Z===-1)return;const pe=R[Z];pe!==void 0&&(pe.update(Y.inputSource,Y.frame,c||o),pe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",te);for(let Y=0;Y<R.length;Y++){const Z=T[Y];Z!==null&&(T[Y]=null,R[Y].disconnect(Z))}z=null,X=null,m.reset();for(const Y in f)delete f[Y];e.setRenderTarget(b),p=null,u=null,d=null,s=null,y=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(U),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",W),s.addEventListener("inputsourceschange",te),w.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Ae=null,ge=null;w.depth&&(ge=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=w.stencil?Ls:rr,Ae=w.stencil?Ds:ji);const We={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(We),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Dn(u.textureWidth,u.textureHeight,{format:Rn,type:Jn,depthTexture:new rc(u.textureWidth,u.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const pe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,pe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Dn(p.framebufferWidth,p.framebufferHeight,{format:Rn,type:Jn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),qe.setContext(s),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(Y){for(let Z=0;Z<Y.removed.length;Z++){const pe=Y.removed[Z],Ae=T.indexOf(pe);Ae>=0&&(T[Ae]=null,R[Ae].disconnect(pe))}for(let Z=0;Z<Y.added.length;Z++){const pe=Y.added[Z];let Ae=T.indexOf(pe);if(Ae===-1){for(let We=0;We<R.length;We++)if(We>=T.length){T.push(pe),Ae=We;break}else if(T[We]===null){T[We]=pe,Ae=We;break}if(Ae===-1)break}const ge=R[Ae];ge&&ge.connect(pe)}}const H=new L,Q=new L;function de(Y,Z,pe){H.setFromMatrixPosition(Z.matrixWorld),Q.setFromMatrixPosition(pe.matrixWorld);const Ae=H.distanceTo(Q),ge=Z.projectionMatrix.elements,We=pe.projectionMatrix.elements,wt=ge[14]/(ge[10]-1),A=ge[14]/(ge[10]+1),st=(ge[9]+1)/ge[5],Fe=(ge[9]-1)/ge[5],Ce=(ge[8]-1)/ge[0],ve=(We[8]+1)/We[0],rt=wt*Ce,xe=wt*ve,ke=Ae/(-Ce+ve),Mt=ke*-Ce;if(Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Mt),Y.translateZ(ke),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),ge[10]===-1)Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const pt=wt+ke,E=A+ke,v=rt-Mt,F=xe+(Ae-Mt),G=st*A/E*pt,$=Fe*A/E*pt;Y.projectionMatrix.makePerspective(v,F,G,$,pt,E),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Se(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Z=Y.near,pe=Y.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),O.near=S.near=M.near=Z,O.far=S.far=M.far=pe,(z!==O.near||X!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),z=O.near,X=O.far),O.layers.mask=Y.layers.mask|6,M.layers.mask=O.layers.mask&3,S.layers.mask=O.layers.mask&5;const Ae=Y.parent,ge=O.cameras;Se(O,Ae);for(let We=0;We<ge.length;We++)Se(ge[We],Ae);ge.length===2?de(O,M,S):O.projectionMatrix.copy(M.projectionMatrix),Oe(Y,O,Ae)};function Oe(Y,Z,pe){pe===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(pe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ar*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(Y){return f[Y]};let $e=null;function et(Y,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){const pe=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Ae=!1;pe.length!==O.cameras.length&&(O.cameras.length=0,Ae=!0);for(let A=0;A<pe.length;A++){const st=pe[A];let Fe=null;if(p!==null)Fe=p.getViewport(st);else{const ve=d.getViewSubImage(u,st);Fe=ve.viewport,A===0&&(e.setRenderTargetTextures(y,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(y))}let Ce=P[A];Ce===void 0&&(Ce=new En,Ce.layers.enable(A),Ce.viewport=new ht,P[A]=Ce),Ce.matrix.fromArray(st.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(st.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),A===0&&(O.matrix.copy(Ce.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ae===!0&&O.cameras.push(Ce)}const ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const A=d.getDepthInformation(pe[0]);A&&A.isValid&&A.texture&&m.init(A,s.renderState)}if(ge&&ge.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let A=0;A<pe.length;A++){const st=pe[A].camera;if(st){let Fe=f[st];Fe||(Fe=new hu,f[st]=Fe);const Ce=d.getCameraImage(st);Fe.sourceTexture=Ce}}}}for(let pe=0;pe<R.length;pe++){const Ae=T[pe],ge=R[pe];Ae!==null&&ge!==void 0&&ge.update(Ae,Z,c||o)}$e&&$e(Y,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const qe=new uu;qe.setAnimationLoop(et),this.setAnimationLoop=function(Y){$e=Y},this.dispose=function(){}}}const Bi=new Qn,d0=new ft;function u0(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,ou(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,w,b,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,w,b):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ln&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ln&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const w=e.get(f),b=w.envMap,y=w.envMapRotation;b&&(m.envMap.value=b,Bi.copy(y),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),m.envMapRotation.value.setFromMatrix4(d0.makeRotationFromEuler(Bi)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,w,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ln&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const w=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function f0(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,b){const y=b.program;i.uniformBlockBinding(w,y)}function c(w,b){let y=s[w.id];y===void 0&&(g(w),y=h(w),s[w.id]=y,w.addEventListener("dispose",m));const R=b.program;i.updateUBOMapping(w,R);const T=e.render.frame;r[w.id]!==T&&(u(w),r[w.id]=T)}function h(w){const b=d();w.__bindingPointIndex=b;const y=n.createBuffer(),R=w.__size,T=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,R,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,y),y}function d(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){const b=s[w.id],y=w.uniforms,R=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let T=0,C=y.length;T<C;T++){const U=Array.isArray(y[T])?y[T]:[y[T]];for(let M=0,S=U.length;M<S;M++){const P=U[M];if(p(P,T,M,R)===!0){const O=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let X=0;for(let j=0;j<z.length;j++){const W=z[j],te=_(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,O+X,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,X),X+=te.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,b,y,R){const T=w.value,C=b+"_"+y;if(R[C]===void 0)return typeof T=="number"||typeof T=="boolean"?R[C]=T:R[C]=T.clone(),!0;{const U=R[C];if(typeof T=="number"||typeof T=="boolean"){if(U!==T)return R[C]=T,!0}else if(U.equals(T)===!1)return U.copy(T),!0}return!1}function g(w){const b=w.uniforms;let y=0;const R=16;for(let C=0,U=b.length;C<U;C++){const M=Array.isArray(b[C])?b[C]:[b[C]];for(let S=0,P=M.length;S<P;S++){const O=M[S],z=Array.isArray(O.value)?O.value:[O.value];for(let X=0,j=z.length;X<j;X++){const W=z[X],te=_(W),H=y%R,Q=H%te.boundary,de=H+Q;y+=Q,de!==0&&R-de<te.storage&&(y+=R-de),O.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=te.storage}}}const T=y%R;return T>0&&(y+=R-T),w.__size=y,w.__cache={},this}function _(w){const b={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),b}function m(w){const b=w.target;b.removeEventListener("dispose",m);const y=o.indexOf(b.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(const w in s)n.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class p0{constructor(e={}){const{canvas:t=Np(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const w=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let R=!1;this._outputColorSpace=pn;let T=0,C=0,U=null,M=-1,S=null;const P=new ht,O=new ht;let z=null;const X=new Ge(0);let j=0,W=t.width,te=t.height,H=1,Q=null,de=null;const Se=new ht(0,0,W,te),Oe=new ht(0,0,W,te);let $e=!1;const et=new ic;let qe=!1,Y=!1;const Z=new ft,pe=new L,Ae=new ht,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function wt(){return U===null?H:1}let A=i;function st(x,I){return t.getContext(x,I)}try{const x={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wl}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",ee,!1),A===null){const I="webgl2";if(A=st(I,x),A===null)throw st(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Fe,Ce,ve,rt,xe,ke,Mt,pt,E,v,F,G,$,V,Me,se,_e,we,ne,ue,De,Te,ce,Ue;function D(){Fe=new Ev(A),Fe.init(),Te=new a0(A,Fe),Ce=new _v(A,Fe,e,Te),ve=new s0(A,Fe),Ce.reversedDepthBuffer&&u&&ve.buffers.depth.setReversed(!0),rt=new Av(A),xe=new Xx,ke=new r0(A,Fe,ve,xe,Ce,Te,rt),Mt=new xv(y),pt=new bv(y),E=new Im(A),ce=new mv(A,E),v=new wv(A,E,rt,ce),F=new Cv(A,v,E,rt),ne=new Rv(A,Ce,ke),se=new vv(xe),G=new Wx(y,Mt,pt,Fe,Ce,ce,se),$=new u0(y,xe),V=new Yx,Me=new Qx(Fe),we=new pv(y,Mt,pt,ve,F,p,l),_e=new n0(y,F,Ce),Ue=new f0(A,rt,Ce,ve),ue=new gv(A,Fe,rt),De=new Tv(A,Fe,rt),rt.programs=G.programs,y.capabilities=Ce,y.extensions=Fe,y.properties=xe,y.renderLists=V,y.shadowMap=_e,y.state=ve,y.info=rt}D();const J=new h0(y,A);this.xr=J,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const x=Fe.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Fe.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(W,te,!1))},this.getSize=function(x){return x.set(W,te)},this.setSize=function(x,I,k=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=x,te=I,t.width=Math.floor(x*H),t.height=Math.floor(I*H),k===!0&&(t.style.width=x+"px",t.style.height=I+"px"),this.setViewport(0,0,x,I)},this.getDrawingBufferSize=function(x){return x.set(W*H,te*H).floor()},this.setDrawingBufferSize=function(x,I,k){W=x,te=I,H=k,t.width=Math.floor(x*k),t.height=Math.floor(I*k),this.setViewport(0,0,x,I)},this.getCurrentViewport=function(x){return x.copy(P)},this.getViewport=function(x){return x.copy(Se)},this.setViewport=function(x,I,k,B){x.isVector4?Se.set(x.x,x.y,x.z,x.w):Se.set(x,I,k,B),ve.viewport(P.copy(Se).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(Oe)},this.setScissor=function(x,I,k,B){x.isVector4?Oe.set(x.x,x.y,x.z,x.w):Oe.set(x,I,k,B),ve.scissor(O.copy(Oe).multiplyScalar(H).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(x){ve.setScissorTest($e=x)},this.setOpaqueSort=function(x){Q=x},this.setTransparentSort=function(x){de=x},this.getClearColor=function(x){return x.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor(...arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha(...arguments)},this.clear=function(x=!0,I=!0,k=!0){let B=0;if(x){let N=!1;if(U!==null){const ie=U.texture.format;N=ie===$l||ie===Zl||ie===Kl}if(N){const ie=U.texture.type,fe=ie===Jn||ie===ji||ie===sr||ie===Ds||ie===ql||ie===Yl,be=we.getClearColor(),me=we.getClearAlpha(),Le=be.r,Ne=be.g,Re=be.b;fe?(g[0]=Le,g[1]=Ne,g[2]=Re,g[3]=me,A.clearBufferuiv(A.COLOR,0,g)):(_[0]=Le,_[1]=Ne,_[2]=Re,_[3]=me,A.clearBufferiv(A.COLOR,0,_))}else B|=A.COLOR_BUFFER_BIT}I&&(B|=A.DEPTH_BUFFER_BIT),k&&(B|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),we.dispose(),V.dispose(),Me.dispose(),xe.dispose(),Mt.dispose(),pt.dispose(),F.dispose(),ce.dispose(),Ue.dispose(),G.dispose(),J.dispose(),J.removeEventListener("sessionstart",kn),J.removeEventListener("sessionend",Rc),Di.stop()};function ae(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const x=rt.autoReset,I=_e.enabled,k=_e.autoUpdate,B=_e.needsUpdate,N=_e.type;D(),rt.autoReset=x,_e.enabled=I,_e.autoUpdate=k,_e.needsUpdate=B,_e.type=N}function ee(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function K(x){const I=x.target;I.removeEventListener("dispose",K),Ee(I)}function Ee(x){ze(x),xe.remove(x)}function ze(x){const I=xe.get(x).programs;I!==void 0&&(I.forEach(function(k){G.releaseProgram(k)}),x.isShaderMaterial&&G.releaseShaderCache(x))}this.renderBufferDirect=function(x,I,k,B,N,ie){I===null&&(I=ge);const fe=N.isMesh&&N.matrixWorld.determinant()<0,be=$u(x,I,k,B,N);ve.setMaterial(B,fe);let me=k.index,Le=1;if(B.wireframe===!0){if(me=v.getWireframeAttribute(k),me===void 0)return;Le=2}const Ne=k.drawRange,Re=k.attributes.position;let Xe=Ne.start*Le,at=(Ne.start+Ne.count)*Le;ie!==null&&(Xe=Math.max(Xe,ie.start*Le),at=Math.min(at,(ie.start+ie.count)*Le)),me!==null?(Xe=Math.max(Xe,0),at=Math.min(at,me.count)):Re!=null&&(Xe=Math.max(Xe,0),at=Math.min(at,Re.count));const bt=at-Xe;if(bt<0||bt===1/0)return;ce.setup(N,B,be,k,me);let mt,ct=ue;if(me!==null&&(mt=E.get(me),ct=De,ct.setIndex(mt)),N.isMesh)B.wireframe===!0?(ve.setLineWidth(B.wireframeLinewidth*wt()),ct.setMode(A.LINES)):ct.setMode(A.TRIANGLES);else if(N.isLine){let Pe=B.linewidth;Pe===void 0&&(Pe=1),ve.setLineWidth(Pe*wt()),N.isLineSegments?ct.setMode(A.LINES):N.isLineLoop?ct.setMode(A.LINE_LOOP):ct.setMode(A.LINE_STRIP)}else N.isPoints?ct.setMode(A.POINTS):N.isSprite&&ct.setMode(A.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)or("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Fe.get("WEBGL_multi_draw"))ct.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Pe=N._multiDrawStarts,yt=N._multiDrawCounts,Ze=N._multiDrawCount,hn=me?E.get(me).bytesPerElement:1,ts=xe.get(B).currentProgram.getUniforms();for(let dn=0;dn<Ze;dn++)ts.setValue(A,"_gl_DrawID",dn),ct.render(Pe[dn]/hn,yt[dn])}else if(N.isInstancedMesh)ct.renderInstances(Xe,bt,N.count);else if(k.isInstancedBufferGeometry){const Pe=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,yt=Math.min(k.instanceCount,Pe);ct.renderInstances(Xe,bt,yt)}else ct.render(Xe,bt)};function ut(x,I,k){x.transparent===!0&&x.side===on&&x.forceSinglePass===!1?(x.side=ln,x.needsUpdate=!0,gr(x,I,k),x.side=Ci,x.needsUpdate=!0,gr(x,I,k),x.side=on):gr(x,I,k)}this.compile=function(x,I,k=null){k===null&&(k=x),f=Me.get(k),f.init(I),b.push(f),k.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),x!==k&&x.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),f.setupLights();const B=new Set;return x.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ie=N.material;if(ie)if(Array.isArray(ie))for(let fe=0;fe<ie.length;fe++){const be=ie[fe];ut(be,k,N),B.add(be)}else ut(ie,k,N),B.add(ie)}),f=b.pop(),B},this.compileAsync=function(x,I,k=null){const B=this.compile(x,I,k);return new Promise(N=>{function ie(){if(B.forEach(function(fe){xe.get(fe).currentProgram.isReady()&&B.delete(fe)}),B.size===0){N(x);return}setTimeout(ie,10)}Fe.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let Qe=null;function ei(x){Qe&&Qe(x)}function kn(){Di.stop()}function Rc(){Di.start()}const Di=new uu;Di.setAnimationLoop(ei),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(x){Qe=x,J.setAnimationLoop(x),x===null?Di.stop():Di.start()},J.addEventListener("sessionstart",kn),J.addEventListener("sessionend",Rc),this.render=function(x,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(I),I=J.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,I,U),f=Me.get(x,b.length),f.init(I),b.push(f),Z.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),et.setFromProjectionMatrix(Z,Yn,I.reversedDepth),Y=this.localClippingEnabled,qe=se.init(this.clippingPlanes,Y),m=V.get(x,w.length),m.init(),w.push(m),J.enabled===!0&&J.isPresenting===!0){const ie=y.xr.getDepthSensingMesh();ie!==null&&Ha(ie,I,-1/0,y.sortObjects)}Ha(x,I,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(Q,de),We=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,We&&we.addToRenderList(m,x),this.info.render.frame++,qe===!0&&se.beginShadows();const k=f.state.shadowsArray;_e.render(k,x,I),qe===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,N=m.transmissive;if(f.setupLights(),I.isArrayCamera){const ie=I.cameras;if(N.length>0)for(let fe=0,be=ie.length;fe<be;fe++){const me=ie[fe];Pc(B,N,x,me)}We&&we.render(x);for(let fe=0,be=ie.length;fe<be;fe++){const me=ie[fe];Cc(m,x,me,me.viewport)}}else N.length>0&&Pc(B,N,x,I),We&&we.render(x),Cc(m,x,I);U!==null&&C===0&&(ke.updateMultisampleRenderTarget(U),ke.updateRenderTargetMipmap(U)),x.isScene===!0&&x.onAfterRender(y,x,I),ce.resetDefaultState(),M=-1,S=null,b.pop(),b.length>0?(f=b[b.length-1],qe===!0&&se.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Ha(x,I,k,B){if(x.visible===!1)return;if(x.layers.test(I.layers)){if(x.isGroup)k=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(I);else if(x.isLight)f.pushLight(x),x.castShadow&&f.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||et.intersectsSprite(x)){B&&Ae.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Z);const fe=F.update(x),be=x.material;be.visible&&m.push(x,fe,be,k,Ae.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||et.intersectsObject(x))){const fe=F.update(x),be=x.material;if(B&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ae.copy(x.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Ae.copy(fe.boundingSphere.center)),Ae.applyMatrix4(x.matrixWorld).applyMatrix4(Z)),Array.isArray(be)){const me=fe.groups;for(let Le=0,Ne=me.length;Le<Ne;Le++){const Re=me[Le],Xe=be[Re.materialIndex];Xe&&Xe.visible&&m.push(x,fe,Xe,k,Ae.z,Re)}}else be.visible&&m.push(x,fe,be,k,Ae.z,null)}}const ie=x.children;for(let fe=0,be=ie.length;fe<be;fe++)Ha(ie[fe],I,k,B)}function Cc(x,I,k,B){const N=x.opaque,ie=x.transmissive,fe=x.transparent;f.setupLightsView(k),qe===!0&&se.setGlobalState(y.clippingPlanes,k),B&&ve.viewport(P.copy(B)),N.length>0&&mr(N,I,k),ie.length>0&&mr(ie,I,k),fe.length>0&&mr(fe,I,k),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Pc(x,I,k,B){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[B.id]===void 0&&(f.state.transmissionRenderTarget[B.id]=new Dn(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float")?pi:Jn,minFilter:Wi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));const ie=f.state.transmissionRenderTarget[B.id],fe=B.viewport||P;ie.setSize(fe.z*y.transmissionResolutionScale,fe.w*y.transmissionResolutionScale);const be=y.getRenderTarget(),me=y.getActiveCubeFace(),Le=y.getActiveMipmapLevel();y.setRenderTarget(ie),y.getClearColor(X),j=y.getClearAlpha(),j<1&&y.setClearColor(16777215,.5),y.clear(),We&&we.render(k);const Ne=y.toneMapping;y.toneMapping=Ai;const Re=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),f.setupLightsView(B),qe===!0&&se.setGlobalState(y.clippingPlanes,B),mr(x,k,B),ke.updateMultisampleRenderTarget(ie),ke.updateRenderTargetMipmap(ie),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let at=0,bt=I.length;at<bt;at++){const mt=I[at],ct=mt.object,Pe=mt.geometry,yt=mt.material,Ze=mt.group;if(yt.side===on&&ct.layers.test(B.layers)){const hn=yt.side;yt.side=ln,yt.needsUpdate=!0,Dc(ct,k,B,Pe,yt,Ze),yt.side=hn,yt.needsUpdate=!0,Xe=!0}}Xe===!0&&(ke.updateMultisampleRenderTarget(ie),ke.updateRenderTargetMipmap(ie))}y.setRenderTarget(be,me,Le),y.setClearColor(X,j),Re!==void 0&&(B.viewport=Re),y.toneMapping=Ne}function mr(x,I,k){const B=I.isScene===!0?I.overrideMaterial:null;for(let N=0,ie=x.length;N<ie;N++){const fe=x[N],be=fe.object,me=fe.geometry,Le=fe.group;let Ne=fe.material;Ne.allowOverride===!0&&B!==null&&(Ne=B),be.layers.test(k.layers)&&Dc(be,I,k,me,Ne,Le)}}function Dc(x,I,k,B,N,ie){x.onBeforeRender(y,I,k,B,N,ie),x.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),N.onBeforeRender(y,I,k,B,x,ie),N.transparent===!0&&N.side===on&&N.forceSinglePass===!1?(N.side=ln,N.needsUpdate=!0,y.renderBufferDirect(k,I,B,N,x,ie),N.side=Ci,N.needsUpdate=!0,y.renderBufferDirect(k,I,B,N,x,ie),N.side=on):y.renderBufferDirect(k,I,B,N,x,ie),x.onAfterRender(y,I,k,B,N,ie)}function gr(x,I,k){I.isScene!==!0&&(I=ge);const B=xe.get(x),N=f.state.lights,ie=f.state.shadowsArray,fe=N.state.version,be=G.getParameters(x,N.state,ie,I,k),me=G.getProgramCacheKey(be);let Le=B.programs;B.environment=x.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(x.isMeshStandardMaterial?pt:Mt).get(x.envMap||B.environment),B.envMapRotation=B.environment!==null&&x.envMap===null?I.environmentRotation:x.envMapRotation,Le===void 0&&(x.addEventListener("dispose",K),Le=new Map,B.programs=Le);let Ne=Le.get(me);if(Ne!==void 0){if(B.currentProgram===Ne&&B.lightsStateVersion===fe)return Ic(x,be),Ne}else be.uniforms=G.getUniforms(x),x.onBeforeCompile(be,y),Ne=G.acquireProgram(be,me),Le.set(me,Ne),B.uniforms=be.uniforms;const Re=B.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Re.clippingPlanes=se.uniform),Ic(x,be),B.needsLights=Qu(x),B.lightsStateVersion=fe,B.needsLights&&(Re.ambientLightColor.value=N.state.ambient,Re.lightProbe.value=N.state.probe,Re.directionalLights.value=N.state.directional,Re.directionalLightShadows.value=N.state.directionalShadow,Re.spotLights.value=N.state.spot,Re.spotLightShadows.value=N.state.spotShadow,Re.rectAreaLights.value=N.state.rectArea,Re.ltc_1.value=N.state.rectAreaLTC1,Re.ltc_2.value=N.state.rectAreaLTC2,Re.pointLights.value=N.state.point,Re.pointLightShadows.value=N.state.pointShadow,Re.hemisphereLights.value=N.state.hemi,Re.directionalShadowMap.value=N.state.directionalShadowMap,Re.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Re.spotShadowMap.value=N.state.spotShadowMap,Re.spotLightMatrix.value=N.state.spotLightMatrix,Re.spotLightMap.value=N.state.spotLightMap,Re.pointShadowMap.value=N.state.pointShadowMap,Re.pointShadowMatrix.value=N.state.pointShadowMatrix),B.currentProgram=Ne,B.uniformsList=null,Ne}function Lc(x){if(x.uniformsList===null){const I=x.currentProgram.getUniforms();x.uniformsList=ia.seqWithValue(I.seq,x.uniforms)}return x.uniformsList}function Ic(x,I){const k=xe.get(x);k.outputColorSpace=I.outputColorSpace,k.batching=I.batching,k.batchingColor=I.batchingColor,k.instancing=I.instancing,k.instancingColor=I.instancingColor,k.instancingMorph=I.instancingMorph,k.skinning=I.skinning,k.morphTargets=I.morphTargets,k.morphNormals=I.morphNormals,k.morphColors=I.morphColors,k.morphTargetsCount=I.morphTargetsCount,k.numClippingPlanes=I.numClippingPlanes,k.numIntersection=I.numClipIntersection,k.vertexAlphas=I.vertexAlphas,k.vertexTangents=I.vertexTangents,k.toneMapping=I.toneMapping}function $u(x,I,k,B,N){I.isScene!==!0&&(I=ge),ke.resetTextureUnits();const ie=I.fog,fe=B.isMeshStandardMaterial?I.environment:null,be=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Is,me=(B.isMeshStandardMaterial?pt:Mt).get(B.envMap||fe),Le=B.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ne=!!k.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Re=!!k.morphAttributes.position,Xe=!!k.morphAttributes.normal,at=!!k.morphAttributes.color;let bt=Ai;B.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(bt=y.toneMapping);const mt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ct=mt!==void 0?mt.length:0,Pe=xe.get(B),yt=f.state.lights;if(qe===!0&&(Y===!0||x!==S)){const qt=x===S&&B.id===M;se.setState(B,x,qt)}let Ze=!1;B.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==yt.state.version||Pe.outputColorSpace!==be||N.isBatchedMesh&&Pe.batching===!1||!N.isBatchedMesh&&Pe.batching===!0||N.isBatchedMesh&&Pe.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Pe.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Pe.instancing===!1||!N.isInstancedMesh&&Pe.instancing===!0||N.isSkinnedMesh&&Pe.skinning===!1||!N.isSkinnedMesh&&Pe.skinning===!0||N.isInstancedMesh&&Pe.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Pe.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Pe.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Pe.instancingMorph===!1&&N.morphTexture!==null||Pe.envMap!==me||B.fog===!0&&Pe.fog!==ie||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==se.numPlanes||Pe.numIntersection!==se.numIntersection)||Pe.vertexAlphas!==Le||Pe.vertexTangents!==Ne||Pe.morphTargets!==Re||Pe.morphNormals!==Xe||Pe.morphColors!==at||Pe.toneMapping!==bt||Pe.morphTargetsCount!==ct)&&(Ze=!0):(Ze=!0,Pe.__version=B.version);let hn=Pe.currentProgram;Ze===!0&&(hn=gr(B,I,N));let ts=!1,dn=!1,zs=!1;const St=hn.getUniforms(),mn=Pe.uniforms;if(ve.useProgram(hn.program)&&(ts=!0,dn=!0,zs=!0),B.id!==M&&(M=B.id,dn=!0),ts||S!==x){ve.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),St.setValue(A,"projectionMatrix",x.projectionMatrix),St.setValue(A,"viewMatrix",x.matrixWorldInverse);const sn=St.map.cameraPosition;sn!==void 0&&sn.setValue(A,pe.setFromMatrixPosition(x.matrixWorld)),Ce.logarithmicDepthBuffer&&St.setValue(A,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&St.setValue(A,"isOrthographic",x.isOrthographicCamera===!0),S!==x&&(S=x,dn=!0,zs=!0)}if(N.isSkinnedMesh){St.setOptional(A,N,"bindMatrix"),St.setOptional(A,N,"bindMatrixInverse");const qt=N.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),St.setValue(A,"boneTexture",qt.boneTexture,ke))}N.isBatchedMesh&&(St.setOptional(A,N,"batchingTexture"),St.setValue(A,"batchingTexture",N._matricesTexture,ke),St.setOptional(A,N,"batchingIdTexture"),St.setValue(A,"batchingIdTexture",N._indirectTexture,ke),St.setOptional(A,N,"batchingColorTexture"),N._colorsTexture!==null&&St.setValue(A,"batchingColorTexture",N._colorsTexture,ke));const gn=k.morphAttributes;if((gn.position!==void 0||gn.normal!==void 0||gn.color!==void 0)&&ne.update(N,k,hn),(dn||Pe.receiveShadow!==N.receiveShadow)&&(Pe.receiveShadow=N.receiveShadow,St.setValue(A,"receiveShadow",N.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(mn.envMap.value=me,mn.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&I.environment!==null&&(mn.envMapIntensity.value=I.environmentIntensity),dn&&(St.setValue(A,"toneMappingExposure",y.toneMappingExposure),Pe.needsLights&&Ju(mn,zs),ie&&B.fog===!0&&$.refreshFogUniforms(mn,ie),$.refreshMaterialUniforms(mn,B,H,te,f.state.transmissionRenderTarget[x.id]),ia.upload(A,Lc(Pe),mn,ke)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ia.upload(A,Lc(Pe),mn,ke),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&St.setValue(A,"center",N.center),St.setValue(A,"modelViewMatrix",N.modelViewMatrix),St.setValue(A,"normalMatrix",N.normalMatrix),St.setValue(A,"modelMatrix",N.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const qt=B.uniformsGroups;for(let sn=0,Va=qt.length;sn<Va;sn++){const Li=qt[sn];Ue.update(Li,hn),Ue.bind(Li,hn)}}return hn}function Ju(x,I){x.ambientLightColor.needsUpdate=I,x.lightProbe.needsUpdate=I,x.directionalLights.needsUpdate=I,x.directionalLightShadows.needsUpdate=I,x.pointLights.needsUpdate=I,x.pointLightShadows.needsUpdate=I,x.spotLights.needsUpdate=I,x.spotLightShadows.needsUpdate=I,x.rectAreaLights.needsUpdate=I,x.hemisphereLights.needsUpdate=I}function Qu(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(x,I,k){const B=xe.get(x);B.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),xe.get(x.texture).__webglTexture=I,xe.get(x.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:k,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,I){const k=xe.get(x);k.__webglFramebuffer=I,k.__useDefaultFramebuffer=I===void 0};const ef=A.createFramebuffer();this.setRenderTarget=function(x,I=0,k=0){U=x,T=I,C=k;let B=!0,N=null,ie=!1,fe=!1;if(x){const me=xe.get(x);if(me.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(A.FRAMEBUFFER,null),B=!1;else if(me.__webglFramebuffer===void 0)ke.setupRenderTarget(x);else if(me.__hasExternalTextures)ke.rebindTextures(x,xe.get(x.texture).__webglTexture,xe.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Re=x.depthTexture;if(me.__boundDepthTexture!==Re){if(Re!==null&&xe.has(Re)&&(x.width!==Re.image.width||x.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ke.setupDepthRenderbuffer(x)}}const Le=x.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(fe=!0);const Ne=xe.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ne[I])?N=Ne[I][k]:N=Ne[I],ie=!0):x.samples>0&&ke.useMultisampledRTT(x)===!1?N=xe.get(x).__webglMultisampledFramebuffer:Array.isArray(Ne)?N=Ne[k]:N=Ne,P.copy(x.viewport),O.copy(x.scissor),z=x.scissorTest}else P.copy(Se).multiplyScalar(H).floor(),O.copy(Oe).multiplyScalar(H).floor(),z=$e;if(k!==0&&(N=ef),ve.bindFramebuffer(A.FRAMEBUFFER,N)&&B&&ve.drawBuffers(x,N),ve.viewport(P),ve.scissor(O),ve.setScissorTest(z),ie){const me=xe.get(x.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+I,me.__webglTexture,k)}else if(fe){const me=I;for(let Le=0;Le<x.textures.length;Le++){const Ne=xe.get(x.textures[Le]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Le,Ne.__webglTexture,k,me)}}else if(x!==null&&k!==0){const me=xe.get(x.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,me.__webglTexture,k)}M=-1},this.readRenderTargetPixels=function(x,I,k,B,N,ie,fe,be=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=xe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(me=me[fe]),me){ve.bindFramebuffer(A.FRAMEBUFFER,me);try{const Le=x.textures[be],Ne=Le.format,Re=Le.type;if(!Ce.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=x.width-B&&k>=0&&k<=x.height-N&&(x.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+be),A.readPixels(I,k,B,N,Te.convert(Ne),Te.convert(Re),ie))}finally{const Le=U!==null?xe.get(U).__webglFramebuffer:null;ve.bindFramebuffer(A.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(x,I,k,B,N,ie,fe,be=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=xe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(me=me[fe]),me)if(I>=0&&I<=x.width-B&&k>=0&&k<=x.height-N){ve.bindFramebuffer(A.FRAMEBUFFER,me);const Le=x.textures[be],Ne=Le.format,Re=Le.type;if(!Ce.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xe=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Xe),A.bufferData(A.PIXEL_PACK_BUFFER,ie.byteLength,A.STREAM_READ),x.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+be),A.readPixels(I,k,B,N,Te.convert(Ne),Te.convert(Re),0);const at=U!==null?xe.get(U).__webglFramebuffer:null;ve.bindFramebuffer(A.FRAMEBUFFER,at);const bt=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await Fp(A,bt,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Xe),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,ie),A.deleteBuffer(Xe),A.deleteSync(bt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,I=null,k=0){const B=Math.pow(2,-k),N=Math.floor(x.image.width*B),ie=Math.floor(x.image.height*B),fe=I!==null?I.x:0,be=I!==null?I.y:0;ke.setTexture2D(x,0),A.copyTexSubImage2D(A.TEXTURE_2D,k,0,0,fe,be,N,ie),ve.unbindTexture()};const tf=A.createFramebuffer(),nf=A.createFramebuffer();this.copyTextureToTexture=function(x,I,k=null,B=null,N=0,ie=null){ie===null&&(N!==0?(or("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=N,N=0):ie=0);let fe,be,me,Le,Ne,Re,Xe,at,bt;const mt=x.isCompressedTexture?x.mipmaps[ie]:x.image;if(k!==null)fe=k.max.x-k.min.x,be=k.max.y-k.min.y,me=k.isBox3?k.max.z-k.min.z:1,Le=k.min.x,Ne=k.min.y,Re=k.isBox3?k.min.z:0;else{const gn=Math.pow(2,-N);fe=Math.floor(mt.width*gn),be=Math.floor(mt.height*gn),x.isDataArrayTexture?me=mt.depth:x.isData3DTexture?me=Math.floor(mt.depth*gn):me=1,Le=0,Ne=0,Re=0}B!==null?(Xe=B.x,at=B.y,bt=B.z):(Xe=0,at=0,bt=0);const ct=Te.convert(I.format),Pe=Te.convert(I.type);let yt;I.isData3DTexture?(ke.setTexture3D(I,0),yt=A.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(ke.setTexture2DArray(I,0),yt=A.TEXTURE_2D_ARRAY):(ke.setTexture2D(I,0),yt=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,I.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,I.unpackAlignment);const Ze=A.getParameter(A.UNPACK_ROW_LENGTH),hn=A.getParameter(A.UNPACK_IMAGE_HEIGHT),ts=A.getParameter(A.UNPACK_SKIP_PIXELS),dn=A.getParameter(A.UNPACK_SKIP_ROWS),zs=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,mt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,mt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Le),A.pixelStorei(A.UNPACK_SKIP_ROWS,Ne),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Re);const St=x.isDataArrayTexture||x.isData3DTexture,mn=I.isDataArrayTexture||I.isData3DTexture;if(x.isDepthTexture){const gn=xe.get(x),qt=xe.get(I),sn=xe.get(gn.__renderTarget),Va=xe.get(qt.__renderTarget);ve.bindFramebuffer(A.READ_FRAMEBUFFER,sn.__webglFramebuffer),ve.bindFramebuffer(A.DRAW_FRAMEBUFFER,Va.__webglFramebuffer);for(let Li=0;Li<me;Li++)St&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,xe.get(x).__webglTexture,N,Re+Li),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,xe.get(I).__webglTexture,ie,bt+Li)),A.blitFramebuffer(Le,Ne,fe,be,Xe,at,fe,be,A.DEPTH_BUFFER_BIT,A.NEAREST);ve.bindFramebuffer(A.READ_FRAMEBUFFER,null),ve.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(N!==0||x.isRenderTargetTexture||xe.has(x)){const gn=xe.get(x),qt=xe.get(I);ve.bindFramebuffer(A.READ_FRAMEBUFFER,tf),ve.bindFramebuffer(A.DRAW_FRAMEBUFFER,nf);for(let sn=0;sn<me;sn++)St?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,gn.__webglTexture,N,Re+sn):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,gn.__webglTexture,N),mn?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,qt.__webglTexture,ie,bt+sn):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,qt.__webglTexture,ie),N!==0?A.blitFramebuffer(Le,Ne,fe,be,Xe,at,fe,be,A.COLOR_BUFFER_BIT,A.NEAREST):mn?A.copyTexSubImage3D(yt,ie,Xe,at,bt+sn,Le,Ne,fe,be):A.copyTexSubImage2D(yt,ie,Xe,at,Le,Ne,fe,be);ve.bindFramebuffer(A.READ_FRAMEBUFFER,null),ve.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else mn?x.isDataTexture||x.isData3DTexture?A.texSubImage3D(yt,ie,Xe,at,bt,fe,be,me,ct,Pe,mt.data):I.isCompressedArrayTexture?A.compressedTexSubImage3D(yt,ie,Xe,at,bt,fe,be,me,ct,mt.data):A.texSubImage3D(yt,ie,Xe,at,bt,fe,be,me,ct,Pe,mt):x.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,ie,Xe,at,fe,be,ct,Pe,mt.data):x.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,ie,Xe,at,mt.width,mt.height,ct,mt.data):A.texSubImage2D(A.TEXTURE_2D,ie,Xe,at,fe,be,ct,Pe,mt);A.pixelStorei(A.UNPACK_ROW_LENGTH,Ze),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,hn),A.pixelStorei(A.UNPACK_SKIP_PIXELS,ts),A.pixelStorei(A.UNPACK_SKIP_ROWS,dn),A.pixelStorei(A.UNPACK_SKIP_IMAGES,zs),ie===0&&I.generateMipmaps&&A.generateMipmap(yt),ve.unbindTexture()},this.initRenderTarget=function(x){xe.get(x).__webglFramebuffer===void 0&&ke.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?ke.setTextureCube(x,0):x.isData3DTexture?ke.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?ke.setTexture2DArray(x,0):ke.setTexture2D(x,0),ve.unbindTexture()},this.resetState=function(){T=0,C=0,U=null,ve.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const $h={type:"change"},lc={type:"start"},_u={type:"end"},Wr=new Pa,Jh=new Mi,m0=Math.cos(70*ec.DEG2RAD),Pt=new L,rn=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ao=1e-6;class g0 extends Dm{constructor(e,t=null){super(e,t),this.state=ot.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ci.ROTATE,MIDDLE:ci.DOLLY,RIGHT:ci.PAN},this.touches={ONE:ys.ROTATE,TWO:ys.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Ki,this._lastTargetPosition=new L,this._quat=new Ki().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Eh,this._sphericalDelta=new Eh,this._scale=1,this._panOffset=new L,this._rotateStart=new Ie,this._rotateEnd=new Ie,this._rotateDelta=new Ie,this._panStart=new Ie,this._panEnd=new Ie,this._panDelta=new Ie,this._dollyStart=new Ie,this._dollyEnd=new Ie,this._dollyDelta=new Ie,this._dollyDirection=new L,this._mouse=new Ie,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=v0.bind(this),this._onPointerDown=_0.bind(this),this._onPointerUp=x0.bind(this),this._onContextMenu=T0.bind(this),this._onMouseWheel=M0.bind(this),this._onKeyDown=b0.bind(this),this._onTouchStart=E0.bind(this),this._onTouchMove=w0.bind(this),this._onMouseDown=y0.bind(this),this._onMouseMove=S0.bind(this),this._interceptControlDown=A0.bind(this),this._interceptControlUp=R0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($h),this.update(),this.state=ot.NONE}update(e=null){const t=this.object.position;Pt.copy(t).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=rn:i>Math.PI&&(i-=rn),s<-Math.PI?s+=rn:s>Math.PI&&(s-=rn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Pt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Wr.origin.copy(this.object.position),Wr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Wr.direction))<m0?this.object.lookAt(this.target):(Jh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Wr.intersectPlane(Jh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ao||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ao||this._lastTargetPosition.distanceToSquared(this.target)>Ao?(this.dispatchEvent($h),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?rn/60*this.autoRotateSpeed*e:rn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pt.setFromMatrixColumn(t,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,t){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(t,1):(Pt.setFromMatrixColumn(t,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Pt.copy(s).sub(this.target);let r=Pt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/t.clientHeight),this._rotateUp(rn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/t.clientHeight),this._rotateUp(rn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ie,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function _0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function v0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function x0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_u),this.state=ot.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function y0(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ci.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ot.DOLLY;break;case ci.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ot.ROTATE}break;case ci.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(lc)}function S0(n){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function M0(n){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(n.preventDefault(),this.dispatchEvent(lc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(_u))}function b0(n){this.enabled!==!1&&this._handleKeyDown(n)}function E0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ys.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ot.TOUCH_ROTATE;break;case ys.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case ys.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ot.TOUCH_DOLLY_PAN;break;case ys.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(lc)}function w0(n){switch(this._trackPointer(n),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ot.NONE}}function T0(n){this.enabled!==!1&&n.preventDefault()}function A0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function R0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const sa={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Bs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const C0=new La(-1,1,1,-1,0,1);class P0 extends Xt{constructor(){super(),this.setAttribute("position",new xt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new xt([0,2,0,0,2,0],2))}}const D0=new P0;class cc{constructor(e){this._mesh=new Nt(D0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,C0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class L0 extends Bs{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Wt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=li.clone(e.uniforms),this.material=new Wt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new cc(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Qh extends Bs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class I0 extends Bs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class U0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Ie);this._width=i.width,this._height=i.height,t=new Dn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:pi}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new L0(sa),this.copyPass.material.blending=Zt,this.clock=new Em}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Qh!==void 0&&(o instanceof Qh?i=!0:o instanceof I0&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ie);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class N0 extends Bs{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ge}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}class F0{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,s,r;const o=.5*(Math.sqrt(3)-1),a=(e+t)*o,l=Math.floor(e+a),c=Math.floor(t+a),h=(3-Math.sqrt(3))/6,d=(l+c)*h,u=l-d,p=c-d,g=e-u,_=t-p;let m,f;g>_?(m=1,f=0):(m=0,f=1);const w=g-m+h,b=_-f+h,y=g-1+2*h,R=_-1+2*h,T=l&255,C=c&255,U=this.perm[T+this.perm[C]]%12,M=this.perm[T+m+this.perm[C+f]]%12,S=this.perm[T+1+this.perm[C+1]]%12;let P=.5-g*g-_*_;P<0?i=0:(P*=P,i=P*P*this._dot(this.grad3[U],g,_));let O=.5-w*w-b*b;O<0?s=0:(O*=O,s=O*O*this._dot(this.grad3[M],w,b));let z=.5-y*y-R*R;return z<0?r=0:(z*=z,r=z*z*this._dot(this.grad3[S],y,R)),70*(i+s+r)}noise3d(e,t,i){let s,r,o,a;const c=(e+t+i)*.3333333333333333,h=Math.floor(e+c),d=Math.floor(t+c),u=Math.floor(i+c),p=1/6,g=(h+d+u)*p,_=h-g,m=d-g,f=u-g,w=e-_,b=t-m,y=i-f;let R,T,C,U,M,S;w>=b?b>=y?(R=1,T=0,C=0,U=1,M=1,S=0):w>=y?(R=1,T=0,C=0,U=1,M=0,S=1):(R=0,T=0,C=1,U=1,M=0,S=1):b<y?(R=0,T=0,C=1,U=0,M=1,S=1):w<y?(R=0,T=1,C=0,U=0,M=1,S=1):(R=0,T=1,C=0,U=1,M=1,S=0);const P=w-R+p,O=b-T+p,z=y-C+p,X=w-U+2*p,j=b-M+2*p,W=y-S+2*p,te=w-1+3*p,H=b-1+3*p,Q=y-1+3*p,de=h&255,Se=d&255,Oe=u&255,$e=this.perm[de+this.perm[Se+this.perm[Oe]]]%12,et=this.perm[de+R+this.perm[Se+T+this.perm[Oe+C]]]%12,qe=this.perm[de+U+this.perm[Se+M+this.perm[Oe+S]]]%12,Y=this.perm[de+1+this.perm[Se+1+this.perm[Oe+1]]]%12;let Z=.6-w*w-b*b-y*y;Z<0?s=0:(Z*=Z,s=Z*Z*this._dot3(this.grad3[$e],w,b,y));let pe=.6-P*P-O*O-z*z;pe<0?r=0:(pe*=pe,r=pe*pe*this._dot3(this.grad3[et],P,O,z));let Ae=.6-X*X-j*j-W*W;Ae<0?o=0:(Ae*=Ae,o=Ae*Ae*this._dot3(this.grad3[qe],X,j,W));let ge=.6-te*te-H*H-Q*Q;return ge<0?a=0:(ge*=ge,a=ge*ge*this._dot3(this.grad3[Y],te,H,Q)),32*(s+r+o+a)}noise4d(e,t,i,s){const r=this.grad4,o=this.simplex,a=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,d,u,p,g;const _=(e+t+i+s)*l,m=Math.floor(e+_),f=Math.floor(t+_),w=Math.floor(i+_),b=Math.floor(s+_),y=(m+f+w+b)*c,R=m-y,T=f-y,C=w-y,U=b-y,M=e-R,S=t-T,P=i-C,O=s-U,z=M>S?32:0,X=M>P?16:0,j=S>P?8:0,W=M>O?4:0,te=S>O?2:0,H=P>O?1:0,Q=z+X+j+W+te+H,de=o[Q][0]>=3?1:0,Se=o[Q][1]>=3?1:0,Oe=o[Q][2]>=3?1:0,$e=o[Q][3]>=3?1:0,et=o[Q][0]>=2?1:0,qe=o[Q][1]>=2?1:0,Y=o[Q][2]>=2?1:0,Z=o[Q][3]>=2?1:0,pe=o[Q][0]>=1?1:0,Ae=o[Q][1]>=1?1:0,ge=o[Q][2]>=1?1:0,We=o[Q][3]>=1?1:0,wt=M-de+c,A=S-Se+c,st=P-Oe+c,Fe=O-$e+c,Ce=M-et+2*c,ve=S-qe+2*c,rt=P-Y+2*c,xe=O-Z+2*c,ke=M-pe+3*c,Mt=S-Ae+3*c,pt=P-ge+3*c,E=O-We+3*c,v=M-1+4*c,F=S-1+4*c,G=P-1+4*c,$=O-1+4*c,V=m&255,Me=f&255,se=w&255,_e=b&255,we=a[V+a[Me+a[se+a[_e]]]]%32,ne=a[V+de+a[Me+Se+a[se+Oe+a[_e+$e]]]]%32,ue=a[V+et+a[Me+qe+a[se+Y+a[_e+Z]]]]%32,De=a[V+pe+a[Me+Ae+a[se+ge+a[_e+We]]]]%32,Te=a[V+1+a[Me+1+a[se+1+a[_e+1]]]]%32;let ce=.6-M*M-S*S-P*P-O*O;ce<0?h=0:(ce*=ce,h=ce*ce*this._dot4(r[we],M,S,P,O));let Ue=.6-wt*wt-A*A-st*st-Fe*Fe;Ue<0?d=0:(Ue*=Ue,d=Ue*Ue*this._dot4(r[ne],wt,A,st,Fe));let D=.6-Ce*Ce-ve*ve-rt*rt-xe*xe;D<0?u=0:(D*=D,u=D*D*this._dot4(r[ue],Ce,ve,rt,xe));let J=.6-ke*ke-Mt*Mt-pt*pt-E*E;J<0?p=0:(J*=J,p=J*J*this._dot4(r[De],ke,Mt,pt,E));let ae=.6-v*v-F*F-G*G-$*$;return ae<0?g=0:(ae*=ae,g=ae*ae*this._dot4(r[Te],v,F,G,$)),27*(h+d+u+p+g)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,s){return e[0]*t+e[1]*i+e[2]*s}_dot4(e,t,i,s,r){return e[0]*t+e[1]*i+e[2]*s+e[3]*r}}const Xr={defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new Ie},cameraProjectionMatrix:{value:new ft},cameraInverseProjectionMatrix:{value:new ft},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == 1.0 ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background

			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},qr={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Yr={uniforms:{tDiffuse:{value:null},resolution:{value:new Ie}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};class wi extends Bs{constructor(e,t,i=512,s=512,r=32){super(),this.width=i,this.height=s,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=[],this._generateSampleKernel(r),this._generateRandomKernelRotations();const o=new rc;o.format=Ls,o.type=Ds,this.normalRenderTarget=new Dn(this.width,this.height,{minFilter:Jt,magFilter:Jt,type:pi,depthTexture:o}),this.ssaoRenderTarget=new Dn(this.width,this.height,{type:pi}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new Wt({defines:Object.assign({},Xr.defines),uniforms:li.clone(Xr.uniforms),vertexShader:Xr.vertexShader,fragmentShader:Xr.fragmentShader,blending:Zt}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new gm,this.normalMaterial.blending=Zt,this.blurMaterial=new Wt({defines:Object.assign({},Yr.defines),uniforms:li.clone(Yr.uniforms),vertexShader:Yr.vertexShader,fragmentShader:Yr.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Wt({defines:Object.assign({},qr.defines),uniforms:li.clone(qr.uniforms),vertexShader:qr.vertexShader,fragmentShader:qr.fragmentShader,blending:Zt}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Wt({uniforms:li.clone(sa.uniforms),vertexShader:sa.vertexShader,fragmentShader:sa.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:kd,blendDst:Vo,blendEquation:oi,blendSrcAlpha:Od,blendDstAlpha:Vo,blendEquationAlpha:oi}),this._fsQuad=new cc(null),this._originalClearColor=new Ge}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}render(e,t,i){switch(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this._renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this._renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case wi.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=Zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case wi.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case wi.OUTPUT.Depth:this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:i);break;case wi.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case wi.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Fd,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}_renderPass(e,t,i,s,r){e.getClearColor(this._originalClearColor);const o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_renderOverride(e,t,i,s,r){e.getClearColor(this._originalClearColor);const o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_generateSampleKernel(e){const t=this.kernel;for(let i=0;i<e;i++){const s=new L;s.x=Math.random()*2-1,s.y=Math.random()*2-1,s.z=Math.random(),s.normalize();let r=i/e;r=ec.lerp(.1,1,r*r),s.multiplyScalar(r),t.push(s)}}_generateRandomKernelRotations(){const i=new F0,s=16,r=new Float32Array(s);for(let o=0;o<s;o++){const a=Math.random()*2-1,l=Math.random()*2-1,c=0;r[o]=i.noise3d(a,l,c)}this.noiseTexture=new lm(r,4,4,jl,qn),this.noiseTexture.wrapS=ir,this.noiseTexture.wrapT=ir,this.noiseTexture.needsUpdate=!0}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}}wi.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};const jr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class O0 extends Bs{constructor(){super(),this.uniforms=li.clone(jr.uniforms),this.material=new pm({name:jr.name,uniforms:this.uniforms,vertexShader:jr.vertexShader,fragmentShader:jr.fragmentShader}),this._fsQuad=new cc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},je.getTransfer(this._outputColorSpace)===nt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===zd?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Hd?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Vd?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Gd?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Xd?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===qd?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Wd&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const ed=new Cn,Kr=new L;class vu extends Mm{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new xt(e,3)),this.setAttribute("uv",new xt(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Pl(t,6,1);return this.setAttribute("instanceStart",new Ti(i,3,0)),this.setAttribute("instanceEnd",new Ti(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Pl(t,6,1);return this.setAttribute("instanceColorStart",new Ti(i,3,0)),this.setAttribute("instanceColorEnd",new Ti(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new fm(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ed.setFromBufferAttribute(t),this.boundingBox.union(ed))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Os),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Kr.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Kr)),Kr.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Kr));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}he.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Ie(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};an.line={uniforms:li.merge([he.common,he.fog,he.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Il extends Wt{constructor(e){super({type:"LineMaterial",uniforms:li.clone(an.line.uniforms),vertexShader:an.line.vertexShader,fragmentShader:an.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Ro=new ht,td=new L,nd=new L,Ot=new ht,kt=new ht,zn=new ht,Co=new L,Po=new ft,Bt=new Rm,id=new L,Zr=new Cn,$r=new Os,Hn=new ht;let Wn,qi;function sd(n,e,t){return Hn.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),Hn.multiplyScalar(1/Hn.w),Hn.x=qi/t.width,Hn.y=qi/t.height,Hn.applyMatrix4(n.projectionMatrixInverse),Hn.multiplyScalar(1/Hn.w),Math.abs(Math.max(Hn.x,Hn.y))}function k0(n,e){const t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,o=Math.min(i.instanceCount,s.count);for(let a=0,l=o;a<l;a++){Bt.start.fromBufferAttribute(s,a),Bt.end.fromBufferAttribute(r,a),Bt.applyMatrix4(t);const c=new L,h=new L;Wn.distanceSqToSegment(Bt.start,Bt.end,h,c),h.distanceTo(c)<qi*.5&&e.push({point:h,pointOnLine:c,distance:Wn.origin.distanceTo(h),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function B0(n,e,t){const i=e.projectionMatrix,r=n.material.resolution,o=n.matrixWorld,a=n.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),d=-e.near;Wn.at(1,zn),zn.w=1,zn.applyMatrix4(e.matrixWorldInverse),zn.applyMatrix4(i),zn.multiplyScalar(1/zn.w),zn.x*=r.x/2,zn.y*=r.y/2,zn.z=0,Co.copy(zn),Po.multiplyMatrices(e.matrixWorldInverse,o);for(let u=0,p=h;u<p;u++){if(Ot.fromBufferAttribute(l,u),kt.fromBufferAttribute(c,u),Ot.w=1,kt.w=1,Ot.applyMatrix4(Po),kt.applyMatrix4(Po),Ot.z>d&&kt.z>d)continue;if(Ot.z>d){const b=Ot.z-kt.z,y=(Ot.z-d)/b;Ot.lerp(kt,y)}else if(kt.z>d){const b=kt.z-Ot.z,y=(kt.z-d)/b;kt.lerp(Ot,y)}Ot.applyMatrix4(i),kt.applyMatrix4(i),Ot.multiplyScalar(1/Ot.w),kt.multiplyScalar(1/kt.w),Ot.x*=r.x/2,Ot.y*=r.y/2,kt.x*=r.x/2,kt.y*=r.y/2,Bt.start.copy(Ot),Bt.start.z=0,Bt.end.copy(kt),Bt.end.z=0;const _=Bt.closestPointToPointParameter(Co,!0);Bt.at(_,id);const m=ec.lerp(Ot.z,kt.z,_),f=m>=-1&&m<=1,w=Co.distanceTo(id)<qi*.5;if(f&&w){Bt.start.fromBufferAttribute(l,u),Bt.end.fromBufferAttribute(c,u),Bt.start.applyMatrix4(o),Bt.end.applyMatrix4(o);const b=new L,y=new L;Wn.distanceSqToSegment(Bt.start,Bt.end,y,b),t.push({point:y,pointOnLine:b,distance:Wn.origin.distanceTo(y),object:n,face:null,faceIndex:u,uv:null,uv1:null})}}}class rd extends Nt{constructor(e=new vu,t=new Il({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let o=0,a=0,l=t.count;o<l;o++,a+=2)td.fromBufferAttribute(t,o),nd.fromBufferAttribute(i,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+td.distanceTo(nd);const r=new Pl(s,2,1);return e.setAttribute("instanceDistanceStart",new Ti(r,1,0)),e.setAttribute("instanceDistanceEnd",new Ti(r,1,1)),this}raycast(e,t){const i=this.material.worldUnits,s=e.camera;s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Wn=e.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;qi=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),$r.copy(a.boundingSphere).applyMatrix4(o);let c;if(i)c=qi*.5;else{const d=Math.max(s.near,$r.distanceToPoint(Wn.origin));c=sd(s,d,l.resolution)}if($r.radius+=c,Wn.intersectsSphere($r)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Zr.copy(a.boundingBox).applyMatrix4(o);let h;if(i)h=qi*.5;else{const d=Math.max(s.near,Zr.distanceToPoint(Wn.origin));h=sd(s,d,l.resolution)}Zr.expandByScalar(h),Wn.intersectsBox(Zr)!==!1&&(i?k0(this,t):B0(this,s,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Ro),this.material.uniforms.resolution.value.set(Ro.z,Ro.w))}}const hc="flatcad.render.v1",z0=[1,1.25,1.5,1.75,2,2.5,3,4,8],H0=[8e6,16e6,32e6,64e6],Ns={version:1,ambientOcclusion:!1,supersampling:1,linesEnabled:!0,edgeWidthPx:1,edgeOpacity:1,edgeColor:"#000000",ambientLight:2,keyLight:3,aoRadius:8,msaaSamples:"browser",renderPixelBudget:8e6,downsampleMode:"browser"},V0={...Ns,ambientOcclusion:!1,supersampling:1,linesEnabled:!0,edgeWidthPx:.5,edgeOpacity:.5,ambientLight:.75,keyLight:5},Ks=(n,e,t)=>typeof n=="number"&&Number.isFinite(n)&&n>=e&&n<=t,Vn=(n,e)=>n===void 0?e:n;function dc(n){if(!n||typeof n!="object"||Array.isArray(n))throw Error("Invalid render settings");const e=n,t=Ns;if(e.version!==1||typeof e.ambientOcclusion!="boolean"||!z0.includes(e.supersampling))throw Error("Invalid AO/supersampling configuration");const i=e.edgeMode;if(i!==void 0&&!["native","screen","hidden"].includes(i))throw Error("Invalid legacy edge mode");const s=Vn(e.linesEnabled,i==="hidden"?!1:t.linesEnabled),r=Vn(e.edgeWidthPx,t.edgeWidthPx),o=Vn(e.edgeOpacity,t.edgeOpacity),a=Vn(e.edgeColor,t.edgeColor),l=Vn(e.ambientLight,t.ambientLight),c=Vn(e.keyLight,t.keyLight),h=Vn(e.aoRadius,t.aoRadius),d=Vn(e.msaaSamples,t.msaaSamples),u=Vn(e.renderPixelBudget,t.renderPixelBudget),p=Vn(e.downsampleMode,t.downsampleMode);if(typeof s!="boolean"||!Ks(r,.5,5)||!Ks(o,0,1)||typeof a!="string"||!/^#[0-9a-fA-F]{6}$/.test(a)||!Ks(l,0,4)||!Ks(c,0,5)||!Ks(h,0,24)||!["browser",0,2,4,8].includes(d)||!H0.includes(u)||p!=="browser"&&p!=="nearest")throw Error("Invalid render diagnostic parameter");return{version:1,ambientOcclusion:e.ambientOcclusion,supersampling:e.supersampling,linesEnabled:s,edgeWidthPx:r,edgeOpacity:o,edgeColor:a,ambientLight:l,keyLight:c,aoRadius:h,msaaSamples:d,renderPixelBudget:u,downsampleMode:p}}function G0(n,e,t,i,s=8192){const r=Math.max(1,t),o=Math.max(1,i),a=Math.max(.5,e)*n.supersampling,l=Math.min(n.renderPixelBudget<=8e6?4096:8192,s),c=Math.min(l/r,l/o,Math.sqrt(n.renderPixelBudget/(r*o)));return Math.max(.125,Math.min(a,c))}const W0=64e6;function X0(n,e,t){if(n==="browser")return null;if(n===0)return 0;for(const i of[8,4,2])if(i<=n&&i<=e&&t*i<=W0)return i;return 0}function xu(){try{const n=localStorage.getItem(hc);return n?dc(JSON.parse(n)):{...Ns}}catch{return{...Ns}}}function q0(n){localStorage.setItem(hc,JSON.stringify(dc(n)))}const Ul=130,Nl=-125,Fl=115,ad=Math.hypot(Ul,Nl,Fl),od=Math.cos(3*Math.PI/180);function Y0(n){const e=Math.hypot(n.x,n.y,n.z);if(!Number.isFinite(e)||e<1e-9)return"standard";const t=(n.x*Ul+n.y*Nl+n.z*Fl)/(e*ad),i=(n.x*Ul+n.y*Nl-n.z*Fl)/(e*ad);return t>=od?"underground":i>=od?"standard":n.z<0?"underground":"standard"}function ld(n,e,t){if(![n,e,t].every(Number.isFinite)||n<0||e<=n||t<0||t>24)throw Error("Invalid AO camera range/radius");const i=e-n,s=Math.max(.1,t),r=Math.max(.02,s*.01),o=Math.max(.5,s*2),a=Math.min(.25,r/i),l=Math.min(.5,o/i);return{minDistance:a,maxDistance:Math.max(a*2,l)}}function j0(n,e,t){if(!Number.isFinite(n)||!Number.isFinite(e)||e<0)throw new Error("Invalid solid display bounds");if(t!==void 0&&!Number.isFinite(t))throw new Error("Invalid cutting-tool bounds");const i=Math.min(n,t??n),s=Math.max(.5,Math.min(5,e*.02));return i-s}const K0=17;function Z0(n){return n.kind==="vertex"?!0:n.z!==null&&Math.abs(n.normal[2])>=.995}function $0(n,e,t,i){if(n<=0||e<=0||t<=0||i<=0)throw new Error("Invalid camera/view parameters");return n*e/t/i}class yu{constructor(e){this.container=e,this.renderer=new p0({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(725536),this.renderer.outputColorSpace=pn,e.appendChild(this.renderer.domElement),this.camera=new La(-80,80,60,-60,.1,1e5),this.camera.up.set(0,0,1),this.camera.position.set(130,-125,115),this.orbit=new g0(this.camera,this.renderer.domElement),this.orbit.enableDamping=!1,this.orbit.target.set(0,0,0),this.orbit.addEventListener("change",()=>{this.recordCameraState(),this.requestRender()}),this.setNavigationPreset("fusion");const t=this.renderer.domElement,i=this.orbit.zoomSpeed;t.addEventListener("wheel",o=>{this.orbit.zoomSpeed=o.shiftKey?i*3:i},{capture:!0,passive:!0}),t.addEventListener("wheel",()=>{this.orbit.zoomSpeed=i},{passive:!0}),document.addEventListener("pointermove",this.onDocumentPointerMove,{capture:!0}),t.addEventListener("pointerdown",o=>{const a=Xa(this.navigation,o.button,{shift:o.shiftKey,ctrl:o.ctrlKey||o.metaKey});this.pointerDown={x:o.clientX,y:o.clientY,button:o.button,action:a},this.orbit.update(),this.container.dataset.cameraOffsetBefore=this.camera.position.clone().sub(this.orbit.target).toArray().join(","),this.container.dataset.cameraTargetBefore=this.orbit.target.toArray().join(",");const l=o.shiftKey||o.ctrlKey||o.metaKey,c=this.toMouseAction(bf(a,l));o.button===1&&(this.orbit.mouseButtons.MIDDLE=c),o.button===2&&(this.orbit.mouseButtons.RIGHT=c)},{capture:!0}),t.addEventListener("pointerup",o=>{const a=this.pointerDown;if(this.pointerDown=null,!a||a.button!==o.button)return;if(Math.hypot(o.clientX-a.x,o.clientY-a.y)>4){this.container.dataset.lastNavigationAction=a.action,this.orbit.update(),this.container.dataset.cameraPosition=this.camera.position.toArray().join(","),this.container.dataset.cameraTarget=this.orbit.target.toArray().join(","),this.container.dataset.cameraOffset=this.camera.position.clone().sub(this.orbit.target).toArray().join(",");return}o.button===0&&this.onFacePicked&&this.onFacePicked(this.pickTarget(o)?.target.z??null),o.button===2&&this.onSurfaceMenu&&this.onSurfaceMenu(this.pickTarget(o)?.target??null,{x:o.clientX,y:o.clientY})}),t.addEventListener("pointercancel",()=>{this.pointerDown=null}),t.addEventListener("pointermove",o=>{if(o.buttons!==0){this.clearHighlight(),this.onSurfaceHover?.(null,{x:o.clientX,y:o.clientY});return}const a=this.pickTarget(o);this.showHighlight(a),this.lastHovered=a?.target??null,this.onSurfaceHover?.(this.lastHovered,{x:o.clientX,y:o.clientY})}),t.addEventListener("pointerleave",()=>{this.clearHighlight(),this.lastHovered=null,this.onSurfaceHover?.(null,{x:0,y:0})}),t.addEventListener("auxclick",o=>{o.button===1&&o.preventDefault()}),t.addEventListener("contextmenu",o=>o.preventDefault()),this.ambientLight=new Sm(16777215,2),this.scene.add(this.ambientLight),this.keyLight=new Sh(16777215,3),this.keyLight.position.set(80,-40,140),this.scene.add(this.keyLight);const s=new Sh(6987775,1);s.position.set(-80,70,50),this.scene.add(s);const r=new Cm(300,30,3430010,1847366);r.rotation.x=Math.PI/2,r.material.depthTest=!0,r.material.depthWrite=!1,r.renderOrder=-100,this.referenceGrid=r,this.scene.add(r),this.axesHelper=new Pm(35),this.scene.add(this.axesHelper),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.requestRender()}scene=new am;camera;renderer;orbit;resizeObserver;referenceGrid;axesHelper;raycaster=new wm;pickPoint=new Ie;object=null;hasFramedSolid=!1;topologyVertices=[];vertexRadiusPx=K0;hoveredHighlight=null;hoveredKey="";lastHovered=null;onSurfaceHover=null;onSurfaceMenu=null;committedPickMesh=null;allowedElevations=[];navigation="fusion";onFacePicked=null;pointerDown=null;animationId=0;historyInspection=!1;resizeTimer;bufferWidth=0;bufferHeight=0;floating=!1;disposed=!1;renderCount=0;composer=null;scenePass=null;ssaoPass=null;pipelineKey="direct";appliedPixelRatio=0;renderSettings={...Ns};currentEdgeLines=null;ambientLight;keyLight;updateFloatHit(e,t){if(!this.floating)return;const i=this.renderer.domElement.getBoundingClientRect();this.container.dataset.floatHover=String(e>=i.left&&e<i.right&&t>=i.top&&t<i.bottom)}onDocumentPointerMove=e=>{this.updateFloatHit(e.clientX,e.clientY)};setFloating(e){this.floating!==e&&(this.floating=e,this.referenceGrid.visible=!e,this.axesHelper.visible=!e,this.renderer.setClearColor(725536,e?0:1),this.scenePass&&(this.scenePass.clearAlpha=e?0:1),this.renderer.domElement.style.pointerEvents="auto",e?this.container.dataset.floatHitPolicy="viewport":delete this.container.dataset.floatHitPolicy,this.container.dataset.floating=String(e),this.container.dataset.floatHover="false",this.requestRender())}toMouseAction(e){switch(e){case"pan":return ci.PAN;case"orbit":return ci.ROTATE;case"dolly":return ci.DOLLY;default:return-1}}setNavigationPreset(e){this.navigation=e,this.container.dataset.navigationPreset=e,this.orbit.mouseButtons.LEFT=null,this.orbit.mouseButtons.MIDDLE=this.toMouseAction(Xa(e,1,{shift:!1,ctrl:!1})),this.orbit.mouseButtons.RIGHT=this.toMouseAction(Xa(e,2,{shift:!1,ctrl:!1}))}setFacePickHandler(e){this.onFacePicked=e}setHistoryInspection(e){this.historyInspection=e,this.clearHighlight()}setSurfaceHoverHandler(e){this.onSurfaceHover=e}setSurfaceMenuHandler(e){this.onSurfaceMenu=e}setFaceElevations(e){this.allowedElevations=e.filter(Number.isFinite)}setCommittedPickMesh(e){if(this.clearHighlight(),this.topologyVertices=[],this.committedPickMesh&&(this.committedPickMesh.geometry.dispose(),this.committedPickMesh.material.dispose(),this.committedPickMesh=null),!e||!e.triangles.length)return;const t=this.makeGeometry(e);for(let i=0;i+2<(e.topologyVertices?.length??0);i+=3)this.topologyVertices.push(new L(e.topologyVertices[i],e.topologyVertices[i+1],e.topologyVertices[i+2]));this.container.dataset.topologyVertexCount=String(this.topologyVertices.length),this.committedPickMesh=new Nt(t,new Ss({side:on})),this.committedPickMesh.updateMatrixWorld(!0)}pickTarget(e){if(this.historyInspection)return null;const t=this.committedPickMesh;if(!t)return null;const i=this.renderer.domElement.getBoundingClientRect();if(i.width<=0||i.height<=0)return null;const s=e.clientX-i.left,r=e.clientY-i.top;this.pickPoint.set(2*s/i.width-1,1-2*r/i.height),this.camera.updateMatrixWorld(!0),this.raycaster.setFromCamera(this.pickPoint,this.camera);const o=this.raycaster.intersectObject(t,!1);let a=null,l=this.vertexRadiusPx;for(const h of this.topologyVertices){const d=h.clone().project(this.camera);if(d.z<-1||d.z>1)continue;const u=(d.x+1)*i.width/2,p=(1-d.y)*i.height/2,g=Math.hypot(u-s,p-r);g>l||o.length>0&&h.distanceTo(this.camera.position)>o[0].distance+.03||(a=h,l=g)}if(a){const h=kc(a.z,this.allowedElevations,.002)??a.z;return{target:{kind:"vertex",point:[a.x,a.y,a.z],z:h,normal:[0,0,0]},faceIndex:-1,normal:new L,point:a.clone()}}const c=t.geometry.getAttribute("position");for(const h of o){if(!h.face||h.faceIndex==null)continue;const d=h.face,u=[new L().fromBufferAttribute(c,d.a),new L().fromBufferAttribute(c,d.b),new L().fromBufferAttribute(c,d.c)],g=Math.max(...u.map(m=>m.z))-Math.min(...u.map(m=>m.z))<.002&&Math.abs(d.normal.z)>.995?kc(u[0].z,this.allowedElevations,.002):null;return{target:{kind:"face",point:[h.point.x,h.point.y,h.point.z],z:g,normal:[d.normal.x,d.normal.y,d.normal.z]},faceIndex:h.faceIndex,normal:d.normal.clone().normalize(),point:h.point.clone()}}return null}showHighlight(e){if(!e||!this.committedPickMesh){this.clearHighlight();return}if(e.target.kind==="vertex"){const m=e.point,f="vertex:"+m.toArray().map(R=>R.toFixed(5)).join("/")+"/zoom:"+this.camera.zoom.toFixed(4);if(f===this.hoveredKey&&this.hoveredHighlight)return;this.clearHighlight();const w=this.renderer.domElement.getBoundingClientRect(),b=$0(this.vertexRadiusPx,this.camera.top-this.camera.bottom,this.camera.zoom,Math.max(1,w.height)),y=new Nt(new ac(b,24,16),new Ss({color:2159251,transparent:!0,opacity:.37,side:on,depthWrite:!1,depthTest:!1}));y.position.copy(m),y.renderOrder=16,this.scene.add(y),this.requestRender(),this.hoveredHighlight=y,this.hoveredKey=f,this.container.dataset.hoveredTargetKind="vertex",this.container.dataset.hoveredFaceZ=String(e.target.z),this.container.dataset.vertexHitRadiusPx=String(this.vertexRadiusPx),this.container.dataset.vertexSphereRadiusPx=String(this.vertexRadiusPx),this.container.dataset.vertexSphereVisible="true",this.container.dataset.highlightTriangleCount="0";return}if(!Z0(e.target)){this.clearHighlight();return}const t=e.normal,i=t.dot(e.point),s=[Math.round(t.x*100),Math.round(t.y*100),Math.round(t.z*100),Math.round(i*1e3)].join("/");if(s===this.hoveredKey&&this.hoveredHighlight)return;this.clearHighlight();const r=this.committedPickMesh.geometry,o=r.getAttribute("position"),a=r.getIndex();if(!a)return;const l=[],c=[],h=new L,d=new L,u=new L,p=new L,g=a.count/3;for(let m=0;m<g;m++){const f=a.getX(3*m),w=a.getX(3*m+1),b=a.getX(3*m+2);if(h.fromBufferAttribute(o,f),d.fromBufferAttribute(o,w),u.fromBufferAttribute(o,b),p.copy(d).sub(h).cross(new L().copy(u).sub(h)).normalize(),Math.abs(p.dot(t))<.99||Math.abs(t.dot(h)-i)>.003||Math.abs(t.dot(d)-i)>.003||Math.abs(t.dot(u)-i)>.003)continue;const y=l.length/3;l.push(h.x,h.y,h.z,d.x,d.y,d.z,u.x,u.y,u.z),c.push(y,y+1,y+2)}if(!c.length){const m=e.faceIndex,f=a.getX(3*m),w=a.getX(3*m+1),b=a.getX(3*m+2);for(const y of[f,w,b])h.fromBufferAttribute(o,y),l.push(h.x,h.y,h.z);c.push(0,1,2)}const _=new Xt;_.setAttribute("position",new xt(l,3)),_.setIndex(c),this.hoveredHighlight=new Nt(_,new Ss({color:1303039,transparent:!0,opacity:.72,side:on,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2})),this.hoveredHighlight.renderOrder=10,this.scene.add(this.hoveredHighlight),this.requestRender(),this.hoveredKey=s,this.container.dataset.hoveredTargetKind=e.target.kind,e.target.z!==null?this.container.dataset.hoveredFaceZ=String(e.target.z):delete this.container.dataset.hoveredFaceZ,this.container.dataset.highlightTriangleCount=String(c.length/3)}clearHighlight(){this.hoveredHighlight&&(this.scene.remove(this.hoveredHighlight),this.hoveredHighlight.geometry.dispose(),this.hoveredHighlight.material.dispose(),this.hoveredHighlight=null,this.requestRender()),this.hoveredKey="",delete this.container.dataset.hoveredFaceZ,delete this.container.dataset.hoveredTargetKind,delete this.container.dataset.highlightTriangleCount,delete this.container.dataset.vertexHitRadiusPx,delete this.container.dataset.vertexSphereRadiusPx,delete this.container.dataset.vertexSphereVisible}resize(){const e=Math.round(this.container.clientWidth),t=Math.round(this.container.clientHeight);if(e<2||t<2||!this.container.isConnected)return;const i=100,s=e/t;if(this.camera.left=-i*s/2,this.camera.right=i*s/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.updateProjectionMatrix(),clearTimeout(this.resizeTimer),this.bufferWidth===e&&this.bufferHeight===t){this.drawFrame();return}const r=()=>{!this.container.isConnected||this.container.clientWidth<2||this.container.clientHeight<2||(this.configureRenderBuffers(e,t),(this.bufferWidth!==e||this.bufferHeight!==t)&&(this.renderer.setSize(e,t,!1),this.bufferWidth=e,this.bufferHeight=t,this.composer?.setSize(e,t),this.container.dataset.rendererResizeCount=String((Number(this.container.dataset.rendererResizeCount)||0)+1)),this.drawFrame())};this.bufferWidth===0?r():(this.drawFrame(),this.resizeTimer=setTimeout(r,120))}makeGeometry(e){const t=new Xt;return t.setAttribute("position",new xt(e.vertices,3)),t.setIndex(e.triangles),e.normals.length===e.vertices.length?t.setAttribute("normal",new xt(e.normals,3)):t.computeVertexNormals(),t}makeEdgeObject(e){if(!e.length||!this.renderSettings.linesEnabled)return null;const t=this.renderSettings,i=new vu;i.setPositions(e);const s=new Il({color:t.edgeColor,linewidth:t.edgeWidthPx,worldUnits:!1,transparent:t.edgeOpacity<1,opacity:t.edgeOpacity,depthTest:!0}),r=new rd(i,s);return r.name="flatcad-presentation-edges",r}disposeEdge(e){if(e instanceof Nt||e instanceof Sa){e.geometry.dispose();for(const t of Array.isArray(e.material)?e.material:[e.material])t.dispose()}}updateEdgePresentation(){if(!this.object||!this.currentEdgeLines)return;const e=this.object.getObjectByName("flatcad-presentation-edges"),t=this.renderSettings;if(e&&t.linesEnabled&&e instanceof rd){const r=e.material;if(!Array.isArray(r)){const o=r;o.color.set(t.edgeColor),o.opacity=t.edgeOpacity;const a=t.edgeOpacity<1;o.transparent!==a&&(o.transparent=a,o.needsUpdate=!0),o instanceof Il&&(o.linewidth=t.edgeWidthPx),this.requestRender();return}}const s=this.makeEdgeObject(this.currentEdgeLines);s&&this.object.add(s),e&&(this.object.remove(e),this.disposeEdge(e)),this.requestRender()}setMesh(e,t={}){if(!e||!e.triangles.length){this.object&&this.retireGroup(this.object),this.object=null,this.currentEdgeLines=null,t.pending||this.setCommittedPickMesh(null),this.requestRender(),this.referenceGrid.position.z=0,this.container.dataset.gridZ="0",this.container.dataset.renderedSolid="false",this.hasFramedSolid=!1,delete this.container.dataset.cutToolVisible,delete this.container.dataset.displayModelMinZ,delete this.container.dataset.displayBottomZ;return}const i=new Js;try{if(i.add(new Nt(this.makeGeometry(e),new mm({color:t.pending==="add"?7590328:t.pending==="cut"?15904637:6991092,metalness:.2,roughness:.58,side:on}))),t.pending==="cut"&&t.cutTool?.triangles.length){const l=new Nt(this.makeGeometry(t.cutTool),new Ss({color:15085644,transparent:!0,opacity:.25,side:on,depthWrite:!1,depthTest:!1,polygonOffset:!0,polygonOffsetFactor:-1}));l.name="Full cutting tool including overshoot",l.renderOrder=7,i.add(l)}const s=this.makeEdgeObject(e.edgeLines);s&&i.add(s);const r=this.object;this.scene.add(i),this.object=i,t.pending||this.setCommittedPickMesh(e),r&&this.retireGroup(r),this.currentEdgeLines=e.edgeLines,this.container.dataset.renderedSolid="true",t.pending==="cut"&&t.cutTool?.triangles.length?this.container.dataset.cutToolVisible="true":delete this.container.dataset.cutToolVisible;const o=new Cn().setFromObject(i),a=new Cn().setFromObject(i.children[0]);if(!o.isEmpty()&&!a.isEmpty()){const l=j0(a.min.z,a.max.z-a.min.z,o.min.z);this.referenceGrid.position.z=l,this.referenceGrid.updateMatrixWorld(),this.container.dataset.gridZ=String(l),this.container.dataset.displayModelMinZ=String(a.min.z),this.container.dataset.displayBottomZ=String(o.min.z)}(t.fitCamera||!this.hasFramedSolid&&!t.preserveCamera)&&(this.frameBounds(o),this.hasFramedSolid=!0),this.recordCameraState(),this.requestRender()}catch(s){throw this.object===i&&(this.object=null,this.scene.remove(i)),this.disposeGroup(i),s}}retireGroup(e){this.scene.remove(e),this.disposeGroup(e)}disposeGroup(e){e.traverse(t=>{if(t instanceof Nt||t instanceof Sa){t.geometry.dispose();for(const i of Array.isArray(t.material)?t.material:[t.material])i.dispose()}})}recordCameraState(){this.container.dataset.cameraDirection=this.camera.position.clone().sub(this.orbit.target).normalize().toArray().join(","),this.container.dataset.cameraTarget=this.orbit.target.toArray().join(","),this.container.dataset.cameraZoom=String(this.camera.zoom)}frameBounds(e){if(e.isEmpty())return;const t=e.getCenter(new L),i=Math.max(1,e.getSize(new L).length()),s=this.camera.position.clone().sub(this.orbit.target).normalize();this.orbit.target.copy(t),this.camera.position.copy(t).addScaledVector(s,Math.max(10,i*1.4)),this.camera.zoom=Math.max(.05,130/(i*1.5)),this.camera.updateProjectionMatrix(),this.orbit.update(),this.container.dataset.cameraFitCount=String((Number(this.container.dataset.cameraFitCount)||0)+1)}fitView(){this.object&&(this.frameBounds(new Cn().setFromObject(this.object)),this.hasFramedSolid=!0)}requestRender(){this.disposed||this.animationId||(this.animationId=requestAnimationFrame(()=>{this.animationId=0,this.disposed||this.drawFrame()}))}drawFrame(){this.disposed||(this.composer?this.composer.render():this.renderer.render(this.scene,this.camera),this.renderCount++,this.container.dataset.frameCount=String(this.renderCount))}retireComposer(){this.ssaoPass?.dispose(),this.composer?.dispose(),this.ssaoPass=null,this.scenePass=null,this.composer=null}createComposer(e,t,i,s,r){const o=new Dn(Math.max(1,s),Math.max(1,r),{type:pi,depthBuffer:!0,samples:e}),a=new U0(this.renderer,o),l=new Ge(725536).convertSRGBToLinear(),c=new N0(this.scene,this.camera,null,l,this.floating?0:1);if(this.scenePass=c,a.addPass(c),t){const h=new wi(this.scene,this.camera,Math.max(1,s),Math.max(1,r),8);h.kernelRadius=this.renderSettings.aoRadius;const d=ld(this.camera.near,this.camera.far,this.renderSettings.aoRadius);h.minDistance=d.minDistance,h.maxDistance=d.maxDistance,a.addPass(h),this.ssaoPass=h}a.addPass(new O0),this.composer=a,a.setPixelRatio(i),a.setSize(Math.max(1,s),Math.max(1,r))}configureRenderBuffers(e,t){const i=this.renderSettings,s=window.devicePixelRatio||1,r=G0(i,s,e,t,this.renderer.capabilities.maxTextureSize),o=Math.max(1,Math.round(e*r)),a=Math.max(1,Math.round(t*r)),l=o*a,c=this.renderer.capabilities.maxSamples,h=X0(i.msaaSamples,c,l),d=i.msaaSamples!=="browser",u=h??0,p=i.ambientOcclusion||d,g=p?"composer:"+u+":"+String(i.ambientOcclusion):"direct",_=this.appliedPixelRatio!==r,m=this.pipelineKey!==g;if(_&&(this.renderer.setPixelRatio(r),this.appliedPixelRatio=r,this.bufferWidth=0),m?(this.retireComposer(),this.pipelineKey=g,p&&this.createComposer(u,i.ambientOcclusion,r,e,t),this.bufferWidth=0):_&&this.composer?.setPixelRatio(r),this.ssaoPass){this.ssaoPass.kernelRadius=i.aoRadius;const f=ld(this.camera.near,this.camera.far,i.aoRadius);this.ssaoPass.minDistance=f.minDistance,this.ssaoPass.maxDistance=f.maxDistance,this.container.dataset.aoDepthMin=String(f.minDistance),this.container.dataset.aoDepthMax=String(f.maxDistance)}else delete this.container.dataset.aoDepthMin,delete this.container.dataset.aoDepthMax;this.renderer.domElement.style.imageRendering=i.downsampleMode==="nearest"?"pixelated":"auto",this.container.dataset.pixelRatio=String(r),this.container.dataset.supersample=String(i.supersampling),this.container.dataset.effectiveSupersample=String(r/Math.max(.5,s)),this.container.dataset.renderPixelBudget=String(i.renderPixelBudget),this.container.dataset.backingPixels=String(l),this.container.dataset.msaaRequested=String(i.msaaSamples),this.container.dataset.msaaEffective=p?String(u):"browser",this.container.dataset.msaaMaxSamples=String(c),this.container.dataset.msaaPath=p?"offscreen":"browser",this.container.dataset.aoEnabled=String(i.ambientOcclusion),this.container.dataset.downsampleMode=i.downsampleMode}setRenderSettings(e){this.renderSettings={...e},this.ambientLight.intensity=e.ambientLight,this.keyLight.intensity=e.keyLight,this.updateEdgePresentation(),this.container.dataset.linesEnabled=String(e.linesEnabled),this.container.dataset.edgeWidth=String(e.edgeWidthPx),this.container.dataset.edgeOpacity=String(e.edgeOpacity),this.container.dataset.ambientLight=String(e.ambientLight),this.container.dataset.keyLight=String(e.keyLight),this.container.dataset.aoRadius=String(e.aoRadius);const t=this.container.clientWidth,i=this.container.clientHeight;if(t<2||i<2||!this.container.isConnected){this.renderer.domElement.style.imageRendering=e.downsampleMode==="nearest"?"pixelated":"auto",this.container.dataset.downsampleMode=e.downsampleMode;return}this.configureRenderBuffers(t,i),this.resize(),this.requestRender()}contextHome(){const e=this.camera.position.clone().sub(this.orbit.target);this.orientHome(Y0({x:e.x,y:e.y,z:e.z})==="underground")}homeView(){this.orientHome(!1)}undergroundHome(){this.orientHome(!0)}orientHome(e){const t=Math.max(10,this.camera.position.distanceTo(this.orbit.target)),i=new L(130,-125,e?-115:115).normalize();this.camera.position.copy(this.orbit.target).addScaledVector(i,t),this.camera.up.set(0,0,1),this.orbit.update(),this.container.dataset.homeMode=e?"underground":"standard",this.requestRender()}oppositeOrbit(){const e=this.camera.position.clone().sub(this.orbit.target);e.x*=-1,e.y*=-1,this.camera.position.copy(this.orbit.target).add(e),this.orbit.update(),this.container.dataset.homeMode="opposite",this.requestRender()}dispose(){this.disposed=!0,cancelAnimationFrame(this.animationId),clearTimeout(this.resizeTimer),this.resizeObserver.disconnect(),document.removeEventListener("pointermove",this.onDocumentPointerMove,{capture:!0}),this.orbit.dispose(),this.onFacePicked=null,this.onSurfaceHover=null,this.onSurfaceMenu=null,this.clearHighlight(),this.setMesh(null),this.setCommittedPickMesh(null),this.ssaoPass?.dispose(),this.composer?.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}const J0={home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9"/><path d="M10 21v-7h4v7"/>',fit:'<path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/><rect x="8" y="8" width="8" height="8" rx="1"/>',opposite:'<path d="M3 12a9 9 0 0 1 15-6"/><path d="m18 2 1 5-5 1"/><path d="M21 12a9 9 0 0 1-15 6"/><path d="m6 22-1-5 5-1"/>',close:'<path d="M5 5 19 19M19 5 5 19"/>'},cd={home:"Home / Underground (toggle at home)",fit:"Auto-fit",opposite:"Opposite orbit",close:"Close floating view"};function Su(n,e){const t=document.createElement("div");t.className="float-nav",t.setAttribute("role","toolbar"),t.setAttribute("aria-label","Floating render navigation");const i=e?["home","fit","opposite","close"]:["home","fit","opposite"];for(const s of i){const r=document.createElement("button");r.type="button",r.className="float-nav-action",r.dataset.nav=s,r.title=cd[s],r.setAttribute("aria-label",cd[s]),r.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+J0[s]+"</svg>",r.addEventListener("click",o=>{switch(o.stopPropagation(),s){case"home":n.contextHome();break;case"fit":n.fitView();break;case"opposite":n.oppositeOrbit();break;case"close":e?.();break}}),t.append(r)}return t}const Mu="flatcad.floating-views.v1",Do="flatcad.floating-active.v1",bu=3;function Eu(n){if(!Array.isArray(n)||n.length>bu)throw Error("Invalid floating-view collection");const e=new Set;return n.map(t=>{if(!t||typeof t!="object"||Array.isArray(t))throw Error("Invalid floating view");const i=t,s=i.w===void 0?380:i.w,r=i.h===void 0?340:i.h;if(typeof i.id!="string"||!/^float_[a-z0-9]{6,24}$/.test(i.id)||e.has(i.id)||typeof i.x!="number"||!Number.isFinite(i.x)||typeof i.y!="number"||!Number.isFinite(i.y)||i.x<0||i.x>1||i.y<0||i.y>1||typeof s!="number"||!Number.isFinite(s)||typeof r!="number"||!Number.isFinite(r)||s<220||s>3e3||r<180||r>3e3)throw Error("Invalid floating view position or size");return e.add(i.id),{id:i.id,x:i.x,y:i.y,w:s,h:r}})}function Q0(){try{const n=localStorage.getItem(Mu);return n?Eu(JSON.parse(n)):[]}catch{return[]}}class ey{constructor(e,t,i,s){this.getNavigation=e,this.getSettings=t,this.onFacePick=i,this.onError=s;const r=document.createElement("div");r.id="floating-views-layer",r.className="floating-views-layer",document.querySelector(".shell").append(r),this.layer=r;let o=null;try{o=localStorage.getItem(Do)}catch{}for(const l of Q0())this.insert(l,!1);const a=o?this.entries.get(o):void 0;a&&this.activate(a,!1),window.addEventListener("resize",()=>this.resizeAll())}layer;entries=new Map;foreground=0;activeId=null;currentMesh=null;currentCommittedPickMesh=null;currentOptions={};currentElevations=[];currentInspection=!1;get count(){return this.entries.size}ids(){return[...this.entries.keys()]}add(){if(this.entries.size>=bu)throw Error("Maximum of three independent floating views");const e="float_"+crypto.randomUUID().replaceAll("-","").slice(0,12),t={id:e,x:Math.min(.85,.48+this.entries.size*.08),y:Math.min(.85,.22+this.entries.size*.11),w:380,h:340};return this.insert(t,!0),e}remove(e){const t=this.entries.get(e);if(t&&(this.entries.delete(e),t.disposeControls(),t.preview.dispose(),t.panel.remove(),this.persist(),this.activeId===e)){this.activeId=null;const i=[...this.entries.values()].sort((s,r)=>Number(r.panel.style.zIndex)-Number(s.panel.style.zIndex))[0];if(i)this.activate(i);else try{localStorage.removeItem(Do)}catch{}}}removeAll(){for(const e of this.ids())this.remove(e)}setMesh(e,t={}){this.currentMesh=e,t?.pending||(this.currentCommittedPickMesh=e),this.currentOptions=t??{};for(const i of this.entries.values())i.preview.setMesh(e,t)}setCommittedPickMesh(e){this.currentCommittedPickMesh=e;for(const t of this.entries.values())t.preview.setCommittedPickMesh(e)}setFaceElevations(e){this.currentElevations=[...e];for(const t of this.entries.values())t.preview.setFaceElevations(e)}setHistoryInspection(e){this.currentInspection=e;for(const t of this.entries.values())t.preview.setHistoryInspection(e)}setNavigationPreset(e){for(const t of this.entries.values())t.preview.setNavigationPreset(e)}setRenderSettings(e){for(const t of this.entries.values())t.preview.setRenderSettings(e)}insert(e,t){const i=document.createElement("div");i.className="floating-render-view",i.dataset.floatId=e.id,i.setAttribute("aria-label","Floating CAD Solid view");const s=document.createElement("div");s.className="preview-root floating-render-canvas",s.setAttribute("aria-label","Independent floating CAD render"),i.append(s);const r=document.createElement("span");r.className="float-face-label",r.hidden=!0,i.append(r),this.layer.append(i);let o;try{o=new yu(s),o.setNavigationPreset(this.getNavigation()),o.setFloating(!0),o.setRenderSettings(this.getSettings()),o.setFacePickHandler(this.onFacePick)}catch(l){i.remove(),this.onError("Floating render unavailable: "+String(l));return}const a={descriptor:{...e},panel:i,host:s,label:r,preview:o,disposeControls:()=>{}};this.entries.set(e.id,a),i.addEventListener("pointerdown",()=>this.activate(a),{capture:!0}),i.addEventListener("focusin",()=>this.activate(a)),this.activate(a,t),a.disposeControls=Ld(i,{onChange:l=>this.setRect(a,l),onEnd:()=>this.persist(),onActivate:()=>this.activate(a)}),o.setSurfaceHoverHandler((l,c)=>this.onHover(a,l,c)),i.append(Su(o,()=>this.remove(e.id))),this.position(a),o.setFaceElevations(this.currentElevations),this.currentMesh&&(o.setMesh(this.currentMesh,{...this.currentOptions,preserveCamera:!1}),o.fitView()),this.currentCommittedPickMesh&&o.setCommittedPickMesh(this.currentCommittedPickMesh),o.setHistoryInspection(this.currentInspection),t&&this.persist()}activate(e,t=!0){if(this.activeId!==e.descriptor.id&&(this.activeId=e.descriptor.id,e.panel.style.zIndex=String(++this.foreground),t))try{localStorage.setItem(Do,e.descriptor.id)}catch{}}onHover(e,t,i){const s=e.label,r=t?Gl(t,null,0):null;if(!r){s.hidden=!0;return}s.textContent=r;const o=e.panel.getBoundingClientRect();s.style.left=Math.max(6,Math.min(o.width-194,i.x-o.x+12))+"px",s.style.top=Math.max(40,Math.min(o.height-35,i.y-o.y+12))+"px",s.hidden=!1}position(e){const t=Pd(e.descriptor.x,e.descriptor.y,e.descriptor.w,e.descriptor.h,{width:innerWidth,height:innerHeight});e.panel.style.left=t.left+"px",e.panel.style.top=t.top+"px",e.panel.style.width=t.width+"px",e.panel.style.height=t.height+"px"}setRect(e,t){const i=Dd(t,{width:innerWidth,height:innerHeight});e.descriptor={...e.descriptor,x:i.x,y:i.y,w:t.width,h:t.height}}resizeAll(){for(const e of this.entries.values())this.position(e)}persist(){try{localStorage.setItem(Mu,JSON.stringify(Eu([...this.entries.values()].map(e=>e.descriptor))))}catch(e){this.onError("Floating-view layout persistence unavailable: "+String(e))}}}const wu="flatcad.tool-rail.v1",Ol=(n,e,t)=>Math.max(e,Math.min(t,n));function Tu(n){if(!n||typeof n!="object"||Array.isArray(n))throw Error("Invalid toolbar pose");const e=n;if(typeof e.x!="number"||!Number.isFinite(e.x)||typeof e.y!="number"||!Number.isFinite(e.y)||e.x<0||e.x>1e4||e.y<0||e.y>1e4||e.side!==null&&e.side!=="left"&&e.side!=="right")throw Error("Invalid toolbar pose");return{x:e.x,y:e.y,side:e.side}}function hd(n,e,t,i,s,r=30){const o=s.left+8,a=s.left+s.width-t-8,c=e+i>s.top-25&&e<s.top+s.height+25?Math.abs(n-o)<=r?"left":Math.abs(n-a)<=r?"right":null:null;if(!c)return{x:n,y:e,side:null};const h=s.top+s.height-i-4;return{x:c==="left"?o:a,y:Ol(e,s.top+4,Math.max(s.top+4,h)),side:c}}function ty(){try{const n=localStorage.getItem(wu);return n?Tu(JSON.parse(n)):null}catch{return null}}class ny{constructor(e,t,i,s,r){this.rail=e,this.grip=t,this.sketch=i,this.dockSlot=s,this.onTitlebarDock=r;const o=document.querySelector(".shell");if(!o)throw Error("Floating toolbar requires workspace shell");const a=document.createElement("div");a.className="floating-toolbar-overlay";const l=document.createElement("div");l.className="floating-toolbar-grip-layer",o.append(a,l),this.railLayer=a,this.gripLayer=l;const c=document.createElement("span");c.className="tool-rail-grip-slot",c.setAttribute("aria-hidden","true"),e.prepend(c),this.slot=c,l.append(t),t.dataset.toolbarDragHandle="",t.setAttribute("aria-label","Drag Sketch toolbar; click to anchor in titlebar"),t.title="Drag Sketch tools · snap near left/right Sketch edge · click to anchor in titlebar",this.savedGrip=t,t.addEventListener("pointerdown",d=>this.startDrag(d)),t.addEventListener("keydown",d=>{const p={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[d.key];if(!p||this.docked)return;d.preventDefault(),d.stopPropagation();const g=this.position();this.setPosition(g.x+p[0]*(d.shiftKey?1:10),g.y+p[1]*(d.shiftKey?1:10),!0)}),t.addEventListener("click",d=>{if(this.dragged){this.dragged=!1,d.preventDefault(),d.stopPropagation();return}this.docked||this.onTitlebarDock()});const h=()=>this.requestPosition();window.addEventListener("resize",h),new ResizeObserver(h).observe(i)}railLayer;gripLayer;slot;savedGrip;pose=ty();docked=!0;raf=null;dragged=!1;setDocked(e){this.docked=e,e?(this.dockSlot.append(this.rail),this.savedGrip.hidden=!0,this.slot.hidden=!0):(this.railLayer.append(this.rail),this.savedGrip.hidden=!1,this.slot.hidden=!1,this.requestPosition())}onLayout(){this.requestPosition()}requestPosition(){this.raf!==null||this.docked||(this.raf=requestAnimationFrame(()=>{this.raf=null,this.docked||this.position()}))}available(){return{width:Math.max(30,this.rail.offsetWidth),height:Math.max(30,this.rail.offsetHeight)}}clip(e,t){const i=this.available();return{x:Ol(e,4,Math.max(4,innerWidth-i.width-4)),y:Ol(t,64,Math.max(64,innerHeight-i.height-4))}}position(){if(!this.pose){const i=this.sketch.getBoundingClientRect(),s=this.available();this.pose={x:i.left+8,y:i.top+(i.height-s.height)/2,side:"left"}}const e=this.available();if(this.pose.side){const i=this.sketch.getBoundingClientRect(),s=this.pose.side==="left"?i.left+8:i.right-e.width-8,r=hd(s,this.pose.y,e.width,e.height,{left:i.left,top:i.top,width:i.width,height:i.height},1);this.pose={...r,side:this.pose.side}}const t=this.clip(this.pose.x,this.pose.y);return this.pose={...this.pose,...t},this.rail.style.left=t.x+"px",this.rail.style.top=t.y+"px",this.rail.dataset.snapSide=this.pose.side??"free",this.savedGrip.style.left=t.x+5+"px",this.savedGrip.style.top=t.y+5+"px",this.pose}setPosition(e,t,i){const s=this.available(),r=this.sketch.getBoundingClientRect(),o=this.clip(e,t);this.pose=hd(o.x,o.y,s.width,s.height,{left:r.left,top:r.top,width:r.width,height:r.height}),this.position(),i&&this.save()}save(){if(this.pose)try{localStorage.setItem(wu,JSON.stringify(Tu(this.pose)))}catch{}}startDrag(e){if(this.docked||e.button!==0)return;const t=this.position(),i=e.clientX,s=e.clientY,r=e.pointerId;let o=!1;this.grip.setPointerCapture(r);const a=c=>{c.pointerId===r&&(Math.hypot(c.clientX-i,c.clientY-s)>4&&(o=!0),o&&(this.setPosition(t.x+c.clientX-i,t.y+c.clientY-s,!1),c.preventDefault(),c.stopPropagation()))},l=c=>{c.pointerId===r&&(this.grip.removeEventListener("pointermove",a),this.grip.removeEventListener("pointerup",l),this.grip.removeEventListener("pointercancel",l),this.grip.hasPointerCapture(r)&&this.grip.releasePointerCapture(r),o&&this.save(),this.dragged=o,requestAnimationFrame(()=>{this.dragged=!1}),c.preventDefault(),c.stopPropagation())};this.grip.addEventListener("pointermove",a),this.grip.addEventListener("pointerup",l),this.grip.addEventListener("pointercancel",l),e.preventDefault(),e.stopPropagation()}}const uc="flatcad.float-opacity.v1",dd=.2;function fc(n){if(typeof n!="number"||!Number.isFinite(n)||n<0||n>1)throw Error("Invalid floating-window opacity");return n}function Au(){try{const n=localStorage.getItem(uc);return n===null?dd:fc(JSON.parse(n))}catch{return dd}}function iy(n){localStorage.setItem(uc,JSON.stringify(fc(n)))}const Ua={"tool.select":"Select","tool.line":"Line / polyline","tool.rectangle":"Rectangle","tool.centerRectangle":"Centre rectangle","tool.circle":"Circle","tool.polygon":"Regular polygon","tool.slot":"Slot","tool.pan":"Pan","feature.extrude":"Extrude / Cut","edit.delete":"Delete selected","edit.duplicate":"Duplicate selected","edit.undo":"Undo","edit.redo":"Redo","file.save":"Save project","dialog.shortcuts":"Keyboard shortcuts","dialog.grid":"Grid settings","view.fit":"Fit Solid view"},kl={"tool.select":"KeyV","tool.line":"KeyL","tool.rectangle":"KeyR","tool.centerRectangle":"Shift+KeyR","tool.circle":"KeyC","tool.polygon":"KeyP","tool.slot":"KeyS","tool.pan":"KeyM","feature.extrude":"KeyE","edit.delete":"Delete","edit.duplicate":"Control+KeyD","edit.undo":"Control+KeyZ","edit.redo":"Control+Shift+KeyZ","file.save":"Control+KeyS","dialog.shortcuts":"KeyK","dialog.grid":"KeyG","view.fit":"KeyF"},pc=["ui-monospace, Consolas, monospace","system-ui, sans-serif","Arial, sans-serif","Verdana, sans-serif","Georgia, serif"],mc={fontFamily:pc[0],sizePx:15,weight:500},Ru=[{label:"Fine",enabled:!0,spacing:1,color:"#1b3045",snap:!1},{label:"Working",enabled:!0,spacing:5,color:"#254764",snap:!0},{label:"Major",enabled:!0,spacing:25,color:"#355d81",snap:!1}];function lr(){return{version:1,shortcuts:{...kl},grid:{tiers:Ru.map(n=>({...n})),snapGeometry:!0},polygon:{sides:6,rotation:-90},navigation:"fusion",rememberSurfaces:!0,sketchText:{...mc}}}const sy=/^(?:(?:Control|Alt|Shift|Meta)\+)*(?:Key[A-Z]|Digit[0-9]|Arrow(?:Up|Down|Left|Right)|Space|Escape|Delete|Backspace|Enter|Tab|F(?:[1-9]|1[0-2]))$/,ud=Object.keys(Ua);function Cu(n){if(!sy.test(n))throw new Error("Invalid shortcut: "+n);const e=n.split("+"),t=e.slice(0,-1);if(new Set(t).size!==t.length)throw new Error("Duplicate shortcut modifiers");return[...["Control","Alt","Shift","Meta"].filter(s=>t.includes(s)),e.at(-1)].join("+")}function fd(n){const e=n.code;return[n.ctrlKey?"Control":null,n.altKey?"Alt":null,n.shiftKey?"Shift":null,n.metaKey?"Meta":null,e].filter(t=>!!t).join("+")}function Pu(n){return n.replaceAll("Control","Ctrl").replaceAll("Key","").replaceAll("Digit","").replaceAll("Space","Space")}function vs(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Ht(n){if(!vs(n)||n.version!==1)throw new Error("Unsupported settings JSON version");if(!vs(n.shortcuts))throw new Error("Shortcuts object missing");const e={},t=new Set;if(Object.keys(n.shortcuts).some(l=>!ud.includes(l)))throw new Error("Unknown shortcut action");for(const l of ud){let c=n.shortcuts[l];if(c===void 0&&l==="view.fit"&&(c=Object.values(n.shortcuts).includes(kl["view.fit"])?"":kl["view.fit"]),typeof c!="string")throw new Error("Shortcut missing for "+l);const h=c===""?"":Cu(c);if(h&&t.has(h))throw new Error("Duplicate shortcut: "+h);h&&t.add(h),e[l]=h}if(!vs(n.grid)||!Array.isArray(n.grid.tiers)||n.grid.tiers.length!==3||typeof n.grid.snapGeometry!="boolean")throw new Error("Settings require three grid tiers");const s=n.grid.tiers.map((l,c)=>{if(!vs(l)||typeof l.enabled!="boolean"||typeof l.snap!="boolean"||typeof l.spacing!="number"||!Number.isFinite(l.spacing)||l.spacing<.001||l.spacing>1e5||typeof l.color!="string"||!/^#[0-9a-fA-F]{6}$/.test(l.color))throw new Error("Invalid grid tier "+(c+1));return{label:Ru[c].label,enabled:l.enabled,spacing:l.spacing,color:l.color.toLowerCase(),snap:l.snap}});if(!vs(n.polygon)||!Number.isInteger(n.polygon.sides)||n.polygon.sides<3||n.polygon.sides>64||typeof n.polygon.rotation!="number"||!Number.isFinite(n.polygon.rotation)||Math.abs(n.polygon.rotation)>36e3)throw new Error("Invalid polygon defaults");const r=n.navigation===void 0?"fusion":n.navigation;if(!Mf(r))throw new Error("Unknown CAD navigation preset");const o=n.rememberSurfaces===void 0?!0:n.rememberSurfaces;if(typeof o!="boolean")throw new Error("Invalid remember-surfaces preference");const a=n.sketchText===void 0?mc:n.sketchText;if(!vs(a)||!pc.includes(a.fontFamily)||!Number.isInteger(a.sizePx)||a.sizePx<10||a.sizePx>32||![400,500,600,700].includes(a.weight))throw new Error("Invalid sketch text style");return{version:1,shortcuts:e,grid:{tiers:s,snapGeometry:n.grid.snapGeometry},polygon:{sides:n.polygon.sides,rotation:n.polygon.rotation},navigation:r,rememberSurfaces:o,sketchText:{fontFamily:a.fontFamily,sizePx:a.sizePx,weight:a.weight}}}const gc="flatcad.preferences.v1";function Du(){try{const n=localStorage.getItem(gc);return n?Ht(JSON.parse(n)):lr()}catch{return lr()}}function ry(n){localStorage.setItem(gc,JSON.stringify(Ht(n)))}const Lu="flatcad.project.v1",fr=document.getElementById("app");if(!fr)throw new Error("Missing #app");fr.innerHTML=['<div class="shell workbench">','  <header class="topbar workbench-header">','    <div class="brand"><span class="brand-icon">▣</span><div><strong>flat<span>CAD</span></strong><small>XY · 2.5D</small></div></div>','    <input id="document-name" aria-label="Project name" maxlength="128" title="Project name">','    <nav id="menus" class="menu-triggers" aria-label="Application menus">','      <button data-menu="file" class="menu-trigger">File</button>','      <button data-menu="sketch" class="menu-trigger">Sketch</button>','      <button data-menu="model" class="menu-trigger">Model</button>','      <button data-menu="view" class="menu-trigger">View</button>','      <button data-menu="layout" class="menu-trigger">Layout</button>','      <button data-menu="render" class="menu-trigger">Render</button>','      <button data-menu="keybinds" class="menu-trigger">Keybinds</button>','      <button data-menu="settings" class="menu-trigger">Settings</button>','      <div id="menu-popover" class="menu-popover" hidden role="menu"></div>',"    </nav>",'    <button id="quick-extrude" class="button primary" title="Extrude or cut selected profile (E)">Extrude <kbd>E</kbd></button>','    <input type="file" id="project-input" accept=".json,.flatcad.json,application/json" hidden>','    <input type="file" id="settings-input" accept=".json,application/json" hidden>',"  </header>",'  <main id="workbench-layout" class="workspace workbench-layout">','    <section class="panel sketch-section workbench-sketch">','      <div class="panel-head compact-head sketch-titlebar"><div class="header-label"><span class="panel-index">01</span><div><strong>Sketch</strong><small>XY · millimetres</small></div></div>','        <div id="tool-dock-cluster" class="tool-dock-cluster">','          <button id="tool-dock-toggle" class="rail-tool dock-anchor" aria-label="Dock sketch tools" aria-pressed="false" title="Click to dock/undock; drag along titlebar to move"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="2"/><path d="M12 7v14M4 13H2a10 10 0 0 0 20 0h-2M5 13l2-2m12 2-2-2"/></svg></button>','          <div id="tool-dock-slot" class="tool-dock-slot" aria-label="Docked sketch tools"></div>',"        </div>",'        <span id="sketch-context" class="chip">Select</span>','        <div class="sketch-title-actions">','          <button id="grid-quick" class="text-button" title="Grid settings (G)">⊞ Grid</button>','          <span id="zoom" class="titlebar-zoom">4 px/mm</span>','          <span id="profile-count" class="titlebar-profiles">3 profiles</span>','          <button id="undo" class="titlebar-action" aria-label="Undo" title="Undo (Ctrl+Z)">↶</button>','          <button id="redo" class="titlebar-action" aria-label="Redo" title="Redo (Ctrl+Shift+Z)">↷</button>',"        </div></div>",'      <div id="sketch-wrap" class="sketch-wrap">','        <canvas id="sketch" aria-label="2D CAD sketch canvas">Canvas 2D is required</canvas>','        <div id="sketch-tool-rail" class="tool-rail" role="toolbar" aria-label="Sketching tools">','          <button id="tool-dock-float" class="rail-tool dock-anchor" title="Anchor tools in titlebar" aria-label="Anchor tools in titlebar"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="2"/><path d="M12 7v14M4 13H2a10 10 0 0 0 20 0h-2M5 13l2-2m12 2-2-2"/></svg></button>','          <button data-tool="select" title="Select (V)" class="rail-tool active" aria-label="Select">↖</button>','          <button data-tool="line" title="Line or polyline (L)" class="rail-tool" aria-label="Line">╱</button>','          <button data-tool="rectangle" title="Corner rectangle (R)" class="rail-tool" aria-label="Rectangle">▭</button>','          <button data-tool="centerRectangle" title="Centre rectangle (Shift+R)" class="rail-tool" aria-label="Centre rectangle">▣</button>','          <button data-tool="circle" title="Circle (C)" class="rail-tool" aria-label="Circle">◯</button>','          <button data-tool="polygon" title="Regular polygon (P)" class="rail-tool" aria-label="Polygon">⬡</button>','          <button data-tool="slot" title="Slot (S)" class="rail-tool" aria-label="Slot">⬭</button>','          <button data-tool="pan" title="Pan (M or middle mouse)" class="rail-tool" aria-label="Pan">✥</button>','          <span class="rail-divider"></span>','          <button data-tool="extrude" title="Extrude / Cut (E)" class="rail-tool" aria-label="Extrude or cut">↥</button>',"        </div>",'        <div id="shape-options" class="floating-tool-options" hidden></div>','        <div id="selection-bar" class="selection-bar" hidden>','          <span id="selection-count" class="selection-count" hidden>0 selected</span>','          <button id="selection-extrude" title="Extrude or cut selection (E)">↥ Extrude</button>','          <button id="selection-duplicate" title="Duplicate (Ctrl+D)">⧉</button>','          <button id="selection-properties" title="Exact dimensions">▤</button>','          <button id="selection-delete" title="Delete selected">×</button>',"        </div>",'        <section id="extrude-flyout" class="extrude-flyout" aria-label="Extrude or cut" hidden>','          <div class="flyout-head"><strong>Extrude</strong><button id="cancel-extrude" aria-label="Cancel extrusion">×</button></div>','          <div id="extrude-target" class="flyout-subtitle"></div>','          <label class="field"><span>Operation</span><select id="extrude-mode"><option value="auto">Auto</option><option value="add">Add / Join</option><option value="cut">Cut</option></select></label>','          <div class="field-row"><label class="field"><span>Start Z · mm</span><input type="text" inputmode="decimal" id="extrude-z" value="0" title="Click a horizontal face in Solid view to fill Start Z"></label>','            <label class="field"><span>Depth · mm</span><input type="text" inputmode="decimal" id="extrude-depth" value="8" title="Signed depth: negative extrudes down; click a horizontal face for a target elevation"></label></div>','          <label class="check through-all"><input type="checkbox" id="extrude-through"> Through all (cut)</label>','          <label class="check live-preview"><input type="checkbox" id="extrude-preview" checked> Preview in solid view</label>','          <div class="flyout-face-hint">ⓘ Click a horizontal face in Solid view to fill the last-focused <strong>Start Z</strong> or <strong>Depth</strong> field.</div>','          <span id="extrude-preview-error" class="preview-error" role="status" hidden></span>','          <div class="form-actions"><button id="apply-extrude" class="button primary">Apply <kbd>Enter</kbd></button><button id="dismiss-extrude" class="button muted-button">Cancel</button></div>','          <small class="flyout-hint">Drag the amber arrow to set positive or negative depth</small>','          <small id="extrude-nav-hint" class="flyout-nav-hint">MMB pan · Shift+MMB orbit</small>',"        </section>",'        <div id="canvas-hint" class="canvas-hint">Select a shape or press a drawing shortcut</div>',"      </div>","    </section>",'    <div id="main-resizer" class="panel-resizer main-resizer" role="separator" tabindex="0" aria-label="Resize Sketch and Solid panels" aria-valuemin="10" aria-valuemax="90"></div>','    <aside id="workbench-side" class="workbench-side">','      <section class="panel preview-panel">','        <div class="panel-head compact-head solid-titlebar"><div class="header-label"><span class="panel-index">02</span><div><strong>Solid</strong><small>Orbit · zoom · inspect</small></div></div>','          <div class="solid-view-actions"><span id="solid-volume" class="solid-volume" title="Exact B-rep volume" aria-label="Solid volume">— mm³</span>','            <span id="status-dot" class="live-dot" title="CAD ready" aria-label="CAD status"></span>','            <button id="fit-solid" class="text-button" title="Fit solid (F)">⊞ Fit <kbd>F</kbd></button><span class="chip">Z ↑</span>',"          </div></div>",'        <div id="preview" class="preview-root"><span class="placeholder">Loading 3D preview…</span></div>','        <span id="face-target-label" class="face-target-label" hidden></span>','        <div id="face-context-menu" class="face-context-menu" role="menu" hidden></div>','        <span id="solid-preview-status" class="solid-preview-status" hidden>PREVIEW · NOT APPLIED</span>','        <span id="cut-tool-metrics" class="cut-tool-metrics" hidden></span>','        <span id="status" class="status-feedback" role="status" aria-live="polite">Preparing workspace…</span>',"      </section>",'      <div id="side-resizer" class="panel-resizer side-resizer" role="separator" tabindex="0" aria-label="Resize Solid and inspector panels" aria-valuemin="10" aria-valuemax="90"></div>','      <div class="inspector-drawer">','        <details id="properties-details" class="drawer"><summary>Properties <span id="selection-name" class="muted">Nothing selected</span></summary>','          <div id="inspector" class="drawer-content"></div></details>','        <details id="history-details" class="drawer history-drawer"><summary>Feature history <span id="feature-count" class="muted">0 operations</span></summary>','          <div id="history-inline-host"><div id="feature-list" class="drawer-content history-content"></div></div></details>','        <details id="profiles-details" class="drawer"><summary>Profiles <span class="muted">Open list</span></summary>','          <div id="profile-list" class="drawer-content"></div></details>',"      </div>","    </aside>",'    <section id="history-timeline" class="history-timeline panel" aria-label="Feature timeline">','      <div class="timeline-head"><strong>History</strong><span id="timeline-indicator">Current solid</span><button id="timeline-now" class="titlebar-action" title="Show current final solid">↪ Now</button></div>','      <div id="timeline-content" class="timeline-content"></div>',"    </section>","  </main>","</div>",'<dialog id="shortcuts-dialog" class="settings-dialog"><div class="dialog-head"><div><strong>Keyboard shortcuts</strong><small>Click a key to rebind it. Empty means unassigned.</small></div><button data-close="shortcuts-dialog">×</button></div>','  <div id="shortcut-rows" class="dialog-scroll"></div><div id="shortcut-error" role="alert" class="validation-error"></div>','  <footer><button id="shortcut-reset" class="button">Reset defaults</button><button id="settings-export" class="button">Export settings JSON</button><button id="settings-import" class="button">Import JSON</button><button data-close="shortcuts-dialog" class="button primary">Done</button></footer></dialog>','<dialog id="grid-dialog" class="settings-dialog"><div class="dialog-head"><div><strong>Grid and snapping</strong><small>Three independent scales · millimetres</small></div><button data-close="grid-dialog">×</button></div>','  <div id="grid-rows" class="dialog-scroll"></div><div id="grid-error" role="alert" class="validation-error"></div>','  <footer><button id="grid-reset" class="button">Reset defaults</button><button data-close="grid-dialog" class="button primary">Done</button></footer></dialog>','<dialog id="navigation-dialog" class="settings-dialog"><div class="dialog-head"><div><strong>CAD navigation controls</strong><small>Choose the mouse behavior familiar from your CAD application.</small></div><button data-close="navigation-dialog">×</button></div>','  <div class="dialog-scroll"><label class="field"><span>Control scheme</span><select id="navigation-preset" aria-label="Navigation control scheme"></select></label><p id="navigation-hint" class="navigation-hint"></p>','  <label class="check remember-surface-setting"><input id="remember-surfaces" type="checkbox" checked> Remember mouse interaction surfaces</label>','  <small class="navigation-hint">When enabled, a new extrusion starts at the last clicked horizontal face elevation.</small></div>','  <footer><button data-close="navigation-dialog" class="button primary">Done</button></footer></dialog>','<dialog id="text-dialog" class="settings-dialog"><div class="dialog-head"><div><strong>Sketch text</strong><small>Canvas annotation typography</small></div><button data-close="text-dialog">×</button></div>','  <div class="dialog-scroll text-settings"><label class="field"><span>Font</span><select id="sketch-font-family" aria-label="Sketch font"></select></label>','  <label class="field"><span>Size (px)</span><input id="sketch-font-size" type="number" min="10" max="32" step="1" aria-label="Sketch font size"></label>','  <label class="field"><span>Weight</span><select id="sketch-font-weight" aria-label="Sketch font weight"><option value="400">Regular</option><option value="500">Medium</option><option value="600">Semibold</option><option value="700">Bold</option></select></label></div>','  <footer><button id="sketch-text-reset" class="button">Reset sketch text</button><button data-close="text-dialog" class="button primary">Done</button></footer></dialog>','<dialog id="layout-dialog" class="settings-dialog"><div class="dialog-head"><div><strong>Workspace tiles</strong><small>Rearrange the existing controls without changing CAD data</small></div><button data-close="layout-dialog">×</button></div>','  <div class="dialog-scroll"><label class="field"><span>Desktop layout</span><select id="tile-mode"><option value="split">Sketch + Solid with inspector below</option><option value="columns">Three adjustable columns</option><option value="float">Float — movable, resizable Solid viewport</option></select></label>','  <div id="tile-order" class="tile-order" aria-label="Tile arrangement"></div>','  <label class="layout-tile-visibility"><input id="tiled-solid-visible" type="checkbox" checked> Show tiled Solid viewport</label>','  <label class="layout-float-opacity"><span>Floating-window background opacity <output id="float-opacity-value">20%</output></span><input id="float-opacity" type="range" min="0" max="100" step="5" value="20" aria-label="Floating-window background opacity"></label></div>','  <footer><button id="tile-reset" class="button">Reset workspace</button><button data-close="layout-dialog" class="button primary">Done</button></footer></dialog>','<dialog id="render-dialog" class="settings-dialog render-inspector"><div class="dialog-head"><div><strong>Render inspector</strong><small>Live display tuning · native CAD remains unchanged</small></div><button data-close="render-dialog" aria-label="Close render inspector">×</button></div>','  <div class="dialog-scroll"><fieldset class="render-group"><legend>Antialiasing</legend>','    <details id="render-ao-diagnostics" class="render-advanced"><summary>Experimental AO diagnostics (not yet qualified)</summary>','    <label class="check render-effect-option"><input id="render-ao" type="checkbox"> Enable SSAO test</label>','    <label class="render-knob"><span>AO sampling radius <output id="render-ao-radius-value">8</output></span><input id="render-ao-radius" type="range" min="0" max="24" step="1" value="8"></label>','    <small class="navigation-hint">Diagnostic only: AO has not shown measurable model occlusion in current automated screenshots. Off by default.</small></details>','    <label class="field"><span>MSAA samples (independent of AO)</span><select id="render-msaa"><option value="browser">Browser default</option><option value="0">Off (0 samples)</option><option value="2">2 samples</option><option value="4">4 samples</option><option value="8">8 samples</option></select></label>','    <label class="field"><span>Requested SSAA resolution</span><select id="render-supersampling"><option value="1">Native (1×)</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="1.75">1.75×</option><option value="2">2×</option><option value="2.5">2.5×</option><option value="3">3×</option><option value="4">4×</option><option value="8">8× (experimental)</option></select></label>','    <label class="field"><span>Max framebuffer pixels per view</span><select id="render-pixel-budget"><option value="8000000">8M · safe default</option><option value="16000000">16M</option><option value="32000000">32M · experimental</option><option value="64000000">64M · experimental</option></select></label>','    <label class="field"><span>Canvas downsampling</span><select id="render-downsample"><option value="browser">Browser smoothing (default)</option><option value="nearest">Nearest / pixelated (diagnostic)</option></select></label>','    <small id="render-resolution-info" class="navigation-hint" aria-live="polite">Resolution and MSAA limits shown here.</small>','  </fieldset><fieldset class="render-group"><legend>CAD edges</legend>','    <label class="check render-effect-option"><input id="render-lines-enabled" type="checkbox" checked> Lines</label>','    <label class="render-knob"><span>Line width (CSS px) <output id="render-edge-width-value">1.00 px</output></span><input id="render-edge-width" type="range" min="0.5" max="5" step="0.25" value="1"></label>','    <label class="render-knob"><span>Line opacity <output id="render-edge-opacity-value">100%</output></span><input id="render-edge-opacity" type="range" min="0" max="1" step="0.05" value="1"></label>','    <label class="render-colour">Line colour <input id="render-edge-color" type="color" value="#000000"></label>','  </fieldset><fieldset class="render-group"><legend>Lighting</legend>','    <label class="render-knob"><span>Ambient light <output id="render-light-ambient-value">2.0</output></span><input id="render-light-ambient" type="range" min="0" max="4" step="0.25" value="2"></label>','    <label class="render-knob"><span>Directional key <output id="render-light-key-value">3.0</output></span><input id="render-light-key" type="range" min="0" max="5" step="0.25" value="3"></label>','    <small class="navigation-hint">Existing fill light remains at 1.0. All settings are UI preferences.</small>',"  </fieldset></div>",'  <footer><button id="render-clean-preset" class="button">Clean CAD preset</button><button id="render-reset" class="button">Reset render</button><button data-close="render-dialog" class="button primary">Done</button></footer></dialog>'].join(`
`);function q(n){const e=document.getElementById(n);if(!e)throw new Error("Element not found: "+n);return e}function lt(n){return q(n)}function re(n){return q(n)}function Je(n){return q(n)}function Ye(n,e=!1){const t=q("status");t.textContent=n,t.classList.toggle("error",e),q("status-dot").classList.toggle("error",e),q("status-dot").title=n}function cr(n,e=!1){const t=q("solid-volume");t.textContent=n!==null&&Number.isFinite(n)?(e?"Preview ":"")+n.toLocaleString("en-GB",{minimumFractionDigits:2,maximumFractionDigits:2})+" mm³":"— mm³",t.dataset.mode=e?"preview":"committed",n!==null&&Number.isFinite(n)?t.dataset.volumeMm3=String(n):delete t.dataset.volumeMm3}function ay(){try{const n=localStorage.getItem(Lu);return n?Ct(JSON.parse(n)):Oc}catch{return Oc}}let oe=ay(),le=Du(),vt=xu(),Xi=Au();function Na(n){Xi=fc(n),document.documentElement.style.setProperty("--flatcad-float-opacity",String(Xi)),re("float-opacity").value=String(Math.round(Xi*100)),q("float-opacity-value").textContent=Math.round(Xi*100)+"%"}Na(Xi);let Yi=[oe],Ln=0,cn=null,Ke=[],xn="select",Ma=null,In=null,Rt=[],_c=null,jn="depth",Kn=null,ra=null,Iu=!0,bi=0,Lo=!1,ba,ui=null,Bl=null,Uu=null,Jr=null,aa=0,Zn=null,Ri=null,Io=0,pd,md=3;const Fa=new Vf,Nu=new Cf(document.querySelector(".inspector-drawer"),n=>$t(n),n=>Ye(n,!0));let gd,Uo=0;const oy=867,es=new Rf(q("feature-list"),n=>Ft(()=>gy(n)),n=>Ft(()=>$t(mf(oe,n.id))),(n,e)=>ly(n,e),(n,e,t)=>Ft(()=>{Bu("feature:"+n.id+":"+e,t,i=>({...oe,features:oe.features.map(s=>s.id===n.id?{...s,[e]:i}:s)}))}));function ly(n,e){const t=q("preview");if(++Uo,clearTimeout(gd),delete t.dataset.historyCutOverlay,!n){delete t.dataset.historyFeatureId,delete t.dataset.historyFeatureCount,No(!1),q("timeline-indicator").textContent="Current solid",ui&&ws(nr(ui.mesh,oe),{preserveCamera:!0}),cr(ui?.statistics?.volumeMm3??null);return}if(!e){q("timeline-indicator").textContent="Preparing historical solid…",ka();return}Rt.length&&Fn();const i=nr(e.mesh,oe),s=e.operation==="cut"&&!!e.cutTool?.mesh?.triangles.length;if(ws(i,{preserveCamera:!0,...s?{pending:"cut",cutTool:e.cutTool.mesh}:{}}),No(!0),s){const o=Uo,a=n;t.dataset.historyCutOverlay="true",gd=setTimeout(()=>{o!==Uo||t.dataset.historyFeatureId!==a||(ws(i,{preserveCamera:!0}),No(!0),delete t.dataset.historyCutOverlay)},oy)}const r=oe.features.findIndex(o=>o.id===n);q("timeline-indicator").textContent="After feature "+(r+1)+" of "+oe.features.length,t.dataset.historyFeatureId=n,t.dataset.historyFeatureCount=String(r+1),cr(e.statistics.volumeMm3),q("solid-volume").dataset.mode="history",q("solid-volume").textContent="History · "+e.statistics.volumeMm3.toLocaleString("en-GB",{maximumFractionDigits:2,minimumFractionDigits:2})+" mm³"}const _t=new Hf(cy(),oe,le,{onCreate:n=>Ft(()=>{cn=n.id,Ke=[n.id],$t(pf(oe,n)),Nn("select")}),onCreateMany:n=>Ft(()=>{Ke=n.map(e=>e.id),cn=Ke.at(-1)??null,$t(Ct({...oe,profiles:[...oe.profiles,...n]}))}),onEdit:n=>Ft(()=>$t(wd(oe,n))),onEditMany:n=>Ft(()=>$t(vf(oe,n))),onSelect:(n,e=!1)=>ku(n,e),onExtrude:(n,e)=>fi(n,void 0,e),onExtrudeDepth:n=>{const e=re("extrude-through").checked;if(re("extrude-depth").value=String(n),re("extrude-through").checked=!1,e&&za()==="cut"&&Ri){const t=Ri.boundsMm[1][2];re("extrude-z").value=String(n<0?t:t-n)}Zi(),mi()},onViewChange:n=>{q("zoom").textContent=n.toFixed(2)+" px/mm",In&&Zi()},onStatus:n=>Ye(n)});function cy(){return q("sketch")}const Fu=new ny(q("sketch-tool-rail"),lt("tool-dock-float"),q("sketch-wrap"),q("tool-dock-slot"),()=>dt.setDocked(!0));function hy(n){Fu.setDocked(n),q("workbench-layout").classList.toggle("tools-docked",n);const e=lt("tool-dock-toggle");e.setAttribute("aria-pressed",String(n)),e.setAttribute("aria-label",n?"Undock sketch tools":"Dock sketch tools"),e.title=n?"Undock sketch tools (drag to reposition)":"Dock sketch tools (drag to reposition)",lt("tool-dock-float").hidden=n,requestAnimationFrame(pr)}const dt=new Ff(q("workbench-layout"),q("workbench-side"),q("main-resizer"),q("side-resizer"),hy,()=>{requestAnimationFrame(pr),requestAnimationFrame(Oa),Fu.onLayout()});function Oa(){const n=document.querySelector(".preview-panel");if(!n)return;const e=dt.tileMode==="float";if(e){const t=dt.floatingRect;n.style.left=t.left+"px",n.style.top=t.top+"px",n.style.width=t.width+"px",n.style.height=t.height+"px"}else n.style.removeProperty("left"),n.style.removeProperty("top"),n.style.removeProperty("width"),n.style.removeProperty("height");Dt?.setFloating(e)}Ld(document.querySelector(".preview-panel"),{enabled:()=>dt.tileMode==="float",onChange:n=>dt.updateFloatingRect(n),onEnd:()=>dt.persistFloatingRect()});window.addEventListener("resize",()=>requestAnimationFrame(Oa));function Ou(){const n=q("tool-dock-cluster").parentElement,e=n.querySelector(".header-label"),t=n.querySelector(".sketch-title-actions"),s=q("sketch-tool-rail").querySelectorAll("[data-tool]").length*30+18;return Math.max(0,n.clientWidth-e.offsetWidth-t.offsetWidth-s-29-28)}function pr(){const n=q("tool-dock-cluster").parentElement,e=q("tool-dock-cluster");n.querySelector(".header-label"),e.style.marginLeft=Math.round(Ou()*dt.dockX)+"px",e.dataset.dockX=String(dt.dockX)}new ResizeObserver(()=>pr()).observe(q("tool-dock-cluster").parentElement);let Ea=!1;const Gn=lt("tool-dock-toggle");Gn.addEventListener("pointerdown",n=>{if(n.button!==0)return;const e=Math.max(1,Ou()),t=n.clientX,i=dt.dockX;let s=!1;Gn.setPointerCapture(n.pointerId);const r=a=>{a.pointerId===n.pointerId&&(Math.abs(a.clientX-t)>4&&(s=!0),s&&dt.setDockX(i+(a.clientX-t)/e))},o=a=>{a.pointerId===n.pointerId&&(Ea=s,requestAnimationFrame(()=>{Ea=!1}),Gn.removeEventListener("pointermove",r),Gn.removeEventListener("pointerup",o),Gn.removeEventListener("pointercancel",o),Gn.hasPointerCapture(a.pointerId)&&Gn.releasePointerCapture(a.pointerId))};Gn.addEventListener("pointermove",r),Gn.addEventListener("pointerup",o),Gn.addEventListener("pointercancel",o)});requestAnimationFrame(pr);let Dt=null,Un=null;try{const n=q("preview");n.replaceChildren(),Dt=new yu(n),n.parentElement.append(Su(Dt)),Dt.setNavigationPreset(le.navigation),Dt.setRenderSettings(vt),Dt.setFacePickHandler(e=>{e!==null&&(Kn=e),wa(e)}),Dt.setSurfaceHoverHandler((e,t)=>_y(e,t)),Dt.setSurfaceMenuHandler((e,t)=>vy(e,t)),Dt.setFloating(dt.tileMode==="float"),requestAnimationFrame(Oa)}catch(n){q("preview").textContent="3D preview unavailable; sketching and STEP export remain available",Ye(String(n),!0)}try{Un=new ey(()=>le.navigation,()=>vt,n=>{n!==null&&(Kn=n),wa(n)},n=>Ye(n,!0))}catch(n){Ye("Independent floating views unavailable: "+String(n),!0)}function ws(n,e={}){Dt?.setMesh(n,e),Un?.setMesh(n,e)}function dy(n){Dt?.setCommittedPickMesh(n),Un?.setCommittedPickMesh(n)}function No(n){Dt?.setHistoryInspection(n),Un?.setHistoryInspection(n)}function uy(n){Dt?.setFaceElevations(n),Un?.setFaceElevations(n)}function Ft(n){try{n()}catch(e){Ye(e instanceof Error?e.message:String(e),!0),Pi()}}function vc(){try{localStorage.setItem(Lu,JSON.stringify(oe))}catch{Ye("Autosave unavailable; use File → Save project",!0)}}function tn(){try{le=Ht(le),ry(le),_t.setPreferences(le),Dt?.setNavigationPreset(le.navigation),Un?.setNavigationPreset(le.navigation),q("extrude-nav-hint").textContent=Fs[le.navigation],re("remember-surfaces").checked=le.rememberSurfaces,fr.style.setProperty("--sketch-text-size",le.sketchText.sizePx+"px"),In&&Zi()}catch(n){Ye("Settings invalid: "+String(n),!0)}}function $t(n){es.clearSelection(),oe=Ct(Vl(oe,n)),Yi=[...Yi.slice(0,Ln+1),oe].slice(-100),Ln=Yi.length-1,vc(),Pi(),Ba()}function hr(n){n<0||n>=Yi.length||(es.clearSelection(),Ln=n,oe=Yi[n],vc(),Pi(),Ba())}function Nn(n){Fn(),xn=n,_t.setTool(n),document.querySelectorAll("[data-tool]").forEach(t=>{const i=t.dataset.tool===n;t.classList.toggle("active",i),t.setAttribute("aria-pressed",String(i))}),q("sketch-context").textContent=n==="centerRectangle"?"Centre rectangle":n==="extrude"?"Extrude / Cut":n==="line"?"Line / Polyline":n.charAt(0).toUpperCase()+n.slice(1);const e={select:"Click to select · Ctrl+click to add/remove · drag to move · E to extrude",line:"Click vertices · click first point to close · Enter for open line",rectangle:"Drag corner to corner · hold Shift for a square",centerRectangle:"Drag outward from centre · hold Shift for a square",circle:"Click centre and drag for radius",polygon:"Click centre and drag · adjust sides and rotation above",slot:"Drag between end centres · set radius above",pan:"Drag to pan · wheel zooms at pointer",extrude:"Click a closed profile to extrude or cut"};q("canvas-hint").textContent=e[n],Mc(),nn()}function zl(n){return oe.profiles.find(e=>e.id===n)}function ku(n,e=!1){Ke=gf(Ke,n,e),cn=Ke.at(-1)??null,Rt.length&&(Rt.length!==Ke.length||Rt.some(t=>!Ke.includes(t)))&&Fn(),Pi()}function Pi(){Ke=Ke.filter(n=>!!zl(n)),cn=Ke.at(-1)??null,_t.setDocument(oe),_t.setSelected(cn,Ke),q("profile-count").textContent=String(oe.profiles.length)+" profiles",q("feature-count").textContent=String(oe.features.length)+" operations",q("selection-name").textContent=Ke.length>1?Ke.length+" profiles selected":zl(cn)?.kind||"Nothing selected",q("selection-count").hidden=Ke.length<2,q("selection-count").textContent=Ke.length+" selected",re("document-name").value=oe.name,lt("undo").disabled=Ln===0,lt("redo").disabled=Ln===Yi.length-1,q("selection-bar").hidden=Ke.length===0,my(),py(),xc(),Nu.render(oe)}function Fo(n,e,t){const i=document.createElement("label");i.className="field";const s=document.createElement("span");s.textContent=n;const r=document.createElement("input");return r.type="number",r.step="any",r.value=String(e),r.setAttribute("aria-label",n),r.addEventListener("change",()=>{const o=Number(r.value);if(!Number.isFinite(o)){Ye("Enter a finite numerical value",!0),Pi();return}Ft(()=>t(o))}),i.append(s,r),i}function Bu(n,e,t){const i=e.trim(),s=As(i,oe.parameters??[]),r=(oe.bindings??[]).filter(o=>o.target!==n);Bo(i)||r.push({target:n,expression:i}),$t(Ct({...t(s),bindings:r}))}function zu(n,e,t,i){const s=document.createElement("label");s.className="field bound-field";const r=document.createElement("span");r.textContent=n;const o=document.createElement("input");o.type="text",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off";const a=oe.bindings?.find(l=>l.target===t);return o.value=a?.expression??String(e),o.dataset.bindingTarget=t,o.dataset.expression=String(!!a),o.title=a?"="+e+" mm · linked formula":"Exact number or parameter expression",o.setAttribute("aria-label",n),o.onchange=()=>Ft(()=>Bu(t,o.value,i)),s.append(r,o),s}function fy(n,e,t,i){return zu(t,i,"profile:"+n.id+":"+e,s=>({...oe,profiles:oe.profiles.map(r=>r.id===n.id?{...r,[e]:s}:r)}))}function py(){const n=q("inspector");n.replaceChildren();const e=zl(cn);if(!e){n.textContent="Select a sketch element to edit its exact parameters.";return}if(Ke.length>1){n.textContent=Ke.length+" profiles selected · drag to move as a group, Ctrl+D to duplicate, Delete to remove, or E to extrude/cut together.";return}const t=document.createElement("strong");t.textContent=e.kind+" · "+e.id,n.append(t);const i=document.createElement("div");i.className="property-fields";const s=(o,a,l=o)=>{i.append(fy(e,o,l,a))};switch(e.kind){case"rectangle":s("x",e.x,"Left X"),s("y",e.y,"Bottom Y"),s("width",e.width),s("height",e.height);break;case"circle":s("x",e.x,"Centre X"),s("y",e.y,"Centre Y"),s("radius",e.radius);break;case"polygon":s("x",e.x,"Centre X"),s("y",e.y,"Centre Y"),s("radius",e.radius),s("sides",e.sides),s("rotation",e.rotation,"Rotation °");break;case"slot":s("x1",e.x1,"Start X"),s("y1",e.y1,"Start Y"),s("x2",e.x2,"End X"),s("y2",e.y2,"End Y"),s("radius",e.radius);break;case"path":{e.points.forEach((a,l)=>{for(const c of["x","y"])i.append(zu("P"+(l+1)+" "+c.toUpperCase(),a[c],"profile:"+e.id+":points."+l+"."+c,h=>{const d=e.points.map((u,p)=>p===l?{...u,[c]:h}:u);return{...oe,profiles:oe.profiles.map(u=>u.id===e.id?{...e,points:d}:u)}}))});const o=document.createElement("button");o.className="button",o.textContent=e.closed?"Open polyline":"Close polyline",o.onclick=()=>Ft(()=>$t(wd(oe,{...e,closed:!e.closed}))),n.append(o);break}}n.append(i);const r=document.createElement("div");r.className="form-actions";for(const[o,a]of[["Extrude / Cut",()=>fi(e.id)],["Duplicate",()=>Sc()],["Delete",()=>yc()]]){const l=document.createElement("button");l.className="button",l.textContent=o,l.onclick=a,r.append(l)}n.append(r)}function my(){const n=q("profile-list");n.replaceChildren();for(const e of oe.profiles){const t=document.createElement("button");t.className="profile-item"+(Ke.includes(e.id)?" selected":""),t.setAttribute("aria-pressed",String(Ke.includes(e.id))),t.textContent=(e.kind==="path"&&!e.closed?"╱ ":"▭ ")+e.kind+" · "+e.id.slice(0,15),t.onclick=i=>ku(e.id,i.ctrlKey||i.metaKey),n.append(t)}oe.profiles.length||(n.textContent="Empty sketch — draw a profile.")}function xc(){es.render(oe,Bl===oe?Uu:null)}function ka(){if(q("preview").dataset.buildState!=="ready"||!Aa()&&!q("history-details").open||!oe.features.length||Bl===oe||Jr===oe)return;const n=oe,e=++aa;Jr=n,Fa.build(n,{includeHistory:!0}).then(t=>{e!==aa||oe!==n||(Uu=t.historyFrames,Bl=n,xc())}).catch(t=>{e!==aa||oe!==n||Ye("Feature thumbnail rendering failed: "+String(t),!0)}).finally(()=>{Jr===n&&(Jr=null)})}function gy(n){$t(Ct({...oe,features:oe.features.map(e=>e.id===n.id?n:e)}))}function yc(){if(Ke.length===0)return;const n=new Set(Ke),e=Ct({...oe,profiles:oe.profiles.filter(t=>!n.has(t.id)),features:oe.features.filter(t=>!n.has(t.profileId)),bindings:oe.bindings?.filter(t=>!([...n].some(i=>t.target.startsWith("profile:"+i+":"))||oe.features.some(i=>n.has(i.profileId)&&t.target.startsWith("feature:"+i.id+":"))))});Ke=[],cn=null,$t(e)}function Sc(){const n=Ra(oe,Ke);if(!n.length)return;const e=n.map(i=>({...ko(i,5,5),id:Hi("copy")})),t=Ct({...oe,profiles:[...oe.profiles,...e]});Ke=e.map(i=>i.id),cn=Ke.at(-1)??null,$t(t)}function Ba(){const n=++Io;++bi,++aa,clearTimeout(ba),clearTimeout(pd);const e=oe;q("preview").dataset.buildState="rebuilding",q("preview").dataset.lastValidVisible=ui?.mesh?"true":"false",Ye(e.features.length?"Regenerating exact solid…":"Sketch ready · press E on a closed shape"),pd=setTimeout(async()=>{try{const t=await Fa.build(e);if(n!==Io)return;Ri=t.statistics,ui=t,cr(t.statistics?.volumeMm3??null),uy(e.features.flatMap(i=>[i.z,i.z+i.depth])),Rt.length&&re("extrude-preview").checked?(dy(t.mesh),mi()):q("preview").dataset.historyFeatureId||ws(nr(t.mesh,e)),q("preview").dataset.buildState="ready",(Aa()||q("history-details").open)&&ka(),t.statistics?(q("status").dataset.volumeMm3=String(t.statistics.volumeMm3),q("status").dataset.boundsMm=JSON.stringify(t.statistics.boundsMm)):(delete q("status").dataset.volumeMm3,delete q("status").dataset.boundsMm),Ye(t.mesh?"Exact solid generated · "+t.statistics?.volumeMm3.toFixed(3)+" mm³":"Sketch ready · press E on a closed shape")}catch(t){if(n!==Io)return;q("preview").dataset.buildState="stale",q("preview").dataset.lastValidVisible=ui?.mesh?"true":"false",Ye("CAD rebuild failed · showing last valid solid: "+String(t),!0)}},180)}function Mc(){const n=q("shape-options");if(n.replaceChildren(),xn!=="polygon"&&xn!=="slot"&&xn!=="line"){n.hidden=!0;return}if(n.hidden=!1,xn==="line"){n.append(Oo("Line / polyline"));const e=document.createElement("button");e.textContent="Finish open",e.onclick=()=>_t.finishLine(!1);const t=document.createElement("button");t.textContent="Close outline",t.onclick=()=>_t.finishLine(!0),n.append(e,t);return}xn==="slot"&&(n.append(Oo("Slot radius (mm)")),n.append(Fo("Radius",md,e=>{if(!(e>0))throw new Error("Radius must be positive");md=e,_t.setSlotRadius(e)}))),xn==="polygon"&&(n.append(Oo("Polygon")),n.append(Fo("Sides (3–64)",le.polygon.sides,e=>{le=Ht({...le,polygon:{...le.polygon,sides:e}}),tn(),Mc()})),n.append(Fo("Rotation °",le.polygon.rotation,e=>{le=Ht({...le,polygon:{...le.polygon,rotation:e}}),tn()})))}function Oo(n){const e=document.createElement("strong");return e.textContent=n,e}function oa(){const n=q("preview");n.dataset.historyFeatureId||(delete n.dataset.cutToolVolumeMm3,delete n.dataset.cutRemovedVolumeMm3,delete n.dataset.cutToolBoundsMm,q("cut-tool-metrics").hidden=!0,delete n.dataset.previewState,delete n.dataset.previewVolumeMm3,delete n.dataset.previewOperation,q("solid-preview-status").hidden=!0,ui&&ws(nr(ui.mesh,oe),{preserveCamera:!0}),cr(ui?.statistics?.volumeMm3??null))}function Fn(){_c=null,++bi,clearTimeout(ba),In=null,Rt=[],q("extrude-flyout").hidden=!0,dr(),_t.setExtrudeHandle(null),oa()}function Hu(){if(Ri)return[Ri.boundsMm[0][2]-1,Ri.boundsMm[1][2]+1];if(oe.features.length){const n=oe.features.flatMap(e=>[e.z,e.z+e.depth]);return[Math.min(...n)-1,Math.max(...n)+1]}return[-1,9]}function bc(){return{z:As(re("extrude-z").value,oe.parameters??[]),depth:As(re("extrude-depth").value,oe.parameters??[])}}function za(){const n=Je("extrude-mode").value;return n==="add"||n==="cut"?n:_f(oe,Rt)}function Zi(){if(!Rt.length)return;const n=q("extrude-flyout");if(n.hidden)return;const e=_t.getViewport(),t=_c??_t.getSelectedPoint()??{x:e.width/2,y:e.height/2},i=e.height-t.y-8,s=t.y-8;n.style.maxHeight=Math.max(160,Math.min(e.height-16,Math.max(i,s)))+"px",n.style.overflowY="auto";const r=xf({viewport:e,cursor:t,popup:{width:n.offsetWidth||258,height:n.offsetHeight||315},arrow:_t.getExtrudeArrowScreen()});n.style.left=r.x+"px",n.style.top=r.y+"px",n.dataset.placementCorner=r.corner,n.dataset.arrowAvoidancePx=String(r.arrowAvoidancePx),delete n.dataset.majorGridPixels,delete n.dataset.placementSide}function wa(n){if(!Rt.length||q("extrude-flyout").hidden)return;if(n===null){Ye("Click a flat horizontal face of the committed solid to pick its Z elevation",!0);return}const e=re(jn==="z"?"extrude-z":"extrude-depth");if(jn==="z")e.value=String(n);else{let s;try{s=As(re("extrude-z").value,oe.parameters??[])}catch{Ye("Enter a valid Start Z before picking target Depth",!0);return}const r=yf(s,n);if(r===0){Ye("Target face is level with Start Z: depth cannot be zero",!0);return}e.value=String(r)}re("extrude-through").checked=!1;let t=0;try{t=As(re("extrude-depth").value,oe.parameters??[])}catch{}In&&Number.isFinite(t)&&t!==0&&_t.setExtrudeHandle({id:In,depth:t});const i=q("preview");i.dataset.lastPickedFaceZ=String(n),i.dataset.lastPickedField=jn,Ye(jn==="z"?"Start Z set to "+n+" mm":"Depth set to "+e.value+" mm (relative to Start Z)"),Zi(),mi(),e.focus({preventScroll:!0})}function _y(n,e){const t=q("face-target-label");if(!n){t.hidden=!0,delete q("preview").dataset.hoverLabel;return}const i=Rt.length?jn:null,s=Number(re("extrude-z").value),r=Gl(n,i,Number.isFinite(s)?s:0);if(!r){t.hidden=!0;return}t.textContent=r,t.hidden=!1,q("preview").dataset.hoverLabel=r;const o=q("preview").parentElement.getBoundingClientRect(),a=e.x-o.left+13,l=e.y-o.top+14;t.style.left=Math.max(7,Math.min(o.width-195,a))+"px",t.style.top=Math.max(47,Math.min(o.height-35,l))+"px"}function dr(){q("face-context-menu").hidden=!0,ra=null}function vy(n,e){if(dr(),!n)return;n.z!==null&&(Kn=n.z);const t=q("face-context-menu");t.replaceChildren();const i=document.createElement("div");i.className="face-context-title",i.textContent=Gl(n,null,0),t.append(i);const s=Rt.length>0||Ke.length>0,r=(c,h,d)=>{const u=document.createElement("button");u.type="button",u.role="menuitem",u.textContent=c,u.disabled=!h,u.dataset.faceAction=c,u.onclick=()=>{dr(),d()},t.append(u)};r("Latch Start Z",n.z!==null&&s,()=>{Rt.length||fi(),jn="z",wa(n.z)}),r("Latch Depth",n.z!==null&&s,()=>{Rt.length||fi(),jn="depth",wa(n.z)});const o=Of(oe,n);let a=!1;if(o)try{Ct({...oe,features:oe.features.filter(c=>c.id!==o.id)}),a=!0}catch{a=!1}if(ra=a&&o?o.id:null,r("Delete Feature",a&&o!==null,()=>{o&&Ft(()=>{const c=Ct({...oe,features:oe.features.filter(h=>h.id!==o.id)});Fn(),$t(c),Ye("Deleted feature "+o.id+" · Undo restores it")})}),!o){const c=document.createElement("small");c.className="face-context-note",c.textContent="Delete unavailable: no uniquely identified source feature",t.append(c)}const l=q("preview").parentElement.getBoundingClientRect();t.style.left=Math.max(8,Math.min(l.width-230,e.x-l.left))+"px",t.style.top=Math.max(48,Math.min(l.height-176,e.y-l.top))+"px",t.hidden=!1,q("preview").dataset.contextTargetKind=n.kind,ra?q("preview").dataset.contextFeatureId=ra:delete q("preview").dataset.contextFeatureId}function _d(n){const e=q("extrude-preview-error");e.hidden=!1,e.textContent=n instanceof Error?n.message:String(n)}function mi(){const n=++bi;clearTimeout(ba);const e=q("extrude-preview-error");if(e.hidden=!0,e.textContent="",!Rt.length||!re("extrude-preview").checked){oa();return}const t=q("preview"),i=q("solid-preview-status");i.hidden=!1,i.textContent="CALCULATING PREVIEW…",t.dataset.previewState="loading",delete t.dataset.previewVolumeMm3,delete t.dataset.previewOperation;const s=oe,r=[...Rt],o=za();let a=NaN,l=NaN;try{({z:a,depth:l}=bc())}catch{}ba=setTimeout(async()=>{if(n!==bi)return;let c;try{c=Td(s,r,o,a,l)}catch(h){n===bi&&(oa(),_d(h));return}if(!Lo){Lo=!0;try{const h=c.features.slice(s.features.length).map(p=>p.id),d=await Fa.build(c,{cutToolFeatureIds:o==="cut"?h:[]});if(n!==bi||oe!==s||!Rt.length||!re("extrude-preview").checked)return;ws(nr(d.mesh,c),{pending:o,preserveCamera:!0,cutTool:d.cutTool?.mesh}),cr(d.statistics?.volumeMm3??null,!0),t.dataset.previewState="ready",t.dataset.previewOperation=o,d.statistics&&(t.dataset.previewVolumeMm3=String(d.statistics.volumeMm3));const u=q("cut-tool-metrics");if(o==="cut"&&d.cutTool&&d.statistics&&Ri){const p=d.cutTool.statistics.volumeMm3,g=Math.max(0,Ri.volumeMm3-d.statistics.volumeMm3);t.dataset.cutToolVolumeMm3=String(p),t.dataset.cutRemovedVolumeMm3=String(g),t.dataset.cutToolBoundsMm=JSON.stringify(d.cutTool.statistics.boundsMm),u.textContent="Red tool: "+p.toFixed(2)+" mm³ · Material removed: "+g.toFixed(2)+" mm³ · Overshoot shown",u.hidden=!1}else delete t.dataset.cutToolVolumeMm3,delete t.dataset.cutRemovedVolumeMm3,delete t.dataset.cutToolBoundsMm,u.hidden=!0;i.hidden=!1,i.textContent="PREVIEW · "+o.toUpperCase()+" · NOT APPLIED"}catch(h){n===bi&&(oa(),_d("Preview failed: "+String(h)))}finally{Lo=!1,n!==bi&&Rt.length&&re("extrude-preview").checked&&mi()}}},250)}function Vu(){if(!In)return;const n=za(),e=Je("extrude-mode").options[0];e.textContent="Auto → "+(n==="cut"?"Cut":"Add");const t=re("extrude-through"),i=t.checked;if(t.disabled=n!=="cut"||oe.features.length===0,t.disabled&&(t.checked=!1,i&&(re("extrude-z").value="0",re("extrude-depth").value="8")),n==="cut"&&oe.features.length&&!t.checked){const[s,r]=Hu(),o=le.rememberSurfaces?Kn:null;o!==null&&o>=s&&o<=r?(re("extrude-z").value=String(o),re("extrude-depth").value=String(o>s?s-o:r-o)):(re("extrude-z").value=String(s),re("extrude-depth").value=String(r-s)),t.checked=!0}_t.setExtrudeHandle({id:In,depth:Number(re("extrude-depth").value)||8}),Zi(),mi()}function fi(n,e,t){const i=n?Ke.includes(n)?[...Ke]:[n]:[...Ke];if(!i.length){Nn("extrude"),Ye("Click a closed shape to extrude or cut");return}es.clearSelection();const s=Ra(oe,i);if(s.length!==i.length||s.some(a=>!Ts(a))){Ye("Only closed, valid sketch profiles can be extruded. Close any open lines first.",!0);return}nn(),Fn(),Ke=i,cn=n??i.at(-1)??null,xn="extrude",_t.setTool("extrude"),document.querySelectorAll("[data-tool]").forEach(a=>a.classList.toggle("active",a.dataset.tool==="extrude")),Rt=i,In=cn,_c=t??_t.getLastPointerScreen()??_t.getSelectedPoint(),_t.setSelected(cn,Ke);const r=q("extrude-flyout");r.hidden=!1,q("extrude-target").textContent=i.length>1?i.length+" profiles selected":s[0].kind+" · "+i[0].slice(0,12),Je("extrude-mode").value=e||"auto";const o=le.rememberSurfaces&&Kn!==null&&oe.features.some(a=>Math.abs(a.z-Kn)<.001||Math.abs(a.z+a.depth-Kn)<.001)?Kn:0;re("extrude-z").value=String(o),re("extrude-depth").value="8",re("extrude-through").checked=!1,re("extrude-preview").checked=Iu,Vu(),Pi(),jn="depth",re("extrude-depth").focus()}function Gu(){if(!Rt.length)return;const n=za(),e=re("extrude-z").value.trim(),t=re("extrude-depth").value.trim(),i=[...Rt];Ft(()=>{const{z:s,depth:r}=bc(),o=Td(oe,i,n,s,r),a=o.features.slice(oe.features.length),l=[...o.bindings??[]];for(const h of a)Bo(e)||l.push({target:"feature:"+h.id+":z",expression:e}),Bo(t)||l.push({target:"feature:"+h.id+":depth",expression:t});const c=Ct({...o,bindings:l});Fn(),$t(c),Nn("select")})}function la(n){q(n).open=!0,nn()}function Ec(n,e){const t=URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=e,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e3)}function Wu(){return oe.name.toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-|-$/g,"")||"part"}function xy(){Ec(new Blob([JSON.stringify(oe,null,2)],{type:"application/json"}),Wu()+".flatcad.json"),Ye("Editable native project downloaded")}function yy(){Kn=null,cn=null,Fn(),$t({schemaVersion:2,name:"Untitled part",units:"mm",profiles:[],features:[]}),Nn("select")}async function Sy(n){if(n.size>2e6)throw new Error("Project exceeds 2 MB");const e=Ct(JSON.parse(await n.text()));es.clearSelection(),oe=e,Yi=[oe],Ln=0,cn=null,Kn=null,vc(),Fn(),Pi(),Ba(),Ye("Project loaded · "+oe.profiles.length+" profiles")}async function My(){if(!oe.features.length){Ye("Extrude at least one profile first",!0);return}const n=oe;Ye("Exporting exact STEP geometry…");try{const e=await Fa.exportSTEP(n);if(e.size<100)throw new Error("STEP export returned an empty or invalid file");Ec(e,Wu()+".step"),Ye("STEP exported · independent reader qualification remains required")}catch(e){Ye("STEP export failed: "+String(e),!0)}}const by={file:[["New project","file.new"],["Open project…","file.open"],["Save native project","file.save"],["Export STEP","file.step"]],sketch:[["Select","tool.select"],["Line / polyline","tool.line"],["Rectangle","tool.rectangle"],["Centre rectangle","tool.centerRectangle"],["Circle","tool.circle"],["Regular polygon","tool.polygon"],["Slot","tool.slot"],["Finish open line","line.finish"],["Close line outline","line.close"],["Duplicate selected","edit.duplicate"],["Delete selected","edit.delete"],["Exact properties","view.properties"]],model:[["Extrude / Cut (Auto)","feature.extrude"],["Add extrusion","model.add"],["Subtract extrusion","model.cut"],["Feature history","view.history"],["Named parameters…","dialog.parameters"]],view:[["Pan","tool.pan"],["Fit Solid View","view.fit"],["Grid and snapping…","dialog.grid"],["Profile list","view.profiles"],["Properties","view.properties"],["History","view.history"],["New floating view","view.float.new"],["Close floating views","view.float.close"],["Show tiled Solid","view.solid.show"],["Hide tiled Solid","view.solid.hide"],["Float solid (replace tile)","view.float"],["Dock solid","view.dock"],["Current solid","view.now"]],layout:[["Workspace tiles…","dialog.layout"],["Float solid","view.float"],["Dock solid","view.dock"],["Show tiled Solid","view.solid.show"],["Hide tiled Solid","view.solid.hide"]],render:[["Effects and antialiasing…","dialog.render"],["Toggle ambient occlusion","render.toggle-ao"]],keybinds:[["View / reassign all…","dialog.shortcuts"],...Object.entries(Ua).map(([n,e])=>[e,"keybind.reassign."+n])],settings:[["Keyboard shortcuts…","dialog.shortcuts"],["Grid and snapping…","dialog.grid"],["Sketch text…","dialog.text"],["CAD navigation controls…","dialog.navigation"],["Toggle remember mouse surfaces","prefs.remember"],["Export settings JSON","prefs.export"],["Import settings JSON","prefs.import"],["Reset settings","prefs.reset"]]};function nn(){Ma=null,q("menu-popover").hidden=!0}function Ey(n){if(Ma===n){nn();return}Ma=n;const e=q("menu-popover");e.replaceChildren(),e.classList.toggle("keybinds-popover",n==="keybinds");const t=document.querySelector('[data-menu="'+n+'"]');for(const[i,s]of by[n]||[]){const r=document.createElement("button");r.dataset.command=s,r.setAttribute("role","menuitem"),r.textContent=i;const o=s.startsWith("keybind.reassign.")?s.slice(17):s,a=le.shortcuts[o];if(a){const l=document.createElement("span");l.textContent=Pu(a),l.className="menu-shortcut",r.append(l)}r.onclick=()=>{nn(),Xu(s)},e.append(r)}e.hidden=!1,t&&(e.style.left=Math.max(0,Math.min(t.offsetLeft,(e.parentElement?.clientWidth??0)-e.getBoundingClientRect().width))+"px")}function Xu(n){if(n.startsWith("keybind.reassign.")){const e=n.slice(17);Object.prototype.hasOwnProperty.call(Ua,e)&&vd(e);return}if(n.startsWith("tool.")){Nn(n.slice(5));return}switch(n){case"feature.extrude":fi();break;case"model.add":fi(void 0,"add");break;case"model.cut":fi(void 0,"cut");break;case"edit.delete":Ft(yc);break;case"edit.duplicate":Ft(Sc);break;case"edit.undo":hr(Ln-1);break;case"edit.redo":hr(Ln+1);break;case"line.finish":_t.finishLine(!1);break;case"line.close":_t.finishLine(!0);break;case"view.properties":la("properties-details");break;case"view.profiles":la("profiles-details");break;case"view.history":la("history-details");break;case"view.fit":Dt?.fitView();break;case"file.new":yy();break;case"file.open":re("project-input").click();break;case"file.save":xy();break;case"file.step":My();break;case"dialog.shortcuts":vd();break;case"dialog.grid":qu();break;case"dialog.navigation":Py();break;case"dialog.text":wy();break;case"dialog.layout":Cy();break;case"dialog.render":Ry();break;case"render.toggle-ao":On({...vt,ambientOcclusion:!vt.ambientOcclusion});break;case"dialog.parameters":nn(),Nu.open();break;case"view.now":es.clearSelection();break;case"view.float":dt.setTileMode("float");break;case"view.dock":dt.setTileMode("split");break;case"view.float.new":Ft(()=>{Un?.add()});break;case"view.float.close":Un?.removeAll();break;case"view.solid.show":dt.setTiledSolidVisible(!0);break;case"view.solid.hide":dt.setTiledSolidVisible(!1);break;case"prefs.export":Yu();break;case"prefs.import":re("settings-input").click();break;case"prefs.remember":le=Ht({...le,rememberSurfaces:!le.rememberSurfaces}),tn(),Ye("Remember mouse surfaces "+(le.rememberSurfaces?"enabled":"disabled"));break;case"prefs.reset":le=lr(),tn(),Ye("Settings reset to defaults");break}}function en(n){return q(n)}function vd(n){nn(),Zn=null,$i();const e=en("shortcuts-dialog");e.open||e.showModal(),n&&q("shortcut-rows").querySelector('[data-action="'+n+'"]')?.click()}function $i(){const n=q("shortcut-rows");n.replaceChildren();for(const[e,t]of Object.entries(Ua)){const i=document.createElement("div");i.className="shortcut-row";const s=document.createElement("span");s.textContent=t;const r=document.createElement("button");r.className="button shortcut-key",r.textContent=Zn===e?"Press keys…":Pu(le.shortcuts[e])||"Unassigned",r.dataset.action=e,r.onclick=()=>{Zn=e,q("shortcut-error").textContent="Press a key combination · Esc to cancel",$i(),q("shortcut-rows").querySelector('[data-action="'+e+'"]')?.focus()};const o=document.createElement("button");o.className="text-button",o.textContent="Clear",o.onclick=()=>{Zn=null,le=Ht({...le,shortcuts:{...le.shortcuts,[e]:""}}),tn(),$i()},i.append(s,r,o),n.append(i)}}function wy(){nn();const n=Je("sketch-font-family");n.replaceChildren();for(const e of pc){const t=document.createElement("option");t.value=e,t.textContent=e.split(",")[0],n.add(t)}n.value=le.sketchText.fontFamily,re("sketch-font-size").value=String(le.sketchText.sizePx),Je("sketch-font-weight").value=String(le.sketchText.weight),en("text-dialog").showModal()}function Ty(){try{le=Ht({...le,sketchText:{fontFamily:Je("sketch-font-family").value,sizePx:Number(re("sketch-font-size").value),weight:Number(Je("sketch-font-weight").value)}}),tn()}catch(n){Ye("Sketch font settings invalid: "+String(n),!0)}}function Ay(){const n=q("preview"),e=n.clientWidth>1&&n.clientHeight>1?n:document.querySelector(".floating-render-canvas")??n,t=e.querySelector("canvas"),i=Number(e.dataset.pixelRatio)||1,s=Number(e.dataset.effectiveSupersample)||i/Math.max(.5,window.devicePixelRatio||1),r=vt.supersampling,o=t&&e.clientWidth>1?e.clientWidth+"×"+e.clientHeight+" CSS px → "+t.width+"×"+t.height+" backing px":"No visible Solid viewport",a=e.dataset.msaaEffective??"unavailable",l=vt.msaaSamples,c=e.dataset.msaaMaxSamples??"?",h=a==="browser"?"browser-default canvas MSAA (sample count chosen by browser)":a+" offscreen samples (requested "+l+"; hardware max "+c+")",d=l==="browser"&&vt.ambientOcclusion?" · AO composer bypasses browser canvas MSAA; select explicit 2/4/8 samples":"",u=s+.01<r?" · reduced by framebuffer/texture budget":"";q("render-resolution-info").textContent=o+" · SSAA requested "+r+"×, effective "+s.toFixed(2)+"×"+u+" · MSAA "+h+d+" · max "+vt.renderPixelBudget/1e6+"M backing pixels/view · browser smooth or nearest canvas scaling (custom shader filters not installed)"}function wc(){const n=vt;re("render-ao").checked=n.ambientOcclusion,Je("render-supersampling").value=String(n.supersampling),Je("render-msaa").value=String(n.msaaSamples),Je("render-pixel-budget").value=String(n.renderPixelBudget),Je("render-downsample").value=n.downsampleMode,re("render-lines-enabled").checked=n.linesEnabled,re("render-edge-width").value=String(n.edgeWidthPx),re("render-edge-opacity").value=String(n.edgeOpacity),re("render-edge-color").value=n.edgeColor,re("render-light-ambient").value=String(n.ambientLight),re("render-light-key").value=String(n.keyLight),re("render-ao-radius").value=String(n.aoRadius),re("render-edge-width").disabled=!n.linesEnabled,re("render-edge-opacity").disabled=!n.linesEnabled,re("render-edge-color").disabled=!n.linesEnabled,re("render-ao-radius").disabled=!n.ambientOcclusion,q("render-edge-width-value").textContent=n.edgeWidthPx.toFixed(2)+" px",q("render-edge-opacity-value").textContent=Math.round(n.edgeOpacity*100)+"%",q("render-light-ambient-value").textContent=n.ambientLight.toFixed(2),q("render-light-key-value").textContent=n.keyLight.toFixed(2),q("render-ao-radius-value").textContent=String(n.aoRadius),Ay()}function On(n){try{vt=dc(n),q0(vt),Dt?.setRenderSettings(vt),Un?.setRenderSettings(vt),wc()}catch(e){Ye("Render settings invalid: "+String(e),!0)}}function Ry(){nn(),wc();const n=en("render-dialog");n.open||n.show(),n.dataset.layoutAtOpen=dt.tileMode}function Cy(){nn(),Je("tile-mode").value=dt.tileMode,re("tiled-solid-visible").checked=dt.tiledSolidVisible,Na(Xi),Ta(),en("layout-dialog").showModal()}function Ta(){const n=q("tile-order");n.replaceChildren();const e=dt.tileOrder;for(const[t,i]of e.entries()){const s=document.createElement("div");s.className="tile-order-row",s.draggable=!0,s.dataset.tile=i;const r=document.createElement("strong");r.textContent=t+1+". "+{sketch:"Sketch",solid:"Solid",properties:"Properties / inspector"}[i];const o=c=>{const h=t+c;if(h<0||h>=e.length)return;const d=[...e];[d[t],d[h]]=[d[h],d[t]],dt.setTileOrder(d),Ta()},a=document.createElement("button");a.className="titlebar-action",a.textContent="←",a.title="Move left",a.disabled=t===0,a.onclick=()=>o(-1);const l=document.createElement("button");l.className="titlebar-action",l.textContent="→",l.title="Move right",l.disabled=t===e.length-1,l.onclick=()=>o(1),s.addEventListener("dragstart",c=>{c.dataTransfer?.setData("text/plain",i)}),s.addEventListener("dragover",c=>c.preventDefault()),s.addEventListener("drop",c=>{c.preventDefault();const h=c.dataTransfer?.getData("text/plain");if(!h||!e.includes(h)||h===i)return;const d=e.filter(u=>u!==h);d.splice(d.indexOf(i),0,h),dt.setTileOrder(d),Ta()}),s.append(r,a,l),n.append(s)}}function Py(){nn();const n=Je("navigation-preset");n.replaceChildren();for(const e of Ad){const t=document.createElement("option");t.value=e,t.textContent=Sf[e],n.append(t)}n.value=le.navigation,re("remember-surfaces").checked=le.rememberSurfaces,q("navigation-hint").textContent=Fs[le.navigation],en("navigation-dialog").showModal()}function qu(){nn(),Tc(),en("grid-dialog").showModal()}function Tc(){const n=q("grid-rows");n.replaceChildren(),le.grid.tiers.forEach((i,s)=>{const r=document.createElement("div");r.className="grid-tier-row";const o=document.createElement("strong");o.textContent=i.label;const a=document.createElement("input");a.type="checkbox",a.checked=i.enabled,a.title="Display "+i.label;const l=document.createElement("input");l.type="number",l.step="any",l.min="0.001",l.value=String(i.spacing),l.setAttribute("aria-label",i.label+" spacing mm");const c=document.createElement("input");c.type="color",c.value=i.color,c.setAttribute("aria-label",i.label+" grid colour");const h=document.createElement("input");h.type="checkbox",h.checked=i.snap,h.title="Snap "+i.label;const d=()=>{try{const g=le.grid.tiers.map((_,m)=>m===s?{..._,enabled:a.checked,spacing:Number(l.value),color:c.value,snap:h.checked}:_);le=Ht({...le,grid:{...le.grid,tiers:g}}),tn(),q("grid-error").textContent=""}catch(g){q("grid-error").textContent=String(g)}};for(const g of[a,l,c,h])g.addEventListener("change",d);const u=document.createElement("span");u.textContent="Spacing mm";const p=document.createElement("span");p.textContent="Snap",r.append(o,a,u,l,c,p,h),n.append(r)});const e=document.createElement("label");e.className="check geom-snap";const t=document.createElement("input");t.type="checkbox",t.checked=le.grid.snapGeometry,t.onchange=()=>{le=Ht({...le,grid:{...le.grid,snapGeometry:t.checked}}),tn()},e.append(t,document.createTextNode("Snap to existing geometry (vertices, centres, midpoints)")),n.append(e)}function Yu(){Ec(new Blob([JSON.stringify(le,null,2)],{type:"application/json"}),"flatcad-settings.json"),Ye("Keyboard, grid, polygon and mouse navigation settings exported")}async function Dy(n){if(n.size>1e5)throw new Error("Settings JSON exceeds 100 KB");le=Ht(JSON.parse(await n.text())),tn(),Mc(),en("shortcuts-dialog").open&&$i(),en("grid-dialog").open&&Tc(),en("navigation-dialog").open&&(Je("navigation-preset").value=le.navigation,re("remember-surfaces").checked=le.rememberSurfaces,q("navigation-hint").textContent=Fs[le.navigation]),Ye("Settings imported and applied")}re("remember-surfaces").onchange=()=>{le=Ht({...le,rememberSurfaces:re("remember-surfaces").checked}),tn()};Je("navigation-preset").onchange=()=>{le=Ht({...le,navigation:Je("navigation-preset").value}),tn(),q("navigation-hint").textContent=Fs[le.navigation]};document.querySelectorAll("[data-menu]").forEach(n=>{n.onclick=()=>Ey(n.dataset.menu)});document.querySelectorAll("[data-tool]").forEach(n=>{n.onclick=()=>Nn(n.dataset.tool)});q("sketch-wrap").addEventListener("pointerdown",n=>{n.target.closest(".menu-popover")||nn()});document.addEventListener("pointerdown",n=>{n.target.closest("#menus")||nn(),n.target.closest("#face-context-menu")||dr()});lt("quick-extrude").onclick=()=>fi();lt("selection-extrude").onclick=()=>fi();lt("selection-delete").onclick=()=>Ft(yc);lt("selection-duplicate").onclick=()=>Ft(Sc);lt("selection-properties").onclick=()=>la("properties-details");lt("grid-quick").onclick=qu;lt("tool-dock-toggle").onclick=()=>{if(Ea){Ea=!1;return}dt.setDocked(!dt.docked)};lt("timeline-now").onclick=()=>es.clearSelection();re("tiled-solid-visible").onchange=()=>{dt.setTiledSolidVisible(re("tiled-solid-visible").checked)};re("float-opacity").oninput=()=>{try{Na(Number(re("float-opacity").value)/100),iy(Xi)}catch(n){Ye("Floating-window opacity invalid: "+String(n),!0)}};Je("tile-mode").onchange=()=>{dt.setTileMode(Je("tile-mode").value)};re("render-ao").onchange=()=>On({...vt,ambientOcclusion:re("render-ao").checked});Je("render-supersampling").onchange=()=>On({...vt,supersampling:Number(Je("render-supersampling").value)});Je("render-msaa").onchange=()=>On({...vt,msaaSamples:Je("render-msaa").value==="browser"?"browser":Number(Je("render-msaa").value)});Je("render-pixel-budget").onchange=()=>On({...vt,renderPixelBudget:Number(Je("render-pixel-budget").value)});Je("render-downsample").onchange=()=>On({...vt,downsampleMode:Je("render-downsample").value});re("render-lines-enabled").onchange=()=>On({...vt,linesEnabled:re("render-lines-enabled").checked});for(const[n,e]of[["render-edge-width","edgeWidthPx"],["render-edge-opacity","edgeOpacity"],["render-light-ambient","ambientLight"],["render-light-key","keyLight"],["render-ao-radius","aoRadius"]])re(n).oninput=()=>On({...vt,[e]:Number(re(n).value)});re("render-edge-color").oninput=()=>On({...vt,edgeColor:re("render-edge-color").value});lt("render-clean-preset").onclick=()=>On({...V0});lt("render-reset").onclick=()=>On({...Ns});lt("tile-reset").onclick=()=>{dt.resetArrangement(),Je("tile-mode").value=dt.tileMode,Ta()};for(const n of["sketch-font-family","sketch-font-size","sketch-font-weight"])q(n).addEventListener("change",Ty);lt("sketch-text-reset").onclick=()=>{le=Ht({...le,sketchText:{...mc}}),tn(),Ly()};function Ly(){Je("sketch-font-family").value=le.sketchText.fontFamily,re("sketch-font-size").value=String(le.sketchText.sizePx),Je("sketch-font-weight").value=String(le.sketchText.weight)}lt("fit-solid").onclick=()=>Dt?.fitView();q("history-details").addEventListener("toggle",()=>{q("history-details").open&&ka()});lt("cancel-extrude").onclick=Fn;lt("dismiss-extrude").onclick=Fn;lt("apply-extrude").onclick=Gu;Je("extrude-mode").addEventListener("change",Vu);re("extrude-preview").onchange=()=>{Iu=re("extrude-preview").checked,mi()};re("extrude-through").onchange=()=>{if(re("extrude-through").checked){const[n,e]=Hu();re("extrude-z").value=String(n),re("extrude-depth").value=String(e-n)}_t.setExtrudeHandle({id:In||"",depth:bc().depth||8}),mi()};re("extrude-depth").oninput=()=>{if(!In)return;let n=NaN;try{n=As(re("extrude-depth").value,oe.parameters??[])}catch{}re("extrude-through").checked=!1,Number.isFinite(n)&&n!==0&&_t.setExtrudeHandle({id:In,depth:n}),Zi(),mi()};re("extrude-z").oninput=()=>{re("extrude-through").checked=!1,mi()};re("extrude-z").addEventListener("focus",()=>{jn="z"});re("extrude-depth").addEventListener("focus",()=>{jn="depth"});lt("undo").onclick=()=>hr(Ln-1);lt("redo").onclick=()=>hr(Ln+1);re("document-name").onchange=()=>Ft(()=>$t(Ct({...oe,name:re("document-name").value.trim()})));re("project-input").onchange=async n=>{const e=n.target;if(e.files?.[0])try{await Sy(e.files[0])}catch(t){Ye("Project import rejected: "+String(t),!0)}e.value=""};re("settings-input").onchange=async n=>{const e=n.target;if(e.files?.[0])try{await Dy(e.files[0])}catch(t){Ye("Settings import rejected: "+String(t),!0)}e.value=""};function Ac(){Zn=null,q("shortcut-error").textContent=""}document.querySelectorAll("[data-close]").forEach(n=>{n.onclick=()=>{const e=n.dataset.close;e==="shortcuts-dialog"&&Ac(),en(e).close()}});en("shortcuts-dialog").addEventListener("cancel",Ac);en("shortcuts-dialog").addEventListener("close",Ac);lt("shortcut-reset").onclick=()=>{le=Ht({...le,shortcuts:{...lr().shortcuts}}),tn(),Zn=null,$i()};lt("grid-reset").onclick=()=>{le=Ht({...le,grid:lr().grid}),tn(),Tc()};lt("settings-export").onclick=Yu;lt("settings-import").onclick=()=>re("settings-input").click();const ju=["shortcuts-dialog","grid-dialog","navigation-dialog","text-dialog","layout-dialog","parameters-dialog"];function Ku(n){const e=n.target;if(!(e instanceof Element))return!1;if(e.closest('textarea,select,[contenteditable]:not([contenteditable="false"]),[role="textbox"]'))return!0;const t=e.closest("input");if(t){const i=(t.getAttribute("type")||"text").toLowerCase();return["range","checkbox","radio","color"].includes(i)?["Space","Enter","Home","End","PageUp","PageDown"].includes(n.code)||n.code.startsWith("Arrow"):!0}return!!((n.code==="Space"||n.code==="Enter")&&e.closest("button,summary,[role='button']"))}function Iy(n){return ju.some(e=>en(e).open)||Ku(n)}document.addEventListener("keydown",n=>{if(Zn){if(n.preventDefault(),n.stopPropagation(),n.code==="Escape"){Zn=null,$i();return}const s=Zn;try{const r=Cu(fd(n));le=Ht({...le,shortcuts:{...le.shortcuts,[s]:r}}),Zn=null,tn(),q("shortcut-error").textContent="",$i()}catch(r){q("shortcut-error").textContent=String(r)}return}if(ju.some(s=>en(s).open))return;const e=n.target instanceof Element&&!!n.target.closest("#render-dialog");if(!e&&!q("extrude-flyout").hidden){if(n.code==="Escape"){n.preventDefault(),Fn(),Nn("select");return}if(n.code==="Enter"){n.preventDefault(),Gu();return}}if(!e&&xn==="line"){if(n.code==="Escape"){n.preventDefault(),_t.cancelLine();return}if(n.code==="Enter"){n.preventDefault(),_t.finishLine(!1);return}if(n.code==="Backspace"){n.preventDefault(),_t.removeLastLinePoint();return}}if(Ku(n))return;let t=fd(n);n.metaKey&&!n.ctrlKey&&(t=t.replace("Meta+","Control+"));const i=Object.entries(le.shortcuts).find(([,s])=>s===t)?.[0];if(i){n.preventDefault(),Xu(i);return}if(t==="Control+KeyY"){n.preventDefault(),hr(Ln+1);return}if(t==="Escape"){q("face-context-menu").hidden?Ma?nn():Nn("select"):dr();return}});document.addEventListener("keydown",n=>{n.code==="Space"&&!n.repeat&&!Iy(n)&&xn!=="pan"&&(n.preventDefault(),ca=xn,Nn("pan"))});let ca=null;document.addEventListener("keyup",n=>{n.code==="Space"&&ca&&(Nn(ca),ca=null)});window.addEventListener("storage",n=>{n.key===uc&&Na(Au()),n.key===hc&&(vt=xu(),Dt?.setRenderSettings(vt),Un?.setRenderSettings(vt),en("render-dialog").open&&wc()),n.key===gc&&(le=Du(),_t.setPreferences(le),Dt?.setNavigationPreset(le.navigation),Un?.setNavigationPreset(le.navigation),q("extrude-nav-hint").textContent=Fs[le.navigation],re("remember-surfaces").checked=le.rememberSurfaces,fr.style.setProperty("--sketch-text-size",le.sketchText.sizePx+"px"))});q("extrude-nav-hint").textContent=Fs[le.navigation];function Aa(){return window.matchMedia("(orientation: landscape) and (min-width:780px)").matches}function Zu(){const n=q(Aa()?"timeline-content":"history-inline-host"),e=q("feature-list");e.parentElement!==n&&(n.append(e),xc()),Aa()&&q("preview").dataset.buildState==="ready"&&ka()}window.addEventListener("resize",()=>{Zi(),Zu(),requestAnimationFrame(pr),requestAnimationFrame(Oa)});fr.style.setProperty("--sketch-text-size",le.sketchText.sizePx+"px");Lf(document);Zu();Nn(xn);Pi();Ba();

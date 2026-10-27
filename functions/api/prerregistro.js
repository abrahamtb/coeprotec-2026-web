// API de prerregistro COEPROTEC. Inactiva por defecto; requiere D1 y Turnstile.
// Configurar PREREG_ENABLED="true", PREREG_DB (D1) y TURNSTILE_SECRET_KEY (secreto).
const respond=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}});
export async function onRequestPost({request,env}){
 if(env.PREREG_ENABLED!=="true")return respond({ok:false,error:"Prerregistro no disponible."},503);
 if(!env.PREREG_DB||!env.TURNSTILE_SECRET_KEY)return respond({ok:false,error:"Servicio no configurado."},503);
 const origin=request.headers.get("Origin");
 if(!origin||origin!==new URL(request.url).origin)return respond({ok:false,error:"Origen no autorizado."},403);
 if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))return respond({ok:false,error:"Formato no válido."},415);
 if(Number(request.headers.get("content-length")||0)>8192)return respond({ok:false,error:"Solicitud demasiado grande."},413);
 let value;try{const raw=await request.text();if(raw.length>8192)return respond({ok:false,error:"Solicitud demasiado grande."},413);value=JSON.parse(raw);}catch{return respond({ok:false,error:"Solicitud inválida."},400);}
 if(!value||typeof value!=="object"||Array.isArray(value))return respond({ok:false,error:"Datos inválidos."},400);
 const nombre=typeof value.nombre==="string"?value.nombre.trim():"";
 const correo=typeof value.correo==="string"?value.correo.trim().toLowerCase():"";
 const telefono=typeof value.telefono==="string"?value.telefono.trim():"";
 const interes=value.interes;
 if(nombre.length<3||nombre.length>100||!(/^[^\x00-\x1f\x7f]+$/u.test(nombre)))return respond({ok:false,error:"Nombre inválido."},400);
 if(correo.length>254||!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(correo)))return respond({ok:false,error:"Correo inválido."},400);
 if(telefono&&!(/^[+0-9 ()-]{7,20}$/.test(telefono)))return respond({ok:false,error:"Teléfono inválido."},400);
 if(!["capacitacion","eventos","institucional"].includes(interes))return respond({ok:false,error:"Interés inválido."},400);
 if(value.consentimiento!==true||typeof value.marketing!=="boolean")return respond({ok:false,error:"Consentimiento inválido."},400);
 if(typeof value.turnstileToken!=="string"||value.turnstileToken.length<10||value.turnstileToken.length>2048)return respond({ok:false,error:"Verificación de seguridad necesaria."},400);
 try{
  const body=new FormData();body.set("secret",env.TURNSTILE_SECRET_KEY);body.set("response",value.turnstileToken);
  const verification=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body,signal:AbortSignal.timeout(5000)});
  if(!verification.ok)return respond({ok:false,error:"No se pudo verificar la seguridad."},503);
  const result=await verification.json();
  if(result.success!==true||result.hostname!==new URL(request.url).hostname)return respond({ok:false,error:"Verificación de seguridad rechazada."},403);
  const id=crypto.randomUUID();
  await env.PREREG_DB.prepare("INSERT INTO preregistros (id,nombre,correo,telefono,interes,consentimiento,marketing,consentimiento_version) VALUES (?,?,?,?,?,?,?,?)").bind(id,nombre,correo,telefono||null,interes,1,value.marketing?1:0,env.PRIVACY_VERSION||"pendiente").run();
  return respond({ok:true,message:"Hemos recibido tu prerregistro."},201);
 }catch{return respond({ok:false,error:"No fue posible completar el registro."},503);}
}
export function onRequestGet(){return respond({ok:false,error:"Método no permitido."},405);}

// Pruebas de borde con D1 y Turnstile simulados: nunca tocan producción.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../functions/api/prerregistro.js',import.meta.url),'utf8');
const {onRequestPost}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const host='coeprotec-2026-web-4wp.pages.dev';
const url='https://'+host+'/api/prerregistro';
const good={nombre:'Persona Sintetica',correo:'test@example.test',telefono:'',interes:'eventos',consentimiento:true,marketing:false,turnstileToken:'token-sintetico-de-prueba'};
let inserts=0;
const db={prepare(){return {bind(){return {async run(){inserts++;return {success:true};}};}};}};
const env={PREREG_ENABLED:'true',PREREG_SECURITY_APPROVED:'true',PRIVACY_VERSION:'2026-11-01-v1',TURNSTILE_SECRET_KEY:'no-real',PREREG_DB:db};
function req(obj=good,headers={}){return new Request(url,{method:'POST',headers:{Origin:'https://'+host,'content-type':'application/json',...headers},body:JSON.stringify(obj)});}
async function expectError(status,obj,headers){inserts=0;const res=await onRequestPost({request:req(obj,headers),env});assert.equal(res.status,status);assert.equal(inserts,0);}
test('no inserta si falta nombre',async()=>expectError(400,{...good,nombre:''}));
test('no inserta si el correo carece de formato',async()=>expectError(400,{...good,correo:'incorrecto'}));
test('no inserta si telefono contiene letras',async()=>expectError(400,{...good,telefono:'telefonoABC'}));
test('no inserta si el nombre excede cien caracteres',async()=>expectError(400,{...good,nombre:'A'.repeat(101)}));
test('no inserta si marketing no es booleano',async()=>expectError(400,{...good,marketing:'false'}));
test('no inserta si falta token',async()=>expectError(400,{...good,turnstileToken:''}));
test('rechaza content-type no JSON',async()=>expectError(415,good,{'content-type':'text/plain'}));
test('rechaza cuerpo superior a 8192 caracteres',async()=>expectError(413,{...good,nombre:'X'.repeat(9000)}));
test('no inserta si Turnstile devuelve hostname equivocado',async(t)=>{inserts=0;t.mock.method(globalThis,'fetch',async()=>new Response(JSON.stringify({success:true,hostname:'sitio-ajeno.example'}),{status:200}));const r=await onRequestPost({request:req(),env});assert.equal(r.status,403);assert.equal(inserts,0);});
test('no inserta si Turnstile responde error HTTP',async(t)=>{inserts=0;t.mock.method(globalThis,'fetch',async()=>new Response('error',{status:503}));const r=await onRequestPost({request:req(),env});assert.equal(r.status,503);assert.equal(inserts,0);});

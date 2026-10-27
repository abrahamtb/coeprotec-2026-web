// Pruebas unitarias locales con datos sintéticos. No utilizan Cloudflare ni la BD real.
// Ejecutar desde la raíz del repositorio: node --test tests/prerregistro.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const source = await readFile(new URL('../functions/api/prerregistro.js', import.meta.url), 'utf8');
const {onRequestPost,onRequestGet} = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
const url='https://coeprotec-2026-web-4wp.pages.dev/api/prerregistro';
const payload={nombre:'Persona de Prueba',correo:'prueba@example.test',telefono:'',interes:'eventos',consentimiento:true,marketing:false,turnstileToken:'test-token-sintetico'};
const envReady={PREREG_ENABLED:'true',PREREG_SECURITY_APPROVED:'true',PRIVACY_VERSION:'2026-11-01-v1',TURNSTILE_SECRET_KEY:'local-only',PREREG_DB:{prepare(){return {bind(){return {async run(){return {success:true};}};}};}}};
function request(body=payload,headers={}){return new Request(url,{method:'POST',headers:{'Origin':'https://coeprotec-2026-web-4wp.pages.dev','Content-Type':'application/json',...headers},body:JSON.stringify(body)});}
test('bloqueado por defecto (503)',async()=>{const r=await onRequestPost({request:request(),env:{}});assert.equal(r.status,503);});
test('segunda barrera sin aprobación de seguridad (503)',async()=>{const r=await onRequestPost({request:request(),env:{...envReady,PREREG_SECURITY_APPROVED:'false'}});assert.equal(r.status,503);});
test('rechaza política sin versión aprobada (503)',async()=>{const r=await onRequestPost({request:request(),env:{...envReady,PRIVACY_VERSION:'pendiente'}});assert.equal(r.status,503);});
test('rechaza origen no autorizado (403)',async()=>{const r=await onRequestPost({request:request(payload,{'Origin':'https://evil.example'}),env:envReady});assert.equal(r.status,403);});
test('rechaza consentimiento ausente (400)',async()=>{const r=await onRequestPost({request:request({...payload,consentimiento:false}),env:envReady});assert.equal(r.status,400);});
test('rechaza interés arbitrario (400)',async()=>{const r=await onRequestPost({request:request({...payload,interes:'admin'}),env:envReady});assert.equal(r.status,400);});
test('GET nunca devuelve registros (405)',async()=>{const r=onRequestGet();assert.equal(r.status,405);});
test('rechaza verificación Turnstile fallida (403)',async(t)=>{t.mock.method(globalThis,'fetch',async()=>new Response(JSON.stringify({success:false}),{status:200}));const r=await onRequestPost({request:request(),env:envReady});assert.equal(r.status,403);});
test('guarda solo después de verificar Turnstile (201; simulación)',async(t)=>{let inserted=false;t.mock.method(globalThis,'fetch',async()=>new Response(JSON.stringify({success:true,hostname:'coeprotec-2026-web-4wp.pages.dev'}),{status:200}));const env={...envReady,PREREG_DB:{prepare(){return {bind(){return {async run(){inserted=true;return {success:true};}};}};}}};const r=await onRequestPost({request:request(),env});assert.equal(r.status,201);assert.equal(inserted,true);});

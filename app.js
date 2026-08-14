import { parseYouTubeId, buildEmbedUrl } from './lib.js';
const $=s=>document.querySelector(s),frame=$('#videoFrame'),message=$('#message');
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2200)}
function select(button){document.querySelectorAll('.action').forEach(item=>item.classList.toggle('active',item===button))}
$('#connectButton').addEventListener('click',()=>{select($('#connectButton'));$('#connectPanel').hidden=false;$('#dataPanel').hidden=true;$('#airplayPanel').hidden=true;$('#videoUrl').focus()});
$('#dataButton').addEventListener('click',()=>{const panel=$('#dataPanel'),open=panel.hidden;select($('#dataButton'));panel.hidden=!open;$('#connectPanel').hidden=true;$('#airplayPanel').hidden=true;$('#dataButton').setAttribute('aria-expanded',String(open))});
$('#airplayButton').addEventListener('click',()=>{select($('#airplayButton'));$('#airplayPanel').hidden=false;$('#connectPanel').hidden=true;$('#dataPanel').hidden=true;toast('Use AirPlay in the YouTube player controls')});
$('#connectPanel').addEventListener('submit',event=>{event.preventDefault();const id=parseYouTubeId($('#videoUrl').value);if(!id){message.textContent='Please enter a valid YouTube link.';message.classList.add('error');return}frame.src=buildEmbedUrl(id);$('#videoTitle').textContent='Connected fitness video';$('#videoSource').textContent='YouTube • Ready to watch';message.textContent='Video connected successfully.';message.classList.remove('error');localStorage.setItem('pulseview:fitnessVideo',id);toast('Fitness video connected')});
const saved=localStorage.getItem('pulseview:fitnessVideo');if(saved){frame.src=buildEmbedUrl(saved);$('#videoUrl').value=`https://www.youtube.com/watch?v=${saved}`}
if('serviceWorker'in navigator&&location.protocol!=='file:')addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));

const details={
  cibot:{title:'CI-BOT — Cyber Intelligent Bot',intro:'A research-to-product progression for private AI assistance where cloud use is unsuitable.',meta:[['ROLE','AI system engineering'],['FOCUS','Private multimodal RAG'],['DEPLOYMENT','Local + edge']],bullets:['OCR benchmark across PaddleOCR, Tesseract, EasyOCR, DocTR, TrOCR, SparrowOCR and PyTesseract for scanned/noisy documents.','HR-BOT prototype: single-user RAG assistant with general chat, document Q&A and persistent history.','CI-BOT platform: multi-user private assistant with login, separate chats, PostgreSQL and Dockerized Qdrant.','RAG flow: Upload → Parse/OCR → Chunk → Embed → Qdrant → Retrieve → Inject → LLM → Answer.','Edge extension: lightweight chatbot on Jetson Xavier / Orin Nano with STT and TTS.']},
  urdu:{title:'Urdu LLM Fine-Tuning',intro:'An iterative model-adaptation program focused on efficient Urdu instruction following.',meta:[['BASE','Qwen2.5-7B-Instruct'],['ENGINE','Unsloth + LoRA'],['DATA','58,899 clean pairs']],bullets:['Initial Bactrian-X approach used Gemma-2-2B, 8-bit precision and LoRA on NVIDIA A6000; a month-long run did not yield the intended final model.','The next iteration adopted Unsloth + LoRA for faster training, lower VRAM use and simpler adapter workflows.','Qwen2.5-7B v2 trained on RTX 3090 for 13h 48m.','Reported v2 results: perplexity 1.84, MGSM 49%, UrduMMLU overall 40%, UrduMMLU STEM 56%, with reduced A-position bias to 18%.','Future work identified humanities coverage, factual hallucination, DoRA and MCQ distribution balancing.']},
  rail:{title:'RailSleuth — Agentic LLM Guardrail Evaluation',intro:'A layered framework for evaluating the security behavior of modern LLM systems beyond plain-text prompting.',meta:[['THREATS','Jailbreak + injection'],['SURFACES','Text · RAG · tools'],['METHOD','Layered evaluation']],bullets:['Threats include jailbreaks, prompt injection, RAG-based attacks and tool misuse.','Defense layers: input filtering, model alignment/refusal, retrieved-content validation, tool permission/action validation and output inspection.','Evaluation layer uses judge models and metrics to compare security behavior.','Research direction: secure, efficient, multilingual and agentic AI systems.']},
  edge:{title:'Conversational LLM on NVIDIA Jetson',intro:'Edge deployment research asking whether useful conversational LLMs can run offline on constrained hardware.',meta:[['HARDWARE','Jetson Xavier / Orin'],['MODE','Offline inference'],['EXTRA','STT + TTS']],bullets:['Motivations: privacy, reduced cloud dependency and embedded/robotic applications.','Engineering constraints: model size vs RAM, inference latency, token throughput, thermal limits and power limits.','CI-BOT extension included speech-to-text and text-to-speech on Jetson devices.','Key lesson: LLM deployment requires hardware-aware optimization, not only model selection.']},
  ocr:{title:'OCR Benchmark & HR-BOT',intro:'Document intelligence work that became the foundation of the larger CI-BOT system.',meta:[['INPUT','Scans + noisy docs'],['PIPELINE','OCR → RAG'],['PROTOTYPE','HR-BOT']],bullets:['Compared multiple traditional and neural OCR approaches on scanned and noisy documents.','Document pipeline supports text-based and scanned PDFs/images through extraction, chunking, embeddings and retrieval.','HR-BOT provided general chat plus document Q&A for a single user.','The architecture evolved toward private multi-user retrieval with Qdrant and PostgreSQL.']},
  docker:{title:'Local LLM Docker Environments',intro:'Reproducible GPU-enabled environments for running local LLMs and simplifying model testing.',meta:[['RUNTIME','Docker + Ollama'],['GPU','NVIDIA'],['GOAL','Reproducibility']],bullets:['Configured Ubuntu/NVIDIA toolkit dependencies and local model runtimes.','Used Ollama inside Docker and exposed model services for testing.','Ran multiple large LLMs on GPU infrastructure including A6000/A100-class systems.','Supports the broader goal of private, offline and reproducible AI deployment.']}
};

const $=(q,s=document)=>s.querySelector(q), $$=(q,s=document)=>[...s.querySelectorAll(q)];
window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('hidden'),350));
$('#year').textContent=new Date().getFullYear();

// theme
const savedTheme=localStorage.getItem('theme'); if(savedTheme==='light') document.body.classList.add('light');
$('#theme').addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark')});

// mobile nav
$('#menu').addEventListener('click',()=>$('#nav').classList.toggle('open')); $$('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));

// scroll progress + sticky header
const onScroll=()=>{const h=document.documentElement;const p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;$('#scrollProgress').style.width=`${p}%`;$('#topbar').classList.toggle('scrolled',scrollY>40)};addEventListener('scroll',onScroll,{passive:true});onScroll();

// active nav section
const sections=$$('main section[id]'); const navLinks=$$('#nav a');
const secObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`))}}),{rootMargin:'-38% 0px -55%'});sections.forEach(s=>secObs.observe(s));

// reveal on scroll
const revealObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target)}}),{threshold:.12});$$('.reveal-on-scroll').forEach(el=>revealObs.observe(el));

// cursor glow
addEventListener('pointermove',e=>{const g=$('#cursorGlow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'},{passive:true});

// typewriter
const typeWords=['secure agentic AI','multilingual LLMs','private RAG systems','edge AI deployment','LLM guardrail evaluation'];let wi=0,ci=0,del=false;const typeEl=$('#typeText');
function typeLoop(){const w=typeWords[wi];typeEl.textContent=del?w.slice(0,--ci):w.slice(0,++ci);let t=del?36:70;if(!del&&ci===w.length){del=true;t=1300}else if(del&&ci===0){del=false;wi=(wi+1)%typeWords.length;t=260}setTimeout(typeLoop,t)} setTimeout(typeLoop,850);

// count-up metrics
let counted=false;const metObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&!counted){counted=true;$$('[data-count]',e.target).forEach(el=>{const target=+el.dataset.count,suffix=el.dataset.suffix||'';let start=0;const dur=900,st=performance.now();function tick(now){const k=Math.min((now-st)/dur,1);const v=Math.round(target*(1-Math.pow(1-k,3)));el.textContent=v+suffix;if(k<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)})}})},{threshold:.5});metObs.observe($('#metrics'));

// project filter
$$('.filters button').forEach(b=>b.addEventListener('click',()=>{$$('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;$$('.project-card').forEach(c=>{const show=f==='all'||c.dataset.cat.includes(f);c.style.display=show?'flex':'none';if(show)c.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease'})})}));

// modal project case studies
const modal=$('#modal'),content=$('#modalContent');function openCase(card){const d=details[card.dataset.project];content.innerHTML=`<div class="kicker">PROJECT CASE STUDY</div><h2 id="modalTitle">${d.title}</h2><p class="modal-intro">${d.intro}</p><div class="case-grid">${d.meta.map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div><ul class="case-list">${d.bullets.map((x,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><div>${x}</div></li>`).join('')}</ul>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
$$('.project-card').forEach(card=>{card.querySelector('.more').addEventListener('click',e=>{e.stopPropagation();openCase(card)});card.addEventListener('keydown',e=>{if(e.key==='Enter')openCase(card)})});function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}$('.close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});

// skill explorer
$$('.skill-node').forEach(btn=>['mouseenter','focus','click'].forEach(ev=>btn.addEventListener(ev,()=>{$$('.skill-node').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#skillTitle').textContent=btn.dataset.skill;$('#skillDesc').textContent=btn.dataset.desc})));

// command palette
const command=$('#command');function openCommand(){command.classList.add('open');command.setAttribute('aria-hidden','false')}function closeCommand(){command.classList.remove('open');command.setAttribute('aria-hidden','true')}$('#paletteBtn').addEventListener('click',openCommand);command.addEventListener('click',e=>{if(e.target===command)closeCommand()});$$('.command-box button').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.go){location.hash=b.dataset.go}else if(b.dataset.url){window.open(b.dataset.url,'_blank','noopener')}closeCommand()}));
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();command.classList.contains('open')?closeCommand():openCommand()}if(e.key==='Escape'){closeCommand();closeModal()}if(!command.classList.contains('open'))return;const k=e.key.toLowerCase();if(k==='p')location.hash='#projects';if(k==='r')location.hash='#research';if(k==='s')location.hash='#skills';if(k==='g')window.open('https://github.com/AmeenaKhan12','_blank','noopener');if(k==='c')window.open('Ameena_Khan_CV.pdf','_blank','noopener')});

// subtle 3D tilt on pointer devices
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){$$('[data-tilt]').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1000px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-2px)`});el.addEventListener('pointerleave',()=>el.style.transform='')})}

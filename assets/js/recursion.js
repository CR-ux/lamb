/**
 * Recursion Engine — terminal damage + narrative infection (bottom stack)
 * - Uses window.scrollLeaks (ordered, raw) if present
 * - Persists leak index in localStorage (the Scroll remembers)
 * - Violent vibration on leak appearance
 * - Background phrase field made louder & more corrupt
 */
(function(){
  const field = document.getElementById('recursion-field');
  if(!field) return;

  // --- CONFIG ---
  const phrase = field.dataset.phrase || "the characters to forgive:";
  const level = parseInt(field.dataset.level || "1", 10);
  const leaks = Array.isArray(window.scrollLeaks) ? window.scrollLeaks : [];
  const keyIdx = 'scroll.leak.index';

  // --- STATE ---
  let density = 1.2 + (level * 0.4);            // more bloom by default
  let corruption = Math.min(0.08 + (level * 0.06), 0.95); // stronger interference
  let leakIndex = parseInt(localStorage.getItem(keyIdx) || "0", 10);
  if (isNaN(leakIndex) || leakIndex < 0) leakIndex = 0;

  // --- DOM: leak stack (bottom-up) ---
  let stack = document.getElementById('leak-stack');
  if(!stack){
    stack = document.createElement('div');
    stack.id = 'leak-stack';
    field.appendChild(stack);
  }

  // --- glitch glyphs ---
  const glitchChars = ['̷','̸','͟','͜','͢','͠','͞','͡','̀','̂','̌','̆','̄','̛','͙','͚','͇','͈','͍'];

  function distort(s, amt){
    return s.split('').map(ch=>{
      if(Math.random() < amt) return ch + glitchChars[(Math.random()*glitchChars.length)|0];
      return ch;
    }).join('');
  }

  function spawnShort(){
    const span = document.createElement('span');
    span.className = 'forgive-frag';
    span.textContent = distort(phrase, corruption);
    span.style.left = (Math.random()*90)+'%';
    span.style.top = (Math.random()*90)+'%';
    span.style.fontSize = (Math.random()*1.4 + 0.9)+'rem';
    span.style.opacity = String(0.26 + Math.random()*0.24); // louder
    field.appendChild(span);
    // fade away
    setTimeout(()=> span.classList.add('fade'), 120);
    setTimeout(()=> span.remove(), 9000 + Math.random()*5000);
  }

  function spawnLeak(text){
    const block = document.createElement('div');
    block.className = 'leak-frag violent';
    block.innerText = text;
    stack.appendChild(block); // bottom stack grows upward
    // vibration ends after a bit, then fade slowly
    setTimeout(()=> block.classList.remove('violent'), 1800);
    setTimeout(()=> block.classList.add('fade'), 12000 + Math.random()*8000);
    // keep only last N to avoid infinite DOM growth
    const MAX = 80;
    while(stack.children.length > MAX){
      stack.removeChild(stack.firstChild);
    }
  }

  function nextLeak(){
    if(leaks.length === 0) return;
    const text = leaks[Math.min(leakIndex, leaks.length - 1)];
    leakIndex = Math.min(leakIndex + 1, leaks.length);
    localStorage.setItem(keyIdx, String(leakIndex));
    spawnLeak(text);
  }

  function tick(){
    // background bloom
    const count = Math.max(1, Math.floor(density));
    for(let i=0;i<count;i++){
      if(Math.random() < 0.8) spawnShort();
    }
    setTimeout(tick, 700 - Math.min(520, density*60 + corruption*280));
  }

  // interactions escalate corruption
  document.addEventListener('mousemove', ()=> { density = Math.min(density + 0.02, 22); corruption = Math.min(corruption + 0.002, 0.97); });
  document.addEventListener('keydown',  ()=> { density = Math.min(density + 0.10, 24); });
  document.addEventListener('click',    ()=> { density = Math.min(density + 0.14, 26); });

  // seals talk to us:
  document.addEventListener('forgive:fail', ()=>{
    density = Math.min(density + 1.8, 28);
    corruption = Math.min(corruption + 0.08, 0.98);
    nextLeak(); // leak on every failure
  });

  document.addEventListener('narrative:leak', (ev)=>{
    const t = ev?.detail?.text;
    if(typeof t === 'string' && t.length) spawnLeak(t);
  });

  document.addEventListener('forgive:success', ()=>{
    density = Math.max(0.6, density * 0.45);
    corruption = Math.max(0.03, corruption * 0.55);
    spawnLeak("the seal yields. a fragment is given, not explained.");
  });

  // start engine
  tick();
})();
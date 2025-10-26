/**
 * Recursion Engine — progressive terminal damage
 * Behaviour:
 *  - begins subtle
 *  - escalates with input/mouse movement
 *  - fails harder on incorrect unlock attempts
 *  - Mark level increases aggression per portal
 */
(function(){
    const field = document.getElementById('recursion-field');
    if(!field) return;
  
    const phrase = field.dataset.phrase || "the characters to forgive:";
    const level = parseInt(field.dataset.level || "1", 10);
  
    let active = true;
    let bloomRate = 0.4 + (level * 0.15); // how many phrases spawn over time
    let corruption = 0.02 + (level * 0.03); // how glitchy the letters become
  
    // glitch marks
    const glitchChars = ['̷','̸','͟','͜','͢','͠','͞','͡','̀','̂','̌','̆','̄','̛','͙','͚','͇','͈','͍'];
  
    function corruptText(text){
      return text.split('').map(ch => {
        if (Math.random() < corruption){
          return ch + glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return ch;
      }).join('');
    }
  
    function spawnPhrase(){
      const span = document.createElement('span');
      span.className = 'forgive-frag';
      span.textContent = corruptText(phrase);
      span.style.position = 'absolute';
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.opacity = 0.1 + Math.random() * 0.3;
      span.style.fontSize = (Math.random() * 1.5 + 0.7) + 'rem';
      span.style.pointerEvents = 'none';
      field.appendChild(span);
  
      setTimeout(() => span.remove(), 8000);
    }
  
    function loop(){
      if(!active) return;
      if(Math.random() < bloomRate) spawnPhrase();
      requestAnimationFrame(loop);
    }
  
    // escalate chaos with interaction
    document.addEventListener('mousemove', () => { corruption += 0.001; });
    document.addEventListener('keydown', () => { bloomRate += 0.02; });
    document.addEventListener('click', () => { bloomRate += 0.03; });
  
    // critical failure boost
    document.addEventListener('forgive:fail', () => {
      bloomRate += 0.2;
      corruption += 0.05;
    });
  
    loop();
  })();
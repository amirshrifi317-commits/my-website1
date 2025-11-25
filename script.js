// script.js - animations, smooth interactions, form handling
(function(){
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('inview');
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.fade-up').forEach(el=> io.observe(el));
  document.querySelectorAll('.project-card').forEach(el=> io.observe(el));

  // simple tilt effect on profile card
  const tiltEl = document.querySelector('[data-tilt]');
  if(tiltEl){
    tiltEl.addEventListener('mousemove', (ev)=>{
      const r = tiltEl.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      const rx = (py - 0.5) * 8;
      const ry = (px - 0.5) * -12;
      tiltEl.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    });
    tiltEl.addEventListener('mouseleave', ()=> tiltEl.style.transform = '');
  }

  // header shadow on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>20) header.style.boxShadow = '0 6px 20px rgba(2,6,23,0.6)';
    else header.style.boxShadow = '';
  });

  // theme toggle (light/dark subtle)
  const themeBtn = document.getElementById('themeBtn');
  themeBtn && themeBtn.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('light');
  });

  // contact form: prepare message and show ready-to-send content (no backend)
  const form = document.getElementById('contactForm');
  const result = document.getElementById('result');
  form && form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){
      result.textContent = 'Please fill all fields — لطفاً همه فیلدها را پر کنید';
      return;
    }
    const text = `New project request:\nName: ${name}\nContact: ${email}\nMessage: ${message}\n\n(From portfolio site)`;
    result.textContent = 'Message ready — پیام آماده شد. برای ارسال آن را کپی کنید و در تلگرام ارسال کنید.';
    // copy to clipboard
    navigator.clipboard && navigator.clipboard.writeText(text).catch(()=>{});
  });

})();

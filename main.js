const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
function animRing(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a,button,input,textarea,.proj-card,.cert-card,.stat').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cursor.style.width='20px'; cursor.style.height='20px';
    ring.style.width='50px'; ring.style.height='50px';
  });
  el.addEventListener('mouseleave',()=>{
    cursor.style.width='12px'; cursor.style.height='12px';
    ring.style.width='36px'; ring.style.height='36px';
  });
});

function toggleMenu(){
  document.getElementById('navLinks').classList.toggle('open');
}

function initReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>{
    el.classList.remove('visible');
    obs.observe(el);
  });
}
document.addEventListener('DOMContentLoaded', initReveal);

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    status.textContent = "Sending...";
    status.style.color = "#999";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        status.textContent = "✓ Message sent successfully!";
        status.style.color = "#00b894";
        form.reset();
      } else {
        status.textContent = "⚠ Something went wrong. Try again.";
        status.style.color = "#e63022";
      }
    } catch (error) {
      status.textContent = "⚠ Network error. Please try later.";
      status.style.color = "#e63022";
    }
  });
}
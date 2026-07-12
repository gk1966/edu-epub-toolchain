// reveal-on-scroll
document.addEventListener("DOMContentLoaded",()=>{
  const els=[...document.querySelectorAll(".reveal")];
  if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("in"));return;}
  const io=new IntersectionObserver((ents)=>{ents.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
  els.forEach(e=>io.observe(e));
});

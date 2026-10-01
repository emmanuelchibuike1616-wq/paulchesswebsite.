
document.addEventListener("DOMContentLoaded",()=>{
  const nav=document.querySelector(".nav");
  const revealEls=document.querySelectorAll(".reveal");

  const onScroll=()=>{
    if(nav) nav.classList.toggle("scrolled",window.scrollY>12);
  };
  onScroll(); window.addEventListener("scroll",onScroll,{passive:true});

  if(!("IntersectionObserver" in window)){
    revealEls.forEach(e=>e.style.opacity=1);
  }else{
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.style.animationDelay=(Math.random()*0.16)+"s";
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },{threshold:.08});
    revealEls.forEach(e=>io.observe(e));
  }

  // Gentle image tilt on larger screens
  if(window.matchMedia("(min-width: 900px)").matches){
    document.querySelectorAll(".card").forEach(card=>{
      card.addEventListener("mousemove",e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`translateY(-10px) rotateX(${-y*2}deg) rotateY(${x*2}deg)`;
      });
      card.addEventListener("mouseleave",()=>card.style.transform="");
    });
  }
});

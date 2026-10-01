const products=[
{name:'Nike Air Force 1',cat:'Sneakers',price:79.99,old:99.99,img:'white-sneakers.jpg',rating:'4.8'},
{name:'Elegant Heels',cat:'Heels',price:64.99,old:89.99,img:'rhinestone-block-heels.jpg',rating:'4.7'},
{name:'Combat Boots',cat:'Boots',price:69.99,old:99.99,img:'black-ankle-boots.jpg',rating:'4.6'},
{name:'New Balance 530',cat:'Sneakers',price:74.99,old:99.99,img:'white-sneakers.jpg',rating:'4.8'},
{name:'Red Embroidered Heels',cat:'Heels',price:59.99,old:79.99,img:'red-embroidered-heels.jpg',rating:'4.9'},
{name:'Crystal Buckle Heels',cat:'Heels',price:54.99,old:74.99,img:'crystal-buckle-heels.jpg',rating:'4.7'},
{name:'Party Strap Sandals',cat:'Sandals',price:49.99,old:69.99,img:'strappy-party-sandals.jpg',rating:'4.6'},
{name:'Black Pointed Heels',cat:'Heels',price:61.99,old:84.99,img:'black-pointed-heels.jpg',rating:'4.8'}];
let cart=[];
const grid=document.querySelector('#products');
function render(filter='All'){if(!grid)return;let list=filter==='All'?products:products.filter(p=>p.cat===filter);grid.innerHTML=list.map(p=>`<article class="product"><div class="product-media"><img src="${p.img}" alt="${p.name}"></div><div class="product-body"><h3>${p.name}</h3><div class="price-row"><span class="price">$${p.price.toFixed(2)}</span><span class="old">$${p.old.toFixed(2)}</span><span class="sale">SALE</span></div><div class="stars">★★★★★ <span style="color:#aaa">${p.rating}</span></div><select class="size-select"><option value="">Choose size 35–45</option>${Array.from({length:11},(_,i)=>`<option>${35+i}</option>`).join('')}</select><button class="add-btn" data-name="${p.name}">Add to Cart 🛒</button></div></article>`).join('');}
function updateCart(){const count=document.querySelector('#cartCount');const items=document.querySelector('#cartItems');const totalEl=document.querySelector('#cartTotal');if(!count)return;count.textContent=cart.reduce((s,x)=>s+x.qty,0);if(items)items.innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-row"><img src="${x.img}" alt=""><div><b>${x.name}</b><small>Size ${x.size} · Qty ${x.qty}</small><small>$${(x.price*x.qty).toFixed(2)}</small></div><button class="cart-remove" data-remove="${i}">Remove</button></div>`).join(''):'<p class="muted">Your cart is empty.</p>';const total=cart.reduce((s,x)=>s+x.price*x.qty,0);if(totalEl)totalEl.textContent=`$${total.toFixed(2)}`;const wa=document.querySelector('#whatsappOrder');if(wa){const msg=cart.length?`Hello PAULCHESS, I want to order:\n${cart.map(x=>`• ${x.name} — size ${x.size}, qty ${x.qty}`).join('\n')}\nTotal: $${total.toFixed(2)}`:'Hello PAULCHESS, I want to order.';wa.href='https://wa.me/2348188438485?text='+encodeURIComponent(msg)}}
function openCart(){document.querySelector('#cartDrawer')?.classList.add('open');document.querySelector('#overlay')?.classList.add('show')}
function closeCart(){document.querySelector('#cartDrawer')?.classList.remove('open');document.querySelector('#overlay')?.classList.remove('show')}
if(grid){const initial=new URLSearchParams(location.search).get('category');if(initial){document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===initial));render(initial)}else render();grid.addEventListener('click',e=>{const b=e.target.closest('.add-btn');if(!b)return;const p=products.find(x=>x.name===b.dataset.name);const size=b.closest('.product').querySelector('.size-select').value;if(!size){b.previousElementSibling.style.borderColor='#ff4db8';return}const found=cart.find(x=>x.name===p.name&&x.size===size);found?found.qty++:cart.push({...p,size,qty:1});updateCart();openCart()});document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)}));}
document.querySelector('#cartBtn')?.addEventListener('click',openCart);document.querySelector('#closeCart')?.addEventListener('click',closeCart);document.querySelector('#overlay')?.addEventListener('click',closeCart);document.querySelector('#cartItems')?.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){cart.splice(+b.dataset.remove,1);updateCart()}});document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open'));document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.remove('open')));document.querySelector('#newsletterForm')?.addEventListener('submit',e=>{e.preventDefault();e.target.querySelector('button').textContent='Subscribed ✓';});updateCart();

// Color-fusion ambient particles + cursor glow
(function(){
  const colors=['#ff2ea6','#7a5cff','#00d9ff','#ff7a45'];
  for(let i=0;i<10;i++){
    const o=document.createElement('span'); o.className='fusion-orb';
    o.style.left=(Math.random()*100)+'vw'; o.style.top=(Math.random()*100)+'vh';
    o.style.background=colors[i%colors.length];
    o.style.boxShadow=`0 0 12px ${colors[i%colors.length]},0 0 28px ${colors[(i+1)%colors.length]}`;
    o.style.animationDelay=(-Math.random()*10)+'s'; o.style.animationDuration=(8+Math.random()*8)+'s';
    document.body.appendChild(o);
  }
  const glow=document.createElement('div');
  glow.style.cssText='position:fixed;left:0;top:0;width:240px;height:240px;border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(255,70,190,.10),rgba(0,210,255,.045),transparent 68%);mix-blend-mode:screen;transition:left .12s ease-out,top .12s ease-out';
  document.body.appendChild(glow);
  window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
})();

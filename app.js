const products=[
 {name:'Nike Air Force 1',cat:'Sneakers',price:79.99,old:99.99,img:'white-sneakers.jpg',rating:'4.8'},
 {name:'Elegant Heels',cat:'Heels',price:64.99,old:89.99,img:'rhinestone-block-heels.jpg',rating:'4.7'},
 {name:'Combat Boots',cat:'Boots',price:69.99,old:99.99,img:'black-ankle-boots.jpg',rating:'4.6'},
 {name:'New Balance 530',cat:'Sneakers',price:74.99,old:99.99,img:'white-sneakers.jpg',rating:'4.8'},
 {name:'Red Embroidered Heels',cat:'Heels',price:59.99,old:79.99,img:'red-embroidered-heels.jpg',rating:'4.9'},
 {name:'Crystal Buckle Heels',cat:'Heels',price:54.99,old:74.99,img:'crystal-buckle-heels.jpg',rating:'4.7'},
 {name:'Party Strap Sandals',cat:'Sandals',price:49.99,old:69.99,img:'strappy-party-sandals.jpg',rating:'4.6'},
 {name:'Black Pointed Heels',cat:'Heels',price:61.99,old:84.99,img:'black-pointed-heels.jpg',rating:'4.8'}
];
let cart=[]; let activeFilter='All';
const productGrid=document.querySelector('#products');
function renderProducts(){
 const list=activeFilter==='All'?products:products.filter(p=>p.cat===activeFilter);
 productGrid.innerHTML=list.map((p,i)=>`<article class="product"><div class="product-media"><img src="${p.img}" alt="${p.name}"><button class="heart" aria-label="Save ${p.name}">♡</button></div><div class="product-body"><h3>${p.name}</h3><div class="price-row"><span class="price">$${p.price.toFixed(2)}</span><span class="old">$${p.old.toFixed(2)}</span><span class="sale">SALE</span></div><div class="stars">★★★★★ <span style="color:#aaa">${p.rating}</span></div><select class="size-select" aria-label="Choose size for ${p.name}"><option value="">Choose size 35–45</option>${Array.from({length:11},(_,n)=>`<option>${35+n}</option>`).join('')}</select><button class="add-btn" data-index="${products.indexOf(p)}">Add to Cart 🛒</button></div></article>`).join('');
}
function updateCart(){
 document.querySelector('#cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0);
 const box=document.querySelector('#cartItems');
 if(!cart.length){box.innerHTML='<p class="empty">Your cart is empty.</p>'}else{box.innerHTML=cart.map((x,i)=>`<div class="cart-row"><img src="${x.img}" alt=""><div><b>${x.name}</b><small>Size ${x.size} · Qty ${x.qty}</small><small>$${(x.price*x.qty).toFixed(2)}</small></div><button class="cart-remove" data-remove="${i}">Remove</button></div>`).join('')}
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);document.querySelector('#cartTotal').textContent=`$${total.toFixed(2)}`;
 const msg=cart.length?`Hello PAULCHESS, I want to order:\n${cart.map(x=>`• ${x.name} — size ${x.size}, qty ${x.qty} — $${(x.price*x.qty).toFixed(2)}`).join('\n')}\nTotal: $${total.toFixed(2)}`:'Hello PAULCHESS, I want to order.';
 document.querySelector('#whatsappOrder').href='https://wa.me/2348188438485?text='+encodeURIComponent(msg);
}
productGrid.addEventListener('click',e=>{const btn=e.target.closest('.add-btn');if(!btn)return;const card=btn.closest('.product');const select=card.querySelector('select');if(!select.value){select.focus();select.style.borderColor='#ff4db8';return}const p=products[Number(btn.dataset.index)];const found=cart.find(x=>x.name===p.name&&x.size===select.value);if(found)found.qty++;else cart.push({...p,size:select.value,qty:1});updateCart();openCart()});
document.querySelector('#filters').addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeFilter=b.dataset.filter;renderProducts()});
document.querySelectorAll('.category').forEach(a=>a.addEventListener('click',()=>{activeFilter=a.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===activeFilter));renderProducts()}));
function openCart(){document.querySelector('#cartDrawer').classList.add('open');document.querySelector('#overlay').classList.add('show');document.querySelector('#cartDrawer').setAttribute('aria-hidden','false')};function closeCart(){document.querySelector('#cartDrawer').classList.remove('open');document.querySelector('#overlay').classList.remove('show')};document.querySelector('#cartBtn').onclick=openCart;document.querySelector('#closeCart').onclick=closeCart;document.querySelector('#overlay').onclick=closeCart;
document.querySelector('#cartItems').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;cart.splice(Number(b.dataset.remove),1);updateCart()});
const menu=document.querySelector('.menu-toggle');menu.onclick=()=>{const open=document.querySelector('.nav-links').classList.toggle('open');menu.setAttribute('aria-expanded',open)};document.querySelectorAll('.nav-links a').forEach(a=>a.onclick=()=>document.querySelector('.nav-links').classList.remove('open'));
const dialog=document.querySelector('#searchDialog');document.querySelector('#searchBtn').onclick=()=>dialog.showModal();document.querySelector('#searchInput').addEventListener('input',e=>{const q=e.target.value.toLowerCase();if(q.length<2)return;const match=products.find(p=>(p.name+' '+p.cat).toLowerCase().includes(q));if(match){activeFilter=match.cat;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===activeFilter));renderProducts();dialog.close();location.hash='shop'}});
document.querySelector('#newsletterForm').addEventListener('submit',e=>{e.preventDefault();e.target.querySelector('button').textContent='Subscribed ✓';e.target.querySelector('input').value=''});
renderProducts();updateCart();

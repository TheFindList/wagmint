const content=window.siteContent;
const categoryGrid=document.querySelector('#categoryGrid');
const productGrid=document.querySelector('#productGrid');
const collectionGrid=document.querySelector('#collectionGrid');
const articleGrid=document.querySelector('#articleGrid');
const filters=document.querySelector('#filterPills');
let active='All';
categoryGrid.innerHTML=content.categories.map(i=>`<a class="category-card ${i.color}" href="#trending" data-category="${i.name}"><span class="category-icon">${i.icon}</span><span><strong>${i.name}</strong><small>${i.description}</small></span><b>→</b></a>`).join('');
filters.innerHTML=['All',...content.categories.map(x=>x.name)].map((x,i)=>`<button class="${i===0?'active':''}" data-filter="${x}">${x}</button>`).join('');
function render(){const items=active==='All'?content.products:content.products.filter(p=>(p.categories||[p.category]).includes(active));productGrid.innerHTML=items.map(p=>`<article class="product-card"><a class="product-image ${p.color}" href="${p.link}" ${p.link==='#'?'':'target="_blank" rel="sponsored nofollow noopener"'}><span class="product-badge">${p.badge}</span><span class="product-symbol">${p.symbol}</span></a><p class="product-category">${p.category}</p><h3>${p.title}</h3><div class="product-meta"><span>${p.price}</span><a href="${p.link}">${p.link==='#'?'Coming soon':'View find →'}</a></div></article>`).join('');}
render();
filters.addEventListener('click',e=>{if(!e.target.matches('button'))return;active=e.target.dataset.filter;filters.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===e.target));render();});
categoryGrid.addEventListener('click',e=>{const a=e.target.closest('[data-category]');if(!a)return;active=a.dataset.category;filters.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.filter===active));render();});
collectionGrid.innerHTML=content.collections.map(i=>`<article class="collection-card ${i.color}"><span class="collection-number">${i.number}</span><div><p>WAGMINT COLLECTION</p><h3>${i.title}</h3><span>${i.subtitle}</span></div><b>Explore →</b></article>`).join('');
articleGrid.innerHTML=content.articles.map(i=>`<article class="article-card"><div class="article-image ${i.color}"><span>${i.tag}</span></div><p class="article-meta">${i.tag} • ${i.read}</p><h3>${i.title}</h3><span class="text-link">Guide coming soon →</span></article>`).join('');
document.querySelector('.menu-toggle').addEventListener('click',()=>document.body.classList.toggle('menu-open'));

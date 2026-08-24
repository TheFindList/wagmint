const content=window.siteContent;
const categoryGrid=document.querySelector('#categoryGrid');
const productGrid=document.querySelector('#productGrid');
const collectionGrid=document.querySelector('#collectionGrid');
const articleGrid=document.querySelector('#articleGrid');
const filters=document.querySelector('#filterPills');
let active='All';

const knownImages={
  'Dexas MudBuster Portable Dog Paw Cleaner':'https://m.media-amazon.com/images/I/41qozu85zVL._AC_SL1000_.jpg',
  'Catstages Tower of Tracks Interactive 3-Tier Cat Toy':'https://m.media-amazon.com/images/I/71u76GmimqL._AC_SL1500_.jpg',
  'FUKUMARU Cat Scratcher, 26.8 Inch L Shaped Cat Scratch Pad for Indoor Cats':'https://m.media-amazon.com/images/I/410OQUfl0cL._AC_SL1000_.jpg',
  'PETLIBRO Automatic Cat Feeder with Camera, 1080P HD & Night Vision':'https://m.media-amazon.com/images/I/71sXahhiuKL._AC_SL1500_.jpg',
  'Solar Smart Bird Feeder with Camera, 4K HDR Live Video, AI Bird IDs':'https://images-cdn.ubuy.co.in/69bd6648118cd98d0c027336-solar-smart-bird-feeder-with-camera-ai.jpg'
};

function esc(v=''){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')}
function wrapTitle(title,max=23){const words=String(title).split(/\s+/);const lines=[];let line='';for(const word of words){const next=line?`${line} ${word}`:word;if(next.length>max&&line){lines.push(line);line=word}else line=next}if(line)lines.push(line);return lines.slice(0,4)}
function productFallback(p){const lines=wrapTitle(p.title).map((line,i)=>`<text x="50%" y="${245+i*44}" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#25352d">${esc(line)}</text>`).join('');const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f7f2e9"/><circle cx="400" cy="145" r="72" fill="#dce8df"/><text x="400" y="170" text-anchor="middle" font-size="64">${esc(p.symbol||'🐾')}</text>${lines}<line x1="245" y1="480" x2="555" y2="480" stroke="#b9c9bf" stroke-width="2"/><text x="400" y="535" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" letter-spacing="3" fill="#6f887a">${esc((p.category||'WAGMINT').toUpperCase())}</text><text x="400" y="595" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-weight="700" fill="#23352b">WAGMINT</text><text x="400" y="630" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#758078">Product photo loading</text></svg>`;return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`}
function imageFor(p){return p.image||knownImages[p.title]||productFallback(p)}

categoryGrid.innerHTML=content.categories.map(i=>`<a class="category-card ${i.color}" href="#trending" data-category="${i.name}"><span class="category-icon">${i.icon}</span><span><strong>${i.name}</strong><small>${i.description}</small></span><b>→</b></a>`).join('');
filters.innerHTML=['All',...content.categories.map(x=>x.name)].map((x,i)=>`<button class="${i===0?'active':''}" data-filter="${x}">${x}</button>`).join('');

function applyImageFallbacks(){document.querySelectorAll('.product-photo').forEach(img=>{img.addEventListener('error',()=>{if(img.dataset.fallback==='1')return;img.dataset.fallback='1';const p=content.products.find(x=>x.title===img.dataset.title);if(p)img.src=productFallback(p)},{once:true})})}
function render(){const items=active==='All'?content.products:content.products.filter(p=>(p.categories||[p.category]).includes(active));productGrid.innerHTML=items.map(p=>`<article class="product-card"><a class="product-image ${p.color}" href="${p.link}" target="_blank" rel="sponsored nofollow noopener"><span class="product-badge">${p.badge}</span><img class="product-photo" src="${imageFor(p)}" alt="${esc(p.title)}" data-title="${esc(p.title)}" loading="lazy"></a><p class="product-category">${p.category}</p><h3>${p.title}</h3><div class="product-meta"><span>${p.price}</span><a href="${p.link}" target="_blank" rel="sponsored nofollow noopener">View find →</a></div></article>`).join('');applyImageFallbacks()}
render();
filters.addEventListener('click',e=>{if(!e.target.matches('button'))return;active=e.target.dataset.filter;filters.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===e.target));render()});
categoryGrid.addEventListener('click',e=>{const a=e.target.closest('[data-category]');if(!a)return;active=a.dataset.category;filters.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.filter===active));render()});
collectionGrid.innerHTML=content.collections.map(i=>`<article class="collection-card ${i.color}"><span class="collection-number">${i.number}</span><div><p>WAGMINT COLLECTION</p><h3>${i.title}</h3><span>${i.subtitle}</span></div><b>Explore →</b></article>`).join('');
articleGrid.innerHTML=content.articles.map(i=>`<article class="article-card"><div class="article-image ${i.color}"><span>${i.tag}</span></div><p class="article-meta">${i.tag} • ${i.read}</p><h3>${i.title}</h3><span class="text-link">Guide coming soon →</span></article>`).join('');
document.querySelector('.menu-toggle').addEventListener('click',()=>document.body.classList.toggle('menu-open'));

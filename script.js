const content=window.siteContent;
const categoryGrid=document.querySelector('#categoryGrid');
const productGrid=document.querySelector('#productGrid');
const collectionGrid=document.querySelector('#collectionGrid');
const articleGrid=document.querySelector('#articleGrid');
const filters=document.querySelector('#filterPills');
let active='All';

const knownImages={
  'ChomChom Roller Pet Hair Remover and Reusable Lint Roller':'https://akns-images.eonline.com/eol_images/Entire_Site/202442/rs_640x640-240502134555-Chom_Chom_Roller_Pet_Hair_Remover_and_Reusable_Lint_Roller.jpg',
  'Outward Hound Nina Ottosson Dog Brick Interactive Treat Puzzle Dog Toy':'https://images-na.ssl-images-amazon.com/images/I/71qjzsDJPBL.jpg',
  'Benebone Wishbone Durable Dog Chew Toy':'https://www.benebone.com/cdn/shop/products/854111004972.jpg?v=1752901729&width=1946',
  'Dexas MudBuster Portable Dog Paw Cleaner':'https://m.media-amazon.com/images/I/41qozu85zVL._AC_SL1000_.jpg',
  'KONG Classic Dog Toy':'https://www.moustaches.fr/6952-large_default/kong-rouge-small.jpg',
  'PETLIBRO Dockstream Cordless Cat Water Fountain':'https://assets.wfcdn.com/im/76600568/compr-r85/3578/357846470/Dockstream%2BBattery%2BOperated%2BCat%2BWater%2BFountain%2B%2B1%2BReplacement%2BWireless%2BPump.jpg',
  'Catstages Tower of Tracks Interactive 3-Tier Cat Toy':'https://m.media-amazon.com/images/I/71u76GmimqL._AC_SL1500_.jpg',
  'FUKUMARU Cat Scratcher, 26.8 Inch L Shaped Cat Scratch Pad for Indoor Cats':'https://m.media-amazon.com/images/I/410OQUfl0cL._AC_SL1000_.jpg',
  'Whiskertons Interactive Bird Simulation Cat Toy Set':'https://whiskertons.com/cdn/shop/files/whiskertons-interactive-bird-simulation-cat-toy-set-with-5-unique-realistic-birds_31995a47-0bab-4be7-921b-1840afcf95b2.jpg?v=1761685202&width=2048',
  'PETLIBRO Automatic Cat Feeder with Camera, 1080P HD & Night Vision':'https://m.media-amazon.com/images/I/71sXahhiuKL._AC_SL1500_.jpg',
  'JW Pet Company Activitoys Hol-ee Roller Bird Toy':'https://goldencockatoo.com/cdn/shop/products/afccef36146536e66f9573dbf4a804f5.jpg?v=1736010474',
  'JW Pet Insight Sand Perch Swing Bird Accessory':'https://supertails.com/cdn/shop/files/Frame106724729_600x.png?v=1734943057',
  'Lixit Quick Lock Bird Bath':'https://i5.walmartimages.com/asr/1c1ae1ad-c4ab-4929-ac3b-075364074d42_1.6f2ba1cd7b895314df206a7c7b467d1c.jpeg',
  'Solar Smart Bird Feeder with Camera, 4K HDR Live Video, AI Bird IDs':'https://images-cdn.ubuy.co.in/69bd6648118cd98d0c027336-solar-smart-bird-feeder-with-camera-ai.jpg',
  'Oxbow Enriched Life Willow Play Cube Small Animal Toy':'https://www.naturalpetwarehouse.com/assets/images/oxbow-enriched-life-willow-play-cube-small-animal-toy-3-pack-3.jpg',
  'Oxbow Timothy Club Bungalow Small Animal Hideout':'https://petmedsdirect.ca/cdn/shop/files/109133_0-L_dcb81a01-fa1c-437e-bd2c-e22645d96ee2.jpg?v=1764476874',
  'Kaytee Premium Timothy Treat Hideout for Rabbits, Guinea Pigs, Large':'https://i5.walmartimages.com/seo/Kaytee-Premium-Timothy-Hay-Treat-Hideout-for-Small-Animals-Large_f5eabce7-ecb1-4ffc-a477-ac37b2699ab4.38a04ad8dc408477697e78d84d83e528.jpeg',
  'SunGrow Rabbit, Bunny & Guinea Pig Hay Feeder Rack Food Dispenser':'https://www.ubuy.ec/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvOTF0VUR1QmZMZkwuX0FDX1NMMTUwMF8uanBn.jpg',
  'Small Pet Select Tiny Paws Willow Play Pack':'https://shop.smallpetselect.com/cdn/shop/files/459.png?crop=center&height=1200&v=1741872455&width=1200',
  'Zoo Med ReptiTemp Digital Infrared Thermometer':'https://i5.walmartimages.com/seo/Zoo-Med-ReptiTemp-Digital-Infrared-Thermometer_aaa114e7-3844-476e-9ba0-f4a5e16fd56b_2.880f18cec12fbc4de1e453dbd3020868.jpeg?odnBg=FFFFFF&odnHeight=768&odnWidth=768',
  'Zoo Med Digital Thermometer Humidity Gauge':'https://image.chewy.com/catalog/general/images/zoo-med-digital-combo-reptile-terrarium-thermometer-humidity-gauge/img-54572._AC_SL744_V1_.jpg',
  'REPTI ZOO Digital Thermometer Hygrometer':'https://m.newrunreptile.co.kr/web/product/big/202302/e47f4c50555f823d41d95f0ad65a9dbf.jpg',
  'Exo Terra Reptile Cave':'https://coburgaquarium.com.au/cdn/shop/products/CHL23_0072034c-ea66-4dcc-95d3-d3bb5d8d6548.jpg?v=1659065908',
  'Zoo Med Angled Stainless Steel Feeding Tongs':'https://shorethingpetsupply.com/cdn/shop/files/t1_1e04a170-e3ce-467a-84d0-67ad5c0f4465_1080x.jpg?v=1734569727',
  'Flipper FLOAT 2-in-1 Magnetic Aquarium Algae Cleaner':'https://m.media-amazon.com/images/I/61-a9Fqu6xL._AC_SL1500_.jpg',
  'API Algae Scraper for Glass Aquariums':'https://www.thetechden.com.au/cdn/shop/products/APH239_2048x.jpg?v=1665641792',
  'Aqueon Aquarium Water Changer':'https://image.chewy.com/catalog/general/images/aqueon-aquarium-water-changer-50ft/img-99485._AC_SS600_V1_.jpg',
  '3MP 2K AI Reptile Aquarium Camera, Close-Focus Lens for Fish Tank Terrarium':'https://litokam.com/cdn/shop/files/6391ace427ade714b70fb966024ae804.jpg?v=1767608041',
  'Python No Spill Clean and Fill Aquarium Maintenance System':'https://aquarockscolorado.com/cdn/shop/products/image_dbed8bd1-ce8c-4a25-be54-03a2d657828a.jpg?v=1631208399',
  'Pet Hair Removal Glove Cat & Dog, Electrostatic Reusable Hair Remover Tool':'https://au.funnyfuzzy.com/cdn/shop/files/FunnyFuzzy_Pet_Hair_Removal_Glove_with_Dual-Sided_Electrostatic_Bristles_-8.jpg?v=1750995005&width=1000',
  'FURemover Original Indoor Pet Hair Rubber Broom':'https://m.media-amazon.com/images/I/41mYFK7mlML._SL500_.jpg',
  'Gamma2 Vittles Vault Outback Airtight Pet Food Storage Container':'https://i5.walmartimages.com/seo/Gamma2-Vittles-Vault-Outback-Airtight-Pet-Food-Storage-Container-Grey-50-Lb_7d8b8e19-0482-4d63-9934-285b30595cb3.029f407a9d5423da2daada77d792e1e3.jpeg',
  'K&H Pet Products Bucket Booster Pet Seat':'https://i5.walmartimages.com/asr/f0493f18-06fe-4f21-962c-b3911aac9220.2e91f24048fc2d57b1068584241d925e.jpeg',
  'URPOWER Dog Seat Cover Car Seat Cover for Pets':'https://images-na.ssl-images-amazon.com/images/I/719G4sHWobL.jpg'
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

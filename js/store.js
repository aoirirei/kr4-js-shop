// Содержит общие функции: расчёт цен, обработку товаров, карточки, корзину, избранное и localStorage.
const categoryNames = {food:'Корм',accessories:'Аксессуары',care:'Уход',toys:'Игрушки'};
function formatPrice(price) { return `${Math.round(price).toLocaleString('ru-RU')} руб.`; }
function calculateDiscount(price, percent) { return Math.round(price * percent / 100); }
function calculateFinalPrice(price, percent) { return price - calculateDiscount(price, percent); }
function getProductStatus(item) { return item.isAvailable ? 'В наличии' : 'Нет в наличии'; }
function createProductSummary(item) { return `${item.title}: ${formatPrice(calculateFinalPrice(item.price,item.discountPercent))}. ${getProductStatus(item)}.`; }
function getProductTitles(data) { return data.map(item => item.title); }
function getAvailableProducts(data) { return data.filter(item => item.isAvailable); }
function searchProducts(data, query) { const q=String(query).trim().toLocaleLowerCase('ru'); return q ? data.filter(item=>item.title.toLocaleLowerCase('ru').includes(q)) : data; }
function filterProductsByCategory(data, category) { return category==='all' ? data : data.filter(item => item.category===category); }
function sortProductsByPrice(data,direction='asc') { return [...data].sort((a,b)=>direction==='desc' ? calculateFinalPrice(b.price,b.discountPercent)-calculateFinalPrice(a.price,a.discountPercent) : calculateFinalPrice(a.price,a.discountPercent)-calculateFinalPrice(b.price,b.discountPercent)); }
function sortProducts(data,type='default') { if(type==='price-asc') return sortProductsByPrice(data); if(type==='price-desc') return sortProductsByPrice(data,'desc'); if(type==='title-asc') return [...data].sort((a,b)=>a.title.localeCompare(b.title,'ru')); return [...data]; }
function findProductById(data,id) { return data.find(item=>item.id===Number(id)); }
function calculateTotalPrice(data) { return data.reduce((sum,item)=>sum+calculateFinalPrice(item.price,item.discountPercent),0); }
function countAvailableProducts(data) { return getAvailableProducts(data).length; }
function calculateAveragePrice(data) { return data.length ? Math.round(calculateTotalPrice(data)/data.length):0; }
function getPreparedProducts(data,state) { return sortProducts(filterProductsByCategory(searchProducts(data,state.query),state.category),state.sort); }
const CART_KEY='forcats-cart-v4', FAVORITES_KEY='forcats-favorites-v4';
function readSaved(key) { try { const value=JSON.parse(localStorage.getItem(key)||'[]'); return Array.isArray(value)?value:[]; } catch { return []; } }
function writeSaved(key,value) { try {localStorage.setItem(key,JSON.stringify(value));} catch(error) { console.warn('Хранилище недоступно',error); } window.dispatchEvent(new Event('forcats:update')); }
function getCart() { return readSaved(CART_KEY).filter(row=>row && typeof row==='object' && Number.isInteger(row.id)&&Number.isInteger(row.quantity)&&row.quantity>0&&row.quantity<=20&&findProductById(products,row.id)); }
function getFavorites() { return readSaved(FAVORITES_KEY).filter(id=>Number.isInteger(id)&&findProductById(products,id)); }
function addToCart(id) { const item=findProductById(products,id); if(!item?.isAvailable) return; const cart=getCart(),row=cart.find(x=>x.id===item.id); if(row) row.quantity=Math.min(20,row.quantity+1); else cart.push({id:item.id,quantity:1}); writeSaved(CART_KEY,cart); showToast(`${item.title} добавлен в корзину`); }
function setCartQuantity(id,quantity) { let cart=getCart(); if(quantity<=0) cart=cart.filter(x=>x.id!==id); else cart=cart.map(x=>x.id===id?{...x,quantity:Math.min(20,quantity)}:x); writeSaved(CART_KEY,cart); }
function toggleFavorite(id) { const saved=getFavorites(); writeSaved(FAVORITES_KEY,saved.includes(id)?saved.filter(x=>x!==id):[...saved,id]); }
function cartTotal() { return getCart().reduce((sum,row)=>{const p=findProductById(products,row.id);return sum+(p?calculateFinalPrice(p.price,p.discountPercent)*row.quantity:0);},0); }
function createCartControl(item) {
 const control = make('div', 'cart-control');
 control.dataset.cartControl = String(item.id);
 const add = make('button', 'button button--primary cart-control__add', 'В корзину');
 add.type = 'button';
 add.dataset.action = 'add-to-cart';
 add.dataset.productId = String(item.id);
 const quantity = make('div', 'cart-control__quantity');
 const minus = make('button', 'cart-control__step', '−');
 const plus = make('button', 'cart-control__step', '+');
 for (const [button, action, label] of [
  [minus, 'cart-minus', 'Уменьшить количество'],
  [plus, 'cart-plus', 'Увеличить количество']
 ]) {
  button.type = 'button';
  button.dataset.action = action;
  button.dataset.productId = String(item.id);
  button.setAttribute('aria-label', `${label}: ${item.title}`);
 }
 const status = make('span', 'cart-control__status');
 status.append(make('span', 'cart-control__count'));
 status.setAttribute('aria-live', 'polite');
 quantity.append(minus, status, plus);
 control.append(add, quantity);
 updateCartControl(control, item);
 return control;
}
function updateCartControl(control, item) {
 const count = getCart().find(row => row.id === item.id)?.quantity || 0;
 const add = control.querySelector('.cart-control__add');
 const quantity = control.querySelector('.cart-control__quantity');
 const active = document.activeElement;
 const hadFocus = active && control.contains(active);
 add.hidden = count > 0;
 add.disabled = !item.isAvailable;
 add.textContent = item.isAvailable ? 'В корзину' : 'Нет в наличии';
 quantity.hidden = count === 0;
 control.querySelector('.cart-control__count').textContent = String(count);
 const plus = control.querySelector('[data-action="cart-plus"]');
 plus.disabled = count >= 20 || !item.isAvailable;
 if (hadFocus) {
  if (count === 0) add.focus();
  else if (active === add || (active === plus && plus.disabled)) {
   control.querySelector('[data-action="cart-minus"]').focus();
  }
 }
}
function updateCartButtons() {
 document.querySelectorAll('[data-cart-control]').forEach(control => {
  const item = findProductById(products, control.dataset.cartControl);
  if (item) updateCartControl(control, item);
 });
}
function updateBadges() { document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=String(getCart().reduce((n,x)=>n+x.quantity,0))); document.querySelectorAll('[data-fav-count]').forEach(el=>el.textContent=String(getFavorites().length)); }
function showToast(message) { let el=document.querySelector('#shop-toast'); if(!el){el=document.createElement('p');el.id='shop-toast';el.className='shop-toast';el.setAttribute('role','status');document.body.append(el);} el.textContent=message; }
function make(tag,css,text) { const el=document.createElement(tag);if(css)el.className=css;if(text!==undefined)el.textContent=text;return el; }
function createProductCard(item) {
 const card=make('article','product-card');
 const photoLink=make('a','product-card__photo');photoLink.href=`product.html?product=${item.id}`;
 const photo=make('img','product-card__image');photo.src=item.image;photo.alt=item.title;photo.loading='lazy';photo.decoding='async';photo.width=400;photo.height=300;if(item.srcset){photo.srcset=item.srcset;photo.sizes='(max-width: 600px) 90vw, (max-width: 1000px) 43vw, 300px';}photoLink.append(photo);
 if(item.badge){const badge=make('span','product-card__badge'+(item.badge==='Новинка'?' product-card__badge--new':''),item.badge);card.append(badge);}
 const title=make('h3','product-card__title');const link=make('a','product-title-link',item.title);link.href=photoLink.href;title.append(link);
 const desc=make('p','product-card__description',item.description);
 const rating=make('p','product-card__rating',`★ ${item.rating.toFixed(1)} · ${getProductStatus(item)}`);
 const price=make('p','product-card__price',formatPrice(calculateFinalPrice(item.price,item.discountPercent)));
 if(item.discountPercent){price.append(make('span','old-price',formatPrice(item.price)));}
 const actions=make('div','product-card__actions');const add=createCartControl(item);
 const fav=make('button','favorite-button',getFavorites().includes(item.id)?'♥':'♡');fav.type='button';fav.dataset.action='favorite';fav.dataset.productId=String(item.id);fav.setAttribute('aria-label',`В избранное: ${item.title}`);fav.setAttribute('aria-pressed',String(getFavorites().includes(item.id)));actions.append(add,fav);card.append(photoLink,title,desc,rating,price,actions);return card;
}
document.addEventListener('click',event=> {const button=event.target.closest('[data-action][data-product-id]');if(!button) return; const id=Number(button.dataset.productId);if(button.dataset.action==='add-to-cart') addToCart(id);
 if(button.dataset.action==='cart-minus'||button.dataset.action==='cart-plus') {
  const row=getCart().find(item=>item.id===id);
  if(row) setCartQuantity(id,row.quantity+(button.dataset.action==='cart-plus'?1:-1));
 }
 if(button.dataset.action==='favorite'){toggleFavorite(id);const saved=getFavorites().includes(id);button.textContent=saved?'♥':'♡';button.setAttribute('aria-pressed',String(saved));if(button.classList.contains('product-favorite'))button.textContent=saved?'♥ В избранном':'♡ В избранное';if(document.body.dataset.page==='favorites')window.dispatchEvent(new Event('forcats:rerender'));}});
window.addEventListener('forcats:update',updateBadges);
window.addEventListener('forcats:update',updateCartButtons);
document.addEventListener('DOMContentLoaded',()=> {updateBadges();console.log('ForCats: подключён JavaScript, товаров:',products.length);console.table(products);console.log('Пример:',createProductSummary(product));console.log('В наличии:',countAvailableProducts(products),'Средняя цена:',calculateAveragePrice(products));const message=document.querySelector('.js-message');if(message)message.textContent='Каталог обновляется с помощью JavaScript';const output=document.querySelector('.product-output');if(output)output.textContent=`Всего товаров: ${products.length}; в наличии: ${countAvailableProducts(products)}; средняя цена: ${formatPrice(calculateAveragePrice(products))}.`;});

document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.about-stats__item').forEach(row=>{const label=row.querySelector('.about-stats__label')?.textContent||'';const value=row.querySelector('.about-stats__value');if(!value)return;if(label.includes('товаров'))value.textContent=String(products.length);if(label.includes('страниц'))value.textContent='8';});});

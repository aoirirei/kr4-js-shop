// Заполняет страницу выбранного товара по ID из адреса и сохраняет отзывы.
document.addEventListener('DOMContentLoaded',()=>{
 const root=document.querySelector('.product-page__layout');if(!root)return;
 const params=new URLSearchParams(location.search);const selected=findProductById(products,params.get('product'))||products[0];
 document.title=`${selected.title} — ForCats`;
 const hero=root.querySelector('.product-page__image');hero.src=selected.image;hero.alt=selected.title;hero.removeAttribute('srcset');if(selected.srcset){hero.srcset=selected.srcset;hero.sizes='(max-width: 767px) 90vw, 540px';}
 root.querySelector('.product-page__title').textContent=selected.title;root.querySelector('.product-page__description').textContent=selected.description;root.querySelector('.product-page__price').textContent=`Цена: ${formatPrice(calculateFinalPrice(selected.price,selected.discountPercent))}`;
 const crumb=document.querySelector('.breadcrumbs__current');if(crumb)crumb.textContent=selected.title;
 const rows=document.querySelectorAll('.product-table tbody tr td');const values=[categoryNames[selected.category],selected.sku,formatPrice(calculateFinalPrice(selected.price,selected.discountPercent)),getProductStatus(selected),'Учебный товар','ForCats'];rows.forEach((cell,i)=>{if(i<values.length)cell.textContent=values[i];});
 const action=createCartControl(selected);root.querySelector('.product-card__button').replaceWith(action);
 const extra=make('button','favorite-button product-favorite',getFavorites().includes(selected.id)?'♥ В избранном':'♡ В избранное');extra.type='button';extra.dataset.action='favorite';extra.dataset.productId=String(selected.id);extra.setAttribute('aria-pressed',String(getFavorites().includes(selected.id)));action.after(extra);
 const subtitle=document.querySelector('.reviews__subtitle');if(subtitle)subtitle.textContent=`Отзывы о товаре «${selected.title}»`;
 const score=document.querySelector('.reviews__score strong');if(score)score.textContent=`${selected.rating.toFixed(1).replace('.',',')} / 5`;
 const list=document.querySelector('#reviews-list');list?.replaceChildren();
 const key=`forcats-reviews-v4-${selected.id}`;const saved=readSaved(key);const samples=[{name:'Анна',rating:5,text:`${selected.title} понравился, всё соответствует описанию.`,date:'12 октября 2026'},{name:'Мария',rating:4,text:'Хорошее качество, удобно использовать. Рекомендую!',date:'5 октября 2026'}];
 function draw(){list.replaceChildren();[...samples,...saved].forEach(review=>{const card=make('article','review-card'),top=make('div','review-card__top'),name=make('strong','',review.name),stars=make('span','review-card__stars','★'.repeat(review.rating)+'☆'.repeat(5-review.rating));top.append(name,stars);card.append(top,make('p','',review.text),make('small','',review.date));list.append(card);});}
 draw();
 const form=document.querySelector('#review-form');form?.addEventListener('submit',event=>{event.preventDefault();const name=form.querySelector('#review-name').value.trim(),rating=Number(form.querySelector('#review-rating').value),text=form.querySelector('#review-text').value.trim(),status=document.querySelector('#review-status');if(name.length<2||!(rating>=1&&rating<=5)||text.length<10){status.textContent='Укажите имя от 2 символов, оценку и отзыв не короче 10 символов.';return;}saved.push({name,rating,text,date:new Date().toLocaleDateString('ru-RU')});writeSaved(key,saved);draw();form.reset();status.textContent='Спасибо! Отзыв сохранён для этого товара.';});
});

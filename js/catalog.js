// Выводит каталог и обновляет товары при поиске, фильтрации и сортировке.
document.addEventListener('DOMContentLoaded',()=> {
 const grid=document.querySelector('[data-products-container]');if(!grid)return;
 const search=document.querySelector('#catalog-search'),category=document.querySelector('#category-filter'),sort=document.querySelector('#sort-select'),count=document.querySelector('.catalog-count'),empty=document.querySelector('.catalog-empty');
 const state={query:'',category:'all',sort:'default'};
 function render(){let result=getPreparedProducts(products,state);const from=document.querySelector('#price-from'),to=document.querySelector('#price-to');const min=from?.value.trim()===''?0:Number(from.value);const max=to?.value.trim()===''?Infinity:Number(to.value);result=result.filter(x=>{const price=calculateFinalPrice(x.price,x.discountPercent);return price>=min&&price<=max;});grid.replaceChildren(...result.map(createProductCard));count.textContent=`Найдено товаров: ${result.length} из ${products.length}`;empty.hidden=result.length!==0;}
 search?.addEventListener('input',()=>{state.query=search.value;render();});category?.addEventListener('change',()=>{state.category=category.value;render();});sort?.addEventListener('change',()=>{state.sort=sort.value;render();});document.querySelector('.filters-form')?.addEventListener('submit',e=>{e.preventDefault();render();});
 document.querySelector('#reset-filters')?.addEventListener('click',()=>{state.query='';state.category='all';state.sort='default';search.value='';category.value='all';sort.value='default';document.querySelector('#price-from').value='';document.querySelector('#price-to').value='';render();});render();
});

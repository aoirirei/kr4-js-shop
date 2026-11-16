// Выводит первые пять доступных товаров на главной странице.
document.addEventListener('DOMContentLoaded',()=>{const grid=document.querySelector('#popular .products-grid');if(grid)grid.replaceChildren(...products.filter(p=>p.isAvailable).slice(0,5).map(createProductCard));});

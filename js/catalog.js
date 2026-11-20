// Выводит каталог и обновляет товары при поиске, фильтрации и сортировке.
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('[data-products-container]');
  if (!grid) {
    return;
  }
  const search = document.querySelector('#catalog-search');
  const category = document.querySelector('#category-filter');
  const sort = document.querySelector('#sort-select');
  const count = document.querySelector('.catalog-count');
  const empty = document.querySelector('.catalog-empty');
  const state = { query: '', category: 'all', sort: 'default' };
  function render() {
    // Получаем товары после поиска, выбора категории и сортировки.
    const sortedProducts = getPreparedProducts(products, state);
    const from = document.querySelector('#price-from');
    const to = document.querySelector('#price-to');
    const min = from?.value.trim() === '' ? 0 : Number(from.value);
    const max = to?.value.trim() === '' ? Infinity : Number(to.value);
    // Оставляем товары в выбранном диапазоне цен.
    const visibleProducts = sortedProducts.filter(item => {
      const price = calculateFinalPrice(item.price, item.discountPercent);
      return price >= min && price <= max;
    });
    grid.replaceChildren(...visibleProducts.map(createProductCard));
    count.textContent = `Найдено товаров: ${visibleProducts.length} из ${products.length}`;
    empty.hidden = visibleProducts.length !== 0;
  }
  search?.addEventListener('input', () => {
    state.query = search.value;
    render();
  });
  category?.addEventListener('change', () => {
    state.category = category.value;
    render();
  });
  sort?.addEventListener('change', () => {
    state.sort = sort.value;
    render();
  });
  document.querySelector('.filters-form')?.addEventListener('submit', e => {
    e.preventDefault();
    render();
  });
  // Сбрасываем и значения полей, и состояние фильтров.
  document.querySelector('#reset-filters')?.addEventListener('click', () => {
    state.query = '';
    state.category = 'all';
    state.sort = 'default';
    search.value = '';
    category.value = 'all';
    sort.value = 'default';
    document.querySelector('#price-from').value = '';
    document.querySelector('#price-to').value = '';
    render();
  });
  render();
});

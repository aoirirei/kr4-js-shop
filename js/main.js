// Управляет чатом и модальным окном заявки при наличии нужных элементов.
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (
  orderDialog &&
  orderButtons.length &&
  closeDialogButton &&
  selectedProductInput
) {
  orderButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const productName = button.dataset.product || '';
      selectedProductInput.value = productName;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');

if (chatToggle && chatWindow && chatClose) {
  chatToggle.addEventListener('click', () => {
    chatWindow.hidden = !chatWindow.hidden;
  });
  chatClose.addEventListener('click', () => {
    chatWindow.hidden = true;
  });
}

// Открывает и закрывает мобильное меню, в том числе по Escape и нажатию снаружи.
(() => {
  const button = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-navigation');
  if (!button || !nav) {
    return;
  }
  const mobile = window.matchMedia('(max-width: 767px)');
  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Открыть меню');
    nav.classList.remove('site-nav--open');
  };
  button.addEventListener('click', () => {
    const opening = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(opening));
    button.setAttribute(
      'aria-label',
      opening ? 'Закрыть меню' : 'Открыть меню'
    );
    nav.classList.toggle('site-nav--open', opening);
  });
  nav.addEventListener('click', e => {
    if (e.target.closest('a') && mobile.matches) {
      close();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('site-nav--open')) {
      close();
      button.focus();
    }
  });
  document.addEventListener('click', e => {
    if (
      mobile.matches &&
      !nav.contains(e.target) &&
      !button.contains(e.target)
    ) {
      close();
    }
  });
  mobile.addEventListener('change', close);
})();

// Выводит первые пять доступных товаров на главной странице.
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#popular .products-grid');
  if (grid) {
    grid.replaceChildren(
      ...products
        .filter(p => p.isAvailable)
        .slice(0, 5)
        .map(createProductCard)
    );
  }
});

// Хранит массив товаров магазина: названия, цены, категории и другие свойства.
const products = [
  {
    id: 1,
    title: 'Корм для взрослых кошек',
    category: 'food',
    price: 1000,
    discountPercent: 0,
    rating: 4.9,
    isAvailable: true,
    image: 'images/photo1.jpeg',
    description:
      'Сбалансированный сухой корм для взрослых кошек на каждый день.',
    badge: 'Хит',
    sku: 'FC-0001',
    srcset:
      'images/responsive/photo1-320.webp 320w, images/responsive/photo1-640.webp 640w, images/responsive/photo1-960.webp 960w'
  },
  {
    id: 2,
    title: 'Корм для котят',
    category: 'food',
    price: 1500,
    discountPercent: 10,
    rating: 4.8,
    isAvailable: true,
    image: 'images/photo2.jpeg',
    description: 'Питательный корм для котят с витаминами и минералами.',
    badge: '',
    sku: 'FC-0002',
    srcset:
      'images/responsive/photo2-320.webp 320w, images/responsive/photo2-640.webp 640w, images/responsive/photo2-960.webp 960w'
  },
  {
    id: 3,
    title: 'Когтеточка',
    category: 'accessories',
    price: 2000,
    discountPercent: 15,
    rating: 4.7,
    isAvailable: true,
    image: 'images/photo3.jpeg',
    description: 'Устойчивая когтеточка для ухода за когтями и игр.',
    badge: 'Скидка',
    sku: 'FC-0003',
    srcset:
      'images/responsive/photo3-320.webp 320w, images/responsive/photo3-640.webp 640w, images/responsive/photo3-960.webp 960w'
  },
  {
    id: 4,
    title: 'Лоток для кошек',
    category: 'care',
    price: 2500,
    discountPercent: 0,
    rating: 4.6,
    isAvailable: true,
    image: 'images/photo4.jpeg',
    description: 'Удобный лоток с высокими бортиками для чистоты дома.',
    badge: 'Новинка',
    sku: 'FC-0004',
    srcset:
      'images/responsive/photo4-320.webp 320w, images/responsive/photo4-640.webp 640w, images/responsive/photo4-960.webp 960w'
  },
  {
    id: 5,
    title: 'Керамические мисочки',
    category: 'accessories',
    price: 3000,
    discountPercent: 10,
    rating: 4.9,
    isAvailable: true,
    image: 'images/photo5.jpeg',
    description: 'Набор керамических мисок для корма и воды.',
    badge: 'Скидка',
    sku: 'FC-0005',
    srcset:
      'images/responsive/photo5-320.webp 320w, images/responsive/photo5-640.webp 640w, images/responsive/photo5-960.webp 960w'
  },
  {
    id: 6,
    title: 'Мячик с колокольчиком',
    category: 'toys',
    price: 390,
    discountPercent: 0,
    rating: 4.5,
    isAvailable: true,
    image: 'images/toy-ball.jpg',
    description: 'Лёгкий мячик, который понравится активному питомцу.',
    badge: '',
    sku: 'FC-0006'
  },
  {
    id: 7,
    title: 'Мягкая лежанка',
    category: 'accessories',
    price: 1890,
    discountPercent: 5,
    rating: 4.8,
    isAvailable: true,
    image: 'images/bed.jpg',
    description: 'Уютная лежанка с мягкими бортиками для отдыха.',
    badge: 'Новинка',
    sku: 'FC-0007'
  },
  {
    id: 8,
    title: 'Игрушка-удочка',
    category: 'toys',
    price: 650,
    discountPercent: 0,
    rating: 4.7,
    isAvailable: true,
    image: 'images/wand.jpg',
    description: 'Игрушка для совместных игр с кошкой.',
    badge: '',
    sku: 'FC-0008'
  },
  {
    id: 9,
    title: 'Переноска для кошек',
    category: 'accessories',
    price: 3490,
    discountPercent: 0,
    rating: 4.6,
    isAvailable: false,
    image: 'images/carrier.jpg',
    description: 'Просторная переноска с вентиляционными отверстиями.',
    badge: '',
    sku: 'FC-0009'
  },
  {
    id: 10,
    title: 'Щётка для шерсти',
    category: 'care',
    price: 790,
    discountPercent: 10,
    rating: 4.5,
    isAvailable: true,
    image: 'images/brush.jpg',
    description: 'Щётка для бережного вычёсывания шерсти.',
    badge: 'Скидка',
    sku: 'FC-0010'
  }
];
const product = products[0];

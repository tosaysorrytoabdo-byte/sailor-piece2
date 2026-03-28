import type { Product, StoreConfig } from '@/types';

// ⚙️ بيانات المتجر - تقدر تعدلها من هنا
export const storeConfig: StoreConfig = {
  name: 'slr',           // اسم المتجر
  tiktok: '@seoul4',     // حساب تيك توك
  whatsapp: '01110237360', // رقم واتساب
  phone: '01110237360',    // رقم الهاتف
  location: 'Egypt',       // الموقع
};

// 🍎 الفواكه الحقيقية في Sailor Piece
export const fruits: Product[] = [
  {
    id: 'fruit-light',
    name: 'Light Fruit',
    description: 'أفضل فاكهة في اللعبة - ضرر عالي + قدرة الطيران',
    price: 8000,
    image: 'https://tr.rbxcdn.com/180DAY-03cf3a4c472ab4edad95ff2fe74b9355/768/432/Image/Webp/noFilter',
    type: 'fruit',
    rarity: 'legendary',
    stock: 5,
    popular: true,
  },
  {
    id: 'fruit-quake',
    name: 'Quake Fruit',
    description: 'ضرر AOE قوي - ممتازة ضد البوسات',
    price: 5000,
    image: 'https://tr.rbxcdn.com/180DAY-b917402b50c74ade0139c8d46b089242/768/432/Image/Webp/noFilter',
    type: 'fruit',
    rarity: 'epic',
    stock: 8,
    popular: true,
  },
  {
    id: 'fruit-flame',
    name: 'Flame Fruit',
    description: 'فاكهة النار - حرق الأعداء',
    price: 3000,
    image: 'https://tr.rbxcdn.com/180DAY-40db295d7964cf6fcaa92178db5241be/768/432/Image/Webp/noFilter',
    type: 'fruit',
    rarity: 'rare',
    stock: 12,
  },
  {
    id: 'fruit-bomb',
    name: 'Bomb Fruit',
    description: 'انفجارات AOE ضخمة',
    price: 1500,
    image: 'https://static.beebom.com/wp-content/uploads/2026/03/Sailor-piece-devil-fruits.jpg',
    type: 'fruit',
    rarity: 'uncommon',
    stock: 20,
  },
  {
    id: 'fruit-invisible',
    name: 'Invisible Fruit',
    description: 'الاختفاء - ممتازة للهروب',
    price: 800,
    image: 'https://static.beebom.com/wp-content/uploads/2026/03/All-Items-in-Sailor-Piece.jpg',
    type: 'fruit',
    rarity: 'common',
    stock: 30,
  },
];

// ⚔️ السيوف الحقيقية في Sailor Piece
export const swords: Product[] = [
  {
    id: 'sword-atomic',
    name: 'Atomic Sword',
    description: 'أقوى سيف في اللعبة حالياً - DPS هائل',
    price: 15000,
    image: 'https://tr.rbxcdn.com/180DAY-03cf3a4c472ab4edad95ff2fe74b9355/768/432/Image/Webp/noFilter',
    type: 'sword',
    rarity: 'mythical',
    stock: 3,
    popular: true,
  },
  {
    id: 'sword-abyssal',
    name: 'Abyssal Empress',
    description: 'سيف أسطوري - سرعة + ضرر عالي',
    price: 12000,
    image: 'https://tr.rbxcdn.com/180DAY-b917402b50c74ade0139c8d46b089242/768/432/Image/Webp/noFilter',
    type: 'sword',
    rarity: 'mythical',
    stock: 3,
    popular: true,
  },
  {
    id: 'sword-shadow-monarch',
    name: 'Shadow Monarch',
    description: 'ضرر كريتي هائل - ممتاز ضد البوسات',
    price: 10000,
    image: 'https://tr.rbxcdn.com/180DAY-40db295d7964cf6fcaa92178db5241be/768/432/Image/Webp/noFilter',
    type: 'sword',
    rarity: 'mythical',
    stock: 4,
    popular: true,
  },
  {
    id: 'sword-yamato',
    name: 'Yamato Sword',
    description: 'سيف أسطوري - مدى طويل + ضرر عالي',
    price: 9000,
    image: 'https://static.beebom.com/wp-content/uploads/2026/03/Sailor-piece-devil-fruits.jpg',
    type: 'sword',
    rarity: 'mythical',
    stock: 5,
  },
  {
    id: 'sword-ichigo',
    name: 'Ichigo Sword',
    description: 'سيف قوي - سهل الحصول عليه',
    price: 6000,
    image: 'https://static.beebom.com/wp-content/uploads/2026/03/All-Items-in-Sailor-Piece.jpg',
    type: 'sword',
    rarity: 'mythical',
    stock: 6,
  },
  {
    id: 'sword-aizen',
    name: 'Aizen Sword',
    description: 'سيف قوي - متوسط الصعوبة',
    price: 4500,
    image: 'https://tr.rbxcdn.com/180DAY-03cf3a4c472ab4edad95ff2fe74b9355/768/432/Image/Webp/noFilter',
    type: 'sword',
    rarity: 'mythical',
    stock: 8,
  },
  {
    id: 'sword-jinwoo',
    name: 'Jinwoo Sword',
    description: 'سيف جيد للمبتدئين',
    price: 3000,
    image: 'https://tr.rbxcdn.com/180DAY-b917402b50c74ade0139c8d46b089242/768/432/Image/Webp/noFilter',
    type: 'sword',
    rarity: 'mythical',
    stock: 10,
  },
  {
    id: 'sword-saber',
    name: 'Saber Sword',
    description: 'سيف ليجندري - سهل الحصول عليه',
    price: 2000,
    image: 'https://tr.rbxcdn.com/180DAY-40db295d7964cf6fcaa92178db5241be/768/432/Image/Webp/noFilter',
    type: 'sword',
    rarity: 'legendary',
    stock: 15,
  },
];

// 📈 خدمات تلفيل الحسابات
export const levelingServices: Product[] = [
  {
    id: 'level-0-1000',
    name: 'تلفيل من 0 إلى 1000',
    description: 'نوصل حسابك من لفل 0 إلى لفل 1000',
    price: 3000,
    image: 'https://tr.rbxcdn.com/180DAY-03cf3a4c472ab4edad95ff2fe74b9355/768/432/Image/Webp/noFilter',
    type: 'leveling',
    rarity: 'epic',
    stock: 10,
  },
  {
    id: 'level-1000-2000',
    name: 'تلفيل من 1000 إلى 2000',
    description: 'نوصل حسابك من لفل 1000 إلى لفل 2000',
    price: 4000,
    image: 'https://tr.rbxcdn.com/180DAY-b917402b50c74ade0139c8d46b089242/768/432/Image/Webp/noFilter',
    type: 'leveling',
    rarity: 'epic',
    stock: 10,
  },
  {
    id: 'level-2000-2400',
    name: 'تلفيل من 2000 إلى 2400 (Max)',
    description: 'نوصل حسابك لفل ماكس 2400',
    price: 5000,
    image: 'https://tr.rbxcdn.com/180DAY-40db295d7964cf6fcaa92178db5241be/768/432/Image/Webp/noFilter',
    type: 'leveling',
    rarity: 'legendary',
    stock: 8,
    popular: true,
  },
  {
    id: 'level-0-2400',
    name: 'تلفيل كامل 0 إلى Max',
    description: 'نوصل حسابك من الصفر لفل ماكس 2400',
    price: 10000,
    image: 'https://static.beebom.com/wp-content/uploads/2026/03/Sailor-piece-devil-fruits.jpg',
    type: 'leveling',
    rarity: 'mythical',
    stock: 5,
    popular: true,
  },
];

// جميع المنتجات
export const allProducts: Product[] = [...fruits, ...swords, ...levelingServices];

// ألوان الـ Rarity
export const rarityColors: Record<string, string> = {
  common: 'text-gray-400 border-gray-600',
  uncommon: 'text-green-400 border-green-600',
  rare: 'text-blue-400 border-blue-600',
  epic: 'text-purple-400 border-purple-600',
  legendary: 'text-yellow-400 border-yellow-600',
  mythical: 'text-red-500 border-red-600',
};

// أسماء الـ Rarity بالعربي
export const rarityNames: Record<string, string> = {
  common: 'عادي',
  uncommon: 'غير شائع',
  rare: 'نادر',
  epic: 'ملحمي',
  legendary: 'أسطوري',
  mythical: 'أسطوري+',
};

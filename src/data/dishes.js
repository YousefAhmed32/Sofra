// ─── Dishes ──────────────────────────────────────────────────────────────────
export const dishes = {
  en: [
    { id: 1,  name: 'Mezze Platter',    cat: 'Starters',  catAr: 'مقبلات',          desc: 'A vibrant spread of hummus, tabbouleh, and warm pita',                 price: '$12', img: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=500&q=80', tag: 'Popular'    },
    { id: 2,  name: 'Grilled Sea Bass', cat: 'Main',      catAr: 'أطباق رئيسية',    desc: 'Mediterranean herbs, lemon butter, seasonal vegetables',               price: '$28', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80', tag: "Chef's Pick" },
    { id: 3,  name: 'Lamb Kofta',       cat: 'Main',      catAr: 'أطباق رئيسية',    desc: 'Spiced ground lamb, pomegranate glaze, saffron rice',                 price: '$24', img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80', tag: ''            },
    { id: 4,  name: 'Knafeh Royale',    cat: 'Desserts',  catAr: 'حلويات',           desc: 'Crispy semolina, cheese, rose water syrup, pistachios',               price: '$9',  img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&q=80', tag: 'Must Try'   },
    { id: 5,  name: 'Saffron Latte',    cat: 'Drinks',    catAr: 'مشروبات',          desc: 'Warm milk, premium saffron threads, cardamom honey',                  price: '$7',  img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80', tag: ''            },
    { id: 6,  name: 'Falafel Wraps',    cat: 'Starters',  catAr: 'مقبلات',           desc: 'Crispy golden falafel, tahini, pickled turnips',                      price: '$11', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&q=80', tag: 'Vegan'       },
    { id: 7,  name: 'Om Ali',           cat: 'Desserts',  catAr: 'حلويات',           desc: 'Flaky pastry, cream, nuts, raisins, warm milk',                       price: '$8',  img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80', tag: ''            },
    { id: 8,  name: 'Mint Lemonade',    cat: 'Drinks',    catAr: 'مشروبات',          desc: 'Fresh mint, hand-squeezed lemons, crushed ice',                       price: '$5',  img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&q=80', tag: 'Refreshing' },
    { id: 9,  name: 'Shawarma Plate',   cat: 'Main',      catAr: 'أطباق رئيسية',    desc: 'Marinated chicken or beef, garlic sauce, pickles, fresh bread',       price: '$18', img: '/images/ShawarmaPlate.png', tag: 'Popular'    },
    { id: 10, name: 'Baklava Set',      cat: 'Desserts',  catAr: 'حلويات',           desc: 'Layers of crispy filo, honey, walnuts, and pistachios',               price: '$10', img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500&q=80', tag: ''            },
    { id: 11, name: 'Fattoush Salad',   cat: 'Starters',  catAr: 'مقبلات',           desc: 'Crispy pita chips, fresh vegetables, sumac dressing',                 price: '$9',  img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80', tag: 'Vegan'       },
    { id: 12, name: 'Turkish Coffee',   cat: 'Drinks',    catAr: 'مشروبات',          desc: 'Finely ground arabica, cardamom, served with lokum',                  price: '$5',  img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80', tag: ''            },
  ],
  ar: [
    { id: 1,  name: 'طبق المزة',         cat: 'مقبلات',         catEn: 'Starters', desc: 'حمص وتبولة وخبز بيتا دافئ بألوان زاهية',                       price: '٤٥ ج', img: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=500&q=80', tag: 'الأكثر طلبًا'  },
    { id: 2,  name: 'قاروص مشوي',        cat: 'أطباق رئيسية',   catEn: 'Main',     desc: 'أعشاب متوسطية وزبدة الليمون والخضروات الموسمية',                price: '١٠٥ ج',img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80', tag: 'اختيار الشيف'  },
    { id: 3,  name: 'كفتة الضأن',        cat: 'أطباق رئيسية',   catEn: 'Main',     desc: 'لحم ضأن متبّل بصلصة الرمان وأرز الزعفران',                     price: '٩٠ ج', img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80', tag: ''               },
    { id: 4,  name: 'كنافة ملكية',       cat: 'حلويات',         catEn: 'Desserts', desc: 'سميد مقرمش وجبنة وشربات ماء الورد والفستق',                    price: '٣٥ ج', img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&q=80', tag: 'لا يُفوَّت'    },
    { id: 5,  name: 'لاتيه الزعفران',    cat: 'مشروبات',        catEn: 'Drinks',   desc: 'حليب دافئ وخيوط زعفران فاخرة وعسل الهيل',                     price: '٢٦ ج', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80', tag: ''               },
    { id: 6,  name: 'لفائف الفلافل',     cat: 'مقبلات',         catEn: 'Starters', desc: 'فلافل ذهبية مقرمشة وطحينة ومخللات',                            price: '٤٢ ج', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&q=80', tag: 'نباتي'           },
    { id: 7,  name: 'أم علي',            cat: 'حلويات',         catEn: 'Desserts', desc: 'عجين هش وكريمة ومكسرات وزبيب وحليب ساخن',                     price: '٣٠ ج', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80', tag: ''               },
    { id: 8,  name: 'ليمون بالنعناع',    cat: 'مشروبات',        catEn: 'Drinks',   desc: 'نعناع طازج وليمون معصور وثلج مجروش',                           price: '١٩ ج', img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&q=80', tag: 'منعش'            },
    { id: 9,  name: 'طبق شاورما',        cat: 'أطباق رئيسية',   catEn: 'Main',     desc: 'دجاج أو لحم متبّل، صلصة ثوم، مخللات، خبز طازج',               price: '٦٨ ج',  img: '/images/ShawarmaPlate.png', tag: 'الأكثر طلبًا'  },
    { id: 10, name: 'طبق بقلاوة',        cat: 'حلويات',         catEn: 'Desserts', desc: 'طبقات فيلو مقرمشة وعسل وجوز وفستق',                           price: '٣٨ ج', img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500&q=80', tag: ''               },
    { id: 11, name: 'سلطة فتوش',         cat: 'مقبلات',         catEn: 'Starters', desc: 'رقائق بيتا مقرمشة وخضروات طازجة وصلصة سماق',                  price: '٣٤ ج', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80', tag: 'نباتي'           },
    { id: 12, name: 'قهوة تركية',        cat: 'مشروبات',        catEn: 'Drinks',   desc: 'عربيكا مطحون ناعم وهيل مقدّم مع لوكوم',                       price: '١٩ ج', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80', tag: ''               },
  ],
}

// ─── Tag colour map ───────────────────────────────────────────────────────────
export const TAG_COLORS = {
  Popular:       'bg-red-500',
  "الأكثر طلبًا": 'bg-red-500',
  "Chef's Pick": 'bg-purple-600',
  'اختيار الشيف': 'bg-purple-600',
  Vegan:         'bg-green-500',
  'نباتي':       'bg-green-500',
  'Must Try':    'bg-[#c8965a]',
  'لا يُفوَّت': 'bg-[#c8965a]',
  Refreshing:    'bg-cyan-500',
  'منعش':        'bg-cyan-500',
}

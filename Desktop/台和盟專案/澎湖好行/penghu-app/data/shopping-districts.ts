export interface Store {
  id: string
  name: string
  rating: number
  promotion?: string
  hours: string
  phone: string
  category: string
}

export interface ShoppingDistrict {
  id: string
  name: string
  description: string
  route: string
  stores: Store[]
}

export const shoppingDistricts: ShoppingDistrict[] = [
  {
    id: "magong",
    name: "馬公商圈",
    description: "澎湖最熱鬧的商業區域",
    route: "湖西線",
    stores: [
      {
        id: "seafood-restaurant",
        name: "澎湖海鮮餐廳",
        rating: 4.5,
        promotion: "好行乘客9折優惠",
        hours: "11:00-21:00",
        phone: "06-9274400",
        category: "餐飲",
      },
      {
        id: "specialty-store",
        name: "澎湖特產店",
        rating: 4.3,
        promotion: "滿500送50",
        hours: "09:00-22:00",
        phone: "06-9275500",
        category: "購物",
      },
      {
        id: "coffee-shop",
        name: "海景咖啡廳",
        rating: 4.7,
        promotion: "第二杯半價",
        hours: "08:00-20:00",
        phone: "06-9276600",
        category: "餐飲",
      },
    ],
  },
  {
    id: "baisha",
    name: "白沙商圈",
    description: "北環線熱門商圈",
    route: "北環線",
    stores: [
      {
        id: "beach-cafe",
        name: "沙灘小食堂",
        rating: 4.4,
        promotion: "好行乘客85折",
        hours: "10:00-19:00",
        phone: "06-9931234",
        category: "餐飲",
      },
      {
        id: "souvenir-shop",
        name: "海洋紀念品店",
        rating: 4.2,
        promotion: "買三送一",
        hours: "09:00-21:00",
        phone: "06-9932345",
        category: "購物",
      },
      {
        id: "ice-cream",
        name: "仙人掌冰淇淋",
        rating: 4.8,
        promotion: "套餐優惠價",
        hours: "10:00-22:00",
        phone: "06-9933456",
        category: "餐飲",
      },
    ],
  },
  {
    id: "huxi",
    name: "湖西商圈",
    description: "湖西線在地商圈",
    route: "湖西線",
    stores: [
      {
        id: "local-restaurant",
        name: "在地風味餐廳",
        rating: 4.6,
        promotion: "平日午餐8折",
        hours: "11:00-20:00",
        phone: "06-9921111",
        category: "餐飲",
      },
      {
        id: "fruit-shop",
        name: "新鮮水果行",
        rating: 4.3,
        promotion: "當季水果特價",
        hours: "08:00-18:00",
        phone: "06-9922222",
        category: "購物",
      },
    ],
  },
  {
    id: "south",
    name: "南環商圈",
    description: "澎南線特色商圈",
    route: "澎南線",
    stores: [
      {
        id: "bbq-restaurant",
        name: "海鮮燒烤店",
        rating: 4.5,
        promotion: "好行乘客送飲料",
        hours: "17:00-23:00",
        phone: "06-9971234",
        category: "餐飲",
      },
      {
        id: "craft-shop",
        name: "手工藝品店",
        rating: 4.4,
        promotion: "滿千折百",
        hours: "10:00-19:00",
        phone: "06-9972345",
        category: "購物",
      },
      {
        id: "tea-house",
        name: "海景茶館",
        rating: 4.6,
        promotion: "下午茶套餐優惠",
        hours: "13:00-21:00",
        phone: "06-9973456",
        category: "餐飲",
      },
    ],
  },
]

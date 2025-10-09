export interface Facility {
  id: string
  name: string
  type: string
  address: string
  phone?: string
  hours?: string
  distance?: string
}

export interface FacilityCategory {
  id: string
  name: string
  icon: string
  route: string
  facilities: Facility[]
}

export const nearbyFacilities: FacilityCategory[] = [
  {
    id: "convenience",
    name: "便利商店",
    icon: "Store",
    route: "湖西線",
    facilities: [
      {
        id: "711-magong",
        name: "7-ELEVEN 馬公門市",
        type: "便利商店",
        address: "澎湖縣馬公市中正路123號",
        phone: "06-9271234",
        hours: "24小時",
        distance: "200m",
      },
      {
        id: "family-huxi",
        name: "全家便利商店 湖西店",
        type: "便利商店",
        address: "澎湖縣湖西鄉湖西村45號",
        phone: "06-9921111",
        hours: "24小時",
        distance: "150m",
      },
    ],
  },
  {
    id: "gas-station",
    name: "加油站",
    icon: "Fuel",
    route: "湖西線",
    facilities: [
      {
        id: "cpc-magong",
        name: "台灣中油 馬公站",
        type: "加油站",
        address: "澎湖縣馬公市民族路88號",
        phone: "06-9272345",
        hours: "06:00-22:00",
        distance: "500m",
      },
    ],
  },
  {
    id: "parking",
    name: "停車場",
    icon: "ParkingCircle",
    route: "湖西線",
    facilities: [
      {
        id: "parking-magong",
        name: "馬公市公有停車場",
        type: "停車場",
        address: "澎湖縣馬公市光明路50號",
        hours: "24小時",
        distance: "300m",
      },
      {
        id: "parking-huxi",
        name: "湖西遊客中心停車場",
        type: "停車場",
        address: "澎湖縣湖西鄉湖西村100號",
        hours: "08:00-18:00",
        distance: "100m",
      },
    ],
  },
  {
    id: "restroom",
    name: "公共廁所",
    icon: "Bath",
    route: "湖西線",
    facilities: [
      {
        id: "restroom-1",
        name: "馬公觀光公廁",
        type: "公共廁所",
        address: "澎湖縣馬公市中山路旁",
        hours: "24小時",
        distance: "250m",
      },
    ],
  },
  {
    id: "atm",
    name: "ATM提款機",
    icon: "Banknote",
    route: "湖西線",
    facilities: [
      {
        id: "atm-711",
        name: "7-ELEVEN ATM",
        type: "ATM",
        address: "澎湖縣馬公市中正路123號",
        hours: "24小時",
        distance: "200m",
      },
      {
        id: "atm-bank",
        name: "郵局ATM",
        type: "ATM",
        address: "澎湖縣馬公市中華路67號",
        hours: "24小時",
        distance: "400m",
      },
    ],
  },
  {
    id: "convenience-north",
    name: "便利商店",
    icon: "Store",
    route: "北環線",
    facilities: [
      {
        id: "711-baisha",
        name: "7-ELEVEN 白沙門市",
        type: "便利商店",
        address: "澎湖縣白沙鄉赤崁村30號",
        phone: "06-9931234",
        hours: "24小時",
        distance: "180m",
      },
    ],
  },
  {
    id: "gas-station-north",
    name: "加油站",
    icon: "Fuel",
    route: "北環線",
    facilities: [
      {
        id: "cpc-baisha",
        name: "台灣中油 白沙站",
        type: "加油站",
        address: "澎湖縣白沙鄉中正路55號",
        phone: "06-9932345",
        hours: "06:00-22:00",
        distance: "600m",
      },
    ],
  },
  {
    id: "convenience-south",
    name: "便利商店",
    icon: "Store",
    route: "澎南線",
    facilities: [
      {
        id: "family-south",
        name: "全家便利商店 南環店",
        type: "便利商店",
        address: "澎湖縣馬公市風櫃里88號",
        phone: "06-9971111",
        hours: "24小時",
        distance: "220m",
      },
    ],
  },
  {
    id: "gas-station-south",
    name: "加油站",
    icon: "Fuel",
    route: "澎南線",
    facilities: [
      {
        id: "cpc-south",
        name: "台灣中油 南環站",
        type: "加油站",
        address: "澎湖縣馬公市鎖港里77號",
        phone: "06-9972345",
        hours: "06:00-22:00",
        distance: "800m",
      },
    ],
  },
  {
    id: "accommodation-huxi",
    name: "旅宿",
    icon: "Hotel",
    route: "湖西線",
    facilities: [
      {
        id: "hotel-huxi-1",
        name: "湖西海景民宿",
        type: "民宿",
        address: "澎湖縣湖西鄉湖西村海濱路88號",
        phone: "06-9921888",
        hours: "24小時",
        distance: "350m",
      },
      {
        id: "hotel-huxi-2",
        name: "澎湖灣度假飯店",
        type: "飯店",
        address: "澎湖縣湖西鄉林投村林投路123號",
        phone: "06-9922999",
        hours: "24小時",
        distance: "1.2km",
      },
    ],
  },
  {
    id: "accommodation-north",
    name: "旅宿",
    icon: "Hotel",
    route: "北環線",
    facilities: [
      {
        id: "hotel-north-1",
        name: "白沙海景民宿",
        type: "民宿",
        address: "澎湖縣白沙鄉赤崁村海景路66號",
        phone: "06-9931777",
        hours: "24小時",
        distance: "400m",
      },
    ],
  },
  {
    id: "accommodation-south",
    name: "旅宿",
    icon: "Hotel",
    route: "澎南線",
    facilities: [
      {
        id: "hotel-south-1",
        name: "風櫃海景民宿",
        type: "民宿",
        address: "澎湖縣馬公市風櫃里海岸路55號",
        phone: "06-9971666",
        hours: "24小時",
        distance: "500m",
      },
    ],
  },
  {
    id: "service-center-huxi",
    name: "旅客服務中心",
    icon: "Info",
    route: "湖西線",
    facilities: [
      {
        id: "service-huxi",
        name: "湖西遊客服務中心",
        type: "旅客服務中心",
        address: "澎湖縣湖西鄉湖西村100號",
        phone: "06-9921500",
        hours: "08:00-17:30",
        distance: "100m",
      },
    ],
  },
  {
    id: "service-center-north",
    name: "旅客服務中心",
    icon: "Info",
    route: "北環線",
    facilities: [
      {
        id: "service-north",
        name: "白沙遊客服務中心",
        type: "旅客服務中心",
        address: "澎湖縣白沙鄉赤崁村20號",
        phone: "06-9931500",
        hours: "08:00-17:30",
        distance: "150m",
      },
    ],
  },
  {
    id: "service-center-south",
    name: "旅客服務中心",
    icon: "Info",
    route: "澎南線",
    facilities: [
      {
        id: "service-south",
        name: "澎南遊客服務中心",
        type: "旅客服務中心",
        address: "澎湖縣馬公市風櫃里30號",
        phone: "06-9971500",
        hours: "08:00-17:30",
        distance: "200m",
      },
    ],
  },
  {
    id: "charging-huxi",
    name: "充電站",
    icon: "BatteryCharging",
    route: "湖西線",
    facilities: [
      {
        id: "charging-huxi-1",
        name: "湖西電動車充電站",
        type: "充電站",
        address: "澎湖縣湖西鄉湖西村停車場內",
        hours: "24小時",
        distance: "120m",
      },
      {
        id: "charging-huxi-2",
        name: "林投充電站",
        type: "充電站",
        address: "澎湖縣湖西鄉林投村遊客中心旁",
        hours: "24小時",
        distance: "800m",
      },
    ],
  },
  {
    id: "charging-north",
    name: "充電站",
    icon: "BatteryCharging",
    route: "北環線",
    facilities: [
      {
        id: "charging-north-1",
        name: "白沙充電站",
        type: "充電站",
        address: "澎湖縣白沙鄉赤崁村停車場內",
        hours: "24小時",
        distance: "180m",
      },
    ],
  },
  {
    id: "charging-south",
    name: "充電站",
    icon: "BatteryCharging",
    route: "澎南線",
    facilities: [
      {
        id: "charging-south-1",
        name: "風櫃充電站",
        type: "充電站",
        address: "澎湖縣馬公市風櫃里遊客中心旁",
        hours: "24小時",
        distance: "250m",
      },
    ],
  },
  {
    id: "car-rental-huxi",
    name: "租車據點",
    icon: "Car",
    route: "湖西線",
    facilities: [
      {
        id: "rental-huxi-1",
        name: "湖西租車行",
        type: "租車據點",
        address: "澎湖縣湖西鄉湖西村中正路77號",
        phone: "06-9921688",
        hours: "08:00-18:00",
        distance: "200m",
      },
      {
        id: "rental-huxi-2",
        name: "澎湖機車出租",
        type: "租車據點",
        address: "澎湖縣湖西鄉林投村88號",
        phone: "06-9922688",
        hours: "08:00-20:00",
        distance: "600m",
      },
    ],
  },
  {
    id: "car-rental-north",
    name: "租車據點",
    icon: "Car",
    route: "北環線",
    facilities: [
      {
        id: "rental-north-1",
        name: "白沙租車中心",
        type: "租車據點",
        address: "澎湖縣白沙鄉赤崁村55號",
        phone: "06-9931688",
        hours: "08:00-18:00",
        distance: "300m",
      },
    ],
  },
  {
    id: "car-rental-south",
    name: "租車據點",
    icon: "Car",
    route: "澎南線",
    facilities: [
      {
        id: "rental-south-1",
        name: "南環租車站",
        type: "租車據點",
        address: "澎湖縣馬公市風櫃里66號",
        phone: "06-9971688",
        hours: "08:00-18:00",
        distance: "350m",
      },
    ],
  },
  {
    id: "wifi-huxi",
    name: "WiFi熱點",
    icon: "Wifi",
    route: "湖西線",
    facilities: [
      {
        id: "wifi-huxi-1",
        name: "湖西遊客中心WiFi",
        type: "免費WiFi",
        address: "澎湖縣湖西鄉湖西村100號",
        hours: "08:00-17:30",
        distance: "100m",
      },
      {
        id: "wifi-huxi-2",
        name: "林投公園WiFi",
        type: "免費WiFi",
        address: "澎湖縣湖西鄉林投村林投公園",
        hours: "24小時",
        distance: "700m",
      },
    ],
  },
  {
    id: "wifi-north",
    name: "WiFi熱點",
    icon: "Wifi",
    route: "北環線",
    facilities: [
      {
        id: "wifi-north-1",
        name: "白沙遊客中心WiFi",
        type: "免費WiFi",
        address: "澎湖縣白沙鄉赤崁村20號",
        hours: "08:00-17:30",
        distance: "150m",
      },
      {
        id: "wifi-north-2",
        name: "跨海大橋WiFi",
        type: "免費WiFi",
        address: "澎湖縣白沙鄉跨海大橋遊客中心",
        hours: "24小時",
        distance: "2km",
      },
    ],
  },
  {
    id: "wifi-south",
    name: "WiFi熱點",
    icon: "Wifi",
    route: "澎南線",
    facilities: [
      {
        id: "wifi-south-1",
        name: "風櫃遊客中心WiFi",
        type: "免費WiFi",
        address: "澎湖縣馬公市風櫃里30號",
        hours: "08:00-17:30",
        distance: "200m",
      },
    ],
  },
]

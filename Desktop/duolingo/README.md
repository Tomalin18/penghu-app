# Duolingo 日語學習 App

基於 React Native + Expo 的日語學習應用程式專案骨架。

## 🚀 技術棧

- **框架**: Expo SDK 54.0.0
- **語言**: TypeScript
- **樣式**: Tailwind CSS + NativeWind
- **導航**: React Navigation v6
- **圖標**: Expo Vector Icons

## 📁 專案結構

```
src/
├── components/          # 可重用元件
│   ├── Layout.tsx      # 主要佈局元件
│   └── NavBar.tsx      # 底部導航列
├── navigation/         # 導航配置
│   └── AppNavigator.tsx # 主導航器
├── screens/           # 頁面元件
│   ├── CoursesScreen.tsx      # 課程主頁
│   ├── CourseMapScreen.tsx    # 課程地圖
│   ├── KanaLearningScreen.tsx # 假名學習
│   ├── TasksScreen.tsx        # 任務主頁
│   ├── DailyTasksScreen.tsx   # 每日任務
│   ├── SpecialTasksScreen.tsx # 特別任務
│   ├── LeaderboardScreen.tsx  # 排行榜主頁
│   ├── LeagueRankingScreen.tsx # 聯賽排行榜
│   ├── PromotionInfoScreen.tsx # 升降級提示
│   ├── FriendsScreen.tsx      # 好友主頁
│   ├── RecommendFriendsScreen.tsx # 推薦好友
│   ├── SearchFriendsScreen.tsx    # 搜尋好友
│   ├── ContactAuthScreen.tsx      # 通訊錄授權
│   ├── QRShareScreen.tsx         # QR 分享
│   ├── SettingsScreen.tsx        # 設定主頁
│   ├── AccountSettingsScreen.tsx # 帳戶設定
│   ├── SubscriptionManagementScreen.tsx # 訂閱管理
│   ├── CustomerSupportScreen.tsx # 客服支援
│   └── OtherOptionsScreen.tsx    # 其他選項
└── types/              # TypeScript 類型定義
    └── navigation.ts   # 導航類型
```

## 🎨 設計系統

### 顏色 Tokens
- `primary-blue`: #1CB0F6
- `success-green`: #22C55E
- `danger-red`: #EF4444
- `warning-yellow`: #FACC15
- `gray-dark`: #1A202C
- `gray-light`: #A0AEC0
- `nav-active`: #1DA1F2 (導航高亮色)

### 字體大小
- `title`: 18px
- `body`: 14px
- `caption`: 12px

### 間距
- `card-padding`: 16px
- `section-gap`: 24px

### 圓角
- `card`: 12px
- `button`: 12px
- `avatar`: 50%

### 陰影
- `default`: 0px 4px 12px rgba(0,0,0,0.3)

## 🧭 導航結構

### 底部導航 (5 個主要標籤)
1. **課程** - 課程地圖、假名學習
2. **任務** - 每日任務、特別任務
3. **排行榜** - 聯賽排行榜、升降級提示
4. **好友** - 推薦好友、搜尋好友、通訊錄授權、QR 分享
5. **更多** - 帳戶設定、訂閱管理、客服支援、其他選項

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
# Web 版本
npm run web

# iOS 版本
npm run ios

# Android 版本
npm run android
```

## 📝 開發說明

1. **設計 Tokens**: 所有設計 tokens 已映射到 Tailwind CSS 配置中
2. **類型安全**: 使用 TypeScript 確保導航和元件的類型安全
3. **響應式設計**: 使用 Tailwind CSS 實現響應式佈局
4. **模組化結構**: 元件和頁面分離，便於維護和擴展

## 🔧 配置檔案

- `tailwind.config.js` - Tailwind CSS 配置
- `metro.config.js` - Metro 打包器配置
- `babel.config.js` - Babel 轉譯配置
- `global.css` - 全域樣式和 CSS 變數

## 📱 功能特色

- ✅ 完整的導航結構
- ✅ 設計系統整合
- ✅ TypeScript 支援
- ✅ 響應式佈局
- ✅ 模組化架構
- ✅ 可擴展的元件系統

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 設計 tokens 映射
        'primary-blue': '#1CB0F6',
        'success-green': '#22C55E',
        'danger-red': '#EF4444',
        'warning-yellow': '#FACC15',
        'gray-dark': '#1A202C',
        'gray-light': '#A0AEC0',
        // 導航高亮色
        'nav-active': '#1DA1F2',
      },
      fontSize: {
        'title': '18px',
        'body': '14px',
        'caption': '12px',
      },
      spacing: {
        'card-padding': '16px',
        'section-gap': '24px',
      },
      borderRadius: {
        'card': '12px',
        'button': '12px',
        'avatar': '50%',
      },
      boxShadow: {
        'default': '0px 4px 12px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
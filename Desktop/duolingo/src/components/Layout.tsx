import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
  showNavBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavBar = true }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1">
        {/* 主要內容區域 */}
        <View className="flex-1">
          {children}
        </View>
        
        {/* 底部導航列 */}
        {showNavBar && <NavBar />}
      </View>
    </SafeAreaView>
  );
};

export default Layout;

import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
  showNavBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavBar = true }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {/* 主要內容區域 */}
        <View style={styles.mainContent}>
          {children}
        </View>
        
        {/* 底部導航列 */}
        {showNavBar && <NavBar />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
});

export default Layout;

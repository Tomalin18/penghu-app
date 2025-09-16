import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../types/navigation';

type NavBarProps = {
  // 可以添加其他 props
};

type NavigationProp = BottomTabNavigationProp<RootTabParamList>;

const NavBar: React.FC<NavBarProps> = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  // 導航項目配置
  const navItems = [
    {
      name: 'Courses' as keyof RootTabParamList,
      label: '課程',
      icon: 'book-outline' as keyof typeof Ionicons.glyphMap,
      activeIcon: 'book' as keyof typeof Ionicons.glyphMap,
    },
    {
      name: 'Tasks' as keyof RootTabParamList,
      label: '任務',
      icon: 'checkmark-circle-outline' as keyof typeof Ionicons.glyphMap,
      activeIcon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap,
    },
    {
      name: 'Leaderboard' as keyof RootTabParamList,
      label: '排行榜',
      icon: 'trophy-outline' as keyof typeof Ionicons.glyphMap,
      activeIcon: 'trophy' as keyof typeof Ionicons.glyphMap,
    },
    {
      name: 'Friends' as keyof RootTabParamList,
      label: '好友',
      icon: 'people-outline' as keyof typeof Ionicons.glyphMap,
      activeIcon: 'people' as keyof typeof Ionicons.glyphMap,
    },
    {
      name: 'Settings' as keyof RootTabParamList,
      label: '更多',
      icon: 'ellipsis-horizontal-outline' as keyof typeof Ionicons.glyphMap,
      activeIcon: 'ellipsis-horizontal' as keyof typeof Ionicons.glyphMap,
    },
  ];

  const isActive = (routeName: string) => {
    return route.name === routeName;
  };

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const active = isActive(item.name);
        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.name)}
          >
            <Ionicons
              name={active ? item.activeIcon : item.icon}
              size={24}
              color={active ? '#1DA1F2' : '#A0AEC0'}
            />
            <Text
              style={[
                styles.label,
                { color: active ? '#1DA1F2' : '#A0AEC0' }
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default NavBar;

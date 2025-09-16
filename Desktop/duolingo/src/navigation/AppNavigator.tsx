import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// 類型定義
import {
  RootTabParamList,
  CoursesStackParamList,
  TasksStackParamList,
  LeaderboardStackParamList,
  FriendsStackParamList,
  SettingsStackParamList,
} from '../types/navigation';

// 頁面元件
import CoursesScreen from '../screens/CoursesScreen';
import CourseMapScreen from '../screens/CourseMapScreen';
import KanaLearningScreen from '../screens/KanaLearningScreen';

import TasksScreen from '../screens/TasksScreen';
import DailyTasksScreen from '../screens/DailyTasksScreen';
import SpecialTasksScreen from '../screens/SpecialTasksScreen';

import LeaderboardScreen from '../screens/LeaderboardScreen';
import LeagueRankingScreen from '../screens/LeagueRankingScreen';
import PromotionInfoScreen from '../screens/PromotionInfoScreen';

import FriendsScreen from '../screens/FriendsScreen';
import RecommendFriendsScreen from '../screens/RecommendFriendsScreen';
import SearchFriendsScreen from '../screens/SearchFriendsScreen';
import ContactAuthScreen from '../screens/ContactAuthScreen';
import QRShareScreen from '../screens/QRShareScreen';

import SettingsScreen from '../screens/SettingsScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import SubscriptionManagementScreen from '../screens/SubscriptionManagementScreen';
import CustomerSupportScreen from '../screens/CustomerSupportScreen';
import OtherOptionsScreen from '../screens/OtherOptionsScreen';

// 建立導航器
const Tab = createBottomTabNavigator<RootTabParamList>();
const CoursesStack = createStackNavigator<CoursesStackParamList>();
const TasksStack = createStackNavigator<TasksStackParamList>();
const LeaderboardStack = createStackNavigator<LeaderboardStackParamList>();
const FriendsStack = createStackNavigator<FriendsStackParamList>();
const SettingsStack = createStackNavigator<SettingsStackParamList>();

// 課程堆疊導航器
const CoursesStackNavigator = () => (
  <CoursesStack.Navigator>
    <CoursesStack.Screen 
      name="CourseMap" 
      component={CoursesScreen}
      options={{ title: '課程' }}
    />
    <CoursesStack.Screen 
      name="KanaLearning" 
      component={KanaLearningScreen}
      options={{ title: '假名學習' }}
    />
  </CoursesStack.Navigator>
);

// 任務堆疊導航器
const TasksStackNavigator = () => (
  <TasksStack.Navigator>
    <TasksStack.Screen 
      name="DailyTasks" 
      component={TasksScreen}
      options={{ title: '任務' }}
    />
    <TasksStack.Screen 
      name="SpecialTasks" 
      component={SpecialTasksScreen}
      options={{ title: '特別任務' }}
    />
  </TasksStack.Navigator>
);

// 排行榜堆疊導航器
const LeaderboardStackNavigator = () => (
  <LeaderboardStack.Navigator>
    <LeaderboardStack.Screen 
      name="LeagueRanking" 
      component={LeaderboardScreen}
      options={{ title: '排行榜' }}
    />
    <LeaderboardStack.Screen 
      name="PromotionInfo" 
      component={PromotionInfoScreen}
      options={{ title: '升降級提示' }}
    />
  </LeaderboardStack.Navigator>
);

// 好友堆疊導航器
const FriendsStackNavigator = () => (
  <FriendsStack.Navigator>
    <FriendsStack.Screen 
      name="RecommendFriends" 
      component={FriendsScreen}
      options={{ title: '好友' }}
    />
    <FriendsStack.Screen 
      name="SearchFriends" 
      component={SearchFriendsScreen}
      options={{ title: '搜尋好友' }}
    />
    <FriendsStack.Screen 
      name="ContactAuth" 
      component={ContactAuthScreen}
      options={{ title: '通訊錄授權' }}
    />
    <FriendsStack.Screen 
      name="QRShare" 
      component={QRShareScreen}
      options={{ title: 'QR 分享' }}
    />
  </FriendsStack.Navigator>
);

// 設定堆疊導航器
const SettingsStackNavigator = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen 
      name="AccountSettings" 
      component={SettingsScreen}
      options={{ title: '設定' }}
    />
    <SettingsStack.Screen 
      name="SubscriptionManagement" 
      component={SubscriptionManagementScreen}
      options={{ title: '訂閱管理' }}
    />
    <SettingsStack.Screen 
      name="CustomerSupport" 
      component={CustomerSupportScreen}
      options={{ title: '客服支援' }}
    />
    <SettingsStack.Screen 
      name="OtherOptions" 
      component={OtherOptionsScreen}
      options={{ title: '其他選項' }}
    />
  </SettingsStack.Navigator>
);

// 主要底部標籤導航器
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopColor: '#E2E8F0',
        borderTopWidth: 1,
        paddingBottom: 4,
        paddingTop: 4,
        height: 60,
      },
    }}
  >
    <Tab.Screen 
      name="Courses" 
      component={CoursesStackNavigator}
      options={{ title: '課程' }}
    />
    <Tab.Screen 
      name="Tasks" 
      component={TasksStackNavigator}
      options={{ title: '任務' }}
    />
    <Tab.Screen 
      name="Leaderboard" 
      component={LeaderboardStackNavigator}
      options={{ title: '排行榜' }}
    />
    <Tab.Screen 
      name="Friends" 
      component={FriendsStackNavigator}
      options={{ title: '好友' }}
    />
    <Tab.Screen 
      name="Settings" 
      component={SettingsStackNavigator}
      options={{ title: '更多' }}
    />
  </Tab.Navigator>
);

// 主應用導航器
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

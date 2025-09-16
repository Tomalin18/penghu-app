import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from '../types/navigation';

type NavigationProp = StackNavigationProp<SettingsStackParamList>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-dark mb-6">設定</Text>
        
        {/* 帳戶設定 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('AccountSettings')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">帳戶設定</Text>
          <Text className="text-body text-gray-light">管理您的帳戶資訊</Text>
        </TouchableOpacity>

        {/* 訂閱管理 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('SubscriptionManagement')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">訂閱管理</Text>
          <Text className="text-body text-gray-light">管理您的訂閱方案</Text>
        </TouchableOpacity>

        {/* 客服支援 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('CustomerSupport')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">客服支援</Text>
          <Text className="text-body text-gray-light">獲得幫助與支援</Text>
        </TouchableOpacity>

        {/* 其他選項 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('OtherOptions')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">其他選項</Text>
          <Text className="text-body text-gray-light">更多設定選項</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

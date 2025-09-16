import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FriendsStackParamList } from '../types/navigation';

type NavigationProp = StackNavigationProp<FriendsStackParamList>;

const FriendsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-dark mb-6">好友</Text>
        
        {/* 推薦好友 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('RecommendFriends')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">推薦好友</Text>
          <Text className="text-body text-gray-light">發現新的學習夥伴</Text>
        </TouchableOpacity>

        {/* 搜尋好友 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('SearchFriends')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">搜尋好友</Text>
          <Text className="text-body text-gray-light">尋找特定用戶</Text>
        </TouchableOpacity>

        {/* 通訊錄授權 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('ContactAuth')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">通訊錄授權</Text>
          <Text className="text-body text-gray-light">從通訊錄添加好友</Text>
        </TouchableOpacity>

        {/* QR 分享 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('QRShare')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">QR 分享</Text>
          <Text className="text-body text-gray-light">分享您的個人資料</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FriendsScreen;

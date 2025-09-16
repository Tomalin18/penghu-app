import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const RecommendFriendsScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-dark mb-6">推薦好友</Text>
        
        <View className="bg-white p-4 rounded-card shadow-default">
          <Text className="text-body text-gray-light">
            這裡將顯示推薦好友內容...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecommendFriendsScreen;

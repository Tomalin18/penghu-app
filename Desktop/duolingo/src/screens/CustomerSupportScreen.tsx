import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const CustomerSupportScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-dark mb-6">客服支援</Text>
        
        <View className="bg-white p-4 rounded-card shadow-default">
          <Text className="text-body text-gray-light">
            這裡將顯示客服支援內容...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CustomerSupportScreen;

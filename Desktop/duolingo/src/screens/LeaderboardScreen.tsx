import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LeaderboardStackParamList } from '../types/navigation';

type NavigationProp = StackNavigationProp<LeaderboardStackParamList>;

const LeaderboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-dark mb-6">排行榜</Text>
        
        {/* 聯賽排行榜 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('LeagueRanking')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">聯賽排行榜</Text>
          <Text className="text-body text-gray-light">查看您的排名</Text>
        </TouchableOpacity>

        {/* 升降級提示 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('PromotionInfo')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">升降級提示</Text>
          <Text className="text-body text-gray-light">了解聯賽規則</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LeaderboardScreen;

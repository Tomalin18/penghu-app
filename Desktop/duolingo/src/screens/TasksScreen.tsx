import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TasksStackParamList } from '../types/navigation';

type NavigationProp = StackNavigationProp<TasksStackParamList>;

const TasksScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-dark mb-6">任務</Text>
        
        {/* 每日任務 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('DailyTasks')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">每日任務</Text>
          <Text className="text-body text-gray-light">完成每日學習目標</Text>
        </TouchableOpacity>

        {/* 特別任務 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('SpecialTasks')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">特別任務</Text>
          <Text className="text-body text-gray-light">挑戰特殊學習任務</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TasksScreen;

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CoursesStackParamList } from '../types/navigation';

type NavigationProp = StackNavigationProp<CoursesStackParamList>;

const CoursesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-dark mb-6">課程</Text>
        
        {/* 課程地圖 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('CourseMap')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">課程地圖</Text>
          <Text className="text-body text-gray-light">開始您的日語學習之旅</Text>
        </TouchableOpacity>

        {/* 假名學習 */}
        <TouchableOpacity
          className="bg-white p-4 rounded-card mb-4 shadow-default"
          onPress={() => navigation.navigate('KanaLearning')}
        >
          <Text className="text-lg font-semibold text-gray-dark mb-2">假名學習</Text>
          <Text className="text-body text-gray-light">學習平假名和片假名</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CoursesScreen;

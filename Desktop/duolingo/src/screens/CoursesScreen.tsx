import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CoursesStackParamList } from '../types/navigation';

type NavigationProp = StackNavigationProp<CoursesStackParamList>;

const CoursesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>課程</Text>
        
        {/* 課程地圖 */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CourseMap')}
        >
          <Text style={styles.cardTitle}>課程地圖</Text>
          <Text style={styles.cardDescription}>開始您的日語學習之旅</Text>
        </TouchableOpacity>

        {/* 假名學習 */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('KanaLearning')}
        >
          <Text style={styles.cardTitle}>假名學習</Text>
          <Text style={styles.cardDescription}>學習平假名和片假名</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#A0AEC0',
  },
});

export default CoursesScreen;

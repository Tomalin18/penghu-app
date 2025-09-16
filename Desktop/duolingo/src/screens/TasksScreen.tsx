import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TasksStackParamList } from '../types/navigation';
import TaskCard from '../components/TaskCard';

type NavigationProp = StackNavigationProp<TasksStackParamList>;

const TasksScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // 範例任務數據
  const dailyTasks = [
    {
      id: 1,
      title: '完成今日單字學習',
      timeLeft: '2小時30分',
      progress: 75,
      rewardType: 'gold' as const,
    },
    {
      id: 2,
      title: '練習假名發音',
      timeLeft: '1小時15分',
      progress: 45,
      rewardType: 'silver' as const,
    },
    {
      id: 3,
      title: '完成語法練習',
      timeLeft: '30分鐘',
      progress: 90,
      rewardType: 'wood' as const,
    },
  ];

  const handleTaskClick = (taskId: number, title: string) => {
    Alert.alert('任務點擊', `您點擊了任務：${title} (ID: ${taskId})`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>任務</Text>
        
        {/* 每日任務區塊 */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => navigation.navigate('DailyTasks')}
          >
            <Text style={styles.sectionTitle}>每日任務</Text>
            <Text style={styles.sectionSubtitle}>完成每日學習目標</Text>
          </TouchableOpacity>
          
          {/* 任務卡片列表 */}
          {dailyTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              timeLeft={task.timeLeft}
              progress={task.progress}
              rewardType={task.rewardType}
              onClick={() => handleTaskClick(task.id, task.title)}
            />
          ))}
        </View>

        {/* 特別任務區塊 */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => navigation.navigate('SpecialTasks')}
          >
            <Text style={styles.sectionTitle}>特別任務</Text>
            <Text style={styles.sectionSubtitle}>挑戰特殊學習任務</Text>
          </TouchableOpacity>
        </View>
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#A0AEC0',
  },
});

export default TasksScreen;

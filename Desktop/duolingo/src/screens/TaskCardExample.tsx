import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import TaskCard from '../components/TaskCard';

const TaskCardExample: React.FC = () => {
  // 範例任務數據
  const tasks = [
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
    {
      id: 4,
      title: '觀看日語影片',
      timeLeft: '5小時',
      progress: 20,
      rewardType: 'gold' as const,
    },
  ];

  const handleTaskClick = (taskId: number, title: string) => {
    Alert.alert('任務點擊', `您點擊了任務：${title} (ID: ${taskId})`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {tasks.map((task) => (
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
});

export default TaskCardExample;

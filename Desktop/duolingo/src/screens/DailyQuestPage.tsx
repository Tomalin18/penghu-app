import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import TaskCard from '../components/TaskCard';
import NavBar from '../components/NavBar';

interface DailyQuestPageProps {
  timeRemaining?: string;
}

const DailyQuestPage: React.FC<DailyQuestPageProps> = ({ 
  timeRemaining = "12h 30m" 
}) => {
  // 假資料：今日任務清單
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
    {
      id: 4,
      title: '觀看日語影片',
      timeLeft: '5小時',
      progress: 20,
      rewardType: 'gold' as const,
    },
    {
      id: 5,
      title: '完成聽力測驗',
      timeLeft: '1小時45分',
      progress: 60,
      rewardType: 'silver' as const,
    },
  ];

  // 處理任務卡片點擊
  const handleTaskClick = (taskId: number, title: string) => {
    console.log(`Task clicked: ${title} (ID: ${taskId})`);
    Alert.alert('任務點擊', `您點擊了任務：${title} (ID: ${taskId})`);
  };

  // 處理找好友按鈕點擊
  const handleFindFriendClick = () => {
    console.log("navigate to friends page");
    Alert.alert('導航', '導航到好友頁面');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 頂部：標題 + 倒數時間 */}
        <View style={styles.header}>
          <Text style={styles.title}>每日任務</Text>
          <Text style={styles.timeRemaining}>剩餘時間：{timeRemaining}</Text>
        </View>

        {/* 中間：任務清單 */}
        <View style={styles.tasksSection}>
          <Text style={styles.sectionTitle}>今日任務</Text>
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

        {/* 下方：特殊行動按鈕 */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.specialButton}
            onPress={handleFindFriendClick}
          >
            <Text style={styles.specialButtonText}>找一個好友</Text>
          </TouchableOpacity>
        </View>

        {/* 底部間距，避免被導航列遮擋 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* 底部：固定導航列 */}
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E141B', // 深色背景
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 24, // 上下間距
    paddingHorizontal: 16, // 左右間距
    paddingBottom: 16,
  },
  title: {
    fontSize: 20, // 頂部標題字體大小
    fontWeight: 'bold',
    color: 'white', // 白色標題
    marginBottom: 8,
  },
  timeRemaining: {
    fontSize: 14, // 倒數時間字體大小
    color: '#A0AEC0', // 灰色倒數時間
    fontWeight: '500',
  },
  tasksSection: {
    paddingHorizontal: 16, // 左右間距
    marginBottom: 24, // 上下間距
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  actionsSection: {
    paddingHorizontal: 16, // 左右間距
    marginBottom: 24, // 上下間距
  },
  specialButton: {
    backgroundColor: '#1A202C', // 特殊按鈕背景
    borderRadius: 12, // 圓角
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  specialButtonText: {
    fontSize: 14, // 字體大小
    color: 'white', // 白色字體
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 80, // 為底部導航列留出空間
  },
});

export default DailyQuestPage;

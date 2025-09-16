import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TaskCardProps {
  title: string;
  timeLeft: string;
  progress: number; // 0-100
  rewardType: 'gold' | 'silver' | 'wood';
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  timeLeft,
  progress,
  rewardType,
  onClick,
}) => {
  // 獎勵圖標顏色映射
  const getRewardColor = (type: 'gold' | 'silver' | 'wood') => {
    switch (type) {
      case 'gold':
        return '#FFD700'; // 金色
      case 'silver':
        return '#C0C0C0'; // 銀色
      case 'wood':
        return '#8B4513'; // 木色
      default:
        return '#FFD700';
    }
  };

  // 確保進度在 0-100 範圍內
  const normalizedProgress = Math.max(0, Math.min(100, progress));

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <View style={styles.content}>
        {/* 左側：任務標題 */}
        <View style={styles.leftSection}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* 右側：獎勵圖標 */}
        <View style={styles.rightSection}>
          <View
            style={[
              styles.rewardIcon,
              { backgroundColor: getRewardColor(rewardType) }
            ]}
          />
        </View>
      </View>

      {/* 中間：倒數時間 */}
      <View style={styles.timeSection}>
        <Text style={styles.timeLeft}>{timeLeft}</Text>
      </View>

      {/* 下方：任務進度條 */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${normalizedProgress}%` }
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A202C', // 卡片背景
    borderRadius: 12, // 圓角
    padding: 16, // Padding
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14, // 標題字體大小
    color: 'white', // 標題顏色
    fontWeight: '600',
    lineHeight: 20,
  },
  timeSection: {
    marginBottom: 12,
  },
  timeLeft: {
    fontSize: 12, // 倒數時間字體大小
    color: '#A0AEC0', // 倒數時間顏色
    fontWeight: '500',
  },
  progressSection: {
    marginTop: 4,
  },
  progressBar: {
    height: 6, // 進度條高度
    backgroundColor: '#2D3748', // 進度條底色
    borderRadius: 6, // 進度條圓角
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E', // 已完成部分綠色
    borderRadius: 6,
  },
  rewardIcon: {
    width: 24,
    height: 24,
    borderRadius: 12, // 圓形圖標
    // 之後可以替換為實際的插畫
  },
});

export default TaskCard;

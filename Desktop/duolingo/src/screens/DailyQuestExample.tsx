import React from 'react';
import { View, StyleSheet } from 'react-native';
import DailyQuestPage from './DailyQuestPage';

const DailyQuestExample: React.FC = () => {
  return (
    <View style={styles.container}>
      <DailyQuestPage timeRemaining="6h 15m" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DailyQuestExample;

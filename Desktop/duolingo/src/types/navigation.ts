// 導航類型定義
export type RootTabParamList = {
  Courses: undefined;
  Tasks: undefined;
  Leaderboard: undefined;
  Friends: undefined;
  Settings: undefined;
};

export type CoursesStackParamList = {
  CourseMap: undefined;
  KanaLearning: undefined;
};

export type TasksStackParamList = {
  DailyTasks: undefined;
  SpecialTasks: undefined;
};

export type LeaderboardStackParamList = {
  LeagueRanking: undefined;
  PromotionInfo: undefined;
};

export type FriendsStackParamList = {
  RecommendFriends: undefined;
  SearchFriends: undefined;
  ContactAuth: undefined;
  QRShare: undefined;
};

export type SettingsStackParamList = {
  AccountSettings: undefined;
  SubscriptionManagement: undefined;
  CustomerSupport: undefined;
  OtherOptions: undefined;
};

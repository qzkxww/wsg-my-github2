import { Checklist, Platform, Plan, Task, User, ProgressData } from "./types";

export const platforms: Platform[] = [
  'Instagram',
  'X',
  'TikTok',
  'LinkedIn',
  'YouTube',
  'Pinterest',
  'Facebook'
];

export const premadeTasks: Record<Platform, Task[]> = {
  'Instagram': [
    { id: '1', title: 'Post 1 Feed Image', platform: 'Instagram', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '2', title: 'Share 1 Story', platform: 'Instagram', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '3', title: 'Comment on 3 posts in your niche', platform: 'Instagram', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '4', title: 'Record 1 Reel', platform: 'Instagram', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false }
  ],
  'X': [
    { id: '5', title: 'Post 2 Tweets', platform: 'X', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '6', title: 'Retweet 1 relevant post', platform: 'X', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '7', title: 'Reply to 5 tweets in your niche', platform: 'X', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false }
  ],
  'TikTok': [
    { id: '8', title: 'Post 1 TikTok video', platform: 'TikTok', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '9', title: 'Comment on 3 trending videos', platform: 'TikTok', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '10', title: 'Duet or Stitch 1 relevant video', platform: 'TikTok', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false }
  ],
  'LinkedIn': [
    { id: '11', title: 'Share 1 professional insight', platform: 'LinkedIn', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '12', title: 'Comment on 2 industry posts', platform: 'LinkedIn', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '13', title: 'Connect with 3 new professionals', platform: 'LinkedIn', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false }
  ],
  'YouTube': [
    { id: '14', title: 'Post 1 YouTube Short', platform: 'YouTube', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '15', title: 'Comment on 3 videos in your niche', platform: 'YouTube', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '16', title: 'Plan next full-length video', platform: 'YouTube', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false }
  ],
  'Pinterest': [
    { id: '17', title: 'Create 3 new pins', platform: 'Pinterest', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '18', title: 'Create 1 new board', platform: 'Pinterest', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '19', title: 'Pin 5 related content items', platform: 'Pinterest', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false }
  ],
  'Facebook': [
    { id: '20', title: 'Post 1 update to your page', platform: 'Facebook', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '21', title: 'Comment on 3 groups in your niche', platform: 'Facebook', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false },
    { id: '22', title: 'Create 1 poll or question post', platform: 'Facebook', completed: false, createdAt: new Date().toISOString(), isPremade: true, isCustom: false }
  ]
};

export const defaultChecklists: Checklist[] = [
  {
    id: '1',
    title: 'Daily Instagram Tasks',
    platform: 'Instagram',
    tasks: premadeTasks['Instagram'],
    isDaily: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Daily X Tasks',
    platform: 'X',
    tasks: premadeTasks['X'],
    isDaily: true,
    createdAt: new Date().toISOString()
  }
];

export const mockProgressData: ProgressData[] = [
  { date: '2023-01-01', completedTasks: 3, totalTasks: 5 },
  { date: '2023-01-02', completedTasks: 4, totalTasks: 5 },
  { date: '2023-01-03', completedTasks: 5, totalTasks: 5 },
  { date: '2023-01-04', completedTasks: 2, totalTasks: 5 },
  { date: '2023-01-05', completedTasks: 3, totalTasks: 5 },
  { date: '2023-01-06', completedTasks: 4, totalTasks: 5 },
  { date: '2023-01-07', completedTasks: 5, totalTasks: 5 },
];

export const mockUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  isPro: false,
  streak: 7,
  habitScore: 85,
  platforms: ['Instagram', 'X'],
  joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  lastActive: new Date().toISOString()
};

export const plans: Plan[] = [
  {
    type: 'free',
    name: 'Free',
    description: 'Get started with the basics',
    price: {
      monthly: 0,
      annually: 0
    },
    features: [
      'Access to 2 platform checklists',
      'Max 3 custom tasks',
      'Basic habit tracking',
      'Light & dark mode'
    ]
  },
  {
    type: 'pro',
    name: 'Pro',
    description: 'Perfect for serious creators',
    price: {
      monthly: 8,
      annually: 79
    },
    features: [
      'Unlimited platforms and tasks',
      'Full habit tracking & analytics',
      'AI-powered content idea generator',
      'Upload analytics screenshots',
      'Smart post planner with templates',
      'AI-assisted caption & hashtag generator',
      'Weekly email progress reports',
      'Sync across devices + cloud backup',
      'Early access to all new features'
    ]
  }
];
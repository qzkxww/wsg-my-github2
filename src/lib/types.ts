export type Platform = 'Instagram' | 'X' | 'TikTok' | 'LinkedIn' | 'YouTube' | 'Pinterest' | 'Facebook';

export interface Task {
  id: string;
  title: string;
  description?: string;
  platform: Platform;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  isPremade: boolean;
  isCustom: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  description?: string;
  platform: Platform;
  tasks: Task[];
  isDaily: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isPro: boolean;
  streak: number;
  habitScore: number;
  platforms: Platform[];
  joinedAt: string;
  lastActive: string;
}

export type PlanType = 'free' | 'pro';

export interface Plan {
  type: PlanType;
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: string[];
}

export interface ProgressData {
  date: string;
  completedTasks: number;
  totalTasks: number;
}
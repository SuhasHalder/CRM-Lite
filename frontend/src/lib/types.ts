export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt?: string;
}

export interface Lead {
  _id: string;
  title: string;
  company: string;
  contactEmail?: string;
  value: number;
  status: string;
  stage: string;
  owner?: { name: string };
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  isDone: boolean;
}

export interface AnalyticsOverview {
  totalLeads: number;
  totalTasks: number;
  completedTasks: number;
  taskCompletionRate: number;
  totalUsers: number;
  wonDeals: number;
}

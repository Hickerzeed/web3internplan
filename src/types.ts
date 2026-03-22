export type TaskStatus = 'in-progress' | 'pending' | 'completed' | 'failed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  proof?: string;
  failReason?: string;
  studentId: string;
  studentName: string;
}

export interface GuildMember {
  id: string;
  name: string;
  role: 'master' | 'member';
  avatar: string;
  level: number;
  cubes: string;
  xp: string;
}

export interface Activity {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  type: 'task_completed' | 'checked_in';
  description: string;
  timestamp: string;
}

export interface JoinRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userLevel: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface GuildData {
  id: string;
  name: string;
  points: string;
  maxMembers: number;
  members: GuildMember[];
  tasks: Task[];
  activities: Activity[];
  joinRequests?: JoinRequest[];
}

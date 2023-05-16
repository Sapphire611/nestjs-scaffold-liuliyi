export interface TaskListRequest {
  alive: string;
}

export interface TaskDetailRequest {
  id: string;
}

export interface TaskCountResponse {
  count: number;
  alive: number;
}

export interface TaskCreateRequest {
  name: string;
  status: boolean;
}

export interface TaskRequest {
  id: string;
}

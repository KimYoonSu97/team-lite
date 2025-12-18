export interface ICreateTaskDto {
  projectId: string;
  title: string;
  description: string;
  deadLine: Date;
  priority: number;
  assigneeId: string;
}

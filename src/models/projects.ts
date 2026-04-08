import type { Task } from './task.js';

export interface Projects {
    id:string;
    name:string;
    description?: string;
    tasks: Task[]
    createdAt: Date;
}
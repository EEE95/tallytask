// types.ts
export interface Task {
    name: string;
    description?: string;
    completed: boolean;
    priority: "high" | "medium" | "low";
}

export interface HomeType {
    lists: string[];
    setLists: (lists: string[]) => void;
    tasks: { [key: string]: Task[] }; 
    setTasks: (tasks: { [key: string]: Task[] }) => void;
}

export type RouteParams = {
    id: string;
}

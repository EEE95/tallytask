// types.ts
export interface Task {
    name: string;
    description?: string;
    completed: boolean;
    priority?: string;
}

export interface HomeType {
    lists: string[];
    setLists: (lists: string[]) => void;
    tasks: { [key: string]: Task[] }; 
    setTasks: React.Dispatch<React.SetStateAction<{ [key: string]: Task[] }>>;
}

export type RouteParams = {
    id: string;
}

export interface PremadeList {
    name: string;
    tasks: Task[];
}
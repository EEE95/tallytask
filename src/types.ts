export interface Task {
    name: string;
    priority: number;
    completed: boolean;
}

export interface HomeType {
    lists: { [key: string]: string };
    setLists: (lists: { [key: string]: string }) => void;
    tasks: { [listName: string]: Task[] }; 
    setTasks: (tasks: { [listName: string]: Task[] }) => void;
}

export type RouteParams = {
    id: string;
};

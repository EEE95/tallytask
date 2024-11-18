export interface HomeType {
    lists: string[];
    setLists: (lists: string[]) => void;
    tasks: string[];
    setTasks: (tasks: string[]) => void;
}

export type RouteParams {
    id: string;
  }
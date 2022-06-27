export interface ITask2 {
    id: number;
    title: string;
    dueDate: string;
    description: string;
    assignee: {
        fullName: string;
        avatar: string;
    };
    tags: string[];
    isCompleted: boolean;
    isDeleted: boolean;
    isImportant: boolean;
}
export interface IItem {
    id?: number;
    target?: string;
    isBookmarked?: boolean;
    title: string;
    icon?: string;
    link?: string;
    collapsed?: boolean;
    by?: string;
    size?: string;
    file?: string;
    email?: string;
    img?: string;
    date?: string | Date;
}
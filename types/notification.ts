export interface INotificationItem {
    id: number;
    title: string;
    content: string;
    read: boolean;
    createdAt: string;
}

export interface INotificationDetail extends INotificationItem {
    type: string;
    metadata: string;
}

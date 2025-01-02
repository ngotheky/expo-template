import { TypeParamsPaging } from '@/api/interface/general';
import request from '@/api/request';
import { INotificationDetail, INotificationItem } from '@/types/notification';
import { AxiosResponse } from 'axios';

export const notificationList = ({ params }: TypeParamsPaging): Promise<AxiosResponse<INotificationItem[]>> =>
    request.post(`notification`, params);
export const notificationDetail = (): Promise<AxiosResponse<INotificationDetail>> => request.get(`notification`);
export const notificationRead = (id: number) => request.put(`notification/read/${id}`);

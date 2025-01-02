import request from '@/api/request';
import { IResource } from '@/types/general';
import { AxiosResponse } from 'axios';

export const getResources = (): Promise<AxiosResponse<IResource>> => request.get(`/resources`);
export const uploadImage = (formData: FormData) => request.post(`upload/image`, formData);

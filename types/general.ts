export interface IBankInfo {
    id: number;
    name: string;
    logo: string;
}

export interface IResource {
    banks: IBankInfo[];
}

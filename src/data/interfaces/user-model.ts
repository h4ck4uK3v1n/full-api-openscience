export interface UserModel {
    id: number;
    name: string;
    email: string;
}
export interface RemoveType {
    acknowledge: boolean;
    deletedCount: number;
}
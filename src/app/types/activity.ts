export interface Activity {
    message: string;
    timestamp: Date;
    user: {
    id: string,
    name: string 
    }
}
import { User } from "./user"
import { Theme } from "./themes"

export interface Post {
        likes:string[],
        _id: string,
        text: string,
        userId: User,
        themeId: Theme,
        created_at: string,
        updatedAt: string,
        __v: number,
        content:string
      
}
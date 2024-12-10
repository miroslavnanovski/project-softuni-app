import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Post } from './types/posts';
import { Theme } from './types/themes';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) { }
  getPosts(limit?: number) {
 

    let url = `/api/posts`;
    if(limit){
      url += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(url)
  }

  getSinglePost(id:string){

    return this.http.get<Post>(`/api/posts/${id}`)
  }

  getThemes(){
    return this.http.get<Theme[]>(`/api/themes`)
  }

  getSingleTheme(id:string) {
    return this.http.get<Theme>(`/api/themes/${id}`)
  }


  createTheme(themeName:string,postText:string) {
    const payload = {themeName,postText}

    return this.http.post<Theme>(`/api/themes`,payload)
  }

  deleteTheme(themeId:string){
    return this.http.delete(`/api/themes/${themeId}`)
  }

  postComment(postText:string,themeId:string){
    const payload = {postText};

    return this.http.post<Post>(`/api/themes/${themeId}`,payload)

  }

  likePost(postId:string){
    console.log(`likeAPost triggered for postId: ${postId}`);
    return this.http.put(`/api/likes/${postId}`, {}).pipe(
      catchError(error => {
        console.error('Error liking post', error);
        return throwError(() => error); 
      })
    );
  }

  deletePost(themeId:string,postId:string){
    return this.http.delete(`/api/themes/${themeId}/posts/${postId}`)
  }

  updatePost(postText: string, themeId: string, postId: string) {
    const updatedData = { postText: postText }; // Payload containing the updated post text
  
    return this.http.put(`/api/themes/${themeId}/posts/${postId}`, updatedData).pipe(
      catchError((error) => {
        console.error('Error updating post:', error); // Corrected error message
        return throwError(() => new Error('Failed to update the post.')); // Rethrow error with a custom message
      })
    );
  }

  subscribeToTheme(themeId: string) {
    return this.http.put(`/api/themes/${themeId}`, {}).pipe(
      catchError(error => {
        console.error('Error subscribing to theme', error);
        return throwError(() => error);
      })
    );
  }
  
  
}

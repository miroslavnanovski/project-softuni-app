import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Post } from './types/posts';
import { Theme } from './types/themes';


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



}

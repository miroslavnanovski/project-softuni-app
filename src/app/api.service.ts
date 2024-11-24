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
    const {apiUrl} = environment;

    let url = `${apiUrl}/posts`;
    if(limit){
      url += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(url)
  }

  getSinglePost(id:string){
    const {apiUrl} = environment;
    return this.http.get<Post>(`${apiUrl}/posts/${id}`)
  }

  getThemes(){
    const {apiUrl} = environment;
    return this.http.get<Theme[]>(`${apiUrl}/themes`)
  }

  getSingleTheme(id:string) {
    const {apiUrl} = environment;
    return this.http.get<Theme>(`${apiUrl}/themes/${id}`)
  }


  createTheme(themeName:string,postText:string) {
    const {apiUrl} = environment;
    const payload = {themeName,postText}

    return this.http.post<Theme>(`${apiUrl}/themes`,payload)
  }



}

import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService{
  changeData= new EventEmitter<Post[]>();

  constructor(private http: HttpClient){

  }
  createAndStorePost(title: string, content: string){
    const postData: Post ={title: title, content: content};
    this.http.post<{name: string}>(
      'https://backend-training-a33f5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      postData).subscribe(responseData=>{
        console.log(responseData);

      });
  }

  fetchPost(){
    return this.http.get<{[key:string]: Post}>('https://backend-training-a33f5-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    .pipe(map(responseData =>{
      const postsArray: Post[] =[];

      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key],id:key});
        }
      }
      return postsArray;
    })
    )
  }
  deletePosts(){
    return this.http.delete('https://backend-training-a33f5-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
  }
}

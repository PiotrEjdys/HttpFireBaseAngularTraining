import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(post=>{
      this.isFetching = false;
      this.loadedPosts = post;
    });;
  }

  onCreatePost(postData: Post ) {
    // Send Http request
    // console.log(postData);
    this.postsService.createAndStorePost(postData.title,postData.content);
    setTimeout(()=>{
      this.onFetchPosts();
    },3000)
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(post=>{
      this.isFetching = false;
      this.loadedPosts = post;
    });;
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(()=>{
      console.log('Deleted');
      this.loadedPosts= [];

    });
    // this.onFetchPosts();
  }


}

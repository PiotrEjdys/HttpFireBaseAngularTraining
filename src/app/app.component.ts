import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostsService } from "./post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(
      (post) => {
        this.isFetching = false;
        this.loadedPosts = post;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.error.error;
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    this.postsService.createAndStorePost(postData.title, postData.content);
    setTimeout(() => {
      this.onFetchPosts();
    }, 3000);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(
      (post) => {
        this.isFetching = false;
        this.loadedPosts = post;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.error.error;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      console.log("Deleted");
      this.loadedPosts = [];
    });
    // this.onFetchPosts();
  }

  onHandlingError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
// {
//   "rules": {
//     ".read": "now < 1634248800000",  // 2021-10-15
//     ".write": "now < 1634248800000",  // 2021-10-15
//   }
// }

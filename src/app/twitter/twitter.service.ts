
import {HttpClient} from "@angular/common/http";
import {WebService} from "../modules/service/web.service";
import {Injectable} from "@angular/core";
import {DataResponse} from "../modules/service/response";

@Injectable()
export class TwitterService extends WebService<any> {

  constructor(http: HttpClient) {
    super(http);
  }

  get endpoint(): string {
    return "";
  }

  get primaryKey(): string {
    return "id";
  }

  login() {
      return this.http.post<DataResponse<any>>(this.servicePath + "/login",
          {
              username: 'USERNAME',
              password: 'PASSWORD'
          }
      );
  }

  listFollowers(username: string) {
      return this.http.get<DataResponse<any>>(this.servicePath + "/" + username + "/followers");
  }

  listInterests(username: string) {
      return this.http.get<DataResponse<any>>(this.servicePath + "/" + username + "/interests");
  }

  tweet(text) {
      return this.http.post<DataResponse<any>>(this.servicePath + "/tweet",
          {
              text: text,
          }
      );
  }

  follow(username) {
      return this.http.post<DataResponse<any>>(this.servicePath + "/follow/" + username, {});
  }

  unfollow(username) {
      return this.http.post<DataResponse<any>>(this.servicePath + "/unfollow/" + username, {});
  }

  likeLastTweet(username) {
      return this.http.post<DataResponse<any>>(this.servicePath + "/like-last-tweet/" + username, {});
  }
}

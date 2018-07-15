
import {Routes} from "@angular/router";
import {AuthGuard} from "../app-routing/guards/auth.guard";
import {HomeComponent} from "./home/home.component";
import {TweetComponent} from "./tweet/tweet.component";
import {TwitterComponent} from "./twitter.component";

export const twitterRoutes: Routes = [
  {
    path: 'twitter',
    component: TwitterComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full"},
      { path: 'home', component: HomeComponent},
      { path: 'tweet', component: TweetComponent, data: {breadcrumb: "Tweet"} },
    ],
    data: {breadcrumb: "Twitter"},
    canActivate: [AuthGuard]
  }
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TwitterService} from "./twitter.service";
import {TweetComponent} from './tweet/tweet.component';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
} from "@angular/material";
import {HotkeyModule} from "angular2-hotkeys";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TwitterComponent} from "./twitter.component";

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatGridListModule,
    HotkeyModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  declarations: [
    TwitterComponent,
    TweetComponent,
    HomeComponent
  ],
  providers: [
    TwitterService
  ]
})
export class TwitterModule { }

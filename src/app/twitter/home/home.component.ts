import { Component, OnInit } from '@angular/core';
import {HotkeysService} from "angular2-hotkeys";
import {NotificationService} from "../../modules/notification/notification.service";
import {LoaderService} from "../../modules/loader/loader.service";
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {TwitterService} from "../twitter.service";
import {TableComponent} from "../../modules/components/table.component";
import {TranslateService} from "@ngx-translate/core";
import {ConditionsUtil} from "../../modules/utils/ConditionsUtil";
import {TwitterDataSource} from "../twitter.data.source";
import {UserInstance} from "../../modules/user/user.instance";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends TableComponent<any> implements OnInit {
  dataSource: TwitterDataSource;
  public username = "ign";
  type = "followers";

  constructor(notificationService: NotificationService,
              _hotkeysService: HotkeysService,
              loader: LoaderService,
              dialog: MatDialog,
              router: Router,
              activatedRoute: ActivatedRoute,
              public twitterService: TwitterService,
              translate: TranslateService) {

    super(twitterService, notificationService, _hotkeysService, loader, dialog, router, activatedRoute, translate);

    this.dataSource = new TwitterDataSource(this.twitterService, this.loader, this.notificationService);
  }

  ngOnInit() {
      this.routerSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
          if (ConditionsUtil.isNotNullNorEmpty(queryParams["username"])) {
              this.username = queryParams["username"];
          }

          if (!UserInstance.session.isLoggedIn) {
            this.twitterService.login().subscribe((response) => {
                UserInstance.session.isLoggedIn = true;
                this.notificationService.show(response.data.status);
                this.loadData();
            },
            error => {
              this.handleError(error);
            },
            () => {
                this.loader.stop();
            });
          } else {
              this.loadData();
          }
      });
  }

    get displayedColumns(): [string] {
        return ["username", "follow", "unfollow", "like"];
    }

    removeItem(model) {}

    loadData() {
        if (this.username === null) {
          return;
        }

        if (this.type === 'followers') {
            this.dataSource.loadFollowers(this.username);
        } else {
            this.dataSource.loadInterests(this.username);
        }
    }

    likeLastTweet(username) {
        this.loader.start();

      this.twitterService.likeLastTweet(username).subscribe((response) => {
              this.notificationService.show(response.data.status);
          },
          error => {
              this.handleError(error);
          },
          () => {
              this.loader.stop();
          });
    }

    follow(username) {
        this.loader.start();

        this.twitterService.follow(username).subscribe((response) => {
                this.notificationService.show(response.data.status);
            },
            error => {
                this.handleError(error);
            },
            () => {
                this.loader.stop();
            });
    }

    unfollow(username) {
        this.loader.start();

        this.twitterService.unfollow(username).subscribe((response) => {
                this.notificationService.show(response.data.status);
            },
            error => {
                this.handleError(error);
            },
            () => {
                this.loader.stop();
            });
    }

    select(username) {
      if (username !== this.username) {
        this.username = username;
        this.loadData();
      } else {
        this.username = username;
      }
    }
}

import {Component, OnInit} from '@angular/core';
import {TwitterService} from "../twitter.service";
import {NotificationService} from "../../modules/notification/notification.service";
import {HotkeysService} from "angular2-hotkeys";
import {LoaderService} from "../../modules/loader/loader.service";
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../modules/components/base.component";
import {UserInstance} from "../../modules/user/user.instance";


@Component({
  selector: 'app-country-list',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.less']
})
export class TweetComponent extends BaseComponent implements OnInit {
    tweetText = '';

    constructor(private twitterService: TwitterService,
              notificationService: NotificationService,
              _hotkeysService: HotkeysService,
              loader: LoaderService,
              dialog: MatDialog,
              router: Router,
              activatedRouter: ActivatedRoute) {
        super(notificationService, _hotkeysService, loader, dialog, router, activatedRouter);
    }

    ngOnInit() {
        if (!UserInstance.session.isLoggedIn) {
            this.twitterService.login().subscribe((response) => {
                    UserInstance.session.isLoggedIn = true;
                    this.notificationService.show(response.data.status);
                },
                error => {
                    this.handleError(error);
                },
                () => {
                    this.loader.stop();
                });
        }
    }

    submit() {
        this.twitterService.tweet(this.tweetText).subscribe((response) => {
                this.notificationService.show('Tweet is posted!');
                this.tweetText = '';
            },
            error => {
                this.handleError(error);
            },
            () => {
                this.loader.stop();
            });
    }
}

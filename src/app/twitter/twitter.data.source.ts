import {ServiceDataSource} from "../modules/service/service.data.source";
import {NotificationService} from "../modules/notification/notification.service";
import {LoaderService} from "../modules/loader/loader.service";
import {TwitterService} from "./twitter.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class TwitterDataSource extends ServiceDataSource<any> {
    dataSubject = new BehaviorSubject<any[]>([]);

    constructor(private twitterService: TwitterService,
                loader: LoaderService,
                notificationService: NotificationService) {
        super(twitterService, loader, notificationService);
    }

    loadFollowers(username) {
        this.loader.start();

        this.twitterService.listFollowers(username).subscribe(response => {
                this.dataSubject.next(response.data);
                this.length = response.count;
            },
            error => this.handleError(error),
            () => this.loader.stop()
        );
    }

    loadInterests(username) {
        this.loader.start();

        this.twitterService.listInterests(username).subscribe(response => {
                this.dataSubject.next(response.data);
                this.length = response.count;
            },
            error => this.handleError(error),
            () => this.loader.stop()
        );
    }
}
import {BaseComponent} from "./base.component";
import {NotificationService} from "../notification/notification.service";
import {LoaderService} from "../loader/loader.service";
import {HotkeysService} from "angular2-hotkeys";
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {WebService} from "../service/web.service";
import {OnInit} from "@angular/core";

export abstract class FormComponent<T> extends BaseComponent implements OnInit {
  public model: T;
  public isEditing: boolean;

  constructor(notificationService: NotificationService,
              hotkeysService: HotkeysService,
              loader: LoaderService,
              dialog: MatDialog, router: Router,
              activatedRoute: ActivatedRoute,
              public dataService: WebService<T>) {
    super(notificationService, hotkeysService, loader, dialog, router, activatedRoute);

    this.isEditing = false;
  }

  ngOnInit() {
    this.init();
  }

  protected abstract init();
  protected abstract submit();

}

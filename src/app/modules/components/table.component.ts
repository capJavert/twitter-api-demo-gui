import {MatDialog, MatPaginator, MatSort, PageEvent, Sort} from "@angular/material";
import {BaseComponent} from "./base.component";
import {NotificationService} from "../notification/notification.service";
import {HotkeysService} from "angular2-hotkeys";
import {LoaderService} from "../loader/loader.service";
import {WebService} from "../service/web.service";
import {ViewChild, OnInit, AfterViewInit, OnDestroy} from "@angular/core";
import {ServiceDataSource} from "../service/service.data.source";
import {ActivatedRoute, Router} from "@angular/router";
import {ConditionsUtil} from "../utils/ConditionsUtil";
import {TranslateService} from "@ngx-translate/core";

export abstract class TableComponent<T> extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  public dataSource: ServiceDataSource<T>;
  private _pageSize: number;
  private translateSubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) tableSort: MatSort;

  constructor(public dataService: WebService<T>,
              notificationService: NotificationService,
              _hotkeysService: HotkeysService,
              loader: LoaderService,
              dialog: MatDialog,
              router: Router,
              activatedRoute: ActivatedRoute,
              protected translate: TranslateService) {
    super(notificationService, _hotkeysService, loader, dialog, router, activatedRoute);

    this.dataSource = new ServiceDataSource<T>(this.dataService, this.loader, this.notificationService);

    this.pageSize = 5;
  }

  ngAfterViewInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe(() => {
      this.translate.get('MAIN.PER_PAGE').subscribe(translation => {
        this.paginator._intl.itemsPerPageLabel = translation;
      });
    });
  }

  ngOnDestroy() {
    if (ConditionsUtil.isNotNull(this.translateSubscription)) {
      this.translateSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.routerSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      let page = 0;
      let params = {};

      if (ConditionsUtil.isNotNullNorEmpty(queryParams["page"]) && queryParams["page"] > 0) {
        page = queryParams["page"] - 1;
      }

      if (ConditionsUtil.isNotNullNorEmpty(queryParams["size"])
        && this.pageSizeOptions.indexOf(+queryParams["size"]) >= 0) {
        this.pageSize = queryParams["size"];
      }

      if (ConditionsUtil.isNotNullNorEmpty(queryParams["order"])) {
        this.tableSort.active = queryParams["property"];
        this.tableSort.direction = queryParams["order"];
        params["property"] = queryParams["property"];
        params["order"] = queryParams["order"];
      }

      this.paginator.pageIndex = page;
      this.dataSource.loadData(this.pageSize, page, params);
    });
  }

  abstract get displayedColumns(): [string];
  abstract removeItem(model);

  get pageSizeOptions(): [number] {
    return [5, 10, 25, 50, 100];
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }

  get pageIndex(): number {
    return this.paginator.pageIndex;
  }

  public onPageChange(event: PageEvent) {
    let queryParams = {
      page: event.pageIndex + 1,
      size: event.pageSize
    };

    if (ConditionsUtil.isNotNullNorEmpty(this.tableSort.direction)) {
      queryParams["property"] = this.tableSort.active;
      queryParams["order"] = this.tableSort.direction;
    }

    this.router.navigate(
      ["/" + this.dataService.endpoint],
      { queryParams: queryParams }
    );
  }

  public sortData(sort: Sort) {
    let queryParams = {
      page: this.paginator.pageIndex + 1,
      size: this._pageSize
    };

    if (ConditionsUtil.isNotNullNorEmpty(sort.direction)) {
      queryParams["property"] = sort.active;
      queryParams["order"] = sort.direction;
    }

    this.router.navigate(
      ["/" + this.dataService.endpoint],
      { queryParams: queryParams }
    );
  }
}

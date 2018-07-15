import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router} from "@angular/router";
import {BreadcrumbInterface} from "./breadcrumb.interface";
import "rxjs/add/operator/filter";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public breadcrumbs: BreadcrumbInterface[];
  private navigationSubscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      let root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
    });

    this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: BreadcrumbInterface[] = []): BreadcrumbInterface[] {
    const ROUTE_DATA_BREADCRUMB = "breadcrumb";

    let children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
      url += `/${routeURL}`;

      let breadcrumb: BreadcrumbInterface = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}

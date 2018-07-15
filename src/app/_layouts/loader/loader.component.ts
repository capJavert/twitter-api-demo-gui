import {Component} from '@angular/core';
import {LoaderService} from "../../modules/loader/loader.service";
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent {
  constructor(private loader: LoaderService) {}

  get isLoading() {
    return this.loader.loading$;
  }
}

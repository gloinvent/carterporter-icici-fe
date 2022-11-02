import { Component } from '@angular/core';
import { PassArrayService } from './core/services/pass-array.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading: boolean = false;

  constructor(public getLoader: PassArrayService) { }
  title = 'CarterX';

  ngOnInit() {
    this.getLoader.currentLoaderFlag.subscribe(loader => this.loading = loader);
  }

}

import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { AppContext } from './app.context';

import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

@Component({
  selector: 'cf-app',
  templateUrl: '../../views/app/app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @select(['navigation', 'screen']) screen$: Observable<string>;
  screen: string;

  constructor(private context: AppContext, private change: ChangeDetectorRef) {
    this.screen$.subscribe(s => {
      this.screen = s;
      this.change.markForCheck();
    });
  }

}
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading-service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  title = 'patient-viewer';

  private loadingMaskVisibilitySubscription: Subscription;
  public isLoadMaskVisible: boolean = false;

  constructor(private readonly loadService: LoadingService) {
    this.loadingMaskVisibilitySubscription =
    this.loadService
        .loadingMaskVisibilityNotifications
        .subscribe(this.realizeLoadingMaskVisibility);
  }
  public ngOnDestroy(): void {
    this.loadingMaskVisibilitySubscription.unsubscribe();
  }

  private realizeLoadingMaskVisibility = (visibility: boolean): void => {
    setTimeout(()=>{
      this.isLoadMaskVisible = visibility;
    });
  };
}

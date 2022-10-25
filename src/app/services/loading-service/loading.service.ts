import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {

    private loadingMaskVisibilitySubject: Subject<boolean> = new Subject<boolean>();

    public get loadingMaskVisibilityNotifications(): Observable<boolean> {
        return this.loadingMaskVisibilitySubject.asObservable();
    }

    public requestDisplayLoadingMask(): void {
        console.info("loading mask on");
        this.loadingMaskVisibilitySubject.next(true);
    }

    public requestHideLoadingMask(): void {
        console.info("loading mask off");
        this.loadingMaskVisibilitySubject.next(false);
    }
}

import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";

@Injectable({ providedIn: "root" })
export class ObserverService {
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();

  constructor() {}

  public subscribe(next?: (value: any) => void): Subscription {
    return this.notifyObservable$.subscribe(next);
  }

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  public notifyOtherWith(option: string, data: any) {
    if (option) {
      this.notifyOther({ option: option, value: data });
    }
  }
}

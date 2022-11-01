import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageChannel: Subject<Message> = new Subject<Message>();

  private id: number = 0;

  public get messageNotifications(): Observable<Message> {
    return this.messageChannel.asObservable();
  }

  public get nextId(): number {
    return this.id++;
  }

  public publishMessageNotification(message: Message): void {
    this.messageChannel.next(message);
}

}

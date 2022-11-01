import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../services/message-service/message';
import { MessageService } from '../services/message-service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements AfterViewChecked, OnDestroy {

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  private readonly messageReceivedNotificationSubscription: Subscription;

  public messages: Array<Message> = [];

  private messageReceivedNotificationHandler = (message: Message): void => {
    this.messages = [...this.messages, message];
  }

  constructor(private readonly messageService: MessageService) {
    this.messageReceivedNotificationSubscription = this.messageService.messageNotifications.subscribe(this.messageReceivedNotificationHandler);
   }
  ngOnDestroy(): void {
    if (this.messageReceivedNotificationSubscription) {
      this.messageReceivedNotificationSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight + 100;
    }   catch(err) { } 
  } 

  public clearMessages = ():void => {
    this.messages = [];
  }
}

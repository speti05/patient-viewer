import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, finalize, Observable, tap } from "rxjs";
import { MessageService } from "../services/message-service/message.service";


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

    constructor(private readonly messageService: MessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started: Date = new Date();
        const messageId: number = this.messageService.nextId;
        this.messageService.publishMessageNotification({
            id: messageId,
            timestamp: started,
            message: `${req.method} "${req.urlWithParams}" is sent.`,
            method: `${req.method}`
        });

        return next.handle(req).pipe(
            delay(Math.floor(Math.random() * 4000)),
            finalize(() => {
                const finished: Date = new Date();
                this.messageService.publishMessageNotification({
                    id: messageId,
                    timestamp: finished,
                    message: `${req.method} "${req.urlWithParams}" is reveived. It took ${finished.getTime() - started.getTime()}ms.`,
                    method: `${req.method}`
                });
            })
            );
    }
}

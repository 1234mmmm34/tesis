import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44397/notificationHub')
      .build();

    this.hubConnection.on('ReceiveNotification', (message: string) => {
      console.log('Notification received:', message);
    });

    this.hubConnection.start()
      .catch(err => console.error('Error while starting SignalR connection: ', err));
  }

  public sendNotification(message: string): void {
    this.hubConnection.invoke('SendNotification', message)
      .catch(err => console.error('Error while sending notification: ', err));
  }
}

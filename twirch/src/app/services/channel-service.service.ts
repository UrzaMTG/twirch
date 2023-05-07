import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../models/message';

enum SocketIoEvents {
  ConnectError = 'connect_error',
  Connect = 'connect',
  Disconnect = 'disconnect'
}

const _joinChannels: string = 'join channels';
const _chatMessage: string = 'chat message';
const _keepAlive: string = 'keepAlive';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  keepAliveTimer;
  chatMessage = this.socket.fromEvent<Message>(_chatMessage);

  constructor(private socket: Socket) {
    this.keepAliveTimer = setInterval(() => { this.keepAlive }, 60000);
    this.socket.on(SocketIoEvents.Connect, () => {console.log("Socket connected")});
    this.socket.on(SocketIoEvents.ConnectError, (error: Error) => {console.log(`Socket connection error: ${error.message}`)});
    this.socket.on(SocketIoEvents.Disconnect, (reason: string) => {console.log(`Socket disconnected: ${reason}`)});
  }

  selectChannels(channels: string[]): void {
    this.socket.emit(_joinChannels, channels);
  }

  keepAlive(): void {
    this.socket.emit(_keepAlive, '');
  }

}

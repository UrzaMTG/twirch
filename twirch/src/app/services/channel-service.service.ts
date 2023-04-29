import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../models/message';

enum SocketIoManagerEvents {
  Error = 'error',
  Ping = 'ping',
  Reconnect = 'reconnect',
  ReconnectAttempt = 'reconnect_attempt',
  ReconnectError = 'reconnect_error',
  ReconnectFailed = 'reconnect_failed'
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
    this.socket.on(SocketIoManagerEvents.Error, () => {console.log("Socket error")});
    this.socket.on(SocketIoManagerEvents.Ping, () => {console.log("Ping received")});
    this.socket.on(SocketIoManagerEvents.Reconnect, () => {console.log("Socket reconnecting")});
    this.socket.on(SocketIoManagerEvents.ReconnectAttempt, () => {console.log("Socket reconnect attempt")});
    this.socket.on(SocketIoManagerEvents.ReconnectError, () => {console.log("Socket reconnect error")});
    this.socket.on(SocketIoManagerEvents.ReconnectFailed, () => {console.log("Socket reconnect failure")});
  }

  selectChannels(channels: string[]): void {
    this.socket.emit(_joinChannels, channels);
  }

  keepAlive(): void {
    this.socket.emit(_keepAlive, '');
  }

}

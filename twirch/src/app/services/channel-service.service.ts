import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../models/message';

const _joinChannels: string = 'join channels';
const _chatMessage: string = 'chat message';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  keepAliveTimer;
  chatMessage = this.socket.fromEvent<Message>(_chatMessage);

  constructor(private socket: Socket) {
    this.keepAliveTimer = setInterval(this.keepAlive, 60000);
  }

  selectChannels(channels: string[]): void {
    this.socket.emit(_joinChannels, channels);
  }

  keepAlive(): void {
    this.socket.emit('keepAlive', '');
  }

}

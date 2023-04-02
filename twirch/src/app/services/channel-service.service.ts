import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../models/message';

const _joinChannels: string = 'join channels';
const _chatMessage: string = 'chat message';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  chatMessage = this.socket.fromEvent<Message>(_chatMessage);

  constructor(private socket: Socket) { }

  selectChannels(channels: string[]): void {
    this.socket.emit(_joinChannels, channels);
  }

}

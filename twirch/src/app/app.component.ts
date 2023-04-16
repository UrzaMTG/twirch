import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EmoteOptions, parse } from 'simple-tmi-emotes'

import { Message } from './models/message';
import { ChannelService } from './services/channel-service.service';
import { BadgeService } from './services/Badges.service';
import { AboutDialogComponent } from './components/aboutDialog/aboutDialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked  {
  @ViewChild('scrollArea') private scrollArea!: ElementRef;

  messages: Message[] = [];
  title = 'twirch';

  private _msgSub?: Subscription;
  
  constructor(private location: Location, private channelService: ChannelService, private badgeService: BadgeService, private dialog: MatDialog) {
    channelService.selectChannels(location.path().split('/').splice(1));
  }

  ngOnInit(): void {
    this._msgSub = this.channelService.chatMessage.subscribe((msg) => this.processMessage(msg));
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  
  ngOnDestroy(): void {
    this._msgSub?.unsubscribe();
  }

  openAbout() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'aboutPanel';
    dialogConfig.maxHeight = '90%';
    dialogConfig.maxWidth = '90%';
    
    this.dialog.open(AboutDialogComponent, dialogConfig);
  }

  private processMessage(msg: Message): void {
    // Add timestamp
    msg.timestamp = new Date(Date.now());

    msg.channel = msg.channel?.slice(1);

    // Insert emotes
    if (msg.emotes) {
      let options: EmoteOptions = {
        format: 'default',
        themeMode: 'dark',
        scale: '1.0'
      }

      msg.message = parse(msg.message, msg.emotes, options);
    }

    if (msg.badges) {
      msg['badges-raw'] = this.badgeService.parseBadges(msg.badges);
    }

    // Push to bound array
    this.messages.push(msg);
  }

  private scrollToBottom(): void {
    try {
      this.scrollArea.nativeElement.scrollTop = this.scrollArea.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
    
}

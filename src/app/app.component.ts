import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EmoteOptions, parse } from 'simple-tmi-emotes'

import { Message, Settings } from './models';
import { ChannelService, BadgeService, SettingsService } from './services';
import { AboutDialogComponent } from './components/aboutDialog/aboutDialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked  {
  @ViewChild('scrollArea') private scrollArea!: ElementRef;

  public settings: Settings;
  messages: Message[] = [];
  title = 'twirch';
  showSettings: boolean = false;

  private _msgSub?: Subscription;
  
  constructor(private location: Location, private settingsService: SettingsService, private channelService: ChannelService, private badgeService: BadgeService, private dialog: MatDialog) {
    this.settings = this.settingsService.settings;
    this.settings.channels = location.path().toLowerCase().split('/').splice(1);
    channelService.selectChannels(this.settings.channels);
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

    // Insert links
    msg.message = this.wrapMessageURLs(msg.message);

    if (msg.badges) {
      msg['badges-raw'] = this.badgeService.parseBadges(msg.badges);
    }

    // Push to bound array
    this.messages.push(msg);
  }

  private wrapMessageURLs(message: string): string {
    const httpRegex: RegExp = /(?<!\S)(https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)\b/g;
    function replacer(match: string) {
      return (match.toLowerCase().startsWith('http://') || match.toLowerCase().startsWith('https://')) ? `<a href="${match}" target="_blank">${match}</a>` : `<a href="http://${match}" target="_blank">${match}</a>`;
    }
    return message.replaceAll(httpRegex, replacer);
  }

  private scrollToBottom(): void {
    try {
      this.scrollArea.nativeElement.scrollTop = this.scrollArea.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
    
}

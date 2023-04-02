import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { Message } from './models/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  segments: UrlSegment[] = [];
  messages: Message[] = [];
  title = 'twirch';
  
  constructor(private route: ActivatedRoute) {
    route.url.subscribe((segments: UrlSegment[]) => {
      // do whatever you need to with the segments
      this.segments = segments;
    });

    //this.addTestMessages();
  }

  /*addTestMessages(): void {
    this.messages.push(new Message("Randomrings", "UrzaMTG", "Test message 1"))
    this.messages.push(new Message("ThatBardVal", "UrzaMTG", "Test message 2 is really quite long and I expect this to break something eventually maybe what could possibly go wrong"))
    this.messages.push(new Message("Mystakin", "UrzaMTG", "Test message 3"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("weffjebster", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("eryngobragh", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("Mystakin", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("eryngobragh", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("eryngobragh", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("eryngobragh", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("weffjebster", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("Randomrings", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("eryngobragh", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("Mystakin", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("Randomrings", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("eryngobragh", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("weffjebster", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("Randomrings", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("UrzaMTG", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("Mystakin", "UrzaMTG", "Test message 4"))
    this.messages.push(new Message("eryngobragh", "UrzaMTG", "Test message 4"))
  }*/
}

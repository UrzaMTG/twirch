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

    this.test_addTestMessages();
  }

  test_addTestMessages(): void {
    for (let i = 0; i < 100; i++) {
      let username = this.test_selectRandomUser();
      this.messages.push({channel: this.test_selectRandomChannel(), username: this.test_selectRandomUser().toLowerCase(), "display-name": this.test_selectRandomUser(), message: this.test_selectRandomMessage()});
    }
  }

  test_selectRandomChannel(): string {
    let channels: string[] = [
      "UrzaMTG",
      "ThatBardVal",
      "weffjebster",
      "TheSatellite54",
      "wafflesoup",
      "Randomrings",
      "Duckie2010",
      "eryngobragh",
      "Mystakin"
    ];
    
    return channels[Math.floor(Math.random() * channels.length)];
  }

  test_selectRandomUser(): string {
    let users: string[] = [
      "Tagmer",
      "Chubblekins",
      "HardCover",
      "VirtueCatVT",
      "shorthouse",
      "G0lbez"
    ];
    
    return users[Math.floor(Math.random() * users.length)];
  }

  test_selectRandomMessage(): string {
    let messages: string[] = [
      "PogChamp",
      "You would not believe your eyes tsEorb tsEorb if ten million 💯fireflies 🐝lit 🔥up ☝️the world :milky_way: as I fell asleep :sleeping: cause they'd fill the open air :cloud: and leave teardrops :sweat_drops: everywhere you'd think :thought_balloon: me rude but I would just stand 🕴and stare tsEorb I like to make myself believe :thought_balloon: that planet earth :earth_asia: turns slowly 🚶it's hard to say 🗣 that I'd rather stay awake 👁 when I'm asleep :sleeping: cause everything tsEorb :lips: tsEorb is never as it seems",
      "!",
      "Can you believe that just happened",
      "wtf man"
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  }
    
}

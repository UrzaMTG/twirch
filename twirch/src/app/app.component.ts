import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  segments: UrlSegment[] = [];
  title = 'twirch';
  
  constructor(private route: ActivatedRoute) {
    route.url.subscribe((segments: UrlSegment[]) => {
      // do whatever you need to with the segments
      this.segments = segments;
    });
  }
}

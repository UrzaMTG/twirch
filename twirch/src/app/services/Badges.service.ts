import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Badges } from 'tmi.js';
import { BadgeData } from '../models/BadgeData';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private data?: BadgeData;

  constructor(private http: HttpClient) {
    const url = 'https://badges.twitch.tv/v1/badges/global/display';
    this.http.get<BadgeData>(url).subscribe( (res) => {
      this.data = res;
    })
  }

  /**
   * Create a string of img tags with the badges from the object
   * @param badges An object with keys equal to the badge id and the value set to the version of that badge to use
   * @returns A string with one or more img tags with src and title set
   */
  parseBadges(badges: Badges): string {
    let retVal = "";

    if (this.data) {
      for (const [k, v] of Object.entries(badges)) {
        if (v) {
          if (k === 'subscriber') {
            let maxMonths: number = 0;
            let msgMonths = Number.parseInt(v);
            for (const [months, v2] of Object.entries(this.data.badge_sets[k].versions)) {
              let monthNum: number = Number.parseInt(months);
              maxMonths = Math.max(maxMonths, monthNum);
              if (monthNum === msgMonths) {
                retVal += `<img src="${this.data.badge_sets[k].versions[months].image_url_1x}" class="twitch-badge" title="${this.data.badge_sets[k].versions[months].title}" />`;
                break;
              }
            }

            if (msgMonths > maxMonths) {
              retVal += `<img src="${this.data.badge_sets[k].versions[maxMonths].image_url_1x}" class="twitch-badge" title="${this.data.badge_sets[k].versions[maxMonths].title}" />`;
            }
          }
          else {
            retVal += `<img src="${this.data.badge_sets[k].versions[v].image_url_1x}" class="twitch-badge" title="${this.data.badge_sets[k].versions[v].title}" />`;
          }
        }
      }
    }

    return retVal;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Badges } from 'tmi.js';
import { BadgeData, BadgeDict } from '../models/BadgeData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private badgeData: BadgeDict = {};

  constructor(private http: HttpClient) {
    const url = 'https://api.twitch.tv/helix/chat/badges/global';
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${environment.twitchAccessToken}`)
      .set('Client-Id', '7p63vvqitomsz4k6pig8gi1ym2wv6s');
    this.http.get<BadgeData>(url, {headers: headers}).subscribe( (res) => {
      res.data.map(badge => {
        const properBadge = {
          versions: Object.fromEntries(badge.versions.map(version => [version.id, version]))
        };
        this.badgeData[badge.set_id] = properBadge
      });
    })
  }

  /**
   * Create a string of img tags with the badges from the object
   * @param badges An object with keys equal to the badge id and the value set to the version of that badge to use
   * @returns A string with one or more img tags with src and title set
   */
  parseBadges(badges: Badges): string {
    let retVal = "";

    if (this.badgeData) {
      for (const [k, v] of Object.entries(badges)) {
        if (v) {
          if (k === 'subscriber') {
            let maxMonths: number = 0;
            let msgMonths = Number.parseInt(v);
            for (const [months, v2] of Object.entries(this.badgeData[k].versions)) {
              let monthNum: number = Number.parseInt(months);
              maxMonths = Math.max(maxMonths, monthNum);
              if (monthNum === msgMonths) {
                retVal += `<img src="${this.badgeData[k].versions[months].image_url_1x}" class="twitch-badge" title="${this.badgeData[k].versions[months].title}" />`;
                break;
              }
            }

            if (msgMonths > maxMonths) {
              retVal += `<img src="${this.badgeData[k].versions[maxMonths].image_url_1x}" class="twitch-badge" title="${this.badgeData[k].versions[maxMonths].title}" />`;
            }
          }
          else {
            retVal += `<img src="${this.badgeData[k].versions[v].image_url_1x}" class="twitch-badge" title="${this.badgeData[k].versions[v].title}" />`;
          }
        }
      }
    }

    return retVal;
  }

}

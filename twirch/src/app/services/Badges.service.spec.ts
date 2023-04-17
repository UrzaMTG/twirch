/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BadgeService } from './Badges.service';

describe('Service: Badges', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BadgeService]
    });
  });

  it('should ...', inject([BadgeService], (service: BadgeService) => {
    expect(service).toBeTruthy();
  }));
});

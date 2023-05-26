/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChannelService } from './channel-service.service';

describe('Service: ChannelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelService]
    });
  });

  it('should ...', inject([ChannelService], (service: ChannelService) => {
    expect(service).toBeTruthy();
  }));
});

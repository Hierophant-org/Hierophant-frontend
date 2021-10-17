import { TestBed } from '@angular/core/testing';
import { PostCreationService } from './post-creation.service';

describe('PostCreationService', () => {
  let service: PostCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

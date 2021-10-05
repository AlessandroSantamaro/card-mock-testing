import {TestBed} from '@angular/core/testing';

import {CardService} from './card.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';

describe('CardService', () => {
  let service: CardService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(CardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should test add method', () => {
    const request = {
      card: 'Card 1'
    };

    service.add(request.card).subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpTestingController.expectOne(`${environment.baseURL}/add`);
    expect(req.request.method).toBe('POST');
  });

  it('should test getAll method', () => {
    service.getAll().subscribe(data => {
      expect(data).not.toBeNull();
    });

    const req = httpTestingController.expectOne(`${environment.baseURL}/cards`);
    expect(req.request.method).toBe('GET');
  });
});

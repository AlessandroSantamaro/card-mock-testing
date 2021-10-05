import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CardComponent} from './card.component';
import createSpyObj = jasmine.createSpyObj;
import {delay} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import SpyObj = jasmine.SpyObj;
import {CardService} from './card.service';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardServiceSpy: SpyObj<CardService>;
  let cardSpy: any;

  beforeEach(async () => {
    cardSpy = createSpyObj('cardService', ['add', 'getAll']);
    cardSpy.add.and.callFake(() => {
      return of(true).pipe(delay(100));
    });
    cardSpy.getAll.and.callFake(() => {
      return of(['Card 1', 'Card 2', 'Card 3']).pipe(delay(100));
    });
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [
        {provide: CardService, useValue: cardSpy},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    cardServiceSpy = TestBed.inject(CardService) as SpyObj<CardService>;
    fixture.detectChanges();

    // Update Cards
    component.updateCards(); // From the mock we will have cards = ['Card 1', 'Card 2', 'Card 3']
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test addCard with add method mocked', fakeAsync(() => {
    component.updateCards();
    tick(300);
    const originalCardsLenght = component.cards.length;

    // Add more cards
    component.addCard('Card 4');
    component.addCard('Card 5');
    component.addCard('Card 6');
    component.addCard('Card 7');

    // "Update" component.cards array
    component.updateCards();

    tick(300);
    expect(component.cards).not.toBeNull();
    expect(component.cards.length).toBe(originalCardsLenght);
  }));

  it('test add call', () => {
    const newCard = 'Card A';
    component.addCard(newCard);
    expect(cardServiceSpy.add).toHaveBeenCalled();
    expect(cardServiceSpy.add).toHaveBeenCalledTimes(1);
    expect(cardServiceSpy.add).toHaveBeenCalledWith(newCard);
  });

  it('test add call error', () => {
    cardSpy.add.and.callFake(() => {
      return throwError(
        {error: {errorMessage: 'Error adding a new card'}}
      ).pipe(delay(100));
    });

    component.addCard('Card A');
    // TODO Test your error handling
  });

});

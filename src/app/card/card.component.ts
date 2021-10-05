import {Component, OnInit} from '@angular/core';
import {CardService} from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  cards: string[] = [];

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
  }

  addCard(card: string): void {
    this.cardService.add(card)
      .subscribe(
        isAdded => {
          if (isAdded) {
            console.log('Card added');
          } else {
            console.log('Card not added');
          }
        }, error => {
          console.log('Error adding addCard: ' + error);
        }
      );
  }

  updateCards(): void {
    this.cardService.getAll()
      .subscribe(
        data => {
          this.cards = data;
        }, error => {
          console.log('Error retrieving getAll cards: ' + error);
        }
      );
  }

}

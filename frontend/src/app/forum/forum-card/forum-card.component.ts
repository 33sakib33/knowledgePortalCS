import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.css']
})
export class ForumCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() details: string = '';
  @Input() headerColor: string = '';
  constructor() { }
  
  ngOnInit(): void {
  }

  items: any[] = [
    { title: 'Item 1', description: 'Description of Item 1' },
    { title: 'Item 2', description: 'Description of Item 2' },
    { title: 'Item 3', description: 'Description of Item 3' },
    { title: 'Item 3', description: 'Description of Item 3' }
  ];

  handleItemClick() {
    // Handle the item click event here
  }

}

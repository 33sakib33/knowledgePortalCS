import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-forum-items',
  templateUrl: './forum-items.component.html',
  styleUrls: ['./forum-items.component.css']
})
export class ForumItemsComponent implements OnInit {
  @Input('title') title: string = '';
  @Input('description') description: string = '';
  @Output('itemClicked') itemClicked: EventEmitter<void> = new EventEmitter<void>();

  handleClick() {
    this.itemClicked.emit();
  }
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-forum-items',
  templateUrl: './forum-items.component.html',
  styleUrls: ['./forum-items.component.css']
})
export class ForumItemsComponent implements OnInit {
  @Input('title') title: string = '';
  @Input('description') description: string = '';
  @Input('id') id: number = 0;
  @Output('itemClicked') itemClicked: EventEmitter<void> = new EventEmitter<void>();

  handleClick() {
    this.route.navigate(['forumpage', this.id])
  }
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

}

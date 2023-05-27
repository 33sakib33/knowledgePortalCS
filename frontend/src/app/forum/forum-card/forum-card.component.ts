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

}

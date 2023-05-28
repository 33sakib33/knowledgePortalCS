import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogcards',
  templateUrl: './blogcards.component.html',
  styleUrls: ['./blogcards.component.css']
})
export class BlogcardsComponent implements OnInit {

  constructor(private route: Router) { }
  @Input() blog: any;
  id = 1;
  dateString: string = "";
  ngOnInit(): void {
    this.dateStringReturn(this.blog.createdAt);
  }
  goToBlog = () => {
    this.route.navigate(['blog', this.id])
  }
  dateStringReturn(timestamp: any) {

    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    this.dateString = dateString;
  }
}

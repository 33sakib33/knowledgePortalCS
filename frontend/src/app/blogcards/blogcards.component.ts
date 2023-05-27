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
  ngOnInit(): void {
  }
  goToBlog = () => {
    this.route.navigate(['blog', this.id])
  }

}

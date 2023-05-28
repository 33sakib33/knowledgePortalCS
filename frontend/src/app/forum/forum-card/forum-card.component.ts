import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/content.service';

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.css']
})
export class ForumCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() details: string = '';
  @Input() headerColor: string = '';
  constructor(private contentService: ContentService, private router: Router) { }

  ngOnInit(): void {
    this.getContentByTopic();
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
  getContentByTopic() {
    let data = {
      content: {
        topic: this.title,
        type: "forum"
      }

    }
    this.contentService.getContentByTopic(data).subscribe(
      response => {
        this.items = response.rows;

        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );


  }
  createQuestion() {
    this.router.navigate(['createQuestion', this.title])
  }

}

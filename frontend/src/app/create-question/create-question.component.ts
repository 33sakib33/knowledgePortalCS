import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  type: string = "";
  questionText: string = "";
  questionTitle: string = "";
  constructor(private contentService: ContentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      this.type = params['type'];
    });
  }

  handleImageUpload(event: any) {

  }
  postQuestion() {
    if (!this.questionText) return;
    let data = {
      content: {
        contentText: this.questionText,
        type: 'forum',
        topic: this.type,
        title: this.questionTitle
      }
    }
    this.contentService.createContent(data).subscribe(
      response => {
        console.log(response)
        // Assuming authentication is successful, store the token and user details in localStorage
        this.router.navigate(['forums'])
      },
      error => {
        // Handle authentication error
        console.error('Login failed:', error);
      }
    );
  }

}

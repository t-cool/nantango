import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('question') question: any;
  // tslint:disable-next-line:no-input-rename
  @Input('choices') choices: any;
  @Output() nextQuestion = new EventEmitter();
  timer = null;
  constructor(private dataService: DataService) {}
  ngOnChanges() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.onClickAnswer(''), 5000);
  }

  onClickAnswer(answer: string) {
    this.nextQuestion.emit();
    if (answer !== this.question.meanings[1]) {
      this.dataService.setAnswersIncorrect(this.question);
    }
  }
}

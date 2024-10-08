import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';

import { DataService } from '../services/data.service';

const talkify = (window as any).talkify;
const voice = new talkify.Html5Player();
voice.forceLanguage('en-US');
voice.setRate(1);

interface IQuestion {
  level: string;
  en: string;
  meanings: string[];
}

@Component({
  selector: 'app-level-detail',
  templateUrl: './level-detail.component.html',
  styleUrls: ['./level-detail.component.scss'],
})
export class LevelDetailComponent implements OnInit {
  private questions = [];
  private totalChoices = [];
  // 問題数
  QUESTION_NUMBER_PER_LEVEL = 20;
  MAX_INCORRECT_ANSWERS = 8;
  choices = [];
  currentIndex = 0;
  question: IQuestion = null;
  valueProcessBar = 0;
  incorrectAnswers = 0;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.questions = this.dataService.getQuestions();
    this.question = this.questions[this.currentIndex];
    voice.playText(this.question.en, { language: 'en-US' });
    this.totalChoices = this.dataService.getTotalChoices();
    this.choices = this.getChoices();
  }

  getChoices() {
    if (this.questions[this.currentIndex]) {
      const opts = _.take(
        _.shuffle(
          this.totalChoices.filter(
            (choice) => choice !== this.questions[this.currentIndex].meanings[1] // the 4th position in record
          )
        ),
        2
      );
      opts.push(this.questions[this.currentIndex].meanings[1]); // the 4th position in record
      return _.shuffle(opts);
    }
    return [];
  }

  onNextQuestion() {
    this.incorrectAnswers = this.dataService.getAnswersIncorrect().length;

    // 間違えた問題が 8 個になったら結果画面にいく
    if (this.incorrectAnswers >= this.MAX_INCORRECT_ANSWERS) {
      return this.router.navigate(['result'], { skipLocationChange: true });
    }

    // 確認を3分で完結できる量にするため
    // 上限の問題数をこなしたら結果画面に進む
    if(this.currentIndex >= this.QUESTION_NUMBER_PER_LEVEL - 1){
      return this.router.navigate(['result'], { skipLocationChange: true });
    }

    this.currentIndex = this.currentIndex + 1;
    this.question = this.questions[this.currentIndex];
    voice.playText(this.question.en, { language: 'en-US' });
    this.choices = this.getChoices();
    this.valueProcessBar = Math.round(
      (this.currentIndex / this.QUESTION_NUMBER_PER_LEVEL) * 100
    );
  }
}
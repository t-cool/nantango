import { Injectable } from '@angular/core';
import _ from 'lodash';

export interface IQuestion {
  level: number;
  en: string;
  meanings: string[];
}
const QUESTION_NUMBER_PER_LEVEL = 50;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private quesDict: {
    [key: number]: IQuestion[];
  } = {};
  private totalQuestions = []; // by level
  private questions = []; // 50 question per level
  private totalChoices = [];
  private answersIncorrect = [];

  constructor() {}

  getQuestions() {
    return this.questions;
  }
  getTotalChoices() {
    return this.totalChoices;
  }
  getAnswersIncorrect() {
    return this.answersIncorrect;
  }

  setQuesDictFromHome(data: { [key: number]: IQuestion[] }) {
    this.quesDict = data;
  }
  setQuestionsFromHome(level: number) {
    this.totalQuestions = this.quesDict[level];
    this.questions = _.take(
      _.shuffle(this.totalQuestions),
      QUESTION_NUMBER_PER_LEVEL
    );
    this.totalChoices = this.totalQuestions.map(
      (question) => question.meanings[1]
    );
  }
  setAnswersIncorrect(answer: IQuestion) {
    this.answersIncorrect = [...this.answersIncorrect, answer];
  }
}

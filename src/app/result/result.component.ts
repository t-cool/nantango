import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  answersIncorrect = [];
  time = '';
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const now = new Date();
    this.answersIncorrect = this.dataService.getAnswersIncorrect();
    this.time = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  }

  onClickPrint() {
    window.print();
  }
}

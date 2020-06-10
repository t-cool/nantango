import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion, DataService } from '../services/data.service';
import { Router } from '@angular/router';

const csvToArr = (csv: string) => {
  const allTextLines = csv.split(/\r|\n|\r/);
  const headers = allTextLines[0].split(',');
  const lines = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < allTextLines.length; i++) {
    const data = allTextLines[i].split(',');
    if (data.length === headers.length) {
      const tarr = [];
      for (let j = 0; j < headers.length; j++) {
        tarr.push(data[j]);
      }
      lines.push(tarr);
    }
  }
  return lines;
};

const serializeCsvData = (
  rows: Array<[number, string, string, string, string]>
) => {
  const quesDict: {
    [key: number]: IQuestion[];
  } = {};

  rows.forEach((row) => {
    if (!quesDict[row[0]]) {
      quesDict[row[0]] = [];
    }
    quesDict[row[0]].push({
      level: row[0],
      en: row[1].trim(),
      meanings: [row[2].trim(), row[3].trim()],
    });
  });
  return quesDict;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private csvURL = 'assets/data/data.csv';
  levels = [];
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get(this.csvURL, { responseType: 'text' }).subscribe(
      (data) => {
        const serializeData = serializeCsvData(csvToArr(data));
        this.dataService.setQuesDictFromHome(serializeData);
        this.levels = Object.keys(serializeData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClickLevel(level: number) {
    this.dataService.setQuestionsFromHome(level);
    this.router.navigate([`level/${level}`], { skipLocationChange: true });
  }
}

import { Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import AppInterface from './app-interface.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AppInterface {
  title: string = 'counter-app';
  timer: string | any = '00:00:00';
  timerStart: boolean = false;
  hourCounter: number | any;
  minCounter: number | any;
  secCounter: number | any;
  subscription: any;
  timerCounterInterval: any;
  clickCounter: number = 0;
  observable: Observable<string> = new Observable((subscriber: any): void => {
    this.timerCounterInterval = setInterval(() => {
      if (!this.secCounter) {
        this.resetTimer();
      }
      this.secCounter++;
      if (this.secCounter > 59) {
        this.secCounter = 0;
        this.minCounter++;
      } else if (this.minCounter > 59) {
        this.minCounter = 0;
        this.hourCounter++;
      } else if (this.hourCounter > 23) {
        this.hourCounter = 0;
      }
      let hours: string | number =
        this.hourCounter < 10 ? `0${this.hourCounter}` : this.hourCounter;
      let minutes: string | number =
        this.minCounter < 10 ? `0${this.minCounter}` : this.minCounter;
      let seconds: string | number =
        this.secCounter < 10 ? `0${this.secCounter}` : this.secCounter;
      let value: string = `${hours}:${minutes}:${seconds}`;
      subscriber.next(value);
    }, 1000);
  });
  start(): void {
    if (!this.timerStart) {
      this.timerStart = !this.timerStart;
      this.subscription = this.observable.subscribe((value: string) => {
        this.timer = value;
      });
    } else {
      this.resetTimer();
      this.timerStart = !this.timerStart;
      clearInterval(this.timerCounterInterval);
      this.subscription.unsubscribe();
    }
  }
  wait(): void {
    this.clickCounter++;
    const source: Observable<any> = timer(300);
    source.subscribe(() => {
      if (this.clickCounter == 2) {
        this.timerStart = !this.timerStart;
        clearInterval(this.timerCounterInterval);
      }
      this.clickCounter = 0;
    });
  }
  reset(): void {
    this.resetTimer();
  }
  resetTimer(): void {
    this.hourCounter = 0;
    this.minCounter = 0;
    this.secCounter = 0;
  }
}

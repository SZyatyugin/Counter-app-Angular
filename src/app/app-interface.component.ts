import { Observable } from 'rxjs';

interface AppInterface {
  title: string;
  timer: string | any;
  timerStart: boolean;
  hourCounter: any | number;
  minCounter: any | number;
  secCounter: any | number;
  subscription: any;
  timerCounterInterval: any;
  clickCounter: number;
  observable: Observable<string>;
  start(): void;
  wait(): void;
  reset(): void;
  resetTimer(): void;
}
export default AppInterface;

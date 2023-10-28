import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();

  //Recivimos el placeHolder
  @Input()
  public placeholder: string = '';
  //Emitimos el valor
  // @Output()
  // public onValue = new EventEmitter<string>();

  //Emitimos el valor
  @Output()
  public onDebouncer = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => this.onDebouncer.emit(value));
  }

  // emitValue(value: string): void {
  //   this.onValue.emit(value);
  // }

  onKeyPress(term: string): void {
    this.debouncer.next(term);
  }
}

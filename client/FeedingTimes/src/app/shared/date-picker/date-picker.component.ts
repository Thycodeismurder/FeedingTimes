import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Output() dateChange = new EventEmitter<Date>();
  date = new FormControl(new Date());

  constructor() {}

  ngOnInit(): void {
    this.dateChanged();
  }
  dateChanged() {
    if (this.date.value) this.dateChange.emit(this.date.value);
  }
  nextMonth() {
    if (this.date.value) {
      this.date.setValue(
        new Date(this.date.value.setMonth(this.date.value.getMonth() + 1))
      );
    }
  }
  previousMonth() {
    if (this.date.value)
      this.date.setValue(
        new Date(this.date.value.setMonth(this.date.value.getMonth() - 1))
      );
  }
  setToday() {
    this.date.setValue(new Date());
  }
}

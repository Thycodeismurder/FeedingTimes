import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TimeFrame } from 'src/services/Activity';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Output() dateChange = new EventEmitter<Date[]>();
  @Output() daterangeChange = new EventEmitter<TimeFrame>();
  calendarView: 'month' | 'year' | 'multi-year' = 'month';
  date = new FormControl(new Date());
  dateRange: Date[] = [new Date(), new Date()];
  selectedDaterange: TimeFrame = 'day';

  constructor() {}
  ngOnInit(): void {
    this.dateChanged();
  }
  dateRangeChanged(date: Date[]) {
    this.dateRange = date;
    this.dateChange.emit(this.dateRange);
  }
  dateChanged() {
    if (this.date.value) this.dateChange.emit([this.date.value]);
  }
  selectDaterange(daterange: TimeFrame) {
    this.selectedDaterange = daterange;
    this.daterangeChange.emit(daterange);
    if (daterange === 'day' || daterange === 'month') {
      this.dateChanged();
    } else {
      this.dateRangeChanged(this.dateRange);
    }
    this.changeCalendarView(daterange);
  }
  changeCalendarView(dateRange: TimeFrame) {
    if (dateRange === 'day') {
      this.calendarView = 'month';
    } else if (dateRange === 'month' || dateRange === 'week') {
      this.calendarView = 'year';
    }
  }
  nextMonth() {
    if (this.date.value) {
      this.date.setValue(
        new Date(this.date.value.setMonth(this.date.value.getMonth() + 1))
      );
      this.dateChanged();
    }
  }
  previousMonth() {
    if (this.date.value)
      this.date.setValue(
        new Date(this.date.value.setMonth(this.date.value.getMonth() - 1))
      );
    this.dateChanged();
  }
  setToday() {
    this.date.setValue(new Date());
    this.dateChanged();
  }
}

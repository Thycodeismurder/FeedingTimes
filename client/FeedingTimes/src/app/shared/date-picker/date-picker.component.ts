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
  selectedCalendarView: TimeFrame = 'day';

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
  selectDaterange(calendarView: TimeFrame) {
    this.selectedCalendarView = calendarView;
    this.daterangeChange.emit(calendarView);
    if (calendarView === 'day') this.dateChanged();
    this.changeCalendarView(calendarView);
  }
  changeCalendarView(calendarView: TimeFrame) {
    if (calendarView === 'day') {
      this.calendarView = 'month';
    } else if (calendarView === 'month' || calendarView === 'week') {
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

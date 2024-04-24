import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TimeFrame } from 'src/services/Activity';
import { createFiveDayRange } from '../functions/groupActivitiesByTime';

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
    console.log('dateRangeChanged', date);
    this.date.setValue(date[0]);
    this.dateRange = date;
    this.dateChange.emit(this.dateRange);
  }
  dateChanged() {
    console.log('datechanged', this.date.value);
    if (this.date.value) {
      this.dateRange[0] = new Date(this.date.value);
      this.dateChange.emit([this.date.value]);
    }
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
      if (
        this.selectedCalendarView === 'month' ||
        this.selectedCalendarView === 'day'
      ) {
        this.dateChanged();
      } else {
        this.dateRange = [
          createFiveDayRange(new Date(this.date.value)).start,
          createFiveDayRange(new Date(this.date.value)).end,
        ];
        this.dateRangeChanged(this.dateRange);
      }
    }
  }
  previousMonth() {
    if (this.date.value) {
      this.date.setValue(
        new Date(this.date.value.setMonth(this.date.value.getMonth() - 1))
      );
      if (
        this.selectedCalendarView === 'month' ||
        this.selectedCalendarView === 'day'
      ) {
        this.dateChanged();
      } else {
        this.dateRange = [
          createFiveDayRange(new Date(this.date.value)).start,
          createFiveDayRange(new Date(this.date.value)).end,
        ];
        this.dateRangeChanged(this.dateRange);
      }
    }
  }
  setToday() {
    this.date.setValue(new Date());
    if (
      this.selectedCalendarView === 'month' ||
      this.selectedCalendarView === 'day'
    ) {
      this.dateChanged();
    } else {
      this.dateRange = [
        createFiveDayRange(new Date()).start,
        createFiveDayRange(new Date()).end,
      ];
      this.dateRangeChanged(this.dateRange);
    }
  }
}

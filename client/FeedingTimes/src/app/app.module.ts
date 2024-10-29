import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontPageComponent } from './front-page/front-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { ActionFormViewComponent } from './action-form-view/action-form-view.component';
import { FormComponent } from './action-form-view/form/form.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { BottomNavComponent } from './shared/bottom-nav/bottom-nav.component';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { MonthComponent } from './calendar-view/month/month.component';
import { DayComponent } from './calendar-view/day/day.component';
import { WeekComponent } from './calendar-view/week/week.component';
import { ActivityComponent } from './calendar-view/activity/activity.component';
import { MatProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransformIconsPipe } from './pipes/transform-icons.pipe';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DatePickerWeekDayRangeComponent } from './shared/date-picker-week-day-range/date-picker-week-day-range.component';
import { DatePickerMonthRangeComponent } from './shared/date-picker-month-range/date-picker-month-range.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    CalendarViewComponent,
    ActionFormViewComponent,
    FormComponent,
    TopNavComponent,
    BottomNavComponent,
    MonthComponent,
    DayComponent,
    WeekComponent,
    ActivityComponent,
    TransformIconsPipe,
    DatePickerComponent,
    DatePickerWeekDayRangeComponent,
    DatePickerMonthRangeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

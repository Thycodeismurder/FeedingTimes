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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MonthComponent } from './calendar-view/month/month.component';
import { DayComponent } from './calendar-view/day/day.component';
import { WeekComponent } from './calendar-view/week/week.component';
import { ActivityComponent } from './calendar-view/activity/activity.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventComponent } from './calendar-view/event/event.component';
import { TransformEventDataPipe } from '../../pipes/transform-event-data.pipe';
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
    EventComponent,
    TransformEventDataPipe,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

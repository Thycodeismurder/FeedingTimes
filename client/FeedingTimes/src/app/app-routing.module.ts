import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { ActionFormViewComponent } from './action-form-view/action-form-view.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'calendar', component: CalendarViewComponent },
  { path: 'action-form', component: ActionFormViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

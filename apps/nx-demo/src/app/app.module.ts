import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UiCalendarModule } from '@engineering11/ui-calendar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiCalendarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

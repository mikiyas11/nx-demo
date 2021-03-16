import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { UiCalendarModule } from '@nx-demo/ui-calendar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

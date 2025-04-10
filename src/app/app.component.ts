import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatButton } from '@angular/material/button';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatSidenavModule, MatListModule, MatButton, CarouselComponent, ToolbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'santos-cafe';

  scroll(el: HTMLElement) {
    el.scrollIntoView();
    console.log("Scrolling to " + el.innerText)
  }

}

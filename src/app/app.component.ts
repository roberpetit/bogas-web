import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import { MatButton } from '@angular/material/button';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { S3Client, ListBucketsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";

export const REGION = "us-east-2";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatSidenavModule, MatListModule, MatButton, CarouselComponent, ToolbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('sidenav2') sidenav2!: MatSidenav;
  title = 'santos-cafe';

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const client = new S3Client({ region: "us-east-1",
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: "us-east-2" }, 
        identityPoolId: 'us-east-2:034028c7-b225-4f50-8d10-ff7d179d024a',
      })
    });

    client.send(new GetObjectCommand({Bucket: 'santoscafe', Key: 'menu/pag1.jpeg'})).then((data) => {
      console.log("Data 1: ", data);
    }, error => {
      console.error("Error: ", error);
    });

    client.send(new ListBucketsCommand({})).then((data) => {
      console.log("Data 2: ", data);
    }, error => {
      console.error("Error: ", error);
    });

  }

  scroll(el: HTMLElement) {
    this.sidenav.close();
    this.sidenav2.close();
    el.scrollIntoView();
    console.log("Scrolling to " + el.innerText)
  }

}

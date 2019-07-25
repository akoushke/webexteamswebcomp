import { Component, OnInit } from '@angular/core';
import '../../../../src/webComponents/avatar';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  private src: string;
  private obj: Object;
  
  ngOnInit(){ 
    this.src = 'https://8e325148c33e40909d40-0b990d1d119de8e505829619be483465.ssl.cf1.rackcdn.com/V1~47c32d0b-0444-460d-8bce-2265b501aac5~bfc8719afb284d998b25362fbffc7d43~1600';
    this.obj = {
      a: 1
    };
  }

}
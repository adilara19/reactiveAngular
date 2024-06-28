import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Reactive Angular';

  title$ = new Observable((observable) => {
    setInterval(() => observable.next(), 1000);
    //Callback() sayesinde subscribe olan nesneleri denetlemek zorunda kalmadan eşzamanlı olarak gözlemleyebiliyoruz.
  }); //Observable olan nesnelere $ ile biten isimler veriyoruz. Yani sonunda $ varsa, observable olduğunu anlıyoruz.

  constructor() {}

  // Reactive js (Rxjs) kütüphanesi, bir nesne üzerinde yapılan değişikliklere subscribe olduktan sonra otomatik çağrı gönderen bir pattern'dir.
  

  start() {
    this.title$.subscribe(() => {
      let timeStamp = new Date().getSeconds();
      this.title = 'Rxjs nedir? ' + timeStamp.toString();
    });
  }

  // add(){
  //   console.log(this.title$.pipe(tap(x=>console.log(x))));
  // }
}

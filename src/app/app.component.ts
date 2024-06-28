import { Component } from '@angular/core';
import { Observable, filter, of, map, catchError, tap} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  baslik = 'Reactive Angular';

  title$ = new Observable((observable) => {
    setInterval(() => observable.next(), 1000);
    //Callback() sayesinde subscribe olan nesneleri denetlemek zorunda kalmadan eşzamanlı olarak gözlemleyebiliyoruz.
  }); //Observable olan nesnelere $ ile biten isimler veriyoruz. Yani sonunda $ varsa, observable olduğunu anlıyoruz.

  
  constructor() {

  // Reactive js (Rxjs) kütüphanesi, bir nesne üzerinde yapılan değişikliklere subscribe olduktan sonra otomatik çağrı gönderen bir pattern'dir.

  this.title$.subscribe(() => {
    let timeStamp = new Date().getSeconds();
    this.baslik = 'Rxjs nedir? ' + timeStamp.toString();
  });

  const values = of(2, 3, 4, 8, 9, 10, 7);

  values.pipe(
    filter((x: any)=> x % 2 === 0),
    map((m: any) => Math.pow(m,2)), // map ile koleksiyonu değiştirdik
    catchError(err => { // catchError ile hata yakalayabiliriz
      console.log(err);
      return of('Bir hata oluştu, lütfen tekrar deneyin.' +err);
    })
  ).subscribe((data: any) => console.log(data), 
              (err) => console.log(err),
              () => console.log('İşlem Tamamlandı'));

  // Observable koleksiyonumuzu arraydaki çift sayıların karesini getirecek şekilde manipüle etmeyi başardık.            
}





  }

  // add(){
  //   console.log(this.title$.pipe(tap(x=>console.log(x))));
  // }


import { Component, OnInit } from '@angular/core';
import { Observable, filter, of, map, catchError, tap } from 'rxjs';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  baslik = 'Reactive Angular';

  title$ = new Observable((observable) => {
    setInterval(() => observable.next(), 1000);
    //Callback() sayesinde subscribe olan nesneleri denetlemek zorunda kalmadan eşzamanlı olarak gözlemleyebiliyoruz.
  }); //Observable olan nesnelere $ ile biten isimler veriyoruz. Yani sonunda $ varsa, observable olduğunu anlıyoruz.

  products: Product[] = [
    new Product(1, 'Ayakkabı', 100, 0.15, 0),
    new Product(2, 'Çanta', 100, 0.25, 0),
    new Product(3, 'Gözlük', 100, 0.1, 0),
    new Product(4, 'Elbise', 100, 0.13, 0),
  ];

  products$ = of(this.products);

  constructor() {
    // Reactive js (Rxjs) kütüphanesi, bir nesne üzerinde yapılan değişikliklere subscribe olduktan sonra otomatik çağrı gönderen bir pattern'dir.

    this.title$.subscribe(() => {
      let timeStamp = new Date().getSeconds();
      this.baslik = 'Rxjs nedir? ' + timeStamp.toString();
    });

    const values = of(2, 3, 4, null, 8, 9, 10, 7);

    values
      .pipe(
        filter((x: any) => x % 2 === 0),
        map((m: any) => {
          if (m === null) {
            throw new Error('Olmaz Bu!');
          }
          return Math.pow(m, 2);
        }), // map ile koleksiyonu değiştirdik
        catchError((err) => {
          // catchError ile hata yakalayabiliriz
          console.log(err);
          return of('Bir hata oluştu, lütfen tekrar deneyin.' + err);
        })
      )
      .subscribe(
        (data: any) => console.log(data),
        (err) => console.log(err),
        () => console.log('İşlem Tamamlandı')
      );

    // Observable koleksiyonumuzu arraydaki çift sayıların karesini getirecek şekilde manipüle etmeyi başardık.
  }

  ngOnInit(): void {
    this.products$.pipe(
        map((productArray) =>
          productArray.map(
            // Product Instance'ı Oluştur:
            (p) => new Product(p.id, p.name, p.price, p.discount, p.discountedPrice = p.price * (1 - p.discount))
          )
        )
      ).subscribe((data) => console.log(this.products = data));
  }
}

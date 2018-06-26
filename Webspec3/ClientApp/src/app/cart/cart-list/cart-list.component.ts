/**
 *  @author Daniel Rotärmel
 */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { AuthService } from './../../services/auth.service';
import { CartService } from './../cart.service';
import { OrderOverviewComponent } from './../order-overview/order-overview.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  @Input('card') card;

  public order$: Observable<any>;

  constructor(
    public dialog: MatDialog,
    public cartService: CartService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cartService.init();
  }

  doOrder(): void {
    if (this.cartService.orderableCart !== {}) {
      this.order$ = this.cartService.orderCart();
      this.order$.subscribe(res => {
        this.card.popover.close();
        this.openDialog(res);
      });
    }
  }

  openDialog(data: any): void {
    let dialogRef = this.dialog.open(OrderOverviewComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}

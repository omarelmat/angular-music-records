import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus',
  standalone: true
})
export class StockStatusPipe implements PipeTransform {
  transform(stockQty: number | undefined): string {
    if (!stockQty || stockQty === 0) {
      return 'Out of Stock';
    } else if (stockQty > 0 && stockQty <= 5) {
      return 'Low Stock';
    } else {
      return 'In Stock';
    }
  }
}

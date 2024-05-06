import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/interfaces/Category';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input()
  categories: Category[] = [];
  @Input()
  product?: Product;
  @Input()
  isEditing: boolean = false;

  @Output()
  salvarEmitt = new EventEmitter();
  @Output()
  cancelEmitt = new EventEmitter();
  @Output()
  editEmitt = new EventEmitter();

  save() {
    this.salvarEmitt.emit();
  }

  cancel() {
    this.cancelEmitt.emit();
  }

  editProduct() {
    this.editEmitt.emit();
  }

  selectedCategory(catForm: Category, catProd: Category) {
    return catForm && catProd ? catForm.id === catProd.id : false;
  }
}

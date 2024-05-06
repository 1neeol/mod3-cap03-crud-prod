import { Component, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/interfaces/Category';
import { Product } from 'src/app/interfaces/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  categories: Category[] = [];
  product: Product = {} as Product;
  productToDelete: Product = {} as Product;
  listProducts: Product[] = [];
  showForm: boolean = false;
  isEditingProduct: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //this.categories = this.categoryService.getCategories();
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
    });
  }

  loadProducts() {
    this.productService.getProductsArray().subscribe({
      next: (data) => {
        this.listProducts = data;
      },
    });
  }

  saveProduct() {
    this.productService.setProductArray(this.product).subscribe({
      next: (data) => {
        this.listProducts.push(data);
        this.showForm = false;
        this.product = {} as Product;
      },
    });
  }

  cancelNewproductForm() {
    this.showForm = false;
    this.product = {} as Product;
  }

  showCreateForm() {
    this.showForm = true;
    this.isEditingProduct = false;
  }

  deleteProduct(modal: any, product: Product) {
    this.productToDelete = product;
    this.modalService.open(modal).result.then((confirm) => {
      if (confirm) {
        this.productService.deleteProduct(product).subscribe({
          next: () => {
            this.listProducts = this.listProducts.filter(
              (p) => p.id !== product.id
            );
          },
        });
      }
    });
  }

  editProduct(product: Product) {
    this.product = product;
    this.showForm = true;
    this.isEditingProduct = true;
  }

  sendEditProductService() {
    this.productService.editProduct(this.product).subscribe();
    this.showForm = false;
    this.isEditingProduct = false;
  }
}

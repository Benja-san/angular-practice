import { Component, Input } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  private _categories?: Category[];
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this._categories = this.categoryService.categories;
  }

  public get categories(): Category[] {
    return this._categories ?? [];
  }

  public set categories(value: Category[]) {
    this._categories = value;
  }
}

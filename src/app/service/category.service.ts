import { Injectable, inject } from '@angular/core';
import { Category } from '../model/category';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  router: Router = inject(Router);

  private _categories: Category[] = [
    new Category(1, 'Reality TV', 'reality-tv'),
    new Category(2, 'Documentary', 'documentary'),
    new Category(3, 'Cooking', 'cooking'),
    new Category(4, 'Travel', 'travel'),
    new Category(5, 'Music', 'music'),
    new Category(6, 'Comedy', 'comedy'),
    new Category(7, 'Drama', 'drama'),
    new Category(8, 'Action', 'action'),
    new Category(9, 'Horror', 'horror'),
  ];

  constructor() {}

  public get categories(): Category[] {
    return this._categories;
  }

  public set categories(value: Category[]) {
    this._categories = value;
  }

  public getOneBySlug(slug: string): Category | void {
    const category = this._categories.find(
      (category) => category.slug === slug
    );
    if (category) {
      return category;
    }
    this.router.navigate(['/not-found']);
  }

  public getThreeRandomly(currentCategory: string): Category[] {
    const filteredCategories = this._categories.filter(
      (category) => category.slug !== currentCategory
    );
    return filteredCategories.sort(() => Math.random() - 0.5).slice(0, 3);
  }
}

import { Injectable, inject } from '@angular/core';
import { Category } from '../model/Category';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

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

  readonly apiUrl: string = 'https://api.themoviedb.org/3/';
  readonly apiToken: string =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWJkZGE1YThiY2EwNDlmNTExOTNlMzVjNmRiZTBkMyIsInN1YiI6IjY1ZDM2YmI5MTI0MjVjMDE2M2UzZjIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bbOt4-jlpQXcEce62NZ7h_2pNVQ6t0sFyeu2ErcmtCs';

  readonly headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: this.apiToken,
  };

  constructor() {}

  public get categories(): Category[] {
    return this._categories;
  }

  public set categories(value: Category[]) {
    this._categories = value;
  }

  public getAllFromApi(): Category[] {
    this.http
      .get(`${this.apiUrl}genre/movie/list?language='en'`, {
        headers: this.headers,
      })
      .subscribe((response: any) => {
        this._categories = response.genres.map(
          (category: Pick<Category, 'id' | 'name'>) => {
            const newOne: Category = new Category(
              category.id,
              category.name,
              category.name
            );
            return newOne;
          }
        );
      });
    return this._categories.length > 0 ? this._categories : [];
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

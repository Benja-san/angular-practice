import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  categorySlug?: string;
  category?: Category | void;
  randomCategories?: Category[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = this.categoryService.getOneBySlug(
        params.get('categorySlug') as string
      );

      this.randomCategories = this.categoryService.getThreeRandomly(
        params.get('categorySlug') as string
      );
    });
  }
}

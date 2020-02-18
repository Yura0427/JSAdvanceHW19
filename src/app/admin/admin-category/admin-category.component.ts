import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/category.interfaces';
import { Category } from 'src/app/shared/classes/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  addStatus: boolean;
  nameCategoryVal: string;

  categoryName: string;
  arrCategory: Array<ICategory> = [];

  searchVal: string;
  searchCategory: Array<ICategory> = [];

  categoryID: number;
  editStatus: boolean;

  constructor(private modalService: BsModalService, private prService: CategoryService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    this.getCategory();
  }

  categoryVal() {
    this.nameCategoryVal ? this.addStatus = true : this.addStatus = false;
  }

  private getCategory(): void {
    this.prService.getJSONCategory().subscribe(
      data => {
        this.arrCategory = data;
        this.searchCategory = data;
      }
    );
  }

  addCategory() {
    const newC = new Category(1, this.nameCategoryVal);
    if (this.arrCategory.length > 0) {
      newC.id = this.arrCategory.slice(-1)[0].id + 1;
    }
    if (!this.editStatus) {
      this.prService.postJSONCategory(newC).subscribe(
        () => {
          this.getCategory();
        }
      )
    }
    else {
      newC.id = this.categoryID;
      this.prService.updateJSONCategory(newC).subscribe(
        () => {
          this.getCategory();
        }
      );
    }
    this.editStatus = false;
    this.modalRef.hide();
    this.nameCategoryVal = ''
  }

  deleteCategory(category: ICategory, template): void {
    this.modalRef = this.modalService.show(template);
    this.categoryID = category.id
  }

  acceptDel() {
    this.prService.deleteJSONCategory(this.categoryID).subscribe(
      () => {
        this.getCategory();
      }
    )
    this.modalRef.hide()
  }

  editCategory(category: ICategory, template): void {
    this.modalRef = this.modalService.show(template);
    this.nameCategoryVal = category.categoryName;
    this.categoryID = category.id
    this.editStatus = true;
  }

  search() {
    this.searchCategory = this.arrCategory.filter(el => el.categoryName.toLowerCase().indexOf(this.searchVal.toLowerCase()) !== -1);
  }


}
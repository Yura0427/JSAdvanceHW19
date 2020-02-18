import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces/category.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/category';
   }


   getJSONCategory(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url);
  }

  postJSONCategory(category: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(this.url, category);
  }

  deleteJSONCategory(id: number): Observable<Array<ICategory>> {
    return this.http.delete<Array<ICategory>>(`${this.url}/${id}`);
  }
  updateJSONCategory(category: ICategory): Observable<Array<ICategory>> {
    return this.http.put<Array<ICategory>>(`${this.url}/${category.id}`, category);
  }
  // getOneCategory(id:number): Observable<ICategory>{
  //   return this.http.get<ICategory>(`${this.url}/${id}`);
  // }




}

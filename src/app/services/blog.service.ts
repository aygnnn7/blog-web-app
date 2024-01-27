import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService{
  constructor(private base:BaseService) {
    super(base.http);
  }
  public getPosts(){
    return this.base.getReq("/posts");
  }
}

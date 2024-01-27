import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { CommentService } from '../../../services/comment.service';
@Component({
  selector: 'app-blog-dialog',
  standalone: true,
  imports: [BlogDialogComponent,MatIcon,MatDivider, NgIf, NgTemplateOutlet,NgFor],
  templateUrl: './blog-dialog.component.html',
  styleUrl: './blog-dialog.component.css'
})
export class BlogDialogComponent {
  isUpdate:boolean = false;
  imageUrl:string;
  title: string;
  body:string;
  commentData: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<BlogDialogComponent>, 
    private commentService: CommentService){
    
    this.isUpdate = data.isUpdate ? true : false;
    if(this.isUpdate){
      
    }else{
      this.imageUrl = data.blog.imageId.toString();
      this.title = data.blog.title;
      this.body = data.blog.body;
    }
    
  }

  ngOnInit():void{
    this.commentService.getComments().subscribe((res) => {
      this.commentData = res.filter((x: { postId: any; }) => x.postId == this.data.blog.id);
    });
    
  }

  close(){
    this.dialogRef.close();
  }
}

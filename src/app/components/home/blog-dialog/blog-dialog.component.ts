import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommentService } from '../../../services/comment.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
@Component({
  selector: 'app-blog-dialog',
  standalone: true,
  imports: [
    BlogDialogComponent,
    MatIcon,
    MatDivider,
    NgIf,
    NgTemplateOutlet,
    NgFor,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInputModule

  ],
  templateUrl: './blog-dialog.component.html',
  styleUrl: './blog-dialog.component.css'
})
export class BlogDialogComponent {
  isUpdate: boolean = false;
  imageUrl: string;
  title: string;
  body: string;
  commentData: any;
  blogElement: any;

  form = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    body: new FormControl(null, [Validators.required, Validators.minLength(70)])
  })

  constructor(@Inject(
    MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<BlogDialogComponent>,
    private commentService: CommentService,
    private blogService: BlogService) {

    this.isUpdate = data.isUpdate ? true : false;
    if (this.isUpdate) {
      this.form.patchValue({
        title: data.blog.title,
        body: data.blog.body
      })
      this.blogElement = data.blog;
    } else {
      this.imageUrl = data.blog.imageId.toString();
      this.title = data.blog.title;
      this.body = data.blog.body;
    }
  }

  ngOnInit(): void {
    this.commentService.getComments().subscribe((res) => {
      this.commentData = res.filter((x: { postId: any; }) => x.postId == this.data.blog.id);
    });
  }

  close() {
    this.dialogRef.close();
    console.log(this.form.controls.title.errors);
  }

  onsubmit() {
    const request = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      imageId: this.data.blog.imageId,
      userId: this.data.blog.userId,

    };
    this.blogService
      .updatePost(this.data.blog.id, request)
      .subscribe(res => {
        this.blogElement.title = res.title;
        this.blogElement.body = res.body;
        this.close();

      })
  }

}

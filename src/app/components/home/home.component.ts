import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BlogService } from '../../services/blog.service';
import { NgFor, SlicePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';

import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgFor,
    NgbModule,
    SlicePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [BlogService]
})
export class HomeComponent {
  constructor(private blogService: BlogService, public dialog: MatDialog) { }
  blogData: Array<any>;
  pageSize = 8;
  page = 13;
  ngOnInit(): void {
    this.blogService.getPosts().subscribe((res) => {
      this.blogData = res;
    });
  }

  openDialog(element: any, vieworupdate: any): void {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      data: { blog: element, isUpdate: vieworupdate }
    })
    dialogRef.afterClosed().subscribe(() => {

    })
  }
}

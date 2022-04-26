import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AttachmentService } from 'src/app/_services/attachment.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.sass']
})
export class AttachmentsComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  itemId!: number;

  constructor(private attachmentService: AttachmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];
    this.fileInfos = this.attachmentService.getAll(this.itemId);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.attachmentService.upload(this.itemId, this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.attachmentService.getAll(this.itemId);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = 'Не удалось загрузить файл';
            }

            this.currentFile = undefined;
          });
      }
      
      this.selectedFiles = undefined; 
    }
  }

  delete(url: string) {
    let tempStrArr = url.split('/');
    let fileId: number = Number.parseInt(tempStrArr[tempStrArr.length - 1]);
    this.attachmentService.delete(fileId).subscribe({
      next: data => {
        this.message = data.body.message;
      },
      error: error => {
        this.message = error.body.message;
      }
    });
  }
}

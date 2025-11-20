import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Api } from '../../services/api';

@Component({
  selector: 'app-gallery-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-dashboard.html',
  styleUrl: './gallery-dashboard.scss'
})
export class GalleryDashboard {
  galleryData: any = [];
  id: any = '';
  isEdit: boolean = false;
  selectedGalleryForm: FormGroup;
  constructor(private apiService: Api, private sanitizer: DomSanitizer, private fb: FormBuilder) {
    this.selectedGalleryForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      imagesUrl: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.getGalleryData()
  }

  sanitizerUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getGalleryData() {
    this.apiService.getGallery().subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          res.data.map((obj: any) => {
            obj['images'] = obj.imagesUrl.split(",")
          })
          this.galleryData = res.data;
        }
      }, error(error: any) {
        const status = error?.error?.status;
        const errMsg = error?.error?.error || 'Unknown error occurred';
        console.error(`Status: ${status}, Message: ${errMsg}`);
        // alert(errMsg);
      }
    })
  }
  submitGallery() {
    if (this.isEdit) {
      this.apiService.updateGallery(this.id, this.selectedGalleryForm.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] === 'Y') {
            alert(res.message);
            this.selectedGalleryForm.reset();
            this.getGalleryData();
          }
        }, error(error: any) {
          const status = error?.error?.status;
          const errMsg = error?.error?.error || 'Unknown error occurred';
          console.error(`Status: ${status}, Message: ${errMsg}`);
          // alert(errMsg);
        }
      })
    }
    else {
      this.apiService.saveGallery(this.selectedGalleryForm.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] === 'Y') {
            alert(res.message);
            this.selectedGalleryForm.reset();
            this.getGalleryData();
          }
        }, error(error: any) {
          const status = error?.error?.status;
          const errMsg = error?.error?.error || 'Unknown error occurred';
          console.error(`Status: ${status}, Message: ${errMsg}`);
          // alert(errMsg);
        }
      })
    }
  }
  formatDate(date: any): string {
    const d = new Date(date);
    return d.toISOString().substring(0, 10); // "2025-11-13"
  }

  edit(data: any) {
    this.isEdit = true;
    this.selectedGalleryForm.patchValue({
      title: data.title,
      date: this.formatDate(data.date),
      imagesUrl: data.imagesUrl
    })
    this.id = data._id;
  }
  deleteGallery(id: string) {
    this.apiService.deleteGallery(id).subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          alert(res.message);
          this.getGalleryData();
        }
      }, error(error: any) {
        const status = error?.error?.status;
        const errMsg = error?.error?.error || 'Unknown error occurred';
        console.error(`Status: ${status}, Message: ${errMsg}`);
        // alert(errMsg);
      }
    })
  }
}

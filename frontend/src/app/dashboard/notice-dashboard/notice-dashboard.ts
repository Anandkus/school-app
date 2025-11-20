import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notice-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notice-dashboard.html',
  styleUrl: './notice-dashboard.scss'
})
export class NoticeDashboard {
  noticeData: any = [];
  id: any = '';
  isEdit: boolean = false;
  selectedNoticeForm: FormGroup;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.selectedNoticeForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.getNoticeData()
  }

  getNoticeData() {
    this.apiService.getNotices().subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          this.noticeData = res.data;
        }
      }, error(error: any) {
        const status = error?.error?.status;
        const errMsg = error?.error?.error || 'Unknown error occurred';
        console.error(`Status: ${status}, Message: ${errMsg}`);
        // alert(errMsg);
      }
    })
  }
  submitNotice() {
    if (this.isEdit) {
      this.apiService.updateNotices(this.id, this.selectedNoticeForm.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] === 'Y') {
            alert(res.message);
            this.selectedNoticeForm.reset();
            this.getNoticeData();
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
      this.apiService.saveNotices(this.selectedNoticeForm.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] === 'Y') {
            alert(res.message);
            this.selectedNoticeForm.reset();
            this.getNoticeData();
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
    this.selectedNoticeForm.patchValue({
      title: data.title,
      date: this.formatDate(data.date),
      category: data.category,
      description: data.description,
    })
    this.id = data._id;
  }
  deleteNotice(id: string) {
    this.apiService.deleteNotices(id).subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          alert(res.message);
          this.getNoticeData();
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

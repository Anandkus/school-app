import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teachers-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teachers-dashboard.html',
  styleUrl: './teachers-dashboard.scss'
})
export class TeachersDashboard {
  teacherData: any = [];
  id: any = '';
  isEdit: boolean = false;
  selectedTeacherForm: FormGroup;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.selectedTeacherForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      bio: ['', Validators.required],
      image: ['', Validators.required],
      designation: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.getTeacherData();
  }

  getTeacherData() {
    this.apiService.getTeacher().subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          this.teacherData = res.data;
        }
      }, error(error: any) {
        const status = error?.error?.status;
        const errMsg = error?.error?.error || 'Unknown error occurred';
        console.error(`Status: ${status}, Message: ${errMsg}`);
        // alert(errMsg);
      }
    })
  }
  submitTeacher() {
    if (this.isEdit) {
      this.apiService.updateTeacher(this.id, this.selectedTeacherForm.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] === 'Y') {
            alert(res.message);
            this.selectedTeacherForm.reset();
            this.getTeacherData();
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
      this.apiService.saveTeacher(this.selectedTeacherForm.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] === 'Y') {
            alert(res.message);
            this.selectedTeacherForm.reset();
            this.getTeacherData();
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

  edit(data: any) {
    this.isEdit = true;
    this.selectedTeacherForm.patchValue({
      name: data.name,
      subject: data.subject,
      bio: data.bio,
      image: data.image,
      designation: data.designation
    })
    this.id = data._id;
  }
  deleteTeacher(id: string) {
    this.apiService.deleteTeacher(id).subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          alert(res.message);
          this.getTeacherData();
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

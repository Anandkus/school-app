import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teachers',
  imports: [CommonModule],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers {
  teachers: any = [];
  constructor(private apiService: Api) { }

  ngOnInit() {
    this.Teachers();
  }
  Teachers() {
    this.apiService.getTeacher().subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
         this.teachers = res.data;
        }
      },
      error(error: any) {
        console.error("error : ", error)
      }
    })
  }
}

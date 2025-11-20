import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './events-dashboard.html',
  styleUrl: './events-dashboard.scss'
})
export class EventsDashboard {
  eventData: any = [];
  id: any = '';
  isEdit: boolean = false;
  selectedEventForm: FormGroup;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.selectedEventForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      shortDescription: ['', Validators.required],
      time: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.geteventData()
  }

  geteventData() {
    this.apiService.getEvents().subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          this.eventData = res.data;
        }
      }, error(error: any) {
        const status = error?.error?.status;
        const errMsg = error?.error?.error || 'Unknown error occurred';
        console.error(`Status: ${status}, Message: ${errMsg}`);
        // alert(errMsg);
      }
    })
  }
  submitevent() {
    if (this.isEdit) {
      this.apiService.updateEvents(this.id, this.selectedEventForm.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] === 'Y') {
            alert(res.message);
            this.selectedEventForm.reset();
            this.geteventData();
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
      this.apiService.saveEvents(this.selectedEventForm.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] === 'Y') {
            alert(res.message);
            this.selectedEventForm.reset();
            this.geteventData();
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
  convertToAMPM(time: string): string {
  if (!time) return "";

  let [hour, minute] = time.split(":").map(Number);

  let ampm = hour >= 12 ? 'PM' : 'AM';

  if (hour > 12) hour -= 12;   // Convert 13-23 to 1-11 PM
  if (hour === 0) hour = 12;   // Convert 0 to 12 AM

  return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}
  edit(data: any) {
    this.isEdit = true;
    this.selectedEventForm.patchValue({
      title: data.title,
      date: this.formatDate(data.date),
      location: data.location,
      description: data.description,
      shortDescription: data.shortDescription,
      time: data.time,
    })
    this.id = data._id;
  }
  deleteEvent(id: string) {
    this.apiService.deleteEvents(id).subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          alert(res.message);
          this.geteventData();
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

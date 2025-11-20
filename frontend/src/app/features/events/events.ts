import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events {
  events: any = [];
  selecetEvent: any = {
    title: '',
    date: "",
    location: "",
    description: ""
  }
  constructor(private apiService: Api) { }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getEvents();
  }
  getEvents() {
    this.apiService.getEvents().subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          this.events = res.data;
        }
      }, error(error: any) {
        console.error("error : ", error)
      }
    })
  }

  showEvents(event:any){
    this.selecetEvent=event;
  }
}

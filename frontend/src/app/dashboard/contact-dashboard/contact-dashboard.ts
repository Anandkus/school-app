import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact-dashboard',
  imports: [CommonModule],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.scss'
})
export class ContactDashboard {
  constructor(private ApiService: Api) { }
  contactList: any = [];
  showData = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  };
  ngOnInit() {
    this.getContact()
  }
  getContact() {
    this.ApiService.getContact().subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          this.contactList = res.data;
        }
      }, error(error: any) {
        const status = error?.error?.status;
        const errMsg = error?.error?.error || 'Unknown error occurred';
        console.error(`Status: ${status}, Message: ${errMsg}`);
        // alert(errMsg);
      }
    })
  }
  deleteContact(id: any) {
    this.ApiService.deleteContact(id).subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          alert(res.message);
          this.getContact();
        }
      }, error(error: any) {
        const status = error?.error?.status;
        const errMsg = error?.error?.error || 'Unknown error occurred';
        console.error(`Status: ${status}, Message: ${errMsg}`);
        // alert(errMsg);
      }
    })
  }

  ShowContact(data: any) {
    this.showData = data;
  }

}

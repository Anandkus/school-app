import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notice',
  imports: [RouterModule],
  templateUrl: './notice.html',
  styleUrl: './notice.scss'
})
export class Notice {
  notices = '';
  constructor(private apiService: Api) { }
  ngOnInit() {
    this.getNotices()
  }
  getNotices() {
    this.apiService.getNotices().subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          let noticeArray: any = [];
          res.data.map((obj: any) => {
            noticeArray.push(obj.title);
          })
          this.notices = noticeArray.join(", ");
          // console.log("message : ",res.message)
        }
      },
      error(error: any) {
        console.error("error : ", error)
      }
    })
  }

}

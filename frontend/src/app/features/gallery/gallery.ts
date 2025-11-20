import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  galleryData: any = [];
  constructor(private apiService: Api, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getGallery();
  }

  getGallery() {
    this.apiService.getGallery().subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          res.data.map((obj: any) => {
            obj['images'] = obj.imagesUrl.split(',')
          });
          this.galleryData = res.data;
        //  console.log(this.galleryData)
        }
      }, error(error: any) {
        console.error("error : ", error);
      }
    })
  }

  sanitizerUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

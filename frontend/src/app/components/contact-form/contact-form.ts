import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: Api) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  formSave() {
    this.apiService.saveContact(this.contactForm.value).subscribe({
      next: (res: any) => {
        if (res && res['status'] === 'Y') {
          alert(res.message);
          this.contactForm.reset();
        }
      }, error(error: any) {
        console.error("error : ", error);
      }
    })

  }


}

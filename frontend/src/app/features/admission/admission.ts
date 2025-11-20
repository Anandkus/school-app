import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-admission',
  imports: [ReactiveFormsModule],
  templateUrl: './admission.html',
  styleUrl: './admission.scss'
})
export class Admission {
  admissionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.admissionForm = this.fb.group({
      studentDetails: this.fb.group({
        studentName: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(3), Validators.max(18)]],
        bloodGroup: [''],
        religion: ['', Validators.required],
        casteCategory: ['', Validators.required],
        nationality: ['', Validators.required],
        motherTongue: ['', Validators.required],
        aadhar: ['', Validators.required]
      }),
      admissionDetails: this.fb.group({
        admissionClass: ['', Validators.required],
        academicYear: ['', Validators.required],
        prevSchool: [''],
        reasonLeaving: ['']
      }),
      father: this.fb.group({
        name: ['', Validators.required],
        qualification: ['', Validators.required],
        occupation: ['', Validators.required],
        office: [''],
        contact: ['', Validators.required],
        email: [''],
        aadhar: ['', Validators.required],
      }),
      mother: this.fb.group({
        name: ['', Validators.required],
        qualification: ['', Validators.required],
        occupation: ['', Validators.required],
        office: [''],
        contact: ['', Validators.required],
        email: [''],
        aadhar: ['', Validators.required],
      }),
      guardian: this.fb.group({
        name: [''],
        relation: [''],
        contact: [''],
        address: ['']
      }),
      addressDetails: this.fb.group({
        presentAddres: ['', Validators.required],
        permanentAddres: ['', Validators.required],
        emergencyContact: ['', Validators.required],
        altContact: ['', Validators.required]
      }),
      document: this.fb.group({
        studentPhoto: [null, Validators.required]
      }),
      declaration: this.fb.group({
        agree: [false, Validators.requiredTrue],
        declarationDate: ['', Validators.required]
      })
    })
  }
  genratePdf() {
       console.log(this.admissionForm.value);
    const content = document.getElementById("pdf");

    if (content) {
      content.style.display = 'block';
      html2canvas(content).then((canvas) => {
        const imgData = canvas.toDataURL("imgage/png");
        const pdf = new jsPDF("p", 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("admission-form.pdf")
      })
      content.style.display = 'none';
    }
  }
  copyAddress(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const present = this.admissionForm.get('addressDetails.presentAddres');
    const permanent = this.admissionForm.get('addressDetails.permanentAddres');
    if (isChecked && present && permanent) {
      permanent.setValue(present.value);
      permanent.disable();
    }
    else {
      permanent?.enable();
    }
  }

  changeImg(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.admissionForm.get('document.studentPhoto')?.setValue(reader.result)
      };
      reader.readAsDataURL(file);
    }

  }

}

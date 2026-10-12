import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-notes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './progress-notes.component.html'
})
export class ProgressNotesComponent {

  projectCodes: { [code: string]: string } = {
    PPT101: 'Project Progress Tracker',
    WEB202: 'Website Redesign',
    APP303: 'Mobile Application Development',
    DATA404: 'Data Analytics Dashboard'
  };

  codeNotFound = false;

  progressNotesForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl('On Track'),
    teamMember: new FormControl(''),
    progressNote: new FormControl('')
  });

  onProjectCodeChange(): void {
    const code = (
      this.progressNotesForm.get('projectCode')?.value ?? ''
    ).trim().toUpperCase();

    const projectName = this.projectCodes[code];

    if (projectName) {
      this.progressNotesForm.get('projectName')?.setValue(projectName);
      this.codeNotFound = false;
    } else {
      this.progressNotesForm.get('projectName')?.setValue('');
      this.codeNotFound = code.length > 0;
    }
  }
}
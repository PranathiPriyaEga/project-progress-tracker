import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressNotes } from './progress-notes/progress-notes';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgressNotes, MilestoneTracker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'project-progress-tracker';
}
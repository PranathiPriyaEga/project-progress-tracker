import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressNotesComponent } from './progress-notes/progress-notes.component';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressNotesComponent, MilestoneTracker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ProjectProgressTracker';
}
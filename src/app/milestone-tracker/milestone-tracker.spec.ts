import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MilestoneService, Milestone } from '../milestone.service';

@Component({
  selector: 'app-milestone-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1>Milestone Tracker</h1>

      <h2>Milestones</h2>

      <p *ngIf="loading">Loading milestones...</p>
      <p *ngIf="errorMessage">{{ errorMessage }}</p>

      <ul>
        <li *ngFor="let milestone of milestones">
          <strong>{{ milestone.name }}</strong>
          — {{ milestone.status }}
        </li>
      </ul>

      <h2>Add a Milestone</h2>

      <form (ngSubmit)="addMilestone()">
        <label>
          Milestone Name:
          <input
            type="text"
            [(ngModel)]="newName"
            name="name"
            required
          />
        </label>

        <br /><br />

        <label>
          Status:
          <select [(ngModel)]="newStatus" name="status">
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <br /><br />

        <button type="submit">Add Milestone</button>
      </form>
    </div>
  `
})
export class MilestoneTracker implements OnInit {
  milestones: Milestone[] = [];
  newName = '';
  newStatus = 'Not Started';
  loading = false;
  errorMessage = '';

  constructor(private milestoneService: MilestoneService) {}

  ngOnInit(): void {
    this.loadMilestones();
  }

  loadMilestones(): void {
    this.loading = true;
    this.errorMessage = '';

    this.milestoneService.getMilestones().subscribe({
      next: (data) => {
        this.milestones = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading milestones:', error);
        this.errorMessage = 'Could not load milestones. Check that the backend is running.';
        this.loading = false;
      }
    });
  }

  addMilestone(): void {
    if (!this.newName.trim()) {
      return;
    }

    const newMilestone: Milestone = {
      name: this.newName.trim(),
      status: this.newStatus
    };

    this.milestoneService.addMilestone(newMilestone).subscribe({
      next: () => {
        this.newName = '';
        this.newStatus = 'Not Started';
        this.loadMilestones();
      },
      error: (error) => {
        console.error('Error adding milestone:', error);
        this.errorMessage = 'Could not add milestone. Check your backend POST endpoint.';
      }
    });
  }
}
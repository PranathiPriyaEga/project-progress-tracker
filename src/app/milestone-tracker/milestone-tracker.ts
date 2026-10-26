import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MilestoneService, Milestone } from '../milestone.service';

@Component({
  selector: 'app-milestone-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './milestone-tracker.html'
})
export class MilestoneTracker implements OnInit {
 milestones: { id?: number; name: string; status: string; targetDate?: string }[] = [];

  milestoneName = '';
  targetDate = '';
  status = 'Not Started';

  message = '';
  isLoading = false;

  constructor(private milestoneService: MilestoneService) {}

  ngOnInit(): void {
    this.loadMilestones();
  }

  loadMilestones(): void {
    this.isLoading = true;

    this.milestoneService.getMilestones().subscribe({
      next: (data) => {
        this.milestones = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading milestones:', error);
        this.message = 'Could not load milestones from the server.';
        this.isLoading = false;
      }
    });
  }

  addMilestone(): void {
    if (!this.milestoneName.trim()) {
      this.message = 'Please enter a milestone name.';
      return;
    }

    const newMilestone: { id?: number; name: string; status: string; targetDate?: string } = {
      name: this.milestoneName.trim(),
      status: this.status,
      targetDate: this.targetDate
    };

    this.milestoneService.addMilestone(newMilestone).subscribe({
      next: (savedMilestone) => {
        this.milestones.push(savedMilestone);
        this.milestoneName = '';
        this.targetDate = '';
        this.status = 'Not Started';
        this.message = 'Milestone added successfully!';
      },
      error: (error) => {
        console.error('Error adding milestone:', error);
        this.message = 'Could not save the milestone.';
      }
    });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Milestone {
  id?: number;
  name: string;
  status: string;
  targetDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  private apiUrl = 'http://localhost:3000/api/milestones';

  constructor(private http: HttpClient) {}

  getMilestones(): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(this.apiUrl);
  }

  addMilestone(milestone: Milestone): Observable<Milestone> {
    return this.http.post<Milestone>(this.apiUrl, milestone);
  }
}
import { Injectable, OnInit } from '@angular/core';
import { Activity } from '../types/activity';
import { userService } from './user-service.service';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActivityLoggerService {
  private readonly STORAGE_KEY = 'forumActivityLog';
  private activities: Activity[] = [];

  constructor(private http: HttpClient) {
    this.loadAllActivities();
  }

  // Load all activities from localStorage or initialize an empty log
  private loadAllActivities(): void {
    const savedActivities = localStorage.getItem(this.STORAGE_KEY);
    if (savedActivities) {
      this.activities = JSON.parse(savedActivities).map((activity: any) => ({
        message: activity.message,
        timestamp: new Date(activity.timestamp),
        user: activity.user,
      }));
    } else {
      this.activities = []; // Initialize as empty if no saved activities
    }
  }

  // Log a new activity
  logActivity(message: string, userId: string, username: string): void {
    const activity: Activity = {
      message,
      timestamp: new Date(),
      user: { id: userId, name: username },
    };

    this.activities.unshift(activity);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.activities));
  }

  // Get all activities, optionally filtered by user or other criteria
  getActivities(filterCriteria?: { userId?: string }): Activity[] {
    if (filterCriteria?.userId) {
      return this.activities.filter((activity) => activity.user.id === filterCriteria.userId);
    }
    return this.activities;
  }

  // Clear all activities (use cautiously)
  clearAllActivities(): void {
    this.activities = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
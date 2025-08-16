import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Mood } from '../../../core/models/mood';
import { User } from '../../../core/models/user';
import { MoodSelectionButtonComponent } from '../mood-selection-button/mood-selection-button.component';

export interface MoodUsersBottomSheetData {
  mood: Mood;
  users: User[];
  currentUser: User | null;
}

@Component({
  selector: 'app-mood-users-bottom-sheet',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NgScrollbarModule,
    MoodSelectionButtonComponent,
  ],
  templateUrl: './mood-users-bottom-sheet.component.html',
  styleUrl: './mood-users-bottom-sheet.component.scss',
})
export class MoodUsersBottomSheetComponent implements OnInit {
  mood: Mood;
  users: User[];
  currentUser: User | null;
  isCurrentUserMood: boolean = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<MoodUsersBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: MoodUsersBottomSheetData
  ) {
    this.mood = data.mood;
    this.users = data.users;
    this.currentUser = data.currentUser;
  }

  ngOnInit(): void {
    this.isCurrentUserMood = this.currentUser?.mood?._id === this.mood._id;
  }

  onMoodSelected(moodId: string): void {
    this.bottomSheetRef.dismiss({ action: 'select', moodId });
  }

  onClose(): void {
    this.bottomSheetRef.dismiss();
  }

  formatMoodUpdateTime(moodUpdatedAt: Date | string): string {
    const now = new Date();
    const updateTime = new Date(moodUpdatedAt);
    const diffInMinutes = Math.floor(
      (now.getTime() - updateTime.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) {
      return "à l'instant";
    } else if (diffInMinutes < 60) {
      return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInMinutes < 1440) {
      // 24 heures
      const hours = Math.floor(diffInMinutes / 60);
      return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Mood } from '../../../core/models/mood';

@Component({
  selector: 'app-mood-selection-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './mood-selection-button.component.html',
  styleUrl: './mood-selection-button.component.scss',
})
export class MoodSelectionButtonComponent {
  @Input() mood!: Mood;
  @Input() isSelected: boolean = false;
  @Output() moodSelected = new EventEmitter<string>();

  onSelectMood(): void {
    this.moodSelected.emit(this.mood._id);
  }
}

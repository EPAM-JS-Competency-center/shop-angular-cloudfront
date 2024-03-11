import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePickerComponent } from './file-picker.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule, FilePickerComponent],
  exports: [FilePickerComponent],
})
export class FilePickerModule {}

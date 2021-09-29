import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
})
export class FilePickerComponent {
  @Input() set file(file: File | null) {
    this.#file = file || null;
    if (this.#file === null && this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  get file(): File | null {
    return this.#file;
  }

  @ViewChild('fileInput') fileInput: ElementRef | null = null;

  @Output() fileChange = new EventEmitter<File | null>();
  @Output() uploadClick = new EventEmitter<void>();

  #file: File | null = null;

  selectFile(files: FileList | null): void {
    if (!files?.length) {
      this.removeFile();
      return;
    }

    const file = files.item(0) as File;

    this.fileChange.emit(file);
    this.file = file;
  }

  removeFile(): void {
    this.file = null;
    this.fileChange.emit(null);
  }
}

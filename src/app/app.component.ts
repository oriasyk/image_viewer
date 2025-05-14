import { Component, HostListener, OnInit } from '@angular/core';
import { DATABASE, dataBase } from './data';
import { IMAGE_TYPES } from './enums';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'imageViewer';
  imageUrl = ';';
  scale: number = 0.5;
  currentImage = 0;
  selectedType = IMAGE_TYPES.JS_JENERAL;
  selectedGroup: DATABASE[] = [];
  currentRange: number[] = [];
  showMiddleBar = false;
  currentI = 0;
  displayJS = true;
  imageUrlExtracted: any;

  ngOnInit() {
    this.selectedGroup = this.selectType(this.selectedType);
    this.currentRange = this.selectedGroup.map((e) => e.id) || [];
    this.currentImage = this.selectedGroup[0].id;
    this.imageUrl = `./assets/images/${this.selectedGroup[0].id}.jpeg`;
  }

  selectType(type: IMAGE_TYPES): DATABASE[] {
    return dataBase.filter((e: DATABASE) => {
      return e.type === type;
    });
  }

  onMouseOver() {
    
  }
  increaseScale() {
    this.scale += 0.1;
  }

  resetScale() {
    this.scale = 1;
  }

  decreaseScale() {
    this.scale -= 0.1;
  }

  showNextImage() {
    this.currentI += 1;

    let x = this.currentRange[this.currentI];

    if (x) {
      this.currentImage = x;
      this.imageUrl = `./assets/images/${this.currentImage}.jpeg`;
    } else {
      this.currentI -= 1;
    }
    this.imageUrlExtracted = this.currentImage;

  }

  changeTopic(topic: IMAGE_TYPES) {
    this.currentI = 0;
    this.selectedGroup = this.selectType(topic);
    this.currentRange = this.selectedGroup.map((e) => e.id) || [];
    this.currentImage = this.selectedGroup[0].id;
    this.imageUrl = `./assets/images/${this.currentImage}.jpeg`;
    this.imageUrlExtracted = this.currentImage;

  }

  showPreviousImage() {
    this.currentI -= 1;
    let x = this.currentRange[this.currentI];
    if (x || x === 0) {
      this.currentImage = x;
      this.imageUrl = `./assets/images/${this.currentImage}.jpeg`;
    } else {
      this.currentI += 1;
    }
    this.imageUrlExtracted = this.currentImage;

  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === '+') {
      this.showPreviousImage();
    } else if (
      event.key === 'ArrowRight' ||
      event.key === '-' ||
      event.key === 'Enter'
    ) {
      this.showNextImage();
    } else if (event.key === 'Escape') {
      this.showMiddleBar = !this.showMiddleBar;
    }
  }

  @HostListener('window:wheel', ['$event'])
  handleMouseWheel(event: WheelEvent) {
    if (event.shiftKey) {
      const delta = Math.sign(event.deltaY); // Получаем направление прокрутки колеса мыши
      if (delta > 0) {
        this.increaseScale();
      } else if (delta < 0) {
        this.decreaseScale();
      }
      event.preventDefault(); // Предотвращаем прокрутку страницы при использовании Shift + колесо мыши
    }
  }

  protected readonly IMAGE_TYPES = IMAGE_TYPES;

  countItems(type: IMAGE_TYPES) {
    let filtered = dataBase.filter((e) => {
      return e.type === type;
    });
    return filtered.length;
  }
}

import { Directive, ElementRef, HostListener } from '@angular/core';
 
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) { }

  @HostListener('dragover') ondragover() {
    this.el.nativeElement.style.filter = "blur(4px)";
  }

  @HostListener('dragleave') ondragleave() {
    this.el.nativeElement.style.filter = "blur(0px)";
  }

  @HostListener('drop') ondrop() {
    this.el.nativeElement.style.filter = "blur(0px)";
  }
}
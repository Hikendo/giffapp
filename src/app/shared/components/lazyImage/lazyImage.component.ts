import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lazy-image',
  template: `<div class="d-flex justify-content-center"></div>
  <img
  [src]="url"
  [alt]="alt"
  class="card-img-top animate__animated animate__fadein"
  (load)="onLoad()"
  [ngStyle]="{'display': hasloaded ? '': 'none'}"
  />
  <img
  *ngIf="!hasloaded"
  src="assets/images/puff.svg"
  [alt]="alt"
  class="card-img-top"
  />

  `,
})
export class LazyImageComponent implements OnInit{
  @Input()
  public url!:string;

  @Input()
  public alt!:string;

  public hasloaded:boolean=false;

  ngOnInit(): void {
      if(!this.url) throw new Error('Property url is required');
  }

  onLoad():void{
    setTimeout(()=>{
      this.hasloaded=true;
    },1000)

  }
}

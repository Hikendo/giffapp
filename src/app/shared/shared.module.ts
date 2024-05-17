import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GifsModule } from '../gifs/gifs.module';
import { LazyImageComponent } from './components/lazyImage/lazyImage.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent
  ],
  imports: [
    CommonModule  ],
  exports:[
    SidebarComponent,
    LazyImageComponent
  ]
})
export class SharedModule { }

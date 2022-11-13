import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../interfaces/cartelera-response';
import Swiper from 'swiper';


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() peliculas: Movie[] = [];
  public swiper!: Swiper;
  

  constructor() { }
  
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {
  }

  onSlideNext(){
    this.swiper.slideNext();
  }

  onSlidePrev(){
    this.swiper.slidePrev();
  }

}

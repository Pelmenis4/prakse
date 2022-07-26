import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {

  clicked: boolean = false;
  username: string;
  password: string;
  animation2Interval;
  animation3Interval;
  animation4Interval;
  animation5Interval;
  animation6Interval;
  animation7Interval;
  animation8Interval;
  animation9Interval;
  animation10Interval;

  pwAnimation3Interval;
  pwAnimation4Interval;

  @ViewChild('usernameField') usernameElementRef:ElementRef;
  usernameElement: HTMLElement;
  
  @ViewChild('passwordExtender') passwordExtenderElementRef:ElementRef;
  passwordExtenderElement: HTMLElement;

  @ViewChild('passwordField') passwordElementRef:ElementRef;
  passwordElement: HTMLElement;
  

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.usernameElement = this.usernameElementRef.nativeElement;
    this.passwordExtenderElement = this.passwordExtenderElementRef.nativeElement;
    this.passwordElement = this.passwordElementRef.nativeElement;
  }
  
  onSubmit() {
    if(this.username == "test" && this.password == "test") {
      this.router.navigate(["/dashboard/page/1"]);
    }
  }

  usernameAnimation() {
    this.usernameElement.classList.add('animation1');
    this.animation2Interval = setInterval(() => this.animations('animation1', 'animation2'), 400);
    setTimeout(() => clearInterval(this.animation2Interval), 400);
    this.animation3Interval = setInterval(() => this.animations('animation2', 'animation3'), 800);
    setTimeout(() => clearInterval(this.animation3Interval), 800);
    this.animation4Interval = setInterval(() => this.animations('animation3', 'animation4'), 1200);
    setTimeout(() => clearInterval(this.animation4Interval), 1200);
    this.animation5Interval = setInterval(() => this.animations('animation4', 'animation5'), 1400);
    setTimeout(() => clearInterval(this.animation5Interval), 1400);
    this.animation6Interval = setInterval(() => this.animations('animation5', 'animation6'), 3000);
    setTimeout(() => clearInterval(this.animation6Interval), 3000);
    this.animation7Interval = setInterval(() => this.animations('animation6', 'animation7'), 3300);
    setTimeout(() => clearInterval(this.animation7Interval), 3300);
    this.animation8Interval = setInterval(() => this.animations('animation7', 'animation8'), 3500);
    setTimeout(() => clearInterval(this.animation8Interval), 3500);
    this.animation9Interval = setInterval(() => this.animations('animation8', 'animation9'), 3700);
    setTimeout(() => clearInterval(this.animation9Interval), 3700);
  }

  animations(removeAnimation: string, addAnimation: string) {
    this.usernameElement.classList.remove(removeAnimation);
    this.usernameElement.classList.add(addAnimation);
  }
  
  passwordAnimation() {
    this.passwordElement.classList.add('pwAnimation2');
    this.passwordExtenderElement.classList.add('pwAnimation1');
    this.pwAnimation3Interval = setInterval(() => this.pwAnimation3(), 1000);
    setTimeout(() => clearInterval(this.pwAnimation3Interval), 1000);
    this.pwAnimation4Interval = setInterval(() => this.pwAnimation4(), 2700);
    setTimeout(() => clearInterval(this.pwAnimation4Interval), 2700);
  }
  

  pwAnimation3() {
    this.passwordExtenderElement.classList.remove('pwAnimation1')
    this.passwordExtenderElement.classList.add('pwAnimation3')
  }

  pwAnimation4() {
    this.passwordExtenderElement.classList.remove('pwAnimation3')
    this.passwordExtenderElement.classList.add('pwAnimation4')
  }
}





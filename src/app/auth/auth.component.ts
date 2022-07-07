import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm) {
    if(form.value.username == "test" && form.value.password == "test") {
      this.router.navigate(["/dashboard/page/1"]);
    }
  }
}

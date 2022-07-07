import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../shared/document.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() currentPage: number;
  @Output() logoClick = new EventEmitter<any>(); //event for when logo is clicked.

  constructor(private router: Router, private documentService: DocumentService) {}

  ngOnInit(): void {
  }

  // when the logo is clicked, navigates to the first page and emits an event so the dashboard can listen
  // to the logo being clicked.
  onLogo() {
    this.router.navigate(['/dashboard/page/1']);
    this.logoClick.emit();
  }
  
  // when clicked on "sākums" button, it navigates you back to the last page you were on.
  onBack() {
    this.router.navigate(['/dashboard/page', this.currentPage]);
    console.log(this.currentPage);
  }

}

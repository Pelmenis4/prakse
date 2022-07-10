import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Output() changePage = new EventEmitter<number>();

  @Input() public page = 1;
  public pageSize = 10;
  @Input() public items = 0;

  onChangePage(page: number) {
    this.changePage.emit(page);
  }
  constructor() { }

  ngOnInit(): void {
  }
  
}

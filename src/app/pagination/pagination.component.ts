import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() itemsPerPage: number = 0;
  @Input() itemsNumber: number = 0;
  @Input() allPagesNumber: number = 0;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  private _currentPage: number = 1;

  constructor() { }

  ngOnInit() {
    console.log(this._currentPage);
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
    this.changePage.emit(this.currentPage);
  }

  onSetPage(event: any): void {
    this.currentPage = event.target.value;
  }

  onFirstPage(): void {
    this.currentPage = 1;
  }

  onLastPage(): void {
    this.currentPage = this.allPagesNumber;
  }

  onNextPage(): void {
    this.currentPage += 1;
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
  }
}


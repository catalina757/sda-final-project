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
  @Input() receivedCurrentPage: number = 0;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  private _currentPage: number = 1;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.receivedCurrentPage === 0) {
      this._currentPage = 1;
    } else {
      this._currentPage = this.receivedCurrentPage;
    }
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
    this.changePage.emit(this.currentPage);
  }

  onSetPage(event: number): void {
    this.currentPage = event;
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


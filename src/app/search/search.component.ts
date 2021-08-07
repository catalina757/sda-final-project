import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() newSearchEvent = new EventEmitter<string>();

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  public filterByInput(input: string) {
    this.newSearchEvent.emit(input);
  }
}

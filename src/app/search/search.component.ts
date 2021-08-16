import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() newSearchEvent = new EventEmitter<string>();

  searchForm = new FormGroup({
    search: new FormControl("", Validators.required)
  });

  constructor(public searchService: SearchService) { }

  ngOnInit(): void {

  }

  public filterByInput(input: string) {
    this.newSearchEvent.emit(input);
    this.searchForm.reset();
  }
}

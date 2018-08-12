import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
@Component({
  selector: 'app-recprofstruct',
  templateUrl: './recprofstruct.component.html',
  styleUrls: ['./recprofstruct.component.css']
})
export class RecprofstructComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
  }

}

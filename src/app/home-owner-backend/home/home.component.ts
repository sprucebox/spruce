import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function() {
      
      $('ul.filter-view li a').click(function() {
        $('ul.filter-view li a').removeClass('activelink');
        $(this).addClass('activelink');
        var tab_id = $(this).attr('data-tab');
        $('.content').removeClass('current').addClass('hide');
        $("#" + tab_id).addClass('current').removeClass('hide');
    });
  });
  }

}

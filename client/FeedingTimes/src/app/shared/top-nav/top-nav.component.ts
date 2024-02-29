import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/services/User';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  @Input() users: User[] | undefined;
  logoPath: string = '../../../assets/Logo.png';
  constructor() {}

  ngOnInit(): void {}
}

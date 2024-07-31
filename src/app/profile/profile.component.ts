import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  @Input() username: any = null;
  @Output() logoutEvent = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  initNameIcon = () => {

    if(isDefined(this.username)) {
      const breakName = this.username.split(' ');
      return breakName.length === 1 ? breakName[0].substr(0, 3) : breakName.reduce((acc: any, curr: string) => acc + curr.substr(0, 1), '').substr(0, 3);
    }
    return 'U';
  }

  onLogout = () => {
    this.logoutEvent.emit()
  }

  onShowProfile = () => {
    alert('Click on profile.');
  }


}

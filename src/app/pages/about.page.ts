import { Component } from '@angular/core';
import TeamPage, { routeMeta as teamRouteMeta } from './team.page';

export const routeMeta = teamRouteMeta;

@Component({
  selector: 'app-about-page',
  imports: [TeamPage],
  template: `<app-team-page />`
})
export default class AboutPage {}

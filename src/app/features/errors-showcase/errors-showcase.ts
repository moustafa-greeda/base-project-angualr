import { Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { ErrorPage } from '../../shared/components/error-page/error-page';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-errors-showcase',
  imports: [PageHeader, ErrorPage, Button],
  templateUrl: './errors-showcase.html',
})
export class ErrorsShowcase {}

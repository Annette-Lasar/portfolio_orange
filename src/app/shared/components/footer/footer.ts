import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MergedContent } from '../../interfaces/merged-content.interface';
import { PageContentService } from '../../services/page-content.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'port-footer',
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  mergedContent$!: Observable<MergedContent | null>;
  private pageContentService = inject(PageContentService);

  linkPathPrefix: string = 'icons/general/';

  ngOnInit(): void {
    this.mergedContent$ = this.pageContentService.mergedContent$;
  }
}

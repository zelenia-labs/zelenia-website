import { Component, computed, input } from '@angular/core';
import { Partner } from '../../content/studio.model';

@Component({
  selector: 'app-partner-card',
  template: `
    <article class="partner-card">
      <div class="partner-card__header">
        <div class="partner-card__avatar-wrap">
          @if (partner().avatarImage) {
            <img
              class="partner-card__avatar"
              [src]="'/assets/images/' + partner().avatarImage"
              [alt]="'Editorial studio portrait of ' + partner().name"
              width="72"
              height="72"
              loading="lazy"
              decoding="async"
            />
          } @else {
            <div class="partner-card__monogram">
              <span class="partner-card__initials">{{ partner().avatarInitials }}</span>
            </div>
          }
        </div>
        <div class="partner-card__identity profile-content">
          <span class="partner-card__role">{{ partner().role }}</span>
          <h3 class="partner-card__name">{{ partner().name }}</h3>
          <p class="partner-card__credentials">{{ partner().credentials }}</p>
        </div>
      </div>

      <div class="partner-card__badges" aria-label="Partner Credentials">
        @for (highlight of partner().highlights; track highlight) {
          <span class="partner-card__badge">{{ highlight }}</span>
        }
      </div>

      <p class="partner-card__bio">{{ partner().background }}</p>

      <div class="partner-card__footer">
        <a
          class="btn btn--secondary btn--sm"
          [href]="partner().linkedin"
          target="_blank"
          rel="noopener noreferrer"
          [attr.aria-label]="linkedinAriaLabel()"
        >
          <span>Say Hello on LinkedIn</span>
          <span class="arrow-indicator" aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  `
})
export class PartnerCard {
  readonly partner = input.required<Partner>();
  readonly linkedinAriaLabel = computed(() => `View ${this.partner().name}'s LinkedIn Profile`);
}

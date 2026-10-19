import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import sendMessageContent from './send-message.content.md';

@Component({
  selector: 'app-send-message',
  imports: [RouterLink],
  template: `
    <section class="site-section send-message-section" aria-labelledby="send-message-heading">
      <!-- Ambient Warm Glow Circle matching warm editorial design -->
      <div class="ambient-glow glow--cta-warm" aria-hidden="true"></div>

      <div class="container send-message-container">
        <div class="send-message-card reveal-on-scroll">
          <h2 class="send-message-title" id="send-message-heading">
            <span class="heading-primary">{{ cta.titlePrimary }}</span>
            <span class="heading-secondary">{{ cta.titleSecondary }}</span>
          </h2>
          <p class="send-message-desc">
            {{ cta.description }}
          </p>
          <a class="btn btn--primary send-message-btn" routerLink="/contact">
            <span>{{ cta.btnText }}</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .send-message-section {
      background-color: var(--bg);
      border-top: 1px solid var(--border-subtle);
      padding-block: clamp(5rem, 8vw, 7.5rem);
      color: var(--text);
      position: relative;
      overflow: hidden;
    }

    .glow--cta-warm {
      width: 680px;
      height: 680px;
      background-color: var(--color-surface-sand);
      opacity: 0.35;
      filter: blur(110px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 0;
    }

    .send-message-container {
      position: relative;
      z-index: 1;
      max-width: var(--shell);
      margin-inline: auto;
    }

    .send-message-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 680px;
      margin-inline: auto;
    }

    .send-message-title {
      font-family: var(--font-heading);
      font-size: clamp(2.25rem, 4.5vw, 3.5rem);
      font-weight: 500;
      letter-spacing: -0.04em;
      line-height: 1.15;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .send-message-title .heading-primary {
      color: var(--color-text-primary);
    }

    .send-message-title .heading-secondary {
      color: var(--color-sage-dark);
    }

    .send-message-desc {
      font-family: var(--font-sans);
      font-size: clamp(0.95rem, 1.25vw, 1.125rem);
      line-height: 1.6;
      color: var(--text-2);
      max-width: 560px;
      margin: 1.25rem 0 2rem 0;
    }

    .send-message-btn {
      min-height: 48px;
      padding-inline: 2rem;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: var(--radius-pill);
      box-shadow: 0 4px 16px var(--color-ink-subtle);
    }
  `
})
export class SendMessage {
  protected readonly cta = sendMessageContent;
}

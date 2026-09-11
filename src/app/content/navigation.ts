export interface NavItem {
  label: string;
  href: string;
  fragment?: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Process', href: '/process' },
  { label: 'Team', href: '/team' },
  { label: 'Advantage', href: '/', fragment: 'advantage' }
];

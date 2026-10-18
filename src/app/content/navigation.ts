export interface NavItem {
  label: string;
  href: string;
  fragment?: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'About us', href: '/team' }
];

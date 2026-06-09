/** Navigation link shape used in the main Navbar. */
export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation links rendered in the Navbar. */
export const NAV_LINKS: NavLink[] = [
  { label: 'About',        href: '#about'        },
  { label: 'Projects',     href: '#projects'     },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact'      },
];

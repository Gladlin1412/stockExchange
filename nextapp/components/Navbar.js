import Link from 'next/link';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const navItems = [
  { href: '/dashboard', primary: 'Dashboard' },
  { href: '/backtesting', primary: 'Backtesting' },
  { href: '/sentiment', primary: 'Sentiment' },
  { href: '/watchlist', primary: 'Watchlist' },
  { href: '/gamification', primary: 'Gamification' },
];

export default function Navbar() {
  return (
    <div>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'black',
          padding: 2,
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemText primary={item.primary} primaryTypographyProps={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
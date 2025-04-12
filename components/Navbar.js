import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'; // Using Material UI

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stock Exchange
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} href="/watchlist">
          Watchlist
        </Button>
        <Button color="inherit" component={Link} href="/backtesting">
          Backtesting
        </Button>
        <Button color="inherit" component={Link} href="/sentiment">
          Sentiment
        </Button>
        {/* Add more links as needed */}
      </Toolbar>
    </AppBar>
  );
}
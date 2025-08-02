import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingCart, User, LogOut, Store } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-card/20 backdrop-blur-md border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex  items-center gap-4 text-2xl font-bold text-primary">
            <Store />
            Tendle Store
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm"
              />
            </div>
          </form>

          <nav className="flex items-center gap-4">
            <Link to="/products">
              <Button variant="ghost" className="backdrop-blur-sm">
                Products
              </Button>
            </Link>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="backdrop-blur-sm">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <Button variant="ghost" className="gap-2 backdrop-blur-sm">
                    <User className="h-4 w-4" />
                    {user?.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="backdrop-blur-sm">
                  <LogOut className="h-4 w-4" color='red' />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="backdrop-blur-sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="backdrop-blur-sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
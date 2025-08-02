import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart, Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant={product.inStock ? "default" : "destructive"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">{product.rating}</span>
            </div>
          </div>
          
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-2xl font-bold text-primary">
              GHS {product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 px-4 pb-4">
        <Button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full gap-2"
          variant={product.inStock ? "default" : "secondary"}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
};
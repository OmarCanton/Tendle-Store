import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/data/products';
import { Star, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { useState } from 'react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">(124 reviews)</span>
              </div>
              
              <Badge variant={product.inStock ? "default" : "destructive"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>

            <p className="text-4xl font-bold text-primary mb-6">
              GHS {product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 gap-2"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              
              {/* <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button> */}
            </div>
          </div>

          {/* Product Features */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• High-quality materials and construction</li>
                <li>• 30-day money-back guarantee</li>
                <li>• Free shipping on orders over GHS 50</li>
                <li>• 24/7 customer support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                    <p className="text-xl font-bold text-primary">
                      GHS {relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
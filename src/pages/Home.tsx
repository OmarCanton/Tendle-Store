import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, ShoppingBag, ShoppingBagIcon, ShoppingBasket, ShoppingCart } from 'lucide-react';
import BackgroundVideo from '@/data/Background1.mp4'
import { useEffect, useRef } from 'react';

export const Home = () => {
  const videoRef = useRef(null)
  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    const video = videoRef.current
    if(video) {
      video.play()    
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section with Dimmed Video Background */}
      <section className="relative h-screen min-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-0 overflow-hidden">
          {/* Video Background with Dimming Effect */}
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover mix-blend-overlay opacity-90"
          >
            <source src={BackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-white">
              Welcome to Tendle Store
            </h1>
            <p className="text-xl font-bold text-white mb-8 max-w-2xl mx-auto">
              Discover amazing products with unbeatable prices. Your one-stop destination for all your shopping needs.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="gap-2 font-bold">
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">Free shipping on orders over $50</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                <p className="text-muted-foreground">Your payment information is safe</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p className="text-muted-foreground">Only the best products for you</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our hand-picked selection of the most popular and trending products
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products">
              <Button variant="outline" size="lg" className="gap-2">
                View All Products <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products and exclusive offers
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-foreground"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
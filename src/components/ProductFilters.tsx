import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface ProductFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  maxPrice: number;
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
  onClearFilters: () => void;
}

export const ProductFilters = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
  inStockOnly,
  onInStockChange,
  onClearFilters,
}: ProductFiltersProps) => {
  const handleCategoryToggle = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(updatedCategories);
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[1] < maxPrice || inStockOnly;

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-3">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
              max={maxPrice}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Stock Status */}
        <div>
          <h4 className="font-medium mb-3">Availability</h4>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={inStockOnly}
              onCheckedChange={(checked) => onInStockChange(!!checked)}
            />
            <label
              htmlFor="inStock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              In Stock Only
            </label>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <h4 className="font-medium mb-3">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="cursor-pointer" onClick={() => handleCategoryToggle(category)}>
                  {category} ×
                </Badge>
              ))}
              {priceRange[1] < maxPrice && (
                <Badge variant="secondary">
                  ${priceRange[0]} - ${priceRange[1]}
                </Badge>
              )}
              {inStockOnly && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => onInStockChange(false)}>
                  In Stock ×
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
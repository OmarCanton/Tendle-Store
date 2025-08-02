import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Palette, Check } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, colorTheme, toggleTheme, setColorTheme } = useTheme();

  const colorThemes = [
    { name: 'default', label: 'Purple', color: 'hsl(262 83% 58%)' },
    { name: 'blue', label: 'Blue', color: 'hsl(221 83% 53%)' },
    { name: 'green', label: 'Green', color: 'hsl(142 76% 36%)' },
    { name: 'orange', label: 'Orange', color: 'hsl(25 95% 53%)' },
    { name: 'pink', label: 'Pink', color: 'hsl(330 81% 60%)' },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-9 w-9"
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {/* Color Theme Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Choose Color Theme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {colorThemes.map((ct) => (
                <button
                  key={ct.name}
                  onClick={() => setColorTheme(ct.name)}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-border"
                      style={{ backgroundColor: ct.color }}
                    />
                    <span className="text-sm font-medium">{ct.label}</span>
                  </div>
                  {colorTheme === ct.name && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};
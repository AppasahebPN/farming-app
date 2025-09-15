import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bell, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import tomatoRetro from '@/assets/tomato-retro.jpg';
import carrotRetro from '@/assets/carrot-retro.jpg';
import cornRetro from '@/assets/corn-retro.jpg';
import chiliRetro from '@/assets/chili-retro.jpg';

interface MarketPrice {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  market: string;
  trend: 'up' | 'down' | 'stable';
  recommendation: 'buy' | 'sell' | 'hold';
  lastUpdated: string;
  season: string;
}

const Market = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [marketData, setMarketData] = useState<MarketPrice[]>([]);

  // Simulated market data
  useEffect(() => {
    const data: MarketPrice[] = [
      {
        id: '1',
        name: 'Tomato',
        image: tomatoRetro,
        currentPrice: 45,
        previousPrice: 42,
        unit: '₹/kg',
        market: 'Bangalore',
        trend: 'up',
        recommendation: 'sell',
        lastUpdated: '2 mins ago',
        season: 'Peak Season'
      },
      {
        id: '2',
        name: 'Onion',
        image: carrotRetro,
        currentPrice: 28,
        previousPrice: 32,
        unit: '₹/kg',
        market: 'Mysore',
        trend: 'down',
        recommendation: 'hold',
        lastUpdated: '5 mins ago',
        season: 'Off Season'
      },
      {
        id: '3',
        name: 'Maize',
        image: cornRetro,
        currentPrice: 18,
        previousPrice: 18,
        unit: '₹/kg',
        market: 'Hubli',
        trend: 'stable',
        recommendation: 'hold',
        lastUpdated: '1 min ago',
        season: 'Regular Season'
      },
      {
        id: '4',
        name: 'Chili',
        image: chiliRetro,
        currentPrice: 85,
        previousPrice: 78,
        unit: '₹/kg',
        market: 'Belgaum',
        trend: 'up',
        recommendation: 'buy',
        lastUpdated: '3 mins ago',
        season: 'Peak Season'
      },
    ];
    setMarketData(data);
  }, []);

  const filteredData = marketData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.recommendation === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'buy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'sell':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Live Market Prices
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time crop prices across Karnataka's major agricultural markets
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 animate-fade-up">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'buy', 'sell', 'hold'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Market Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredData.map((item, index) => {
            const { change, percentage } = getPriceChange(item.currentPrice, item.previousPrice);
            return (
              <Card 
                key={item.id} 
                className="card-soft animate-fade-up group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover shadow-sm"
                      />
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="text-sm">{item.market}</CardDescription>
                      </div>
                    </div>
                    {getTrendIcon(item.trend)}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Price Info */}
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-foreground">
                          {item.currentPrice}
                        </span>
                        <span className="text-sm text-muted-foreground">{item.unit}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-sm ${
                          change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {change > 0 ? '+' : ''}{change.toFixed(2)} ({percentage}%)
                        </span>
                        <span className="text-xs text-muted-foreground">from yesterday</span>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="flex items-center justify-between">
                      <Badge className={`capitalize ${getRecommendationColor(item.recommendation)}`}>
                        {item.recommendation}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.lastUpdated}</span>
                    </div>

                    {/* Season Info */}
                    <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
                      {item.season}
                    </div>
                  </div>
                </CardContent>

                {/* Pulse animation for recent updates */}
                {item.lastUpdated.includes('min') && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 text-center animate-fade-up">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Never Miss Market Opportunities
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Get instant alerts when crop prices hit your target levels. 
            Set up personalized market notifications for your crops.
          </p>
          <Button className="btn-secondary-hero">
            <Bell className="h-4 w-4 mr-2" />
            Get Personalized Market Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Market;
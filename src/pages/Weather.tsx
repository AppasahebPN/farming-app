import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Eye, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WeatherDay {
  date: string;
  day: string;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  temperature: {
    high: number;
    low: number;
  };
  humidity: number;
  windSpeed: number;
  precipitation: number;
  visibility: number;
  recommendation: string[];
}

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherDay | null>(null);
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<WeatherDay | null>(null);

  useEffect(() => {
    // Simulated weather data
    const weatherData: WeatherDay[] = [
      {
        date: '2024-01-15',
        day: 'Today',
        condition: 'sunny',
        temperature: { high: 28, low: 18 },
        humidity: 65,
        windSpeed: 12,
        precipitation: 0,
        visibility: 10,
        recommendation: [
          'Perfect day for field preparation',
          'Good time for spraying pesticides',
          'Ideal for harvesting mature crops',
          'No irrigation needed today'
        ]
      },
      {
        date: '2024-01-16',
        day: 'Tomorrow',
        condition: 'rainy',
        temperature: { high: 24, low: 16 },
        humidity: 85,
        windSpeed: 18,
        precipitation: 15,
        visibility: 6,
        recommendation: [
          'Avoid field operations due to rain',
          'Good natural irrigation for crops',
          'Check drainage in low-lying areas',
          'Postpone harvesting activities'
        ]
      },
      {
        date: '2024-01-17',
        day: 'Wednesday',
        condition: 'cloudy',
        temperature: { high: 26, low: 17 },
        humidity: 70,
        windSpeed: 15,
        precipitation: 2,
        visibility: 8,
        recommendation: [
          'Good day for transplanting seedlings',
          'Monitor for pest activity',
          'Light irrigation may be needed',
          'Suitable for fertilizer application'
        ]
      },
      {
        date: '2024-01-18',
        day: 'Thursday',
        condition: 'sunny',
        temperature: { high: 30, low: 19 },
        humidity: 60,
        windSpeed: 10,
        precipitation: 0,
        visibility: 12,
        recommendation: [
          'Increase irrigation frequency',
          'Best time for harvest operations',
          'Good for drying harvested crops',
          'Apply mulching to conserve moisture'
        ]
      },
      {
        date: '2024-01-19',
        day: 'Friday',
        condition: 'cloudy',
        temperature: { high: 27, low: 18 },
        humidity: 75,
        windSpeed: 14,
        precipitation: 5,
        visibility: 9,
        recommendation: [
          'Moderate irrigation needed',
          'Good for land preparation',
          'Watch for fungal diseases',
          'Suitable for organic manure application'
        ]
      }
    ];

    setForecast(weatherData);
    setCurrentWeather(weatherData[0]);
    setSelectedDay(weatherData[0]);
  }, []);

  const getWeatherIcon = (condition: string, size: string = 'h-8 w-8') => {
    switch (condition) {
      case 'sunny':
        return <Sun className={`${size} text-yellow-500 animate-pulse-soft`} />;
      case 'cloudy':
        return <Cloud className={`${size} text-gray-500`} />;
      case 'rainy':
        return <CloudRain className={`${size} text-blue-500 animate-bounce-in`} />;
      case 'stormy':
        return <CloudRain className={`${size} text-purple-500`} />;
      default:
        return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'Sunny';
      case 'cloudy':
        return 'Cloudy';
      case 'rainy':
        return 'Rainy';
      case 'stormy':
        return 'Stormy';
      default:
        return 'Clear';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'from-yellow-400 to-orange-500';
      case 'cloudy':
        return 'from-gray-400 to-gray-600';
      case 'rainy':
        return 'from-blue-400 to-blue-600';
      case 'stormy':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getFarmingAdvice = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return { type: 'success', text: 'Great farming weather!' };
      case 'cloudy':
        return { type: 'warning', text: 'Moderate farming conditions' };
      case 'rainy':
        return { type: 'info', text: 'Natural irrigation day' };
      case 'stormy':
        return { type: 'danger', text: 'Avoid field work' };
      default:
        return { type: 'success', text: 'Good for farming' };
    }
  };

  if (!currentWeather || !selectedDay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Weather Forecast
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            7-day weather insights with farming recommendations for Karnataka
          </p>
        </div>

        {/* Current Weather */}
        <Card className={`card-feature mb-8 animate-fade-up bg-gradient-to-r ${getConditionColor(currentWeather.condition)} text-white`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white">Current Weather</CardTitle>
                <CardDescription className="text-white/80">Bangalore, Karnataka</CardDescription>
              </div>
              {getWeatherIcon(currentWeather.condition, 'h-16 w-16')}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{currentWeather.temperature.high}°</div>
                <div className="text-sm text-white/80">High</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{currentWeather.temperature.low}°</div>
                <div className="text-sm text-white/80">Low</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">{currentWeather.humidity}%</div>
                <div className="text-sm text-white/80">Humidity</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">{currentWeather.windSpeed} km/h</div>
                <div className="text-sm text-white/80">Wind</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 7-Day Forecast */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-foreground mb-6">7-Day Forecast</h2>
            <div className="space-y-3">
              {forecast.map((day, index) => (
                <Card 
                  key={day.date}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-up ${
                    selectedDay.date === day.date ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedDay(day)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getWeatherIcon(day.condition, 'h-8 w-8')}
                        <div>
                          <div className="font-medium">{day.day}</div>
                          <div className="text-sm text-muted-foreground">
                            {getConditionText(day.condition)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{day.temperature.high}°/{day.temperature.low}°</div>
                        <div className="text-sm text-muted-foreground">
                          {day.precipitation > 0 && `${day.precipitation}mm`}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Detailed Weather Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Day Details */}
            <Card className="card-soft animate-fade-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedDay.day} Weather Details</CardTitle>
                    <CardDescription>{getConditionText(selectedDay.condition)} conditions expected</CardDescription>
                  </div>
                  {getWeatherIcon(selectedDay.condition, 'h-12 w-12')}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-3">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-sm font-medium">Temperature</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedDay.temperature.high}°/{selectedDay.temperature.low}°C
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-3">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">Humidity</div>
                      <div className="text-xs text-muted-foreground">{selectedDay.humidity}%</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-3">
                    <Wind className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Wind Speed</div>
                      <div className="text-xs text-muted-foreground">{selectedDay.windSpeed} km/h</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-3">
                    <Eye className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium">Visibility</div>
                      <div className="text-xs text-muted-foreground">{selectedDay.visibility} km</div>
                    </div>
                  </div>
                </div>

                {/* Farming Recommendations */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Cloud className="h-4 w-4 mr-2 text-primary" />
                    Farming Recommendations
                  </h4>
                  <div className="space-y-2">
                    {selectedDay.recommendation.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Alerts */}
            <Card className="card-soft animate-fade-up">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-orange-500" />
                  Weather Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedDay.condition === 'rainy' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <CloudRain className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-blue-800">Rain Alert</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-2">
                        Expected rainfall of {selectedDay.precipitation}mm. Plan indoor activities and avoid field work.
                      </p>
                    </div>
                  )}
                  {selectedDay.condition === 'sunny' && selectedDay.temperature.high > 30 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-orange-500" />
                        <span className="font-medium text-orange-800">Heat Advisory</span>
                      </div>
                      <p className="text-sm text-orange-700 mt-2">
                        High temperatures expected. Increase irrigation frequency and work during cooler hours.
                      </p>
                    </div>
                  )}
                  {selectedDay.windSpeed > 15 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Wind className="h-5 w-5 text-gray-500" />
                        <span className="font-medium text-gray-800">Wind Advisory</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        Strong winds expected. Secure tall plants and avoid spraying activities.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground animate-fade-up">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Never Miss Weather Updates</h3>
                <p className="mb-4 text-primary-foreground/90">
                  Get personalized weather alerts and farming recommendations sent directly to your phone.
                </p>
                <Button className="btn-secondary-hero">
                  <Bell className="h-4 w-4 mr-2" />
                  Enable Weather Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
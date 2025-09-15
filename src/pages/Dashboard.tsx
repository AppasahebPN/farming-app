import { useState, useEffect } from 'react';
import { User, Bell, Bookmark, TrendingUp, Cloud, Calendar, Phone, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import tomatoRetro from '@/assets/tomato-retro.jpg';
import cornRetro from '@/assets/corn-retro.jpg';

interface FarmerData {
  name: string;
  phone: string;
  location: string;
  landSize: string;
  savedCrops: Array<{
    id: string;
    name: string;
    image: string;
    stage: string;
    nextAction: string;
    daysToHarvest: number;
  }>;
  alerts: Array<{
    id: string;
    type: 'weather' | 'pest' | 'market' | 'general';
    title: string;
    message: string;
    time: string;
    urgent: boolean;
  }>;
  predictions: Array<{
    crop: string;
    currentYield: number;
    predictedYield: number;
    confidence: number;
  }>;
}

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);

  useEffect(() => {
    // Simulated farmer data
    const mockFarmerData: FarmerData = {
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      location: 'Mysore, Karnataka',
      landSize: '2.5 acres',
      savedCrops: [
        {
          id: '1',
          name: 'Tomato',
          image: tomatoRetro,
          stage: 'Flowering',
          nextAction: 'Apply fertilizer',
          daysToHarvest: 45
        },
        {
          id: '2',
          name: 'Maize',
          image: cornRetro,
          stage: 'Grain filling',
          nextAction: 'Monitor moisture',
          daysToHarvest: 20
        }
      ],
      alerts: [
        {
          id: '1',
          type: 'weather',
          title: 'Rain Alert',
          message: 'Heavy rainfall expected tomorrow. Postpone pesticide spraying.',
          time: '2 hours ago',
          urgent: true
        },
        {
          id: '2',
          type: 'pest',
          title: 'Pest Advisory',
          message: 'Whitefly activity detected in nearby tomato fields. Monitor your crops.',
          time: '1 day ago',
          urgent: false
        },
        {
          id: '3',
          type: 'market',
          title: 'Price Update',
          message: 'Tomato prices increased by 15% in Mysore market today.',
          time: '2 days ago',
          urgent: false
        }
      ],
      predictions: [
        {
          crop: 'Tomato',
          currentYield: 28,
          predictedYield: 32,
          confidence: 85
        },
        {
          crop: 'Maize',
          currentYield: 6.5,
          predictedYield: 7.2,
          confidence: 78
        }
      ]
    };

    if (isLoggedIn) {
      setFarmerData(mockFarmerData);
    }
  }, [isLoggedIn]);

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
      // Simulate OTP sending
      console.log('OTP sent to:', phoneNumber);
    }
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    if (otp === '1234') {
      setIsLoggedIn(true);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <Cloud className="h-4 w-4 text-blue-500" />;
      case 'pest':
        return <Bell className="h-4 w-4 text-red-500" />;
      case 'market':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string, urgent: boolean) => {
    if (urgent) return 'border-red-200 bg-red-50';
    switch (type) {
      case 'weather':
        return 'border-blue-200 bg-blue-50';
      case 'pest':
        return 'border-orange-200 bg-orange-50';
      case 'market':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
        <div className="max-w-md mx-auto px-4">
          <Card className="card-soft animate-fade-up">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Farmer Login</CardTitle>
              <CardDescription>
                Access your personalized farming dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Mobile Number</label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={10}
                    disabled={otpSent}
                  />
                  {!otpSent && (
                    <Button onClick={handleSendOtp} disabled={phoneNumber.length !== 10}>
                      Send OTP
                    </Button>
                  )}
                </div>
              </div>

              {otpSent && (
                <div className="animate-fade-up">
                  <label className="text-sm font-medium mb-2 block">Enter OTP</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter 4-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={4}
                    />
                    <Button onClick={handleVerifyOtp} disabled={otp.length !== 4}>
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    OTP sent to +91 {phoneNumber}. Use 1234 for demo.
                  </p>
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Phone className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  New to CropSmart? Your account will be created automatically upon OTP verification.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!farmerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {farmerData.name}!
              </h1>
              <p className="text-muted-foreground">
                {farmerData.location} • {farmerData.landSize}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
              className="text-xs"
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">My Crops</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="card-soft animate-fade-up">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bookmark className="h-5 w-5 mr-2 text-primary" />
                    Saved Crops
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {farmerData.savedCrops.length}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Active crop advisories
                  </p>
                </CardContent>
              </Card>

              <Card className="card-soft animate-fade-up">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-orange-500" />
                    Active Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {farmerData.alerts.filter(alert => alert.urgent).length}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Urgent notifications
                  </p>
                </CardContent>
              </Card>

              <Card className="card-soft animate-fade-up">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                    Avg. Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {Math.round(farmerData.predictions.reduce((acc, p) => acc + p.confidence, 0) / farmerData.predictions.length)}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Forecast confidence
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card className="card-soft mt-6 animate-fade-up">
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest notifications for your farm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmerData.alerts.slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      className={`border rounded-lg p-4 ${getAlertColor(alert.type, alert.urgent)}`}
                    >
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{alert.title}</h4>
                            {alert.urgent && (
                              <Badge className="bg-red-100 text-red-800 text-xs">Urgent</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Crops Tab */}
          <TabsContent value="crops" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {farmerData.savedCrops.map((crop, index) => (
                <Card 
                  key={crop.id} 
                  className="card-soft animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={crop.image} 
                        alt={crop.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-sm"
                      />
                      <div>
                        <CardTitle>{crop.name}</CardTitle>
                        <CardDescription>Current stage: {crop.stage}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Next Action:</span>
                        <Badge variant="outline">{crop.nextAction}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Days to Harvest:</span>
                        <span className="font-semibold text-primary">{crop.daysToHarvest} days</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-500"
                          style={{ width: `${100 - (crop.daysToHarvest / 90) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="mt-6">
            <div className="space-y-4">
              {farmerData.alerts.map((alert, index) => (
                <Card 
                  key={alert.id}
                  className={`animate-fade-up transition-all duration-300 hover:shadow-lg ${
                    alert.urgent ? 'border-red-200' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <div className="flex items-center space-x-2">
                            {alert.urgent && (
                              <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                            )}
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{alert.message}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {farmerData.predictions.map((prediction, index) => (
                <Card 
                  key={prediction.crop}
                  className="card-soft animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle>{prediction.crop} Yield Prediction</CardTitle>
                    <CardDescription>
                      Based on current weather and crop conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current Estimate:</span>
                        <span className="font-semibold">{prediction.currentYield} tonnes/ha</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">AI Prediction:</span>
                        <span className="font-semibold text-primary">{prediction.predictedYield} tonnes/ha</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Confidence:</span>
                        <Badge className="bg-green-100 text-green-800">{prediction.confidence}%</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                        {prediction.predictedYield > prediction.currentYield ? (
                          <span className="text-green-600">
                            🌱 Yield expected to increase by {((prediction.predictedYield - prediction.currentYield) / prediction.currentYield * 100).toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-orange-600">
                            ⚠️ Yield may decrease. Follow crop advisory recommendations.
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
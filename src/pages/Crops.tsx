import { useState, useEffect } from 'react';
import { Search, Droplets, Bug, Calendar, TrendingUp, Bookmark, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import tomatoRetro from '@/assets/tomato-retro.jpg';
import carrotRetro from '@/assets/carrot-retro.jpg';
import cornRetro from '@/assets/corn-retro.jpg';
import chiliRetro from '@/assets/chili-retro.jpg';
import onion from '@/assets/onion.jpg';
import Beans from '@/assets/Beans.jpg';
import cabbage from '@/assets/cabbage.jpg';
import potato from '@/assets/potato.jpg';
import brinjal from '@/assets/brinjal.jpg';
import apples from '@/assets/apples.jpg';
import cucumber from '@/assets/cucumber.jpg';
import papaya from '@/assets/papaya.jpg';
import pomo from '@/assets/pomo.jpg';
import grapes from '@/assets/grapes.jpg';

interface Crop {
  id: string;
  name: string;
  image: string;
  category: string;
  season: string;
  sowingTime: string;
  harvestTime: string;
  avgYield: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  advisory: {
    sowing: string[];
    irrigation: string[];
    pests: string[];
    yield: string;
  };
}

const Crops = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);

  useEffect(() => {
    // Get search query from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }

    // Simulated crop data
    const cropData: Crop[] = [
      {
        id: '1',
        name: 'Tomato',
        image: tomatoRetro,
        category: 'Vegetable',
        season: 'Rabi/Summer',
        sowingTime: 'Oct-Dec, Jan-Mar',
        harvestTime: '90-120 days',
        avgYield: '25-35 tonnes/ha',
        difficulty: 'Medium',
        advisory: {
          sowing: [
            'Use certified hybrid seeds for better disease resistance',
            'Treat seeds with fungicide before sowing',
            'Prepare raised beds with good drainage',
            'Maintain row spacing of 75cm and plant spacing of 45cm'
          ],
          irrigation: [
            'Provide light irrigation immediately after transplanting',
            'Water every 3-4 days during initial growth',
            'Reduce watering during fruit ripening to prevent cracking',
            'Use drip irrigation for water efficiency'
          ],
          pests: [
            'Early blight: Apply copper-based fungicide',
            'Whitefly: Use yellow sticky traps',
            'Fruit borer: Install pheromone traps',
            'Bacterial wilt: Ensure proper crop rotation'
          ],
          yield: 'Expected yield: 25-35 tonnes per hectare with good management practices'
        }
      },
      {
        id: '2',
        name: 'Chili',
        image: chiliRetro,
        category: 'Spice',
        season: 'Kharif/Rabi',
        sowingTime: 'Jun-Jul, Nov-Dec',
        harvestTime: '120-150 days',
        avgYield: '12-15 tonnes/ha',
        difficulty: 'Easy',
        advisory: {
          sowing: [
            'Select varieties suitable for Karnataka climate',
            'Prepare nursery beds with well-decomposed FYM',
            'Transplant seedlings at 45-60 days after sowing',
            'Maintain spacing of 60cm x 45cm'
          ],
          irrigation: [
            'Avoid waterlogging in rainy season',
            'Provide irrigation at flowering and fruit development',
            'Use mulching to conserve moisture',
            'Critical water requirement during flowering'
          ],
          pests: [
            'Thrips: Use blue sticky traps',
            'Aphids: Spray neem oil solution',
            'Fruit rot: Ensure good air circulation',
            'Anthracnose: Apply recommended fungicide'
          ],
          yield: 'Expected yield: 12-15 tonnes per hectare of green chili'
        }
      },
      {
        id: '3',
        name: 'Maize',
        image: cornRetro,
        category: 'Cereal',
        season: 'Kharif/Rabi',
        sowingTime: 'Jun-Jul, Nov-Dec',
        harvestTime: '100-120 days',
        avgYield: '6-8 tonnes/ha',
        difficulty: 'Easy',
        advisory: {
          sowing: [
            'Choose appropriate hybrid varieties for your region',
            'Ensure soil pH between 6.0-7.5',
            'Apply basal fertilizers before sowing',
            'Maintain row spacing of 60cm and plant to plant 20cm'
          ],
          irrigation: [
            'Critical stages: knee-high, tasseling, and grain filling',
            'Avoid water stress during silking period',
            'Provide life-saving irrigation if needed',
            'Good drainage is essential during monsoon'
          ],
          pests: [
            'Fall armyworm: Early detection and management',
            'Stem borer: Use pheromone traps',
            'Aphids: Monitor and spray if needed',
            'Turcicum leaf blight: Resistant varieties preferred'
          ],
          yield: 'Expected yield: 6-8 tonnes per hectare with improved varieties'
        }
      },
      {
        id: '4',
        name: 'Onion',
        image: onion,
        category: 'Vegetable',
        season: 'Rabi',
        sowingTime: 'Oct-Nov',
        harvestTime: '120-150 days',
        avgYield: '20-25 tonnes/ha',
        difficulty: 'Medium',
        advisory: {
          sowing: [
            'Select short-day varieties for Karnataka',
            'Prepare well-drained, fertile beds',
            'Transplant seedlings at 6-7 weeks',
            'Maintain proper spacing for bulb development'
          ],
          irrigation: [
            'Regular light irrigation during growth',
            'Stop irrigation 2-3 weeks before harvest',
            'Avoid waterlogging which causes bulb rot',
            'Critical water requirement during bulb formation'
          ],
          pests: [
            'Purple blotch: Apply protective fungicides',
            'Thrips: Use recommended insecticides',
            'Onion fly: Monitor and treat early',
            'Stemphylium blight: Ensure good air circulation'
          ],
          yield: 'Expected yield: 20-25 tonnes per hectare with proper care'
        }
      },
      {
        id: '5',
        name: 'Potato',
        image: potato,
        category: 'Vegetable',
        season: 'Rabi',
        sowingTime: 'Oct-Nov',
        harvestTime: '90-110 days',
        avgYield: '20-30 tonnes/ha',
        difficulty: 'Medium',
        advisory: {
          sowing: [
            'Select certified seed potatoes free from diseases',
            'Cut large tubers 2-3 days before planting',
            'Plant at 60cm row spacing and 20cm plant spacing',
            'Ensure proper soil drainage and organic matter'
          ],
          irrigation: [
            'Light irrigation after planting',
            'Critical water requirement during tuber formation',
            'Avoid waterlogging to prevent rot',
            'Stop irrigation before harvest'
          ],
          pests: [
            'Late blight: Apply preventive fungicides',
            'Aphids: Monitor and spray if needed',
            'Cutworms: Use soil treatment',
            'Potato tuber moth: Proper storage practices'
          ],
          yield: 'Expected yield: 20-30 tonnes per hectare with quality seed'
        }
      },
      {
        id: '6',
        name: 'Cabbage',
        image: cabbage,
        category: 'Vegetable',
        season: 'Rabi',
        sowingTime: 'Aug-Oct',
        harvestTime: '90-120 days',
        avgYield: '40-50 tonnes/ha',
        difficulty: 'Easy',
        advisory: {
          sowing: [
            'Choose varieties suitable for Karnataka climate',
            'Prepare well-drained fertile beds',
            'Transplant seedlings at 4-5 weeks',
            'Maintain 45cm x 45cm spacing'
          ],
          irrigation: [
            'Regular irrigation during head formation',
            'Avoid water stress during growth',
            'Mulching helps retain moisture',
            'Proper drainage essential'
          ],
          pests: [
            'Diamond back moth: Use BT spray',
            'Aphids: Spray neem oil',
            'Clubroot: Soil pH management',
            'Caterpillars: Manual removal and spraying'
          ],
          yield: 'Expected yield: 40-50 tonnes per hectare with proper care'
        }
      },
      {
        id: '7',
        name: 'Carrot',
        image: carrotRetro,
        category: 'Vegetable',
        season: 'Rabi',
        sowingTime: 'Oct-Dec',
        harvestTime: '100-120 days',
        avgYield: '25-30 tonnes/ha',
        difficulty: 'Easy',
        advisory: {
          sowing: [
            'Direct seeding in well-prepared beds',
            'Maintain proper soil texture',
            'Row spacing of 30cm and thin to 5cm',
            'Use organic matter for better root development'
          ],
          irrigation: [
            'Light frequent irrigation',
            'Avoid waterlogging',
            'Critical during root development',
            'Reduce irrigation before harvest'
          ],
          pests: [
            'Root fly: Use crop rotation',
            'Aphids: Regular monitoring',
            'Nematodes: Soil solarization',
            'Leaf blight: Fungicide application'
          ],
          yield: 'Expected yield: 25-30 tonnes per hectare of quality roots'
        }
      },
      {
        id: '8',
        name: 'Brinjal',
        image: brinjal,
        category: 'Vegetable',
        season: 'Kharif/Rabi',
        sowingTime: 'Jun-Jul, Nov-Dec',
        harvestTime: '120-150 days',
        avgYield: '30-40 tonnes/ha',
        difficulty: 'Medium',
        advisory: {
          sowing: [
            'Use disease-resistant varieties',
            'Transplant healthy seedlings',
            'Maintain 75cm x 60cm spacing',
            'Apply organic manure before planting'
          ],
          irrigation: [
            'Regular irrigation during flowering',
            'Avoid water stress',
            'Drip irrigation preferred',
            'Proper drainage essential'
          ],
          pests: [
            'Shoot borer: Use pheromone traps',
            'Fruit borer: Regular monitoring',
            'Aphids: Neem oil spray',
            'Bacterial wilt: Resistant varieties'
          ],
          yield: 'Expected yield: 30-40 tonnes per hectare with good management'
        }
      },
      {
        id: '9',
        name: 'Cucumber',
        image: cucumber,
        category: 'Vegetable',
        season: 'Summer/Rabi',
        sowingTime: 'Oct-Nov, Feb-Mar',
        harvestTime: '60-80 days',
        avgYield: '15-20 tonnes/ha',
        difficulty: 'Easy',
        advisory: {
          sowing: [
            'Direct seeding or transplanting',
            'Prepare raised beds for drainage',
            'Use trellising for vine support',
            'Maintain 1.5m x 0.5m spacing'
          ],
          irrigation: [
            'Frequent light irrigation',
            'Critical during fruit development',
            'Avoid overhead irrigation',
            'Mulching helps moisture retention'
          ],
          pests: [
            'Downy mildew: Protective sprays',
            'Aphids: Yellow sticky traps',
            'Fruit flies: Monitoring and control',
            'Powdery mildew: Sulfur application'
          ],
          yield: 'Expected yield: 15-20 tonnes per hectare of quality fruits'
        }
      },
      {
        id: '10',
        name: 'apple',
        image: apples,
        category: 'Fruit',
        season: 'Perennial',
        sowingTime: 'Jun-Aug',
        harvestTime: '3-5 years',
        avgYield: '100-150 fruits/tree',
        difficulty: 'Hard',
        advisory: {
          sowing: [
            'Select grafted saplings of proven varieties',
            'Plant during monsoon season',
            'Maintain 8m x 8m spacing',
            'Prepare large pits with organic matter'
          ],
          irrigation: [
            'Regular watering for young plants',
            'Reduce irrigation during flowering',
            'Drip irrigation for mature trees',
            'Water stress during fruit set'
          ],
          pests: [
            'Fruit fly: Use fruit bagging',
            'Anthracnose: Copper fungicide',
            'Hoppers: Monitoring and spraying',
            'Powdery mildew: Preventive measures'
          ],
          yield: 'Expected yield: 100-150 fruits per tree at maturity'
        }
      },
      {
        id: '11',
        name: 'Papaya',
        image: papaya,
        category: 'Fruit',
        season: 'Year-round',
        sowingTime: 'Throughout year',
        harvestTime: '8-12 months',
        avgYield: '50-80 tonnes/ha',
        difficulty: 'Medium',
        advisory: {
          sowing: [
            'Use tissue culture plants for uniformity',
            'Plant during favorable weather',
            'Maintain 2m x 2m spacing',
            'Ensure proper drainage'
          ],
          irrigation: [
            'Regular irrigation required',
            'Avoid waterlogging',
            'Drip irrigation preferred',
            'Mulching around plants'
          ],
          pests: [
            'Papaya ringspot virus: Use resistant varieties',
            'Fruit fly: Monitoring and bagging',
            'Aphids: Regular spraying',
            'Root rot: Proper drainage'
          ],
          yield: 'Expected yield: 50-80 tonnes per hectare with dwarf varieties'
        }
      },
      {
        id: '12',
        name: 'Grapes',
        image: grapes,
        category: 'Fruit',
        season: 'Rabi',
        sowingTime: 'Oct-Nov',
        harvestTime: '16-18 months',
        avgYield: '25-30 tonnes/ha',
        difficulty: 'Hard',
        advisory: {
          sowing: [
            'Use grafted vines on rootstock',
            'Prepare well-drained vineyard',
            'Install trellising system',
            'Maintain 3m x 1.5m spacing'
          ],
          irrigation: [
            'Drip irrigation mandatory',
            'Controlled irrigation for quality',
            'Reduce water during ripening',
            'Proper drainage essential'
          ],
          pests: [
            'Downy mildew: Copper sprays',
            'Thrips: Blue sticky traps',
            'Anthracnose: Fungicide application',
            'Mealybugs: Biological control'
          ],
          yield: 'Expected yield: 25-30 tonnes per hectare with proper management'
        }
      },
      {
        id: '13',
        name: 'Pomegranate',
        image: pomo,
        category: 'Fruit',
        season: 'Perennial',
        sowingTime: 'Jun-Aug',
        harvestTime: '2-3 years',
        avgYield: '15-20 tonnes/ha',
        difficulty: 'Medium',
        advisory: {
          sowing: [
            'Use disease-free grafted plants',
            'Plant during monsoon',
            'Maintain 4m x 4m spacing',
            'Prepare deep pits with compost'
          ],
          irrigation: [
            'Drip irrigation recommended',
            'Avoid water stress during fruit development',
            'Reduce irrigation near harvest',
            'Mulching helps moisture conservation'
          ],
          pests: [
            'Fruit borer: Pheromone traps',
            'Aphids: Neem oil application',
            'Bacterial blight: Copper sprays',
            'Thrips: Monitoring and control'
          ],
          yield: 'Expected yield: 15-20 tonnes per hectare at full bearing'
        }
      },
      {
        id: '14',
        name: 'Green Beans',
        image: Beans,
        category: 'Vegetable',
        season: 'Rabi/Summer',
        sowingTime: 'Oct-Nov, Feb-Mar',
        harvestTime: '60-75 days',
        avgYield: '8-12 tonnes/ha',
        difficulty: 'Easy',
        advisory: {
          sowing: [
            'Direct seeding in rows',
            'Use bush or pole varieties',
            'Maintain 30cm row spacing',
            'Apply organic matter before sowing'
          ],
          irrigation: [
            'Regular light irrigation',
            'Critical during flowering and pod formation',
            'Avoid waterlogging',
            'Mulching recommended'
          ],
          pests: [
            'Bean fly: Use seed treatment',
            'Aphids: Regular monitoring',
            'Pod borer: IPM approach',
            'Rust: Resistant varieties'
          ],
          yield: 'Expected yield: 8-12 tonnes per hectare of tender pods'
        }
      }
    ];
    setCrops(cropData);
  }, []);

  const categories = ['all', 'Vegetable', 'Fruit', 'Cereal', 'Spice', 'Pulse'];

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Crop Advisory System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get comprehensive farming guidance for crops grown in Karnataka
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crop List */}
          <div className="lg:col-span-1">
            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Crop Cards */}
            <div className="space-y-4">
              {filteredCrops.map((crop, index) => (
                <Card 
                  key={crop.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-up ${
                    selectedCrop?.id === crop.id ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedCrop(crop)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={crop.image} 
                        alt={crop.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{crop.name}</h3>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{crop.category}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className={getDifficultyColor(crop.difficulty)}>
                            {crop.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{crop.season}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Crop Details */}
          <div className="lg:col-span-2">
            {selectedCrop ? (
              <Card className="card-soft animate-fade-up">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedCrop.image} 
                      alt={selectedCrop.name}
                      className="w-20 h-20 rounded-xl object-cover shadow-md"
                    />
                    <div>
                      <CardTitle className="text-2xl">{selectedCrop.name}</CardTitle>
                      <CardDescription className="text-lg">{selectedCrop.category}</CardDescription>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge className={getDifficultyColor(selectedCrop.difficulty)}>
                          {selectedCrop.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{selectedCrop.season}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Quick Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Sowing Time</p>
                      <p className="text-xs text-muted-foreground">{selectedCrop.sowingTime}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <TrendingUp className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Harvest Time</p>
                      <p className="text-xs text-muted-foreground">{selectedCrop.harvestTime}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <TrendingUp className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Average Yield</p>
                      <p className="text-xs text-muted-foreground">{selectedCrop.avgYield}</p>
                    </div>
                  </div>

                  {/* Detailed Advisory */}
                  <Tabs defaultValue="sowing" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="sowing">Sowing</TabsTrigger>
                      <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
                      <TabsTrigger value="pests">Pests & Diseases</TabsTrigger>
                      <TabsTrigger value="yield">Yield</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="sowing" className="mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          Sowing Instructions
                        </h4>
                        <ul className="space-y-2">
                          {selectedCrop.advisory.sowing.map((instruction, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="irrigation" className="mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center">
                          <Droplets className="h-4 w-4 mr-2 text-primary" />
                          Irrigation Guidance
                        </h4>
                        <ul className="space-y-2">
                          {selectedCrop.advisory.irrigation.map((instruction, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pests" className="mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center">
                          <Bug className="h-4 w-4 mr-2 text-primary" />
                          Pest & Disease Management
                        </h4>
                        <ul className="space-y-2">
                          {selectedCrop.advisory.pests.map((instruction, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="yield" className="mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                          Yield Forecast
                        </h4>
                        <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                          {selectedCrop.advisory.yield}
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Save Button */}
                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save to My Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="card-soft h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a crop to view detailed advisory information</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crops;
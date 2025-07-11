import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShopItem } from '../types/game';
import { FOOD_ITEMS, PET_SHOP, TOYS_AND_ACCESSORIES } from '../data/shopItems';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Coins, ShoppingCart, Sparkles } from 'lucide-react';

interface ShopProps {
  coins: number;
  unlockedCharacters: string[];
  onBuyItem: (item: ShopItem) => void;
  onBuyPet: (petType: string, price: number) => void;
  onFeedPet: (food: ShopItem) => void;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'bg-gray-500';
    case 'uncommon': return 'bg-green-500';
    case 'rare': return 'bg-blue-500';
    case 'epic': return 'bg-purple-500';
    case 'legendary': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

const getRarityGradient = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'from-gray-50 to-gray-100';
    case 'uncommon': return 'from-green-50 to-green-100';
    case 'rare': return 'from-blue-50 to-blue-100';
    case 'epic': return 'from-purple-50 to-purple-100';
    case 'legendary': return 'from-yellow-50 to-yellow-100';
    default: return 'from-gray-50 to-gray-100';
  }
};

export const Shop: React.FC<ShopProps> = ({ 
  coins, 
  unlockedCharacters, 
  onBuyItem, 
  onBuyPet, 
  onFeedPet 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('food');

  const canAfford = (price: number) => coins >= price;

  const FoodSection = () => (
    <ScrollArea className="h-[600px] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {FOOD_ITEMS.map((food) => (
          <motion.div
            key={food.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.random() * 0.1 }}
          >
            <Card className={`relative overflow-hidden bg-gradient-to-br ${getRarityGradient(food.rarity)} hover:shadow-lg transition-all duration-300 ${!canAfford(food.price) ? 'opacity-50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{food.emoji}</div>
                  <Badge className={`${getRarityColor(food.rarity)} text-white`}>
                    {food.rarity}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{food.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">{food.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span>❤️ +{food.effects.happiness}</span>
                    <span>🍽️ +{food.effects.hunger}</span>
                    {food.effects.health && <span>🏥 +{food.effects.health}</span>}
                    {food.effects.energy && <span>⚡ +{food.effects.energy}</span>}
                  </div>
                  {food.effects.experience && (
                    <div className="text-sm text-purple-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      +{food.effects.experience} XP
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-600 font-bold">
                    <Coins className="w-4 h-4" />
                    {food.price}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onBuyItem(food)}
                      disabled={!canAfford(food.price)}
                      className="flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Buy
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onFeedPet(food)}
                      disabled={!canAfford(food.price)}
                      className="flex items-center gap-1"
                    >
                      🍽️ Feed
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );

  const PetSection = () => (
    <ScrollArea className="h-[600px] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {PET_SHOP.map((pet) => (
          <motion.div
            key={pet.petType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.random() * 0.1 }}
          >
            <Card className={`relative overflow-hidden bg-gradient-to-br ${getRarityGradient(pet.rarity)} hover:shadow-lg transition-all duration-300 ${!canAfford(pet.price) || unlockedCharacters.includes(pet.petType) ? 'opacity-50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{pet.emoji}</div>
                  <Badge className={`${getRarityColor(pet.rarity)} text-white`}>
                    {pet.rarity}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{pet.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">{pet.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-600 font-bold">
                    <Coins className="w-4 h-4" />
                    {pet.price === 0 ? 'Free!' : pet.price}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onBuyPet(pet.petType, pet.price)}
                    disabled={!canAfford(pet.price) || unlockedCharacters.includes(pet.petType)}
                    className="flex items-center gap-1"
                  >
                    {unlockedCharacters.includes(pet.petType) ? '✅ Owned' : '🛒 Adopt'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );

  const ToysSection = () => (
    <ScrollArea className="h-[600px] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {TOYS_AND_ACCESSORIES.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.random() * 0.1 }}
          >
            <Card className={`relative overflow-hidden bg-gradient-to-br ${getRarityGradient(item.rarity)} hover:shadow-lg transition-all duration-300 ${!canAfford(item.price) ? 'opacity-50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{item.emoji}</div>
                  <Badge className={`${getRarityColor(item.rarity)} text-white`}>
                    {item.rarity}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    {item.effects.happiness > 0 && <span>❤️ +{item.effects.happiness}</span>}
                    {item.effects.health && item.effects.health > 0 && <span>🏥 +{item.effects.health}</span>}
                    {item.effects.energy && item.effects.energy < 0 && <span>⚡ {item.effects.energy}</span>}
                  </div>
                  {item.effects.experience && (
                    <div className="text-sm text-purple-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      +{item.effects.experience} XP
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-600 font-bold">
                    <Coins className="w-4 h-4" />
                    {item.price}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onBuyItem(item)}
                    disabled={!canAfford(item.price)}
                    className="flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">🛍️ Pet Shop</h2>
        <div className="flex items-center gap-2 text-lg">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-yellow-600">{coins}</span>
          <span className="text-muted-foreground">coins</span>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="food">🍖 Food</TabsTrigger>
          <TabsTrigger value="pets">🦄 Pets</TabsTrigger>
          <TabsTrigger value="toys">🎾 Toys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="food" className="mt-4">
          <FoodSection />
        </TabsContent>
        
        <TabsContent value="pets" className="mt-4">
          <PetSection />
        </TabsContent>
        
        <TabsContent value="toys" className="mt-4">
          <ToysSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { PetDisplay } from './components/PetDisplay';
import { Shop } from './components/Shop';
import { GameStats } from './components/GameStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Coins, Heart, Zap, Plus, Sparkles, Clock, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ShopItem } from './types/game';
import { AVAILABLE_PASSES } from './data/passes';

function App() {
  const { gameState, feedPet, playWithPet, buyItem, buyPet, switchPet, earnCoins, buyVipPass, buyPass } = useGameState();
  const [activeTab, setActiveTab] = useState('pet');

  const handlePlayWithPet = () => {
    if (gameState.currentPet.stats.energy < 10) {
      toast.error('Your pet is too tired to play! 😴');
      return;
    }
    playWithPet();
    const baseCoins = Math.floor(Math.random() * 10) + 5;
    const coinsEarned = gameState.vipPass.active ? baseCoins * 2 : baseCoins;
    const vipBonus = gameState.vipPass.active ? ' (VIP 2x Bonus!)' : '';
    toast.success(`🎾 Had fun playing! Earned ${coinsEarned} coins! 🪙${vipBonus}`);
  };

  const handleBuyVipPass = () => {
    if (gameState.coins < 4500) {
      toast.error('Not enough coins! Need 4,500 coins for VIP Pass! 💰');
      return;
    }
    if (gameState.vipPass.active) {
      toast.error('You already have an active VIP Pass! 👑');
      return;
    }
    buyVipPass();
    toast.success('🎉 VIP Pass activated! Enjoy 2x coins and exclusive benefits! 👑');
  };

  const handleBuyPass = (passId: string, price: number, duration: number) => {
    if (gameState.coins < price) {
      toast.error('Not enough coins! 💰');
      return;
    }
    if (gameState.ownedPasses.some(p => p.passId === passId && p.active)) {
      toast.error('You already have this pass active! ✨');
      return;
    }
    buyPass(passId, price, duration);
    const pass = AVAILABLE_PASSES.find(p => p.id === passId);
    toast.success(`🎉 ${pass?.name} activated! Enjoy the benefits! ${pass?.icon}`);
  };

  const handleFeedPet = (food: ShopItem) => {
    if (gameState.coins < food.price) {
      toast.error('Not enough coins! 💰');
      return;
    }
    feedPet(food);
    toast.success(`🍽️ ${gameState.currentPet.name} enjoyed the ${food.name}! 😋`);
  };

  const handleBuyItem = (item: ShopItem) => {
    if (gameState.coins < item.price) {
      toast.error('Not enough coins! 💰');
      return;
    }
    buyItem(item);
    toast.success(`✨ Bought ${item.name} for ${item.price} coins! 🛍️`);
  };

  const handleBuyPet = (petType: string, price: number) => {
    if (gameState.coins < price) {
      toast.error('Not enough coins! 💰');
      return;
    }
    if (gameState.unlockedCharacters.includes(petType)) {
      toast.error('You already own this pet! 🐾');
      return;
    }
    buyPet(petType, price);
    toast.success(`🎉 Adopted a new pet! Welcome to the family! 🏠`);
  };

  const handleSwitchPet = (petType: string) => {
    if (!gameState.unlockedCharacters.includes(petType)) {
      toast.error('You don\'t own this pet yet! 🔒');
      return;
    }
    switchPet(petType);
    toast.success(`🔄 Switched to your ${petType}! 🐾`);
  };

  const canPlay = gameState.currentPet.stats.energy >= 10;
  const petHealth = gameState.currentPet.stats.health;
  const overallMood = Math.floor((gameState.currentPet.stats.happiness + gameState.currentPet.stats.hunger + gameState.currentPet.stats.energy) / 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🐾 Virtual Pet Paradise
          </h1>
          <p className="text-lg text-muted-foreground">
            Raise, care for, and collect amazing pets in your digital world!
          </p>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-lg font-bold text-yellow-600">{gameState.coins}</span>
                    <span className="text-sm text-muted-foreground">coins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-lg font-bold text-red-600">{overallMood}%</span>
                    <span className="text-sm text-muted-foreground">mood</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <span className="text-lg font-bold text-blue-600">{gameState.currentPet.stats.level}</span>
                    <span className="text-sm text-muted-foreground">level</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={petHealth > 80 ? "default" : petHealth > 50 ? "secondary" : "destructive"}>
                    {petHealth > 80 ? "😊 Happy" : petHealth > 50 ? "😐 Okay" : "😢 Needs Care"}
                  </Badge>
                  <Badge variant="outline">{gameState.unlockedCharacters.length} pets</Badge>
                  {gameState.vipPass.active && (
                    <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                      👑 VIP ACTIVE
                    </Badge>
                  )}
                  {gameState.ownedPasses.filter(p => p.active).length > 0 && (
                    <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-cyan-500">
                      ✨ {gameState.ownedPasses.filter(p => p.active).length} PASS{gameState.ownedPasses.filter(p => p.active).length > 1 ? 'ES' : ''}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Game Area */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="pet" className="flex items-center gap-2">
              🐾 My Pet
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex items-center gap-2">
              🛍️ Shop
            </TabsTrigger>
            <TabsTrigger value="passes" className="flex items-center gap-2">
              ✨ Passes
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              📊 Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pet" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <PetDisplay
                pet={gameState.currentPet}
                onPlay={handlePlayWithPet}
                canPlay={canPlay}
              />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handlePlayWithPet}
                    disabled={!canPlay}
                    className="w-full"
                    size="lg"
                  >
                    🎾 Play & Earn Coins
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => setActiveTab('shop')}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      🍖 Feed Pet
                    </Button>
                    <Button
                      onClick={() => setActiveTab('shop')}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      🎁 Buy Items
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto"
            >
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-center text-lg">💡 Pro Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span>🎮</span>
                    <span>Playing earns coins and experience points!</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>🍽️</span>
                    <span>Well-fed pets are happier and gain more XP!</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>⚡</span>
                    <span>Rest your pet when energy is low!</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>🛍️</span>
                    <span>Rare items provide bigger stat boosts!</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="shop">
            <Shop
              coins={gameState.coins}
              unlockedCharacters={gameState.unlockedCharacters}
              onBuyItem={handleBuyItem}
              onBuyPet={handleBuyPet}
              onFeedPet={handleFeedPet}
            />
          </TabsContent>

          <TabsContent value="passes">
            <div className="max-w-7xl mx-auto p-4">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ✨ Premium Passes
                </h2>
                <p className="text-muted-foreground mb-4">
                  Unlock exclusive benefits and boost your pet care experience!
                </p>
                <div className="flex items-center gap-2 text-lg mb-6">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-yellow-600">{gameState.coins}</span>
                  <span className="text-muted-foreground">coins</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AVAILABLE_PASSES.map((pass, index) => {
                  const isActive = gameState.ownedPasses.some(p => p.passId === pass.id && p.active);
                  const canAfford = gameState.coins >= pass.price;
                  
                  return (
                    <motion.div
                      key={pass.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`relative overflow-hidden h-full transition-all duration-300 hover:shadow-lg ${isActive ? 'ring-2 ring-purple-500' : ''} ${!canAfford && !isActive ? 'opacity-75' : ''}`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${pass.gradient} opacity-10`} />
                        
                        {isActive && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            ACTIVE
                          </div>
                        )}
                        
                        <CardHeader className="relative pb-3">
                          <div className="flex items-center justify-between">
                            <div className="text-4xl">{pass.icon}</div>
                            <Badge className={`${
                              pass.rarity === 'legendary' ? 'bg-yellow-500' :
                              pass.rarity === 'epic' ? 'bg-purple-500' :
                              pass.rarity === 'rare' ? 'bg-blue-500' :
                              pass.rarity === 'uncommon' ? 'bg-green-500' :
                              'bg-gray-500'
                            } text-white`}>
                              {pass.rarity}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{pass.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{pass.description}</p>
                        </CardHeader>
                        
                        <CardContent className="relative pt-0 flex flex-col h-full">
                          <div className="flex-1">
                            <div className="space-y-2 mb-4">
                              {pass.benefits.coinMultiplier && pass.benefits.coinMultiplier > 1 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                  <span>{pass.benefits.coinMultiplier}x Coin Rewards</span>
                                </div>
                              )}
                              {pass.benefits.xpMultiplier && pass.benefits.xpMultiplier > 1 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                  <span>{pass.benefits.xpMultiplier}x XP Gain</span>
                                </div>
                              )}
                              {pass.benefits.energyRegenBonus && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                  <span>+{pass.benefits.energyRegenBonus} Energy Regen</span>
                                </div>
                              )}
                              {pass.benefits.happinessBonus && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                  <span>+{pass.benefits.happinessBonus} Happiness</span>
                                </div>
                              )}
                              {pass.benefits.shopDiscount && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                  <span>{pass.benefits.shopDiscount}% Shop Discount</span>
                                </div>
                              )}
                              {pass.benefits.exclusiveContent && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                  <span>Exclusive Content Access</span>
                                </div>
                              )}
                              {pass.benefits.autoFeeding && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                  <span>Auto-Feeding</span>
                                </div>
                              )}
                              {pass.benefits.instantCooldown && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                  <span>Instant Cooldowns</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                              <Clock className="w-4 h-4" />
                              <span>{pass.duration} days</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1 text-yellow-600 font-bold">
                              <Coins className="w-4 h-4" />
                              {pass.price.toLocaleString()}
                            </div>
                            <Button
                              onClick={() => handleBuyPass(pass.id, pass.price, pass.duration)}
                              disabled={!canAfford || isActive}
                              className={`bg-gradient-to-r ${pass.gradient} hover:opacity-90 text-white`}
                            >
                              {isActive ? '✨ Active' : canAfford ? '🛍️ Buy' : '🔒 Locked'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <GameStats
              gameState={gameState}
              onSwitchPet={handleSwitchPet}
            />
          </TabsContent>
        </Tabs>

        {/* VIP Pass & Daily Bonus */}
        <div className="mt-8 max-w-md mx-auto space-y-4">
          {/* VIP Pass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                      👑 VIP Pass
                    </h3>
                    <p className="text-sm text-purple-600">
                      {gameState.vipPass.active ? "Active - 2x coin rewards!" : "Get 2x coins & exclusive benefits!"}
                    </p>
                    <p className="text-xs text-purple-500 mt-1">
                      {gameState.vipPass.active 
                        ? `Expires: ${new Date(gameState.vipPass.expiresAt).toLocaleDateString()}`
                        : "30 days for 4,500 coins"
                      }
                    </p>
                  </div>
                  <Button
                    onClick={handleBuyVipPass}
                    disabled={gameState.vipPass.active || gameState.coins < 4500}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {gameState.vipPass.active ? "👑 Active" : "💰 4,500"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Daily Bonus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800">Daily Bonus</h3>
                    <p className="text-sm text-green-600">Come back tomorrow for free coins!</p>
                  </div>
                  <Button
                    onClick={() => {
                      earnCoins(50);
                      toast.success('🎁 Received 50 daily bonus coins! 🪙');
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Claim
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
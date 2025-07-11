import React from 'react';
import { motion } from 'framer-motion';
import { GameState } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Coins, Trophy, Clock, Star } from 'lucide-react';

interface GameStatsProps {
  gameState: GameState;
  onSwitchPet: (petType: string) => void;
}

export const GameStats: React.FC<GameStatsProps> = ({ gameState, onSwitchPet }) => {
  const timePlayed = Math.floor((Date.now() - gameState.gameStarted) / (1000 * 60 * 60 * 24));
  const totalPets = gameState.unlockedCharacters.length;
  const inventoryValue = gameState.inventory.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coins</CardTitle>
            <Coins className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{gameState.coins}</div>
            <p className="text-xs text-muted-foreground">Your wealth</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pet Level</CardTitle>
            <Star className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{gameState.currentPet.stats.level}</div>
            <p className="text-xs text-muted-foreground">
              {gameState.currentPet.stats.experience}/{gameState.currentPet.stats.experienceToNext} XP
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pets Owned</CardTitle>
            <Trophy className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalPets}</div>
            <p className="text-xs text-muted-foreground">Collection size</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Played</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{timePlayed}</div>
            <p className="text-xs text-muted-foreground">Time invested</p>
          </CardContent>
        </Card>
      </motion.div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏆 Your Pet Collection
            <Badge variant="secondary">{totalPets} pets</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {gameState.unlockedCharacters.map((petType, index) => (
              <motion.div
                key={petType}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={gameState.currentPet.type === petType ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSwitchPet(petType)}
                  className="h-12 w-12 p-0 text-2xl"
                >
                  {getPetEmoji(petType)}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {gameState.inventory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎒 Inventory
              <Badge variant="secondary">{gameState.inventory.length} items</Badge>
              <Badge variant="outline">Value: {inventoryValue} coins</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {gameState.inventory.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="h-8 flex items-center gap-1"
                  >
                    {item.emoji} {item.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const getPetEmoji = (petType: string): string => {
  const emojis: Record<string, string> = {
    dog: '🐕',
    cat: '🐱',
    rabbit: '🐰',
    hamster: '🐹',
    bird: '🐦',
    fish: '🐠',
    dragon: '🐉',
    unicorn: '🦄',
    phoenix: '🔥',
    tiger: '🐅',
    lion: '🦁',
    elephant: '🐘',
    panda: '🐼',
    wolf: '🐺',
    fox: '🦊',
    bear: '🐻',
    // Add more as needed
  };
  return emojis[petType] || '🐾';
};
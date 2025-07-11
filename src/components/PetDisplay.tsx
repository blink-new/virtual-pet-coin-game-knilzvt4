import React from 'react';
import { motion } from 'framer-motion';
import { Pet } from '../types/game';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface PetDisplayProps {
  pet: Pet;
  onPlay: () => void;
  canPlay: boolean;
}

const PET_EMOJIS: Record<string, string> = {
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
  deer: '🦌',
  owl: '🦉',
  eagle: '🦅',
  parrot: '🦜',
  penguin: '🐧',
  koala: '🐨',
  kangaroo: '🦘',
  zebra: '🦓',
  giraffe: '🦒',
  turtle: '🐢',
  shark: '🦈',
  whale: '🐋',
  dolphin: '🐬',
  monkey: '🐵',
  gorilla: '🦍',
  leopard: '🐆',
  cheetah: '🐆',
  jaguar: '🐆',
  lynx: '🐯',
  panther: '🐅',
  seal: '🦭',
  otter: '🦦',
  horse: '🐎',
  cow: '🐄',
  pig: '🐷',
  sheep: '🐑',
  goat: '🐐',
  chicken: '🐔',
  duck: '🦆',
  swan: '🦢',
  flamingo: '🦩',
  peacock: '🦚',
  bat: '🦇',
  octopus: '🐙',
  jellyfish: '🪼',
  crab: '🦀',
  lobster: '🦞',
  snail: '🐌',
  butterfly: '🦋',
  bee: '🐝',
  spider: '🕷️',
  ant: '🐜',
  beetle: '🪲',
  cricket: '🦗',
  scorpion: '🦂',
  snake: '🐍',
  lizard: '🦎',
  crocodile: '🐊',
  frog: '🐸',
  salamander: '🦎',
  
  // Mythical creatures
  griffin: '🦅',
  pegasus: '🐎',
  kraken: '🐙',
  sphinx: '🦁',
  chimera: '🦁',
  wyvern: '🐉',
  basilisk: '🐍',
  leviathan: '🐋',
  bahamut: '🐉',
  fenrir: '🐺',
  qilin: '🦄',
  roc: '🦅',
  'world-tree': '🌳',
  'cosmic-cat': '🌌',
  'time-dragon': '⏰',
  'void-whale': '🌌',
  'creation-spirit': '✨',
  
  // Ultra-Premium Legendary Pets
  'omnipotent-deity': '🌟',
  'reality-weaver': '🕸️',
  'dimension-lord': '🌌',
  'infinity-serpent': '🐍',
  'quantum-phoenix': '🔥',
  'eternal-guardian': '🛡️',
  'celestial-emperor': '👑',
  'void-creator': '🌑',
  'primordial-titan': '⛰️',
  'cosmic-architect': '🏗️',
  'transcendent-sage': '🧙',
  'astral-emperor': '🌠',
  'genesis-beast': '🦣',
  'omniscient-eye': '👁️',
  'universal-heart': '💝',
};

// Add fallback emojis for any missed pet types
const getPetEmoji = (petType: string): string => {
  return PET_EMOJIS[petType] || '🐾';
};

// Status color helper (for future use)
// const getStatusColor = (value: number) => {
//   if (value >= 80) return 'bg-green-500';
//   if (value >= 60) return 'bg-yellow-500';
//   if (value >= 40) return 'bg-orange-500';
//   return 'bg-red-500';
// };

const getMoodEmoji = (happiness: number, hunger: number, energy: number) => {
  if (happiness >= 80 && hunger >= 60 && energy >= 70) return '😊';
  if (happiness >= 60 && hunger >= 40 && energy >= 50) return '😐';
  if (happiness <= 30 || hunger <= 20 || energy <= 20) return '😢';
  return '🙂';
};

export const PetDisplay: React.FC<PetDisplayProps> = ({ pet, onPlay, canPlay }) => {
  const petEmoji = getPetEmoji(pet.type);
  const moodEmoji = getMoodEmoji(pet.stats.happiness, pet.stats.hunger, pet.stats.energy);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <motion.div
            className="text-8xl mb-2 cursor-pointer select-none"
            animate={{ 
              scale: canPlay ? [1, 1.05, 1] : 1,
              rotate: canPlay ? [0, 2, -2, 0] : 0
            }}
            transition={{ 
              duration: 2,
              repeat: canPlay ? Infinity : 0,
              repeatType: "reverse"
            }}
            onClick={canPlay ? onPlay : undefined}
            whileHover={canPlay ? { scale: 1.1 } : undefined}
            whileTap={canPlay ? { scale: 0.95 } : undefined}
          >
            {petEmoji}
          </motion.div>
          <h2 className="text-2xl font-bold mb-1">{pet.name}</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="secondary" className="text-sm">
              Level {pet.stats.level}
            </Badge>
            <span className="text-2xl">{moodEmoji}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {pet.stats.experience}/{pet.stats.experienceToNext} XP
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                ❤️ Happiness
              </span>
              <span className="font-medium">{pet.stats.happiness}%</span>
            </div>
            <Progress value={pet.stats.happiness} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                🍽️ Hunger
              </span>
              <span className="font-medium">{pet.stats.hunger}%</span>
            </div>
            <Progress 
              value={pet.stats.hunger} 
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                ⚡ Energy
              </span>
              <span className="font-medium">{pet.stats.energy}%</span>
            </div>
            <Progress value={pet.stats.energy} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                🏥 Health
              </span>
              <span className="font-medium">{pet.stats.health}%</span>
            </div>
            <Progress value={pet.stats.health} className="h-2" />
          </div>
        </div>

        {canPlay && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground mb-2">
              Click your pet to play! 🎾
            </p>
            <div className="text-xs text-muted-foreground">
              Playing earns coins and experience
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
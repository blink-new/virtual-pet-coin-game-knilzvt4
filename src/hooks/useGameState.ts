import { useState, useEffect, useCallback } from 'react';
import { PetStats, GameState, ShopItem, PetType, OwnedPass } from '../types/game';
import { getActivePassBenefits } from '../data/passes';

const INITIAL_PET_STATS: PetStats = {
  happiness: 75,
  hunger: 50,
  energy: 80,
  health: 100,
  level: 1,
  experience: 0,
  experienceToNext: 100,
};

const INITIAL_GAME_STATE: GameState = {
  coins: 50,
  currentPet: {
    id: 'starter',
    name: 'Buddy',
    type: 'dog',
    stats: INITIAL_PET_STATS,
    lastFed: Date.now(),
    lastPlayed: Date.now(),
  },
  ownedPets: [],
  inventory: [],
  unlockedCharacters: ['dog', 'cat', 'rabbit'],
  gameStarted: Date.now(),
  vipPass: {
    active: false,
    purchasedAt: 0,
    expiresAt: 0,
  },
  ownedPasses: [],
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('virtualPetGame');
    if (saved) {
      const parsedState = JSON.parse(saved);
      // Migration for VIP Pass feature
      if (!parsedState.vipPass) {
        parsedState.vipPass = {
          active: false,
          purchasedAt: 0,
          expiresAt: 0,
        };
      }
      // Migration for new passes system
      if (!parsedState.ownedPasses) {
        parsedState.ownedPasses = [];
      }
      return parsedState;
    }
    return INITIAL_GAME_STATE;
  });

  // Auto-save game state
  useEffect(() => {
    localStorage.setItem('virtualPetGame', JSON.stringify(gameState));
  }, [gameState]);

  // Auto-decay system - pets get hungrier and less energetic over time
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const now = Date.now();
        const timeSinceLastFed = now - prev.currentPet.lastFed;
        const timeSinceLastPlayed = now - prev.currentPet.lastPlayed;
        
        // Decay rates (every 30 seconds in real time)
        const hungerDecay = Math.floor(timeSinceLastFed / 30000) * 5;
        const energyDecay = Math.floor(timeSinceLastPlayed / 45000) * 3;
        const happinessDecay = Math.floor(timeSinceLastFed / 60000) * 2;
        
        return {
          ...prev,
          currentPet: {
            ...prev.currentPet,
            stats: {
              ...prev.currentPet.stats,
              hunger: Math.max(0, prev.currentPet.stats.hunger - hungerDecay),
              energy: Math.max(0, prev.currentPet.stats.energy - energyDecay),
              happiness: Math.max(0, prev.currentPet.stats.happiness - happinessDecay),
            }
          }
        };
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const feedPet = useCallback((food: ShopItem) => {
    setGameState(prev => {
      const newStats = { ...prev.currentPet.stats };
      newStats.hunger = Math.min(100, newStats.hunger + food.effects.hunger);
      newStats.happiness = Math.min(100, newStats.happiness + food.effects.happiness);
      newStats.health = Math.min(100, newStats.health + (food.effects.health || 0));
      
      // Add experience
      newStats.experience += food.effects.experience || 5;
      
      // Level up check
      if (newStats.experience >= newStats.experienceToNext) {
        newStats.level += 1;
        newStats.experience = 0;
        newStats.experienceToNext = Math.floor(newStats.experienceToNext * 1.5);
      }

      return {
        ...prev,
        currentPet: {
          ...prev.currentPet,
          stats: newStats,
          lastFed: Date.now(),
        }
      };
    });
  }, []);

  const playWithPet = useCallback(() => {
    setGameState(prev => {
      const newStats = { ...prev.currentPet.stats };
      const activeBenefits = getActivePassBenefits(prev.ownedPasses);
      
      // Apply happiness bonus from passes
      const happinessGain = 15 + (activeBenefits.happinessBonus || 0);
      newStats.happiness = Math.min(100, newStats.happiness + happinessGain);
      newStats.energy = Math.max(0, newStats.energy - 10);
      
      // Apply XP multiplier from passes
      const baseXP = 10;
      const xpMultiplier = activeBenefits.xpMultiplier || 1;
      const vipXpMultiplier = prev.vipPass.active ? 1.5 : 1;
      newStats.experience += Math.floor(baseXP * xpMultiplier * vipXpMultiplier);
      
      // Level up check
      if (newStats.experience >= newStats.experienceToNext) {
        newStats.level += 1;
        newStats.experience = 0;
        newStats.experienceToNext = Math.floor(newStats.experienceToNext * 1.5);
      }

      // Earn coins for playing (apply all coin multipliers)
      const baseCoins = Math.floor(Math.random() * 10) + 5;
      const passMultiplier = activeBenefits.coinMultiplier || 1;
      const vipMultiplier = prev.vipPass.active ? 2 : 1;
      const totalMultiplier = Math.max(passMultiplier, vipMultiplier); // Take the highest multiplier
      const coinsEarned = Math.floor(baseCoins * totalMultiplier);
      
      return {
        ...prev,
        coins: prev.coins + coinsEarned,
        currentPet: {
          ...prev.currentPet,
          stats: newStats,
          lastPlayed: Date.now(),
        }
      };
    });
  }, []);

  const buyItem = useCallback((item: ShopItem) => {
    setGameState(prev => {
      if (prev.coins < item.price) return prev;
      
      return {
        ...prev,
        coins: prev.coins - item.price,
        inventory: [...prev.inventory, item],
      };
    });
  }, []);

  const buyPet = useCallback((petType: PetType, price: number) => {
    setGameState(prev => {
      if (prev.coins < price) return prev;
      
      return {
        ...prev,
        coins: prev.coins - price,
        unlockedCharacters: [...prev.unlockedCharacters, petType],
      };
    });
  }, []);

  const switchPet = useCallback((petType: PetType) => {
    setGameState(prev => ({
      ...prev,
      currentPet: {
        ...prev.currentPet,
        type: petType,
      }
    }));
  }, []);

  const earnCoins = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + amount,
    }));
  }, []);

  const buyVipPass = useCallback(() => {
    setGameState(prev => {
      if (prev.coins < 4500) return prev;
      
      const now = Date.now();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
      
      return {
        ...prev,
        coins: prev.coins - 4500,
        vipPass: {
          active: true,
          purchasedAt: now,
          expiresAt: now + thirtyDays,
        },
      };
    });
  }, []);

  const buyPass = useCallback((passId: string, price: number, durationDays: number) => {
    setGameState(prev => {
      if (prev.coins < price) return prev;
      
      // Check if already owns this pass
      const existingPass = prev.ownedPasses.find(p => p.passId === passId && p.active);
      if (existingPass) return prev;
      
      const now = Date.now();
      const duration = durationDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
      
      const newPass: OwnedPass = {
        passId,
        active: true,
        purchasedAt: now,
        expiresAt: now + duration,
      };
      
      return {
        ...prev,
        coins: prev.coins - price,
        ownedPasses: [...prev.ownedPasses, newPass],
      };
    });
  }, []);

  // Check VIP and Pass expiry
  const checkPassExpiry = useCallback(() => {
    setGameState(prev => {
      const now = Date.now();
      const updatedState = { ...prev };
      
      // Check VIP expiry
      if (prev.vipPass.active && now > prev.vipPass.expiresAt) {
        updatedState.vipPass = {
          ...prev.vipPass,
          active: false,
        };
      }
      
      // Check all passes expiry
      const updatedPasses = prev.ownedPasses.map(pass => {
        if (pass.active && now > pass.expiresAt) {
          return { ...pass, active: false };
        }
        return pass;
      });
      
      updatedState.ownedPasses = updatedPasses;
      return updatedState;
    });
  }, []);

  // Auto-check all passes expiry
  useEffect(() => {
    const interval = setInterval(checkPassExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkPassExpiry]);

  return {
    gameState,
    feedPet,
    playWithPet,
    buyItem,
    buyPet,
    switchPet,
    earnCoins,
    buyVipPass,
    buyPass,
  };
};
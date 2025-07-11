import { Pass } from '../types/game';

export const AVAILABLE_PASSES: Pass[] = [
  {
    id: 'vip-pass',
    name: 'VIP Pass',
    description: 'Double coin rewards and exclusive benefits',
    price: 1500,
    duration: 30,
    benefits: {
      coinMultiplier: 2,
      exclusiveContent: true,
    },
    icon: '👑',
    gradient: 'from-purple-500 to-pink-500',
    rarity: 'epic'
  },
  {
    id: 'speed-pass',
    name: 'Speed Pass',
    description: 'Instant cooldowns and faster energy regeneration',
    price: 800,
    duration: 7,
    benefits: {
      instantCooldown: true,
      energyRegenBonus: 3,
    },
    icon: '⚡',
    gradient: 'from-yellow-400 to-orange-500',
    rarity: 'rare'
  },
  {
    id: 'scholar-pass',
    name: 'Scholar Pass',
    description: 'Triple XP gains and faster leveling',
    price: 1200,
    duration: 14,
    benefits: {
      xpMultiplier: 3,
      exclusiveContent: true,
    },
    icon: '📚',
    gradient: 'from-blue-500 to-indigo-600',
    rarity: 'rare'
  },
  {
    id: 'wellness-pass',
    name: 'Wellness Pass',
    description: 'Auto-feeding and constant happiness boost',
    price: 600,
    duration: 10,
    benefits: {
      autoFeeding: true,
      happinessBonus: 5,
    },
    icon: '💚',
    gradient: 'from-green-400 to-emerald-500',
    rarity: 'uncommon'
  },
  {
    id: 'shopaholic-pass',
    name: 'Shopaholic Pass',
    description: '25% discount on all shop items',
    price: 1000,
    duration: 21,
    benefits: {
      shopDiscount: 25,
    },
    icon: '🛍️',
    gradient: 'from-pink-400 to-rose-500',
    rarity: 'rare'
  },
  {
    id: 'cosmic-pass',
    name: 'Cosmic Pass',
    description: 'Unlock cosmic pets and 4x coin rewards',
    price: 5000,
    duration: 60,
    benefits: {
      coinMultiplier: 4,
      xpMultiplier: 2,
      exclusiveContent: true,
      shopDiscount: 15,
    },
    icon: '🌌',
    gradient: 'from-purple-600 via-blue-600 to-cyan-500',
    rarity: 'legendary'
  },
  {
    id: 'rainbow-pass',
    name: 'Rainbow Pass',
    description: 'Colorful benefits and mood boosts',
    price: 400,
    duration: 5,
    benefits: {
      happinessBonus: 10,
      energyRegenBonus: 2,
    },
    icon: '🌈',
    gradient: 'from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400',
    rarity: 'common'
  },
  {
    id: 'dragon-pass',
    name: 'Dragon Pass',
    description: 'Exclusive dragon pets and fire powers',
    price: 3000,
    duration: 45,
    benefits: {
      coinMultiplier: 3,
      xpMultiplier: 2,
      exclusiveContent: true,
      energyRegenBonus: 4,
    },
    icon: '🐉',
    gradient: 'from-red-600 to-orange-600',
    rarity: 'legendary'
  },
  {
    id: 'zen-pass',
    name: 'Zen Pass',
    description: 'Inner peace and meditation benefits',
    price: 300,
    duration: 3,
    benefits: {
      happinessBonus: 15,
      autoFeeding: true,
    },
    icon: '🧘',
    gradient: 'from-teal-400 to-cyan-400',
    rarity: 'common'
  },
  {
    id: 'treasure-pass',
    name: 'Treasure Pass',
    description: 'Find rare treasures and bonus coins',
    price: 2000,
    duration: 30,
    benefits: {
      coinMultiplier: 2.5,
      shopDiscount: 20,
      exclusiveContent: true,
    },
    icon: '💎',
    gradient: 'from-yellow-500 to-amber-600',
    rarity: 'epic'
  },
  {
    id: 'ultimate-pass',
    name: 'Ultimate Pass',
    description: 'All benefits combined - the ultimate experience',
    price: 8000,
    duration: 90,
    benefits: {
      coinMultiplier: 5,
      xpMultiplier: 3,
      energyRegenBonus: 5,
      happinessBonus: 20,
      shopDiscount: 30,
      exclusiveContent: true,
      autoFeeding: true,
      instantCooldown: true,
    },
    icon: '✨',
    gradient: 'from-pink-500 via-purple-500 via-indigo-500 to-blue-500',
    rarity: 'legendary'
  }
];

export const getPassById = (id: string): Pass | undefined => {
  return AVAILABLE_PASSES.find(pass => pass.id === id);
};

export const getActivePassBenefits = (ownedPasses: { passId: string; active: boolean }[]): Pass['benefits'] => {
  const activePasses = ownedPasses.filter(pass => pass.active);
  const combinedBenefits: Pass['benefits'] = {};
  
  activePasses.forEach(ownedPass => {
    const pass = getPassById(ownedPass.passId);
    if (pass) {
      // Combine multipliers (take the highest)
      if (pass.benefits.coinMultiplier) {
        combinedBenefits.coinMultiplier = Math.max(combinedBenefits.coinMultiplier || 1, pass.benefits.coinMultiplier);
      }
      if (pass.benefits.xpMultiplier) {
        combinedBenefits.xpMultiplier = Math.max(combinedBenefits.xpMultiplier || 1, pass.benefits.xpMultiplier);
      }
      
      // Add bonuses (accumulate)
      if (pass.benefits.energyRegenBonus) {
        combinedBenefits.energyRegenBonus = (combinedBenefits.energyRegenBonus || 0) + pass.benefits.energyRegenBonus;
      }
      if (pass.benefits.happinessBonus) {
        combinedBenefits.happinessBonus = (combinedBenefits.happinessBonus || 0) + pass.benefits.happinessBonus;
      }
      
      // Take the highest discount
      if (pass.benefits.shopDiscount) {
        combinedBenefits.shopDiscount = Math.max(combinedBenefits.shopDiscount || 0, pass.benefits.shopDiscount);
      }
      
      // Boolean benefits (true if any pass has them)
      if (pass.benefits.exclusiveContent) combinedBenefits.exclusiveContent = true;
      if (pass.benefits.autoFeeding) combinedBenefits.autoFeeding = true;
      if (pass.benefits.instantCooldown) combinedBenefits.instantCooldown = true;
    }
  });
  
  return combinedBenefits;
};
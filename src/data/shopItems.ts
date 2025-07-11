import { ShopItem, PetType } from '../types/game';

export const FOOD_ITEMS: ShopItem[] = [
  // Common Foods
  { id: 'kibble', name: 'Basic Kibble', description: 'Standard pet food', price: 10, category: 'food', rarity: 'common', effects: { happiness: 5, hunger: 15 }, emoji: '🥙' },
  { id: 'carrot', name: 'Fresh Carrot', description: 'Crunchy and healthy', price: 8, category: 'food', rarity: 'common', effects: { happiness: 3, hunger: 10, health: 2 }, emoji: '🥕' },
  { id: 'apple', name: 'Red Apple', description: 'Sweet and nutritious', price: 12, category: 'food', rarity: 'common', effects: { happiness: 7, hunger: 12, health: 3 }, emoji: '🍎' },
  { id: 'banana', name: 'Ripe Banana', description: 'Packed with energy', price: 15, category: 'food', rarity: 'common', effects: { happiness: 8, hunger: 14, energy: 5 }, emoji: '🍌' },
  { id: 'fish', name: 'Fresh Fish', description: 'Protein-rich meal', price: 25, category: 'food', rarity: 'common', effects: { happiness: 12, hunger: 20, health: 5 }, emoji: '🐟' },
  
  // Uncommon Foods
  { id: 'salmon', name: 'Grilled Salmon', description: 'Premium fish dish', price: 45, category: 'food', rarity: 'uncommon', effects: { happiness: 18, hunger: 25, health: 8, experience: 5 }, emoji: '🍣' },
  { id: 'beef', name: 'Prime Beef', description: 'High-quality meat', price: 60, category: 'food', rarity: 'uncommon', effects: { happiness: 22, hunger: 30, health: 10, experience: 8 }, emoji: '🥩' },
  { id: 'honey', name: 'Pure Honey', description: 'Natural sweetness', price: 35, category: 'food', rarity: 'uncommon', effects: { happiness: 25, hunger: 15, health: 12, energy: 10 }, emoji: '🍯' },
  { id: 'berries', name: 'Mixed Berries', description: 'Antioxidant powerhouse', price: 40, category: 'food', rarity: 'uncommon', effects: { happiness: 20, hunger: 18, health: 15, experience: 3 }, emoji: '🫐' },
  { id: 'cheese', name: 'Aged Cheese', description: 'Calcium-rich treat', price: 50, category: 'food', rarity: 'uncommon', effects: { happiness: 28, hunger: 22, health: 8, experience: 6 }, emoji: '🧀' },
  
  // Rare Foods
  { id: 'truffle', name: 'Black Truffle', description: 'Luxurious delicacy', price: 150, category: 'food', rarity: 'rare', effects: { happiness: 35, hunger: 30, health: 20, experience: 15 }, emoji: '🍄' },
  { id: 'caviar', name: 'Beluga Caviar', description: 'The finest eggs', price: 200, category: 'food', rarity: 'rare', effects: { happiness: 40, hunger: 25, health: 25, experience: 20 }, emoji: '🥚' },
  { id: 'wagyu', name: 'Wagyu Beef', description: 'Marbled perfection', price: 250, category: 'food', rarity: 'rare', effects: { happiness: 45, hunger: 40, health: 30, experience: 25 }, emoji: '🥩' },
  { id: 'lobster', name: 'Maine Lobster', description: 'Ocean\'s finest', price: 180, category: 'food', rarity: 'rare', effects: { happiness: 42, hunger: 35, health: 22, experience: 18 }, emoji: '🦞' },
  { id: 'saffron', name: 'Saffron Rice', description: 'Golden spice luxury', price: 220, category: 'food', rarity: 'rare', effects: { happiness: 38, hunger: 28, health: 28, experience: 22 }, emoji: '🍚' },
  
  // Epic Foods
  { id: 'unicorn-cake', name: 'Unicorn Cake', description: 'Magical rainbow delight', price: 500, category: 'food', rarity: 'epic', effects: { happiness: 60, hunger: 50, health: 40, experience: 40 }, emoji: '🦄' },
  { id: 'dragon-fruit', name: 'Dragon Fruit Feast', description: 'Mystical energy boost', price: 400, category: 'food', rarity: 'epic', effects: { happiness: 55, hunger: 45, health: 35, experience: 35, energy: 30 }, emoji: '🐉' },
  { id: 'phoenix-egg', name: 'Phoenix Egg', description: 'Rebirth in every bite', price: 600, category: 'food', rarity: 'epic', effects: { happiness: 70, hunger: 60, health: 50, experience: 50 }, emoji: '🔥' },
  { id: 'ambrosia', name: 'Ambrosia', description: 'Food of the gods', price: 750, category: 'food', rarity: 'epic', effects: { happiness: 80, hunger: 70, health: 60, experience: 60 }, emoji: '✨' },
  { id: 'golden-apple', name: 'Golden Apple', description: 'Legendary fruit of wisdom', price: 450, category: 'food', rarity: 'epic', effects: { happiness: 65, hunger: 55, health: 45, experience: 45 }, emoji: '🍎' },
  
  // Legendary Foods
  { id: 'elixir-of-life', name: 'Elixir of Life', description: 'Ultimate vitality potion', price: 1500, category: 'food', rarity: 'legendary', effects: { happiness: 100, hunger: 100, health: 100, experience: 100, energy: 100 }, emoji: '🧪' },
  { id: 'nectar-of-gods', name: 'Nectar of the Gods', description: 'Divine sustenance', price: 2000, category: 'food', rarity: 'legendary', effects: { happiness: 100, hunger: 80, health: 80, experience: 150 }, emoji: '🏺' },
  { id: 'philosophers-stone', name: 'Philosopher\'s Stone', description: 'Transforms everything', price: 3000, category: 'food', rarity: 'legendary', effects: { happiness: 100, hunger: 100, health: 100, experience: 200 }, emoji: '💎' },
  { id: 'cosmic-berry', name: 'Cosmic Berry', description: 'Fruit from distant stars', price: 2500, category: 'food', rarity: 'legendary', effects: { happiness: 100, hunger: 90, health: 90, experience: 180 }, emoji: '🌌' },
  { id: 'time-apple', name: 'Time Apple', description: 'Reverses aging itself', price: 4000, category: 'food', rarity: 'legendary', effects: { happiness: 100, hunger: 100, health: 100, experience: 300 }, emoji: '⏰' },
];

export const PET_SHOP: Array<{petType: PetType, name: string, price: number, rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary', emoji: string, description: string}> = [
  // Common Pets (Free starter pets)
  { petType: 'dog', name: 'Loyal Dog', price: 0, rarity: 'common', emoji: '🐕', description: 'Your faithful companion' },
  { petType: 'cat', name: 'Curious Cat', price: 0, rarity: 'common', emoji: '🐱', description: 'Independent and playful' },
  { petType: 'rabbit', name: 'Fluffy Rabbit', price: 0, rarity: 'common', emoji: '🐰', description: 'Gentle and adorable' },
  
  // Uncommon Pets
  { petType: 'hamster', name: 'Tiny Hamster', price: 100, rarity: 'uncommon', emoji: '🐹', description: 'Small but mighty' },
  { petType: 'bird', name: 'Singing Bird', price: 120, rarity: 'uncommon', emoji: '🐦', description: 'Melodic companion' },
  { petType: 'fish', name: 'Goldfish', price: 80, rarity: 'uncommon', emoji: '🐠', description: 'Peaceful swimmer' },
  { petType: 'turtle', name: 'Wise Turtle', price: 150, rarity: 'uncommon', emoji: '🐢', description: 'Ancient wisdom' },
  { petType: 'parrot', name: 'Colorful Parrot', price: 200, rarity: 'uncommon', emoji: '🦜', description: 'Talkative friend' },
  { petType: 'owl', name: 'Night Owl', price: 180, rarity: 'uncommon', emoji: '🦉', description: 'Nocturnal hunter' },
  { petType: 'penguin', name: 'Waddle Penguin', price: 220, rarity: 'uncommon', emoji: '🐧', description: 'Antarctic charmer' },
  
  // Rare Pets
  { petType: 'fox', name: 'Clever Fox', price: 500, rarity: 'rare', emoji: '🦊', description: 'Cunning and beautiful' },
  { petType: 'wolf', name: 'Majestic Wolf', price: 600, rarity: 'rare', emoji: '🐺', description: 'Wild spirit' },
  { petType: 'bear', name: 'Gentle Bear', price: 700, rarity: 'rare', emoji: '🐻', description: 'Powerful yet kind' },
  { petType: 'panda', name: 'Peaceful Panda', price: 800, rarity: 'rare', emoji: '🐼', description: 'Zen master' },
  { petType: 'koala', name: 'Sleepy Koala', price: 650, rarity: 'rare', emoji: '🐨', description: 'Eucalyptus lover' },
  { petType: 'tiger', name: 'Fierce Tiger', price: 900, rarity: 'rare', emoji: '🐅', description: 'Striped predator' },
  { petType: 'lion', name: 'Proud Lion', price: 1000, rarity: 'rare', emoji: '🦁', description: 'King of beasts' },
  { petType: 'elephant', name: 'Wise Elephant', price: 1200, rarity: 'rare', emoji: '🐘', description: 'Never forgets' },
  { petType: 'giraffe', name: 'Tall Giraffe', price: 850, rarity: 'rare', emoji: '🦒', description: 'Reaches the sky' },
  { petType: 'zebra', name: 'Striped Zebra', price: 750, rarity: 'rare', emoji: '🦓', description: 'Natural patterns' },
  
  // Epic Pets
  { petType: 'dragon', name: 'Ancient Dragon', price: 2500, rarity: 'epic', emoji: '🐉', description: 'Legendary fire-breather' },
  { petType: 'unicorn', name: 'Mystical Unicorn', price: 3000, rarity: 'epic', emoji: '🦄', description: 'Pure magic incarnate' },
  { petType: 'phoenix', name: 'Immortal Phoenix', price: 3500, rarity: 'epic', emoji: '🔥', description: 'Rises from ashes' },
  { petType: 'griffin', name: 'Noble Griffin', price: 2800, rarity: 'epic', emoji: '🦅', description: 'Eagle-lion hybrid' },
  { petType: 'pegasus', name: 'Flying Pegasus', price: 3200, rarity: 'epic', emoji: '🐎', description: 'Winged stallion' },
  { petType: 'kraken', name: 'Deep Kraken', price: 4000, rarity: 'epic', emoji: '🐙', description: 'Ocean\'s guardian' },
  { petType: 'sphinx', name: 'Riddling Sphinx', price: 3600, rarity: 'epic', emoji: '🦁', description: 'Keeper of secrets' },
  { petType: 'chimera', name: 'Triple Chimera', price: 4200, rarity: 'epic', emoji: '🦁', description: 'Three-in-one beast' },
  { petType: 'wyvern', name: 'Swift Wyvern', price: 2900, rarity: 'epic', emoji: '🐉', description: 'Dragon\'s cousin' },
  { petType: 'basilisk', name: 'Deadly Basilisk', price: 3800, rarity: 'epic', emoji: '🐍', description: 'Serpent king' },
  
  // Legendary Pets
  { petType: 'leviathan', name: 'Primordial Leviathan', price: 10000, rarity: 'legendary', emoji: '🐋', description: 'Ancient sea god' },
  { petType: 'bahamut', name: 'Divine Bahamut', price: 15000, rarity: 'legendary', emoji: '🐉', description: 'Dragon of dragons' },
  { petType: 'fenrir', name: 'Cosmic Fenrir', price: 12000, rarity: 'legendary', emoji: '🐺', description: 'World-ending wolf' },
  { petType: 'qilin', name: 'Sacred Qilin', price: 8000, rarity: 'legendary', emoji: '🦄', description: 'Benevolent deity' },
  { petType: 'roc', name: 'Mighty Roc', price: 9000, rarity: 'legendary', emoji: '🦅', description: 'Mountain-sized bird' },
  { petType: 'world-tree', name: 'Living World Tree', price: 20000, rarity: 'legendary', emoji: '🌳', description: 'Connects all realms' },
  { petType: 'cosmic-cat', name: 'Cosmic Cat', price: 25000, rarity: 'legendary', emoji: '🌌', description: 'Transcends reality' },
  { petType: 'time-dragon', name: 'Temporal Dragon', price: 30000, rarity: 'legendary', emoji: '⏰', description: 'Master of time' },
  { petType: 'void-whale', name: 'Void Whale', price: 35000, rarity: 'legendary', emoji: '🌌', description: 'Swims through space' },
  { petType: 'creation-spirit', name: 'Creation Spirit', price: 50000, rarity: 'legendary', emoji: '✨', description: 'First consciousness' },
  
  // Ultra-Premium Legendary Pets (100,500 coins)
  { petType: 'omnipotent-deity', name: 'Omnipotent Deity', price: 100500, rarity: 'legendary', emoji: '🌟', description: 'Supreme being of infinite power' },
  { petType: 'reality-weaver', name: 'Reality Weaver', price: 100500, rarity: 'legendary', emoji: '🕸️', description: 'Architect of existence itself' },
  { petType: 'dimension-lord', name: 'Dimension Lord', price: 100500, rarity: 'legendary', emoji: '🌌', description: 'Ruler of parallel universes' },
  { petType: 'infinity-serpent', name: 'Infinity Serpent', price: 100500, rarity: 'legendary', emoji: '🐍', description: 'Ouroboros of endless cycles' },
  { petType: 'quantum-phoenix', name: 'Quantum Phoenix', price: 100500, rarity: 'legendary', emoji: '🔥', description: 'Exists in all states simultaneously' },
  { petType: 'eternal-guardian', name: 'Eternal Guardian', price: 100500, rarity: 'legendary', emoji: '🛡️', description: 'Protector of the multiverse' },
  { petType: 'celestial-emperor', name: 'Celestial Emperor', price: 100500, rarity: 'legendary', emoji: '👑', description: 'Sovereign of all heavens' },
  { petType: 'void-creator', name: 'Void Creator', price: 100500, rarity: 'legendary', emoji: '🌑', description: 'Births universes from nothingness' },
  { petType: 'primordial-titan', name: 'Primordial Titan', price: 100500, rarity: 'legendary', emoji: '⛰️', description: 'First being to walk reality' },
  { petType: 'cosmic-architect', name: 'Cosmic Architect', price: 100500, rarity: 'legendary', emoji: '🏗️', description: 'Designer of universal laws' },
  { petType: 'transcendent-sage', name: 'Transcendent Sage', price: 100500, rarity: 'legendary', emoji: '🧙', description: 'Master of all knowledge and wisdom' },
  { petType: 'astral-emperor', name: 'Astral Emperor', price: 100500, rarity: 'legendary', emoji: '🌠', description: 'Commands the fabric of space-time' },
  { petType: 'genesis-beast', name: 'Genesis Beast', price: 100500, rarity: 'legendary', emoji: '🦣', description: 'Witnessed the birth of existence' },
  { petType: 'omniscient-eye', name: 'Omniscient Eye', price: 100500, rarity: 'legendary', emoji: '👁️', description: 'Sees all that was, is, and will be' },
  { petType: 'universal-heart', name: 'Universal Heart', price: 100500, rarity: 'legendary', emoji: '💝', description: 'Beats with the rhythm of existence' },
];

export const TOYS_AND_ACCESSORIES: ShopItem[] = [
  // Toys
  { id: 'ball', name: 'Bouncy Ball', description: 'Classic fun', price: 15, category: 'toy', rarity: 'common', effects: { happiness: 10, hunger: 0, energy: -5 }, emoji: '⚽' },
  { id: 'rope', name: 'Chew Rope', description: 'Perfect for tugging', price: 20, category: 'toy', rarity: 'common', effects: { happiness: 12, hunger: 0, energy: -3 }, emoji: '🪢' },
  { id: 'feather', name: 'Feather Wand', description: 'Irresistible to cats', price: 25, category: 'toy', rarity: 'common', effects: { happiness: 15, hunger: 0, energy: -8 }, emoji: '🪶' },
  { id: 'laser', name: 'Laser Pointer', description: 'Chase the dot!', price: 40, category: 'toy', rarity: 'uncommon', effects: { happiness: 20, hunger: 0, energy: -10 }, emoji: '🔴' },
  { id: 'puzzle', name: 'Puzzle Toy', description: 'Mental stimulation', price: 60, category: 'toy', rarity: 'uncommon', effects: { happiness: 25, hunger: 0, energy: -5, experience: 10 }, emoji: '🧩' },
  { id: 'magic-wand', name: 'Magic Wand', description: 'Enchanted plaything', price: 200, category: 'toy', rarity: 'rare', effects: { happiness: 40, hunger: 0, energy: -2, experience: 20 }, emoji: '🪄' },
  { id: 'crystal-ball', name: 'Crystal Ball', description: 'Mystical entertainment', price: 500, category: 'toy', rarity: 'epic', effects: { happiness: 60, hunger: 0, energy: 0, experience: 40 }, emoji: '🔮' },
  
  // Accessories
  { id: 'collar', name: 'Basic Collar', description: 'Simple identification', price: 30, category: 'accessory', rarity: 'common', effects: { happiness: 5, hunger: 0, health: 2 }, emoji: '🦴' },
  { id: 'bow-tie', name: 'Fancy Bow Tie', description: 'Dapper style', price: 50, category: 'accessory', rarity: 'uncommon', effects: { happiness: 15, hunger: 0, health: 5 }, emoji: '🎀' },
  { id: 'hat', name: 'Stylish Hat', description: 'Fashion statement', price: 75, category: 'accessory', rarity: 'uncommon', effects: { happiness: 20, hunger: 0, health: 3 }, emoji: '🎩' },
  { id: 'crown', name: 'Golden Crown', description: 'Fit for royalty', price: 300, category: 'accessory', rarity: 'rare', effects: { happiness: 35, hunger: 0, health: 10, experience: 15 }, emoji: '👑' },
  { id: 'wings', name: 'Angel Wings', description: 'Heavenly accessory', price: 800, category: 'accessory', rarity: 'epic', effects: { happiness: 50, hunger: 0, health: 20, experience: 30 }, emoji: '🪽' },
  { id: 'halo', name: 'Divine Halo', description: 'Pure light', price: 1200, category: 'accessory', rarity: 'legendary', effects: { happiness: 80, hunger: 0, health: 50, experience: 60 }, emoji: '😇' },
];

export const ALL_SHOP_ITEMS = [...FOOD_ITEMS, ...TOYS_AND_ACCESSORIES];

export const getCategoryItems = (category: string) => {
  switch (category) {
    case 'food':
      return FOOD_ITEMS;
    case 'pets':
      return PET_SHOP;
    case 'toys':
      return TOYS_AND_ACCESSORIES;
    default:
      return ALL_SHOP_ITEMS;
  }
};

export const getItemsByRarity = (rarity: string) => {
  return ALL_SHOP_ITEMS.filter(item => item.rarity === rarity);
};

export const getRandomItems = (count: number) => {
  const shuffled = [...ALL_SHOP_ITEMS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
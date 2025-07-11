export interface PetStats {
  happiness: number;
  hunger: number;
  energy: number;
  health: number;
  level: number;
  experience: number;
  experienceToNext: number;
}

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  stats: PetStats;
  lastFed: number;
  lastPlayed: number;
}

export type PetType = 'dog' | 'cat' | 'rabbit' | 'hamster' | 'bird' | 'fish' | 'dragon' | 'unicorn' | 'phoenix' | 'tiger' | 'lion' | 'elephant' | 'panda' | 'wolf' | 'fox' | 'bear' | 'deer' | 'owl' | 'eagle' | 'parrot' | 'snake' | 'turtle' | 'dolphin' | 'whale' | 'shark' | 'octopus' | 'jellyfish' | 'penguin' | 'koala' | 'kangaroo' | 'zebra' | 'giraffe' | 'rhino' | 'hippo' | 'monkey' | 'gorilla' | 'leopard' | 'cheetah' | 'jaguar' | 'lynx' | 'panther' | 'cougar' | 'bobcat' | 'raccoon' | 'skunk' | 'opossum' | 'badger' | 'otter' | 'seal' | 'walrus' | 'polar-bear' | 'arctic-fox' | 'snow-leopard' | 'yak' | 'llama' | 'alpaca' | 'camel' | 'buffalo' | 'bison' | 'moose' | 'elk' | 'reindeer' | 'antelope' | 'gazelle' | 'ibex' | 'ram' | 'goat' | 'sheep' | 'pig' | 'boar' | 'cow' | 'bull' | 'horse' | 'pony' | 'donkey' | 'mule' | 'zebra-finch' | 'canary' | 'peacock' | 'flamingo' | 'swan' | 'duck' | 'goose' | 'chicken' | 'rooster' | 'turkey' | 'ostrich' | 'emu' | 'kiwi' | 'toucan' | 'macaw' | 'cockatoo' | 'cardinal' | 'blue-jay' | 'robin' | 'sparrow' | 'hummingbird' | 'crow' | 'raven' | 'hawk' | 'falcon' | 'kestrel' | 'osprey' | 'vulture' | 'condor' | 'stork' | 'crane' | 'heron' | 'egret' | 'pelican' | 'seagull' | 'albatross' | 'puffin' | 'cormorant' | 'kingfisher' | 'woodpecker' | 'bat' | 'sugar-glider' | 'flying-squirrel' | 'chipmunk' | 'squirrel' | 'prairie-dog' | 'groundhog' | 'marmot' | 'beaver' | 'porcupine' | 'hedgehog' | 'mole' | 'shrew' | 'vole' | 'lemming' | 'gerbil' | 'chinchilla' | 'ferret' | 'mink' | 'weasel' | 'stoat' | 'ermine' | 'wolverine' | 'honey-badger' | 'binturong' | 'civet' | 'mongoose' | 'meerkat' | 'hyena' | 'jackal' | 'coyote' | 'dingo' | 'fennec-fox' | 'red-panda' | 'binturong' | 'quokka' | 'wombat' | 'tasmanian-devil' | 'echidna' | 'platypus' | 'armadillo' | 'anteater' | 'sloth' | 'aardvark' | 'pangolin' | 'manatee' | 'dugong' | 'narwhal' | 'beluga' | 'orca' | 'blue-whale' | 'humpback-whale' | 'sperm-whale' | 'gray-whale' | 'right-whale' | 'bowhead-whale' | 'minke-whale' | 'fin-whale' | 'sei-whale' | 'bryde-whale' | 'pilot-whale' | 'killer-whale' | 'false-killer-whale' | 'pygmy-killer-whale' | 'melon-headed-whale' | 'rough-toothed-dolphin' | 'bottle-nose-dolphin' | 'spinner-dolphin' | 'striped-dolphin' | 'spotted-dolphin' | 'common-dolphin' | 'fraser-dolphin' | 'pacific-white-sided-dolphin' | 'atlantic-white-sided-dolphin' | 'dusky-dolphin' | 'hourglass-dolphin' | 'peale-dolphin' | 'commerson-dolphin' | 'heaviside-dolphin' | 'hector-dolphin' | 'maui-dolphin' | 'vaquita' | 'harbor-porpoise' | 'dall-porpoise' | 'finless-porpoise' | 'spectacled-porpoise' | 'burmeister-porpoise' | 'griffin' | 'pegasus' | 'kraken' | 'sphinx' | 'chimera' | 'wyvern' | 'basilisk' | 'leviathan' | 'bahamut' | 'fenrir' | 'qilin' | 'roc' | 'world-tree' | 'cosmic-cat' | 'time-dragon' | 'void-whale' | 'creation-spirit' | 'salamander' | 'omnipotent-deity' | 'reality-weaver' | 'dimension-lord' | 'infinity-serpent' | 'quantum-phoenix' | 'eternal-guardian' | 'celestial-emperor' | 'void-creator' | 'primordial-titan' | 'cosmic-architect' | 'transcendent-sage' | 'astral-emperor' | 'genesis-beast' | 'omniscient-eye' | 'universal-heart';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'toy' | 'accessory' | 'pet';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  effects: {
    happiness: number;
    hunger: number;
    energy?: number;
    health?: number;
    experience?: number;
  };
  unlockLevel?: number;
  emoji: string;
}

export interface Pass {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  benefits: {
    coinMultiplier?: number;
    xpMultiplier?: number;
    energyRegenBonus?: number;
    happinessBonus?: number;
    shopDiscount?: number;
    exclusiveContent?: boolean;
    autoFeeding?: boolean;
    instantCooldown?: boolean;
  };
  icon: string;
  gradient: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface OwnedPass {
  passId: string;
  active: boolean;
  purchasedAt: number;
  expiresAt: number;
}

export interface GameState {
  coins: number;
  currentPet: Pet;
  ownedPets: Pet[];
  inventory: ShopItem[];
  unlockedCharacters: PetType[];
  gameStarted: number;
  vipPass: {
    active: boolean;
    purchasedAt: number;
    expiresAt: number;
  };
  ownedPasses: OwnedPass[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  reward: number;
  unlocked: boolean;
  requirement: {
    type: 'coins' | 'level' | 'pets' | 'items' | 'days';
    value: number;
  };
}
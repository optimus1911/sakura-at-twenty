export interface MemoryPhoto {
  id: string;
  title: string;
  date?: string;
  caption: string;
  imageSrc: string;
  fallbackPlaceholder: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  sceneRole: 'intro' | 'cinematic-bg' | 'study-memory' | 'portrait-cinematic' | 'letter-memory' | 'gallery' | 'reveal';
}

export interface YouTubeAudioConfig {
  videoId: string;
  title: string;
  subtitle: string;
  youtubeUrl: string;
}

export interface BirthdayConfig {
  recipient: {
    name: string;
    nickname: string;
    age: number;
    birthDateFormatted: string;
    subheading: string;
    aspirationsNote: string;
  };
  audio: {
    youtube: YouTubeAudioConfig;
  };
  letter: {
    salutation: string;
    paragraphs: string[];
    signOff: string;
    signature: string;
    postScript?: string;
  };
  photos: {
    scene1Intro: MemoryPhoto;
    scene2Background: MemoryPhoto;
    scene3Study: MemoryPhoto;
    scene4Cinematic: MemoryPhoto;
    scene5Letter: MemoryPhoto;
    scene6RevealKeepsake: MemoryPhoto;
  };
  memories: MemoryPhoto[];
  studyDesk: {
    quote: string;
    subjectPills: string[];
    stickyNoteText: string;
    calendarHighlight: string;
  };
  reveal: {
    headline: string;
    subheadline: string;
    wishPrompt: string;
    wishConfirmedMessage: string;
  };
  goodnight: {
    closingQuote: string;
    farewellMessage: string;
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipient: {
    name: "Mansiii",
    nickname: "Mansiii",
    age: 20,
    birthDateFormatted: "17 October 2026",
    subheading: "A dedicated NEET aspirant turning twenty under Kyoto twilight.",
    aspirationsNote: "To every quiet evening with biology diagrams, early morning revisions, and dreams quietly nurtured.",
  },
  audio: {
    youtube: {
      videoId: "RL5jfPFan54",
      title: "Birthday Dreamscape Melody",
      subtitle: "Dedicated Birthday Soundscape",
      youtubeUrl: "https://youtu.be/RL5jfPFan54?si=IJemDLk3l1-LLbJR",
    },
  },
  photos: {
    scene1Intro: {
      id: "photo-6",
      title: "Sunset Reflections in Saree",
      date: "Chapter Twenty • Opening Grace",
      caption: "A serene sunset moment in a lavender-grey saree, looking down with gentle grace.",
      imageSrc: "/images/memories/photo-6-sunset-saree.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-1.svg",
      aspectRatio: "portrait",
      sceneRole: "intro",
    },
    scene2Background: {
      id: "photo-2",
      title: "Holding the Flower Bouquet",
      date: "In Full Bloom",
      caption: "Mansiii holding a vibrant bouquet of flowers under soft light.",
      imageSrc: "/images/memories/photo-2-bouquet.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-2.svg",
      aspectRatio: "portrait",
      sceneRole: "cinematic-bg",
    },
    scene3Study: {
      id: "photo-3",
      title: "Rooftop Calm in White",
      date: "Quiet Reflections",
      caption: "On the rooftop in a white outfit, glasses gently resting atop her head.",
      imageSrc: "/images/memories/photo-3-rooftop-white.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-3.svg",
      aspectRatio: "portrait",
      sceneRole: "study-memory",
    },
    scene4Cinematic: {
      id: "photo-4",
      title: "Portrait in Black & Glasses",
      date: "Grace & Composure",
      caption: "Cinematic portrait in a black outfit, wearing glasses with quiet focus.",
      imageSrc: "/images/memories/photo-4-portrait-black.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-4.svg",
      aspectRatio: "portrait",
      sceneRole: "portrait-cinematic",
    },
    scene5Letter: {
      id: "photo-7",
      title: "Skyline & Embroidered Elegance",
      date: "Joyful Horizons",
      caption: "A radiant smile against the open evening sky in an embroidered black outfit.",
      imageSrc: "/images/memories/photo-7-black-embroidered.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-5.svg",
      aspectRatio: "landscape",
      sceneRole: "letter-memory",
    },
    scene6RevealKeepsake: {
      id: "photo-1",
      title: "Playful Moments & Heart Stickers",
      date: "Pure Joy",
      caption: "The playful glasses selfie with sweet heart stickers.",
      imageSrc: "/images/memories/photo-1-glasses-hearts.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-1.svg",
      aspectRatio: "portrait",
      sceneRole: "reveal",
    },
  },
  memories: [
    {
      id: "photo-6",
      title: "Sunset Reflections in Saree",
      date: "Scene 01 • First Breath",
      caption: "Serene sunset glow, lavender-grey saree, and quiet grace.",
      imageSrc: "/images/memories/photo-6-sunset-saree.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-1.svg",
      aspectRatio: "portrait",
      sceneRole: "intro",
    },
    {
      id: "photo-2",
      title: "Mansiii & The Flower Bouquet",
      date: "Scene 02 • Dreamscape",
      caption: "Radiant with crimson flowers, framed by cherry blossom twilight.",
      imageSrc: "/images/memories/photo-2-bouquet.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-2.svg",
      aspectRatio: "portrait",
      sceneRole: "cinematic-bg",
    },
    {
      id: "photo-3",
      title: "Rooftop Calm in White",
      date: "Scene 03 • Study Universe",
      caption: "Gentle breeze on the rooftop, glasses resting on her head.",
      imageSrc: "/images/memories/photo-3-rooftop-white.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-3.svg",
      aspectRatio: "portrait",
      sceneRole: "study-memory",
    },
    {
      id: "photo-4",
      title: "Portrait in Black & Glasses",
      date: "Scene 04 • Cinematic Card",
      caption: "Quiet elegance, calm confidence, and thoughtful focus.",
      imageSrc: "/images/memories/photo-4-portrait-black.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-4.svg",
      aspectRatio: "portrait",
      sceneRole: "portrait-cinematic",
    },
    {
      id: "photo-7",
      title: "Skyline & Embroidered Elegance",
      date: "Scene 05 • Letter Companion",
      caption: "Vibrant smile against the open evening sky in an embroidered black outfit.",
      imageSrc: "/images/memories/photo-7-black-embroidered.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-5.svg",
      aspectRatio: "landscape",
      sceneRole: "letter-memory",
    },
    {
      id: "photo-1",
      title: "Playful Moments & Heart Stickers",
      date: "Scene 06 • Pure Joy",
      caption: "Playful glasses selfie with cute little heart stickers.",
      imageSrc: "/images/memories/photo-1-glasses-hearts.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-1.svg",
      aspectRatio: "portrait",
      sceneRole: "reveal",
    },
    {
      id: "photo-5",
      title: "Traditional Grace on the Rooftop",
      date: "Timeless Moments",
      caption: "Rooftop moment in black traditional attire, standing with quiet grace.",
      imageSrc: "/images/memories/photo-5-rooftop-black-traditional.jpg",
      fallbackPlaceholder: "/images/memories/placeholder-5.svg",
      aspectRatio: "portrait",
      sceneRole: "gallery",
    },
  ],
  studyDesk: {
    quote: "To all the dreams you're quietly working toward, Mansiii, I hope this new chapter brings you beautiful surprises, peaceful moments, and plenty of reasons to smile.",
    subjectPills: ["Human Physiology", "Genetics & Evolution", "Organic Chemistry", "NEET 2026 Aspirations"],
    stickyNoteText: "Friendly reminder: Celebrating yourself today is medically essential. You are already doing wonderful things.",
    calendarHighlight: "17 Oct • Mansiii's 20th Birthday!"
  },
  letter: {
    salutation: "Dear Mansiii,",
    paragraphs: [
      "Turning twenty is such a lovely threshold. It marks the chapter where all your quiet hours of dedication, late-night revisions, and deep aspirations begin blooming into your future.",
      "Seeing your quiet consistency toward NEET—how you balance study books, complex biology questions, and peaceful determination—is truly inspiring. But today isn't about tests or ranks; today is entirely about celebrating you as a wonderful person and a dear friend.",
      "I hope this milestone year blesses you with serene mornings, joyous laughter, warm cups of coffee, and steadfast confidence in how capable you are.",
      "Whenever the syllabus feels heavy, remember to look up, breathe in the fresh air, and celebrate the small steps. Your hard work will bear its sweetest flowers.",
      "Wishing you warmth, endless happiness, and a very memorable 20th birthday!"
    ],
    signOff: "With warmest wishes & cheers for all that lies ahead,",
    signature: "Your Friend",
    postScript: "P.S. Yes, a guilt-free slice of birthday cake is strictly prescribed!"
  },
  reveal: {
    headline: "Happy 20th Birthday, Mansiii!",
    subheadline: "May your twenties be as graceful, resilient, and luminous as sakura blossoms under twilight.",
    wishPrompt: "Close your eyes, make a heartfelt wish, and tap the candle",
    wishConfirmedMessage: "✨ Your wish is whispered into the starlit sky. Happy 20th Birthday, Mansiii!"
  },
  goodnight: {
    closingQuote: "Here's to twenty, to new beginnings, and to all the lovely little things still waiting for you, Mansiii.",
    farewellMessage: "Rest well, celebrate with a light heart, and step into this year with courage and joy."
  }
};

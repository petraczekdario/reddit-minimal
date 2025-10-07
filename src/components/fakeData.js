/**
 * Fake data array representing a collection of "Reddit-like" posts
 * for use in testing and initial application state.
 */
export const FAKE_POSTS_DATA = [
  {
    id: 101,
    title: "TIL: The longest word in the English language is 189,819 letters long",
    content: "It is the chemical name for the human protein titin. Pronouncing it takes about 3.5 hours.",
    author: "u/FunFactFinder",
    subreddit: "r/todayilearned",
    upvotes: 45210,
    timestamp: Date.now() - (86400 * 1000 * 2), // 2 days ago
    comments: [
      { id: 1, user: "User123", text: "Wait, pronouncing it? That's insane!" },
      { id: 2, user: "ChemGeek", text: "As a chemist, I can confirm. It's ridiculous." }
    ],
    image: "https://placehold.co/600x400/81C784/ffffff?text=Protein+Titin"
  },
  {
    id: 102,
    title: "AITA for canceling my vacation because my cat seemed sad?",
    content: "My friends are furious, but Mittens looked genuinely distressed when I brought out the suitcase. I feel like I made the right call.",
    author: "u/CatDadProblems",
    subreddit: "r/AmItheAsshole",
    upvotes: 1200,
    timestamp: Date.now() - (3600 * 1000 * 3), // 3 hours ago
    comments: [
      { id: 3, user: "NTA_bot", text: "NTA. Mittens comes first." },
      { id: 4, user: "AngryFriend", text: "YTA. Your cat will survive without you for a week." },
      { id: 5, user: "NeutralParty", text: "ESH. You should've arranged a good sitter, but your friends should respect your choice." }
    ],
    image: "https://placehold.co/600x400/FFB74D/ffffff?text=Sad+Cat"
  },
  {
    id: 103,
    title: "Minimalist desk setup for improved productivity [OC]",
    content: "Just a laptop, a monitor, and a single houseplant. It's amazing what removing clutter can do for focus.",
    author: "u/CleanCodeCreator",
    subreddit: "r/battlestations",
    upvotes: 8900,
    timestamp: Date.now() - (600 * 1000 * 10), // 10 minutes ago
    comments: [
      { id: 6, user: "DeskObserver", text: "Looks clean! Which monitor model is that?" }
    ],
    image: "https://placehold.co/600x400/64B5F6/ffffff?text=Minimal+Setup"
  }
];

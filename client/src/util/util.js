

export const CATCH_PHRASES = [
  "The party game where smart jokes go to die.",
  "Tits and dicks.  Where the setups don't matter as long as they're dirty.",
  "First person to post their play on Twitter and get cancelled wins!",
  "Because fuck you.",
  "Which friendship should you end today?",
  "Leave humanity behind."
]

export const getPhrase = () => 
  CATCH_PHRASES[Math.floor(Math.random() * CATCH_PHRASES.length)];
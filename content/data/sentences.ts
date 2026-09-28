import type { SentenceGroup } from "./types";

export const sentenceGroups: SentenceGroup[] = [
  {
    id: "t-sentences",
    section: "say-every-t",
    title: "Practise these sentences",
    sentences: [
      { id: "s-t-1", text: "I'll meet you at twenty past eight." },
      { id: "s-t-2", text: "It's better to buy a bottle of water." },
      { id: "s-t-3", text: "Wait a little, I'm getting the tickets." },
    ],
  },
  {
    id: "rl-sentences",
    section: "r-and-l",
    title: "Practise these sentences",
    sentences: [
      { id: "s-rl-1", text: "Turn right at the traffic light." },
      { id: "s-rl-2", text: "Please collect the correct form." },
      { id: "s-rl-3", text: "I really like the new library." },
    ],
  },
  {
    id: "number-sentences",
    section: "thirteen-vs-thirty",
    title: "Confirm the number in digits",
    sentences: [{ id: "s-n-1", text: "Thirteen, that's one-three." }],
  },
];

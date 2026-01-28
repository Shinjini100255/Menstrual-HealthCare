
import { Scene } from './types';

export const SCENES: Scene[] = [
  {
    id: 1,
    title: "Introduction",
    description: "Mother and daughter in a village home.",
    voiceover: "Menstruation, or periods, is a natural process. It means a girl’s body is healthy and growing.",
    visualPrompt: "Soft 2D digital illustration of a young Indian girl and her mother sitting in a cozy, simple rural village home. Warm sunlight through a window, friendly expressions, calm terracotta and beige colors, respectful and educational style.",
    type: 'narrative'
  },
  {
    id: 2,
    title: "What is Menstruation",
    description: "Simple uterus diagram and changing calendar.",
    voiceover: "Every month, the body prepares for pregnancy. When it does not happen, blood flows from the vagina. This is called a period. It usually lasts 3 to 7 days.",
    visualPrompt: "A very simple, non-graphic, respectful medical diagram of a uterus in soft pink tones. Beside it, a paper calendar with pages flipping to show the passing of time. 2D flat animation style.",
    type: 'diagram'
  },
  {
    id: 3,
    title: "What is Normal",
    description: "Girl going to school.",
    voiceover: "Periods may come every 21 to 35 days. Mild pain, backache, or mood changes are common.",
    visualPrompt: "A young Indian girl walking happily towards a village school, wearing a simple uniform. She looks slightly tired but smiling. Soft green landscape background, 2D friendly animation.",
    type: 'narrative'
  },
  {
    id: 4,
    title: "Menstrual Hygiene",
    description: "Hygiene products and disposal.",
    voiceover: "Change pads every 4 to 6 hours. Wash hands before and after. Keep the private area clean and dry.",
    visualPrompt: "Educational illustration showing a clean sanitary pad, a clean cloth pad, a bar of soap, and a bucket of clean water. Simple symbols for hand washing. Soft pastel blue and white background.",
    type: 'educational'
  },
  {
    id: 5,
    title: "Do's for Self Care",
    description: "Healthy habits.",
    voiceover: "Drink water. Eat healthy food. Take rest. Track your cycle.",
    visualPrompt: "A split screen showing a girl drinking water, a plate of fresh vegetables and iron-rich lentils, and a girl resting on a comfortable mat. Gentle walking in a garden. Bright, healthy colors.",
    type: 'educational'
  },
  {
    id: 6,
    title: "Don'ts",
    description: "Myths and bad practices.",
    voiceover: "Do not use dirty cloth. Do not stay in wet pads. Do not feel ashamed. Periods are natural.",
    visualPrompt: "A respectful illustration with gentle red 'X' marks over a dirty torn cloth and a representation of hiding in shame. The girl then looks up and smiles. 'Natural' written in soft letters.",
    type: 'educational'
  },
  {
    id: 7,
    title: "Pain Management",
    description: "Comfort and relief.",
    voiceover: "Warm compress, light exercise, and rest can reduce pain.",
    visualPrompt: "A mother comforting her daughter, handing her a warm water bottle. The daughter is doing light stretching exercises. Soft, nurturing atmosphere.",
    type: 'narrative'
  },
  {
    id: 8,
    title: "Warning Signs",
    description: "When to see a doctor.",
    voiceover: "See a health worker if bleeding is very heavy, lasts more than 7 days, severe pain, dizziness, or missed periods.",
    visualPrompt: "A village health center with a friendly ASHA health worker wearing a green sari talking to a woman. Clear icons for warning signs: heavy flow, dizziness. Educational and safe.",
    type: 'diagram'
  },
  {
    id: 9,
    title: "Emotional Support",
    description: "Talking to friends.",
    voiceover: "It is normal to feel emotional. Talk to someone you trust.",
    visualPrompt: "Two young Indian girls sitting under a large Banyan tree in a village, talking and laughing together. One has her hand on the other's shoulder. Soft sunset colors.",
    type: 'narrative'
  },
  {
    id: 10,
    title: "Closing",
    description: "Confidence and Health.",
    voiceover: "Menstruation is a sign of health. Care for your body. You are not alone. Menstrual health is self-care.",
    visualPrompt: "The young girl from the beginning, now looking confident and healthy, walking with a bag towards a group of people. Text overlay: 'Menstrual health is self-care.' Soft, inspiring finale.",
    type: 'narrative'
  }
];

export const THEME_COLORS = {
  primary: '#ec4899', // pink-500
  secondary: '#fbcfe8', // pink-200
  accent: '#fb7185', // rose-400
  bg: '#fffafb',
  text: '#4b5563', // gray-600
};

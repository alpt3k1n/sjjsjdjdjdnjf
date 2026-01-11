export type Category =
  | 'anatomy'
  | 'physiology'
  | 'pathology'
  | 'pharmacology'
  | 'clinical'
  | 'biochemistry'
  | 'histology';

export type RelationshipType =
  | 'prerequisite'
  | 'consequence'
  | 'differential'
  | 'treatment'
  | 'complication'
  | 'risk-factor';

export interface RelatedItem {
  id: string;
  title: string;
  relevanceScore: number; // 1-10
  relationshipType: RelationshipType;
  briefDescription: string;
  category: Category;
}

export interface MedicalTopic {
  id: string;
  term: string;
  definition: string;
  category: Category;
  relatedTopics: {
    categoryName: string;
    categoryIcon: string;
    items: RelatedItem[];
  }[];
  clinicalPearls: string[];
  mnemonics?: string[];
  images?: string[];
  keyPoints?: string[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  relatedTopicId: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  questions: Question[];
  learningPoints: string[];
}

export interface SearchResult {
  mainTopic: MedicalTopic;
  relatedQuestions: Question[];
  clinicalScenarios?: CaseStudy[];
  suggestedTopics: string[];
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  topicId: string;
  mastery: number; // 0-100
  lastReviewed?: Date;
  nextReview?: Date;
}

export interface StudySession {
  id: string;
  topicId: string;
  startTime: Date;
  endTime?: Date;
  cardsReviewed: number;
  accuracy: number;
}

export interface UserProgress {
  topicsStudied: string[];
  totalStudyTime: number;
  flashcardsCreated: number;
  quizzesCompleted: number;
  averageScore: number;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  category: Category;
  x: number;
  y: number;
  connections: string[]; // IDs of connected nodes
  importance: number; // 1-10 for visual sizing
}

export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  centerNodeId: string;
}

export interface Decision {
  text: string;
  optionA: string;
  optionB: string;
}

export interface SessionState {
  userName: string;
  decision: Decision;
  context: string[];
  dimensions: string[];
}

export type SessionAction = 
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_DECISION'; payload: Decision }
  | { type: 'SET_CONTEXT'; payload: string[] }
  | { type: 'ADD_CONTEXT'; payload: string }
  | { type: 'REMOVE_CONTEXT'; payload: string }
  | { type: 'SET_DIMENSIONS'; payload: string[] }
  | { type: 'ADD_DIMENSION'; payload: string }
  | { type: 'REMOVE_DIMENSION'; payload: string };
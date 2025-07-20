// Define window types
export type WindowName = 'about' | 'projects' | 'contact' | 'resume' | 'contract' | 'cv' | 'pdf';

export type WindowState = {
  [key in WindowName]: boolean;
};

// Window position interface
export interface WindowPosition {
  x: number;
  y: number;
}

// Track window positions
export type WindowPositions = {
  [key in WindowName]: WindowPosition;
};

// Window size interface
export interface WindowSize {
  width: number;
  height: number;
}

// Track window sizes
export type WindowSizes = {
  [key in WindowName]: WindowSize;
};

// Chat message type
export type ChatMessage = {
  from: 'user' | 'clippy';
  message: string;
}; 
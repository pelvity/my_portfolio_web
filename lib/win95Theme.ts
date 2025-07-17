// Windows 95 theme constants

export const win95Theme = {
  colors: {
    // Main UI colors
    background: '#c0c0c0',
    headerBackground: '#000080',
    headerText: '#ffffff',
    text: '#000000',
    highlightBackground: '#000080',
    highlightText: '#ffffff',
    
    // Border colors
    lightBorder: '#ffffff',
    darkBorder: '#000000',
    mediumBorder: '#808080',
    
    // Field colors
    fieldBackground: '#ffffff',
    fieldText: '#000000',
    fieldBorder: '#808080',
    
    // Button colors
    buttonFace: '#c0c0c0',
    buttonText: '#000000',
    
    // Link colors
    link: '#0000ff',
    visitedLink: '#800080'
  },
  
  fonts: {
    primary: '"MS Sans Serif", "Pixelated MS Sans Serif", sans-serif',
    monospace: 'monospace',
    numerals: '"React95Video-Numbers", monospace'
  },
  
  fontSizes: {
    small: '10px',
    normal: '12px',
    large: '14px',
    title: '16px'
  },
  
  spacing: {
    xsmall: '2px',
    small: '4px',
    medium: '8px',
    large: '16px',
    xlarge: '24px'
  },
  
  // Common Windows 95 borders
  borders: {
    // Outset effect (buttons, raised surfaces)
    outset: `
      border-top: 1px solid #ffffff;
      border-left: 1px solid #ffffff;
      border-right: 1px solid #000000;
      border-bottom: 1px solid #000000;
    `,
    
    // Inset effect (fields, sunken surfaces)
    inset: `
      border-top: 1px solid #808080;
      border-left: 1px solid #808080;
      border-right: 1px solid #ffffff;
      border-bottom: 1px solid #ffffff;
    `,
    
    // Double border for windows
    window: `
      border-top: 1px solid #ffffff;
      border-left: 1px solid #ffffff;
      border-right: 2px solid #000000;
      border-bottom: 2px solid #000000;
      box-shadow: 1px 1px 0 0 #808080;
    `
  }
};

export default win95Theme; 
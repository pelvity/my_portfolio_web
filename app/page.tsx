'use client';

import { useState, useEffect } from 'react';
import '@react95/core/GlobalStyle';
import '@react95/core/themes/win95.css';
import { useClippy, ClippyProvider, AGENTS } from '@react95/clippy';
import { WindowName, WindowPositions, WindowSizes } from '../lib/types';
import Desktop from '../lib/components/Desktop';
import TaskBar from '../lib/components/TaskBar';
import WindowManager from '../lib/components/WindowManager';
import ClippyAssistant from '../lib/components/ClippyAssistant';

function HomeContent() {
  console.log('HomeContent component rendering');
  const { clippy } = useClippy();
  console.log('useClippy hook called, clippy object available:', !!clippy);
  
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [openWindows, setOpenWindows] = useState({
    about: false,
    projects: true,
    resume: false,
    contact: true, // Open contact window on start
    cv: true,
    contract: false,
    pdf: false,
  });
  
  // Add global styles to force Clippy visibility
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      /* Force Clippy to be visible */
      .clippy, 
      .agent,
      .agent-clippy,
      .agent-container,
      [class*="agent"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
      }
      
      /* Target hidden attribute on clippy div */
      div.clippy[hidden],
      div[class*="agent"][hidden] {
        display: block !important;
        hidden: false !important;
        visibility: visible !important;
      }
      
      /* Check if clippy is inside an iframe */
      iframe[id*="clippy"],
      iframe[class*="agent"],
      iframe[class*="clippy"] {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
        z-index: 10000 !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Find and directly modify the clippy element after a delay
    setTimeout(() => {
      console.log("Looking for clippy elements to unhide...");
      
      // Check for hidden divs with clippy class
      const clippyDivs = document.querySelectorAll('div.clippy, div[class*="agent"]');
      clippyDivs.forEach(div => {
        console.log("Found clippy-like div:", div);
        if (div instanceof HTMLElement) {
          div.hidden = false;
          div.style.display = 'block';
          div.style.visibility = 'visible';
          div.style.opacity = '1';
        }
      });
      
      // Also check for any iframes that might contain Clippy
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        console.log("Checking iframe:", iframe.id || iframe.className);
      });
      
    }, 1000);
    
    console.log('Added global styles for Clippy visibility');
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Window positions state
  const [windowPositions, setWindowPositions] = useState<WindowPositions>({
    about: { x: 50, y: 50 },
    projects: { x: 50, y: 350 }, // Top-left
    resume: { x: 150, y: 150 },
    contact: { x: 1300, y: 50 }, // Top-right
    cv: { x: 500, y: 50 }, // Top-center
    contract: { x: 50, y: 80 },
    pdf: { x: 300, y: 120 },
  });
  
  // Keep track of active window for z-index management
  const [activeWindow, setActiveWindow] = useState<WindowName>('projects');

  // Window sizes state
  const [windowSizes, setWindowSizes] = useState<WindowSizes>({
    about: { width: 400, height: 300 },
    projects: { width: 550, height: 450 }, // Increased size
    contact: { width: 350, height: 300 },
    resume: { width: 400, height: 400 },
    contract: { width: 550, height: 450 },
    cv: { width: 700, height: 500 },
    pdf: { width: 600, height: 800 },
  });
  
  // Add Clippy CSS and ensure it's visible on mount
  useEffect(() => {
    console.log('Main Clippy useEffect running');
    
    // Ensure Clippy is visible after a short delay
    const timer = setTimeout(() => {
      if (clippy) {
        console.log('Main: Clippy object available, playing Greeting');
        // Choose animation based on open windows
        clippy.play('Greeting');
        
        // Optionally after a brief delay, make a comment about the open windows
        setTimeout(() => {
          if (clippy) {
            console.log('Main: Playing GestureRight animation');
            clippy.play('GestureRight');
          }
        }, 2000);
      } else {
        console.error('Main: Clippy object not available after timeout');
      }
    }, 1000);
    
    return () => {
      console.log('Cleaning up main Clippy timer');
      clearTimeout(timer);
    };
  }, [clippy, openWindows.projects, openWindows.cv, openWindows.resume]);

  const toggleStartMenu = () => {
    setShowStartMenu(!showStartMenu);
  };

  const openWindow = (window: WindowName) => {
    setOpenWindows({ ...openWindows, [window]: true });
    setActiveWindow(window); // Set as active window
    setShowStartMenu(false);

    // Show Clippy animation when opening a window
    if (clippy) {
      const animations = ['Congratulate', 'GestureRight', 'GetAttention'];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      clippy.play(randomAnimation);
    }
  };

  const closeWindow = (window: WindowName) => {
    setOpenWindows({ ...openWindows, [window]: false });

    // Show Clippy animation when closing a window
    if (clippy) {
      clippy.play('GoodBye');
    }
  };

  const handlePositionChange = (window: WindowName, position: { x: number, y: number }) => {
    setWindowPositions(prev => ({
      ...prev,
      [window]: position
    }));
  };

  const handleSizeChange = (window: WindowName, size: { width: number, height: number }) => {
    setWindowSizes(prev => ({
      ...prev,
      [window]: size
    }));
  };

  const handleWaveClippy = () => {
    if (clippy) {
      clippy.play('Wave');
    }
  };

  return (
    <Desktop onOpenWindow={openWindow}>
      <WindowManager 
        openWindows={openWindows}
        windowPositions={windowPositions}
        windowSizes={windowSizes}
        activeWindow={activeWindow}
        onActivateWindow={setActiveWindow}
        onCloseWindow={closeWindow}
        onPositionChange={handlePositionChange}
        onSizeChange={handleSizeChange}
        onWaveClippy={handleWaveClippy}
      />
      
      <ClippyAssistant 
        initialMessage="Hi there! I'm Clippy. I see you've got your projects and CV open. Can I help with anything?"
      />

      <TaskBar 
        showStartMenu={showStartMenu}
        toggleStartMenu={toggleStartMenu}
        openWindow={openWindow}
      />
    </Desktop>
  );
}

export default function Home() {
  console.log('Home component rendering with ClippyProvider');
  return (
    <ClippyProvider agentName={AGENTS.CLIPPY}>
      <HomeContent />
    </ClippyProvider>
  );
}

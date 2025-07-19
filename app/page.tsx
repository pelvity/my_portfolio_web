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
  const { clippy } = useClippy();
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
  
  useEffect(() => {
    // Show Clippy's greeting animation after component loads
    if (clippy) {
      setTimeout(() => {
        // Choose animation based on open windows
        if (openWindows.projects && openWindows.cv && openWindows.resume) {
          clippy.play('Greeting');
          // Optionally after a brief delay, make a comment about the open windows
          setTimeout(() => {
            if (clippy) clippy.play('GestureRight');
          }, 2000);
        } else {
          clippy.play('Greeting');
        }
      }, 1000);
    }
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
  return (
    <ClippyProvider agentName={AGENTS.CLIPPY}>
      <HomeContent />
    </ClippyProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { useClippy } from '@react95/clippy';
import { ChatMessage } from '../types';
import {
  ClippyContainer,
  SpeechBubble,
  SpeechHeader,
  SpeechTitle,
  CloseIcon,
  SpeechInput
} from '../styles/ClippyStyles';

interface ClippyAssistantProps {
  initialMessage?: string;
}

const ClippyAssistant: React.FC<ClippyAssistantProps> = ({ initialMessage = "Hi there! I'm Clippy. Need help with anything?" }) => {
  const { clippy } = useClippy();
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { from: 'clippy', message: initialMessage }
  ]);

  // Add direct Clippy image if needed
  // const [showFallbackClipper, setShowFallbackClipper] = useState(false);

  // Check if Clippy is working
  useEffect(() => {
    // If clippy API isn't available or no clippy element found
    const timeoutId = setTimeout(() => {
      const clippyElement = document.querySelector('.clippy');
      const clippyVisible = clippyElement &&
        window.getComputedStyle(clippyElement).display !== 'none' &&
        !(clippyElement as HTMLElement).hidden;

      console.log('Clippy visibility check:', !!clippyVisible);

      // If no clippy element or not visible, show fallback
      if (!clippyVisible) {
        console.log('Using fallback Clippy image');
        // setShowFallbackClipper(true);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Debug function to check for Clippy element
  const checkForClippyElement = () => {
    console.log('--------- CLIPPY DEBUG ---------');
    const clippyElement = document.querySelector('.clippy');
    console.log('Looking for .clippy element:', clippyElement);

    // Check for any agent elements (different class names)
    const agentElements = document.querySelectorAll('[class*="agent"]');
    console.log('Any agent elements found:', agentElements.length);
    agentElements.forEach((el, i) => {
      console.log(`Agent element ${i}:`, el.className,
        'visibility:', window.getComputedStyle(el).visibility,
        'display:', window.getComputedStyle(el).display);
    });

    // Inspect agent container
    const agentContainer = document.querySelector('.agent-container');
    console.log('Agent container found:', !!agentContainer);

    console.log('ClippyProvider found:', !!document.querySelector('[data-clippy-provider="true"]'));
    console.log('--------- DEBUG END ---------');
  };

  // Make Clippy visible and active on load
  useEffect(() => {
    console.log('ClippyAssistant mounted, clippy object available:', !!clippy);

    // Debug check for Clippy element
    checkForClippyElement();

    // Periodic check for Clippy element
    const checkInterval = setInterval(() => {
      checkForClippyElement();
    }, 2000);

    // Hack: If Clippy isn't found initially, try to force re-render of ClippyProvider
    if (!document.querySelector('.clippy') && !document.querySelector('[class*="agent"]')) {
      console.log('Clippy not found, attempting to fix ClippyProvider...');

      // Manually create a div to hold Clippy if needed
      const clippyHolder = document.createElement('div');
      clippyHolder.id = 'clippy-agent-container';
      clippyHolder.style.position = 'fixed';
      clippyHolder.style.bottom = '60px';
      clippyHolder.style.right = '30px';
      clippyHolder.style.zIndex = '9999';
      document.body.appendChild(clippyHolder);

      console.log('Created clippy holder element');
    }

    // Add styling to make Clippy visible - this is the key fix
    const clippyElement = document.querySelector('.clippy');
    console.log('Clippy element found:', !!clippyElement);

    if (clippyElement) {
      console.log('Before styles - Clippy visibility status:',
        window.getComputedStyle(clippyElement).visibility,
        'display:', window.getComputedStyle(clippyElement).display,
        'opacity:', window.getComputedStyle(clippyElement).opacity
      );

      // Make Clippy visible with important styles
      (clippyElement as HTMLElement).style.setProperty('display', 'block', 'important');
      (clippyElement as HTMLElement).style.setProperty('visibility', 'visible', 'important');
      (clippyElement as HTMLElement).style.setProperty('opacity', '1', 'important');
      (clippyElement as HTMLElement).style.setProperty('z-index', '9999', 'important');
      (clippyElement as HTMLElement).style.setProperty('pointer-events', 'auto', 'important');

      console.log('After styles - Applied visibility fixes to Clippy element');
    }

    // Short delay to ensure Clippy is loaded
    const timer = setTimeout(() => {
      if (clippy) {
        console.log('Attempting to play Clippy greeting animation');
        // Make Clippy appear and play a greeting animation
        clippy.play('Greeting');

        // Show the assistant after a short delay
        setTimeout(() => {
          setShowSpeechBubble(true);
          console.log('Speech bubble should now be visible');
        }, 1000);
      } else {
        console.error('Clippy object not available after timeout');
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(checkInterval);
    };
  }, [clippy]);

  const clippyClicked = () => {
    setShowSpeechBubble(prev => !prev);
    if (clippy) {
      clippy.play('Wave');
    }
  };

  const handleUserInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim()) {
      // Add user message to chat history
      const userMessage: ChatMessage = { from: 'user', message: userInput };
      const newHistory = [...chatHistory, userMessage];
      setChatHistory(newHistory);

      // Simplified response logic
      const clippyResponse = "I'm here to help with your portfolio navigation!";

      if (clippy) {
        clippy.play('Thinking');

        // Get a random animation for variety
        setTimeout(() => {
          const animations = ['Wave', 'GetAttention', 'GestureRight'];
          clippy.play(animations[Math.floor(Math.random() * animations.length)]);
        }, 1000);
      }

      // Add Clippy's response after a short delay
      setTimeout(() => {
        const clippyResponseMessage: ChatMessage = {
          from: 'clippy',
          message: clippyResponse
        };
        setChatHistory(current => [...current, clippyResponseMessage]);
      }, 800);

      // Clear input field
      setUserInput('');
    }
  };

  const closeSpeechBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSpeechBubble(false);
    if (clippy) {
      clippy.play('GoodBye');
    }
  };

  return (
    <ClippyContainer onClick={clippyClicked}>
      {showSpeechBubble && (
        <SpeechBubble>
          <SpeechHeader>
            <SpeechTitle>Clippy Assistant</SpeechTitle>
            <CloseIcon onClick={closeSpeechBubble}>×</CloseIcon>
          </SpeechHeader>

          <div style={{
            maxHeight: '150px',
            overflowY: 'auto',
            marginBottom: '5px',
            padding: '5px'
          }}>
            {chatHistory.map((chat, index) => (
              <div key={index} style={{
                textAlign: chat.from === 'user' ? 'right' : 'left',
                margin: '4px 0',
                fontSize: '12px'
              }}>
                <span style={{
                  background: chat.from === 'user' ? '#e6f2ff' : '#f0f0f0',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  maxWidth: '80%'
                }}>
                  {chat.from === 'clippy' && (
                    <strong style={{ marginRight: '4px' }}>Clippy:</strong>
                  )}
                  {chat.message}
                </span>
              </div>
            ))}
          </div>

          <SpeechInput
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleUserInput}
            placeholder="Type your message here..."
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        </SpeechBubble>
      )}
    </ClippyContainer>
  );
};

export default ClippyAssistant; 
'use client';

import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { User, Computer, FileFind, Mail, FolderFile, Doc } from '@react95/icons';
import CVWindow from './components/CVWindow';
import '@react95/core/GlobalStyle';
import '@react95/core/themes/win95.css';
import { Fieldset } from '@react95/core';
import { useClippy, ClippyProvider, AGENTS } from '@react95/clippy';
import Win95FontDemo from '../lib/components/Win95FontDemo';
import Win95Window from '../lib/components/Win95Window';
import ContactWindowContent from '../lib/components/ContactWindow';
import GitHubProjectViewer from '../lib/components/GitHubProjectViewer';

// Windows 95 style components
const Desktop = styled.div`
  background-color: #008080;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const WindowFrame = styled.div`
  position: absolute;
  background: #c0c0c0;
  border-top: 2px solid white;
  border-left: 2px solid white;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  box-shadow: 2px 2px 0 #c0c0c0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;
`;

const WindowHeader = styled.div`
  height: 25px;
  background: linear-gradient(90deg, #000080, #1084d0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  color: white;
  font-weight: bold;
  cursor: move; /* Show move cursor on header */
`;

const WindowTitle = styled.div`
  font-family: "Arial", sans-serif;
  font-size: 12px;
`;

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  border-top: 2px solid white;
  border-left: 2px solid white;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  background: #c0c0c0;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 16px;
  
  &:active {
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
  }
`;

const WindowContent = styled.div`
  padding: 10px;
  background: #c0c0c0;
  flex: 1;
  overflow: auto;
`;

const Taskbar = styled.div`
  height: 30px;
  background: #c0c0c0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 2px solid white;
  display: flex;
  justify-content: space-between;
  padding: 2px;
  z-index: 1000;
`;

const StartButton = styled.button`
  display: flex;
  align-items: center;
  height: 26px;
  border-top: 2px solid white;
  border-left: 2px solid white;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  background: #c0c0c0;
  font-weight: bold;
  padding: 0 10px;
  cursor: pointer;
  
  &:active, &.active {
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
  }
`;

const StartMenu = styled.div`
  position: absolute;
  left: 2px;
  bottom: 32px;
  width: 200px;
  background: #c0c0c0;
  border-top: 2px solid white;
  border-left: 2px solid white;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  z-index: 1000;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  cursor: pointer;
  
  &:hover {
    background: #000080;
    color: white;
  }
`;

const Separator = styled.div`
  height: 1px;
  background: #808080;
  margin: 2px 0;
`;

const Time = styled.div`
  background: #c0c0c0;
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  padding: 0 10px;
  margin: 2px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const DesktopIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  cursor: pointer;
`;

const IconText = styled.span`
  color: white;
  text-shadow: 1px 1px 1px black;
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
  max-width: 70px;
`;

const ListContainer = styled.div`
  background: white;
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  margin: 10px 0;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  
  &:hover {
    background: #000080;
    color: white;
  }
`;

const Frame = styled.div`
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  padding: 8px;
  margin-top: 16px;
  background: #f0f0f0;
`;

// Contract/Paper styled components
const ContractPaper = styled.div`
  background: #fff;
  color: #000;
  font-family: 'Courier New', monospace;
  padding: 20px;
  border: 1px solid #000;
  margin: 10px;
  height: calc(100% - 20px);
  overflow-y: auto;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2) inset;
`;

const ContractTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
`;

const ContractSection = styled.div`
  margin-bottom: 15px;
`;

const ContractHeading = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  text-decoration: underline;
`;

const ContractText = styled.p`
  margin: 5px 0;
  line-height: 1.4;
`;

const ContractSignature = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const SignatureLine = styled.div`
  border-top: 1px solid #000;
  width: 200px;
  padding-top: 5px;
  text-align: center;
`;

// Clippy container styles
const ClippyContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 20px;
  cursor: pointer;
  z-index: 999; // Lower z-index so chat appears above
`;

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 150px;
  right: 20px;
  background: white;
  border: 2px solid #808080;
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  font-size: 12px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 1002; // Higher z-index to ensure it appears above Clippy
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 40px;
    border-width: 10px 10px 0;
    border-style: solid;
    border-color: white transparent;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: -12px;
    right: 38px;
    border-width: 12px 12px 0;
    border-style: solid;
    border-color: #808080 transparent;
  }
`;

const SpeechInput = styled.input`
  width: 100%;
  border: 1px solid #808080;
  margin-top: 5px;
  padding: 4px;
  font-size: 12px;
  font-family: 'Tahoma', sans-serif;
`;

const SpeechHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  border-bottom: 1px solid #c0c0c0;
  padding-bottom: 3px;
`;

const SpeechTitle = styled.div`
  font-weight: bold;
  font-size: 11px;
`;

const CloseIcon = styled.div`
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  &:hover {
    color: red;
  }
`;

// Define window types
type WindowName = 'about' | 'projects' | 'contact' | 'resume' | 'contract' | 'cv';
type WindowState = {
  [key in WindowName]: boolean;
};

// Window position interface
interface WindowPosition {
  x: number;
  y: number;
}

// Track window positions
type WindowPositions = {
  [key in WindowName]: WindowPosition;
};

// Chat message type
type ChatMessage = {
  from: 'user' | 'clippy';
  message: string;
};

// Resize handle for windows
const ResizeHandle = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  background: #c0c0c0;
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
`;

  function HomeContent() {
  // All React hooks must be called at the top level
  const { clippy } = useClippy();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowState>({
    about: false,
    projects: true, // Open by default
    contact: false,
    resume: true, // Open by default
    contract: false,
    cv: true  // Open by default
  });
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [clippyMessage, setClippyMessage] = useState("Hi there! I'm Clippy. Need help with anything?");
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  
  // Window positions state
  const [windowPositions, setWindowPositions] = useState<WindowPositions>({
    about: { x: 50, y: 100 },
    projects: { x: 20, y: 80 },
    contact: { x: 30, y: 180 },
    resume: { x: 40, y: 200 },
    contract: { x: 50, y: 80 },
    cv: { x: 65, y: 50 },
  });
  
  // Keep track of active window for z-index management
  const [activeWindow, setActiveWindow] = useState<WindowName>('projects');
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragWindow, setDragWindow] = useState<WindowName | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Add resizing state
  const [isResizing, setIsResizing] = useState(false);
  const [resizeWindow, setResizeWindow] = useState<WindowName | null>(null);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 });

  // Window sizes state
  const [windowSizes, setWindowSizes] = useState({
    about: { width: 400, height: 300 },
    projects: { width: 450, height: 350 },
    contact: { width: 350, height: 300 },
    resume: { width: 400, height: 400 },
    contract: { width: 550, height: 450 },
    cv: { width: 700, height: 500 },
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

    // Show Clippy's speech bubble after a delay
    const timer = setTimeout(() => {
      setShowSpeechBubble(true);
      const initialMessage: ChatMessage = {
        from: 'clippy',
        message: "Hi there! I'm Clippy. Need help with anything?"
      };
      setChatHistory([initialMessage]);
    }, 2000);

    // Add global mouse move and up event listeners for dragging and resizing
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragWindow) {
        const newX = (e.clientX - dragOffset.x) / window.innerWidth * 100; // Convert to percentage
        const newY = e.clientY - dragOffset.y;
        
        setWindowPositions(prev => ({
          ...prev,
          [dragWindow]: {
            x: Math.max(0, Math.min(newX, 90)), // Keep window on screen
            y: Math.max(0, Math.min(newY, window.innerHeight - 100)) // Keep window on screen
          }
        }));
      } else if (isResizing && resizeWindow) {
        // Handle resizing
        const deltaX = e.clientX - resizeStartPos.x;
        const deltaY = e.clientY - resizeStartPos.y;
        
        setWindowSizes(prev => ({
          ...prev,
          [resizeWindow]: {
            width: Math.max(200, resizeStartSize.width + deltaX),
            height: Math.max(150, resizeStartSize.height + deltaY)
          }
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragWindow(null);
      setIsResizing(false);
      setResizeWindow(null);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragWindow, dragOffset, isResizing, resizeWindow, resizeStartPos, resizeStartSize, clippy, chatHistory]);

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

  const clippyClicked = () => {
    setShowSpeechBubble(true);
    if (clippy) {
      clippy.play('Wave');
    }

    if (chatHistory.length === 0) {
      // If this is the first interaction, add an initial message from Clippy
      const initialMessage: ChatMessage = {
        from: 'clippy',
        message: "Hi there! I'm Clippy. I see you've got your projects and CV open. Can I help with anything?"
      };
      setChatHistory([initialMessage]);
    }
  };

  const handleUserInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim()) {
      // Add user message to chat history
      const userMessage: ChatMessage = { from: 'user', message: userInput };
      const newHistory = [...chatHistory, userMessage];
      setChatHistory(newHistory);

      // Process user input and generate Clippy response
      const userQuestion = userInput.toLowerCase();
      let clippyResponse = "I'm not sure how to help with that.";

      if (clippy) {
        // Simple pattern matching for responses
        if (userQuestion.includes('hello') || userQuestion.includes('hi')) {
          clippyResponse = "Hello there! How can I help you today?";
          clippy.play('Wave');
        } else if (userQuestion.includes('help')) {
          clippyResponse = "Click on the desktop icons to explore different sections of this portfolio!";
          clippy.play('GetAttention');
        } else if (userQuestion.includes('project')) {
          clippyResponse = "You can view my projects by clicking on the Projects icon on the desktop!";
          clippy.play('GestureRight');
        } else if (userQuestion.includes('contact')) {
          clippyResponse = "You can find my contact information in the Contact window.";
          clippy.play('GestureDown');
        } else if (userQuestion.includes('resume') || userQuestion.includes('cv')) {
          clippyResponse = "Check out my resume by clicking on the Resume icon!";
          clippy.play('GestureUp');
        } else if (userQuestion.includes('who are you') || userQuestion.includes('your name')) {
          clippyResponse = "I'm Clippy, your helpful assistant for this Windows 95 styled portfolio!";
          clippy.play('Congratulate');
        } else {
          // Random animations for other responses
          const animations = ['Thinking', 'GetAttention', 'Congratulate', 'GestureRight'];
          clippy.play(animations[Math.floor(Math.random() * animations.length)]);
        }
      }

      // Add Clippy's response after a short delay
      setTimeout(() => {
        const clippyResponseMessage: ChatMessage = { from: 'clippy', message: clippyResponse };
        setChatHistory(current => [...current, clippyResponseMessage]);
      }, 800);

      // Clear input field
      setUserInput('');
    }
  };

  const closeSpeechBubble = () => {
    setShowSpeechBubble(false);
    if (clippy) {
      clippy.play('GoodBye');
    }
  };
  
  // Handle mouse down on window header to start dragging
  const handleMouseDown = (e: React.MouseEvent, window: WindowName) => {
    // Set the window as active
    setActiveWindow(window);
    
    const windowElement = e.currentTarget;
    const rect = windowElement.getBoundingClientRect();
    
    setIsDragging(true);
    setDragWindow(window);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Prevent text selection during drag
    e.preventDefault();
  };
  
  // Handle mouse down on resize handle to start resizing
  const handleResizeMouseDown = (e: React.MouseEvent, window: WindowName) => {
    // Set the window as active
    setActiveWindow(window);
    
    setIsResizing(true);
    setResizeWindow(window);
    setResizeStartPos({
      x: e.clientX,
      y: e.clientY
    });
    setResizeStartSize({
      width: windowSizes[window].width,
      height: windowSizes[window].height
    });
    
    // Prevent text selection during resize
    e.preventDefault();
  };
  
  // Calculate window z-index
  const getWindowZIndex = (window: WindowName) => {
    return window === activeWindow ? 100 : 10;
  };

  return (
    <Desktop>
      {/* Clippy will be shown through the ClippyProvider */}
      {/* Desktop Icons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>

        <DesktopIcon onClick={() => openWindow('projects')}>
          <FolderFile style={{ width: 32, height: 32 }} />
          <IconText>Projects</IconText>
        </DesktopIcon>
        
        <DesktopIcon onClick={() => openWindow('contact')}>
          <Mail style={{ width: 32, height: 32 }} />
          <IconText>Contact</IconText>
        </DesktopIcon>
        
        <DesktopIcon onClick={() => openWindow('cv')}>
          <FileFind style={{ width: 32, height: 32 }} />
          <IconText>My CV (XP Style)</IconText>
        </DesktopIcon>
      </div>

      {/* Clippy Chat Interface */}
      <ClippyContainer onClick={clippyClicked}>
        {showSpeechBubble && (
          <SpeechBubble>
            <SpeechHeader>
              <SpeechTitle>Clippy Assistant</SpeechTitle>
              <CloseIcon onClick={(e) => {
                e.stopPropagation();
                closeSpeechBubble();
              }}>×</CloseIcon>
            </SpeechHeader>

            <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '5px' }}>
              {chatHistory.map((chat, index) => (
                <div key={index} style={{
                  textAlign: chat.from === 'user' ? 'right' : 'left',
                  margin: '4px 0',
                  fontSize: '11px'
                }}>
                  <span style={{
                    background: chat.from === 'user' ? '#e6f2ff' : '#f0f0f0',
                    padding: '3px 6px',
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
            />
          </SpeechBubble>
        )}
      </ClippyContainer>

      {/* Contract/Main Info Window */}
      {openWindows.contract && (
        <WindowFrame
          style={{ 
            width: `${windowSizes.contract.width}px`,
            height: `${windowSizes.contract.height}px`, 
            left: `${windowPositions.contract.x}%`, 
            top: `${windowPositions.contract.y}px`, 
            zIndex: getWindowZIndex('contract')
          }}
          onClick={() => setActiveWindow('contract')}
        >
          <WindowHeader 
            onMouseDown={(e) => handleMouseDown(e, 'contract')}
          >
            <WindowTitle>Personal Information Contract</WindowTitle>
            <CloseButton onClick={() => closeWindow('contract')}>×</CloseButton>
          </WindowHeader>
          <WindowContent style={{ padding: '0', position: 'relative' }}>
            <ContractPaper>
              <ContractTitle>Developer Agreement</ContractTitle>
              
              <ContractSection>
                <ContractHeading>DEVELOPER INFORMATION</ContractHeading>
                <ContractText><strong>Name:</strong> Your Full Name</ContractText>
                <ContractText><strong>Position:</strong> Full-Stack Web Developer</ContractText>
                <ContractText><strong>Location:</strong> Your City, Country</ContractText>
                <ContractText><strong>Available From:</strong> Immediately</ContractText>
              </ContractSection>
              
              <ContractSection>
                <ContractHeading>CORE SKILLS</ContractHeading>
                <ContractText>• <strong>Frontend:</strong> React, TypeScript, Next.js, HTML5/CSS3</ContractText>
                <ContractText>• <strong>Backend:</strong> Node.js, Express, MongoDB, SQL</ContractText>
                <ContractText>• <strong>Other:</strong> Git, CI/CD, Docker, AWS/Azure</ContractText>
              </ContractSection>
              
              <ContractSection>
                <ContractHeading>PROJECT DELIVERY GUARANTEE</ContractHeading>
                <ContractText>
                  I hereby commit to delivering high-quality code that meets industry standards
                  and best practices. All projects will be completed on time and within scope, 
                  with regular communication throughout the development process.
                </ContractText>
              </ContractSection>
              
              <ContractSection>
                <ContractHeading>PROBLEM-SOLVING APPROACH</ContractHeading>
                <ContractText>
                  I analyze each problem methodically, breaking complex issues into manageable parts.
                  My approach involves research, planning, implementation, and thorough testing to
                  ensure robust solutions.
                </ContractText>
              </ContractSection>
              
              <ContractSection>
                <ContractHeading>GROWTH MINDSET</ContractHeading>
                <ContractText>
                  I am committed to continuous learning and staying updated with the latest technologies
                  and development practices. I embrace challenges as opportunities for growth and
                  constantly seek to expand my knowledge base.
                </ContractText>
              </ContractSection>
              
              <ContractSignature>
                <SignatureLine>Developer Signature</SignatureLine>
                <SignatureLine>Date: {new Date().toLocaleDateString()}</SignatureLine>
              </ContractSignature>
            </ContractPaper>
            <ResizeHandle onMouseDown={(e) => handleResizeMouseDown(e, 'contract')} />
          </WindowContent>
        </WindowFrame>
      )}

      {/* About Me Window */}
      {openWindows.about && (
        <Win95Window
          title="About Me"
          icon={<User style={{ width: 16, height: 16 }} />}
          isOpen={openWindows.about}
          onClose={() => closeWindow('about')}
          position={{ x: windowPositions.about.x, y: windowPositions.about.y }}
          size={{ width: windowSizes.about.width, height: windowSizes.about.height }}
          zIndex={getWindowZIndex('about')}
          onActivate={() => setActiveWindow('about')}
          onPositionChange={(newPosition: { x: number, y: number }) => 
            setWindowPositions(prev => ({ ...prev, about: newPosition }))
          }
          onSizeChange={(newSize: { width: number, height: number }) => 
            setWindowSizes(prev => ({ ...prev, about: newSize }))
          }
        >
          <div style={{ padding: '16px', height: '100%', overflow: 'auto' }}>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={() => clippy && clippy.play('Wave')}
                style={{
                  padding: '5px 10px',
                  border: '2px outset #c0c0c0',
                  background: '#c0c0c0',
                  cursor: 'pointer'
                }}
              >
                Wave Clippy!
              </button>
            </div>
            <Fieldset legend="About This Portfolio">
              <p style={{ fontSize: '12px', margin: '0 0 8px 0' }}>
                This portfolio is designed as a Windows 95-style operating system interface, 
                showcasing my work and skills in a nostalgic and interactive way.
              </p>
              <p style={{ fontSize: '12px', margin: '0 0 8px 0' }}>
                Navigate through the various "programs" by clicking on desktop icons or using the Start menu.
              </p>
            </Fieldset>
            
            <Fieldset legend="How To Use" style={{ marginTop: '16px' }}>
              <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '12px' }}>
                <li>Click on desktop icons to open windows</li>
                <li>Use the Start menu to navigate</li>
                <li>Drag windows by their title bars</li>
                <li>Resize windows using the bottom-right corner</li>
                <li>Close windows with the X button</li>
              </ul>
            </Fieldset>
            
            <Fieldset legend="Technologies Used" style={{ marginTop: '16px' }}>
              <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '12px' }}>
                <li>Next.js & React</li>
                <li>TypeScript</li>
                <li>Styled Components</li>
                <li>React95 UI Library</li>
                <li>GitHub API</li>
              </ul>
            </Fieldset>
          </div>
        </Win95Window>
      )}

      {openWindows.projects && (
        <Win95Window
          title="My GitHub Projects"
          icon={<FolderFile style={{ width: 16, height: 16 }} />}
          isOpen={openWindows.projects}
          onClose={() => closeWindow('projects')}
          position={{ x: windowPositions.projects.x, y: windowPositions.projects.y }}
          size={{ width: windowSizes.projects.width, height: windowSizes.projects.height }}
          zIndex={getWindowZIndex('projects')}
          onActivate={() => setActiveWindow('projects')}
          onPositionChange={(newPosition: { x: number, y: number }) => 
            setWindowPositions(prev => ({ ...prev, projects: newPosition }))
          }
          onSizeChange={(newSize: { width: number, height: number }) => 
            setWindowSizes(prev => ({ ...prev, projects: newSize }))
          }
        >
          <GitHubProjectViewer 
            username="pelvity" 
            featured={["my-portfolio-web", "another-featured-project"]} 
            filterTopics={["portfolio", "react", "nextjs"]}
          />
        </Win95Window>
      )}

      {openWindows.resume && (
        <Win95Window
          title="Resume.doc"
          icon={<FileFind style={{ width: 16, height: 16 }} />}
          isOpen={openWindows.resume}
          onClose={() => closeWindow('resume')}
          position={{ x: windowPositions.resume.x, y: windowPositions.resume.y }}
          size={{ width: windowSizes.resume.width, height: windowSizes.resume.height }}
          zIndex={getWindowZIndex('resume')}
          onActivate={() => setActiveWindow('resume')}
          onPositionChange={(newPosition: { x: number, y: number }) => 
            setWindowPositions(prev => ({ ...prev, resume: newPosition }))
          }
          onSizeChange={(newSize: { width: number, height: number }) => 
            setWindowSizes(prev => ({ ...prev, resume: newSize }))
          }
        >
          <div style={{ padding: '16px', height: '100%', overflow: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginTop: 0 }}>Resume</h2>
            
            <Fieldset legend="Experience" style={{ marginBottom: '16px' }}>
              <ListContainer style={{ margin: '8px 0' }}>
                <ListItem>
                  Senior Developer - Example Company (2020-Present)
                </ListItem>
                <ListItem>
                  Web Developer - Another Company (2018-2020)
                </ListItem>
                <ListItem>
                  Junior Developer - First Job Inc. (2016-2018)
                </ListItem>
              </ListContainer>
            </Fieldset>
            
            <Fieldset legend="Education" style={{ marginBottom: '16px' }}>
              <p style={{ margin: '8px 0' }}>B.Sc. Computer Science - University Name (2012-2016)</p>
            </Fieldset>
            
            <Fieldset legend="Skills">
              <p style={{ margin: '8px 0' }}>
                HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, Git, SQL
              </p>
            </Fieldset>
          </div>
        </Win95Window>
      )}

      {openWindows.contact && (
        <Win95Window
          title="Contact"
          icon={<Mail style={{ width: 16, height: 16 }} />}
          isOpen={openWindows.contact}
          onClose={() => closeWindow('contact')}
          position={{ x: windowPositions.contact.x, y: windowPositions.contact.y }}
          size={{ width: windowSizes.contact.width, height: windowSizes.contact.height }}
          zIndex={getWindowZIndex('contact')}
          onActivate={() => setActiveWindow('contact')}
          onPositionChange={(newPosition: { x: number, y: number }) => 
            setWindowPositions(prev => ({ ...prev, contact: newPosition }))
          }
          onSizeChange={(newSize: { width: number, height: number }) => 
            setWindowSizes(prev => ({ ...prev, contact: newSize }))
          }
        >
          <ContactWindowContent />
        </Win95Window>
      )}

      {/* CV Window (Windows XP Style) */}
      {openWindows.cv && (
        <CVWindow 
          isOpen={openWindows.cv}
          onClose={() => closeWindow('cv')}
          initialPosition={{ x: windowPositions.cv.x, y: windowPositions.cv.y }}
          zIndex={getWindowZIndex('cv')}
        />
      )}

      {/* Taskbar */}
      <Taskbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StartButton 
            onClick={toggleStartMenu}
            className={showStartMenu ? 'active' : ''}
          >
            <img
              src="/start.svg"
              alt="Windows 95 logo"
              style={{ width: 18, height: 18, marginRight: '5px' }}
            />
            Start
          </StartButton>
        </div>
        
        {showStartMenu && (
          <StartMenu>
            <MenuItem onClick={() => openWindow('about')}>
              <User style={{ width: 20, height: 20, marginRight: '10px' }} />
              About Me
            </MenuItem>
            <MenuItem onClick={() => openWindow('projects')}>
              <FolderFile style={{ width: 20, height: 20, marginRight: '10px' }} />
              Projects
            </MenuItem>
            <MenuItem onClick={() => openWindow('resume')}>
              <FileFind style={{ width: 20, height: 20, marginRight: '10px' }} />
              Resume
            </MenuItem>
            <MenuItem onClick={() => openWindow('contact')}>
              <Mail style={{ width: 20, height: 20, marginRight: '10px' }} />
              Contact
            </MenuItem>
            <MenuItem onClick={() => openWindow('cv')}>
              <FileFind style={{ width: 20, height: 20, marginRight: '10px' }} />
              My CV (XP Style)
            </MenuItem>
            <Separator />
            <MenuItem>
              <Computer style={{ width: 20, height: 20, marginRight: '10px' }} />
              Shut Down...
            </MenuItem>
          </StartMenu>
        )}
        
        <Time>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Time>
      </Taskbar>
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

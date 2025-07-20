import React from 'react';
import { WindowName, WindowPositions, WindowSizes } from '../types';
import AboutWindow from './AboutWindow';
import ContractWindow from './ContractWindow';
import CVWindow from '../../app/components/CVWindow';
import Win95Window from './Win95Window';
import GitHubProjectViewer from './GitHubProjectViewer';
import ContactWindowContent from './ContactWindow';
import ResumeViewer from './ResumeViewer';
import { FolderFile, Mail, Doc, FileFind, Help } from '@react95/icons';

interface WindowManagerProps {
  openWindows: {
    [key in WindowName]: boolean;
  };
  windowPositions: WindowPositions;
  windowSizes: WindowSizes;
  activeWindow: WindowName;
  onActivateWindow: (window: WindowName) => void;
  onCloseWindow: (window: WindowName) => void;
  onPositionChange: (window: WindowName, position: { x: number, y: number }) => void;
  onSizeChange: (window: WindowName, size: { width: number, height: number }) => void;
  onWaveClippy: () => void;
}

const WindowManager: React.FC<WindowManagerProps> = ({
  openWindows,
  windowPositions,
  windowSizes,
  activeWindow,
  onActivateWindow,
  onCloseWindow,
  onPositionChange,
  onSizeChange,
  onWaveClippy
}) => {
  // Calculate window z-index
  const getWindowZIndex = (window: WindowName) => {
    return window === activeWindow ? 100 : 10;
  };

  return (
    <>
      {/* About Me Window */}
      {openWindows.about && (
        <AboutWindow 
          isOpen={openWindows.about}
          onClose={() => onCloseWindow('about')}
          position={windowPositions.about}
          size={windowSizes.about}
          zIndex={getWindowZIndex('about')}
          onActivate={() => onActivateWindow('about')}
          onPositionChange={(pos) => onPositionChange('about', pos)}
          onSizeChange={(size) => onSizeChange('about', size)}
          onWaveClippy={onWaveClippy}
        />
      )}

      {/* GitHub Projects Window */}
      {openWindows.projects && (
        <Win95Window
          title="My Github Projects"
          icon={<FolderFile style={{ width: 16, height: 40 }} />}
          isOpen={openWindows.projects}
          onClose={() => onCloseWindow('projects')}
          position={windowPositions.projects}
          size={windowSizes.projects}
          zIndex={getWindowZIndex('projects')}
          onActivate={() => onActivateWindow('projects')}
          onPositionChange={(pos) => onPositionChange('projects', pos)}
          onSizeChange={(size) => onSizeChange('projects', size)}
        >
          <GitHubProjectViewer 
            username="pelvity" 
            featured={["my_portfolio_web", "flowersshop"]} 
            filterTopics={["showcase", "react", "nextjs", "portfolio"]}
          />
        </Win95Window>
      )}

      {/* Resume Window */}
      {openWindows.resume && (
        <Win95Window
          title="Resume"
          icon={<FileFind style={{ width: 16, height: 16 }} />}
          isOpen={openWindows.resume}
          onClose={() => onCloseWindow('resume')}
          position={windowPositions.resume}
          size={windowSizes.resume}
          zIndex={getWindowZIndex('resume')}
          onActivate={() => onActivateWindow('resume')}
          onPositionChange={(pos) => onPositionChange('resume', pos)}
          onSizeChange={(size) => onSizeChange('resume', size)}
        >
          <ResumeViewer />
        </Win95Window>
      )}
      
      {/* PDF CV Window */}
      {openWindows.pdf && (
        <Win95Window
          title="CV PDF"
          icon={<Doc style={{ width: 16, height: 16 }} />}
          isOpen={openWindows.pdf}
          onClose={() => onCloseWindow('pdf')}
          position={windowPositions.pdf || { x: 300, y: 120 }}
          size={windowSizes.pdf || { width: 600, height: 800 }}
          zIndex={getWindowZIndex('pdf')}
          onActivate={() => onActivateWindow('pdf')}
          onPositionChange={(pos) => onPositionChange('pdf', pos)}
          onSizeChange={(size) => onSizeChange('pdf', size)}
        >
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '2px', background: '#c0c0c0', borderBottom: '1px solid #808080', textAlign: 'left' }}>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <button style={{ background: '#c0c0c0', border: '1px solid #c0c0c0', padding: '2px 5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Help style={{ width: 16, height: 16, marginRight: '5px' }} />
                    Open in New Tab
                  </div>
                </button>
              </a>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <iframe
                src="/assets/resume.pdf"
                style={{ border: 'none', height: '100%', width: '100%' }}
                title="Resume PDF"
              />
            </div>
          </div>
        </Win95Window>
      )}

      {/* Contact Window */}
      {openWindows.contact && (
        <Win95Window
          title="Contact"
          icon={<Mail style={{ width: 16, height: 16 }} />}
          isOpen={openWindows.contact}
          onClose={() => onCloseWindow('contact')}
          position={windowPositions.contact}
          size={windowSizes.contact}
          zIndex={getWindowZIndex('contact')}
          onActivate={() => onActivateWindow('contact')}
          onPositionChange={(pos) => onPositionChange('contact', pos)}
          onSizeChange={(size) => onSizeChange('contact', size)}
        >
          <ContactWindowContent />
        </Win95Window>
      )}

      {/* CV Window (Windows XP Style) */}
      {openWindows.cv && (
        <CVWindow 
          isOpen={openWindows.cv}
          onClose={() => onCloseWindow('cv')}
          initialPosition={{ x: windowPositions.cv.x, y: windowPositions.cv.y }}
          zIndex={getWindowZIndex('cv')}
        />
      )}

      {/* Contract Window */}
      {openWindows.contract && (
        <ContractWindow 
          isOpen={openWindows.contract}
          onClose={() => onCloseWindow('contract')}
          position={windowPositions.contract}
          size={windowSizes.contract}
          zIndex={getWindowZIndex('contract')}
          onActivate={() => onActivateWindow('contract')}
          onPositionChange={(pos) => onPositionChange('contract', pos)}
          onSizeChange={(size) => onSizeChange('contract', size)}
        />
      )}
    </>
  );
};

export default WindowManager; 
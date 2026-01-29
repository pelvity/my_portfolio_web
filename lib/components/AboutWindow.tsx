import React from 'react';
import { User } from '@react95/icons';
import { Fieldset } from '@react95/core';
import Win95Window from './Win95Window';

interface AboutWindowProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number, y: number };
  size: { width: number, height: number };
  zIndex: number;
  onActivate: () => void;
  onPositionChange: (position: { x: number, y: number }) => void;
  onSizeChange: (size: { width: number, height: number }) => void;
  onWaveClippy: () => void;
}

const AboutWindow: React.FC<AboutWindowProps> = ({
  isOpen,
  onClose,
  position,
  size,
  zIndex,
  onActivate,
  onPositionChange,
  onSizeChange,
  onWaveClippy
}) => {
  return (
    <Win95Window
      title="About Me"
      icon={<User style={{ width: 16, height: 16 }} />}
      isOpen={isOpen}
      onClose={onClose}
      position={position}
      size={size}
      zIndex={zIndex}
      onActivate={onActivate}
      onPositionChange={onPositionChange}
      onSizeChange={onSizeChange}
    >
      <div style={{ padding: '16px', height: '100%', overflow: 'auto' }}>
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={onWaveClippy}
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
            Navigate through the various &quot;programs&quot; by clicking on desktop icons or using the Start menu.
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
  );
};

export default AboutWindow; 
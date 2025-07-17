'use client';

import React, { useState } from 'react';
import { User } from '@react95/icons';
import { Frame } from '@react95/core';
import ResumeViewer from '../../lib/components/ResumeViewer';
import Win95Window from '../../lib/components/Win95Window';

interface CVWindowProps {
  isOpen: boolean;
  onClose: () => void;
  initialPosition: { x: number, y: number };
  zIndex: number;
}

const CVWindow: React.FC<CVWindowProps> = ({ isOpen, onClose, initialPosition, zIndex }) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 700, height: 500 });

  return (
    <Win95Window
      title="Resume - Windows 95"
      icon={<User style={{ width: 16, height: 16 }} />}
      isOpen={isOpen}
      onClose={onClose}
      position={position}
      size={size}
      zIndex={zIndex}
      onActivate={() => {}} // This is handled by the parent component
      onPositionChange={(newPosition: { x: number, y: number }) => setPosition(newPosition)}
      onSizeChange={(newSize: { width: number, height: number }) => setSize(newSize)}
    >
      <Frame
        variant="field"
        boxShadow="in"
        style={{ 
          height: '100%',
          overflow: 'auto'
        }}
      >
        <ResumeViewer />
      </Frame>
    </Win95Window>
  );
};

export default CVWindow; 
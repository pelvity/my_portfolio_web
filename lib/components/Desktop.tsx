import React from 'react';
import { FolderFile, Mail, Doc, FileFind, Computer } from '@react95/icons';
import { Desktop as StyledDesktop, DesktopIcon, IconText } from '../styles/WindowStyles';
import { WindowName } from '../types';

interface DesktopProps {
  onOpenWindow: (window: WindowName) => void;
  children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ onOpenWindow, children }) => {
  // You can toggle XP background here
  const useXPBackground = true;

  return (
    <StyledDesktop $xpBackground={useXPBackground}>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
        <DesktopIcon onClick={() => onOpenWindow('projects')}>
          <FolderFile style={{ width: 32, height: 32 }} />
          <IconText>My Github Projects</IconText>
        </DesktopIcon>

        <DesktopIcon onClick={() => onOpenWindow('contact')}>
          <Mail style={{ width: 32, height: 32 }} />
          <IconText>Contact</IconText>
        </DesktopIcon>

        <DesktopIcon onClick={() => onOpenWindow('cv')}>
          <FileFind style={{ width: 32, height: 32 }} />
          <IconText>My CV</IconText>
        </DesktopIcon>

        <DesktopIcon onClick={() => onOpenWindow('pdf')}>
          <Doc style={{ width: 32, height: 32 }} />
          <IconText>CV PDF</IconText>
        </DesktopIcon>

        <DesktopIcon onClick={() => onOpenWindow('lafleur')}>
          <Computer style={{ width: 32, height: 32 }} />
          <IconText>La Fleur Website</IconText>
        </DesktopIcon>
      </div>

      {children}
    </StyledDesktop>
  );
};

export default Desktop; 
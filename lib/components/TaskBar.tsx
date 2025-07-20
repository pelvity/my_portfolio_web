import React from 'react';
import { User, Computer, FolderFile, FileFind, Mail, Doc } from '@react95/icons';
import { Taskbar, StartButton, StartMenu, MenuItem, Separator, Time } from '../styles/WindowStyles';
import Clock from './Clock';
import { WindowName } from '../types';

interface TaskBarProps {
  showStartMenu: boolean;
  toggleStartMenu: () => void;
  openWindow: (window: WindowName) => void;
}

const TaskBar: React.FC<TaskBarProps> = ({
  showStartMenu,
  toggleStartMenu,
  openWindow
}) => {
  return (
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
            My Github Projects
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
            My CV
          </MenuItem>
          <MenuItem onClick={() => openWindow('pdf')}>
            <Doc style={{ width: 20, height: 20, marginRight: '10px' }} />
            CV PDF
          </MenuItem>
          <Separator />
          <MenuItem>
            <Computer style={{ width: 20, height: 20, marginRight: '10px' }} />
            Shut Down...
          </MenuItem>
        </StartMenu>
      )}
      
      <Time>
        <Clock />
      </Time>
    </Taskbar>
  );
};

export default TaskBar; 
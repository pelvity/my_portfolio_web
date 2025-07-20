import styled from 'styled-components';

// Windows 95 style components
export const Desktop = styled.div<{ $xpBackground?: boolean }>`
  background-color: ${props => props.$xpBackground ? 'transparent' : '#008080'};
  background-image: ${props => props.$xpBackground ? 'url("/assets/wallpapers/xp-bliss.jpg")' : 'none'};
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Taskbar = styled.div`
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

export const StartButton = styled.button`
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

export const StartMenu = styled.div`
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

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  cursor: pointer;
  
  &:hover {
    background: #000080;
    color: white;
  }
`;

export const Separator = styled.div`
  height: 1px;
  background: #808080;
  margin: 2px 0;
`;

export const Time = styled.div`
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

export const DesktopIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  cursor: pointer;
`;

export const IconText = styled.span`
  color: white;
  text-shadow: 1px 1px 1px black;
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
  max-width: 70px;
`; 
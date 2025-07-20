import styled from 'styled-components';

// Clippy container styles
export const ClippyContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 10px;
  cursor: pointer;
  z-index: 9999; // Higher z-index to ensure visibility
  transform: scale(1.2); // Make Clippy slightly larger
  
  /* Add visibility enhancements */
  filter: none;
  opacity: 1;
  pointer-events: all;
  
  /* Force any child agent elements to be visible */
  & .clippy,
  & .agent,
  & .agent-clippy,
  & [class*="agent"] {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }
`;

export const SpeechBubble = styled.div`
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
  z-index: 10000; // Higher z-index to ensure it appears above Clippy
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

export const SpeechInput = styled.input`
  width: 100%;
  border: 1px solid #808080;
  margin-top: 5px;
  padding: 4px;
  font-size: 12px;
  font-family: 'Tahoma', sans-serif;
`;

export const SpeechHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  border-bottom: 1px solid #c0c0c0;
  padding-bottom: 3px;
`;

export const SpeechTitle = styled.div`
  font-weight: bold;
  font-size: 11px;
`;

export const CloseIcon = styled.div`
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  &:hover {
    color: red;
  }
`; 
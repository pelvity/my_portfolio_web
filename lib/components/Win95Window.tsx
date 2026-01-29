'use client';

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

interface Win95WindowProps {
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position: { x: number, y: number };
  size: { width: number, height: number };
  zIndex: number;
  onActivate: () => void;
  onPositionChange?: (position: { x: number, y: number }) => void;
  onSizeChange?: (size: { width: number, height: number }) => void;
  children: React.ReactNode;
  resizable?: boolean;
}

const WindowFrame = styled.div<{ $zIndex: number, $width: number, $height: number, $position: { x: number, y: number } }>`
  position: absolute;
  top: ${props => props.$position.y}px;
  left: ${props => props.$position.x}px;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  background: #c0c0c0;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  display: flex;
  flex-direction: column;
  z-index: ${props => props.$zIndex};
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const WindowHeader = styled.div`
  height: 20px;
  background: #000080;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;
  color: white;
  font-weight: bold;
  cursor: move;
`;

const WindowTitle = styled.div`
  display: flex;
  align-items: center;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
  font-size: 12px;
`;

const TitleIcon = styled.div`
  margin-right: 4px;
  display: flex;
  align-items: center;
`;

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  background: #c0c0c0;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 16px;
  
  &:active {
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
  }
`;

const WindowContent = styled.div`
  flex: 1;
  overflow: auto;
  background: #c0c0c0;
`;

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

const Win95Window: React.FC<Win95WindowProps> = ({
  title,
  icon,
  isOpen,
  onClose,
  position,
  size,
  zIndex,
  onActivate,
  onPositionChange,
  onSizeChange,
  children,
  resizable = true
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 });
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        };

        // Keep window on screen
        const boundedPosition = {
          x: Math.max(0, Math.min(newPosition.x, window.innerWidth - 100)),
          y: Math.max(0, Math.min(newPosition.y, window.innerHeight - 100))
        };

        if (onPositionChange) {
          onPositionChange(boundedPosition);
        }
      } else if (isResizing && resizable) {
        const deltaX = e.clientX - resizeStartPos.x;
        const deltaY = e.clientY - resizeStartPos.y;

        const newSize = {
          width: Math.max(200, resizeStartSize.width + deltaX),
          height: Math.max(150, resizeStartSize.height + deltaY)
        };

        if (onSizeChange) {
          onSizeChange(newSize);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isResizing, resizeStartPos, resizeStartSize, onPositionChange, onSizeChange, resizable]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onActivate();

    const headerElement = headerRef.current;
    if (headerElement) {
      // const rect = headerElement.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      setIsDragging(true);
    }

    e.preventDefault();
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!resizable) return;

    onActivate();

    setIsResizing(true);
    setResizeStartPos({
      x: e.clientX,
      y: e.clientY
    });
    setResizeStartSize({
      width: size.width,
      height: size.height
    });

    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <WindowFrame
      $position={position}
      $width={size.width}
      $height={size.height}
      $zIndex={zIndex}
      onClick={onActivate}
    >
      <WindowHeader
        ref={headerRef}
        onMouseDown={handleMouseDown}
      >
        <WindowTitle>
          {icon && <TitleIcon>{icon}</TitleIcon>}
          {title}
        </WindowTitle>
        <CloseButton onClick={onClose}>×</CloseButton>
      </WindowHeader>
      <WindowContent>
        {children}
      </WindowContent>
      {resizable && (
        <ResizeHandle onMouseDown={handleResizeMouseDown} />
      )}
    </WindowFrame>
  );
};

export default Win95Window; 
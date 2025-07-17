'use client';

import React from 'react';
import styled from 'styled-components';
import { Frame } from '@react95/core';
import win95Theme from '../win95Theme';

const Container = styled.div`
  padding: ${win95Theme.spacing.medium};
  font-family: ${win95Theme.fonts.primary};
`;

const TextSection = styled.div`
  margin-bottom: ${win95Theme.spacing.medium};
`;

const SectionTitle = styled.div`
  font-weight: bold;
  margin-bottom: ${win95Theme.spacing.small};
`;

const FontSample = styled.div<{ size: string }>`
  font-size: ${props => props.size};
  line-height: 1.4;
  margin-bottom: ${win95Theme.spacing.small};
`;

const Win95FontDemo: React.FC = () => {
  return (
    <Frame
      boxShadow="out"
      style={{ 
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto'
      }}
    >
      <Container>
        <SectionTitle style={{ fontSize: win95Theme.fontSizes.large }}>
          Windows 95 Font Demonstration
        </SectionTitle>
        
        <hr style={{ 
          height: '1px',
          border: 'none',
          borderTop: '1px solid #808080',
          borderBottom: '1px solid #ffffff',
          margin: '8px 0'
        }} />
        
        <TextSection>
          <SectionTitle>MS Sans Serif Font Sizes:</SectionTitle>
          
          <FontSample size={win95Theme.fontSizes.title}>
            This is large text (16px) - Win95 Title
          </FontSample>
          
          <FontSample size={win95Theme.fontSizes.large}>
            This is medium text (14px) - Win95 Heading
          </FontSample>
          
          <FontSample size={win95Theme.fontSizes.normal}>
            This is standard text (12px) - Win95 Normal
          </FontSample>
          
          <FontSample size={win95Theme.fontSizes.small}>
            This is small text (10px) - Win95 Small
          </FontSample>
        </TextSection>
        
        <hr style={{ 
          height: '1px',
          border: 'none',
          borderTop: '1px solid #808080',
          borderBottom: '1px solid #ffffff',
          margin: '8px 0'
        }} />
        
        <TextSection>
          <SectionTitle>Font Styles:</SectionTitle>
          
          <FontSample size={win95Theme.fontSizes.normal}>
            <strong>Bold text</strong> - Standard weight text
          </FontSample>
          
          <FontSample size={win95Theme.fontSizes.normal}>
            <em>Italic text</em> - Standard weight text
          </FontSample>
        </TextSection>
      </Container>
    </Frame>
  );
};

export default Win95FontDemo; 
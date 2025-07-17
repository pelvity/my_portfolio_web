'use client';

import React from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from '@react95/core';
import { useCVContext } from '../contexts/CVContext';
import {
  OverviewTab,
  ExperienceTab,
  EducationTab,
  SkillsTab,
  LanguagesTab,
  DownloadTab
} from './ResumeTabContent';

// Windows 95 styling
const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #c0c0c0;
  overflow: hidden;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  padding: 16px;
  background: #c0c0c0;
  overflow: auto;
`;

const ItemDescription = styled.p`
  font-size: 12px;
  margin: 0 0 8px 0;
  line-height: 1.4;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const ResumeViewer: React.FC = () => {
  const { loading } = useCVContext();

  const renderContent = () => {
    if (loading) return <ItemDescription>Loading resume data...</ItemDescription>;
    
    return (
      <Tabs defaultActiveTab="Overview" width="100%">
        <Tab title="Overview">
          <OverviewTab />
        </Tab>
        <Tab title="Experience">
          <ExperienceTab />
        </Tab>
        <Tab title="Education">
          <EducationTab />
        </Tab>
        <Tab title="Skills">
          <SkillsTab />
        </Tab>
        <Tab title="Languages">
          <LanguagesTab />
        </Tab>
        <Tab title="Download">
          <DownloadTab />
        </Tab>
      </Tabs>
    );
  };

  return (
    <ViewerContainer>
      <ContentArea>
        {renderContent()}
      </ContentArea>
    </ViewerContainer>
  );
};

export default ResumeViewer; 
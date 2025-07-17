'use client';

import React from 'react';
import styled from 'styled-components';
import { Doc } from '@react95/icons';
import { formatDateRange } from '../cv-parser';
import { Fieldset } from '@react95/core';
import { useCVContext } from '../contexts/CVContext';

// Styled components
const ResumeTitle = styled.h1`
  font-size: 20px;
  color: #000;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: bold;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const ResumeSubtitle = styled.h2`
  font-size: 16px;
  color: #000;
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: normal;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const ItemTitle = styled.div`
  font-size: 13px;
  margin: 0 0 4px 0;
  font-weight: bold;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const ItemDate = styled.div`
  font-size: 11px;
  color: #000;
  margin-bottom: 8px;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const ItemDescription = styled.p`
  font-size: 12px;
  margin: 0 0 8px 0;
  line-height: 1.4;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const AchievementsList = styled.ul`
  margin: 8px 0;
  padding-left: 20px;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const AchievementItem = styled.li`
  font-size: 12px;
  margin-bottom: 4px;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const SkillItem = styled.div`
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 4px 8px;
  font-size: 12px;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-decoration: none;
  color: #000;
  font-size: 12px;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
  cursor: pointer;

  &:hover {
    border: 1px solid #0a0a0a;
  }

  &:active {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    padding: 5px 7px 3px 9px;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
`;

// Tab content components
export const OverviewTab: React.FC = () => {
  const { cvData, loading } = useCVContext();
  
  if (loading || !cvData) return null;
  
  return (
    <>
      <ResumeTitle>{cvData.basics.name}</ResumeTitle>
      <ResumeSubtitle>{cvData.basics.title}</ResumeSubtitle>
      
      <Fieldset legend="Summary" style={{ marginBottom: '1em' }}>
        <ItemDescription>{cvData.basics.summary}</ItemDescription>
      </Fieldset>
    </>
  );
};

export const ExperienceTab: React.FC = () => {
  const { cvData, loading } = useCVContext();
  
  if (loading || !cvData) return null;
  
  return (
    <>
      {cvData.experience.map((exp, index) => (
        <Fieldset legend={exp.company} style={{ marginBottom: '1em' }} key={index}>
          <ItemTitle>{exp.position}</ItemTitle>
          <ItemDate>{formatDateRange(exp.startDate, exp.endDate)}</ItemDate>
          <ItemDescription>{exp.description}</ItemDescription>
          {exp.achievements && exp.achievements.length > 0 && (
            <AchievementsList>
              {exp.achievements.map((achievement, i) => (
                <AchievementItem key={i}>{achievement}</AchievementItem>
              ))}
            </AchievementsList>
          )}
        </Fieldset>
      ))}
    </>
  );
};

export const EducationTab: React.FC = () => {
  const { cvData, loading } = useCVContext();
  
  if (loading || !cvData) return null;
  
  return (
    <>
      {cvData.education.map((edu, index) => (
        <Fieldset legend={edu.institution} style={{ marginBottom: '1em' }} key={index}>
          <ItemTitle>{edu.degree} in {edu.field}</ItemTitle>
          <ItemDate>{formatDateRange(edu.startDate, edu.endDate)}</ItemDate>
          {edu.description && <ItemDescription>{edu.description}</ItemDescription>}
        </Fieldset>
      ))}
    </>
  );
};

export const SkillsTab: React.FC = () => {
  const { cvData, loading } = useCVContext();
  
  if (loading || !cvData) return null;
  
  // Group skills by category
  const categories = cvData.skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof cvData.skills>);
  
  return (
    <>
      {Object.entries(categories).map(([category, skills], categoryIndex) => (
        <Fieldset legend={category} style={{ marginBottom: '1em' }} key={category}>
          <SkillsContainer>
            {skills.map((skill, index) => (
              <SkillItem key={index}>
                {skill.name}
              </SkillItem>
            ))}
          </SkillsContainer>
        </Fieldset>
      ))}
    </>
  );
};

export const LanguagesTab: React.FC = () => {
  const { cvData, loading } = useCVContext();
  
  if (loading || !cvData || !cvData.languages) return null;
  
  return (
    <>
      <Fieldset legend="Languages" style={{ marginBottom: '1em' }}>
        <SkillsContainer>
          {cvData.languages.map((language, index) => (
            <SkillItem key={index} style={{ 
              fontWeight: language.level === 'Native' ? 'bold' : 'normal'
            }}>
              {language.name} ({language.level})
            </SkillItem>
          ))}
        </SkillsContainer>
      </Fieldset>
    </>
  );
};

export const DownloadTab: React.FC = () => {
  return (
    <>
      <Fieldset legend="Download Resume" style={{ marginBottom: '1em' }}>
        <ItemDescription>Download my resume in your preferred format:</ItemDescription>
        
        <div style={{ marginTop: 16 }}>
          <DownloadButton href="/assets/resume.pdf" download>
            <ButtonIcon><Doc /></ButtonIcon>
            PDF Format
          </DownloadButton>
          
          <DownloadButton href="/assets/resume.docx" download>
            <ButtonIcon><Doc /></ButtonIcon>
            Word Format
          </DownloadButton>
        </div>
        
        <ItemDescription style={{ marginTop: 16 }}>
          Note: These are the original formatted versions of my resume, which may contain additional details
          not shown in this viewer.
        </ItemDescription>
      </Fieldset>
    </>
  );
}; 
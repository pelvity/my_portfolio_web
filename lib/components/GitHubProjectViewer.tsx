'use client';

import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import styled from 'styled-components';
import { Fieldset, Frame } from '@react95/core';
import { FolderFile, Computer, Globe } from '@react95/icons';

// Create a Select component since @react95/core doesn't export one
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  defaultValue?: string;
  width?: number;
}

const StyledSelect = styled.select<{ width?: number }>`
  background: white;
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  box-shadow: inset 1px 1px 0px #000;
  padding: 3px;
  font-size: 12px;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
  width: ${props => (props.width ? `${props.width}px` : 'auto')};
`;

const Select: React.FC<SelectProps> = ({ options, onChange, value, defaultValue, width }) => {
  return (
    <StyledSelect onChange={onChange} value={value} defaultValue={defaultValue} width={width}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
}

interface GitHubProjectViewerProps {
  username: string;
  featured?: string[]; // Array of repo names to feature
  filterTopics?: string[]; // Array of topics to filter by (only show repos with these topics)
  showAllOption?: boolean; // Whether to show "All Topics" option in dropdown
}

const Container = styled.div`
  padding: 16px;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
  height: 100%;
  overflow: auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const ProjectCard = styled.div`
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background: #d9d9d9;
  }
`;

const ProjectTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const ProjectDescription = styled.p`
  font-size: 12px;
  margin: 8px 0;
`;

const ProjectStats = styled.div`
  font-size: 11px;
  color: #333;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`;

const ProjectTopics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`;

const TopicTag = styled.span`
  background: #000080;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 2px;
  cursor: pointer;
  
  &:hover {
    background: #0000a0;
  }

  &.active {
    background: #00a000;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 4px 8px;
  text-decoration: none;
  color: #000;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #d9d9d9;
  }

  &:active {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
`;

const IconWrapper = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
`;

const LoadingText = styled.p`
  font-size: 14px;
  margin: 20px 0;
`;

const ErrorText = styled.p`
  font-size: 14px;
  color: #ff0000;
  margin: 20px 0;
`;

const ProjectDetails = styled.div`
  margin-top: 16px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
`;

const FilterLabel = styled.div`
  font-size: 12px;
`;

const ClearFilterButton = styled.button`
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 2px 8px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background: #d9d9d9;
  }
  
  &:active {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
`;

const GitHubProjectViewer: React.FC<GitHubProjectViewerProps> = ({ 
  username, 
  featured = [], 
  filterTopics = ["showcase"],
  showAllOption = true
}) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Sort repos: featured first, then by stars
        const sortedRepos = data.sort((a: GitHubRepo, b: GitHubRepo) => {
          // Featured repos first
          const aFeatured = featured.includes(a.name);
          const bFeatured = featured.includes(b.name);
          
          if (aFeatured && !bFeatured) return -1;
          if (!aFeatured && bFeatured) return 1;
          
          // Then by stars
          return b.stargazers_count - a.stargazers_count;
        });
        
        // Pre-filter repos if filterTopics is provided
        let filteredByTopics = sortedRepos;
        if (filterTopics.length > 0) {
          filteredByTopics = sortedRepos.filter(repo => 
            repo.topics.some(topic => filterTopics.includes(topic))
          );
        }
        
        setRepos(filteredByTopics);
        setFilteredRepos(filteredByTopics);
        
        // Extract all unique topics for filtering
        const allTopics = new Set<string>();
        
        // If filterTopics is provided, only use those topics
        if (filterTopics.length > 0) {
          filterTopics.forEach(topic => allTopics.add(topic));
        } else {
          filteredByTopics.forEach((repo: GitHubRepo) => {
            repo.topics.forEach((topic: string) => allTopics.add(topic));
          });
        }
        
        setAvailableTopics(Array.from(allTopics).sort());
        
        // Select the first repo by default
        if (filteredByTopics.length > 0) {
          setSelectedRepo(filteredByTopics[0]);
        }
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub repositories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRepos();
  }, [username, featured, filterTopics]);

  // Apply filter when selectedTopic changes
  useEffect(() => {
    if (selectedTopic) {
      const filtered = repos.filter(repo => 
        repo.topics.includes(selectedTopic)
      );
      setFilteredRepos(filtered);
      
      // Update selected repo if it's not in filtered results
      if (filtered.length > 0 && 
          selectedRepo && 
          !filtered.some(repo => repo.id === selectedRepo.id)) {
        setSelectedRepo(filtered[0]);
      }
    } else {
      setFilteredRepos(repos);
    }
  }, [selectedTopic, repos, selectedRepo]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };
  
  const clearFilter = () => {
    setSelectedTopic(null);
  };

  if (loading) {
    return (
      <Container>
        <LoadingText>Loading GitHub projects...</LoadingText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorText>Error: {error}</ErrorText>
      </Container>
    );
  }

  // Don't show filter if we're already filtering by specific topics
  // or if there's only one topic available
  const showFilter = availableTopics.length > 1 && (showAllOption || !filterTopics.length);

  return (
    <Container>
      {showFilter && (
        <FilterContainer>
          <FilterLabel>Filter by topic:</FilterLabel>
          <Select 
            defaultValue=""
            options={[
              ...(showAllOption ? [{ value: "", label: "All Topics" }] : []),
              ...availableTopics.map(topic => ({
                value: topic,
                label: topic
              }))
            ]}
            width={150}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedTopic(e.target.value || null)}
            value={selectedTopic || ""}
          />
          {selectedTopic && (
            <ClearFilterButton onClick={clearFilter}>
              Clear Filter
            </ClearFilterButton>
          )}
        </FilterContainer>
      )}

      <Fieldset legend="My GitHub Projects">
        {filteredRepos.length === 0 ? (
          <p>No projects match the selected filter.</p>
        ) : (
          <ProjectsGrid>
            {filteredRepos.map(repo => (
              <ProjectCard 
                key={repo.id} 
                onClick={() => setSelectedRepo(repo)}
                style={{ 
                  background: selectedRepo?.id === repo.id ? '#d9d9d9' : '#c0c0c0',
                  borderColor: selectedRepo?.id === repo.id ? '#000080' : undefined
                }}
              >
                <ProjectTitle>
                  <IconWrapper>
                    <FolderFile style={{ width: 16, height: 16 }} />
                  </IconWrapper>
                  {repo.name}
                </ProjectTitle>
                <ProjectDescription>
                  {repo.description || 'No description available'}
                </ProjectDescription>
                <ProjectStats>
                  <span>{repo.language || 'Various'}</span>
                  <span>⭐ {repo.stargazers_count}</span>
                </ProjectStats>
                {repo.topics && repo.topics.length > 0 && (
                  <ProjectTopics>
                    {repo.topics.slice(0, 3).map(topic => (
                      <TopicTag 
                        key={topic}
                        className={selectedTopic === topic ? 'active' : ''}
                        onClick={(e: MouseEvent<HTMLSpanElement>) => {
                          e.stopPropagation();
                          handleTopicSelect(topic);
                        }}
                      >
                        {topic}
                      </TopicTag>
                    ))}
                    {repo.topics.length > 3 && <TopicTag>+{repo.topics.length - 3}</TopicTag>}
                  </ProjectTopics>
                )}
              </ProjectCard>
            ))}
          </ProjectsGrid>
        )}
      </Fieldset>

      {selectedRepo && (
        <ProjectDetails>
          <Fieldset legend={selectedRepo.name}>
            <Frame
              variant="field"
              boxShadow="in"
              style={{ padding: '12px', marginBottom: '16px' }}
            >
              <ProjectDescription>
                {selectedRepo.description || 'No description available'}
              </ProjectDescription>
              
              <ProjectStats>
                <span>Created: {formatDate(selectedRepo.created_at)}</span>
                <span>Updated: {formatDate(selectedRepo.updated_at)}</span>
              </ProjectStats>
              
              <ProjectStats>
                <span>Language: {selectedRepo.language || 'Various'}</span>
                <span>Stars: {selectedRepo.stargazers_count}</span>
                <span>Forks: {selectedRepo.forks_count}</span>
              </ProjectStats>
              
              {selectedRepo.topics && selectedRepo.topics.length > 0 && (
                <ProjectTopics>
                  {selectedRepo.topics.map(topic => (
                    <TopicTag 
                      key={topic} 
                      className={selectedTopic === topic ? 'active' : ''}
                      onClick={(e: MouseEvent<HTMLSpanElement>) => {
                        e.stopPropagation();
                        handleTopicSelect(topic);
                      }}
                    >
                      {topic}
                    </TopicTag>
                  ))}
                </ProjectTopics>
              )}
              
              <ButtonsContainer>
                <LinkButton href={selectedRepo.html_url} target="_blank" rel="noopener noreferrer">
                  <IconWrapper><Computer style={{ width: 16, height: 16 }} /></IconWrapper>
                  View on GitHub
                </LinkButton>
                
                {selectedRepo.homepage && (
                  <LinkButton href={selectedRepo.homepage} target="_blank" rel="noopener noreferrer">
                    <IconWrapper><Globe style={{ width: 16, height: 16 }} /></IconWrapper>
                    {selectedRepo.homepage.includes('vercel.app') ? 'Vercel Deployment' : 'Live Demo'}
                  </LinkButton>
                )}
              </ButtonsContainer>
            </Frame>
          </Fieldset>
        </ProjectDetails>
      )}
    </Container>
  );
};

export default GitHubProjectViewer; 
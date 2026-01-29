'use client';

import React, { useState, useEffect, ChangeEvent, MouseEvent, useCallback } from 'react';
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
  // Only use value if provided, otherwise use defaultValue
  const selectProps: Record<string, unknown> = {
    onChange,
    width
  };

  if (value !== undefined) {
    selectProps.value = value;
  } else if (defaultValue !== undefined) {
    selectProps.defaultValue = defaultValue;
  }

  return (
    <StyledSelect {...selectProps}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

// Create a session storage cache key for GitHub repos
const GITHUB_CACHE_KEY = 'githubReposCache';
const GITHUB_CACHE_EXPIRY_KEY = 'githubReposCacheExpiry';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Rate limit handling variables
const RATE_LIMIT_COOLDOWN = 60 * 1000; // 60 seconds in milliseconds

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
  fork: boolean; // Added fork property
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const LoadingText = styled.p`
  font-size: 14px;
  margin: 20px 0;
`;

const LoadingIndicator = styled.div`
  width: 50px;
  height: 20px;
  text-align: center;
  
  &:after {
    content: '.';
    animation: dots 1.5s steps(5, end) infinite;
  }
  
  @keyframes dots {
    0%, 20% {
      color: rgba(0,0,0,0);
      text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);
    }
    40% {
      color: #000;
      text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);
    }
    60% {
      text-shadow: .25em 0 0 #000, .5em 0 0 rgba(0,0,0,0);
    }
    80%, 100% {
      text-shadow: .25em 0 0 #000, .5em 0 0 #000;
    }
  }
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

const GitHubProjectViewer: React.FC<GitHubProjectViewerProps> = React.memo(({
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
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Function to get cached repos
  const getCachedRepos = useCallback(() => {
    if (typeof window === 'undefined') return null;

    try {
      const cacheExpiry = localStorage.getItem(GITHUB_CACHE_EXPIRY_KEY);
      const cacheData = localStorage.getItem(GITHUB_CACHE_KEY);

      if (!cacheExpiry || !cacheData) return null;

      const expiryTime = parseInt(cacheExpiry, 10);

      // Check if cache is still valid
      if (Date.now() < expiryTime) {
        const data = JSON.parse(cacheData);

        // Make sure we're getting data for the right username
        if (data.username === username) {
          return data.repos;
        }
      }
    } catch (err) {
      console.error('Error reading from cache:', err);
    }

    return null;
  }, [username]);

  // Function to cache repos
  const cacheRepos = useCallback((repos: GitHubRepo[]) => {
    if (typeof window === 'undefined') return;

    try {
      const cacheData = {
        username,
        repos
      };

      localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify(cacheData));
      localStorage.setItem(GITHUB_CACHE_EXPIRY_KEY, (Date.now() + CACHE_TTL).toString());
    } catch (err) {
      console.error('Error writing to cache:', err);
    }
  }, [username]);

  // Function to process repos data
  const processReposData = useCallback((ownRepos: GitHubRepo[]) => {
    // Sort repos - featured first, then by updated date
    const sortedRepos = [...ownRepos].sort((a, b) => {
      // Featured repos first
      const aFeatured = featured.includes(a.name);
      const bFeatured = featured.includes(b.name);

      if (aFeatured && !bFeatured) return -1;
      if (!aFeatured && bFeatured) return 1;

      // Then sort by update date
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    setRepos(sortedRepos);

    // Extract all unique topics from repos
    const allTopics = Array.from(
      new Set(
        sortedRepos.flatMap(repo => repo.topics)
      )
    ).sort();

    setAvailableTopics(allTopics);

    // Initial filtering
    if (filterTopics && filterTopics.length > 0) {
      // Find the first filter topic that exists in our repos
      const initialTopic = filterTopics.find(topic => allTopics.includes(topic)) || null;
      setSelectedTopic(initialTopic);

      if (initialTopic) {
        setFilteredRepos(sortedRepos.filter(repo => repo.topics.includes(initialTopic)));
      } else {
        setFilteredRepos(sortedRepos);
      }
    } else {
      setFilteredRepos(sortedRepos);
    }

    // Set first repo as selected by default
    if (sortedRepos.length > 0) {
      setSelectedRepo(sortedRepos[0]);
    }
  }, [featured, filterTopics]);

  // Fetch repos with retry logic
  const fetchReposWithRetry = useCallback(async (retryCount = 0, delay = 1000) => {
    // Create a controller outside the try block so we can access it in the returned cleanup function
    const controller = new AbortController();

    try {
      setLoading(true);

      // Check if we're rate limited
      if (isRateLimited) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }

      // Check cache first
      const cachedData = getCachedRepos();
      if (cachedData) {
        processReposData(cachedData);
        setLoading(false);
        setError(null);
        // Return cleanup function even when using cache
        return () => {
          controller.abort();
        };
      }

      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `token ${token}`;
      }

      // Using the controller for fetch to be able to abort it when component unmounts
      const signal = controller.signal;

      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers,
        signal
      });

      // Check for rate limit headers
      const rateLimit = parseInt(response.headers.get('x-ratelimit-remaining') || '1', 10);
      const rateLimitReset = parseInt(response.headers.get('x-ratelimit-reset') || '0', 10) * 1000;

      if (rateLimit <= 0) {
        const resetTime = new Date(rateLimitReset);
        const waitTime = Math.max(
          rateLimitReset - Date.now(),
          RATE_LIMIT_COOLDOWN
        );

        setIsRateLimited(true);

        // Set a timeout to reset the rate limit flag
        setTimeout(() => {
          setIsRateLimited(false);
        }, waitTime);

        throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Filter out forked repositories (only show your own projects)
      const ownRepos = data.filter((repo: GitHubRepo) => !repo.fork);

      // Cache the fetched repos
      cacheRepos(ownRepos);

      // Process the repos data
      processReposData(ownRepos);

      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          // Do nothing for aborted requests
          return;
        }

        console.error('Error fetching GitHub repos:', err.message);
        setError(err.message);

        // If we have network errors, try to retry with exponential backoff
        if (retryCount < 3 && !isRateLimited && err.message.includes('fetch')) {
          const nextDelay = delay * 2;
          setTimeout(() => {
            fetchReposWithRetry(retryCount + 1, nextDelay);
          }, delay);
        }
      }
    } finally {
      setLoading(false);
    }

    // Always return the cleanup function
    return () => {
      controller.abort();
    };
  }, [username, isRateLimited, getCachedRepos, cacheRepos, processReposData]);

  useEffect(() => {
    let cleanupFunction: (() => void) | undefined;

    const executeEffect = async () => {
      cleanupFunction = await fetchReposWithRetry();
    };

    executeEffect();

    return () => {
      if (cleanupFunction) cleanupFunction();
    };
  }, [fetchReposWithRetry]);

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
        <Fieldset legend="GitHub Projects">
          <LoadingContainer>
            <LoadingText>Loading repositories</LoadingText>
            <LoadingIndicator />
          </LoadingContainer>
        </Fieldset>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Fieldset legend="GitHub Projects">
          <ErrorText>{error}</ErrorText>
        </Fieldset>
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
});

GitHubProjectViewer.displayName = 'GitHubProjectViewer';

export default GitHubProjectViewer; 
'use client';

// CV parser utility
// This file provides functions to parse and extract data from a CV JSON file

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
}

export interface Skill {
  name: string;
  level?: string;
  category?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  telegram?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface CVData {
  basics: {
    name: string;
    title: string;
    summary: string;
    contact: ContactInfo;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  languages?: Language[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }[];
}

// Default CV data
const defaultCV: CVData = {
  basics: {
    name: "Your Name",
    title: "Your Professional Title",
    summary: "A brief professional summary about yourself.",
    contact: {
      email: "your.email@example.com",
      phone: "+1 234 567 890",
      location: "City, Country",
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername",
      website: "https://yourwebsite.com"
    }
  },
  education: [
    {
      institution: "University Name",
      degree: "Degree Type",
      field: "Field of Study",
      startDate: "2015",
      endDate: "2019",
      description: "Relevant coursework or achievements"
    }
  ],
  experience: [
    {
      company: "Company Name",
      position: "Job Title",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "Job description and responsibilities",
      achievements: [
        "Significant achievement 1",
        "Significant achievement 2"
      ]
    }
  ],
  skills: [
    {
      name: "Web Development",
      level: "Expert",
      category: "Technical"
    },
    {
      name: "React",
      level: "Advanced",
      category: "Framework"
    }
  ],
  projects: [
    {
      name: "Project Name",
      description: "A brief description of the project",
      technologies: ["React", "TypeScript", "Node.js"],
      link: "https://project-link.com",
      image: "/assets/project-image.jpg"
    }
  ]
};

// Function to get CV data
export const getCVData = async (): Promise<CVData> => {
  try {
    // Fetch the CV data from the JSON file
    const response = await fetch('/assets/cv-data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch CV data');
    }
    return await response.json() as CVData;
  } catch (error) {
    console.error("Error loading CV data:", error);
    return defaultCV;
  }
};

// Helper function to format date ranges
export const formatDateRange = (startDate: string, endDate: string): string => {
  return `${startDate} - ${endDate === "Present" ? "Present" : endDate}`;
}; 
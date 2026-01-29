'use client';

import React from 'react';
import styled from 'styled-components';
import { Mail } from '@react95/icons';
import { Fieldset } from '@react95/core';
import { useCVContext } from '../contexts/CVContext';

interface ContactWindowContentProps {
  onClose?: () => void;
}

const ContentContainer = styled.div`
  padding: 16px;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const HeaderTitle = styled.h3`
  margin: 0 0 0 10px;
  font-size: 14px;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const ContactItem = styled.p`
  font-size: 12px;
  margin: 6px 0;
  font-family: 'MS Sans Serif', 'Pixelated MS Sans Serif', sans-serif;
`;

const ContactLink = styled.a`
  color: #000080;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ContactWindowContent: React.FC<ContactWindowContentProps> = () => {
  const { cvData, loading } = useCVContext();

  if (loading) {
    return <ContactItem>Loading contact information...</ContactItem>;
  }

  if (!cvData) {
    return <ContactItem>Failed to load contact information. Please try again later.</ContactItem>;
  }

  const { contact } = cvData.basics;

  return (
    <ContentContainer>
      <ContactHeader>
        <Mail style={{ width: 24, height: 24 }} />
        <HeaderTitle>Get In Touch</HeaderTitle>
      </ContactHeader>

      <Fieldset legend="Contact Information" style={{ marginBottom: '1em' }}>
        <ContactItem><strong>Name:</strong> {cvData.basics.name}</ContactItem>
        <ContactItem><strong>Email:</strong> {contact.email}</ContactItem>
        {contact.phone && <ContactItem><strong>Phone:</strong> {contact.phone}</ContactItem>}
        {contact.location && <ContactItem><strong>Location:</strong> {contact.location}</ContactItem>}
        {contact.github && (
          <ContactItem>
            <strong>GitHub:</strong> <ContactLink href={contact.github} target="_blank" rel="noopener noreferrer">{contact.github}</ContactLink>
          </ContactItem>
        )}
        {contact.linkedin && (
          <ContactItem>
            <strong>LinkedIn:</strong> <ContactLink href={contact.linkedin} target="_blank" rel="noopener noreferrer">{contact.linkedin}</ContactLink>
          </ContactItem>
        )}
        {contact.website && (
          <ContactItem>
            <strong>Website:</strong> <ContactLink href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website}</ContactLink>
          </ContactItem>
        )}
        {contact.telegram && (
          <ContactItem>
            <strong>Telegram:</strong> <ContactLink href={contact.telegram} target="_blank" rel="noopener noreferrer">{contact.telegram}</ContactLink>
          </ContactItem>
        )}
      </Fieldset>

      <Fieldset legend="Message">
        <ContactItem>
          Feel free to reach out if you&apos;d like to collaborate on a project
          or just want to say hello!
        </ContactItem>
      </Fieldset>
    </ContentContainer>
  );
};

export default ContactWindowContent; 
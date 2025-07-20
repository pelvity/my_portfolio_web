import React from 'react';
import Win95Window from './Win95Window';
import {
  ContractPaper,
  ContractTitle,
  ContractSection,
  ContractHeading,
  ContractText,
  ContractSignature,
  SignatureLine
} from '../styles/ContractStyles';

interface ContractWindowProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number, y: number };
  size: { width: number, height: number };
  zIndex: number;
  onActivate: () => void;
  onPositionChange: (position: { x: number, y: number }) => void;
  onSizeChange: (size: { width: number, height: number }) => void;
}

const ContractWindow: React.FC<ContractWindowProps> = ({
  isOpen,
  onClose,
  position,
  size,
  zIndex,
  onActivate,
  onPositionChange,
  onSizeChange
}) => {
  return (
    <Win95Window
      title="Personal Information Contract"
      isOpen={isOpen}
      onClose={onClose}
      position={position}
      size={size}
      zIndex={zIndex}
      onActivate={onActivate}
      onPositionChange={onPositionChange}
      onSizeChange={onSizeChange}
    >
      <ContractPaper>
        <ContractTitle>Developer Agreement</ContractTitle>
        
        <ContractSection>
          <ContractHeading>DEVELOPER INFORMATION</ContractHeading>
          <ContractText><strong>Name:</strong> Your Full Name</ContractText>
          <ContractText><strong>Position:</strong> Full-Stack Web Developer</ContractText>
          <ContractText><strong>Location:</strong> Your City, Country</ContractText>
          <ContractText><strong>Available From:</strong> Immediately</ContractText>
        </ContractSection>
        
        <ContractSection>
          <ContractHeading>CORE SKILLS</ContractHeading>
          <ContractText>• <strong>Frontend:</strong> React, TypeScript, Next.js, HTML5/CSS3</ContractText>
          <ContractText>• <strong>Backend:</strong> Node.js, Express, MongoDB, SQL</ContractText>
          <ContractText>• <strong>Other:</strong> Git, CI/CD, Docker, AWS/Azure</ContractText>
        </ContractSection>
        
        <ContractSection>
          <ContractHeading>PROJECT DELIVERY GUARANTEE</ContractHeading>
          <ContractText>
            I hereby commit to delivering high-quality code that meets industry standards
            and best practices. All projects will be completed on time and within scope, 
            with regular communication throughout the development process.
          </ContractText>
        </ContractSection>
        
        <ContractSection>
          <ContractHeading>PROBLEM-SOLVING APPROACH</ContractHeading>
          <ContractText>
            I analyze each problem methodically, breaking complex issues into manageable parts.
            My approach involves research, planning, implementation, and thorough testing to
            ensure robust solutions.
          </ContractText>
        </ContractSection>
        
        <ContractSection>
          <ContractHeading>GROWTH MINDSET</ContractHeading>
          <ContractText>
            I am committed to continuous learning and staying updated with the latest technologies
            and development practices. I embrace challenges as opportunities for growth and
            constantly seek to expand my knowledge base.
          </ContractText>
        </ContractSection>
        
        <ContractSignature>
          <SignatureLine>Developer Signature</SignatureLine>
          <SignatureLine>Date: {new Date().toLocaleDateString()}</SignatureLine>
        </ContractSignature>
      </ContractPaper>
    </Win95Window>
  );
};

export default ContractWindow; 
import styled from 'styled-components';

// Contract/Paper styled components
export const ContractPaper = styled.div`
  background: #fff;
  color: #000;
  font-family: 'Courier New', monospace;
  padding: 20px;
  border: 1px solid #000;
  margin: 10px;
  height: calc(100% - 20px);
  overflow-y: auto;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2) inset;
`;

export const ContractTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
`;

export const ContractSection = styled.div`
  margin-bottom: 15px;
`;

export const ContractHeading = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  text-decoration: underline;
`;

export const ContractText = styled.p`
  margin: 5px 0;
  line-height: 1.4;
`;

export const ContractSignature = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const SignatureLine = styled.div`
  border-top: 1px solid #000;
  width: 200px;
  padding-top: 5px;
  text-align: center;
`; 
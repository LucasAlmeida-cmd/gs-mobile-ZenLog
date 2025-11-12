import styled from 'styled-components/native';

export const Container = styled.View<{ themeColors: any }>`
  flex: 1;
  background-color: ${(props) => props.themeColors.fundoPadrao};
`;

export const Title = styled.Text<{ themeColors: any }>`
  font-size: 28px;
  font-weight: bold;
  font-family: 'KdamThmorPro';
  color: ${(props) => props.themeColors.verde};
  margin-bottom: 25px;
  text-align: center;
`;

export const LogCard = styled.View<{ themeColors: any }>`
  background-color: ${(props) => props.themeColors.cardBackground};
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props) => props.themeColors.cardBorder};
  margin-bottom: 15px;
  padding: 15px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 6;
`;

export const LogHeader = styled.View<{ themeColors: any }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.themeColors.cardBorder};
`;

export const LogDetails = styled.View`
  margin-bottom: 10px;
`;

export const LogIdentificacao = styled.Text<{ themeColors: any }>`
  font-size: 20px;
  font-weight: bold;
  font-family: 'KdamThmorPro';
  color: ${(props) => props.themeColors.verde};
  margin-right: 10px;
`;

export const LogEmocao = styled.Text<{ themeColors: any }>`
  font-size: 18px;
  font-family: 'KdamThmorPro';
  color: ${(props) => props.themeColors.text};
  text-transform: capitalize;
`;

export const LogDetail = styled.Text<{ themeColors: any }>`
  color: ${(props) => props.themeColors.textSecondary};
  margin-bottom: 4px;
  font-size: 14px;
`;

export const LoadingText = styled.Text<{ themeColors: any }>`
  text-align: center;
  color: ${(props) => props.themeColors.text};
  font-size: 16px;
  margin-top: 20px;
`;

export const EmptyText = styled.Text<{ themeColors: any }>`
  text-align: center;
  color: ${(props) => props.themeColors.textSecondary};
  font-size: 16px;
  margin-top: 20px;
`;

export const RetryText = styled.Text<{ themeColors: any }>`
  color: ${(props) => props.themeColors.verde};
  margin-top: 10px;
  font-size: 14px;
  text-decoration-line: underline;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;

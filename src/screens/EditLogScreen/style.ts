import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.fundoPadrao};
  padding-top: 40px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  input: {
    fontSize: 16,
    
  },
  label: {
    fontSize: 14,
  },
  saveButton: {
    borderRadius: 10,
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
});

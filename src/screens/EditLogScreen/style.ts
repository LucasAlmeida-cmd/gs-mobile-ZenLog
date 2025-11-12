import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding-top: 40px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  input: {
    color: '#ffffff',
  },
  label: {
    color: '#cccccc',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
});

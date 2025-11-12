import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.colors.fundoPadrao,
      padding: 20,
    },
    title: {
      color: theme.colors.verde,
      textAlign: 'center',
      marginVertical: 10,
      fontSize: 22,
      fontWeight: 'bold',
      fontFamily: 'KdamThmorPro',
    },
    input: {
      color: theme.colors.text,
    },
    checkBoxContainer: {
      backgroundColor: 'transparent',
    },
    checkBoxText: {
      color: theme.colors.text,
    },
    button: {
      backgroundColor: theme.colors.verde,
      padding: 12,
      borderRadius: 10,
      marginTop: 10,
    },
  });


export const Container = styled.ScrollView`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.fundoPadrao};
  padding: 20px;
`;

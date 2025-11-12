import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.fundoPadrao,
    padding: 20,
  },
  input: {
    color: '#fff',
    fontFamily: 'KdamThmorPro',
  },
  saveButton: {
    backgroundColor: theme.colors.verde,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
  },
  cancelButton: {
    borderColor: '#929292',
    marginTop: 10,
  },
});

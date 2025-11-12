import styled from 'styled-components/native';

export const makeStyles = (theme: any) => ({
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: theme.colors.verde,
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
  },
  inputTextEnviar: {
    fontFamily: 'KdamThmorPro',
    color: theme.colors.text, 
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
  dateTime: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
});


export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;    
  background-color: ${({ theme }) => theme.colors.fundoPadrao};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'KdamThmorPro';
  font-weight: bold;
  color: ${({ theme }) => theme.colors.verde};
  margin-bottom: 30px;
  text-align: center;
`;

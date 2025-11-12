import React from 'react';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext'; // <── importa o hook do tema
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme(); // <── pega o tema atual e a função para alternar

  if (!user) return null;

  return (
    <Container theme={theme}>
      <HeaderContent>
        <UserInfo>
          <Avatar
            rounded
            title={user.name ? user.name.charAt(0) : 'U'}
            size="medium"
            containerStyle={{ backgroundColor: theme.colors.primary }}
          />
          <TextContainer>
            <WelcomeText theme={theme}>Bem-vindo(a),</WelcomeText>
            <UserName theme={theme}>{user.name}</UserName>
          </TextContainer>
        </UserInfo>

        <Actions>
          {navigation.canGoBack() && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
              <MaterialIcons name="arrow-back" size={28} color={theme.colors.verde} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={toggleTheme}>
            <MaterialIcons
              name={theme.colors.background === '#121212' ? 'wb-sunny' : 'nightlight-round'}
              size={28}
              color={theme.colors.verde}
            />
          </TouchableOpacity>
        </Actions>
      </HeaderContent>

      <View
        style={{
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
          marginVertical: 20,
          marginHorizontal: -16,
          width: 'auto',
        }}
      />
    </Container>
  );
};



const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.fundoPadrao};
  padding: 16px;
  width: 100%;
`;

const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-left: 12px;
`;

const WelcomeText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.verde};
  opacity: 0.7;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.verde};
`;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default Header;

import React from 'react';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import theme from '../styles/theme';
import { View, TouchableOpacity } from 'react-native'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 

export const HeaderContainer = styled.View`
  background-color: ${theme.colors.background};
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

const HomeButton = styled(TouchableOpacity)`
  padding: 8px;
`;

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation(); 

  const handleGoHome = () => {
    navigation.navigate('Home' as never); 
  };

  if (!user) return null;

  return (
    <Container>
      <HeaderContent> 
        <UserInfo>
          <Avatar 
            rounded 
            title={user.name ? user.name.charAt(0) : 'U'}
            size="medium"
            containerStyle={styles.avatar}
          />
          <TextContainer>
            <WelcomeText>Bem-vindo(a),</WelcomeText>
            <UserName>{user.name}</UserName>
          </TextContainer>
        </UserInfo>

        {navigation.canGoBack() && (
            <HomeButton onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={30} color={theme.colors.verde} />
            </HomeButton>
        )}
        

      </HeaderContent>
      
      <View
        style={{
          borderBottomColor: '#FFFFFF',
          borderBottomWidth: 1,
          marginVertical: 20,
          marginHorizontal: -16, 
          width: 'auto', 
        }}
      />
    </Container>
  );
};

const styles = {
  avatar: {
    backgroundColor: theme.colors.primary,
  },
};

const Container = styled.View`
  background-color: ${theme.colors.fundoPadrao};
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
  color: ${theme.colors.verde};
  opacity: 0.7;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.verde};
`;

export default Header;
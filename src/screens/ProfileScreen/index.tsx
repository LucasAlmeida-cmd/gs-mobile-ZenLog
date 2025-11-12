import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext'; 
import Header from '../../components/Header';
import {
  Container,
  Title,
  ProfileCard,
  Name,
  Email,
  RoleBadge,
  RoleText,
} from './style';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<ProfileScreenProps['navigation']>();
  const { theme } = useTheme(); 

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      default:
        return role;
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>{`Meu Perfil`}</Title>

        <ProfileCard theme={theme}>
          <Name theme={theme}>{user?.name}</Name>
          <Email theme={theme}>{user?.email}</Email>
          <RoleBadge role={user?.role || ''} theme={theme}>
            <RoleText theme={theme}>{getRoleText(user?.role || '')}</RoleText>
          </RoleBadge>
        </ProfileCard>

        <Button
          title="Editar Perfil"
          onPress={() => navigation.navigate('UpdateProfile')}
          buttonStyle={{
            backgroundColor: theme.colors.verde,
            borderRadius: 10,
            paddingVertical: 12,
            marginBottom: 12,
          }}
          titleStyle={{ color: theme.colors.text }}
        />

        <Button
          title="Sair"
          onPress={signOut}
          buttonStyle={{
            backgroundColor: theme.colors.error,
            borderRadius: 10,
            paddingVertical: 12,
            marginBottom: 12,
          }}
          titleStyle={{ color: theme.colors.text }}
        />
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;

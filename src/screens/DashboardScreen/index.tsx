import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from 'styled-components/native';

import Header from '../../components/Header';
import { makeStyles, Container, Title } from './styles';

type AdminDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminDashboard'>;
};

const AdminDashboardScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<AdminDashboardScreenProps['navigation']>();
  const theme = useTheme(); 
  const styles = makeStyles(theme);

  return (
    <Container>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Menu Principal</Title>

        <Button
          title="Consultar Logs Diários"
          onPress={() => navigation.navigate('UserManagement')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.inputTextEnviar}
        />

        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.inputTextEnviar}
        />

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

export default AdminDashboardScreen;

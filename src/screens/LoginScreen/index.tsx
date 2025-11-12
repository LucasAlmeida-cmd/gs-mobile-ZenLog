import React, { useState } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { styles, Container, Title, ErrorText } from './styles';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<LoginScreenProps['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signIn({ email, password });
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container>
      <Title>ZenLog</Title>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Enviar"
        onPress={handleLogin}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.inputTextEnviar}
      />

      <Button
        title="Criar conta"
        type="outline"
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={[styles.buttonStyleRegister]}
        titleStyle={[styles.inputTextEnviarRegister]}
      />







    </Container>
  );
};



export default LoginScreen; 

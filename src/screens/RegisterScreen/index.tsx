import React, { useState } from 'react';
import { View, Alert, ToastAndroid, Platform } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { styles, Container, Title, ErrorText } from '../LoginScreen/styles';
import { useAuth } from '../../contexts/AuthContext';



type RegisterScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};


const RegisterScreen: React.FC = () => {

    const navigation = useNavigation<RegisterScreenProps['navigation']>();


    const [nomeUser, setNomeUser] = useState('');
    const [email, setEmail] = useState('');
    const [cpfUser, setCpfUser] = useState('');
    const [dataAniversario, setDataAniversario] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();


    const handleRegister = async () => {
        if (!nomeUser || !email || !cpfUser || !dataAniversario || !password) {
            setError('Preencha todos os campos');
            return;
        }

        try {
            setLoading(true);
            setError('');

            await register({ nomeUser, email, cpfUser, dataAniversario, password });

            // Feedback visual rápido
            if (Platform.OS === 'android') {
                ToastAndroid.show('Conta criada com sucesso!', ToastAndroid.SHORT);
            } else {
                Alert.alert('Sucesso', 'Conta criada com sucesso!');
            }

            // Redireciona para Login
            navigation.navigate('Login');

            // Limpa os campos (opcional)
            setNomeUser('');
            setEmail('');
            setCpfUser('');
            setDataAniversario('');
            setPassword('');

        } catch (err: any) {
            setError(err.message || 'Erro ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <Container>
            <Title>Criar Conta</Title>

            <Input placeholder="Nome completo" value={nomeUser} onChangeText={setNomeUser} containerStyle={styles.input} inputContainerStyle={styles.inputContainer} inputStyle={styles.inputText} />
            <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" containerStyle={styles.input} inputContainerStyle={styles.inputContainer} inputStyle={styles.inputText} />
            <Input placeholder="CPF (000.000.000-00)" value={cpfUser} onChangeText={setCpfUser} containerStyle={styles.input} inputContainerStyle={styles.inputContainer} inputStyle={styles.inputText} />
            <Input placeholder="Data de nascimento (yyyy-MM-dd)" value={dataAniversario} onChangeText={setDataAniversario} containerStyle={styles.input} inputContainerStyle={styles.inputContainer} inputStyle={styles.inputText} />
            <Input placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry containerStyle={styles.input} inputContainerStyle={styles.inputContainer} inputStyle={styles.inputText} />

            {error ? <ErrorText>{error}</ErrorText> : null}

            <Button
                title="Cadastrar"
                onPress={handleRegister}
                loading={loading}
                containerStyle={styles.button as any}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.inputTextEnviar}
            />
        </Container>
    );
};

export default RegisterScreen;
import React, { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';
import { styles } from './style';

type UpdateProfileScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'UpdateProfile'>;
};

const UpdateProfileScreen: React.FC = () => {

    const navigation = useNavigation<UpdateProfileScreenProps['navigation']>();

    const { user, updateUser } = useAuth();
    const [nome, setNome] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [cpfUser, setCpf] = useState(user?.cpfUser || '');
    const [dataAniversario, setDataAniversario] = useState(user?.dataAniversario || '');
    const [password, setPassword] = useState('');


    const handleUpdate = async () => {
        try {
            await updateUser(user?.id, {
                nomeUser: nome,
                email,
                cpfUser,
                dataAniversario,
                password,
            });

            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
            console.error(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Input
                label="Nome"
                value={nome}
                onChangeText={setNome}
                inputStyle={styles.input}
            />

            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                inputStyle={styles.input}
            />

            <Input
                label="CPF"
                value={cpfUser}
                onChangeText={setCpf}
                inputStyle={styles.input}
            />

            <Input placeholder="Data de nascimento (yyyy-MM-dd)" value={dataAniversario} onChangeText={setDataAniversario}
                inputStyle={styles.input} />


            <Input
                label="Nova senha (opcional)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                inputStyle={styles.input}
            />

            <Button
                title="Salvar alterações"
                onPress={handleUpdate}
                buttonStyle={styles.saveButton}
            />

            <Button
                title="Cancelar"
                type="outline"
                onPress={() => navigation.goBack()}
                buttonStyle={styles.cancelButton}
            />
        </ScrollView>
    );
};

export default UpdateProfileScreen;

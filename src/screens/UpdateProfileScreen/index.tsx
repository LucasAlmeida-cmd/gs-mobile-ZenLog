import React, { useState } from 'react';
import { ScrollView, View, Alert, Platform, ToastAndroid } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/Header';

type UpdateProfileScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'UpdateProfile'>;
};

interface FormErrors {
    nomeUser?: string;
    email?: string;
    cpfUser?: string;
    dataAniversario?: string;
    password?: string;
    geral?: string;
}

const UpdateProfileScreen: React.FC = () => {
    const navigation = useNavigation<UpdateProfileScreenProps['navigation']>();
    const { user, updateUser } = useAuth();
    const { theme } = useTheme(); 

    const [nome, setNome] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [cpfUser, setCpf] = useState(user?.cpfUser || '');
    const [dataAniversario, setDataAniversario] = useState(user?.dataAniversario || '');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const validateFields = (): boolean => {
        const newErrors: FormErrors = {};
        if (!nome) newErrors.nomeUser = 'O nome é obrigatório';
        if (!email) newErrors.email = 'O email é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'O email informado é inválido';
        if (!cpfUser) newErrors.cpfUser = 'O CPF é obrigatório';
        else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfUser)) newErrors.cpfUser = 'Formato de CPF inválido (use 000.000.000-00)';
        if (!dataAniversario) newErrors.dataAniversario = 'A data é obrigatória';
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(dataAniversario)) newErrors.dataAniversario = 'Formato de data inválido (use yyyy-MM-dd)';
        if (password && password.length < 6) newErrors.password = 'A nova senha deve ter no mínimo 6 caracteres';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onInputChange = (setter: (text: string) => void, fieldName: keyof FormErrors) => {
        return (text: string) => {
            setter(text);
            if (errors[fieldName]) setErrors(prev => ({ ...prev, [fieldName]: undefined }));
            if (errors.geral) setErrors(prev => ({ ...prev, geral: undefined }));
        };
    };

    const handleUpdate = async () => {
        if (!user?.id) {
            setErrors({ geral: 'Usuário não autenticado. Faça login novamente.' });
            return;
        }
        if (!validateFields()) return;

        setLoading(true);
        setErrors({});
        const updateData: any = { nomeUser: nome, email, cpfUser, dataAniversario };
        if (password) updateData.password = password;

        try {
            await updateUser(user.id, updateData);
            if (Platform.OS === 'android') ToastAndroid.show('Perfil atualizado com sucesso!', ToastAndroid.SHORT);
            else Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            navigation.goBack();
        } catch (error: any) {
            console.error(error);
            setErrors({ geral: error.message || 'Não foi possível atualizar o perfil.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: theme.colors.fundoPadrao }}>
            <Header />

            <Input
                label="Nome"
                value={nome}
                onChangeText={onInputChange(setNome, 'nomeUser')}
                inputStyle={{ color: theme.colors.text, fontFamily: 'KdamThmorPro' }}
                labelStyle={{ color: theme.colors.textSecondary }}
                errorMessage={errors.nomeUser}
                placeholderTextColor={theme.colors.textSecondary}
            />

            <Input
                label="Email"
                value={email}
                onChangeText={onInputChange(setEmail, 'email')}
                keyboardType="email-address"
                autoCapitalize="none"
                inputStyle={{ color: theme.colors.text, fontFamily: 'KdamThmorPro' }}
                labelStyle={{ color: theme.colors.textSecondary }}
                errorMessage={errors.email}
                placeholderTextColor={theme.colors.textSecondary}
            />

            <Input
                label="CPF"
                value={cpfUser}
                onChangeText={onInputChange(setCpf, 'cpfUser')}
                keyboardType="numeric"
                inputStyle={{ color: theme.colors.text, fontFamily: 'KdamThmorPro' }}
                labelStyle={{ color: theme.colors.textSecondary }}
                errorMessage={errors.cpfUser}
                placeholderTextColor={theme.colors.textSecondary}
            />

            <Input
                label="Data de nascimento"
                value={dataAniversario}
                onChangeText={onInputChange(setDataAniversario, 'dataAniversario')}
                placeholder="yyyy-MM-dd"
                inputStyle={{ color: theme.colors.text, fontFamily: 'KdamThmorPro' }}
                labelStyle={{ color: theme.colors.textSecondary }}
                errorMessage={errors.dataAniversario}
                placeholderTextColor={theme.colors.textSecondary}
            />

            <Input
                label="Nova senha (opcional, mín. 6 caracteres)"
                value={password}
                onChangeText={onInputChange(setPassword, 'password')}
                secureTextEntry
                inputStyle={{ color: theme.colors.text, fontFamily: 'KdamThmorPro' }}
                labelStyle={{ color: theme.colors.textSecondary }}
                errorMessage={errors.password}
                placeholderTextColor={theme.colors.textSecondary}
            />

            {errors.geral && <Text style={{ color: theme.colors.error, textAlign: 'center', marginBottom: 10 }}>{errors.geral}</Text>}

            <Button
                title="Salvar alterações"
                onPress={handleUpdate}
                loading={loading}
                buttonStyle={{ backgroundColor: theme.colors.verde, borderRadius: 10, paddingVertical: 12, marginTop: 10 }}
                titleStyle={{ color: theme.colors.text }}
            />

            <Button
                title="Cancelar"
                type="outline"
                onPress={() => navigation.goBack()}
                disabled={loading}
                buttonStyle={{ borderColor: theme.colors.textSecondary, borderRadius: 10, paddingVertical: 12, marginTop: 10 }}
                titleStyle={{ color: theme.colors.text }}
            />
        </ScrollView>
    );
};

export default UpdateProfileScreen;

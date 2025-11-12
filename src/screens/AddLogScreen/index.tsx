import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Input, Button, Text, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { authService } from '../../services/auth';
import Header from '../../components/Header';
import { styles } from './style';

type AddLogScreenNavigation = NativeStackNavigationProp<RootStackParamList, 'AddLog'>;

const AddLogScreen: React.FC = () => {
  const navigation = useNavigation<AddLogScreenNavigation>();

  const [data, setData] = useState('');
  const [emocao, setEmocao] = useState('');
  const [horasSono, setHorasSono] = useState('');
  const [aguaLitros, setAguaLitros] = useState('');
  const [fezExercicio, setFezExercicio] = useState(false);
  const [descansouMente, setDescansouMente] = useState(false);
  const [notas, setNotas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddLog = async () => {
    if (!data || !emocao || !horasSono || !aguaLitros) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos principais.');
      return;
    }

    try {
      setLoading(true);
      await authService.logService.createLog({
        data,
        emocao,
        horasSono: Number(horasSono),
        aguaLitros: Number(aguaLitros),
        fezExercicio,
        descansouMente,
        notas,
      });
      Alert.alert('Sucesso', 'Log adicionado com sucesso!');
      navigation.goBack();
    } catch (err) {
      console.error('Erro ao adicionar log:', err);
      Alert.alert('Erro', 'Não foi possível adicionar o log.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Text style={styles.title}>Novo Log</Text>

      <Input
        placeholder="Data (YYYY-MM-DD)"
        value={data}
        onChangeText={setData}
        inputStyle={styles.input}
        leftIcon={<MaterialIcons name="date-range" size={20} color="#fff" />}
      />

      <Input
        placeholder="Emoção"
        value={emocao}
        onChangeText={setEmocao}
        inputStyle={styles.input}
        leftIcon={<MaterialIcons name="mood" size={20} color="#fff" />}
      />

      <Input
        placeholder="Horas de sono"
        keyboardType="numeric"
        value={horasSono}
        onChangeText={setHorasSono}
        inputStyle={styles.input}
        leftIcon={<MaterialIcons name="bed" size={20} color="#fff" />}
      />

      <Input
        placeholder="Litros de água"
        keyboardType="numeric"
        value={aguaLitros}
        onChangeText={setAguaLitros}
        inputStyle={styles.input}
        leftIcon={<MaterialIcons name="opacity" size={20} color="#fff" />}
      />

      <CheckBox
        title="Fez exercício físico?"
        checked={fezExercicio}
        onPress={() => setFezExercicio(!fezExercicio)}
        containerStyle={styles.checkBoxContainer}
        textStyle={styles.checkBoxText}
      />

      <CheckBox
        title="Descansou a mente?"
        checked={descansouMente}
        onPress={() => setDescansouMente(!descansouMente)}
        containerStyle={styles.checkBoxContainer}
        textStyle={styles.checkBoxText}
      />

      <Input
        placeholder="Notas (opcional)"
        value={notas}
        onChangeText={setNotas}
        inputStyle={styles.input}
        leftIcon={<MaterialIcons name="notes" size={20} color="#fff" />}
      />

      <Button
        title={loading ? 'Salvando...' : 'Salvar Log'}
        onPress={handleAddLog}
        buttonStyle={styles.button}
        disabled={loading}
      />
    </ScrollView>
  );
};

export default AddLogScreen;

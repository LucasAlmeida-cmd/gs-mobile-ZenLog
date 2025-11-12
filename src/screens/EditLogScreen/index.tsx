import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { authService } from '../../services/auth';
import Header from '../../components/Header';
import { styles, Container, Title } from './style';

type EditLogScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditLog'>;

interface RouteParams {
  logId: number;
}

const EditLogScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<EditLogScreenNavigationProp>();
  const { logId } = route.params as RouteParams;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [log, setLog] = useState<any>(null);

 
  useEffect(() => {
    const fetchLog = async () => {
      try {
        const data = await authService.logService.getLogById(logId);
        setLog(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o log.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLog();
  }, [logId]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await authService.logService.updateLog(logId, log);
      Alert.alert('Sucesso', 'Log atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o log.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando log...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Editar Log</Title>

        <Input
          label="Data"
          value={log.data}
          onChangeText={(text) => setLog({ ...log, data: text })}
          placeholder="AAAA-MM-DD"
          inputStyle={styles.input}
          labelStyle={styles.label}
        />

        <Input
          label="Emoção"
          value={log.emocao}
          onChangeText={(text) => setLog({ ...log, emocao: text })}
          placeholder="Como você se sentiu?"
          inputStyle={styles.input}
          labelStyle={styles.label}
        />

        <Input
          label="Horas de Sono"
          keyboardType="numeric"
          value={String(log.horasSono)}
          onChangeText={(text) => setLog({ ...log, horasSono: parseInt(text) || 0 })}
          inputStyle={styles.input}
          labelStyle={styles.label}
        />

        <Input
          label="Litros de Água"
          keyboardType="numeric"
          value={String(log.aguaLitros)}
          onChangeText={(text) => setLog({ ...log, aguaLitros: parseFloat(text) || 0 })}
          inputStyle={styles.input}
          labelStyle={styles.label}
        />

        <Input
          label="Notas"
          value={log.notas}
          onChangeText={(text) => setLog({ ...log, notas: text })}
          placeholder="Adicione observações..."
          inputStyle={styles.input}
          labelStyle={styles.label}
        />

        <Button
          title={saving ? 'Salvando...' : 'Salvar Alterações'}
          onPress={handleUpdate}
          loading={saving}
          buttonStyle={styles.saveButton}
          icon={<MaterialIcons name="save" size={20} color="#fff" style={{ marginRight: 5 }} />}
        />
      </ScrollView>
    </Container>
  );
};

export default EditLogScreen;

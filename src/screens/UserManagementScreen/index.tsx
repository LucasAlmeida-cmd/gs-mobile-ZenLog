import React, { useState, useCallback } from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/Header';
import { authService } from '../../services/auth';
import { useApi } from '../../hooks/useApi';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Container,
  Title,
  LogCard,
  LogHeader,
  LogDetails,
  ButtonContainer,
  LogIdentificacao,
  LogEmocao,
  LogDetail,
  EmptyText,
  LoadingText,
  RetryText,
} from "../UserManagementScreen/style"

type UserManagementScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserManagement'>;
};

interface Log {
  id: number;
  data: string;
  emocao: string;
  horasSono: number;
  aguaLitros: number;
  fezExercicio: boolean;
  descansouMente: boolean;
  notas: string;
  usuarioId: number;
}

const UserManagementScreen: React.FC = () => {
  const navigation = useNavigation<UserManagementScreenProps['navigation']>();
  const { theme } = useTheme();
  const { data: logs, loading, error, execute: refreshLogs } = useApi<Log[]>(authService.logService.getLogs);
  const [deletingLogs, setDeletingLogs] = useState<Record<number, boolean>>({});

  const handleDelete = async (id: number) => {
    setDeletingLogs(prev => ({ ...prev, [id]: true }));
    try {
      await authService.deleteLog(id);
      await refreshLogs();
    } catch (err) {
      console.error("Erro ao deletar log:", err);
    } finally {
      setDeletingLogs(prev => ({ ...prev, [id]: false }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      refreshLogs();
    }, [])
  );

  return (
    <Container themeColors={theme.colors}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Title themeColors={theme.colors}>Meus Logs</Title>

        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <Button
            title="Adicionar Novo Log"
            onPress={() => navigation.navigate('AddLog')}
            buttonStyle={{
              backgroundColor: theme.colors.verde,
              paddingHorizontal: 25,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            icon={<MaterialIcons name="add" size={20} color={theme.colors.white} style={{ marginRight: 8 }} />}
          />
        </View>

        {loading ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <ActivityIndicator size="large" color={theme.colors.verde} />
            <LoadingText themeColors={theme.colors}>Carregando Logs...</LoadingText>
          </View>
        ) : error ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <MaterialIcons name="error" size={40} color={theme.colors.error} />
            <Text style={{ color: theme.colors.error, marginVertical: 10, textAlign: 'center', fontSize: 16 }}>
              Erro ao carregar logs
            </Text>
            <RetryText themeColors={theme.colors} onPress={refreshLogs}>
              Tentar novamente
            </RetryText>
          </View>
        ) : !logs || logs.length === 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 40 }}>
            <MaterialIcons name="inbox" size={40} color={theme.colors.textSecondary} />
            <EmptyText themeColors={theme.colors}>Nenhum log cadastrado</EmptyText>
          </View>
        ) : (
          logs.map((log) => (
            <LogCard key={log.id} themeColors={theme.colors}>
              <LogHeader themeColors={theme.colors}>
                <LogIdentificacao themeColors={theme.colors}>{log.data}</LogIdentificacao>
                <LogEmocao themeColors={theme.colors}>{log.emocao}</LogEmocao>
              </LogHeader>

              <LogDetails>
                <LogDetail themeColors={theme.colors}>💤 Horas de sono: {log.horasSono}</LogDetail>
                <LogDetail themeColors={theme.colors}>💧 Água: {log.aguaLitros}</LogDetail>
                <LogDetail themeColors={theme.colors}>💪 Exercício: {log.fezExercicio ? 'Sim' : 'Não'}</LogDetail>
                <LogDetail themeColors={theme.colors}>🧘 Descanso mental: {log.descansouMente ? 'Sim' : 'Não'}</LogDetail>
                <LogDetail themeColors={theme.colors}>📝 Notas: {log.notas || '*Sem notas*'}</LogDetail>
              </LogDetails>

              <ButtonContainer>
                <Button
                  title={deletingLogs[log.id] ? "" : "Deletar"}
                  onPress={() => handleDelete(log.id)}
                  containerStyle={{ width: '48%' }}
                  buttonStyle={{ backgroundColor: theme.colors.error, paddingVertical: 10, borderRadius: 8 }}
                  titleStyle={{ color: theme.colors.white, fontFamily: 'KdamThmorPro', fontSize: 14 }}
                  disabled={deletingLogs[log.id]}
                  icon={deletingLogs[log.id] ?
                    <ActivityIndicator size="small" color={theme.colors.white} /> :
                    <MaterialIcons name="delete" size={16} color={theme.colors.white} style={{ marginRight: 5 }} />}
                />

                <Button
                  title="Editar"
                  onPress={() => navigation.navigate('EditLog', { logId: log.id })}
                  containerStyle={{ width: '48%' }}
                  buttonStyle={{ backgroundColor: theme.colors.verde, paddingVertical: 10, borderRadius: 8 }}
                  titleStyle={{ color: theme.colors.white, fontFamily: 'KdamThmorPro', fontSize: 14 }}
                  icon={<MaterialIcons name="edit" size={16} color={theme.colors.white} style={{ marginRight: 5 }} />}
                />
              </ButtonContainer>
            </LogCard>
          ))
        )}
      </ScrollView>
    </Container>
  );
};

export default UserManagementScreen;

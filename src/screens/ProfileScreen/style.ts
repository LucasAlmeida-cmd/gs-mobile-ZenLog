import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.fundoPadrao};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  font-family: 'KdamThmorPro';
  color: ${(props) => props.theme.colors.verde};
  margin-bottom: 20px;
  text-align: center;
`;

export const ProfileCard = styled.View`
  background-color: ${(props) => props.theme.colors.fundoPadrao};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
`;

export const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 8px;
`;

export const Email = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 8px;
`;

export const RoleBadge = styled.View<{ role: string }>`
  background-color: ${(props) =>
    props.role === 'admin'
      ? props.theme.colors.white + '20'
      : props.theme.colors.white + '20'};
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const RoleText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.secondary};
`;

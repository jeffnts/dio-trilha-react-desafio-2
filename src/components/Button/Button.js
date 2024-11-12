import React from 'react';
import { ButtonContainer } from './styles';

function Button({ onClick, loading, children, type }) {
  return (
    <ButtonContainer 
      onClick={onClick} 
      loading={loading}
      type={type}
    >
      {!!loading ? 'Carregando...' : children || 'Buscar'}
    </ButtonContainer>
  );
}

export default Button;
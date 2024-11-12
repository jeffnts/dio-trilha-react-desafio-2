import React from 'react';
import { ItemContainer } from './styles';

function ItemRepo({ repo, handleRemoveRepo }) {
  const handleRemove = () => {
    handleRemoveRepo(repo.id);
  };

  return (
    <ItemContainer>
      <h3>{repo.name}</h3>
      <p>{repo.full_name}</p>
      <div>
        <button onClick={() => window.open(repo.html_url, '_blank')} rel="noreferrer">
          Ver repositório
        </button>
        <button onClick={handleRemove} className="remover">
          Remover
        </button>
      </div>
      <hr />
    </ItemContainer>
  );
}

export default ItemRepo;
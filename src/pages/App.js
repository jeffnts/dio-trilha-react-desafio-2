
import { useState, useTransition } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import Toast from '../components/Toast';
import { api } from '../services/api';

import { Container, RepoList } from './styles';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState({ show: false, message: '' });


  const handleSearchRepo = async () => {
    return startTransition(async () => {
      try {
        const { data } = await api.get(`search/repositories`, {
          params: { q: currentRepo }
        });
      
        if (data.items?.length) {
          const newRepos = data.items.filter(
            newRepo => !repos.some(existingRepo => existingRepo.id === newRepo.id)
          );

          if (newRepos.length) {
            setRepos(prev => [...prev, ...newRepos]);
            setCurrentRepo('');
            return;
          }
          setToast({ show: true, message: 'Repositórios já existem na lista' });
        } else {
          setToast({ show: true, message: 'Nenhum repositório encontrado' });
        }
      } catch (error) {
        setToast({ show: true, message: 'Erro ao buscar repositórios' });
      }
    });
  };

  const handleRemoveRepo = (id) => {
    const newRepos = repos.filter(repo => repo.id !== id);
    setRepos(newRepos);
  };

  const handleClearAll = () => {
    setRepos([]);
  };

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <Input 
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearchRepo();
          }
        }} 
        value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}         
      />
      
      <div style={{ display: 'flex', gap: '5px', flexDirection: 'column', width: '100%', alignItems: 'center'  }}>
        <Button loading={!!isPending} onClick={handleSearchRepo}>
          Buscar
        </Button>
        <Button  type='danger' onClick={handleClearAll}>
          Limpar
        </Button>
      </div>

      <RepoList>
        {repos.map(repo => <ItemRepo key={repo.id} handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
      </RepoList>

      <Toast 
        message={toast.message} 
        show={toast.show} 
        onClose={() => setToast({ show: false, message: '' })} 
      />
    </Container>
  );
}

export default App;

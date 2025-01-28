import './home.scss';
import dragonImage from "assets/dragon.svg";
import { useEffect, useState } from "react";
import api from "services/api";
import Button from "components/Button";
import { useNavigate } from 'react-router-dom';
import { Dragon } from "types/dragon"

const Home: React.FC = () => {
    
    const [dragons, setDragons] = useState<Dragon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {

      document.title = 'Listagem de Dragões';

      const loadDragons = async () => {
        await api.get<Dragon[]>("/").then((response) => {
          setDragons(response.data);
        }).catch((error) => {
          console.error("Erro ao carregar dragões:", error);
        }).finally(() => {
          setLoading(false);
        });
      };
      loadDragons();
    }, []);

    const handleRemove = async (id: number | undefined) => {
      try {
        if (id) {
          await api.delete(`/${id}`);
          setDragons(dragons.filter(dragon => dragon.id !== id));
          alert("Dragão removido com sucesso!");
        }
      } catch (error) {
          console.error("Erro ao remover o dragão:", error);
      }
  };

    return (
        <div className="container-home">
          {loading ? (
            <div className="load">Carregando lista de Dragões...</div>
          ) : (
            <>
            <Button theme="btn-register" onClick={(() => navigate('/register'))}>Cadastrar Novo Dragão</Button>
            {dragons.length === 0 ? (
              <h2 className="empty-list">Listagem vazia.</h2>
            ) : (
              <div className="dragon-lists">
                {dragons.map((i) => (
                  <div key={i.id} className="dragon-card">
                    <div className="details">
                      <img src={dragonImage} alt="Avatar do dragão"></img>
                      <h2>{i.name}</h2>
                    </div>
                    <div className="group-buttons">
                      <Button theme="btn-min" onClick={(() => navigate(`/details/${i.id}`))}>Detalhes</Button>
                      <Button theme="btn-min" onClick={(() => navigate(`/change/${i.id}`))}>Alterar</Button>
                      <Button theme="btn-remove" onClick={() => handleRemove(i.id)}>Remover</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </>
          )}
        </div>
    );
};

export default Home;
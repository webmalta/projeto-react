import './home.scss';
import dragonImage from "assets/dragon.svg";
import { useEffect, useState } from "react";
import api from "services/api";
import Button from "components/Button";
import { Link } from 'react-router-dom';
import { Dragon } from "types/dragon"

const Home: React.FC = () => {
    
    const [dragons, setDragons] = useState<Dragon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <div className="container-home">
          {loading ? (
            <div className="load">Carregando lista de Dragões...</div>
          ) : (
            <>
            <Link to={'/register'}>
              <Button theme="btn-register">Cadastrar Novo Dragão</Button>
            </Link>
            <div className="dragon-lists">
              {dragons.map((i) => (
                <div key={i.id} className="dragon-card">
                  <div className="details">
                    <img src={dragonImage} alt="Avatar do dragão"></img>
                    <h2>{i.name}</h2>
                  </div>
                  <div className="group-buttons">
                    <Link to={`/details/${i.id}`}>
                      <Button theme="btn-min">Detalhes</Button>
                    </Link>
                    <Link to={`/change/${i.id}`}>
                      <Button theme="btn-min">Alterar</Button>
                    </Link>
                    <Button theme="btn-remove">Remover</Button>
                  </div>
                </div>
              ))}
            </div>
            </>
          )}
        </div>
    );
};

export default Home;
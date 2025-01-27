import './home.scss';
import dragonImage from "../../assets/dragon.svg";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Button from "components/Button";

interface Dragon {
    id: number;
    createdAt: string;
    name: string;
    type: string;
}

const Home: React.FC = () => {
    
    const [dragons, setDragons] = useState<Dragon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const loadDragons = async () => {
          try {
            const response = await api.get<Dragon[]>("/");
            console.log('response',response);
            setDragons(response.data);
          } catch (error) {
            console.error("Erro ao carregar dragões:", error);
          } finally {
            setLoading(false);
          }
        };
        loadDragons();
      }, []);

    return (
        <div className="container-home">
          {loading ? (
            <div className="load">Carregando lista de Dragões...</div>
          ) : (
            <div className="dragon-lists">
              {dragons.map((i) => (
                <div key={i.id} className="dragon-card">
                  <div className="details">
                    <img src={dragonImage} alt="Avatar do dragão"></img>
                    <h2>{i.name}</h2>
                  </div>
                  <div className="group-buttons">
                    <Button theme="btn-min" onClick={() => console.log('Remover o dragão!')}>Remover</Button>
                    <Button theme="btn-min" onClick={() => console.log('Alterar o dragão!')}>Alterar</Button>
                    <Button theme="btn-min" onClick={() => console.log('Detalhes do dragão!')}>Detalhes</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    );
};

export default Home;
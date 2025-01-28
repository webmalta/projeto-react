import './detalhes.scss';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "services/api";
import { Dragon } from "types/dragon";
import dragonImage from "assets/dragon.svg";
import { Link } from 'react-router-dom';
import Button from "components/Button";

const Detalhes: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dragon, setDragon] = useState<Dragon>({} as Dragon);
    const [loading, setLoading] = useState<boolean>(true);

    const formatarData = (data: string): string => {
      const dateObj = new Date(data);
      return dateObj.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
      });
    };

    useEffect(() => {

        document.title = 'Detalhes do Dragão';
  
        const loadDragon = async () => {
          await api.get<Dragon>(`/${id}`).then((response) => {
            setDragon(response.data);
          }).catch((error) => {
            console.error("Erro ao carregar o dragão", error);
          }).finally(() => {
            setLoading(false);
          })
        };
        loadDragon();
      }, [navigate, id]);

    return (
        <div className="container-details">
          {loading ? (
            <div className="load">Carregando Dragão...</div>
          ) : (
            <div className="dragon-detail">
                <div key={dragon.id}>
                  <div className="detail">
                    <img src={dragonImage} alt="Avatar do dragão"></img>
                    <h2>{dragon.name}</h2>
                  </div>
                  <div className="detail-content">
                    <span>Data de criação: {formatarData(dragon.createdAt)}</span><br />
                    <span>Tipo: {dragon.type}</span>
                    <p>
                      Nulla ut cursus ipsum. Mauris justo metus, sollicitudin in convallis sed, 
                      aliquet eu elit. Etiam tincidunt commodo turpis, ac luctus turpis tempus id. 
                      Aenean ultrices mauris sed commodo posuere. Phasellus cursus, enim eu sollicitudin 
                      ornare, nulla mi lobortis massa, sed bibendum nulla augue vel nibh. 
                      Praesent ut mauris fermentum, pulvinar justo ac, lacinia odio. Curabitur 
                      placerat egestas justo id ornare. Donec cursus turpis non augue pharetra faucibus. 
                      Donec ultricies aliquam arcu, non eleifend augue condimentum sit amet.
                    </p>
                  </div>

                  <div className="group-buttons">
                    <Button theme="btn-max" onClick={(() => navigate("/Home"))}>Voltar</Button>
                  </div>
                </div>
            </div>
          )}
        </div>
    );
};

export default Detalhes;
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Alterar from '../Alterar';
import api from "services/api";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("services/api", () => ({
    get: jest.fn(),
    put: jest.fn()
  }));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" })
}));

describe("Componente Alterar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o estado de carregamento inicialmente", () => {
    render(
      <Router>
        <Alterar />
      </Router>
    );

    expect(screen.getByText("Carregando dados do dragão...")).toBeInTheDocument();
  });

  it("deve carregar e exibir os dados do dragão", async () => {
    const mockDragon = {
      name: "Dragon 1",
      type: "Fire",
      createdAt: new Date().toISOString(),
    };

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDragon });

    render(
      <Router>
        <Alterar />
      </Router>
    );

    await waitFor(() => expect(screen.getByLabelText("Nome")).toHaveValue(mockDragon.name));
    expect(screen.getByLabelText("Tipo")).toHaveValue(mockDragon.type);
  });

  it("deve chamar handleChange quando os campos de entrada forem alterados", async () => {
    const mockDragon = {
      name: "Dragon 1",
      type: "Fire",
      createdAt: new Date().toISOString(),
    };

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDragon });

    render(
      <Router>
        <Alterar />
      </Router>
    );

    await waitFor(() => expect(screen.getByLabelText("Nome")).toHaveValue(mockDragon.name));

    const nameInput = screen.getByLabelText("Nome");
    fireEvent.change(nameInput, { target: { value: "Novo Dragão" } });

    expect(nameInput).toHaveValue("Novo Dragão");
  });

  it("deve chamar salvarAlteracoes ao submeter o formulário", async () => {
    const mockDragon = {
      name: "Dragon 1",
      type: "Fire",
      createdAt: new Date().toISOString(),
    };
  
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDragon });
    (api.put as jest.Mock).mockResolvedValueOnce({});
  
    render(
      <Router>
        <Alterar />
      </Router>
    );
  
    await waitFor(() => expect(screen.getByLabelText("Nome")).toHaveValue(mockDragon.name));
  
    const submitButton = screen.getByRole("button", { name: "Alterar" });
  
    fireEvent.click(submitButton);
  
    await waitFor(() => expect(api.put).toHaveBeenCalledWith("/1", { name: "Dragon 1", type: "Fire" }));
  
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/Home"));
  });

  it("deve navegar para Home ao clicar no botão cancelar", async () => {
    const mockDragon = {
      name: "Dragon 1",
      type: "Fire",
      createdAt: new Date().toISOString(),
    };

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDragon });

    render(
      <Router>
        <Alterar />
      </Router>
    );

    await waitFor(() => expect(screen.getByLabelText("Nome")).toHaveValue(mockDragon.name));

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith("/Home");
  });
});
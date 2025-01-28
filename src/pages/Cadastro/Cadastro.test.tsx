import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Cadastro from "../Cadastro";
import api from "services/api";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("services/api", () => ({
  post: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Componente Cadastro", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o formulário de cadastro", () => {
    render(
      <Router>
        <Cadastro />
      </Router>
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cadastrar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancelar/i })).toBeInTheDocument();
  });

  it("deve permitir que os campos sejam preenchidos", () => {
    render(
      <Router>
        <Cadastro />
      </Router>
    );

    const nameInput = screen.getByLabelText("Nome");
    const typeInput = screen.getByLabelText("Tipo");

    fireEvent.change(nameInput, { target: { value: "Dragon 1" } });
    fireEvent.change(typeInput, { target: { value: "Fire" } });

    expect(nameInput).toHaveValue("Dragon 1");
    expect(typeInput).toHaveValue("Fire");
  });

  it("deve chamar salvarDragao ao submeter o formulário", async () => {
    const mockDragon = {
      name: "Dragon 1",
      type: "Fire",
      createdAt: new Date().toISOString(),
    };
  
    (api.post as jest.Mock).mockResolvedValueOnce({ data: mockDragon });
    
    render(
      <Router>
        <Cadastro />
      </Router>
    );
  
    const nameInput = screen.getByLabelText("Nome");
    const typeInput = screen.getByLabelText("Tipo");
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });
  
    fireEvent.change(nameInput, { target: { value: "Dragon 1" } });
    fireEvent.change(typeInput, { target: { value: "Fire" } });
  
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/", expect.objectContaining({
        name: "Dragon 1",
        type: "Fire",
      }));
  
      expect(mockNavigate).toHaveBeenCalledWith("/Home");
    });
  });

  it("deve navegar para Home ao clicar no botão cancelar", () => {
    render(
      <Router>
        <Cadastro />
      </Router>
    );

    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith("/Home");
  });

  it("deve exibir uma mensagem de erro caso o cadastro falhe", async () => {
    const mockError = new Error("Erro ao criar o dragão.");
  
    console.error = jest.fn();
  
    (api.post as jest.Mock).mockRejectedValueOnce(mockError);
  
    render(
      <Router>
        <Cadastro />
      </Router>
    );
  
    const nameInput = screen.getByLabelText("Nome");
    const typeInput = screen.getByLabelText("Tipo");
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });
  
    fireEvent.change(nameInput, { target: { value: "Dragon 1" } });
    fireEvent.change(typeInput, { target: { value: "Fire" } });
  
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Erro ao criar o dragão:", mockError);
    });
  });
});

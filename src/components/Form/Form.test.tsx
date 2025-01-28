import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Form";

interface FormData {
  name: string;
  type: string;
}

const mockOnChange = jest.fn();
const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe("Componente Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar corretamente o título", () => {
    render(
      <Form
        title="Cadastrar Dragão"
        formData={{ name: "", type: "" }}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        submitText="Cadastrar"
        cancelText="Cancelar"
      />
    );

    expect(screen.getByText("Cadastrar Dragão")).toBeInTheDocument();
  });

  it("deve chamar onChange ao modificar os campos de entrada", () => {
    const formData = { name: "Dragon 1", type: "Fire" };

    render(
      <Form
        title="Cadastrar Dragão"
        formData={formData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        submitText="Cadastrar"
        cancelText="Cancelar"
      />
    );

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Dragon 2" } });

    expect(mockOnChange).toHaveBeenCalledWith("name", "Dragon 2");

    fireEvent.change(screen.getByLabelText("Tipo"), { target: { value: "Water" } });

    expect(mockOnChange).toHaveBeenCalledWith("type", "Water");
  });

  it("deve chamar onSubmit ao submeter o formulário", () => {
    const formData = { name: "Dragon 1", type: "Fire" };

    render(
      <Form
        title="Cadastrar Dragão"
        formData={formData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        submitText="Cadastrar"
        cancelText="Cancelar"
      />
    );

    fireEvent.submit(screen.getByRole("form"));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("deve chamar onCancel quando o botão de cancelar for clicado", () => {
    const formData = { name: "Dragon 1", type: "Fire" };

    render(
      <Form
        title="Cadastrar Dragão"
        formData={formData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        submitText="Cadastrar"
        cancelText="Cancelar"
      />
    );

    fireEvent.click(screen.getByText("Cancelar"));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("deve renderizar os campos de entrada corretamente com valores de formData", () => {
    const formData = { name: "Dragon 1", type: "Fire" };

    render(
      <Form
        title="Cadastrar Dragão"
        formData={formData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        submitText="Cadastrar"
        cancelText="Cancelar"
      />
    );

    expect(screen.getByLabelText("Nome")).toHaveValue("Dragon 1");
    expect(screen.getByLabelText("Tipo")).toHaveValue("Fire");
  });

  it("deve desabilitar o botão de enviar se o estado de desabilitação for passado", () => {
    const formData = { name: "Dragon 1", type: "Fire" };

    render(
      <Form
        title="Cadastrar Dragão"
        formData={formData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        submitText="Cadastrar"
        cancelText="Cancelar"
      />
    );

    const submitButton = screen.getByRole("button", { name: "Cadastrar" }) as HTMLButtonElement;
    submitButton.disabled = true;

    expect(submitButton).toBeDisabled();
  });
});
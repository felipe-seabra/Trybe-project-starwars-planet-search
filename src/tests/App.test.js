import React from "react";
import { screen, waitFor } from "@testing-library/react";
import testData from "../../cypress/mocks/testData";
import renderWithProvider from "./helpers/renderWithProvider";
import { act } from "react-dom/test-utils";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Teste StarWars", () => {
  it("Se a API foi chamada", async () => {
    renderWithProvider(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it("Se existe o input de texto e se filtra", async () => {
    await act(async () => {
      renderWithProvider(<App />);
    });

    const filterText = screen.getByTestId("name-filter");

    expect(filterText).toBeInTheDocument();

    userEvent.type(filterText, "aa");

    expect(
      await screen.findByRole("cell", { name: /alderaan/i })
    ).toBeInTheDocument();
  });

  it("Se existe o botão Filtrar", async () => {
    await act(async () => {
      renderWithProvider(<App />);
    });

    const filterButton = screen.getByTestId("button-filter");

    expect(filterButton).toBeInTheDocument();

    userEvent.click(filterButton);

    expect(await screen.getByText(/endor/i)).toBeInTheDocument();
  });

  it("Se filtrado igual a", async () => {
    await act(async () => {
      renderWithProvider(<App />);
    });

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const filterButton = screen.getByTestId("button-filter");

    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, "orbital_period");
    userEvent.selectOptions(comparisonFilter, "igual a");
    userEvent.type(valueFilter, "341");

    userEvent.click(filterButton);

    expect(await screen.getByText(/dagobah/i)).toBeInTheDocument();
  });

  it("Se filtrado menor que", async () => {
    await act(async () => {
      renderWithProvider(<App />);
    });

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const filterButton = screen.getByTestId("button-filter");

    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, "population");
    userEvent.selectOptions(comparisonFilter, "menor que");
    userEvent.type(valueFilter, "1001");

    userEvent.click(filterButton);

    expect(await screen.getByText(/yavin iv/i)).toBeInTheDocument();
  });

  it("Se filtrado maior que", async () => {
    await act(async () => {
      renderWithProvider(<App />);
    });

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const filterButton = screen.getByTestId("button-filter");

    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, "diameter");
    userEvent.selectOptions(comparisonFilter, "maior que");
    userEvent.type(valueFilter, "117000");

    userEvent.click(filterButton);

    expect(await screen.getByText(/bespin/i)).toBeInTheDocument();
  });

  it("Se todas as colunas foram renderizadas", async () => {
    await act(async () => {
      renderWithProvider(<App />);
    });

    const comumns = screen.getAllByRole("columnheader");

    expect(comumns.length).toBe(13);
  });
});

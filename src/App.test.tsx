import React from 'react';
import { render, screen, fireEvent, act, within } from './app/test.util';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { filedNameAndValue } from './test/test.mockData';
import userEvent from '@testing-library/user-event';
import { FLIGHT_SORT_TYPES } from './mockData';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';


describe('App: Home page', () => {

  test('The app should have a navbar', () => {
    render(<App />);
    const navBar = screen.getByTestId("app-navbar");
    expect(navBar).toBeInTheDocument();
  });

  test('The app nav should have  a heading', () => {
    render(<App />);
    const appHeading = screen.getByText(/cxLoyalty/i);
    expect(appHeading).toBeInTheDocument();
  });

  test('The app should have a tab factory', () => {
    render(<App />);
    const tabFactory = screen.getByTestId("tab-factory");
    expect(tabFactory).toBeInTheDocument();
  });

  test("The app should have Flights as a tab", () => {
    render(<App />);
    const flightsTab = screen.getByText("Flights");
    expect(flightsTab).toBeInTheDocument();
  });

  test("The app should have Cars as a tab", () => {
    render(<App />);
    const carsTab = screen.getByText("Cars");
    expect(carsTab).toBeInTheDocument();
  });

  test("The app should have Hotels as a tab", () => {
    render(<App />);
    const hotelsTab = screen.getByText("Hotels");
    expect(hotelsTab).toBeInTheDocument();
  });

  test("The app should go to flight results page when form is submitted", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    act(() => {
      filedNameAndValue.forEach(({ id, value }) => {
        fireEvent.change(screen.getByTestId(id), {
          target: { value },
        });
      });
    });
    userEvent.click(screen.getByTestId('search-flights'));
    expect(document.location.pathname).toBe("/flights/results");
  });

  test("The app should show flight results", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const sortButtonElement = screen.getByTestId("flight-sort-option");
    const filterButtonElement = screen.getByTestId("flight-filter-option");
    expect(sortButtonElement).toBeInTheDocument();
    expect(filterButtonElement).toBeInTheDocument();
  });

  test("Filter button should redirect on filer page when clicked", () => {
    const history = createMemoryHistory();
    act(() => {
      render(
        <Router history={history}>
          <App />
        </Router>
      );
    });
    userEvent.click(screen.getByTestId("flight-filter-option"));
    expect(document.location.pathname).toBe("/flights/filter")
    const element = screen.getByText(/Filter By/i);
    expect(element).toBeInTheDocument();

    act(() => {
      fireEvent.change(screen.getByTestId("Minimum Price"), {
        target: { value: 10 }
      });
      fireEvent.change(screen.getByTestId("Maximum Price"), {
        target: { value: 165 }
      });
      fireEvent.change(screen.getByTestId("price-slider"), {
        target: { value: 175 }
      })
    });
    userEvent.click(screen.getByTestId("apply-filter"));
    expect(screen.getByTestId("Minimum Price").value).toBe("10");
    expect(screen.getByTestId("Maximum Price").value).toBe("175");
    userEvent.click(screen.getByTestId("reset-filter"));
    expect(screen.getByTestId("Minimum Price").value).toBe("0");
    expect(screen.getByTestId("Maximum Price").value).toBe("0");
  });

});
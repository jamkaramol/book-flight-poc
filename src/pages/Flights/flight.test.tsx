import React from 'react';
import { render, screen, fireEvent, act } from '../../app/test.util';
import userEvent from '@testing-library/user-event';
import FlightTab from './index';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { filedNameAndValue } from '../../test/test.mockData';

describe("Flights tab:", () => {
    test("User should be redirected to search page for the result", async () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <FlightTab />
            </Router>
        );
        act(() => {
            filedNameAndValue.forEach(({ id, value }) => {
                fireEvent.change(screen.getByTestId(id), {
                    target: { value },
                });
            });
        });
        await userEvent.click(screen.getByTestId('search-flights'));
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe("/flights/results");
    });
});
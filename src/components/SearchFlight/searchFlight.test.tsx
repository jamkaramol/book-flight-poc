import React from 'react';
import { render, screen, fireEvent, act } from '../../app/test.util';
import userEvent from '@testing-library/user-event';
import SearchFlight from './index';
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
import {SearchFormFields, filedNameAndValue } from '../../test/test.mockData';

describe('SearchFlight tab :', () => {
    // check for all form filed are present
    SearchFormFields.forEach((item) => {
        test(`Search form should have ${item} field`, () => {
            render(
                <BrowserRouter>
                    <SearchFlight />
                </BrowserRouter>
            );
            const element = screen.getByText(item);
            expect(element).toBeInTheDocument();
        });
    });
    // check all form filed on change call
    filedNameAndValue.forEach(({ id, value }) => {
        test(`${id} Input should reflect the entered value`, async () => {
            render(
                <BrowserRouter>
                    <SearchFlight />
                </BrowserRouter>
            );
            act(() => {
                fireEvent.change(screen.getByTestId(id), {
                    target: { value },
                });
            });
            const element = await screen.findByTestId(id)
            expect(element).toHaveValue(value);
        });
    });


    test("There should be warning if form is not filled and search button is clicked", async () => {
        render(
            <BrowserRouter>
                <SearchFlight />
            </BrowserRouter>
        );
        await userEvent.click(screen.getByTestId('search-flights'));
        const message = await screen.findByText("Please fill the important fields (*)");
        expect(message).toBeInTheDocument();
    });

    test("User should be redirected to search page for the result", async () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <SearchFlight />
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
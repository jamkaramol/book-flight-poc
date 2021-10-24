import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isNavbarEnabled: true,
        isTabEnabled: true
    },
    reducers: {
        showNavbar: state => {
            state.isNavbarEnabled = true;
        },
        hideNavbar: state => {
            state.isNavbarEnabled = false;
        },
        showTabs: state => {
            state.isTabEnabled = true;
        },
        hideTabs: state => {
            state.isTabEnabled = false;
        }
    }
});

export const getFlags = (state: any) => state.app;
export const { showNavbar, hideNavbar, showTabs, hideTabs } = appSlice.actions;

export default appSlice.reducer;
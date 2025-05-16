import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : "auth",
    initialState : {
        auth: null
    },
    reducers : {
        login(state, action){
            state.auth = action.payload
        },

        logout(state){
            state.auth = null
        }
    }
})

export const {login, logout} = authSlice.actions;
export const authReducer = authSlice.reducer
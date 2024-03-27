import {createSlice} from "@reduxjs/toolkit";

const secretInitialState = {
    secretKey: null,
    codePhrase: null,
    ttlSeconds: null,
};

const secretSliceConfig = {
    name: "secret",
    initialState: secretInitialState,
    reducers: {
        setSecretKey(state, action) {
            state.secretKey = action.payload.secretKey;
        },
        setCodePhrase(state, action) {
            state.codePhrase = action.payload.codePhrase;
        },
        setTtlSeconds(state, action) {
            state.ttlSeconds = action.payload.ttlSeconds;
        },
        reset(state) {
            state.secretKey = null;
            state.codePhrase = null;
            state.ttlSeconds = null;
        },
    },
};

const secretSlice = createSlice(secretSliceConfig);
const secretActions = secretSlice.actions;

export default secretSlice;
export {secretActions};
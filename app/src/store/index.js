import { configureStore } from "@reduxjs/toolkit";

import secretSlice from "./secret";

const store = configureStore({
    reducer: {secret: secretSlice.reducer,}
});

export default store;
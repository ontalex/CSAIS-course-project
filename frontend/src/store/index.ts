import { configureStore } from "@reduxjs/toolkit";
import { csaisApi } from "./csais/csais.api";

export const store = configureStore({
    reducer: {
        [csaisApi.reducerPath]: csaisApi.reducer

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(csaisApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
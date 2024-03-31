import { configureStore } from "@reduxjs/toolkit";
import { csaisApi } from "./csais/csais.api";
import { groupSlice } from "./csais/groupData.slice";

export const store = configureStore({
    reducer: {
        [csaisApi.reducerPath]: csaisApi.reducer,
        group: groupSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(csaisApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
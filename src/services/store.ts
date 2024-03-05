import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";

export const store = configureStore({
    reducer: { [productsApi.reducerPath]: productsApi.reducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
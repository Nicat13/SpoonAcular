import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from './Recipe'

export const store = configureStore({
    reducer: {
        recipe: recipeReducer,
    },
})
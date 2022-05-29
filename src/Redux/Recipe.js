import { createSlice } from '@reduxjs/toolkit'


export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        data: null,
    },
    reducers: {
        addRecipe: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { addRecipe } = recipeSlice.actions

export default recipeSlice.reducer
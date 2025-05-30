import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const existing = state.items.find(item => item.name === action.payload.name);
      if (!existing) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity(state, action) {
      const item = state.items.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity = action.payload.amount;
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

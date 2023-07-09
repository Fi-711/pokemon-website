export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.card_id === cartItemToAdd.card_id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.card_id === cartItemToAdd.card_id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.card_id === cartItemToRemove.card_id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.card_id !== cartItemToRemove.card_id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.card_id === cartItemToRemove.card_id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const loadItemToCart = (cartItems, cartItemToAdd) => {

  return [...cartItems, { ...cartItemToAdd }];
};
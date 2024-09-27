export const addItem = (item) => ({
    type: 'ADD_ITEM',
    payload: item
});

export const updateItem = (item) => ({
    type: 'UPDATE_ITEM',
    payload: item
});

export const deleteItem = (id) => ({
    type: 'DELETE_ITEM',
    payload: id
});

export const searchItems = (term) => ({
    type: 'SEARCH_ITEMS',
    payload: term
});

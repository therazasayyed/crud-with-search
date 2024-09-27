import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItem, deleteItem, searchItems } from './redux/actions';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const CrudApp = () => {
    const [newItem, setNewItem] = useState({ id: '', name: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const items = useSelector((state) => state.items);
    const searchTerm = useSelector((state) => state.searchTerm);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleSubmit = () => {
        if (isEditing) {
            dispatch(updateItem(newItem));
            setIsEditing(false);
        } else {
            dispatch(addItem({ ...newItem, id: items.length + 1 }));
        }
        setNewItem({ id: '', name: '', description: '' });
    };

    const handleEdit = (item) => {
        setNewItem(item);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteItem(id));
    };

    const handleSearch = (e) => {
        dispatch(searchItems(e.target.value));
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: 20 }}>
            <TextField
                label="Search"
                variant="outlined"
                onChange={handleSearch}
                fullWidth
                style={{ marginBottom: 20 }}
            />

            <TextField
                name="name"
                label="Name"
                value={newItem.name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                style={{ marginBottom: 10 }}
            />
            <TextField
                name="description"
                label="Description"
                value={newItem.description}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                style={{ marginBottom: 10 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginBottom: 20 }}
            >
                {isEditing ? 'Update Item' : 'Add Item'}
            </Button>

            <List>
                {filteredItems.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText
                            primary={item.name}
                            secondary={item.description}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleEdit(item)}
                            style={{ marginRight: 10 }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default CrudApp;

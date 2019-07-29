# Items

## Actions

---

#### getItems{}: Get the list of all items

#### addItem{item}: Adding an single item

#### deleteItem{item}: Deleting an single item

#### setItemsLoading{}: Set the loading props on table component

---

## Reducers

---

Initial state holds empty data array and loading to be false:

    const initialState = {
      data: [],
      loading: false
    }

---

## Components

---

### Item-Table

Fetching all required data from api to render as a table value with delete functionality

### Item-Modal

Adding an item to the database - first search for ASIN number then if address is valid send gathered information to api to stor ethe value.

const initialState = [
  {
    name: "",
    number: "",
    email: "",
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;
    case "DEL_CONTACT":
      const filterContact = state.filter(
        (contact) => contact.id !== action.payload
      );
      state = filterContact;
      return state;

    default:
      return state;
  }
};

export default contactReducer;

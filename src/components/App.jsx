import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactList from './ContactList/ContactList';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import { setFilter, addContact, deleteContact } from '../redux/contactsSlice';
import css from './App.module.css';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      dispatch(addContact(savedContacts));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const newContact = { id: new Date().getTime().toString(), name, number };
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existingContact) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1 className={css.title}>Phonebook</h1>
      <Form onSubmit={handleAddContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} setFilter={handleFilterChange} />
      {contacts.length === 0 ? (
        <p className={css.message}>There are no contacts in the Phonebook</p>
      ) : (
        <ContactList
          contacts={filteredContacts}
          onClick={handleDeleteContact}
        />
      )}
    </>
  );
};

// const handleAddContact = (name, number) => {
//   const newContact = { id: new Date().getTime().toString(), name, number };
//   dispatch(addContact(newContact));
// };

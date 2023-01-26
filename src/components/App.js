import React, { useState, useEffect } from "react";
import uuid  from "react-uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  const addContactHandler = (contact) =>{
    console.log(contact);
    if(emailChecker(contact)){
      setContacts([...contacts, { id: uuid(), ...contact}]);
    }
  }

  const emailChecker = (tempContact) =>{
      if (contacts.some(contact => tempContact.email === contact.email)){
        setErrorMessage('Email is already exist!');
        return false;
      }
      setErrorMessage('');
      return true;
  };

 const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact)=>{
        return contact.id !== id;
    });

    setContacts(newContactList);
 };



  useEffect(()=>{
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrieveContacts) setContacts(retrieveContacts);
  },[]);

  useEffect(()=>{
    if(contacts.length) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
        <Header />
        <AddContact addContactHandler = { addContactHandler }  errorMessage={errorMessage} />
         
        <ContactList contacts={contacts} getContactId={removeContactHandler}/>

    </div>
  );
}

export default App;

"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { ArrowBack, Add } from "@mui/icons-material";
import ContactForm from "./ContactForm";
import ContactList from "@/components/ContactList";
import ContactDetails from "@/components/ContactDetail";
import EditContact from "@/components/EditContact";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  favorite?: boolean;
}

export default function AddressBook() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [addContact, setAddContact] = useState(false);

  useEffect(() => {
    async function fetchContacts() {
      const response = await fetch("/api/contacts");
      const data = await response.json();
      setContacts(data);
    }
    fetchContacts();
  }, []);

  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact]);
  };

  const handleEditContact = (updatedContact: Contact) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setSelectedContact(null);
    setIsEditing(false);
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
    setSelectedContact(null);
  };

  const handleBack = () => {
    setSelectedContact(null);
    setIsEditing(false);
  };

  return (
    <Box className="py-4 h-full w-full">
      {!isEditing && !addContact && (
        <>
          <Box className="absolute top-4 right-4">
            <button
              className=" bg-blue-500 rounded-full px-3 py-1"
              onClick={() => setAddContact(true)}
            >
              +
            </button>
          </Box>
          {!selectedContact ? (
            <ContactList
              contacts={contacts}
              onSelect={(contact) => setSelectedContact(contact)}
            />
          ) : (
            <ContactDetails
              contact={selectedContact}
              onEdit={() => setIsEditing(true)}
              onDelete={() => console.log("deleted")}
              onCancel={() => setSelectedContact(null)}
            />
          )}
        </>
      )}
      {isEditing && (
        <EditContact
          onSave={() => console.log("click")}
          onCancel={() => setIsEditing(false)}
        />
      )}
      {addContact && (
        <ContactForm
          onCancel={() => setAddContact(false)}
          onAddContact={() => console.log("add new contact")}
        />
      )}
    </Box>
  );
}

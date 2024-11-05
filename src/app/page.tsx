"use client";

import { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  ContactMail,
  Star,
  Group,
  Add,
  Edit,
  Delete,
} from "@mui/icons-material";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  favorite?: boolean;
}

const BookContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "2rem",
});

const Book = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "80%",
  maxWidth: "700px",
  height: "600px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
});

const BookPage = styled(Box)({
  flex: 1,
  padding: "2rem",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export default function AddressBook() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    async function fetchContacts() {
      const response = await fetch("/api/contacts");
      const data = await response.json();
      setContacts(data);
    }

    fetchContacts();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleAddContact = () => {
    const newContactData = {
      id: Date.now().toString(),
      ...newContact,
    };
    setContacts([...contacts, newContactData]);
    setNewContact({ name: "", email: "", phone: "", address: "" });
    handleCloseAddModal();
  };

  const openContactDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailsModalOpen(true);
  };

  const closeContactDetails = () => {
    setSelectedContact(null);
    setIsDetailsModalOpen(false);
  };

  return (
    <BookContainer>
      <Book>
        {/* Book Tabs */}
        <Tabs
          value={currentPage}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          className="border-b border-gray-200"
        >
          <Tab label="Contacts" icon={<ContactMail />} />
          <Tab label="Favorites" icon={<Star />} />
          <Tab label="Groups" icon={<Group />} />
        </Tabs>

        {/* Book Pages */}
        <BookPage>
          {currentPage === 0 && (
            <>
              <Typography variant="h4" className="font-bold mb-4">
                Contacts
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleOpenAddModal}
                className="mb-4"
              >
                Add Contact
              </Button>
              <List>
                {contacts.map((contact) => (
                  <div key={contact.id}>
                    <ListItem onClick={() => openContactDetails(contact)}>
                      <ListItemText
                        primary={contact.name}
                        secondary={contact.email}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
              `
            </>
          )}
          {currentPage === 1 && (
            <>
              <Typography variant="h4" className="font-bold mb-4">
                Favorites
              </Typography>
              <List>
                {contacts
                  .filter((contact) => contact.favorite)
                  .map((contact) => (
                    <div key={contact.id}>
                      <ListItem onClick={() => openContactDetails(contact)}>
                        <ListItemText
                          primary={contact.name}
                          secondary={contact.email}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
              </List>
            </>
          )}
          {currentPage === 2 && (
            <>
              <Typography variant="h4" className="font-bold mb-4">
                Groups
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Feature coming soon!
              </Typography>
            </>
          )}
        </BookPage>

        {/* Add Contact Modal */}
        <Modal
          open={isAddModalOpen}
          onClose={handleCloseAddModal}
          className="flex items-center justify-center"
        >
          <Card className="p-6">
            <Typography variant="h5" className="font-bold mb-4">
              Add New Contact
            </Typography>
            <TextField
              label="Name"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
              variant="outlined"
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Email"
              type="email"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
              variant="outlined"
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Phone"
              value={newContact.phone}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
              variant="outlined"
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Address"
              value={newContact.address}
              onChange={(e) =>
                setNewContact({ ...newContact, address: e.target.value })
              }
              variant="outlined"
              fullWidth
              className="mb-4"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddContact}
              fullWidth
            >
              Save Contact
            </Button>
          </Card>
        </Modal>

        {/* Contact Details Modal */}
        <Modal
          open={isDetailsModalOpen}
          onClose={closeContactDetails}
          className="flex items-center justify-center"
        >
          <Card className="p-6">
            {selectedContact && (
              <>
                <Typography variant="h5" className="font-bold mb-4">
                  {selectedContact.name}
                </Typography>
                <Typography variant="body1">
                  Email: {selectedContact.email}
                </Typography>
                <Typography variant="body1">
                  Phone: {selectedContact.phone || "N/A"}
                </Typography>
                <Typography variant="body1">
                  Address: {selectedContact.address || "N/A"}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={4}>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary">
                    <Delete />
                  </IconButton>
                </Box>
              </>
            )}
          </Card>
        </Modal>
      </Book>
    </BookContainer>
  );
}

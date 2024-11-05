import { List, ListItem, ListItemText } from "@mui/material";

interface Contact {
  name: string;
  email: string;
}

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList({ contacts }: ContactListProps) {
  return (
    <List>
      {contacts.map((contact, index) => (
        <ListItem key={index} divider>
          <ListItemText primary={contact.name} secondary={contact.email} />
        </ListItem>
      ))}
    </List>
  );
}

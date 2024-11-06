import { List, ListItem, ListItemText, Divider } from "@mui/material";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  favorite?: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
}

export default function ContactList({ contacts, onSelect }: ContactListProps) {
  return (
    <List className="mt-10">
      {contacts.map((contact) => (
        <div key={contact.id}>
          <ListItem
            className="cursor-pointer text-gray-500"
            onClick={() => onSelect(contact)}
          >
            <ListItemText primary={contact.name} />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}

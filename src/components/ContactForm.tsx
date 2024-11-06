import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface Contact {
  name: string;
  email: string;
}

interface ContactFormProps {
  onAddContact: (contact: Contact) => void;
  onCancel: () => void;
}

export default function ContactForm({
  onAddContact,
  onCancel,
}: ContactFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onAddContact({ name, email });
      setName("");
      setEmail("");
    }
  };

  return (
    <Box className="h-full flex items-center w-full justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Phone"
          type="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Address"
          type="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Contact
        </Button>
        <Button variant="text" color="secondary" onClick={onCancel} fullWidth>
          Cancel
        </Button>
      </form>
    </Box>
  );
}

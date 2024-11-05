import { useState } from "react";
import { TextField, Button } from "@mui/material";

interface Contact {
  name: string;
  email: string;
}

interface ContactFormProps {
  onAddContact: (contact: Contact) => void;
}

export default function ContactForm({ onAddContact }: ContactFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onAddContact({ name, email });
      setName("");
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Contact
      </Button>
    </form>
  );
}

import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  favorite?: boolean;
}

interface EditContactProps {
  contact?: Contact;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

export default function EditContact({
  contact,
  onSave,
  onCancel,
}: EditContactProps) {
  const [formData, setFormData] = useState<Contact>(
    contact || {
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
      address: "",
    }
  );

  const handleChange = (field: keyof Contact, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Box className="h-full flex items-center w-full justify-center">
      <form onSubmit={() => onSave} className="flex flex-col gap-4 w-full">
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
        />
        <TextField
          label="Phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          fullWidth
        />
        <TextField
          label="Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
        >
          Save
        </Button>
        <Button variant="text" color="secondary" onClick={onCancel} fullWidth>
          Cancel
        </Button>
      </form>
    </Box>
  );
}

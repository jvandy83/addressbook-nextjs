import { Box, Typography, IconButton, Button } from "@mui/material";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
import { VoidFunctionComponent } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  favorite?: boolean;
}

interface ContactDetailsProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export default function ContactDetails({
  contact,
  onEdit,
  onDelete,
  onCancel,
}: ContactDetailsProps) {
  return (
    <Box className="h-full flex justify-center items-center">
      <Button
        className="absolute top-4 left-0"
        startIcon={<ArrowBack />}
        onClick={() => onCancel()}
        color="primary"
      ></Button>
      <Box className="flex items-center justify-betweenh-full">
        <Box>
          <Box className="text-gray-500">
            <Typography variant="h5" className="pb-4 pt-10">
              {contact.name}
            </Typography>
            <Box className="flex">
              <Typography fontWeight="bold" className="pr-1">
                Email:
              </Typography>
              <Typography>{contact.email}</Typography>
            </Box>
            <Box className="flex">
              <Typography fontWeight="bold" className="pr-1">
                Phone:
              </Typography>
              <Typography>{contact.phone || "N/A"}</Typography>
            </Box>
            <Box className="flex">
              <Typography fontWeight="bold" className="pr-1">
                Address:
              </Typography>
              <Typography> {contact.address || "N/A"}</Typography>
            </Box>
          </Box>
          <Box className="pt-10 w-full flex justify-between">
            <IconButton color="primary" onClick={onEdit}>
              <Edit />
            </IconButton>
            <IconButton color="secondary" onClick={() => onDelete(contact.id)}>
              <Delete style={{ color: "red" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

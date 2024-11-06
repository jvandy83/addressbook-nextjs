import AddressBook from "@/components/AddressBook";

import { Box, Typography } from "@mui/material";

export default function AddressBookPage() {
  return (
    <Box className="flex justify-center items-center h-screen">
      <Box bgcolor="white" className="w-1/2 relative px-4 py-2 h-1/2 rounded ">
        <AddressBook />
      </Box>
    </Box>
  );
}

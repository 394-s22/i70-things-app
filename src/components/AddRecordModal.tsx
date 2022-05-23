import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { createReport } from "../utils/airtable";
import { uploadImage } from "../utils/uploadImage";
import { markerToCoords } from "../utils/getCoordinateData";

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddRecordModal: React.FunctionComponent<AddRecordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [direction, setDirection] = useState<"east" | "west">("east");
  const [mileMarker, setMileMarker] = useState(0);
  const [description, setDescription] = useState("");
  const [incidentType, setIncidentType] = useState("lane closure");

  const [submitting, setSubmitting] = useState(false);

  // image handling
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setImageUploaded(true);
    }
  };

  function handleInitializeUpload() {
    setSubmitting(true);
    if (!imageUploaded || !imageFile) {
      completeAddRecord("");
    } else {
      uploadImage(imageFile, completeAddRecord);
    }
  }

  function completeAddRecord(imageUrl: string) {
    let image: string = imageUrl;
    markerToCoords(mileMarker, (coord: number[]) => {
      var lat = coord[0];
      var long = coord[1];
      createReport({
        direction,
        mileMarker,
        description,
        incidentType,
        image,
        lat,
        long,
      })
        .then(() => {
          setSubmitting(false);
          onClose();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "500px",
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 24,
        }}
        borderRadius={2}
        overflow="hidden"
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          sx={{
            backgroundColor: "#20489F",
          }}
          padding={2}
        >
          <Typography variant="h5" fontWeight="bold" color="white">
            Add a new record
          </Typography>
        </Box>

        <Box padding={2}>
          <Box marginBottom={5} display="flex" gap={2}>
            <Button
              variant={direction === "west" ? "contained" : "outlined"}
              onClick={() => {
                setDirection("west");
              }}
            >
              Westbound
            </Button>

            <Button
              variant={direction === "east" ? "contained" : "outlined"}
              onClick={() => {
                setDirection("east");
              }}
            >
              Eastbound
            </Button>
          </Box>

          <Box marginBottom={2}>
            <TextField
              label="Mile Marker"
              required
              type="number"
              value={mileMarker}
              onChange={(e) => setMileMarker(Number(e.target.value))}
            />
          </Box>

          <Box marginBottom={2}>
            <TextField
              label="Description"
              required
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          <Box marginBottom={2}>
            <Select
              labelId="incident-label-type"
              value={incidentType}
              label="Incidient Type"
              onChange={(e) => {
                setIncidentType(e.target.value);
              }}
              fullWidth
            >
              <MenuItem value="lane closure">Lane Closure</MenuItem>
              <MenuItem value="road closure">Road Closure</MenuItem>
            </Select>
          </Box>

          <Box>
            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              onChange={onImageChange}
            />
          </Box>

          <Box marginTop={2}>
            <Button onClick={handleInitializeUpload} variant="contained">
              {submitting ? "Submitting" : "Submit Report"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddRecordModal;

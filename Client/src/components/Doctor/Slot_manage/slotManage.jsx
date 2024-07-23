import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { toast } from "react-hot-toast";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { fetchSlotsAsync } from "../../../ReduxStore/features/slotavailableSlice";
import Api from "../../../API/DoctorCareApi";
import { RRule } from "rrule";

const daysOfWeek = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const AvailableDate = styled("div")(({ theme }) => ({
  backgroundColor: "#76c7c0",
  color: "white",
  borderRadius: "50%",
  padding: "0.5rem",
}));

const AddAvailabilityForm = () => {
  const Doctor = useSelector((state) => state.doctor.doctor);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [docslots,setdocslots]=useState([])
  const dispatch = useDispatch();
  const { slots } = useSelector((state) => state.slots);
  useEffect(() => {
    if (slots) {
      const initialDays = slots.availability;
      const initialStartTime = slots?.availableTimeFrom || null;
      const initialEndTime = slots?.availableTimeTo || null;
      const rule = RRule.fromString(`${initialDays}`);
        const now = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(now.getMonth() + 1);
        const availableslots = rule.between(now, nextMonth);
        setdocslots(availableslots)
      setStartTime(dayjs(initialStartTime));
      setEndTime(dayjs(initialEndTime));
      setIsEdit(false);
    }
  }, [slots]);

  const handleCheckboxChange = (day) => {
    const currentIndex = selectedDays.indexOf(day);
    const newSelectedDays = [...selectedDays];

    if (currentIndex === -1) {
      newSelectedDays.push(day);
    } else {
      newSelectedDays.splice(currentIndex, 1);
    }
    setSelectedDays(newSelectedDays);
  };


  const isAvailableDate = (date, slots) => {
    return slots.some(slot => {
        const slotDate = new Date(slot);
        const slotDay = slotDate.toLocaleString('en-US', { weekday: 'long' }).toUpperCase(); 
        const dateDay = date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase(); 
        return slotDay === dateDay;
    });
};

  const tileClassName = ({ date }) => {
    return isAvailableDate(date, docslots) ? 'available-date' : '';
  };

  const tileContent = ({ date }) => {
    if (isAvailableDate(date, docslots)) {
      return <AvailableDate >{date.getDate()}</AvailableDate>;
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedDays.length === 0) {
        toast.error("Select at least one day");
        return;
      }
      if (!startTime || !endTime) {
        toast.error("Select a time");
        return;
      }
      const rrule = `FREQ=WEEKLY;BYDAY=${selectedDays
        .map((day) => day.slice(0, 2))
        .join(",")}`;
      const response = await Api.post("/doctor/slotupdate", {
        doctorId: Doctor._id,
        availability: rrule,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });
      if (response.status === 200) {
        toast.success("Available Days successfully added");
        dispatch(fetchSlotsAsync(Doctor?._id));
        setIsEdit(false);
      } else {
        toast.error("Something went wrong. Try again!");
      }
    } catch (error) {
      console.error("Error adding availability:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "95vh",
          pb: 8,
        }}
      >
        {!isEdit ? (
        <Box
        sx={{
          width: "60rem",
          backgroundColor: "white",
          maxWidth: "90%",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.6rem",
          display: "flex",
          flexWrap: "wrap",
          p: 3,
          alignItems: "center",
          justifyContent: "space-between",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "45%",
            maxHeight:"45%",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            p: 2,
            backgroundColor: "rgba(240, 240, 240, 0.5)",
            borderRadius: "0.4rem",
          }}
        >
          <Typography
            sx={{
              mt: 2,
              mb: 2,
              color: 'black',
              fontSize: '1.2rem',
              fontWeight: 700,
            }}
          >
            Days and Time You Preferred
          </Typography>
          <Calendar
            tileClassName={({ date }) => tileClassName({ date })}
            tileContent={({ date }) => tileContent({ date })}
          />
        </Box>
      
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "40%",
            maxHeight:"45%",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            p: 2,
            backgroundColor: "rgba(240, 240, 240, 0.5)",
            borderRadius: "0.4rem",
          }}
        >
          <Box sx={{ display: "flex", gap: 3, flexDirection: 'column', alignItems: 'center' }}>
            <Typography
              sx={{
                mt: 0,
                mb: 0,
                color: "black",
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              Time you preferred: {dayjs(startTime).format('hh:mm A')} - {dayjs(endTime).format('hh:mm A')}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "blue",
                "&:hover": {
                  backgroundColor: "#49873D",
                  color: "white",
                },
                transition: "background-color 0.3s ease",
                borderRadius: "0.4rem",
                fontSize: "1rem",
                fontWeight: 600,
                padding: "0.5rem 1.5rem",
              }}
              onClick={() => setIsEdit(true)}
            >
              Update Availability
            </Button>
          </Box>
        </Box>
      </Box>
        ) : (
          <Box
            sx={{
              width: "60rem",
              backgroundColor: "white",
              maxWidth: "90%",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 1.1)",
              borderRadius: "0.6rem",
              display: "flex",
              flexWrap: "wrap",
              p: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                alignSelf: "start",
                color: "#325343",
                fontSize: "1rem",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Set your weekly available days and times. Changes will apply to
              every week from now on. You can update your availability anytime.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexWrap: "wrap",
                gap: "2.5rem",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: "20rem",
                  maxWidth: "90%",
                }}
              >
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: "#325343",
                    fontSize: "0.8rem",
                  }}
                >
                  Schedule your available days
                </Typography>
                <Divider sx={{ width: "80%" }} />
                <Box
                  sx={{
                    display: "grid",
                    p: 1,
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px",
                    width: "30rem",
                    maxWidth: "90%",
                    flexWrap: "wrap",
                  }}
                >
                  {daysOfWeek.map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={selectedDays.includes(day)}
                          onChange={() => handleCheckboxChange(day)}
                          color="success"
                        />
                      }
                      label={day}
                    />
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: "20rem",
                  maxWidth: "90%",
                }}
              >
                <Typography
                  sx={{
                    alignSelf: "flex-start",
                    mb: 1,
                    color: "#325343",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  Schedule your available time
                </Typography>
                <Divider sx={{ width: "80%" }} />
                <Typography
                  sx={{
                    mt: 2,
                    color: "#325343",
                    fontSize: "0.9rem",
                  }}
                >
                  Start time
                </Typography>
                <TimePicker
                  views={["hours", "minutes"]}
                  sx={{ width: "90%" }}
                  value={startTime}
                  onChange={(newTime) => setStartTime(dayjs(newTime))}
                />
                <Typography
                  sx={{
                    mt: 2,
                    color: "#325343",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  End time
                </Typography>
                <TimePicker
                  views={["hours", "minutes"]}
                  sx={{ width: "90%" }}
                  value={endTime}
                  onChange={(newTime) => setEndTime(dayjs(newTime))}
                />
              </Box>
            </Box>
            <Divider sx={{ width: "100%", mb: 2 }} />

            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#325343",
                width: "10rem",
                maxWidth: "90%",
                "&:hover": {
                  backgroundColor: "#49873D",
                  color: "white",
                },
              }}
              onClick={handleSubmit}
            >
              Add Availability
            </Button>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default AddAvailabilityForm;

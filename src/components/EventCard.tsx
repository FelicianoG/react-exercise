import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Event, User } from "../types";
import { users } from "../api";
import { useState } from "react";
import Timer from "./Timer";
import { v4 as uuid } from "uuid";

interface EventCardProps {
  event: Event;
  user: User;
}

export default function EventCard({ event, user }: EventCardProps) {
  const [attendeesArr, setAttendeesArr] = useState(event.attendees);
  const [showAttendees, setShowAttendees] = useState(true);

  function handleUserRSVP(user: User) {
    if (typeof attendeesArr === "object") {
      setAttendeesArr((prev) => {
        if (prev?.includes(user.id)) {
          prev.splice(attendeesArr.indexOf(user.id), 1);
          return [...prev];
        }
        if (prev?.includes(user.id) === false) {
          return [...prev, user.id];
        }
      });
    } else {
      setAttendeesArr([user.id]);
    }
  }
  return (
    <Box sx={{ minWidth: 275, margin: "20px" }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent sx={{ margin: "10px 60px" }}>
            <Typography
              onClick={() => {
                setShowAttendees((prev) => !prev);
              }}
              variant="h5"
              component="div"
            >
              {event.name}
            </Typography>
            <Typography
              onClick={() => {
                setShowAttendees((prev) => !prev);
              }}
              sx={{ mb: 1.5 }}
              color="text.secondary"
            >
              {event.location}
            </Typography>
            <Typography
              onClick={() => {
                setShowAttendees((prev) => !prev);
              }}
              variant="body2"
            >
              {event.date}
              <br />
              <u style={{ cursor: "pointer" }}>Attendees:</u>

              <br />
            </Typography>
            {showAttendees ? (
              <ul style={{ margin: "10px", padding: 0 }}>
                {attendeesArr?.map((id, i) => {
                  return (
                    <li key={uuid()} style={{ listStyleType: "none", margin: 0, padding: 0, fontSize: ".8em" }}>
                      {users.filter((a) => a.id === id)[0].name}
                    </li>
                  );
                })}
              </ul>
            ) : null}
            <Button
              onClick={() => {
                handleUserRSVP(user);
              }}
              sx={{ margin: "10px" }}
              variant="contained"
            >
              RSVP
            </Button>
            <Typography variant="body2">
              <Timer eventDate={event.date} />
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}

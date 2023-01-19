import "./App.css";
import EventCard from "./components/EventCard";
import { events, currentUser } from "./api";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { v4 as uuid } from "uuid";

events.sort((a, b) => a.name.localeCompare(b.name));

function App() {
  const [filteredEvents, setFilteredEvents] = useState(events);
  function filterEvents(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    setFilteredEvents(() => events.filter((element) => element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())));
  }
  return (
    <div className="App">
      <header className="App-header">
        <TextField
          onChange={(e) => filterEvents(e)}
          sx={{ margin: "20px", input: { color: "white" } }}
          label="Filter events"
          color="primary"
          focused
        />

        {filteredEvents.map((evt, i) => {
          return <EventCard key={uuid()} user={currentUser} event={evt}></EventCard>;
        })}
      </header>
    </div>
  );
}

export default App;

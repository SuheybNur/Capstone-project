// Get event data from localStorage
const selectedEvent = JSON.parse(localStorage.getItem("selectedEvent"));

if (selectedEvent) {
    // Populate the event details page
    document.getElementById("event-title").textContent = selectedEvent.title;
    document.getElementById("event-datetime").textContent = new Date(selectedEvent.datetime).toLocaleString();
    document.getElementById("event-location").textContent = selectedEvent.location;
    document.getElementById("event-description").textContent = selectedEvent.description;

    const attendeeList = document.getElementById("attendee-list");
    selectedEvent.attendees.forEach(attendee => {
        const li = document.createElement("li");
        li.textContent = attendee;
        attendeeList.appendChild(li);
    });

    // RSVP Button Functionality
    document.getElementById("rsvp-button").addEventListener("click", function() {
        alert("You have successfully RSVPed!");
    });
} else {
    document.body.innerHTML = "<p>No event selected. <a href='index.html'>Go back</a>.</p>";
}

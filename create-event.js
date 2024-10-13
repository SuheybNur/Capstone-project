// Get the event form element
const eventForm = document.getElementById("event-form");

// Add an event listener to handle form submission
eventForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the input values from the form fields
    const title = document.getElementById("event-title").value;
    const datetime = document.getElementById("event-datetime").value;
    const location = document.getElementById("event-location").value;
    const description = document.getElementById("event-description").value;
    const category = document.getElementById("event-category").value; // Get selected category

    // Create a new event object using the form data
    const newEvent = {
        title,
        datetime,
        location,
        description,
        category, // Include category
        attendees: [] // Initialize an empty attendee list
    };

    // Retrieve existing events from localStorage (or create an empty array)
    const events = JSON.parse(localStorage.getItem("events")) || [];

    // Add the new event to the array
    events.push(newEvent);

    // Save the updated event array back to localStorage
    localStorage.setItem("events", JSON.stringify(events));

    // Redirect back to the homepage after the event is created
    window.location.href = "index.html";
});

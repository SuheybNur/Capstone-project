// Check for existing events in localStorage or create an empty array if none exist
let events = JSON.parse(localStorage.getItem("events")) || [];
let currentEditIndex = null; // Keep track of the index for the event being edited

// Function to display all events
function displayEvents() {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; // Clear the event list

    events.forEach((event, index) => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>${new Date(event.datetime).toLocaleString()}</p>
            <p>${event.location}</p>
            <p>${event.description}</p>
            <button class="edit-button" data-index="${index}">Edit</button>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;

        eventList.appendChild(eventCard);
    });

    // Attach event listeners to "Edit" and "Delete" buttons
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", editEvent);
    });

    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", deleteEvent);
    });
}

// Function to edit an event
function editEvent(e) {
    const index = e.target.getAttribute("data-index"); // Get the event index
    const event = events[index];

    // Show the edit form and populate it with the event details
    currentEditIndex = index;
    document.getElementById("edit-event-title").value = event.title;
    document.getElementById("edit-event-datetime").value = new Date(event.datetime).toISOString().slice(0, 16);
    document.getElementById("edit-event-location").value = event.location;
    document.getElementById("edit-event-description").value = event.description;
    document.getElementById("edit-event-category").value = event.category;

    document.getElementById("edit-form-container").classList.remove("hidden");
}

// Function to handle event form submission
document.getElementById("edit-event-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Update the event with new values
    const updatedEvent = {
        title: document.getElementById("edit-event-title").value,
        datetime: document.getElementById("edit-event-datetime").value,
        location: document.getElementById("edit-event-location").value,
        description: document.getElementById("edit-event-description").value,
        category: document.getElementById("edit-event-category").value
    };

    events[currentEditIndex] = updatedEvent; // Update the event in the array
    localStorage.setItem("events", JSON.stringify(events)); // Save the updated events to localStorage

    // Refresh the list of events and hide the edit form
    displayEvents();
    document.getElementById("edit-form-container").classList.add("hidden");
});

// Function to delete an event
function deleteEvent(e) {
    const index = e.target.getAttribute("data-index"); // Get the event index

    if (confirm("Are you sure you want to delete this event?")) {
        events.splice(index, 1); // Remove the event from the array
        localStorage.setItem("events", JSON.stringify(events)); // Save the updated events to localStorage
        displayEvents(); // Refresh the list of events
    }
}

// Event listener for canceling the edit operation
document.getElementById("cancel-edit").addEventListener("click", function () {
    document.getElementById("edit-form-container").classList.add("hidden"); // Hide the edit form
});

// Initial call to display events when the page loads
displayEvents();

// Variables to track time
var startTime, currentTime, breakTimer, elapsedTime = 0;
var timerInterval;
var breakCount = 1;

// Function to start the timer
function startTimer() {
    // Calculate the start time based on the elapsed time
    startTime = Date.now() - elapsedTime;

    // Update the timer every 10 milliseconds
    timerInterval = setInterval(updateTimer, 10);

    // Disable the start button and enable the stop and reset buttons
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
    document.getElementById("reset").disabled = false;
    // document.getElementById("break").disabled = false;
}

// Function to stop the timer
function stopTimer() {
    // Clear the timer interval to stop updating the timer
    clearInterval(timerInterval);

    // Enable the start button and disable the stop button
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    // document.getElementById("break").disabled = true;
}

// Function to reset the timer
function resetTimer() {
    // Clear the timer interval
    clearInterval(timerInterval);

    // Reset the elapsed time to 0
    elapsedTime = 0;

    // Update the displayed time to "00:00:00"
    document.getElementById("default_time").textContent = "00:00:00";

    // Enable the start button and disable the stop and reset buttons
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("reset").disabled = true;
    // document.getElementById("break").disabled = false;
}

// Function to record a break point
function recordBreakPoint() {
    if (timerInterval) {
        // Get the current time
        currentTime = Date.now();

        // Calculate the elapsed time
        elapsedTime = currentTime - startTime;

        // Create a new Date object based on the elapsed time
        var time = new Date(elapsedTime);

        // Extract hours, minutes, seconds, and milliseconds from the time object
        var hours = time.getUTCHours().toString().padStart(2, '0');
        var minutes = time.getUTCMinutes().toString().padStart(2, '0');
        var seconds = time.getUTCSeconds().toString().padStart(2, '0');
        var milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');

        // Create a new list item with the recorded break point time
        var breakPointItem = document.createElement("li");
        breakPointItem.textContent = "Break " + breakCount + ": " + hours + ":" + minutes + ":" + seconds + ":" + milliseconds;

        // Append the break point to the list
        document.getElementById("break_point").getElementsByTagName("ol")[0].appendChild(breakPointItem);

        // Increment the break count
        breakCount++;
    }
}



// Function to update the timer display
function updateTimer() {
    // Get the current time
    currentTime = Date.now();

    // Calculate the elapsed time
    elapsedTime = currentTime - startTime;

    // Create a new Date object based on the elapsed time
    var time = new Date(elapsedTime);

    // Extract hours, minutes, seconds, and milliseconds from the time object
    var hours = time.getUTCHours().toString().padStart(2, '0');
    var minutes = time.getUTCMinutes().toString().padStart(2, '0');
    var seconds = time.getUTCSeconds().toString().padStart(2, '0');
    var milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');

    // Update the displayed time with the formatted hours, minutes, seconds, and milliseconds
    document.getElementById("default_time").textContent = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

// Function to reset the break points
function resetBreakPoints() {
    // Clear the content of the "break_point" div
    document.getElementById("break_point").getElementsByTagName("ol")[0].innerHTML = "";
    
    // Reset the break count
    breakCount = 1;
}




// Event listeners for the buttons
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("break").addEventListener("click", recordBreakPoint);
document.getElementById("rebreak").addEventListener("click", resetBreakPoints);
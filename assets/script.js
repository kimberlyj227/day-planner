// ?create time blocks
// ?display current day
// time blocks class to indicate past, present future
// click save icon saves notes to local storage
// get items previously saved items from local storage to display in time blocks

// * variables
//header
var date = moment().format("LLLL"); // displays current day and time

// body
var timeBlockDiv = $("#timeBlock"); // where time divs will go

// time variables
var currentHour = moment().hour(); // get time 24hr
var hour24 = moment().hour("H");
var hour12 = moment().hour("h");



// * functions

// ---- TIME/DATE FUNCTIONS -----

//displays date in header
function displayDate() { // * working
    $("#currentDay").text(date);
}

// changes 24 hr format to 12 hr format
function changeTo12hr(hr) { // * working
    var ampm = "";
    var time = 0;

    if (hr > 12) {
        time = hr - 12;
        ampm = "PM";
    } else {
        time = hr
        ampm = "AM";
    }
    return (`${time}:00 ${ampm}`);
}


function determineTimeTense(hr) {

    if (hr < hour24) {
        $("textarea").addClass("past");
    }
    else if (hr > currentHour) {
        $("textarea").addClass("future");
    } 
    else  {
        $("textarea").addClass("present")
    }
}

// creates time blocks
function createTimeBlocks() {

    for (var i=9; i <=17; i++) {
        // changeToAmPm(hours[i]);
        
        displayTime = changeTo12hr(i);

        
        timeBlockDiv.append("<div class='row time-block'><div class='hour col-md-2'>" + displayTime +"</div>" + "<textarea class = 'col-md-8' value = '"  + i + "'></textarea>" + "<div class= 'saveBtn col-md-2'> <i class= 'far fa-save'> </i> </div> </div>");

        determineTimeTense(i);

    }  

}

// ---- EVENT FUNCTIONS -----
function createEvent() {
   
}

function saveEvent() {
    
    // localStorage; 
}

function getEvent() {

}


// * call functions

// display date
displayDate();
createTimeBlocks();
// * click events

// save event
$(".saveBtn").on("click", saveEvent());


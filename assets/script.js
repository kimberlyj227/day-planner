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
var time = 0; //use in changeTo12hr
var displayTime = 0; // use in createTimeBlocks




// event variables
eventArr = [];




// * functions
// on load 

function onLoad() {
    displayDate();
    createTimeBlocks();

    // getEvents();
}

// ---- TIME/DATE FUNCTIONS -----

//displays date in header
function displayDate() { // * working
    $("#currentDay").text(date);
}

// changes 24 hr format to 12 hr format
function changeTo12hr(hr) { // * working
    var ampm = "";

    if (hr > 12) {
        time = hr - 12;
        ampm = "PM";
    } else if (hr === 12) {
        time = hr;
        ampm = "PM";
    } else {
        time = hr
        ampm = "AM";
    }
    return (`${time}:00 ${ampm}`);
}

// determines past, present, future
// function changeTimeClass(hr) { //
    
//     $("textarea").each(function(hr) { 
//         if (hr < currentHour) {
//             $("textarea").addClass("past");
//         } else if (hr > currentHour) {
//             $("textarea").addClass("future");
//         } else {
//             $("textarea").addClass("present")
//         }
//     });
// }


// creates time blocks
function createTimeBlocks() { // * working

    for (var i = 9; i <= 17; i++) {
        
        displayTime = changeTo12hr(i);

        timeBlockDiv.append("<div class='row time-block'> <div class='hour col-md-2'>" + displayTime + "</div>" + "<textarea class = 'col-md-9' data-index = '" + i + "'> </textarea>" + "<div class= 'saveBtn col-md-1'> <i class= 'far fa-save fa-lg'> </i> </div> </div>");

        $("textarea").each(function(i) { 
            if (i < currentHour) {
                $("textarea").addClass("past");
            } else if (i > currentHour) {
                $("textarea").addClass("future");
            } else {
                $("textarea").addClass("present")
            }
        });
    }
}

// ---- EVENT FUNCTIONS -----

//! ahhh
function saveEvent() {
    

    newEvent = {
        eventTime: $(".hour").val(),
        eventDetails: $("textarea").text()
    }

    eventArr.push(newEvent);
    localStorage.setItem("planEvent", JSON.stringify(eventArr));

}

function getEvents() {
    eventArr = JSON.parse(localStorage.getItem("planEvent") || []);
}


// * call functions
onLoad();


// * click events

// save event
$(".saveBtn").click(function () {

    saveEvent();
});
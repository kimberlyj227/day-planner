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
var currentHour = moment().hour("H"); // get time 24hr
var time = 0;
var displayTime=0;

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
    } else {
        time = hr
        ampm = "AM";
    }
    return (`${time}:00 ${ampm}`);
}

// determines past, present, future
function determineTimeTense(hr) { // * working

    if (hr < currentHour) {
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
function createTimeBlocks() { // * working

    for (var i=9; i <=17; i++) {
        
        displayTime = changeTo12hr(i);

        timeBlockDiv.append("<div class='row time-block'><div data-index='"+ i + "' class='hour col-md-2'>" + displayTime +"</div>" + "<textarea id = 'event' class = 'col-md-8'></textarea>" + "<div class= 'saveBtn col-md-2'> <i class= 'far fa-save'> </i> </div> </div>");

        determineTimeTense(i);

    }  

}

// ---- EVENT FUNCTIONS -----

//! ahhh
function saveEvent() {
    var text = $("textarea#event").val();
   console.log(text)

    newEvent = {
       eventTime: $(".hour").text(),
       eventDetails: text
   }

   eventArr.push(newEvent);
   localStorage.setItem("event", JSON.stringify(eventArr));

}

function getEvents() {
    eventArr = JSON.parse(localStorage.getItem("event") || []);
}


// * call functions
onLoad();


// * click events

// save event
$(".saveBtn").click(function() {
    
    saveEvent();
});


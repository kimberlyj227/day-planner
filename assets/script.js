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
// when the page loads

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
function changeTimeClass() {  // * working
   
    $.each($(".time-block"), function(index, value) {
        var hr = $(value).attr("data-time");
        if ( hr < currentHour) {
            $(this).find("textarea").addClass("past").attr("disabled", "disabled");
            $(this).find(".saveBtn").addClass('disabled').attr("disabled", true);
        } else if (hr > currentHour) {
            $(this).find("textarea").addClass("future");
        } else {
            $(this).find("textarea").addClass("present");
        }
    })
    
}
// creates time blocks
function createTimeBlocks() { // * working
   
    for (var i = 9; i <= 17; i++) {
        
        displayTime = changeTo12hr(i);
        
        timeBlockDiv.append(
            
            `<div class='row time-block' data-time = ${i} > 
            
                <div class='hour col-md-2'> ${displayTime}  </div> 
            
                <textarea class = 'col-md-9 description'> </textarea> 
        
                <div class= 'saveBtn col-md-1'> 
                    <i class= 'far fa-save fa-lg'> </i>
                    </div> 
            
            </div>`);

        changeTimeClass();
    }
}

// ---- EVENT FUNCTIONS -----


function getEvents() {
   localStorage.getItem("eventDetails");
   localStorage.getItem("eventTime");
}

function displayEvents() {
    
}


// * call functions
onLoad();


// * click events

// save event
$(".saveBtn").on("click", function () {
    
    var description = $(this).siblings("textarea").val();
    var eventTime = $(this).siblings(".hour").text();
    localStorage.setItem("eventDetails", description);
    localStorage.setItem("eventTime", eventTime);
    
});
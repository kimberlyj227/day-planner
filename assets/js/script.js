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
var eventDetails = "";
var eventTime = "";
var eventArr = [];

// * functions
// when the page loads

function onLoad() {
    getEvents();
    displayDate();
    createTimeBlocks();
    displayEvents();


}

// ---- TIME/DATE FUNCTIONS -----
//reloads the page every 15 minutes
function setTimer() {
    setInterval(onLoad, 900000);
}
//displays date in header
function displayDate() { 
    $("#currentDay").text(date);
}

// changes 24 hr format to 12 hr format
function changeTo12hr(hr) { 
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
function changeTimeClass() { 

    $.each($(".time-block"), function (txArea, value) {
        var hr = $(value).attr("data-time");
        var txArea = $(this).find("textarea")
        if (hr < currentHour) {
            txArea.addClass("past") 
        } else if (hr > currentHour) {
            txArea.addClass("future");
        } else {
            txArea.addClass("present");
        }
    })

}
// creates time blocks
function createTimeBlocks() { 

    for (var i = 9; i <= 17; i++) {

        displayTime = changeTo12hr(i);

        timeBlockDiv.append(

            `<div class='row time-block' data-time ='${i}'> 
            
                <div class='hour col-md-2'>${displayTime}</div> 
            
                <textarea class = 'col-md-9 eventDetails'></textarea> 
        
                <div class= 'saveBtn col-md-1 '> 
                    <i class= 'far fa-save fa-lg'> </i>
                    </div> 
            
            </div>`);

        changeTimeClass();
    }
}

// ---- LOCAL STORAGE FUNCTIONS -----

function saveEvents() {
    newEvent = {
        eventTime: eventTime,
        eventDetails: eventDetails
    }
    eventArr.push(newEvent);
    localStorage.setItem("plannerDetails", JSON.stringify(eventArr))
}

function getEvents() {
    eventArr = JSON.parse(localStorage.getItem("plannerDetails")) || [];
}

function displayEvents() {
    for (var i = 0; i < eventArr.length; i++) {
        var timeIndex = eventArr[i].eventTime;
        var event = eventArr[i].eventDetails
        // var targetDiv = $("textarea")[i];

        switch (timeIndex) {
            case "9:00 AM":
                $(".row").find($("textarea")[0]).text(event);
                // console.log($("textarea").text(event))
                break;

            case "10:00 AM":
                $(".row").find($("textarea")[1]).text(event);
                break;

            case "11:00 AM":
                $(".row").find($("textarea")[2]).text(event);
                break;

            case "12:00 PM":
                $(".row").find($("textarea")[3]).text(event);
                break;

            case "1:00 PM":
                $(".row").find($("textarea")[4]).text(event);
                break;

            case "2:00 PM":
                $(".row").find($("textarea")[5]).text(event);
                break;

            case "3:00 PM":
                $(".row").find($("textarea")[6]).text(event);
                break;

            case "4:00 PM":
                $(".row").find($("textarea")[7]).text(event);
                break;

            case "5:00 PM":
                $(".row").find($("textarea")[8]).text(event);
                break;                
        }

    }
}

function clearEvents() {
    if (time = moment().endOf("day"));
    localStorage.clear();
}


// * call functions
onLoad();


// * click events
$(".saveBtn").on("click", function (event) {
    event.preventDefault();

    eventDetails = $(this).siblings("textarea").val().trim();
    eventTime = $(this).siblings(".hour").text().trim();

    saveEvents();
    console.log(eventArr)
});
//Since every example given had a class: I created one. Not really sure if it is an
//effective way to do this, but I learn by following for a good long while, so when
//in Rome...

class DailyRecord {
    constructor(date, time, bloodPressure, bloodSugar) {
        this.date = date;
        this.time = time;
        this.bloodPressure = bloodPressure;
        this.bloodSugar = bloodSugar;
    }
}

//create an empty array to push entries too when created.
let entries = [];

//pulling the values from the input fields to be able to send them to the array, to 
//be used in the DOM, so they can then be added to the table and displayed.
$(document).ready(function() {
    $("#add").click(function() {
        let date = $("#new-entry-date").val();
        let time = $("#new-entry-time").val();
        let bloodPressure = $("#blood-pressure").val();
        let bloodSugar = $("#blood-sugar").val();

        entries.push(new DailyRecord(date, time, bloodPressure, bloodSugar));
        drawDOM();
        clearInputFields();
    });
});

//The reason for more than one mental breakdown this week. I cannot tell you how many
//times I started over and rewrote my code this week trying to make things work. 
//The third complete start over, I went a bit heavy on the youtube tutorials and ended
//up going an entirely different direction than our own videos. It got the job done,
//even if it was at the last minute again! The only way to explain the DOM is it makes
//it play nice with its HTML counterpart so the entries are useful.
function drawDOM() {
    let entryDiv = $("#entries");
    entryDiv.empty();

    if (entries.length > 0) {
        let table = createEntryTable();
        entryDiv.append(table);
    }
}

/* Ah, the table...along with the drawDOM...this gave me anxiety all week. I wrote the
whole kit-and-kaboodle three times, this section I probably rewrote at least seven.
I totally lost track of my own variable and element names. It was a nightmare every
time I tried to get the page to create the table and nothing happened. None of this 
remotely looks like our videos, I baby stepped my way through it and am still wrapping
my head around how this styling works...but IT WORKS! Nouph said! LOL*/

function createEntryTable() {
    let table = $("<table>").addClass("table table-striped table-light");
    let thead = $("<thead>").appendTo(table);
    let tbody = $("<tbody>").appendTo(table);

    let headerRow = $("<tr>").appendTo(thead);
    $("<th>").text("Date").appendTo(headerRow);
    $("<th>").text("Time").appendTo(headerRow);
    $("<th>").text("Blood Pressure").appendTo(headerRow);
    $("<th>").text("Blood Sugar").appendTo(headerRow);
    $("<th>").text("Action").appendTo(headerRow);

/*While struggling through trying to figure all this out, this part of the table
is responsible for actually creating the new rows when info is added, with the option to 
delete if it needs to be. I had a couple tries that I created a whole new table each 
time I added...so thank you to the youtube tutor that reminded me I could loop a portion
to just add the one row instead. Still mad I forgot this entirely when I did my first 
start over.*/

    for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];
        let dataRow = $("<tr>").appendTo(tbody);
        $("<td>").text(entry.date).appendTo(dataRow);
        $("<td>").text(entry.time).appendTo(dataRow);
        $("<td>").text(entry.bloodPressure).appendTo(dataRow);
        $("<td>").text(entry.bloodSugar).appendTo(dataRow);
        let deleteButton = $("<button>").addClass("btn btn-danger btn-sm").text("Delete").appendTo($("<td>").appendTo(dataRow));
        deleteButton.click(function() {
            entries.splice(i, 1);
            drawDOM();
        });
    }

    return table;
}

/* Finally, we come upon the "clear the form" portion of my code. The way I wanted
to write it...and the way I REALLY thought would work...didn't. So I stole someone 
elses idea and adapted it for my values. At least reading it, it seems similar to my
version, so not mad...just very frustrated that I still don't understand why mine won't 
work.*/

function clearInputFields() {
    $("#new-entry-date").val("");
    $("#new-entry-time").val("");
    $("#blood-pressure").val("");
    $("#blood-sugar").val("");
}

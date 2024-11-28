
//Written by Angel Chikumbirike
// angelchikumbirike@gmail.com

$(document).ready(function () {
     // Add a custom validation method to check if start value is less than or equal to the end value
     $.validator.addMethod(
        "startBeforeEnd",
        function (value, element, params) {
            const startValue = parseInt($(params[0]).val());
            const endValue = parseInt($(params[1]).val());

            // If either field is empty, skip this validation
            if (isNaN(startValue) || isNaN(endValue)) {
                return true;
            }
            return startValue <= endValue;
        },
        "Starting number should not exceed the ending number." // Default error message
    );
    /**
     * Configure validation rules and messages using jQuery Validation Plugin.
     */
    $("#multiplication-form").validate({
        rules: {
            startHoriz: {
                required: true,
                number: true,
                range: [-50, 50],
                startBeforeEnd: ["#start-horiz", "#end-horiz"]
            },
            endHoriz: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            startVert: {
                required: true,
                number: true,
                range: [-50, 50],
                startBeforeEnd: ["#start-vert", "#end-vert"]
            },
            endVert: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            startHoriz: {
                required: "Starting number (horizontal) is required.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50.",
                startBeforeEnd: "Starting number (horizontal) should not exceed the ending number."
            },
            endHoriz: {
                required: "Ending number (horizontal) is required.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            },
            startVert: {
                required: "Starting number (vertical) is required.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50.",
                startBeforeEnd: "Starting number (vertical) should not exceed the ending number."
            },
            endVert: {
                required: "Ending number (vertical) is required.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            }
        },
        errorPlacement: function (error, element) {
            error.addClass("input-error"); // Add styling class
            error.insertAfter(element); // Place error directly after the field
        },
        invalidHandler: function (event, validator) {
            // Show a general error message at the bottom if validation fails
            if (validator.numberOfInvalids() > 0) {
                displayError("Please correct the highlighted errors.");
            } else {
                $("#error-message").hide(); // Hide error message if no invalid fields
            }
        },
        submitHandler: function (form) {
            clearOutput();

            const errors = [];
            const startHoriz = parseInt($("#start-horiz").val());
            const endHoriz = parseInt($("#end-horiz").val());
            const startVert = parseInt($("#start-vert").val());
            const endVert = parseInt($("#end-vert").val());            
            
             // Clear the general error message if no custom validation errors exist
             $("#error-message").hide();

            // Generate and display the multiplication table
            const table = generateMultiplicationTable(
                startHoriz,
                endHoriz,
                startVert,
                endVert
            );
            $("#table-container").empty().append(table).show();
        },
        // Trigger validation on hover out (blur)
        onfocusout: function (element) {
            $(element).valid(); // Validate the field when it loses focus
        }
    });
});

/**
 * Utility function to clear all previous outputs and error messages.
 */
function clearOutput() {
    $("#error-message").text("").hide(); // Hide the error message
    $("#table-container").empty().hide();
    $(".error-message").remove(); // Remove all dynamically added error containers
    $(".error").removeClass("error"); // Remove error highlights from inputs
}

/**
 * Utility function to display a general error message.
 */
function displayError(message) {
    $("#error-message").text(message).show(); // Display the error message
}

/**
 * Highlight input fields with errors and append error messages.
 */
function highlightInput(field, message) {
    const input = $(field);
    input.addClass("error"); // Add error class to the field
    const errorContainer = $("<div>").addClass("error-message").text(message);
    input.parent().append(errorContainer); // Append error message below the input
}

/**
 * Generate a multiplication table for the given range of values.
 */
function generateMultiplicationTable(startHoriz, endHoriz, startVert, endVert) {
    const table = $("<table>");
    const thead = $("<thead>").appendTo(table);
    const tbody = $("<tbody>").appendTo(table);

    const headerRow = $("<tr>").appendTo(thead);
    headerRow.append("<th></th>");
    for (let h = startHoriz; h <= endHoriz; h++) {
        headerRow.append(`<th>${h}</th>`);
    }

    for (let v = startVert; v <= endVert; v++) {
        const row = $("<tr>").appendTo(tbody);
        row.append(`<th>${v}</th>`);
        for (let h = startHoriz; h <= endHoriz; h++) {
            row.append(`<td>${v * h}</td>`);
        }
    }

    return table;
}

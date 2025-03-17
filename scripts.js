$(document).ready(function () {
  
    // Function to update schedule values
    function updateScheduleValues() {
      let checkInDate = moment($("#check-in").val(), "YYYY-MM-DD", true);
      let checkOutDate = moment($("#check-out").val(), "YYYY-MM-DD", true);
      let adults = parseInt($("#adult-select").val()) || 1;
      let costPerAdult = 150;
  
      // Check if both dates are valid
      if (checkInDate.isValid() && checkOutDate.isValid()) {
          let days = checkOutDate.diff(checkInDate, 'days'); // Calculate days difference
          let totalCost = days * adults * costPerAdult;
  
          // Update values
          $("#days").val(days);
          $("#cost").val(totalCost);
      } else {
          $("#days").val("Invalid range");
          $("#cost").val("0");
      }
  }  
    $("#check-in, #check-out, #adult-select").on("input change", updateScheduleValues);
  });
  
  // Function to reset form 
  function resetButton() {
      const form = document.getElementById("bookingForm");
      form.reset();
  
      toastr.info("form succesfully reset")
  };
  
  // Function to submit form
  function submitButton() {
    let valid = true; 
    let entries = ["username", "first-name", "last-name", "phone-number", "fax", "email"];
    let cost = $("#cost");
   
    entries.forEach(field => {
      let input = $("#" + field); 
      let required = $("#required");
      required.removeClass("has-error");
  
      if(input.val().trim() === ""){  // Check for empty value
        required.addClass("has-error");
        // let formatName = formatFieldName(field);
        toastr.error(field + " is required");
        valid = false; 
      }
    });
    
    if(cost.val().trim() === ""){
      toastr.error("No cost was calculated")
      valid = false;
    } else if(cost.val() < 0){
      toastr.error("Cost is negative")
      valid = false; 
    }
    
    if(valid){ 
      toastr.success("Booking form successfully submitted!");
    }
  }
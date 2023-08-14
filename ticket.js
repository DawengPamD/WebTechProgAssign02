  let calendar = document.querySelector('.calendar')

  const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
  }

  getFebDays = (year) => {
      return isLeapYear(year) ? 29 : 28
  }

  generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

  // get first day of month

  let first_day = new Date(year, month, 1)

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement('div')
    if (i >= first_day.getDay()) {
        day.classList.add('calendar-day-hover')
        day.innerHTML = i - first_day.getDay() + 1
        day.innerHTML += `<span></span>
                        <span></span>
                        <span></span>
                        <span></span>`
        if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
            day.classList.add('curr-date')
        }
    }
    calendar_days.appendChild(day)
  }
  // Add event listener to calendar days
  calendar_days.addEventListener('click', (e) => {
      if (e.target.classList.contains('calendar-day-hover')) {
          const selectedate = new Date(year, month, parseInt(e.target.innerHTML));
          const formattedSelectedate = formatDate(selectedate); // Format the selected date
          const selectedDate = new Date(year, month, parseInt(e.target.innerHTML));
          const selectedDateDiv = document.querySelector('#selected-date');
          selectedDateDiv.innerHTML = `Selected Date: ${formatDate(selectedDate)}`;
          localStorage.setItem("selectedDate" , formattedSelectedate);
          updateSummaryTable(); // Call the function with formatted date
      }
  });
  }

  let month_list = calendar.querySelector('.month-list')

  month_names.forEach((e, index) => {
      let month = document.createElement('div')
      month.innerHTML = `<div data-month="${index}">${e}</div>`
      month.querySelector('div').onclick = () => {
          month_list.classList.remove('show')
          curr_month.value = index
          generateCalendar(index, curr_year.value, selectedDate)
      }
      month_list.appendChild(month)
  })

  let month_picker = calendar.querySelector('.month-picker')

  month_picker.onclick = () => {
      month_list.classList.add('show')
  }

  let currDate = new Date()

  let curr_month = {value: currDate.getMonth()}
  let curr_year = {value: currDate.getFullYear()}

  generateCalendar(curr_month.value, curr_year.value)

  document.querySelector('#prev-year').onclick = () => {
      --curr_year.value
      generateCalendar(curr_month.value, curr_year.value)
  }

  document.querySelector('#next-year').onclick = () => {
      ++curr_year.value
      generateCalendar(curr_month.value, curr_year.value)
  }

  // New function to format the date
  formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
  }

  let dark_mode_toggle = document.querySelector('.dark-mode-switch')

  dark_mode_toggle.onclick = () => {
      document.querySelector('body').classList.toggle('light')
      document.querySelector('body').classList.toggle('dark')
  }


  //For the Number input
  var numbers = document.getElementById('box');
  for (var i = 0; i < 100; i++) {
    var span = document.createElement('Span');
    span.textContent = i;
    numbers.appendChild(span)
  }
  var num = numbers.getElementsByTagName('span');
  var index = 0;

  function nextNum(){
    num[index].style. display = 'none';
    index = (index + 1) % num.length
    num[index].style.display = 'initial';
  }
  function prevNum(){
    num[index].style. display = 'none';
    index = (index - 1 + num.length) % num.length
    num[index].style.display = 'initial';
  }

  // function calculateCharges(normalRate, peakRate, normalHours, peakHours) {
  //     return (normalRate * normalHours) + (peakRate * peakHours);
  // }

  function calculateHours() {

}

function calculateCharges(normalRate, peakRate, normalHours, peakHours, tickets) {
    return (normalRate * normalHours + peakRate * peakHours) * tickets;
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateSummaryTable);
});

// Function to update the summary table
function updateSummaryTable(selectedDate) {
    const selectedDate2 = localStorage.getItem("selectedDate");
    const slAdultTickets = parseInt(document.getElementById("slAdult").value) || 0;
    const slChildTickets = parseInt(document.getElementById("slChild").value) || 0;
    const foreignerAdultTickets = parseInt(document.getElementById("foreignerAdult").value) || 0;
    const foreignerChildTickets = parseInt(document.getElementById("foreignerChild").value) || 0;
    const infantTickets = parseInt(document.getElementById("infant").value) || 0;


    // Pricing list for charges
    const chargePerNormalHourSLAdult = 4;
    const chargePerPeakHourSLAdult = 6;
    const chargePerNormalHourSLChild = 2;
    const chargePerPeakHourSLChild = 3;
    const chargePerNormalHourForeignerAdult = 10;
    const chargePerPeakHourForeignerAdult = 13;
    const chargePerNormalHourForeignerChild = 5;
    const chargePerPeakHourForeignerChild = 8;

    // Calculate charges for each ticket category
    const totalCharges = {
        slAdultCharges : calculateCharges(chargePerNormalHourSLAdult, chargePerPeakHourSLAdult, 1, 0, slAdultTickets),
        slChildCharges: calculateCharges(chargePerNormalHourSLChild, chargePerPeakHourSLChild, 1, 0, slChildTickets),
        foreignerAdultCharges: calculateCharges(chargePerNormalHourForeignerAdult, chargePerPeakHourForeignerAdult, 1, 0, foreignerAdultTickets),
        foreignerChildCharges: calculateCharges(chargePerNormalHourForeignerChild, chargePerPeakHourForeignerChild, 1, 0, foreignerChildTickets)
    };


    const selectedTimes = [];
    let totalHours = 0;
    let peakHours = 0;
    let normalHours = 0;

    let earliestTime = Infinity;
    let latestTime = -Infinity;

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const start = parseInt(checkbox.getAttribute('data-start'));
        const end = parseInt(checkbox.getAttribute('data-end'));
        selectedTimes.push(`${start}am-${end}am`);
        totalHours += (end - start);

        if (start >= 15 && end <= 18 || start >= 10 && end <= 13 ) {
          peakHours += (end - start);
        }
        else{
          normalHours += (end -  start)
        }
        if (start < earliestTime) {
          earliestTime = start;
        }
        if (end > latestTime) {
          latestTime = end;
        }
      }
    });


//     // Save the values to local storage

       localStorage.setItem('selectedTimes', JSON.stringify(selectedTimes));
       localStorage.setItem('totalHours', totalHours);
       localStorage.setItem('peakHours', peakHours);
       localStorage.setItem('normalHours', normalHours);
       localStorage.setItem('earliestTime', earliestTime);
       localStorage.setItem('latestTime', latestTime);
       localStorage.setItem("selectedate" , selectedDate2);
       localStorage.setItem("slAdultTickets", slAdultTickets);
       localStorage.setItem("slChildTickets", slChildTickets);
       localStorage.setItem("foreignerAdultTickets", foreignerAdultTickets);
       localStorage.setItem("foreignerChildTickets", foreignerChildTickets);
       localStorage.setItem("infantTickets", infantTickets);
       localStorage.setItem("totalCharges", JSON.stringify(totalCharges));



    // Update the summary table with the calculated charges
    summaryTable.innerHTML = `
    <tr>
           <th>Date</th>
           <td>${selectedDate2}</td>
       </tr>
       <tr>
           <th>Duration</th>
           <td>${totalHours} Hours (${peakHours} Peak Hours : ${normalHours} Normal Hours) </td>
       </tr>
       <tr>
           <th>Time Selected</th>
           <td>${earliestTime}am - ${latestTime}am</td>
       </tr>
       <tr>
            <td>${slAdultTickets} SL Adult Ticket${slAdultTickets !== 1 ? "s" : ""}</td>
            <td>$${totalCharges.slAdultCharges}</td>
        </tr>
        <tr>
            <td>${slChildTickets} SL Child Ticket${slChildTickets !== 1 ? "s" : ""}</td>
            <td>$${totalCharges.slChildCharges}</td>
        </tr>
        <tr>
            <td>${foreignerAdultTickets} Foreigner Adult Ticket${foreignerAdultTickets !== 1 ? "s" : ""}</td>
            <td>$${totalCharges.foreignerAdultCharges}</td>
        </tr>
        <tr>
            <td>${foreignerChildTickets} Foreigner Child Ticket${foreignerChildTickets !== 1 ? "s" : ""}</td>
            <td>$${totalCharges.foreignerChildCharges}</td>
        </tr>
        <!-- ... -->
        <tr>
            <td>Total Payable</td>
            <td>$${totalCharges.slAdultCharges + totalCharges.slChildCharges + totalCharges.foreignerAdultCharges + totalCharges.foreignerChildCharges}</td>
        </tr>
    `;
}

function displayStoredSummary() {
    const summaryTable = document.getElementById("summaryTable");
    const selectedDate = localStorage.getItem("selectedDate");
    const savedselectedTimes = JSON.parse(localStorage.getItem('selectedTimes'));
    const totalHours = localStorage.getItem('totalHours');
    const peakHours = localStorage.getItem('peakHours');
    const normalHours = localStorage.getItem("normalHours");
    const earliestTime = localStorage.getItem('earliestTime');
    const latestTime = localStorage.getItem('latestTime');
    const slAdultTickets = parseInt(localStorage.getItem("slAdultTickets"));
    const slChildTickets = parseInt(localStorage.getItem("slChildTickets"));
    const foreignerAdultTickets = parseInt(localStorage.getItem("foreignerAdultTickets"));
    const foreignerChildTickets = parseInt(localStorage.getItem("foreignerChildTickets"));
    const infantTickets = parseInt(localStorage.getItem("infantTickets"));
    const totalChargesJson = localStorage.getItem("totalCharges");
    console.log(totalChargesJson); // Add this line for debugging
    const totalCharges = JSON.parse(totalChargesJson);

    summaryTable.innerHTML = `
        <tr>
            <th>Date</th>
            <td>${selectedDate}</td>
        </tr>
        <tr>
            <th>Duration</th>
            <td>${totalHours} Hours (${peakHours} Peak Hours : ${normalHours} Normal Hours) </td>
        </tr>
        <tr>
            <th>Time Selected</th>
            <td>${earliestTime}am - ${latestTime}am</td>
        </tr>
        <tr>
            <th>Tickets</th>
            <th>Charges</th>
        </tr>
        <tr>
            <td>${slAdultTickets} Sri Lankan Adult ticket${slAdultTickets > 1 ? 's' : ''}</td>
            <td>$${totalCharges.slAdultCharges}</td>
        </tr>
        <tr>
            <td>${slChildTickets} Sri Lankan Child ticket${slChildTickets > 1 ? 's' : ''}</td>
            <td>$${totalCharges.slChildCharges}</td>
        </tr>
        <tr>
            <td>${foreignerAdultTickets} Foreigner Adult ticket${foreignerAdultTickets > 1 ? 's' : ''}</td>
            <td>$${totalCharges.foreignerAdultCharges}</td>
        </tr>
        <tr>
            <td>${foreignerChildTickets} Foreigner Child ticket${foreignerChildTickets > 1 ? 's' : ''}</td>
            <td>$${totalCharges.foreignerChildCharges}</td>
        </tr>
        <tr>
            <td>${infantTickets} Infant ticket${infantTickets > 1 ? 's' : ''}</td>
            <td>$${calculateCharges(0, 0, 0, 0, infantTickets)}</td>
        </tr>
        <tr>
            <td>Total Payable</td>
            <td>$${totalCharges.slAdultCharges + totalCharges.slChildCharges + totalCharges.foreignerAdultCharges + totalCharges.foreignerChildCharges + calculateCharges(0, 0, 0, 0, infantTickets)}</td>
        </tr>
    `;
}

  // Call the function to display stored summary on page load
  displayStoredSummary();




        // Enable the "Continue with purchase" button
        document.getElementById('continue-button').addEventListener('click', () => {
            // You can add the URL of your payment page here
            window.location.href = 'details.html';
        });

const calendarTable = document.querySelector('#calendar-table tbody');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();

function generateCalendar(date) {
  calendarTable.innerHTML = '';
  const month = date.getMonth();
  const year = date.getFullYear();
  monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;


  const firstDay = new Date(year, month, 0).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  let row = document.createElement('tr')
  for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement('td')
    row.appendChild(cell)
  }
  for (let day = 1; day < daysInMonth; day++) {
    const cell = document.createElement('td')
    cell.textContent = day
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add('current-day');
    } else if (day === today.getDate()) {
      cell.classList.add('current-days');
    }
    row.appendChild(cell)
    if ((firstDay + day) % 7 === 0) {
      calendarTable.append(row)
      row = document.createElement('tr')
    }
  }
  if (row.children.length > 0) {
    let rowsLength = row.children.length
    for (let i = 0; i < 7 - rowsLength; i++) {
      const cell = document.createElement('td')
      row.appendChild(cell)
    }
    calendarTable.append(row)
  }
}

prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1)
  generateCalendar(currentDate)
})

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1)
  generateCalendar(currentDate)
})
generateCalendar(currentDate);


const handSecond = document.querySelector('.clock__second')
const handMinute = document.querySelector('.clock__minute')
const handHour = document.querySelector('.clock__hour')
const clockTime = document.querySelector('.clock__text')
let currentSecond = (new Date().getSeconds() * 6) - 84
let currentMinute = (new Date().getMinutes() * 6) - 90
handMinute.style.transform = `rotate(${currentMinute}deg)`
setInterval(() => {
  handSecond.style.transform = `rotate(${currentSecond}deg)`;
  currentSecond = currentSecond + 6
  if (currentSecond % 276 === 0) {
    handMinute.style.transform = `rotate(${currentMinute}deg)`;
    currentMinute = currentMinute + 6
  }
  const currnetHour = new Date().getHours();
  if (currnetHour < 12) {
    handHour.style.transform = `rotate(${((currnetHour * 30) - 90)}deg)`;
  } else {
    handHour.style.transform = `rotate(${(((currnetHour - 12) * 30) - 90)}deg)`;
  }
  clockTime.innerHTML = change()
}, 1000);
let clickBtn = false
let is24HourFormat = true;
function change() {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let second = new Date().getSeconds();
  if (!is24HourFormat) {
    hour = hour % 12 || 12
  }
  return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second} ${!is24HourFormat ? 'PM' : ''}`
}
function changeTime() {
  is24HourFormat = !is24HourFormat
  change()
}
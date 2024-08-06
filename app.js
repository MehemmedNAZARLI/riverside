const workers = [
    { id: 1, name: 'Cindy', shift: 'AM', daysOff: [0, 1, 6] }, // Sunday and Monday off
    { id: 2, name: 'Nazar', shift: 'AM', daysOff: [0, 6] },
    { id: 3, name: 'Bektas', shift: 'AM', daysOff: [4, 5] },
    { id: 4, name: 'Andrej P.', shift: 'AM', daysOff: [3] },
    { id: 5, name: 'Andrej D.', shift: 'AM', daysOff: [1,2,3,4,6] },
    { id: 6, name: 'Nancy', shift: 'PM', daysOff: [1,2,5] },
    { id: 7, name: 'Alex', shift: 'PM', daysOff: [3] },
    { id: 8, name: 'O', shift: 'PM', daysOff: [3,4] },
    { id: 9, name: 'Ernesto', shift: 'PM', daysOff: [0, 6] }
];

const tasks = [
    { id: 1, name: 'Task 1', detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est provident tempora deserunt officiis, molestiae hic quae omnis dicta aut obcaecati dolor, cum a, necessitatibus quia. Facilis quidem suscipit omnis necessitatibus.', difficulty: 3, shift: 'AM' },
    { id: 2, name: 'Task 2', detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est provident tempora deserunt officiis, molestiae hic quae omnis dicta aut obcaecati dolor, cum a, necessitatibus quia. Facilis quidem suscipit omnis necessitatibus.', difficulty: 2, shift: 'AM' },
    { id: 3, name: 'Task 3', detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est provident tempora deserunt officiis, molestiae hic quae omnis dicta aut obcaecati dolor, cum a, necessitatibus quia. Facilis quidem suscipit omnis necessitatibus.', difficulty: 5, shift: 'AM' },
    { id: 4, name: 'Task 4', detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est provident tempora deserunt officiis, molestiae hic quae omnis dicta aut obcaecati dolor, cum a, necessitatibus quia. Facilis quidem suscipit omnis necessitatibus.', difficulty: 1, shift: 'PM' },
    { id: 5, name: 'Task 5', detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est provident tempora deserunt officiis, molestiae hic quae omnis dicta aut obcaecati dolor, cum a, necessitatibus quia. Facilis quidem suscipit omnis necessitatibus.', difficulty: 2, shift: 'PM' },
    { id: 6, name: 'Task 6', detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est provident tempora deserunt officiis, molestiae hic quae omnis dicta aut obcaecati dolor, cum a, necessitatibus quia. Facilis quidem suscipit omnis necessitatibus.', difficulty: 5, shift: 'PM' },
    // Add more tasks as needed
];

const shifts = [];
const completedTasks = new Set();

// Function to display workers
function displayWorkers() {
    const content = document.getElementById('content');
    content.innerHTML = '<h1>Workers</h1>';
    workers.forEach(worker => {
        content.innerHTML += 
        `<div class="worker" onclick="displayWorkerDetails(${worker.id})">
                <div class="pfp">${worker.name[0]}</div>
                <div class="info">
                    <p class="name">${worker.name}</p>
                    <p class="additional_info">Shift: ${worker.shift}, Days Off: ${worker.daysOff.map(day => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]).join(', ')}</p>
                </div>
            </div>`;
    });
}

// Function to display tasks
function displayTasks() {
    const content = document.getElementById('content');
    content.innerHTML = '<h1>Tasks</h1>';
    tasks.forEach(task => {
        const isChecked = completedTasks.has(task.id) ? 'checked' : '';
        content.innerHTML += 
      `<div class="task_container">
      
        <p>  <input type="checkbox" ${isChecked} onclick="markTaskCompletedTask(${task.id})"> ${task.name} - ${task.detail} (${task.difficulty} star)</p>
      </div>`;
    });
}

// Function to display shifts
function displayShifts() {
    const content = document.getElementById('content');
    content.innerHTML = '<h1>Shifts</h1>';
    shifts.forEach(shift => {
        const worker = workers.find(worker => worker.id === shift.workerId);
        content.innerHTML += `<p>${shift.date} - ${shift.shiftType} - ${worker.name}</p>`;
        shift.tasks.forEach(taskId => {
            const task = tasks.find(task => task.id === taskId);
            const isChecked = completedTasks.has(task.id) ? 'checked' : '';
            content.innerHTML += `<p>-- ${task.name} (${task.difficulty} stars) <input type="checkbox" ${isChecked} onclick="markTaskCompleted(${task.id})"></p>`;
        });
    });
}

// Function to mark task as completed
function markTaskCompleted(taskId) {
    if (completedTasks.has(taskId)) {
        completedTasks.delete(taskId);
    } else {
        completedTasks.add(taskId);
    }
    displayShifts();
}
function markTaskCompletedTask(taskId) {
    if (completedTasks.has(taskId)) {
        completedTasks.delete(taskId);
    } else {
        completedTasks.add(taskId);
    }
    displayTasks();
}

// Function to get current shift type based on time
function getCurrentShift() {
    const now = new Date();
    const hours = now.getHours();
    return (hours >= 6 && hours < 14) ? 'AM' : 'PM';
}

// Function to get today's date
function getTodayDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

// Function to get today's day of the week
function getTodayDay() {
    const now = new Date();
    return now.getDay();
}

// Function to format time as HH:MM:SS
// function startTime() {
//     const today = new Date();
//     let h = today.getHours();
//     let m = today.getMinutes();
//     let s = today.getSeconds();
//     m = checkTime(m);
//     s = checkTime(s);
//     if(h>=12){
//         document.getElementById('txt').innerHTML =  h - 12 + ":" + m + ":" + s +"pm";
//     }
//     else{
//         document.getElementById('txt').innerHTML =  h + ":" + m + ":" + s + "am";
//     }
//     setTimeout(startTime, 1000);
//   }
  
//   function checkTime(i) {
//     if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
//     return i;
//   }




function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    const day = today.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    const dateStr = month + " " + day + ", " + year;
    
    if (h >= 12) {
        h = h === 12 ? 12 : h - 12; // Handle noon correctly
        document.getElementById('txt').innerHTML = h + ":" + m + ":" + s + "pm";
    } else {
        h = h === 0 ? 12 : h; // Handle midnight correctly
        document.getElementById('txt').innerHTML = h + ":" + m + ":" + s + "am";
    }

    document.getElementById('date').innerHTML = dateStr;

    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}



// Function to assign shifts to workers with tasks totaling exactly 10 stars
function assignShifts() {
    const assignedShifts = [];
    const todayDay = getTodayDay();
    
    ['AM', 'PM'].forEach(shiftType => {
        const availableWorkers = workers.filter(worker => worker.shift === shiftType && !worker.daysOff.includes(todayDay));
        const assignedTasks = new Set();

        availableWorkers.forEach(worker => {
            let shiftTasks = [];
            let starCount = 0;

            while (starCount < 10) {
                const availableTasks = tasks.filter(task => !shiftTasks.includes(task.id) && task.shift === shiftType && !assignedTasks.has(task.id));
                if (availableTasks.length === 0) break;
                const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
                if (starCount + randomTask.difficulty <= 10) {
                    shiftTasks.push(randomTask.id);
                    starCount += randomTask.difficulty;
                    assignedTasks.add(randomTask.id);
                }
            }

            const newShift = {
                workerId: worker.id,
                tasks: shiftTasks,
                date: getTodayDate(),
                shiftType: shiftType
            };

            assignedShifts.push(newShift);
        });
    });

    shifts.push(...assignedShifts);
    console.log(`Assigned shifts:`, shifts); // Debug
    displayWorkers();
}

// Function to display worker details
function displayWorkerDetails(workerId) {
    const content = document.getElementById('content');
    const worker = workers.find(worker => worker.id === workerId);
    const workerShifts = shifts.filter(shift => shift.workerId === workerId);

    content.innerHTML = `<h1>${worker.name}'s Shifts and Tasks</h1>`;
    workerShifts.forEach(shift => {
        content.innerHTML += `<h2>${shift.date} - ${shift.shiftType}</h2>`;
        shift.tasks.forEach(taskId => {
            const task = tasks.find(task => task.id === taskId);
            const isChecked = completedTasks.has(task.id) ? 'checked' : '';
            content.innerHTML += `<p>-- ${task.name} (${task.difficulty} stars) <input type="checkbox" ${isChecked} onclick="markTaskCompleted(${task.id})"></p>`;
        });
    });
}

// Automatically assign shifts on page load
window.onload = () => {
    assignShifts();
    startTime(); // Start the clock and date display
};

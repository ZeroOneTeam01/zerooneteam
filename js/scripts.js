
// Scripts

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


document.addEventListener("DOMContentLoaded", function () {
    let previousGPAInput = document.getElementById("previousGPA");
    let completedHoursInput = document.getElementById("completedHours");
    let courses = document.getElementById("courses");
    let calculateGPAButton = document.getElementById("calculateGPA");
    let semesterGPAResultElement = document.getElementById("semesterGPAResult");
    let cumulativeGPAResultElement = document.getElementById("cumulativeGPAResult");
    let semesterRatingElement = document.getElementById("semesterRating");
    let cumulativeRatingElement = document.getElementById("cumulativeRating");

    // Function to calculate Semester GPA
    function updateSemesterGPA() {
        let totalPoints = 0;
        let totalHours = 0;

        Array.from(courses.children).forEach(course => {
            let hours = parseFloat(course.querySelector(".hours").value);
            let grade = parseFloat(course.querySelector(".grade").value);

            if (!isNaN(hours) && !isNaN(grade)) {
                totalPoints += hours * grade;
                totalHours += hours;
            }
        });

        let semesterGPA = totalHours === 0 ? 0 : totalPoints / totalHours;
        semesterGPA = Math.min(4.0, semesterGPA);
        semesterGPA = Math.max(0, semesterGPA);

        semesterGPAResultElement.textContent = semesterGPA.toFixed(2);
        updateRating(semesterGPA.toFixed(2), semesterRatingElement);
    }

    // Function to calculate Cumulative GPA
    function updateCumulativeGPA() {
        let previousGPA = parseFloat(previousGPAInput.value) || 0;
        let completedHours = parseFloat(completedHoursInput.value) || 0;
        let totalPoints = previousGPA * completedHours;
        let totalHours = completedHours;

        Array.from(courses.children).forEach(course => {
            let hours = parseFloat(course.querySelector(".hours").value);
            let grade = parseFloat(course.querySelector(".grade").value);
            let previousCourseGrade = parseFloat(course.querySelector(".previousGrade").value);

            if (!isNaN(previousCourseGrade)) {
                let currentPoints = totalPoints - previousCourseGrade * hours;
                let currentHours = totalHours - hours;
                let gradeDifference = grade - previousCourseGrade;
                let additionalPoints = gradeDifference * hours;

                if (gradeDifference < 0) {
                    currentPoints -= additionalPoints;
                    currentHours -= hours;
                }

                totalPoints = currentPoints + grade * hours;
                totalHours = currentHours + hours;
            } else {
                totalPoints += hours * grade;
                totalHours += hours;
            }
        });

        let newGPA = totalHours === 0 ? 0 : totalPoints / totalHours;
        newGPA = Math.min(4.0, newGPA);
        newGPA = Math.max(0, newGPA);

        cumulativeGPAResultElement.textContent = newGPA.toFixed(2);
        updateRating(newGPA.toFixed(2), cumulativeRatingElement);
    }

    // Function to update the rating text based on GPA
    function updateRating(gpa, ratingElement) {
        if (gpa >= 3.5) {
            ratingElement.textContent = "امتياز";
        } else if (gpa >= 3 && gpa < 3.5) {
            ratingElement.textContent = "جيد جدا";
        } else if (gpa >= 2.5 && gpa < 3) {
            ratingElement.textContent = "جيد";
        } else if (gpa >= 2 && gpa < 2.5) {
            ratingElement.textContent = "مقبول";
        } else if (gpa < 2) {
            ratingElement.textContent = "ضعيف";
        }
    }

    // Event listener for adding a new course
    document.getElementById("addCourse").addEventListener("click", function () {
        let newCourse = document.createElement("div");
        newCourse.className = "course row align-items-center";
        newCourse.innerHTML = `
                        
            <div class="col-3 mb-3">
                <select name="hours" class="form-select hours">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
            <div class="col-3 mb-3">
                <select name="grade" class="form-select grade">
                    <option value="" selected>----</option>
                    <option value="4">A+</option>
                    <option value="3.75">A</option>
                    <option value="3.5">A-</option>
                    <option value="3.25">B+</option>
                    <option value="3">B</option>
                    <option value="2.75">B-</option>
                    <option value="2.5">C+</option>
                    <option value="2.25">C</option>
                    <option value="2">C-</option>
                    <option value="1.75">D+</option>
                    <option value="1.5">D</option>
                    <option value="0.75">F</option>
                </select>
            </div>
            <div class="col-3 mb-3">
                <select name="previousGrade" class="form-select previousGrade">
                    <option value="" selected>----</option>
                    <option value="2">C-</option>
                    <option value="1.75">D+</option>
                    <option value="1.5">D</option>
                    <option value="0.75">F</option>
                </select>
            </div>
            <div style="padding: 0rem;" class="col-3 mb-3">
                <button class="btn btn-danger deleteCourse w-99">حذف</button>
            </div>
        `;
        courses.appendChild(newCourse);
    });

    // Event listener for deleting a course
    courses.addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteCourse")) {
            let courseElement = event.target.parentElement.parentElement;
            courseElement.remove();
        }
    });

    // Event listener for calculating GPA
    calculateGPAButton.addEventListener("click", function () {
        updateSemesterGPA();
        updateCumulativeGPA();
    });
});


// Event delegation to remove courses dynamically
courses.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("removeCourse")) {
        let courseToRemove = e.target.closest(".course");
        courseToRemove.remove();
    }
});




function copyEmail(id) {
    var emailText = document.getElementById(id).textContent;
    navigator.clipboard.writeText(emailText).then(function() {
      alert('Copied: ' + emailText);
    }, function(err) {
      console.error('Error copying email: ', err);
    });
  }

// Function to animate counter
function animateCounter(id, start, end, duration) {
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));

    const timer = setInterval(() => {
        current += increment;
        document.getElementById(id).innerText = `+${current}`;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Reset the counters to their initial value
function resetCounters() {
    document.getElementById("counter1").innerText = "+0";
    document.getElementById("counter2").innerText = "+0";
    document.getElementById("counter3").innerText = "+0";
    document.getElementById("counter4").innerText = "+0";
}

// IntersectionObserver callback to trigger the animation
function triggerCounters(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Reset counters before starting the animation again
            resetCounters();

            // Start the counter animations when the section is visible
            animateCounter("counter1", 0, 250, 2000);
            animateCounter("counter2", 0, 50, 2000);
            animateCounter("counter3", 0, 200, 2000);
            animateCounter("counter4", 0, 25, 2000);
        }
    });
}

// Create the IntersectionObserver
const observer = new IntersectionObserver(triggerCounters, {
    threshold: 0.5 // Start the animation when 50% of the element is visible
});

// Observe the Statics section
observer.observe(document.getElementById("Statics"));


  // Initialize the carousel and set the interval for auto sliding
  var myCarousel = document.querySelector('#carouselExampleIndicators');
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 4000,  // Slide every 4 seconds (4000 ms)
    ride: 'carousel' // Auto start the carousel
  });
  document.addEventListener('keydown', function(e) {
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
    }
    // Disable F12 (Developer Tools)
    if (e.key === 'F12') {
      e.preventDefault();
    }
  });
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
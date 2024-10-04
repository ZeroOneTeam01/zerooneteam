
// Scripts
// 

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
    let courses = document.getElementById("courses");
    let semesterGPAResultElement = document.getElementById("semesterGPAResult");
    let semesterRatingElement = document.getElementById("semesterRating");
    let cumulativeGPAResultElement = document.getElementById("cumulativeGPAResult");
    let cumulativeRatingElement = document.getElementById("cumulativeRating");
    let addCourseButton = document.getElementById("addCourse");
    let calculateGPAButton = document.getElementById("calculateGPA");

    // Function to calculate Semester GPA
function calculateSemesterGPA() {
    let gradesSum = 0, hoursSum = 0;
    Array.from(courses.children).forEach((course) => {
        let hours = parseFloat(course.querySelector(".hours").value);
        let grade = parseFloat(course.querySelector(".grade").value);
        let isRetake = course.querySelector(".isRetake").checked; // Check if it's a retake
        
        if (!isNaN(hours) && !isNaN(grade)) {
            gradesSum += grade * hours * (isRetake ? 0.5 : 1); // Reduce weight for retakes
            hoursSum += hours;
        }
    });
    return hoursSum > 0 ? gradesSum / hoursSum : 0;
}

// Function to calculate Cumulative GPA
function calculateCumulativeGPA(semesterGPA) {
    let previousGPA = parseFloat(document.getElementById("previousGPA").value);
    let completedHours = parseFloat(document.getElementById("completedHours").value);
    let semesterHours = Array.from(courses.children).reduce((acc, course) => acc + parseFloat(course.querySelector(".hours").value), 0);
    return (previousGPA * completedHours + semesterGPA * semesterHours) / (completedHours + semesterHours);
}

// Function to update the rating text based on GPA
function updateRatings(gpa, element) {
    if (gpa >= 3.5) {
        element.textContent = "امتياز";
    } else if (gpa >= 3 && gpa < 3.5) {
        element.textContent = "جيد جدا";
    } else if (gpa >= 2.5 && gpa < 3) {
        element.textContent = "جيد";
    } else if (gpa >= 2 && gpa < 2.5) {
        element.textContent = "مقبول";
    } else if (gpa < 2) {
        element.textContent = "ضعيف";
    }
}

// Event listener to add a new course
addCourseButton.addEventListener("click", function () {
    let courseTemplate = `
    <div class="course row g-3 align-items-center mt-3">
        <div class="col-4">
            <select name="hours" class="form-select hours">
                <option value>عدد الساعات</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>
        <div class="col-4">
            <select name="grade" class="form-select grade">
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
        <div class="col-4 text-center">
            <label>
                <input type="checkbox" class="isRetake"> المادة معادة
            </label>
            <button class="removeCourse btn btn-danger mt-2">حذف مادة</button>
        </div>
    </div>
    `;
    courses.insertAdjacentHTML('beforeend', courseTemplate);
});

// Event listener to calculate GPA when "احسب معدلك" is clicked
calculateGPAButton.addEventListener("click", function () {
    let semesterGPA = calculateSemesterGPA();
    semesterGPAResultElement.textContent = semesterGPA.toFixed(2);
    updateRatings(semesterGPA, semesterRatingElement);

    let cumulativeGPA = calculateCumulativeGPA(semesterGPA);
    cumulativeGPAResultElement.textContent = cumulativeGPA.toFixed(2);
    updateRatings(cumulativeGPA, cumulativeRatingElement);
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
            animateCounter("counter2", 0, 10, 2000);
            animateCounter("counter3", 0, 200, 2000);
            animateCounter("counter4", 0, 20, 2000);
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
});
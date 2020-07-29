const submit = document.getElementById('submit');
const search = document.getElementById('search');
const randomBtn = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');


// Search meals Fetch form API
function searchMeal(e) {
    e.preventDefault();

    // clear single meal
    singleMeal.innerHTML = '';

    // get search term
    const searchTerm = search.value;

    // check for empty input
    if (searchTerm.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h3>Search results for '${searchTerm}':</h3>`;

                if (data.meal === null) {
                    resultHeading.innerHTML = `<h3>There are no search result.Try again!</h3>`;
                } else {
                    meals.innerHTML = data.meals.map(meal =>
                        `
                            <div class = "meal">
                                <img src ="${meal.strMealThumb}" alt = "${meal.strMeal}"/>
                                <div class = "meal-info" data-mealID = "${meal.idMeal}">
                                    <h3>${meal.strMeal}</h3>
                                </div>
                            </div>
                            `).join('');
                }
            });
        // Clear search value
        search.value = '';
    } else {
        alert('Please enter a value first.')
    }

}


// Events
submit.addEventListener('submit', searchMeal);
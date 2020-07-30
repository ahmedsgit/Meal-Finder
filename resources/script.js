const submit = document.getElementById('submit');
const search = document.getElementById('search');
const randomBtn = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');

// Search Auto Recommand
function searchAutoComplete(searchText) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
        .then(response => response.json())
        .then(data => {
            let dataArr = new Array();
            for (let i = 0; i < data.meals.length; i++) {
                dataArr.push(data.meals[i].strMeal);
            }
            console.log(dataArr);
        })
        .catch(() => console.error('No Match !'));
    dataArr = '';
}


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
                // console.log(data);
                resultHeading.innerHTML = `<h3>Search results for '${searchTerm}':</h3>`;

                if (data.meal === null) {
                    resultHeading.innerHTML = `<h3>There are no search result.Try again!</h3>`;
                } else {
                    meals.innerHTML = data.meals.map(meal =>
                        `
                            <div class = "meal">
                                <img src ="${meal.strMealThumb}" alt = "${meal.strMeal}"/>
                                <a href="#mealTrigger">
                                <div class = "meal-info" data-mealID = "${meal.idMeal}">
                                    <h3>${meal.strMeal}</h3>
                                </div></a>
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
// Fetch meal by ID
function getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        })
}
// Fetch random Meals
function randomMeal() {
    // clear meals and heading to
    meals.innerHTML = '';
    resultHeading.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        })

}

// Add Meal to DOM
function addMealToDOM(meal) {
    const ingredient = new Array();
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredient.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    // console.log(meal);
    singleMeal.innerHTML = `
    <div class = "single-meal" id="mealTrigger">
       <h2>${meal.strMeal}</h2>
       <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}"/>
       <div class="single-meal-info">
          ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
          ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
       </div>
       <div class = "meal-instruction">
          <h3>Instructions</h3>
          <p>${meal.strInstructions}</p>
          <h3>Ingredients</h3>
          <ul>
            ${ingredient.map(ing=>`<li> ${ing}</li>`).join('')}
       </div>
    <div>
    </div>
    `
}



// Events
submit.addEventListener('submit', searchMeal);
randomBtn.addEventListener('click', randomMeal);
meals.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealId');
        getMealById(mealId);
    }

})

search.addEventListener('input', () => {
    searchAutoComplete(search.value);
})
/* <refrence types="../@types/jquery" />; */
let rowData = document.getElementById("rowData");
let inputSearchByName = document.getElementById("searchByName");
let searchContainer = document.getElementById("searchContainer");

// global let
let meals = [];
let allCateg = [];
let allArea = [];
let allIngredients = [];
let allCategData = [];

// *************** btn nav side
$(document).ready(() => {
  getMeal("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});

function openSideNav() {
  $(".side-nav").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}

function closeSideNav() {
  let boxWidth = $(".side-nav .nav-tab").outerWidth();
  $(".side-nav").animate(
    {
      left: -boxWidth,
    },
    500
  );

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}

closeSideNav();
$(".side-nav i.open-close-icon").click(() => {
  if ($(".side-nav").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

// search
function showSearchInputs() {
  closeSideNav();
  searchContainer.innerHTML = `
    <div class="row py-4">
           <div class="col-md-6">
            <div class="searchByName">
              <input
              onkeyup="getMeal(this.value)"
                type="text"
                id="searchByName"
                placeholder="Search By Name"
                class="form-control bg-transparent text-white"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="searchByFirstLetter">
              <input
              onkeyup="searchByFLetter(this.value)"
                type="text"
                id="searchByFirstLetter"
                placeholder="Search By First Letter"
                class="form-control text-white bg-transparent"
              />
            </div>
          </div> 
        </div>
  `;
  rowData.innerHTML = "";
}

async function searchByFLetter(term) {
  rowData.innerHTML = "";
  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? displayDataMeal(response.meals) : displayDataMeal([]);
}

//******************** api meal*******************************************************************
async function getMeal(meal) {
  closeSideNav();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
  );
  data = await response.json();
  allMeal = data.meals;
  displayDataMeal(data.meals);
}
getMeal("");

// display data meal
function displayDataMeal(mealData) {
  cartona = "";
  for (let i = 0; i < mealData.length; i++) {
    cartona += `
    <div class="col-md-3">
          <div onclick="getMealDetails('${mealData[i].idMeal}')" class="meal my-4 position-relative overflow-hidden">
            <img
              src='${mealData[i].strMealThumb}'
              alt=""
              class="w-100 rounded"
            />
            <div class="layer-meal rounded d-flex align-items-center">
              <h2 class="text-center text-black">${mealData[i].strMeal}</h2>
            </div>
          </div>
        </div>
    `;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

//************************************ api categories*************************************************
async function getCategories() {
  closeSideNav();
  searchContainer.innerHTML = "";
  let response =
    await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php
`);
  data = await response.json();
  allCateg = data.categories;
  displayDataCateg(data.categories);
}
getCategories();

// // display data categories
function displayDataCateg() {
  cartona = "";
  for (let i = 0; i < allCateg.length; i++) {
    cartona += `
    <div class="col-md-3">
            <div onclick="getCategoriesData('${
              allCateg[i].strCategory
            }')" class="meal my-4 position-relative overflow-hidden">
              <img
                src='${allCateg[i].strCategoryThumb}'
                alt=""
                class="w-100 rounded"
              />
              <div class="layer-cate rounded text-center">
                <h2 class="text-center text-black">${
                  allCateg[i].strCategory
                }</h2>
                <p>
                ${allCateg[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}
                </p>
              </div>
            </div>
          </div>
    `;
  }
  document.getElementById("rowData").innerHTML = cartona;
}
// categ data
async function getCategoriesData(data) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`
  );
  data = await response.json();
  allCategData = data.meals;
  displayDataMeal(data.meals);
}
getCategoriesData();

// display data in categories
function displayDataInCateg() {
  cartona = "";
  for (let i = 0; i < allCategData.length; i++) {
    cartona += `
    <div class="col-md-3">
          <div class="meal my-4 position-relative overflow-hidden">
            <img
              src='${allCategData[i].strMealThumb}'
              alt=""
              class="w-100 rounded"
            />
            <div class="layer-meal rounded d-flex align-items-center">
              <h2 class="text-center text-black">${allCategData[i].strMeal}</h2>
            </div>
          </div>
        </div>
    `;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

//********************** api area***************************
async function getArea() {
  closeSideNav();
  searchContainer.innerHTML = "";
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  data = await response.json();
  allArea = data.meals;
  displayDataArea();
}
// // // display data area
function displayDataArea() {
  cartona = "";
  for (let i = 0; i < allArea.length; i++) {
    cartona += `
<div class="col-md-3">
            <div onclick="getAreaData('${allArea[i].strArea}')" class="Countries text-center text-white m-3">
              <i class="fa-solid fa-house-laptop fs-icon-countries"></i>
              <h3 class="fs-name-countries">${allArea[i].strArea}</h3>
            </div>
          </div>
`;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

async function getAreaData(dataArea) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${dataArea}`
  );
  data = await response.json();
  allArea = data.meals;
  displayDataMeal(data.meals);
}
getAreaData();

//********************** api ingredients***************************
async function getIngredients() {
  closeSideNav();
  searchContainer.innerHTML = "";
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  data = await response.json();
  allIngredients = data.meals;
  displayDataIngredients(data.meals.slice(0, 20));
}
getIngredients();

// // // // display data ingredients
function displayDataIngredients(ingredients) {
  cartona = "";
  for (let i = 0; i < ingredients.length; i++) {
    cartona += `
 <div class="col-md-3">
            <div onclick="getIngredientsData('${
              ingredients[i].strIngredient
            }')" class="ingredients-cards text-white text-center my-4">
              <i class="fa-solid fa-drumstick-bite icon-checken"></i>
              <h3>${ingredients[i].strIngredient}</h3>
              <p>${ingredients[i].strDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}
              </p>
            </div>
          </div>
  `;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

async function getIngredientsData(ingredientsData) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsData}`
  );
  data = await response.json();
  allIngredients = data.meals;
  displayDataMeal(data.meals);
}

// *******************************************************
async function getDetails(details) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`
  );
  data = await response.json();
  console.log(data);
}

function displayDetails(meal) {
  cartona = "";
  for (let i = 0; i < meal.length; i++) {
    cartona += `
    <div class="col-md-4">
            <div class="photo">
              <img
                src="images/58oia61564916529.jpg"
                class="w-100 rounded-3"
                alt=""
              />
            </div>
            <h2 class="text-white">Corba</h2>
          </div>
          <div class="col-md-8">
            <div class="description">
              <h2>Instructions</h2>
              <p>
                Pick through your lentils for any foreign debris, rinse them 2
                or 3 times, drain, and set aside. Fair warning, this will
                probably turn your lentils into a solid block that you’ll have
                to break up later In a large pot over medium-high heat, sauté
                the olive oil and the onion with a pinch of salt for about 3
                minutes, then add the carrots and cook for another 3 minutes.
                Add the tomato paste and stir it around for around 1 minute. Now
                add the cumin, paprika, mint, thyme, black pepper, and red
                pepper as quickly as you can and stir for 10 seconds to bloom
                the spices. Congratulate yourself on how amazing your house now
                smells. Immediately add the lentils, water, broth, and salt.
                Bring the soup to a (gentle) boil. After it has come to a boil,
                reduce heat to medium-low, cover the pot halfway, and cook for
                15-20 minutes or until the lentils have fallen apart and the
                carrots are completely cooked. After the soup has cooked and the
                lentils are tender, blend the soup either in a blender or simply
                use a hand blender to reach the consistency you desire. Taste
                for seasoning and add more salt if necessary. Serve with
                crushed-up crackers, torn up bread, or something else to add
                some extra thickness. You could also use a traditional thickener
                (like cornstarch or flour), but I prefer to add crackers for
                some texture and saltiness. Makes great leftovers, stays good in
                the fridge for about a week.
              </p>
              <h3><span>Area : Turkish </span></h3>
              <h3><span>Category : Side </span></h3>
              <h3><span>Recipes : </span></h3>
              <ul class="list-unstyled d-flex flex-wrap">
                <li class="alert alert-info m-2 p-2">1 cup Lentils</li>
                <li class="alert alert-info m-2 p-2">1 cup Lentils</li>
                <li class="alert alert-info m-2 p-2">1 cup Lentils</li>
                <li class="alert alert-info m-2 p-2">1 cup Lentils</li>
                <li class="alert alert-info m-2 p-2">1 cup Lentils</li>
                <li class="alert alert-info m-2 p-2">1 cup Lentils</li>
              </ul>
              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex flex-wrap">
                <li class="alert alert-danger m-2 p-2">1 cup Lentils</li>
                <li class="alert alert-danger m-2 p-2">1 cup Lentils</li>
                <li class="alert alert-danger m-2 p-2">1 cup Lentils</li>
                <li class="alert alert-danger m-2 p-2">1 cup Lentils</li>
                <li class="alert alert-danger m-2 p-2">1 cup Lentils</li>
              </ul>
              <button
                class="btn btn-success rounded-3 py-2 px-3 text-white"
                type="button"
              >
                Source
              </button>
              <button
                class="btn btn-danger rounded-3 p-2 text-white"
                type="button"
              >
                Youtube
              </button>
            </div>
          </div>

    `;
  }
  document.getElementById("rowData").innerHTML = cartona;
}
let text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, ullam! Assumenda, hic maiores? Ratione optio voluptas quidem voluptatem eligendi, aut accusamus vitae perspiciatis aspernatur quod atque aliquid, sed cum commodi.";

// console.log(text.split(" ").slice(0, 20).join(" "));

function displayMealDetails(meal) {
  let ingredient = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredient += `<li class="alert alert-info m-2 p-2">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>
`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
    <li class="alert alert-danger m-2 p-2">${tags[i]}</li>
    `;
  }

  let cartona = `
   <div class="col-md-4">
            <div class="photo text-white">
              <img
                src="${meal.strMealThumb}"
                class="w-100 rounded-3"
                alt=""
              />
            </div>
            <h2 class="text-white">Corba</h2>
          </div>
          <div class="col-md-8">
            <div class="description">
              <h2>${meal.strMeal}</h2>
              <p>
               ${meal.strInstructions}
              </p>
              <h3><span>Area : Turkish </span>${meal.strArea}</h3>
              <h3><span>Category : Side </span>${meal.strCategory}</h3>
              <h3><span>Recipes : </span></h3>
              <ul class="list-unstyled d-flex flex-wrap">
               ${ingredient}
              </ul>
              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex flex-wrap">
            ${tagsStr}
              </ul>
              <a
              target="_blank" href="${meal.strYoutube}" class="btn btn-success rounded-3 py-2 px-3 text-white">
                Source
              </a>
              <a
               target="_blank" href="${meal.strSource}" class="btn btn-danger rounded-3 p-2 text-white">
                Youtube
              </a>
            </div>
          </div>
`;
  rowData.innerHTML = cartona;
}

async function getMealDetails(mealId) {
  searchContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}

// Contacts- Us

let submitBtn;

function showContacts() {
  closeSideNav();
  searchContainer.innerHTML = "";
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="name" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="email" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phone" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="age" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="password" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password Minimum eight characters, at least one letter and one number:
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repassword" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

// regex Inputs

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.\d)(?=.[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

// Validation Inputs

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById("name").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("name").classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document.getElementById("email").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("email").classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document.getElementById("phone").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("phone").classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document.getElementById("age").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("age").classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("password")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("password")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repassword")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repassword")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

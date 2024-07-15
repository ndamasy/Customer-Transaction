

//fetch json file

fetch('data.json').then(function (response) {
    return response.json
}).then(function (obj) {
    console.log(obj)
}).catch(function (err) {
    console.error(err)
})

function displayCustomerData(customerData) {
    var customerInfo = '';
    if (allMealsImg.meals && allMealsImg.meals.length > 0) {
        for (let i = 0; i < allMealsImg.meals.length; i++) {
            cartona += `
                    <div class="col-lg-3">
                    <div class="home-photo" data-id="${allMealsImg.meals[i].idMeal}">
                    <img src="${allMealsImg.meals[i].strMealThumb}" class="w-100" >
                   <div class="overlay">
                    <h2>${allMealsImg.meals[i].strMeal}</h2>
                     </div>
                     </div>
                         </div>
                    `
        }
    }

    homeAllMealsPhoto.innerHTML = cartona;
}

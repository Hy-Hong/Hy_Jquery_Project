function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

$(document).ready(function(){
getApi();
$('#selection').on('change', function(){
    var recipeId = $('#selection').val();
    eachRecipe(recipeId);
})
});

// Function to getApi
function getApi(){
$.ajax({
    dataType: 'json',
    url: getUrl(),
    success: (data) => chooseRecipe(data.recipes),
    error: () => console.log("Cannot get data"),
});
}

var allData = [];
function chooseRecipe(recipe){
allData = recipe;
var option = "";
recipe.forEach(item => {
    option += `
    <option value="${item.id}">${item.name}</option>
    `;
});
$('#selection').append(option);
}

// function eachRecipe
function eachRecipe(id){
allData.forEach(item => {
    if(item.id == id){
        //showRecipe()
        showRecipe(item.name, item.iconUrl, item.nbGuests, item.instructions);
        //shhowIngredient()
        showIngredient(item.ingredients);
        //showStep()....
    }
});
}

//function showRecipe
function showRecipe(name,img,nbGuests,instructions){
var result = "";
result += `
<img src="${img}" width="100">
<h2>${name}</h2>
<h2>${nbGuests}</h2>
<h2>${instructions}</h2>
`;
$('#recipe_result').html(result);
}

//function showIngredient
function showIngredient(ing){
var resultIngredient = "";
ing.forEach(item => {
    resultIngredient += `
    <tr>
        <td><img src="${item.iconUrl}" width="100"></td>
        <td><h4>${item.name}</h4></td>
        <td><h4>${item.quantity}</h4></td>
        <td><h4>${item.unit}</h4></td>
    </tr>
    `;
});
$('#recipe_result').append(resultIngredient);

}
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
//==================================================================================================================//
// Function to getApi
//==================================================================================================================//
function getApi(){
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot get data"),
    });
    }
//==================================================================================================================//
// default function code
//==================================================================================================================//
$(document).ready(function(){
getApi();
$('#selection').on('change', function(){
    var recipeId = $('#selection').val();
    getRecipe(recipeId);
})

//==================================================================================================================//
// function for minus and add members
//==================================================================================================================//
$('#minus').on('click', function() {
    minusNumber();
    var plus = $('#member').val();
    var recipeId = $('#selection').val();
    updateRecipe(recipeId,plus);
});
$('#plus').on('click', function() {
    plusNumber ();
    var plus = $('#member').val();
    var recipeId = $('#selection').val();
    updateRecipe(recipeId,plus);
});
});

//==================================================================================================================//
// function to choose recipe
//==================================================================================================================//
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

//==================================================================================================================//
// function to get recipes
//==================================================================================================================//
$('#appear').hide();
$('#hideperson').hide();
$('#instuction').hide();
$('#ingredient').hide();

function getRecipe(myId){
allData.forEach(item => {
    if(item.id == myId){
        //showRecipe()
        showRecipe(item.name, item.iconUrl, item.nbGuests, item.instructions);
        //shhowIngredient()
        showIngredient(item.ingredients);
        //showStep()
        showStep(item.instructions);
        $('#appear').show();
        $('#hideperson').show();
        $('#instuction').show();
        $('#ingredient').show();
        // show numbers to input
        $('#member').val(item.nbGuests);
        oldNbGuest = $('#member').val();
    }
});
}

//==================================================================================================================//
//function to show recipes
//==================================================================================================================//
function showRecipe(name,img){
var result = "";
result += `
    <div class="card text-primary">
        <div class="card-header">${name}</div>
        <div class="card-body">
            <img src="${img}" class="img-fluid">
        </div>
    </div>
`;
$('#recipes').html(result);
}

//==================================================================================================================//
//function to update recipes
//==================================================================================================================//
function updateRecipe(myId,plus){
    allData.forEach(item => {
        if(item.id == myId){
            changeIngredient(item.ingredients,plus);
        }
    });
}

//==================================================================================================================//
//function show Ingredients
//==================================================================================================================//
function showIngredient(ing){
var resultIngredient = "";
ing.forEach(item => {
    resultIngredient += `
                <tr class="bg-secondary text-white">
                    <td><img src="${item.iconUrl}" width="100"></td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit[0]}</td>
                </tr>
    `;
    $('#ingredientId').html(resultIngredient);
});
}

//==================================================================================================================//
// function update Ingredients
//==================================================================================================================//
function changeIngredient(ing,plus){
    var resultUpdateIngredient ="";
    ing.forEach(item =>{
    var addIngredient = item.quantity * parseInt(plus) / oldNbGuest;
    resultUpdateIngredient +=`
        <tr class="bg-secondary text-white">
            <td><img src="${item.iconUrl}" width="100"></td>
            <td>${item.name}</td>
            <td>${addIngredient}</td>
            <td>${item.unit[0]}</td>
        </tr>
    `;
    })
    $('#ingredientId').html(resultUpdateIngredient);
}

//==================================================================================================================//
// function show cutting the steps
//==================================================================================================================//
function showStep(step){
    var cutStep = step.split("<step>");
    resultStep = ""; 
    for(let i = 1; i < cutStep.length; i++){
        resultStep += `
        <tr class="bg-secondary text-white">
            <td><p class="text-primary">Step ${i}</p></td>
            <td><p>${cutStep[i]}</p></td>
        </tr>
    `;
        $('#step').html(resultStep);
    }
}

//==================================================================================================================//
// function addMembers
//==================================================================================================================//
var minusNumber = () => {
    var plus = $('#member').val();
    let connverMinus = parseInt(plus) -1;
    if(connverMinus >= 0 ){
        $('#member').val(connverMinus);
        
    }
}
var plusNumber = () => {
    var plus = $('#member').val();
    var connverPlus = parseInt(plus) +1;
    if(connverPlus <= 15){
        $('#member').val(connverPlus);
    }
}
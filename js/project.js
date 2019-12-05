var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
$(document).ready( () =>{
    $('#selection').on('change', () => {
        var recipe = $('#selection').val();
        selectRecipe(recipe);
    });
});
// Get api [arrow function]
var getAPI = (api) => {
    $.ajax({
        dataType: 'json',
        url: api,
        success: (data) => getRecipe(data),
        error: () => console.error("Cannot request data")
    });
}
// Get recipe [name function]
function getRecipe(datas){
    datas.recipe.forEach(el => {
        // The recipe can get here example: el.name
        getIngredients(el); // Get all ingredients
        
    });
}

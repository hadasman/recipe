document.addEventListener('DOMContentLoaded', function() {
    var recipeSelect = document.getElementById('recipeSelect');
    if (!recipeSelect) return;
    
    // Populate dropdown
    fetch('files.json')
        .then(response => response.json())
        .then(files => {
            recipeSelect.innerHTML = '<option value="">Choose a recipe...</option>';
            files.forEach(function(recipe, index) {
                var opt = document.createElement('option');
                opt.value = recipe.name;
                // Remove .txt extension from display text and add recipe icon
                var displayText = recipe.name.replace(/\.txt$/, '');
                var icon = recipe.icon || '🥘'; // Use stored icon or default
                opt.textContent = icon + ' ' + displayText;
                opt.setAttribute('data-icon', icon);
                opt.setAttribute('data-index', index);
                recipeSelect.appendChild(opt);
            });
            // Add upload option
            var uploadOpt = document.createElement('option');
            uploadOpt.value = 'upload';
            uploadOpt.textContent = '📁 Upload your own file';
            recipeSelect.appendChild(uploadOpt);
        })
        .catch(err => {
            recipeSelect.innerHTML = '<option value="">Could not load recipes</option>';
            console.error('Error loading files.json:', err);
        });
    
    // Add event listener for dropdown selection
    recipeSelect.addEventListener('change', function() {
        var selectedFile = this.value;
        if (selectedFile === 'upload') {
            // Trigger file upload directly
            document.getElementById('customFileButton').click();
            // Reset dropdown to default
            this.value = '';
        } else if (selectedFile) {
            console.log('Selected recipe:', selectedFile);
            loadRecipeFile(selectedFile);
        }
    });
});

// Function to load a specific recipe file
function loadRecipeFile(fileName) {
    console.log('Loading file:', fileName);
    
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(content => {
            console.log('File loaded successfully, length:', content.length);
            loadRecipeFromContent(content);
            // Scroll to the recipe
            window.scrollTo(0, 0);
        })
        .catch(error => {
            console.error('Error loading file:', error);
            alert(`Could not load recipe file: ${fileName}\nError: ${error.message}`);
        });
}

// Function to load recipe from file content
function loadRecipeFromContent(content) {
    var lines = content.split('\n').map(function(line){
        return line.split(',');
    });

    // Clear previous content
    var existingIngredients = document.querySelector('.ingredient_list');
    var existingButtons = document.querySelector('.buttons-container');
    if (existingIngredients) existingIngredients.remove();
    if (existingButtons) existingButtons.remove();

    var ingredients_div = document.createElement("ul");
    ingredients_div.dir = "rtl";
    ingredients_div.className = "ingredient_list";
    var ingredients = lines[0];
    ingredients.forEach(ingredient =>{
        var ingredients_elem = document.createElement("li");
        ingredients_elem.textContent = ingredient;
        ingredients_elem.className = "ingredient_list_item";
        ingredients_div.appendChild(ingredients_elem);
    });

    var buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons-container";
    buttonsDiv.style.width = "100%";
    buttonsDiv.style.maxWidth = "600px";
    
    for (var i=1; i < lines.length ; i++){
        var button = document.createElement('input');
        button.type = 'button';
        button.value = lines[i];
        button.onclick = function(stepNum) {
            return function() {
                next_item(stepNum.toString());
            };
        }(i+1);
        button.className = "step_button";
        button.id = `step_button${i+1}`;
        button.style.OnOff = "On";

        var checkDiv = document.createElement("div");
        checkDiv.innerHTML = '&#10003';
        checkDiv.style.color = 'green';
        checkDiv.style.fontSize = '24px';
        checkDiv.style.display = "none";
        checkDiv.style.marginLeft = "10px";
        checkDiv.style.flexShrink = "0";
        checkDiv.id = `check_div${i+1}`;
        
        var buttonDiv = document.createElement("div");
        buttonDiv.style.display = "flex";
        buttonDiv.style.alignItems = "center";
        buttonDiv.style.width = "100%";
        buttonDiv.style.marginBottom = "10px";
        
        buttonDiv.appendChild(button);
        buttonDiv.appendChild(checkDiv);
        buttonsDiv.appendChild(buttonDiv);
    }

    document.body.appendChild(ingredients_div);
    document.body.appendChild(buttonsDiv);
    num_lines = lines.length;
}

// Function to handle step completion
var line_number = 0;
function next_item(n){
    line_number = n;
    if (parseInt(line_number) === num_lines){
        Notification.requestPermission().then(permission => {
            if (permission==="granted"){
                console.log(permission);
                const notification = new Notification("Recipe Completed!", {body: "Recipe Completed!", title:"..."});
            }
        });
    } else {            
        console.log(line_number);
        console.log(`button${line_number}`);
        var targetButton = document.querySelector(`#step_button${line_number}`);
        var targetCheckMark = document.querySelector(`#check_div${line_number}`);
        if (targetButton.style.OnOff!="Off"){
            targetButton.style.color = "#F0DAC5";
            targetButton.style.minHeight = "0";
            targetButton.style.padding = "0";
            targetButton.style.margin = "0";
            targetButton.style.OnOff = "Off";
            targetCheckMark.style.display = 'inline-block';
            console.log(document.querySelector(`#step_button${line_number}`).style.OnOff);
        } else {
            targetButton.style.color = "#c576ac";
            targetButton.style.minHeight = "";
            targetButton.style.padding = "";
            targetButton.style.margin = "";
            targetButton.style.OnOff = "On";
            targetCheckMark.style.display = "none";
        }   
    }
}

// File upload handler
var input = document.querySelector('input');
input.addEventListener('change', function(e){
    var reader = new FileReader();
    reader.onload = function() {
        loadRecipeFromContent(reader.result);
    };
    reader.readAsText(input.files[0]);
}, false);
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

    // Add the "בתיאבון!" button as a static celebratory button
    var bonAppetitButton = document.createElement('input');
    bonAppetitButton.type = 'button';
    bonAppetitButton.value = "בתיאבון! 🍽️";
    bonAppetitButton.className = "step_button bon-appetit-step";
    bonAppetitButton.style.cursor = "pointer";
    
    // Add click event for confetti and emoji animation
    bonAppetitButton.addEventListener('click', function() {
        createConfetti();
        animateFoodEmoji();
    });

    var buttonDiv = document.createElement("div");
    buttonDiv.style.display = "flex";
    buttonDiv.style.alignItems = "center";
    buttonDiv.style.width = "100%";
    buttonDiv.style.marginBottom = "10px";
    
    buttonDiv.appendChild(bonAppetitButton);
    buttonsDiv.appendChild(buttonDiv);
    
    document.body.appendChild(ingredients_div);
    document.body.appendChild(buttonsDiv);
    num_lines = lines.length;
}

// Function to handle step completion
var line_number = 0;
function next_item(n){
    line_number = n;
    
    // Handle button size change and checkmark for all buttons
    console.log(`button${line_number}`);
    var targetButton = document.querySelector(`#step_button${line_number}`);
    var targetCheckMark = document.querySelector(`#check_div${line_number}`);
    
    if (targetButton && targetCheckMark) {
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

// Function to create confetti animation
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const confettiCount = 500;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = -10 + 'px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Function to animate food emoji
function animateFoodEmoji() {
    const recipeSelect = document.getElementById('recipeSelect');
    const selectedOption = recipeSelect.options[recipeSelect.selectedIndex];
    
    if (selectedOption && selectedOption.getAttribute('data-icon')) {
        const icon = selectedOption.getAttribute('data-icon');
        const emojiElement = document.createElement('div');
        emojiElement.textContent = icon;
        emojiElement.style.position = 'fixed';
        emojiElement.style.fontSize = '60px';
        emojiElement.style.left = '50%';
        emojiElement.style.top = '50%';
        emojiElement.style.transform = 'translate(-50%, -50%)';
        emojiElement.style.zIndex = '10000';
        emojiElement.style.pointerEvents = 'none';
        emojiElement.style.transition = 'all 0.5s ease-in-out';
        
        document.body.appendChild(emojiElement);
        
        // Animate the emoji
        setTimeout(() => {
            emojiElement.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(360deg)';
        }, 100);
        
        setTimeout(() => {
            emojiElement.style.transform = 'translate(-50%, -50%) scale(1) rotate(720deg)';
        }, 600);
        
        setTimeout(() => {
            emojiElement.style.opacity = '0';
            emojiElement.style.transform = 'translate(-50%, -50%) scale(0.5) rotate(1080deg)';
        }, 1100);
        
        setTimeout(() => {
            emojiElement.remove();
        }, 1600);
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
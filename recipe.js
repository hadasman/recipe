Notification.requestPermission();
if (Notification.permission!=="granted"){
	Notification.requestPermission();
}

var line_number = 0;
function next_item(n){
	line_number = `${n}`;
	if (line_number==num_lines){
		Notification.requestPermission().then(permission => {
			if (permission==="granted"){
				console.log(permission);
				const notification = new Notification("Recipe Completed!", {body: "Recipe Completed!", title:"..."})
				}
		})}
	else{			
			console.log(line_number);
			console.log(`button${line_number}`);
            const targetButton = document.querySelector(`#step_button${line_number}`);
            const targetCheckMark = document.querySelector(`#check_div${line_number}`);
			if (targetButton.style.OnOff!="Off"){
					targetButton.style.color = "#F0DAC5";
					targetButton.style.height = "0";
					targetButton.style.OnOff = "Off";
					targetCheckMark.style.display = 'inline-block'

					console.log(document.querySelector(`#step_button${line_number}`).style.OnOff);
			}else{
					targetButton.style.color = "#c576ac";
					targetButton.style.height = "100px";
					targetButton.style.OnOff = "On";
                    targetCheckMark.style.display = "none";

			}	
		}
	}

var input = document.querySelector('input')
input.addEventListener('change', function(e){
var reader = new FileReader();

reader.onload = function() {
    const lines = reader.result.split('\n').map(function(line){
        return line.split(',');
    })

    const ingredients_div = document.createElement("ul");
    ingredients_div.dir = "rtl"
    ingredients_div.className = "ingredient_list"
    const ingredients = lines[0]
    ingredients.forEach(ingredient =>{
        const ingredients_elem = document.createElement("li")
        ingredients_elem.textContent = ingredient
        ingredients_elem.className = "ingredient_list_item"
        ingredients_div.appendChild(ingredients_elem)
    })

    const buttonsDiv = document.createElement("div");
    for (var i=1; i < lines.length ; i++){
        var button = document.createElement('input');
        button.type = 'button';
        button.value = lines[i];
        const st = `${i+1}`;
        button.onclick = function () {
            next_item(st);
        };
        button.className = "step_button";
        button.style.position = "relative";
        button.style.right = "2px";
        button.id = `step_button${i+1}`;

        var checkDiv = document.createElement("div")
        checkDiv.innerHTML = '&#10003'
        checkDiv.style.color = 'green';
        checkDiv.style.fontSize = '24px';
        checkDiv.style.display = "none";
        checkDiv.id = `check_div${i+1}`
        const buttonDiv = document.createElement("div");
        buttonDiv.appendChild(button);
        buttonDiv.appendChild(checkDiv);
        buttonDiv.style.display = "flex";
        buttonsDiv.appendChild(buttonDiv);
    }

document.body.appendChild(ingredients_div);
document.body.appendChild(buttonsDiv);
num_lines = lines.length;
}
reader.readAsText(input.files[0]);

}, false)
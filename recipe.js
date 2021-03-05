Notification.requestPermission();
if (Notification.permission!=="granted"){
	Notification.requestPermission();
}
function template(){
	// document.getElementById("minutes").innerHTML = minutes;
	// document.getElementById("seconds").innerHTML = seconds;
}
var item_number = 0;
var tot_num_items = 4;
function next_item(){
	
	if (item_number>=tot_num_items){
		Notification.requestPermission().then(permission => {
			if (permission==="granted"){
				console.log(permission);
				const notification = new Notification("Recipe Completed!", {body: "Recipe Completed!", title:"..."})
				}
		})}
	else{
		item_number = item_number + 1;
		console.log(`button${item_number}`);

		// Buttons
		document.querySelector(`#button${item_number}`).style.color = "#1C2340";
		}
	}








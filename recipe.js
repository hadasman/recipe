Notification.requestPermission();
if (Notification.permission!=="granted"){
	Notification.requestPermission();
}
function template(){
	// document.getElementById("minutes").innerHTML = minutes;
	// document.getElementById("seconds").innerHTML = seconds;
}
var line_number = 0;
function next_item(n){
	if (line_number==num_lines-1){
		Notification.requestPermission().then(permission => {
			if (permission==="granted"){
				console.log(permission);
				const notification = new Notification("Recipe Completed!", {body: "Recipe Completed!", title:"..."})
				}
		})}
	else{
			line_number = `${n}`;
			console.log(line_number);
			console.log(`button${line_number}`);

			if (document.querySelector(`#step_button${line_number}`).style.OnOff!="Off"){		// line_number = line_number + 1;
			
					// Buttons
					document.querySelector(`#step_button${line_number}`).style.color = "#1C2340";
					document.querySelector(`#step_button${line_number}`).style.OnOff = "Off";
					console.log(document.querySelector(`#step_button${line_number}`).style.OnOff);
			}else{
					document.querySelector(`#step_button${line_number}`).style.color = "#AEF359";
					document.querySelector(`#step_button${line_number}`).style.OnOff = "On";

			}	
		}
	}


var input = document.querySelector('input')


input.addEventListener('change', function(e){
	var reader = new FileReader();

	reader.onload = function() {
		lines = reader.result.split('\n').map(function(line){
			return line.split(',');
		})

		// var docFrag = document.createDocumentFragment();
		const newDiv = document.createElement("div");
		for (var i=0; i < lines.length ; i++){
		     var elem = document.createElement('input');
		     elem.type = 'button';
		     elem.value = lines[i];
		     const st = `${i+1}`;
		     elem.onclick = function () {
    next_item(st);
};;
		     elem.className = "wrapped_div fas fa-wave-square fa-2x justify-content-center align-items-center";
		     elem.style.position = "relative";
		     elem.style.right = "2px";
		     elem.style.float = "center";
		     elem.id = `step_button${i+1}`;		     		     
		     elem.style.background = "#1C2340";
		     // elem.style.width = "400px";
		     elem.style.height = "100px";
		     // elem.display = "inline-block";
		     // elem.style.overflowWrap = "anywhere";
		     // elem.style.wordWrap = "break-word";
		     // elem.style.lineBreak = "strict";


		     // docFrag.appendChild(elem);
		     newDiv.appendChild(elem);
		}
		// document.body.appendChild(docFrag);
		document.body.appendChild(newDiv);
		num_lines = lines.length;
	}
	reader.readAsText(input.files[0]);	

}, false)


// document.getElementById("file").addEventListener('change', function(){
// 	var fr = new FileReader();
// 	fr.onload = function(){
// 		document.getElementById("FileContents").textContent = this.result;
// 	}
// 	fr.readAsText(this.files[0]);
// })


// let input = document.querySelector('input');
// let textarea = document.querySelector('textarea');
 
// input.addEventListener('change', () => {
//     let files = input.files;
 
//     if(files.length == 0) return;
 
//     const file = files[0];
 
//     let reader = new FileReader();
 
//     reader.onload = (e) => {
//         const file = e.target.result;
//         const lines = file.split(/\r\n|\n/);
//         textarea.value = lines.join('\n');
//     };
 
//     reader.onerror = (e) => alert(e.target.error.name);
 
//     reader.readAsText(file); 
    
// });


// console.log(document.querySelector('input'));
// var input = document.querySelector('input');
// input.addEventListener('change', () => {
// 	let files = input.files;
	
// 	if (files.length==0) return;
// 	const file = files[0];
// 	let reader = new FileReader();
// 	reader.onload = (e) => {
// 		const file = e.file.result;
// 		const lines = lines.split(/\r\n|\n/);
// 		console.log(lines.join('\n'));
// 	};
// 	reader.readAsText(file);

// });


// if (document.getElementById('file')){
// document.getElementById('file').onchange = function(){

//   var file = this.files[0];

//   var reader = new FileReader();
//   reader.onload = function(progressEvent){
//     // Entire file
//     console.log(this.result);

//     // By lines
//     var lines = this.result.split('\n');
//     for(var line = 0; line < lines.length; line++){
//       console.log(lines[line]);
//     }
//   };
//   reader.readAsText(file);
// 	};



// }



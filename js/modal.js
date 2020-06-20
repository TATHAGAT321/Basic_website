
var x = document.querySelectorAll(".validate");
var y = document.querySelectorAll(".form-control.entry");
var z = document.querySelector("#submitit");
function validation(){
	for(var j=0; j<y.length; j++)
      {
         console.log("data-msg" + y[j].getAttribute("data-msg"));
      	console.log(y[j]); 
         if(y[j].getAttribute("type") != "email")
         {
         	if(!(y[j].getAttribute("minLength") <= y[j].value.length))
         	{
         		x[j].innerHTML = y[j].getAttribute("data-msg");
               x[j].style.display = "block";
         		///console.log(x[j].innerHTML);
              // y[j].setCustomValidity("");
         	}	
            else{
               x[j].innerHTML = "";
            }
         }
         else{
             var p=y[j].value;  
             var atposition=p.indexOf("@");  
             var dotposition=p.lastIndexOf(".");  
             if (atposition<1 || dotposition<atposition+2 || dotposition+2>=p.length)  
             {
               x[j].innerHTML = y[j].getAttribute("data-msg");
               x[j].style.display = "block";
               //console.log(x[j].innerHTML);
              // y[j].setCustomValidity("");
             }
             else{
               x[j].innerHTML = "";
             }
         }  
       
      }
}
z.addEventListener("click",validation);
//remote
// let apiBaseUrl = "https://flaskp-email.herokuapp.com";

// local
// let app = 
let apiBaseUrl = "http://127.0.0.1:5000"

let modalId = "#exampleModal6";
sendEmail = function() {
  let payload = collectFormData(modalId);
  payload['price'] =  $(modalId+' #pricetag').text();
  console.log(payload);
  call(payload); 
}


// Vlaidate contact form
submitContact = function(){
  $('#submitit').click(function(){

    // check validation
    let priceSelector = $('.validate');
    let validatorSelector = $('.form-control.entry');
    if(!isValid(priceSelector,validatorSelector)) {
      console.error("validation failed");
      return false;
    };

    // send mail
    sendEmail();
    $('#exampleModal6').modal('hide');
    setTimeout( function(){
      alert(" Sucess!Thank you for contacting us!!");},500);
    // alert("Thank you for contacting us!!");
  });
}

// validate price query
submitPriceQuery = function(event){
  
  // check valdation
  $('#dosubmit').click(function(event){
    event.preventDefault();
    let priceSelector = $('.validateprice');
    let validatorSelector = $(".form-control.filterprice");
    if(!isValid(priceSelector,validatorSelector)) {
      console.error("validation failed");
      return false;
    };
    // send email
    sendEmail();
    $('#exampleModal7').modal('hide');
    setTimeout( function(){
      alert(" Sucess!Thank you for contacting us!!");},500);
    // alert("Thank you for contacting us!!");
    
  });
}

// set modal title dynamically
setModalTitle = function() {

  $('.price-action').click(function(event) {
    event.preventDefault(); 
    let title = $(this).parent().find('.price-title') ? 
                $(this).parent().find('.price-title').text() : "Contact us";

     $('#pricetag').html(title + '<button type="button" class="close" id = "closebutton" data-dismiss="modal" aria-label="Close" style="color:#fff !important; opacity:1;"><span aria-hidden="true" style="padding-right:20px;">&times;</span></button>');
  });
}

lisentModal = function() {
 $('.modal').on('shown.bs.modal', function(){
    modalId = "#"+ ($(this).attr('id'));
    console.log(modalId)
 });
}


collectFormData = function(parentId){
  let data = {};
  let mappings = getBaseSelectorMapping();
  for(let key in mappings) {
    if(!$(parentId+" "+mappings[key]).val()) continue;
    data[key] = $(parentId+" "+mappings[key]).val();
  }

  return data;
}

function getBaseSelectorMapping(additionalFields) {
  let mappings = {
    'firstName' : "#first_name",    
    'lastName' : "#last_name",
    'email' : "#email",
    'phone' : "#phone",
    'message': "#message",
  };

  if(additionalFields && Object.keys(additionalFields).length
   && Object.values(additionalFields).length) {
    mappings = Object.assign(mappings, additionalFields);
  }

  return mappings;
}

// call email api
function call(payload) {
  let type="";
  if(payload.price === "")
  {
        type = "Contact";
  }
  else
  {
     type = "plan-" + payload.price;
  }

  let content = {
       "name" : payload.firstName + " " + payload.lastName,
       "email" : payload.email,
       "phone" : payload.phone,
       "message" : payload.message,
       "type"  : type,
       
};
// console.log(content.type);

var settings = {
  "url": apiBaseUrl+"/contact",
  "method": "POST",

  // "timeout": 0,
  "headers": { 
    "Content-Type": "application/json",
    "Authorization": "Basic Njg3OGVlZGIwNjA3MmRiZTgyNDY0ZTU4NDY2OGE2MTQ6N2Q5NWI3YWMzMDA1ODZiYmU0OTU1OWFkYmU0NjUxOTg="
  },
  "data": JSON.stringify(content),
  "dataType": "JSON",
  crossDomain: true,
};

$.ajax(settings).done(function (response) {
  console.log(response);
  
});

}

/**
 Generic function for validation
**/
function isValid(x,y) {
      let status = true;
  for(var j=0; j<y.length; j++) {
    x[j].innerHTML = '';
         if(y[j].getAttribute("type") != "email")
         {
              if(!(y[j].getAttribute("minLength") <= y[j].value.length))
              {
                x[j].innerHTML = y[j].getAttribute("data-msg");
                   x[j].style.display = "block";
                   status = false;
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
               status = false;
             }
         }  
       
      }
      return status;
}



$('#pr').click(function(e) {
  e.preventDefault();

  console.log("here");

  call({
    "name" : "Tathagat",
    "nickname" : "Monu"
  })
});


(function initScript() {
   submitContact();
   submitPriceQuery();
   setModalTitle();
   lisentModal();
   // refreshFunction();
})();


// Drop down of plans

$(document).ready(function(){
    $("select").change(function(){
        var selectedPlan = $(this).children("option:selected").val();
        if( selectedPlan === "GRAND")
        {
          $(".price-cost").children("strong").html("299");
          $(".price-points").children("li.stages").html('<i class="fa fa-check" aria-hidden="true"></i> 5 stages of Purification');
        }
        else if(selectedPlan === "PREMIUM")
        {
          $(".price-cost").children("strong").html("399");
          $(".price-points").children("li.stages").html('<i class="fa fa-check" aria-hidden="true"></i> 7 stages of Purification');
        }
        else if(selectedPlan === "SUPREME")
        {
          $(".price-cost").children("strong").html("499");
          $(".price-points").children("li.stages").html('<i class="fa fa-check" aria-hidden="true"></i> 9 stages of Purification');
        }
    });
});

// smooth-scroll Property
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      },800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

// top scroll button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 365 || document.documentElement.scrollTop > 365) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

$('#breadcrumb').click(function(e) {
  e.preventDefault();
  let currentClassAttr = $('#iconMenu').attr("class");
  let newClassAttr = currentClassAttr == "fa fa-times" ? "fa fa-bars" : "fa fa-times"
  $('#iconMenu').attr("class", newClassAttr);
  $('#navbarSupportedContent').toggle("hide");
});

// When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }

// $('#closebutton').click(function(e){
//   $('#exampleModal7').on('hidden.bs.modal', function () {
//           location.reload();
//     });

// });
// $('#exampleModal7').on('hidden.bs.modal', function () {
//        setTimeout(function()
//        {location.reload();} ,1000);
//   }); 
// $('#exampleModal6').on('hidden.bs.modal', function () {
//        setTimeout(function()
//        {location.reload();} ,1000);
//   }); 

$(function(){
    // Remove the # from the hash, as different browsers may or may not include it
    var hash = location.hash.replace('#','');

    if(hash != ''){
        // Show the hash if it's set
        // alert(hash);

        // Clear the hash in the URL
        location.hash = '';
    }
});
$(document).bind("hashchange", function(){
    // Anchor has changed.
});





// middileware 

app.use(function(req,res, next){
// inside route 

if(!req.session || !req.session.user) {
   res.redirect('308', '/login');
}

res.redirect('/home');

// what is permanenet redirect, temp redirect, what code you should use 
// while redirecting to this 


app.get("/login", function() {
  res.render("login"); 
});

app.post("/login", function() {
  let error = "server eroor";
  // validate and format input
  let input  = validator.getUserCredntials(req);
  let response = DbService.checkUser(input);

  if(response == null) {
    res.render("login", {"error" : "username or password is wrong"});
    return false;
  }

  req.session.user = response;

  res.redirect("/home");

})


app.get("/home", function() {

  if(!req.session && !req.session.user) {
    // redirect login
  }

  let response = DbService.fetchUser(req.session.user.id);
  response = Util.formatUserResponse(z)

  res.render("home", )

});


})



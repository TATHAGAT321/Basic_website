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

  })
}

// validate price query
submitPriceQuery = function(){
  
  // check valdation
  $('#dosubmit').click(function(event){
    let priceSelector = $('.validateprice');
    let validatorSelector = $(".form-control.filterprice");
    if(!isValid(priceSelector,validatorSelector)) {
      console.error("validation failed");
      return false;
    };

    // send email
    sendEmail();

  })
}

// set modal title dynamically
setModalTitle = function() {

  $('.price-action').click(function(event) {
    event.preventDefault(); 
    let title = $(this).parent().find('.price-title') ? 
                $(this).parent().find('.price-title').text() : "Contact us";

     $('#pricetag').html(title + '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color:#fff !important; opacity:1;"><span aria-hidden="true" style="padding-right:20px;">&times;</span></button>');
  });
};

lisentModal = function() {
  console.log("inside")
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
    'phone' : "#phone"
  };

  if(additionalFields && Object.keys(additionalFields).length
   && Object.values(additionalFields).length) {
    mappings = Object.assign(mappings, additionalFields);
  }

  return mappings;
}

// call email api
function call(payload) {
  
  let content = {
    "Messages":[
    {
      "From": {
        "Email": "admin@aquadecoro.com",
        "Name": "Sintu"
      },
      "To": [
        {
          "Email": "admin@aquadecoro.com",
          "Name": "Tathagat"
        }
      ],
      "Subject": "My first Mailjet email",
      "TextPart": "Greetings from Mailjet.",
      "HTMLPart": "<h3>Hello Aquadeco,</h3><br /><p> It is acknowldeged that your website is visited by a user in search of your esteemed service. you can catch him up at the address mentioned below.</p>" + JSON.stringify(payload),
      "CustomID": "AppGettingStartedTest"
    }
  ]
   // $('infoobject').html(payload);
};
// $('infoobject').html(payload);
//   $.ajax({
//     url: "https://reqres.in/api/users",
//     type: "POST",
//     data: {
//         name: "paul rudd",
//         movies: ["I Love You Man", "Role Models"]
//     },
//     success: function(response){
//         console.log(response);
//     }
// })
// }

var settings = {
  "url": "https://api.mailjet.com/v3.1/send",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Basic Njg3OGVlZGIwNjA3MmRiZTgyNDY0ZTU4NDY2OGE2MTQ6N2Q5NWI3YWMzMDA1ODZiYmU0OTU1OWFkYmU0NjUxOTg="
  },
  "data": JSON.stringify(content),
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

}
// YXBpOjg4OWJlOTIyOGI0YzYxMDNlYzJhZjM2ZGY0NTQwMmI1LTQ2OGJkZTk3LWNmNWQ1Nzgw
// curl -s \
// -X POST \
// --user "6878eedb06072dbe82464e584668a614:7d95b7ac300586bbe49559adbe465198" \
// https://api.mailjet.com/v3.1/send \
// -H 'Content-Type: application/json' \
// -d '{
//   "Messages":[
//     {
//       "From": {
//         "Email": "admin@aquadecoro.com",
//         "Name": "Sintu"
//       },
//       "To": [
//         {
//           "Email": "admin@aquadecoro.com",
//           "Name": "Sintu"
//         }
//       ],
//       "Subject": "My first Mailjet email",
//       "TextPart": "Greetings from Mailjet.",
//       "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//       "CustomID": "AppGettingStartedTest"
//     }
//   ]
// }'


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
})();


// Drop down of plans

$(document).ready(function(){
    $("select").change(function(){
        var selectedPlan = $(this).children("option:selected").val();
        if( selectedPlan === "Basic")
        {
          $(".price-cost").children("strong").html("399");
          $(".price-points").children("li.stages").html('<i class="fa fa-check" aria-hidden="true"></i> 5 stages of Purification');
        }
        else if(selectedPlan === "Standard")
        {
          $(".price-cost").children("strong").html("449");
          $(".price-points").children("li.stages").html('<i class="fa fa-check" aria-hidden="true"></i> 7 stages of Purification');
        }
        else if(selectedPlan === "Premium")
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
      }, 800, function(){
   
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
    console.log(document.documentElement.scrollTop);
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
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

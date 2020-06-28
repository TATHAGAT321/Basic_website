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

     $('#pricetag').text(title);
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

  $.ajax({
    url: "https://reqres.in/api/users",
    type: "POST",
    data: {
        name: "paul rudd",
        movies: ["I Love You Man", "Role Models"]
    },
    success: function(response){
        console.log(response);
    }
})
}

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
//           "Email": "tathagat812000@gmail.com",
//           "Name": "Tathagat"
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



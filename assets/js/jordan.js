$(function() {
  $('.form-control').focus(formFocus);
});

function formFocus() {
  $('#alert-field')
    .removeClass()
    .addClass('hidden');
}

function formReset() {
  $('#alert-field').show()
    .html("<span><p>Thank you. We'll get back to you asap.</p></span><br>");
  document.getElementById("formID").reset();
  setTimeout(() => {
    $('#sendButton').show();
    $('#alert-field').hide();
    console.log('This alert appeared after 3 second!'); 
  }, 2000);
}

function pleaseWaite() {
  $('#sendButton').hide();
  $('#alert-field').removeClass();
  $('#alert-field').show()
    .html("<span><p>Please wait while we're sending your message . . .</p>  <progress></progress></span>");
}

//selector from your HTML form
function postElephant(e) {
  //prevent the form from submiting so we can post to the google form
  console.log("in postElephant");
  e.preventDefault();
  // console.log("inpostEatery");
  pleaseWaite();

  // form is in sor.phouen@4lims.com
  const formID  = "1FAIpQLSerPJ_qQkFC8v9AbyE_iLCIYVu3qKl1x8hb4zDHMRcbrfenrQ";
  const formURL = `https://docs.google.com/forms/d/e/${formID}/formResponse`;
  //AJAX request
  $.ajax({
    //The public Google Form url, but replace /view with /formResponse
    url: formURL,
    data: $('#formID').serialize(), //Nifty jquery function that gets all the input data 
    type: 'POST', //tells ajax to post the data to the url
    dataType: "json", //the standard data type for most ajax requests
    mode: 'no-cors',
    header: { 'Content-Type': 'application/json' },
    statusCode: { //the status code from the POST request
      0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
        //success
        formReset();
       }, 
       200: function(data) {//200 is a success code. it went through!
        //success
        // $('#form-success').text('hooray! 200');
        formReset();
       },
       403: function(data) {//403 is when something went wrong and the submission didn't go through
        //error
        $('#alert-field').show()
          .html("<span><p><b>Oh no! something went wrong. Please let us know of your problem.</b></p></span>");
        alert('Oh no! something went wrong. Please let us know of your problem.');
      }
    }  
  });
}

function sendElephant(e) {
  e.preventDefault();

  console.log("in sendElephant");
  
  // const POST_URL = 'https://script.google.com/macros/s/AKfycbwQ_wdqOBA_Z-29b9s2BZ7GHB3bGhlVzRL2hNwKdp-KoTQ5vhQ5bxz8uinBuKwvKDzP/exec'
  // const postRequest = {
  //   name: e.target['name-field'].value,
  //   phone: e.target['phone-field'].value,
  //   email: e.target['email-field'].value,
  //   body: e.target['body-field'].value
  // };
  
  const POST_URL = 'https://script.google.com/macros/s/AKfycbz8JqDu6LcJ4N0BpFuXCFL35Vljk7Bajlm09vFP6qR7XQIB_GpeiOgfh1N8kwX7Hm7pYQ/exec'
  const postRequest = {
    name: e.target['fullname'].value,
    email: e.target['email'].value,
    message: e.target['message'].value,
  };

  if(POST_URL) {
    $.post(POST_URL, JSON.stringify(postRequest))
      .then(res => {
        e.target.reset();
        $('#alert-field')
          .removeClass()
          .addClass(`alert alert-${res.code}`)
          .text(res.msg);
      });

    $('#alert-field')
      .removeClass()
      .html('<progress></progress>')
      .removeClass('hidden');
  } else {
    alert('You must set the POST_URL variable with your script ID');
  }
}

function changeSubject(e) {
  if(e.target.value === 'Other') {
    $('#subject-select').removeClass('col-xs-12')
      .addClass('col-xs-6');
    $('#hidden-other-subject').removeClass('hidden');
  } else {
    $('#subject-select').removeClass('col-xs-6')
      .addClass('col-xs-12');

    $('#hidden-other-subject').addClass('hidden');
  }
}





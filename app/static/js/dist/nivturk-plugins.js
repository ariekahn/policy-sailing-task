const pass_message = function(msg) {
  $.ajax({
    url: "/experiment",
    method: "POST",
    data: JSON.stringify(msg),
    contentType: "application/json; charset=utf-8"
  }).done(function(data, textStatus, jqXHR) {
  }).fail(function(error) {
    console.log(error);
  });
};
function redirect_success(workerId, assignmentId, hitId, code_success) {
  const url = `https://app.prolific.co/submissions/complete?cc=${code_success}`;
  $.ajax({
    url: "/redirect_success",
    method: "POST",
    data: JSON.stringify(jsPsych.data.get().json()),
    contentType: "application/json; charset=utf-8"
  }).done(function(data, textStatus, jqXHR) {
    window.location.replace(url);
  }).fail(function(error) {
    console.log(error);
  });
}
function redirect_reject(workerId, assignmentId, hitId, code_reject) {
  const url = `https://app.prolific.co/submissions/complete?cc=${code_reject}`;
  $.ajax({
    url: "/redirect_reject",
    method: "POST",
    data: JSON.stringify(jsPsych.data.get().json()),
    contentType: "application/json; charset=utf-8"
  }).done(function(data, textStatus, jqXHR) {
    window.location.replace(url);
  }).fail(function(error) {
    console.log(error);
  });
}
function redirect_error(error) {
  var url = "/error/" + error;
  $.ajax({
    url: "/redirect_error",
    method: "POST",
    data: JSON.stringify(jsPsych.data.get().json()),
    contentType: "application/json; charset=utf-8"
  }).done(function(data, textStatus, jqXHR) {
    window.location.replace(url);
  }).fail(function(error2) {
    console.log(error2);
  });
}

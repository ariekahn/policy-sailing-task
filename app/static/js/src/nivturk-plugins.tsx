import type {jsPsychType} from '../lib/jspsych-6.3.1/jspsych';
declare var jsPsych: jsPsychType;

// Pass message from jsPsych to NivTurk
const pass_message = function(msg:string) {
    $.ajax({
        url: '/experiment',
        method: 'POST',
        data: JSON.stringify(msg),
        contentType: 'application/json; charset=utf-8',
    }).done(function (data, textStatus, jqXHR) {
      // do nothing on success
    }).fail(function (error) {
        console.log(error);
    });
}

// Successful completion of experiment: redirect with completion code.
function redirect_success(workerId:string, assignmentId:string, hitId:string, code_success:string) {
    // Concatenate metadata into complete URL (returned on success).
    const url = `https://app.prolific.co/submissions/complete?cc=${code_success}`;

    $.ajax({
        url: '/redirect_success',
        method: 'POST',
        data: JSON.stringify(jsPsych.data.get().json()),
        contentType: 'application/json; charset=utf-8',
    }).done(function (data, textStatus, jqXHR) {
        window.location.replace(url);
    }).fail(function (error) {
        console.log(error);
    });
}

// Unsuccessful completion of experiment: redirect with decoy code.
function redirect_reject(workerId:string, assignmentId:string, hitId:string, code_reject:string) {
    // Concatenate metadata into complete URL (returned on reject).
    const url = `https://app.prolific.co/submissions/complete?cc=${code_reject}`;

    $.ajax({
        url: '/redirect_reject',
        method: 'POST',
        data: JSON.stringify(jsPsych.data.get().json()),
        contentType: 'application/json; charset=utf-8',
    }).done(function (data, textStatus, jqXHR) {
        window.location.replace(url);
    }).fail(function (error) {
        console.log(error);
    });
}

// Unsuccessful completion of experiment: redirect to error page.
function redirect_error(error:string) {
    // error is the error number to redirect to.
    var url = '/error/' + error;

    $.ajax({
        url: '/redirect_error',
        method: 'POST',
        data: JSON.stringify(jsPsych.data.get().json()),
        contentType: 'application/json; charset=utf-8',
    }).done(function (data, textStatus, jqXHR) {
        window.location.replace(url);
    }).fail(function (error) {
        console.log(error);
    });
}

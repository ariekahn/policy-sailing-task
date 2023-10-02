import type {jsPsychType} from '../../lib/jspsych-6.3.1/jspsych';
declare var jsPsych: jsPsychType;
/**
* Adapted from jspsych-fcp-comprehension by Sam Zorowitz
*
* plugin for running the comprehension check for the sailing task
*
**/
export interface SailingComprehension {
    type: string,
    prompts: Array<string>;
    correct: Array<string>;
    button_label: string;
    show_correct: boolean;
}
jsPsych.plugins['sailing-comprehension'] = (() => {
    const plugin = { info: {}, trial: {}, };

    plugin.info = {
        name: 'sailing-comprehension',
        description: '',
        parameters: {
            prompts: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                array: true,
                pretty_name: 'Prompts',
                description: 'Comprehension check questions',
            },
            correct: {
                type: jsPsych.plugins.parameterType.STRING,
                array: true,
                pretty_name: 'Correct',
                description: 'Answers to comprehension check questions',
            },
            button_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Button label',
                default: 'Continue',
                description: 'Label of the button.',
            },
            show_correct: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Show correct responses',
                default: true,
                description: 'Show which responses were correct',
            }
        },
    };
    plugin.trial = function (display_element: Element, trial: SailingComprehension) {
        // Plug-in setup
        const plugin_id_name = 'jspsych-survey-multi-choice';

        // ---------------------------------- //
        // Section 1: Define HTML             //
        // ---------------------------------- //

        // Initialize HTML
        let html = '';

        // Add factory machine parts (back).
        html += '<div class="arcade-wrap">';

        // form element
        const trial_form_id = `${plugin_id_name}-form`;
        display_element.innerHTML += `<form id="${trial_form_id}"></form>`;

        // Show preamble text
        html += '<div class="comprehension-box">';
        html += '<div class="jspsych-survey-multi-choice-preamble"><h4 style="font-size: 1.5vw; margin-block-start: 1em; margin-block-end: 1em">Please answer the questions below:</div>';

        // Initialize form element
        html += '<form id="jspsych-survey-multi-choice-form">';

        // Iteratively add comprehension questions.
        for (let i = 0; i < trial.prompts.length; i += 1) {
            // Initialize item
            html += `<div id="jspsych-survey-multi-choice-${i}" class="jspsych-survey-multi-choice-question jspsych-survey-multi-choice-horizontal" data-name="Q${i}">`;

            // Add question text
            html += `<p class="jspsych-survey-multi-choice-text survey-multi-choice">${trial.prompts[i]}</p>`;

            // Option 1: True
            html += `<div id="jspsych-survey-multi-choice-option-${i}-0" class="jspsych-survey-multi-choice-option">`;
            html += `<input type="radio" name="jspsych-survey-multi-choice-response-${i}" id="jspsych-survey-multi-choice-response-${i}-0" value=true required>`;
            html += `<label class="jspsych-survey-multi-choice-text" for="jspsych-survey-multi-choice-response-${i}-0">True</label>`;
            html += '</div>';

            // Option 2: False
            html += `<div id="jspsych-survey-multi-choice-option-${i}-1" class="jspsych-survey-multi-choice-option">`;
            html += `<input type="radio" name="jspsych-survey-multi-choice-response-${i}" id="jspsych-survey-multi-choice-response-${i}-1" value=false required>`;
            html += `<label class="jspsych-survey-multi-choice-text" for="jspsych-survey-multi-choice-response-${i}-1">False</label>`;
            html += '</div>';

            // Close item
            html += '</div>';
        }

        // add submit button
        html += `<div id="continue"><input type="submit" id="${plugin_id_name}-next" class="${plugin_id_name} jspsych-btn"` + (trial.button_label ? ' value="'+trial.button_label + '"': '') + '"></input></div>';

        // End HTML
        html += '</form>';
        html += '</div></div>';

        // Display HTML
        display_element.innerHTML = html;

        // ---------------------------------- //
        // Section 2: jsPsych Functions       //
        // ---------------------------------- //

        // Scroll to top of screen.
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };

        const trial_data = {
            responses: [''],
            num_errors: 0,
            rt: 0,
        };
        const finish_trial = () => {
            // clear html
            display_element.innerHTML += '';

            // next trial
            jsPsych.finishTrial(trial_data);
        }

        let startTime: number;
        // Detect submit button press
        document.querySelector('form')!.addEventListener('submit', (event) => {
            event.preventDefault();

            // Measure response time
            const endTime = performance.now();
            const response_time = endTime - startTime;

            // Gather responses
            const responses = [];
            let num_errors = 0;
            for (let i = 0; i < trial.prompts.length; i += 1) {
                // Find matching question.
                const match = display_element.querySelector(`#jspsych-survey-multi-choice-${i}`)!;
                const val = (match.querySelector('input[type=radio]:checked') as HTMLOptionElement).value;

                // Store response
                responses.push(val);

                // Check accuracy
                if (trial.correct[i] !== val) {
                    num_errors += 1;
                    (display_element.querySelector(`#jspsych-survey-multi-choice-${i}`)! as HTMLElement).style.color = 'red';
                } else {
                    (display_element.querySelector(`#jspsych-survey-multi-choice-${i}`)! as HTMLElement).style.color = 'green';
                }
                if (num_errors > 0) {
                    display_element.querySelector('#continue')!.innerHTML = '<p style="color: red">You missed at least one question. Please review the instructions. Press any key to continue.</p>'
                } else {
                    display_element.querySelector('#continue')!.innerHTML = '<p style="color: green">Great job! You answered all questions correctly. Press any key to continue.</p>'
                }
            }

            // store data
            trial_data.responses = responses;
            trial_data.num_errors = num_errors;
            trial_data.rt = response_time;
            jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: finish_trial,
                rt_method: 'performance',
                persist: false,
                allow_held_key: false,
            });
        });

        startTime = performance.now();
    };

    return plugin;
})();

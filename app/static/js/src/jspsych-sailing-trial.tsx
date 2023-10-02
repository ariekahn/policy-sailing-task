import type {jsPsychType} from '../../lib/jspsych-6.3.1/jspsych';
declare var jsPsych: jsPsychType;

// Wait for an animation to end
const waitForAnimation = (el: Element) => new Promise<void>((resolve) => {
    const animationEnded = () => {
        el.removeEventListener('animationend', animationEnded);
        resolve();
    };
    el.addEventListener('animationend', animationEnded);
});
function sleep(ms: number) {
    return new Promise((resolve) => jsPsych.pluginAPI.setTimeout(resolve, ms));
}
// async function that waits for an element to be rendered
const getElement = async (selector: string): Promise<HTMLElement> => {
    while ( document.querySelector(selector) === null) {
      await new Promise( resolve => requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector) as HTMLElement; 
};

export interface SailingTrial {
    type: string,
    island_order: [string, string];
    boat_order: [string, string, string, string];
    boat: number | null;
    island: number | null;
    reward_probabilities: [number, number, number, number];
    stage_2: boolean;
    end_dwell_time: number;
    stage_1_choices: [string, string];
    stage_2_choices: [string, string];
    show_instructions: boolean;
    text_home_trial: string | null;
    text_island_choice: string | null;
    text_boat_choice: string | null;
    choice_duration: number;
    reward_duration: number;
    progress: number | null;
    warn_above_threshold: boolean;
}
export interface TrialData {
    island_rt: null | number,
    island_key: null | string,
    island: null | number,
    boat_rt: null | number,
    boat_key: null | string,
    boat: null | number,
    reward: null | number,
    timeout: boolean,
    reward_probabilities: null | Array<number>,
}
jsPsych.plugins['sailing-trial'] = (() => {
    const plugin = { info: {}, trial: {} };

    plugin.info = {
        name: 'sailing-trial',
        description: '',
        parameters: {
            island_order: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Island order [\'A\', \'B\']',
                default: ['A', 'B'],
                array: true,
                description: 'Island assignment',
            },
            boat_order: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Boat order [\'A\', \'B\', \'C\', \'D\']',
                default: ['A', 'B', 'C', 'D'],
                array: true,
                description: 'Boat assignment',
            },
            boat: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Boat',
                default: null,
                description: 'Boat shown on a trial. null indicates free choice.',
            },
            island: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Island',
                default: null,
                description: 'Starting island. null indicates choice of islands.',
            },
            reward_probabilities: {
                type: jsPsych.plugins.parameterType.FLOAT,
                pretty_name: 'Reward Probabilities',
                default: null,
                array: true,
                description: 'Reward probaibilities for each boat for each trial.',
            },
            stage_2: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Stage 2',
                default: true,
                description: 'Include boat choice and reward',
            },
            end_dwell_time: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'End Dwell Time',
                default: 0,
                description: 'Number of ms to dwell on end of trial',
            },
            stage_1_choices: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Stage 1 Choices',
                default: ['ArrowLeft', 'ArrowRight'],
                array: true,
                description: 'Valid choices at stage 1',
            },
            stage_2_choices: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Stage 2 Choices',
                default: ['ArrowLeft', 'ArrowRight'],
                array: true,
                description: 'Valid choices at stage 2',
            },
            show_instructions: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Show Instructions',
                default: false,
                description: 'Whether to show instructions',
            },
            text_home_trial: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Home Trial Text',
                default: null,
                description: 'Custom prompt for boat visiting island',
            },
            text_island_choice: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Island Choice Text',
                default: null,
                description: 'Custom prompt for choosing an island',
            },
            text_boat_choice: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Boat Choice Text',
                default: null,
                description: 'Custom prompt for choosing a boat',
            },
            choice_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Choice duration',
                default: null,
                description: 'How long to listen for responses before trial ends. If null, no limit.',
            },
            reward_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Reward duration',
                default: null,
                description: 'How long to allow collecting the reward. If null, no limit.',
            },
            progress: {
                type: jsPsych.plugins.parameterType.FLOAT,
                pretty_name: 'Progress (Percent complete)',
                default: null,
                description: 'Percent of progress bar to fill. If null, no progress bar is shown.',
            },
            warn_above_threshold: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Warn timeouts above threshold',
                default: false,
                description: 'Whether to show that subjects will fail with more timeouts',
            }
        },
    };

    plugin.trial = async (display_element: Element, trial: SailingTrial) => {
        let new_html = '<div id="jspsych-sailing-trial">';
        // Draw background
        new_html += '<div id="background_opacity">';
        new_html += '<div id="background_zoom">';
        new_html += '<img id="ocean" src="../static/img/ocean_background.png"/>';
        new_html += `<img id="islands" src="../static/img/islands_${trial.island_order[0]}_${trial.island_order[1]}.png"/>`;
        new_html += '</div>';
        // Progress bar
        new_html += '<div id="progress-border" style="visibility: hidden">'
        new_html += '<div id="progress-bar"></div>'
        new_html += '</div>'
        new_html += '</div>';

        // Draw boats
        new_html += '<div id="boat_0_left_container" style="visibility: hidden">';
        new_html += `<img class="boat_left" id="boat_0_left" src="../static/img/boat_${trial.boat_order[0]}_left.png"/></div>`;
        new_html += '<div id="boat_2_left_container" style="visibility: hidden">';
        new_html += `<img class="boat_left" id="boat_2_left" src="../static/img/boat_${trial.boat_order[2]}_left.png"/></div>`;
        new_html += '<div id="boat_1_right_container" style="visibility: hidden">';
        new_html += `<img class="boat_right" id="boat_1_right" src="../static/img/boat_${trial.boat_order[1]}_right.png"/></div>`;
        new_html += '<div id="boat_3_right_container" style="visibility: hidden">';
        new_html += `<img class="boat_right" id="boat_3_right" src="../static/img/boat_${trial.boat_order[3]}_right.png"></img></div>`;

        new_html += '<div id="boat_0_bottom_container" style="visibility: hidden">';
        new_html += `<img class="boat_bottom" id="boat_0_bottom" src="../static/img/boat_${trial.boat_order[0]}_bottom.png"/></div>`;
        new_html += '<div id="boat_1_bottom_container" style="visibility: hidden">';
        new_html += `<img class="boat_bottom" id="boat_1_bottom" src="../static/img/boat_${trial.boat_order[1]}_bottom.png"/></div>`;
        new_html += '<div id="boat_2_bottom_container" style="visibility: hidden">';
        new_html += `<img class="boat_bottom" id="boat_2_bottom" src="../static/img/boat_${trial.boat_order[2]}_bottom.png"/></div>`;
        new_html += '<div id="boat_3_bottom_container" style="visibility: hidden">';
        new_html += `<img class="boat_bottom" id="boat_3_bottom" src="../static/img/boat_${trial.boat_order[3]}_bottom.png"/></div>`;

        // Draw docks
        new_html += '<img id="dock_bottom" style="visibility: hidden" src="../static/img/dock_bottom.png"/>';
        new_html += '<img id="dock_left" style="visibility: hidden" src="../static/img/dock_left.png"/>';
        new_html += '<img id="dock_right" style="visibility: hidden" src="../static/img/dock_right.png"/>';

        // Draw reward
        new_html += '<img id="reward" style="visibility: hidden" src="../static/img/gold.png"/>';
        new_html += '<img id="noreward" style="visibility: hidden" src="../static/img/noreward.png"/>';

        new_html += '<div id="plus_one" style="visibility: hidden">+1</div>'

        // Diagonal cover
        new_html += '<div id="diag_box"></div>';

        // Draw instructions
        new_html += '<div id="instructions-box"><div id="instructions"></div></div>';

        // Draw on screen
        display_element.innerHTML = new_html;

        // Get HTML elements
        const background_zoom = await getElement('#background_zoom');
        const background_opacity = await getElement('#background_opacity')!;

        const boat_0_left_container = await getElement('#boat_0_left_container');
        const boat_2_left_container = await getElement('#boat_2_left_container');
        const boat_1_right_container = await getElement('#boat_1_right_container');
        const boat_3_right_container = await getElement('#boat_3_right_container');

        const boat_0_bottom_container = await getElement('#boat_0_bottom_container');
        const boat_1_bottom_container = await getElement('#boat_1_bottom_container');
        const boat_2_bottom_container = await getElement('#boat_2_bottom_container');
        const boat_3_bottom_container = await getElement('#boat_3_bottom_container');
        const boats_bottom = [boat_0_bottom_container, boat_1_bottom_container, boat_2_bottom_container, boat_3_bottom_container];

        const dock_bottom = await getElement('#dock_bottom');
        const dock_left = await getElement('#dock_left');
        const dock_right = await getElement('#dock_right');

        const reward = await getElement('#reward');
        const failure = await getElement('#noreward');
        const plus_one = await getElement('#plus_one');

        const diag_box = await getElement('#diag_box');
        diag_box.classList.add('diag_uncovered');

        const instructions = await getElement('#instructions');
        const instructions_box = await getElement('#instructions-box');

        const progress_border = await getElement('#progress-border');
        const progress_bar = await getElement('#progress-bar');

        // const boats = [boat_0_left_container, boat_1_right_container, boat_2_left_container, boat_3_right_container];
        const island_boats = [
            [boat_0_left_container, boat_1_right_container],
            [boat_2_left_container, boat_3_right_container],
        ];
        const docks = [dock_left, dock_right];

        const trial_data:TrialData = {
            island_rt: null,
            island_key: null,
            island: null,
            boat_rt: null,
            boat_key: null,
            boat: null,
            reward: null,
            timeout: false,
            reward_probabilities: trial.reward_probabilities,
        };

        const show_progress = function(percent: number) {
            progress_border.style.visibility = 'visible';
            percent = Math.max(percent, 0);
            percent = Math.min(percent, 100);
            progress_bar.style.width = `${percent}%`;
        }

        const update_instructions = function(text: string | null) {
            if (trial.show_instructions && text !== null) {
                instructions.innerHTML = text;
                instructions_box.hidden = false;
            } else { 
                instructions_box.hidden = true;
            }
        }

        const fade_in = (elem: HTMLElement) => {
            elem.classList.add('fade_in');
            elem.classList.remove('fade_out');
            elem.classList.remove('partial_fade_out');
            elem.style.visibility = 'visible';
            return waitForAnimation(elem);
        };
        const fade_out = (elem: HTMLElement) => {
            elem.classList.add('fade_out');
            elem.classList.remove('fade_in');
            return waitForAnimation(elem);
        };
        const partial_fade_out = (elem: HTMLElement) => {
            elem.classList.add('partial_fade_out');
            elem.classList.remove('fade_out');
            elem.classList.remove('fade_in');
            return waitForAnimation(elem);
        };
        const hide = (elem: HTMLElement) => {
            elem.style.visibility = 'hidden';
            elem.classList.remove('fade_in');
        };
        const show = (elem: HTMLElement) => {
            elem.style.visibility = 'visible';
            elem.classList.remove('fade_out');
            elem.classList.remove('partial_fade_out');
            elem.classList.remove('fade_in');
        };

        const zoom = (island: number) => {
            if (island === 0) {
                background_zoom.style.transformOrigin = '18.25% 51.33333333%';
            } else if (island === 1) {
                background_zoom.style.transformOrigin = '87.25% 51.33333333%';
            } else {
                throw 'Invalid Island';
            }
            background_zoom.classList.add('zoomed');
            background_zoom.classList.remove('unzoomed');
            return waitForAnimation(background_zoom);
        };

        const quick_zoom = (island: number) => {
            if (island === 0) {
                background_zoom.style.transformOrigin = '18.25% 51.33333333%';
            } else if (island === 1) {
                background_zoom.style.transformOrigin = '87.25% 51.33333333%';
            } else {
                throw 'Invalid Island';
            }
            background_zoom.style.transform = 'scale(3.77358491, 3.77358491)';
            background_zoom.classList.remove('unzoomed');
        };

        const unzoom = function () {
            background_zoom.classList.add('unzoomed');
            background_zoom.classList.remove('zoomed');
            return waitForAnimation(background_zoom);
        };

        // function to end trial when it is time
        const end_trial = () => {
            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();
            jsPsych.pluginAPI.cancelAllKeyboardResponses();

            // clear the display
            display_element.innerHTML = '';

            // move on to the next trial
            jsPsych.finishTrial(trial_data);
        };

        // function to handle missed responses
        const missed_response = () => {
            // Kill all setTimeout handlers.
            jsPsych.pluginAPI.clearAllTimeouts();
            jsPsych.pluginAPI.cancelAllKeyboardResponses();

            // Display warning message.
            trial_data.timeout = true;
            if (trial.warn_above_threshold) {
                const msg = `
                <p style="font-size: 20px; line-height: 1.5em">You did not respond within the allotted time.
                Please pay more attention on the next trial.
                <br><br><b>WARNING:</b> You have already missed a number of trials and are close to being rejected! If you a few more trials, we will have to end the experiment early and reject your work.`;
                display_element.innerHTML = msg;
                jsPsych.pluginAPI.setTimeout(end_trial, 10000);
            } else {
                const msg = `
                <p style="font-size: 20px; line-height: 1.5em">You did not respond within the allotted time.
                Please pay more attention on the next trial.
                <br><br><b>Warning:</b> If you miss too many trials, we may end the experiment early and reject your work.`;
                display_element.innerHTML = msg;
                jsPsych.pluginAPI.setTimeout(end_trial, 5000);
            }
        };
        interface Response {
            key: string | null;
            rt: number | null;
        }
        function readKey(valid_responses: Array<string>) {
            return new Promise<Response>((resolve) => {
                const f = function(response: Response) {
                    jsPsych.pluginAPI.clearAllTimeouts();
                    jsPsych.pluginAPI.cancelAllKeyboardResponses();
                    if (trial.choice_duration !== null) {
                        jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration);
                    }
                    resolve(response);
                }
                jsPsych.pluginAPI.getKeyboardResponse({
                    callback_function: f,
                    valid_responses,
                    rt_method: 'performance',
                    persist: false,
                    allow_held_key: false,
                });
            });
        }
        function readKeyTimeout(valid_responses: Array<string>, timeout: number) {
            return new Promise<Response>((resolve) => {
                const success = function(response: Response) {
                    jsPsych.pluginAPI.clearAllTimeouts();
                    jsPsych.pluginAPI.cancelAllKeyboardResponses();
                    if (trial.choice_duration !== null) { jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration); }
                    resolve(response);
                }
                const failure = function() {
                    jsPsych.pluginAPI.clearAllTimeouts();
                    jsPsych.pluginAPI.cancelAllKeyboardResponses();
                    if (trial.choice_duration !== null) { jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration); }
                    resolve({ key: null, rt: null });
                }
                jsPsych.pluginAPI.getKeyboardResponse({
                    callback_function: success,
                    valid_responses,
                    rt_method: 'performance',
                    persist: false,
                    allow_held_key: false,
                });
                jsPsych.pluginAPI.setTimeout(failure, timeout); 
            });
        }
        async function show_reward(boat: number) {
            if (Math.random() <= trial.reward_probabilities[boat]) {
                trial_data.reward = 1;
                update_instructions('<p>The merchant has treasure to share!</p><p>Press Space to claim the reward!</p>');
                show(reward);
                let response_reward;
                if (trial.reward_duration !== null) {
                    response_reward = await readKeyTimeout([' '], trial.reward_duration);
                } else {
                    response_reward = await readKey([' ']);
                }
                hide(reward);
                if (response_reward.key !== null) {
                    update_instructions('<p>You receieved some treasure!</p>');
                    // Animate raising +1
                    show(plus_one);
                    plus_one.style.top = "40%";
                    await fade_out(plus_one);
                } else {
                    update_instructions('<p>You didn\'t respond in time!</p>');
                    await sleep(500);
                }
            } else {
                trial_data.reward = 0;
                update_instructions('<p>The merchant had no treasure.</p><p>Press Space to continue</p>');
                show(failure);
                await readKeyTimeout([' '], 2000);
            }
            await sleep(trial.end_dwell_time);
            diag_box.classList.add('diag_covered');
            diag_box.classList.remove('diag_uncovered');
            jsPsych.pluginAPI.setTimeout(end_trial, 300);
        }
        async function navigation_trial() {
            let boat : number;
            let island : number;
            let boat_side : number;

            update_instructions(trial.text_island_choice);
            if (trial.choice_duration !== null) { jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration); }
            
            // Island choice
            const response_island = await readKey(trial.stage_1_choices);
            if (response_island.key === 'arrowleft') {
                island = 0;
            } else if (response_island.key === 'arrowright') {
                island = 1;
            } else {
                throw 'Invalid Island';
            }
            trial_data.island_key = response_island.key;
            trial_data.island_rt = response_island.rt;
            trial_data.island = island;

            // Set up island
            update_instructions(null);
            await zoom(island);

            await Promise.all([
                fade_in(dock_left),
                fade_in(dock_right),
                fade_in(island_boats[island][0]),
                fade_in(island_boats[island][1]),
            ]);
            update_instructions(trial.text_boat_choice);

            // Boat choice
            const response_boat = await readKey(trial.stage_2_choices);
            if (response_boat.key === 'arrowleft') {
                boat_side = 0;
            } else if (response_boat.key === 'arrowright') {
                boat_side = 1;
            } else {
                throw 'Invalid Boat';
            }
            boat = 2 * island + boat_side;
            trial_data.boat_key = response_boat.key;
            trial_data.boat_rt = response_boat.rt;
            trial_data.boat = boat;

            // Reward setup
            update_instructions(null);
            await Promise.all([
                fade_out(docks[1 - boat_side]),
                fade_out(island_boats[island][1 - boat_side]),
                partial_fade_out(background_opacity),
            ]);
            await sleep(200);
            await show_reward(boat);
        }

        async function island_choice_only_trial() {
            let island : number;

            update_instructions(trial.text_island_choice);
            if (trial.choice_duration !== null) { jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration); }
            
            // Island choice
            const response_island = await readKey(trial.stage_1_choices);
            if (response_island.key === 'arrowleft') {
                island = 0;
            } else if (response_island.key === 'arrowright') {
                island = 1;
            } else {
                throw 'Invalid Island';
            }
            trial_data.island_key = response_island.key;
            trial_data.island_rt = response_island.rt;
            trial_data.island = island;

            // Set up island
            update_instructions(null);
            await zoom(island);
            await sleep(trial.end_dwell_time);

            diag_box.classList.add('diag_covered');
            diag_box.classList.remove('diag_uncovered');
            jsPsych.pluginAPI.setTimeout(end_trial, 300);
        }

        async function boat_choice_only_trial(island: number) {
            let boat : number;
            let boat_side : number;

            // Set up island
            update_instructions(null);
            if (trial.choice_duration !== null) { jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration); }
            quick_zoom(island);

            await Promise.all([
                fade_in(dock_left),
                fade_in(dock_right),
                fade_in(island_boats[island][0]),
                fade_in(island_boats[island][1]),
            ]);
            update_instructions(trial.text_boat_choice);

            // Boat choice
            const response_boat = await readKey(trial.stage_2_choices);
            if (response_boat.key === 'arrowleft') {
                boat_side = 0;
            } else if (response_boat.key === 'arrowright') {
                boat_side = 1;
            } else {
                throw 'Invalid Boat';
            }
            boat = 2 * island + boat_side;
            trial_data.boat_key = response_boat.key;
            trial_data.boat_rt = response_boat.rt;
            trial_data.boat = boat;

            // Reward setup
            update_instructions(null);
            await Promise.all([
                fade_out(docks[1 - boat_side]),
                fade_out(island_boats[island][1 - boat_side]),
                partial_fade_out(background_opacity),
            ]);
            await sleep(200);
            await show_reward(boat);
        }

        async function home_trial(boat: number) {
            show(dock_bottom);
            show(boats_bottom[boat]);
            reward.style.top = '-23%';
            failure.style.top = '-23%';
            update_instructions(trial.text_home_trial);
            if (trial.choice_duration !== null) { jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration); }

            // Boat choice
            const response_boat = await readKey(['ArrowUp']);
            trial_data.boat_key = response_boat.key;
            trial_data.boat_rt = response_boat.rt;
            trial_data.boat = boat;

            // Reward setup
            update_instructions(null);
            await Promise.all([
                partial_fade_out(background_opacity),
            ]);
            await sleep(200);
            await show_reward(boat);
        }

        if (trial.progress !== null) {
            show_progress(trial.progress);
        }
        if (trial.island !== null) {
            boat_choice_only_trial(trial.island);
        } else if (trial.stage_2 === false) {
            island_choice_only_trial();
        } else if (trial.boat === null) {
            navigation_trial();
        } else {
            home_trial(trial.boat);
        }
    };

    return plugin;
})();

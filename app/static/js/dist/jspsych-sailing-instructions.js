(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // app/static/js/src/jspsych-sailing-instructions.tsx
  var getElement = (selector) => __async(void 0, null, function* () {
    while (document.querySelector(selector) === null) {
      yield new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  });
  jsPsych.plugins["sailing-instructions"] = function() {
    const plugin = { info: {}, trial: {} };
    plugin.info = {
      name: "sailing-instructions",
      description: "",
      parameters: {
        island_order: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Island order ['A', 'B']",
          default: ["A", "B"],
          array: true,
          description: "Island assignment"
        },
        boat_order: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Boat order ['A', 'B', 'C', 'D']",
          default: ["A", "B", "C", "D"],
          array: true,
          description: "Boat assignment"
        },
        instruction_set: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Instruction Set ID",
          description: "Instruction set to use"
        },
        allow_keyboard_response: {
          type: jsPsych.plugins.parameterType.BOOL,
          default: true,
          pretty_name: "Allow Keyboard Response",
          description: "Allow Keyboard Response"
        }
      }
    };
    plugin.trial = (display_element, trial) => __async(this, null, function* () {
      let new_html = '<div id="jspsych-sailing-trial">';
      new_html += '<div id="background_opacity">';
      new_html += '<div id="background_zoom">';
      new_html += '<img id="ocean" src="../static/img/ocean_background.png"/>';
      new_html += `<img id="islands" src="../static/img/islands_${trial.island_order[0]}_${trial.island_order[1]}.png"/>`;
      new_html += "</div>";
      new_html += "</div>";
      new_html += '<div id="boat_0_left_container">';
      new_html += `<img class="boat_left" id="boat_0_left" src="../static/img/boat_${trial.boat_order[0]}_left.png"/></div>`;
      new_html += '<div id="boat_2_left_container">';
      new_html += `<img class="boat_left" id="boat_2_left" src="../static/img/boat_${trial.boat_order[2]}_left.png"/></div>`;
      new_html += '<div id="boat_1_right_container">';
      new_html += `<img class="boat_right" id="boat_1_right" src="../static/img/boat_${trial.boat_order[1]}_right.png"/></div>`;
      new_html += '<div id="boat_3_right_container">';
      new_html += `<img class="boat_right" id="boat_3_right" src="../static/img/boat_${trial.boat_order[3]}_right.png"/></div>`;
      new_html += '<div id="boat_dummy_left_container">';
      new_html += '<img class="boat_left" id="boat_dummy_left" src="../static/img/boat_dummy_left.png"/></div>';
      new_html += '<div id="boat_dummy_right_container">';
      new_html += '<img class="boat_right" id="boat_dummy_right" src="../static/img/boat_dummy_right.png"/></div>';
      new_html += '<div id="boat_0_bottom_container">';
      new_html += `<img class="boat_bottom" id="boat_0_bottom" src="../static/img/boat_${trial.boat_order[0]}_bottom.png"/></div>`;
      new_html += '<div id="boat_1_bottom_container">';
      new_html += `<img class="boat_bottom" id="boat_1_bottom" src="../static/img/boat_${trial.boat_order[1]}_bottom.png"/></div>`;
      new_html += '<div id="boat_2_bottom_container">';
      new_html += `<img class="boat_bottom" id="boat_2_bottom" src="../static/img/boat_${trial.boat_order[2]}_bottom.png"/></div>`;
      new_html += '<div id="boat_3_bottom_container">';
      new_html += `<img class="boat_bottom" id="boat_3_bottom" src="../static/img/boat_${trial.boat_order[3]}_bottom.png"/></div>`;
      new_html += '<div id="boat_dummy_bottom_container">';
      new_html += '<img class="boat_bottom" id="boat_dummy_bottom" src="../static/img/boat_dummy_bottom.png"/></div>';
      new_html += '<img id="dock_bottom" src="../static/img/dock_bottom.png"/>';
      new_html += '<img id="dock_left" src="../static/img/dock_left.png"/>';
      new_html += '<img id="dock_right" src="../static/img/dock_right.png"/>';
      new_html += '<img id="reward" src="../static/img/gold.png"/>';
      new_html += '<img id="noreward" src="../static/img/noreward.png"/>';
      new_html += '<div id="plus_one" style="visibility: hidden">+1</div>';
      new_html += '<img id="no_merchant_link" src="../static/img/no_merchant_link.png" style="visibility: hidden"/>';
      new_html += '<img id="independent_turns" src="../static/img/independent_turns.png" style="visibility: hidden"/>';
      new_html += '<img class="reward_example" id="reward_ex_0" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_1" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_2" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_3" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_4" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_5" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_6" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_7" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_8" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_9" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_10" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_11" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_12" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_13" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_14" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_15" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_16" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_17" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_18" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_19" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_20" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_21" src="../static/img/noreward.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_22" src="../static/img/gold.png"/>';
      new_html += '<img class="reward_example" id="reward_ex_23" src="../static/img/gold.png"/>';
      new_html += '<div id="diag_box"></div>';
      new_html += '<div id="instructions-box">';
      new_html += '<div id="instructions">';
      new_html += "</div></div>";
      new_html += '<div id="jspsych-instructions-nav" class="jspsych-instructions-nav">';
      new_html += "<button id='jspsych-instructions-back' class='jspsych-btn' style='margin-right: 5px;' disabled='disabled'>&lt; Prev</button>";
      new_html += "<button id='jspsych-instructions-next' class='jspsych-btn' style='margin-left: 5px;'>Next &gt;</button>";
      new_html += "</div>";
      display_element.innerHTML = new_html;
      const reward_ex_0 = yield getElement("#reward_ex_0");
      const reward_ex_1 = yield getElement("#reward_ex_1");
      const reward_ex_2 = yield getElement("#reward_ex_2");
      const reward_ex_3 = yield getElement("#reward_ex_3");
      const reward_ex_4 = yield getElement("#reward_ex_4");
      const reward_ex_5 = yield getElement("#reward_ex_5");
      const reward_ex_6 = yield getElement("#reward_ex_6");
      const reward_ex_7 = yield getElement("#reward_ex_7");
      const reward_ex_8 = yield getElement("#reward_ex_8");
      const reward_ex_9 = yield getElement("#reward_ex_9");
      const reward_ex_10 = yield getElement("#reward_ex_10");
      const reward_ex_11 = yield getElement("#reward_ex_11");
      const reward_ex_12 = yield getElement("#reward_ex_12");
      const reward_ex_13 = yield getElement("#reward_ex_13");
      const reward_ex_14 = yield getElement("#reward_ex_14");
      const reward_ex_15 = yield getElement("#reward_ex_15");
      const reward_ex_16 = yield getElement("#reward_ex_16");
      const reward_ex_17 = yield getElement("#reward_ex_17");
      const reward_ex_18 = yield getElement("#reward_ex_18");
      const reward_ex_19 = yield getElement("#reward_ex_19");
      const reward_ex_20 = yield getElement("#reward_ex_20");
      const reward_ex_21 = yield getElement("#reward_ex_21");
      const reward_ex_22 = yield getElement("#reward_ex_22");
      const reward_ex_23 = yield getElement("#reward_ex_23");
      for (let i = 0; i < 12; i += 1) {
        const x = 30 * (i % 4);
        const y = 50 + 30 * Math.floor(i / 4);
        (yield getElement(`#reward_ex_${i}`)).style.transform = `translate(${x}%, ${y}%)`;
        (yield getElement(`#reward_ex_${i + 12}`)).style.transform = `translate(${x + 200}%, ${y}%)`;
        (yield getElement(`#reward_ex_${i}`)).style.visibility = "hidden";
        (yield getElement(`#reward_ex_${i + 12}`)).style.visibility = "hidden";
      }
      const ocean = yield getElement("#ocean");
      const islands = yield getElement("#islands");
      const background_zoom = yield getElement("#background_zoom");
      const background_opacity = yield getElement("#background_opacity");
      const boat_2_left = yield getElement("#boat_2_left");
      const boat_1_right = yield getElement("#boat_1_right");
      const boat_3_right = yield getElement("#boat_3_right");
      const boat_0_left_container = yield getElement("#boat_0_left_container");
      const boat_2_left_container = yield getElement("#boat_2_left_container");
      const boat_1_right_container = yield getElement("#boat_1_right_container");
      const boat_3_right_container = yield getElement("#boat_3_right_container");
      const boat_dummy_right_container = yield getElement("#boat_dummy_right_container");
      const boat_dummy_left_container = yield getElement("#boat_dummy_left_container");
      const boat_0_bottom_container = yield getElement("#boat_0_bottom_container");
      const boat_1_bottom_container = yield getElement("#boat_1_bottom_container");
      const boat_2_bottom_container = yield getElement("#boat_2_bottom_container");
      const boat_3_bottom_container = yield getElement("#boat_3_bottom_container");
      const boats_bottom = [boat_0_bottom_container, boat_1_bottom_container, boat_2_bottom_container, boat_3_bottom_container];
      const boat_dummy_bottom_container = yield getElement("#boat_dummy_bottom_container");
      const dock_bottom = yield getElement("#dock_bottom");
      const dock_left = yield getElement("#dock_left");
      const dock_right = yield getElement("#dock_right");
      const reward = yield getElement("#reward");
      const failure = yield getElement("#noreward");
      const plus_one = yield getElement("#plus_one");
      const no_merchant_link = yield getElement("#no_merchant_link");
      const independent_turns = yield getElement("#independent_turns");
      const diag_box = yield getElement("#diag_box");
      diag_box.classList.add("diag_uncovered");
      const instructions = yield getElement("#instructions");
      const instructions_back = yield getElement("#jspsych-instructions-back");
      const instructions_next = yield getElement("#jspsych-instructions-next");
      const boats = [boat_0_left_container, boat_1_right_container, boat_2_left_container, boat_3_right_container];
      const island_boats = [
        [boat_0_left_container, boat_1_right_container],
        [boat_2_left_container, boat_3_right_container]
      ];
      let boat = null;
      const trial_data = {
        island_rt: null,
        island_response: null,
        boat_rt: null,
        boat_response: null,
        boat: null,
        reward: null
      };
      function fade_in(elem) {
        elem.classList.add("fade_in");
        elem.classList.remove("partial_fade_in");
        elem.classList.remove("fade_out");
        elem.classList.remove("partial_fade_out");
        elem.style.visibility = "visible";
      }
      function fade_out(elem) {
        elem.classList.add("fade_out");
        elem.classList.remove("fade_in");
        elem.classList.remove("partial_fade_in");
        elem.classList.remove("partial_fade_out");
      }
      function partial_fade_out(elem) {
        elem.classList.add("partial_fade_out");
        elem.classList.remove("partial_fade_in");
        elem.classList.remove("fade_out");
        elem.classList.remove("fade_in");
      }
      function partial_fade_in(elem) {
        elem.classList.add("partial_fade_in");
        elem.classList.remove("partial_fade_out");
        elem.classList.remove("fade_out");
        elem.classList.remove("fade_in");
        elem.style.visibility = "visible";
      }
      function hide(elem) {
        elem.style.visibility = "hidden";
        elem.classList.remove("fade_in");
        elem.classList.remove("partial_fade_in");
        elem.classList.remove("fade_out");
        elem.classList.remove("partial_fade_out");
      }
      function show(elem) {
        elem.style.visibility = "visible";
        elem.classList.remove("fade_out");
        elem.classList.remove("partial_fade_out");
        elem.classList.remove("partial_fade_in");
        elem.classList.remove("fade_in");
      }
      const show_reward = () => {
        show(reward);
      };
      const hide_reward = () => {
        hide(reward);
      };
      const zoom = (island) => {
        hide(dock_bottom);
        if (island === 0) {
          background_zoom.style.transformOrigin = "18.25% 51.33333333%";
        } else if (island === 1) {
          background_zoom.style.transformOrigin = "87.25% 51.33333333%";
        } else {
          throw "Invalid Island";
        }
        background_zoom.classList.add("zoomed");
        background_zoom.classList.remove("unzoomed");
      };
      const quick_zoom = (island) => {
        hide(dock_bottom);
        if (island === 0) {
          background_zoom.style.transformOrigin = "18.25% 51.33333333%";
        } else if (island === 1) {
          background_zoom.style.transformOrigin = "87.25% 51.33333333%";
        } else {
          throw "Invalid Island";
        }
        background_zoom.style.transform = "scale(3.77358491, 3.77358491)";
        background_zoom.classList.remove("unzoomed");
      };
      const unzoom = function() {
        hide(reward);
        hide(dock_left);
        hide(dock_right);
        hide(boat_0_left_container);
        hide(boat_1_right_container);
        hide(boat_2_left_container);
        hide(boat_3_right_container);
        background_zoom.classList.add("unzoomed");
        background_zoom.classList.remove("zoomed");
      };
      const show_ocean = () => {
        show(ocean);
        show(islands);
        hide(dock_left);
        hide(dock_right);
        hide(boats[0]);
        hide(boats[1]);
        hide(boats[2]);
        hide(boats[3]);
        hide(boat_dummy_left_container);
        hide(boat_dummy_right_container);
        hide(boats_bottom[0]);
        hide(boats_bottom[1]);
        hide(boats_bottom[2]);
        hide(boats_bottom[3]);
        hide(boat_dummy_bottom_container);
        hide(reward);
        hide(failure);
      };
      show_ocean();
      const end_trial = () => {
        jsPsych.pluginAPI.clearAllTimeouts();
        remove_listeners();
        display_element.innerHTML = "";
        jsPsych.finishTrial(trial_data);
      };
      const choose_boat_left = (island) => {
        partial_fade_out(background_opacity);
        fade_out(dock_right);
        const boat2 = 2 * island;
        trial_data.boat = boat2;
        fade_out(island_boats[island][1]);
      };
      const fade_in_island = (island) => {
        fade_in(dock_left);
        fade_in(dock_right);
        fade_in(island_boats[island][0]);
        fade_in(island_boats[island][1]);
      };
      let scenes_dict = {};
      scenes_dict["islands"] = [
        {
          forward: [
            [show_ocean, 0],
            [hide, 0, dock_bottom]
          ],
          reverse: [
            [hide_reward, 0],
            [partial_fade_in, 0, ocean],
            [partial_fade_in, 0, islands]
          ],
          text: "<p>Welcome! You can navigate forwards and backwards through these instructions using left and right arrows, or using the buttons.</p>"
        },
        {
          forward: [
            [show_reward, 0],
            [partial_fade_out, 0, ocean],
            [partial_fade_out, 0, islands]
          ],
          reverse: [
            [show_reward, 0],
            [partial_fade_out, 0, islands]
          ],
          text: "<p>In this game, you'll be sailing to islands to look for treasure. At the end of the task, the treasure you've earned will be converted into a performance bonus.</p>"
        },
        {
          forward: [
            [hide_reward, 0],
            [partial_fade_in, 0, islands]
          ],
          reverse: [
            [unzoom, 0]
          ],
          text: "<p>There are two islands you can explore.</p>"
        },
        {
          forward: [
            [zoom, 0, 0]
          ],
          reverse: [
            [unzoom, 0],
            [zoom, 600, 0]
          ],
          text: "<p>On each turn, you can choose one island:<br/>The left island,</p>"
        },
        {
          forward: [
            [unzoom, 0],
            [zoom, 600, 1]
          ],
          reverse: [
            [zoom, 0, 1]
          ],
          text: "<p>On each turn, you can choose one island:<br/>The left island,</p><p>or the right island.</p>"
        },
        {
          forward: [
            [unzoom, 0]
          ],
          reverse: [],
          text: "<p>On the next screen, we'll try out exploring the islands.</p>"
        }
      ];
      scenes_dict["boats"] = [
        {
          forward: [
            [show_ocean, 0],
            [hide, 0, dock_bottom]
          ],
          reverse: [
            [hide_reward, 0],
            [partial_fade_in, 0, ocean],
            [partial_fade_in, 0, islands],
            [unzoom, 0]
          ],
          text: "<p>Great! Now we'll see how to find treasure.</p>"
        },
        {
          forward: [
            [zoom, 0, 1],
            [hide_reward, 0],
            [fade_in_island, 500, 1]
          ],
          reverse: [],
          text: "<p>Each island is the home base of two merchant ships. You can always identify each merchant by the pattern on their sail.</p>"
        },
        {
          forward: [],
          reverse: [
            [unzoom, 0],
            [zoom, 500, 1],
            [fade_in_island, 1e3, 1]
          ],
          text: "<p>The ships that you see right now are different than the ships you will see once the game begins.</p>"
        },
        {
          forward: [
            [unzoom, 0],
            [zoom, 500, 0],
            [fade_in_island, 1e3, 0]
          ],
          reverse: [
            [fade_in_island, 0, 0],
            [partial_fade_in, 0, background_opacity]
          ],
          text: "<p>The ships on each island are different. A very important tip is that each ship will always be on the same island.</p>"
        },
        {
          forward: [
            [choose_boat_left, 0, 0]
          ],
          reverse: [
            [choose_boat_left, 0, 0],
            [hide_reward, 0]
          ],
          text: "<p>When visiting an island, you can choose one of the two merchants to meet.</p>"
        },
        {
          forward: [
            [fade_in, 0, reward]
          ],
          reverse: [
            [show, 0, reward],
            [hide, 0, plus_one],
            [() => {
              plus_one.style.transitionDuration = "0ms";
            }, 500],
            [() => {
              plus_one.style.top = "51%";
            }, 0]
          ],
          text: "<p>The merchants are constantly traveling for trade. If their recent voyage was successful, they'll share their treasure with you.</p>"
        },
        {
          forward: [
            [hide, 500, reward],
            [show, 500, plus_one],
            [() => {
              plus_one.style.top = "40%";
            }, 500],
            [() => {
              plus_one.style.transitionDuration = "1000ms";
            }, 500],
            [fade_out, 550, plus_one]
          ],
          reverse: [
            [hide, 0, failure],
            [show, 0, reward],
            [hide, 500, reward],
            [show, 500, plus_one],
            [() => {
              plus_one.style.transitionDuration = "1000ms";
            }, 500],
            [() => {
              plus_one.style.top = "40%";
            }, 500],
            [fade_out, 550, plus_one]
          ],
          text: "<p>If the merchant has treasure, press &lt;Space&gt; to collect it.</p>"
        },
        {
          forward: [
            [hide, 0, plus_one],
            [() => {
              plus_one.style.transitionDuration = "0ms";
            }, 500],
            [() => {
              plus_one.style.top = "51%";
            }, 0],
            [fade_in, 0, failure]
          ],
          reverse: [
            [fade_in, 0, failure]
          ],
          text: "<p>However, if the merchant wasn't successful, they won't have anything to share with you.</p>"
        },
        {
          forward: [
            [fade_out, 0, failure]
          ],
          reverse: [],
          text: "<p>Let's do a brief demonstration of how this works.</p>"
        }
      ];
      scenes_dict["navigation_quiz"] = [
        {
          forward: [
            [show_ocean, 0],
            [hide, 0, dock_bottom]
          ],
          reverse: [],
          text: "<p>Great! Next, we will ask you some questions about the task.<br/>You must answer all the questions correctly to continue.</p>"
        }
      ];
      scenes_dict["reward"] = [
        {
          forward: [
            [quick_zoom, 0, 0],
            [fade_in_island, 0, 0]
          ],
          reverse: [
            [fade_in, 0, background_opacity],
            [fade_in, 0, islands],
            [fade_in, 0, dock_left],
            [fade_in, 0, dock_right],
            [() => {
              boat_2_left.style.left = "0%";
            }, 0],
            [() => {
              boat_3_right.style.left = "79.25%";
            }, 0],
            [hide, 0, boat_2_left_container],
            [hide, 0, boat_3_right_container]
          ],
          text: "<p>As the game goes on, you may notice that some merchants are more likely to have treasure than others.</p>"
        },
        {
          forward: [
            [fade_out, 0, background_opacity],
            [fade_out, 0, islands],
            [fade_out, 0, dock_left],
            [fade_out, 0, dock_right],
            [() => {
              boat_2_left.style.left = "26.41666667%";
            }, 0],
            [() => {
              boat_3_right.style.left = "52.83333333%";
            }, 0],
            [fade_in, 0, boat_2_left_container],
            [fade_in, 0, boat_3_right_container]
          ],
          reverse: [
            [() => {
              boat_2_left.style.left = "26.41666667%";
            }, 0],
            [() => {
              boat_3_right.style.left = "52.83333333%";
            }, 0],
            [fade_in, 0, boat_0_left_container],
            [fade_in, 0, boat_1_right_container],
            [fade_in, 0, boat_2_left_container],
            [fade_in, 0, boat_3_right_container],
            [hide, 0, boat_dummy_bottom_container]
          ],
          text: "<p>If you want to collect the most treasure, you'll have to learn which merchants are the most successful.</p>"
        },
        {
          forward: [
            [fade_out, 0, boat_0_left_container],
            [fade_out, 0, boat_2_left_container],
            [fade_out, 0, boat_3_right_container],
            [fade_out, 0, boat_1_right_container],
            [fade_in, 0, boat_dummy_bottom_container]
          ],
          reverse: [
            [hide, 0, reward_ex_0],
            [hide, 0, reward_ex_1],
            [hide, 0, reward_ex_2],
            [hide, 0, reward_ex_3],
            [hide, 0, reward_ex_4],
            [hide, 0, reward_ex_5],
            [hide, 0, reward_ex_6],
            [hide, 0, reward_ex_7],
            [hide, 0, reward_ex_8],
            [hide, 0, reward_ex_9],
            [hide, 0, reward_ex_10],
            [hide, 0, reward_ex_11]
          ],
          text: "<p>The fortune of a merchant can change over time, however.</p>"
        },
        {
          forward: [
            [fade_in, 0, reward_ex_0],
            [fade_in, 150, reward_ex_1],
            [fade_in, 300, reward_ex_2],
            [fade_in, 450, reward_ex_3],
            [fade_in, 600, reward_ex_4],
            [fade_in, 750, reward_ex_5],
            [fade_in, 900, reward_ex_6],
            [fade_in, 1050, reward_ex_7],
            [fade_in, 1200, reward_ex_8],
            [fade_in, 1350, reward_ex_9],
            [fade_in, 1450, reward_ex_10],
            [fade_in, 1500, reward_ex_11]
          ],
          reverse: [
            [partial_fade_in, 0, reward_ex_0],
            [partial_fade_in, 90, reward_ex_1],
            [partial_fade_in, 180, reward_ex_2],
            [partial_fade_in, 270, reward_ex_3],
            [partial_fade_in, 360, reward_ex_4],
            [partial_fade_in, 450, reward_ex_5],
            [partial_fade_in, 540, reward_ex_6],
            [partial_fade_in, 630, reward_ex_7],
            [partial_fade_in, 720, reward_ex_8],
            [partial_fade_in, 810, reward_ex_9],
            [partial_fade_in, 900, reward_ex_10],
            [partial_fade_in, 990, reward_ex_11],
            [hide, 0, reward_ex_12],
            [hide, 0, reward_ex_13],
            [hide, 0, reward_ex_14],
            [hide, 0, reward_ex_15],
            [hide, 0, reward_ex_16],
            [hide, 0, reward_ex_17],
            [hide, 0, reward_ex_18],
            [hide, 0, reward_ex_19],
            [hide, 0, reward_ex_20],
            [hide, 0, reward_ex_21],
            [hide, 0, reward_ex_22],
            [hide, 0, reward_ex_23]
          ],
          text: "<p>For example, one merchant might return with treasure almost all the time at the beginning.</p>"
        },
        {
          forward: [
            [partial_fade_out, 0, reward_ex_0],
            [partial_fade_out, 0, reward_ex_1],
            [partial_fade_out, 0, reward_ex_2],
            [partial_fade_out, 0, reward_ex_3],
            [partial_fade_out, 0, reward_ex_4],
            [partial_fade_out, 0, reward_ex_5],
            [partial_fade_out, 0, reward_ex_6],
            [partial_fade_out, 0, reward_ex_7],
            [partial_fade_out, 0, reward_ex_8],
            [partial_fade_out, 0, reward_ex_9],
            [partial_fade_out, 0, reward_ex_10],
            [partial_fade_out, 0, reward_ex_11],
            [fade_in, 0, reward_ex_12],
            [fade_in, 90, reward_ex_13],
            [fade_in, 180, reward_ex_14],
            [fade_in, 270, reward_ex_15],
            [fade_in, 360, reward_ex_16],
            [fade_in, 450, reward_ex_17],
            [fade_in, 540, reward_ex_18],
            [fade_in, 630, reward_ex_19],
            [fade_in, 720, reward_ex_20],
            [fade_in, 810, reward_ex_21],
            [fade_in, 900, reward_ex_22],
            [fade_in, 990, reward_ex_23]
          ],
          text: "<p>But later, that same merchant might rarely return with treasure.</p>",
          reverse: []
        },
        {
          forward: [],
          reverse: [
            [partial_fade_in, 0, reward_ex_0],
            [partial_fade_in, 0, reward_ex_1],
            [partial_fade_in, 0, reward_ex_2],
            [partial_fade_in, 0, reward_ex_3],
            [partial_fade_in, 0, reward_ex_4],
            [partial_fade_in, 0, reward_ex_5],
            [partial_fade_in, 0, reward_ex_6],
            [partial_fade_in, 0, reward_ex_7],
            [partial_fade_in, 0, reward_ex_8],
            [partial_fade_in, 0, reward_ex_9],
            [partial_fade_in, 0, reward_ex_10],
            [partial_fade_in, 0, reward_ex_11],
            [fade_in, 0, reward_ex_12],
            [fade_in, 0, reward_ex_13],
            [fade_in, 0, reward_ex_14],
            [fade_in, 0, reward_ex_15],
            [fade_in, 0, reward_ex_16],
            [fade_in, 0, reward_ex_17],
            [fade_in, 0, reward_ex_18],
            [fade_in, 0, reward_ex_19],
            [fade_in, 0, reward_ex_20],
            [fade_in, 0, reward_ex_21],
            [fade_in, 0, reward_ex_22],
            [fade_in, 0, reward_ex_23],
            [hide, 0, islands],
            [fade_out, 0, background_opacity],
            [zoom, 0, 0],
            [show, 0, boat_dummy_bottom_container]
          ],
          text: "<p>This means the best merchant to visit may change as well. However, this change in fortunes will be very slow.</p>"
        },
        {
          forward: [
            [hide, 0, reward_ex_0],
            [hide, 0, reward_ex_1],
            [hide, 0, reward_ex_2],
            [hide, 0, reward_ex_3],
            [hide, 0, reward_ex_4],
            [hide, 0, reward_ex_5],
            [hide, 0, reward_ex_6],
            [hide, 0, reward_ex_7],
            [hide, 0, reward_ex_8],
            [hide, 0, reward_ex_9],
            [hide, 0, reward_ex_10],
            [hide, 0, reward_ex_11],
            [hide, 0, reward_ex_12],
            [hide, 0, reward_ex_13],
            [hide, 0, reward_ex_14],
            [hide, 0, reward_ex_15],
            [hide, 0, reward_ex_16],
            [hide, 0, reward_ex_17],
            [hide, 0, reward_ex_18],
            [hide, 0, reward_ex_19],
            [hide, 0, reward_ex_20],
            [hide, 0, reward_ex_21],
            [hide, 0, reward_ex_22],
            [hide, 0, reward_ex_23],
            [show, 0, islands],
            [fade_in, 0, background_opacity],
            [unzoom, 0],
            [hide, 0, boat_dummy_bottom_container]
          ],
          text: "<p>Importantly, each merchant visits a unique set of trading ports.</p>",
          reverse: [
            [hide, 0, boat_0_left_container],
            [hide, 0, boat_1_right_container],
            [hide, 0, no_merchant_link]
          ]
        },
        {
          text: "<p>This means that one merchant's success or failure tells you nothing at all about how the other merchants are doing.</p>",
          forward: [
            [fade_in, 0, boat_0_left_container],
            [fade_in, 0, boat_1_right_container],
            [fade_in, 0, no_merchant_link]
          ],
          reverse: [
            [hide, 0, independent_turns],
            [fade_in, 0, boat_0_left_container],
            [fade_in, 0, boat_1_right_container],
            [fade_in, 0, no_merchant_link]
          ]
        },
        {
          text: "<p>Merchants also don't hold on to their treasure between turns, and before every turn make a new trip to their trading ports.</p>",
          forward: [
            [hide, 0, boat_0_left_container],
            [hide, 0, boat_1_right_container],
            [hide, 0, no_merchant_link],
            [fade_in, 0, independent_turns]
          ],
          reverse: [
            [hide, 0, reward],
            [fade_in, 0, independent_turns]
          ]
        },
        {
          text: "<p>Therefore, except for paying attention to which merchants are more or less successful, there's no other pattern to finding more treasure.</p>",
          forward: [
            [hide, 0, independent_turns],
            [fade_in, 0, reward]
          ],
          reverse: [
            [fade_in, 0, reward]
          ]
        },
        {
          text: "<p>Let's review how merchants work.</p>",
          forward: [
            [hide, 0, reward]
          ],
          reverse: []
        }
      ];
      scenes_dict["visits"] = [
        {
          text: "<p>Finally, in between your voyages, the same merchants may visit you instead.</p>",
          forward: [
            [() => {
              reward.style.top = "-23%";
            }, 0],
            [show, 0, islands],
            [show, 0, background_opacity],
            [show, 0, dock_bottom],
            [fade_in, 500, boat_0_bottom_container]
          ],
          reverse: []
        },
        {
          text: "<p>When this happens, you can check if the merchant has treasure.</p>",
          forward: [
            [fade_in, 0, reward]
          ],
          reverse: [
            [fade_in, 0, reward]
          ]
        },
        {
          text: "<p>The chance of treasure when the merchant visits you is exactly the same as when you visit that merchant at their island.</p>",
          forward: [
            [fade_out, 0, reward]
          ],
          reverse: []
        },
        {
          text: "<p>You can learn which merchants are best to visit either by visiting them, or having them visit you.</p>",
          forward: [],
          reverse: []
        },
        {
          text: "<p>We'll demonstrate a few turns of that now!</p>",
          forward: [],
          reverse: []
        }
      ];
      scenes_dict["timeout"] = [
        {
          forward: [
            [show_ocean, 0],
            [hide, 0, dock_bottom]
          ],
          reverse: [],
          text: "<p>One last thing: If you take more than 10 seconds to make your next choice, you'll see a warning.</p>"
        },
        {
          forward: [],
          reverse: [],
          text: "<p>If this happens too many times, the experiment will terminate early and you will not be able to complete it.</p>"
        }
      ];
      scenes_dict["ready"] = [
        {
          forward: [
            [show_ocean, 0],
            [hide, 0, dock_bottom]
          ],
          reverse: [],
          text: "<p>Great! You're ready to start the game. A bar on the top of the screen will show your progress. Whenever you're ready to continue, use your mouse to click next.</p>"
        }
      ];
      const scenes = scenes_dict[trial.instruction_set];
      let scene_idx = -1;
      const forward = function() {
        scene_idx += 1;
        if (scene_idx > scenes.length - 1) {
          end_trial();
        } else {
          const scene = scenes[scene_idx].forward;
          instructions.innerHTML = scenes[scene_idx].text;
          let max_delay = 0;
          for (let i = 0; i < scene.length; i += 1) {
            const fn = scene[i][0];
            const delay = scene[i][1];
            const args = scene[i].slice(2);
            jsPsych.pluginAPI.setTimeout(() => fn(...args), delay);
            max_delay = Math.max(max_delay, delay);
          }
          jsPsych.pluginAPI.setTimeout(add_listeners, max_delay);
        }
      };
      const back = function() {
        scene_idx -= 1;
        const scene = scenes[scene_idx].reverse;
        instructions.innerHTML = scenes[scene_idx].text;
        let max_delay = 0;
        for (let i = 0; i < scene.length; i += 1) {
          const fn = scene[i][0];
          const delay = scene[i][1];
          const args = scene[i].slice(2);
          jsPsych.pluginAPI.setTimeout(() => fn(...args), delay);
          max_delay = Math.max(max_delay, delay);
        }
        jsPsych.pluginAPI.setTimeout(add_listeners, max_delay);
      };
      const add_listeners = function() {
        if (scene_idx !== 0) {
          instructions_back.disabled = false;
          instructions_back.addEventListener("click", btnBackListener);
          if (trial.allow_keyboard_response) {
            jsPsych.pluginAPI.getKeyboardResponse({
              callback_function: kbdListener,
              valid_responses: ["ArrowLeft", "ArrowRight"],
              rt_method: "performance",
              persist: false,
              allow_held_key: false
            });
          }
        } else {
          instructions_back.disabled = true;
          if (trial.allow_keyboard_response) {
            jsPsych.pluginAPI.getKeyboardResponse({
              callback_function: kbdListener,
              valid_responses: ["ArrowRight"],
              rt_method: "performance",
              persist: false,
              allow_held_key: false
            });
          }
        }
        instructions_next.addEventListener("click", btnFwdListener);
      };
      const remove_listeners = function() {
        instructions_next.removeEventListener("click", btnFwdListener);
        instructions_back.removeEventListener("click", btnBackListener);
        jsPsych.pluginAPI.cancelAllKeyboardResponses();
      };
      function btnFwdListener(evt) {
        remove_listeners();
        forward();
      }
      function btnBackListener(evt) {
        remove_listeners();
        back();
      }
      const kbdListener = function(info) {
        remove_listeners();
        if (info.key === "arrowleft") {
          back();
        } else if (info.key === "arrowright") {
          forward();
        } else {
          add_listeners();
        }
      };
      forward();
    });
    return plugin;
  }();
})();

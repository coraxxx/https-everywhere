var backgroundPage = null;
var allRulesDiv = null;
var allRulesList = {};

function toggleRuleLine(checkbox, ruleset) {
  ruleset.active = checkbox.checked;

  if (ruleset.active != ruleset.default_state) {
    localStorage[ruleset.name] = ruleset.active;
  } else {
    delete localStorage[ruleset.name];
  }
}

function createRuleLine(ruleset) {

  // parent block for line
  var line = document.createElement("div");
  line.className = "rule checkbox";

  // label "container"
  var label = document.createElement("label");

  // checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = ruleset.active;
  checkbox.onchange = function(ev) { toggleRuleLine(checkbox, ruleset); };

  // label text
  var labelText = document.createElement("span");
  labelText.innerText = ruleset.name;

  label.appendChild(checkbox);
  label.appendChild(labelText);

  if (ruleset.note.length) {
    var noteText = document.createElement("span");
    noteText.innerText = " - " + ruleset.note;
    noteText.className = "note"
    label.appendChild(noteText);
  }

  line.appendChild(label);

  return line;
}

function listRules(pattern) {
  var rulesets = allRulesList;

  for (r in rulesets) {
    var listDiv = allRulesDiv;
    var ruleDiv = createRuleLine(rulesets[r]);
    if (rulesets[r].active != rulesets[r].default_state) {
      ruleDiv.className += " user-set";
    }
    listDiv.appendChild(ruleDiv);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  backgroundPage = chrome.extension.getBackgroundPage();
  allRulesList = backgroundPage.all_rules.rules;
  allRulesDiv = document.getElementById("AllRules");
  listRules("*");
});

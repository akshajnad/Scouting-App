/* ------------------------------------------------------
   script.js
   Integrated functionality:
   - EVENT_CODE is set to "2024cthar"
   - Pulls team and match data from TBA using the provided API key
   - Free-form interactive field: stores (x,y) coordinates then converts them into a grid cell number (12x6) for output
   - Auto-fills team number based on match number, match type, and robot selection
   - Reset form automatically increments match number while preserving scouter name, robot, match type, and team number
   - Builds QR code data as short-code key=value; string with specific value transformations (no trailing semicolon)
   - The QR code popup covers the entire screen and the QR code is sized to fit without scrolling
------------------------------------------------------ */

/* ===== TBA Interface Functions ===== */
var teams = null;
var schedule = null;
var authKey = "2XACou7MLBnRarV4LPD69OOTMzSccjEfedI2diYMvzuxbD6d2E9U9PEiPppOPjsE";
const EVENT_CODE = "2025ctwat";  // Set your event code here

function getTeams(eventCode) {
  if (authKey) {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://www.thebluealliance.com/api/v3/event/" + eventCode + "/teams/simple";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("X-TBA-Auth-Key", authKey);
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        teams = JSON.parse(this.responseText);
        console.log("Teams loaded:", teams);
      }
    };
    xmlhttp.send();
  }
}

function getSchedule(eventCode) {
  if (authKey) {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://www.thebluealliance.com/api/v3/event/" + eventCode + "/matches/simple";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("X-TBA-Auth-Key", authKey);
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        schedule = JSON.parse(this.responseText);
        console.log("Schedule loaded:", schedule);
        autoFillTeamNumber();
      }
    };
    xmlhttp.send();
  }
}

/* ===== Timer Functions ===== */
let timerInterval = null;
let elapsedTime = 0;
let isRunning = false;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const fraction = Math.floor((ms % 1000) / 100);
  return String(minutes).padStart(2, '0') + ':' +
         String(seconds).padStart(2, '0') + '.' + fraction;
}
function updateTimerDisplay() {
  document.getElementById('timeToScoreCoralDisplay') && (document.getElementById('timeToScoreCoralDisplay').textContent = formatTime(elapsedTime));
}
function startStopTimer() {
  if (!isRunning) {
    isRunning = true;
    const startTime = Date.now() - elapsedTime;
    document.getElementById('startStopTimerBtn') && (document.getElementById('startStopTimerBtn').textContent = 'Stop');
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTimerDisplay();
    }, 100);
  } else {
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('startStopTimerBtn') && (document.getElementById('startStopTimerBtn').textContent = 'Start');
    document.getElementById('timeToScoreCoral') && (document.getElementById('timeToScoreCoral').value = (elapsedTime / 1000).toFixed(2));
  }
}
function lapTimer() {
  document.getElementById('timeToScoreCoral') && (document.getElementById('timeToScoreCoral').value = (elapsedTime / 1000).toFixed(2));
  alert('Lap recorded: ' + document.getElementById('timeToScoreCoral').value + 's');
}
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
  elapsedTime = 0;
  document.getElementById('startStopTimerBtn') && (document.getElementById('startStopTimerBtn').textContent = 'Start');
  updateTimerDisplay();
  document.getElementById('timeToScoreCoral') && (document.getElementById('timeToScoreCoral').value = '0.00');
}

/* ===== Increment/Decrement for Counters ===== */
function increment(id) {
  const el = document.getElementById(id);
  let val = parseInt(el.value, 10);
  if (isNaN(val)) val = 0;
  el.value = val + 1;
}
function decrement(id) {
  const el = document.getElementById(id);
  let val = parseInt(el.value, 10);
  if (isNaN(val)) val = 0;
  if (val > 0) el.value = val - 1;
}

/* ===== Slider Updates ===== */
function updateOffenseSkillDisplay() {
  document.getElementById('offenseSkillValue').textContent = document.getElementById('offenseSkill').value;
}
function updateDefenseSkillDisplay() {
  document.getElementById('defenseSkillValue').textContent = document.getElementById('defenseSkill').value;
}

/* ===== Interactive Field (Free Selection) ===== */
function onFieldClick(event) {
  const map = document.getElementById('fieldMap');
  const rect = map.getBoundingClientRect();
  const x = event.offsetX;
  const y = event.offsetY;
  const coordsArray = [x + "," + y];
  document.getElementById('startingPosition').value = JSON.stringify(coordsArray);
  const dot = document.getElementById('redDot');
  dot.style.left = (x - 7) + "px";
  dot.style.top = (y - 7) + "px";
  dot.style.display = "block";
  checkMandatory();
}

/* ===== Mandatory Fields Check ===== */
function validateMandatoryFields() {
  const scouter = document.getElementById('scouterInitials').value.trim();
  const robot = document.getElementById('robotNumber').value.trim();
  const startPos = document.getElementById('startingPosition').value.trim();
  const comments = document.getElementById('comments').value.trim();
  return scouter && robot && startPos && comments;
}
function checkMandatory() {
  document.getElementById('commitButton').disabled = !validateMandatoryFields();
}

/* ===== Auto-Fill Team Number (TBA) ===== */
function getRobot() {
  let r = document.getElementById("robotNumber").value;
  if (!r) return "";
  return r.toLowerCase().replace("red ", "r").replace("blue ", "b");
}
function getCurrentMatchKey() {
  const matchType = document.getElementById("matchType").value;
  const matchNumber = document.getElementById("matchNumber").value;
  return EVENT_CODE + "_" + matchType + matchNumber;
}
function getMatch(matchKey) {
  if (schedule) {
    let ret = null;
    schedule.forEach(match => {
      if (match.key === matchKey) {
        ret = match;
      }
    });
    return ret;
  }
  return null;
}
function getCurrentMatch() {
  return getMatch(getCurrentMatchKey());
}
function getCurrentTeamNumberFromRobot() {
  const robot = getRobot();
  const match = getCurrentMatch();
  if (robot && match) {
    if (robot.charAt(0) === "r") {
      let index = parseInt(robot.charAt(1)) - 1;
      return match.alliances.red.team_keys[index];
    } else if (robot.charAt(0) === "b") {
      let index = parseInt(robot.charAt(1)) - 1;
      return match.alliances.blue.team_keys[index];
    }
  }
  return "";
}
function autoFillTeamNumber() {
  const matchType = document.getElementById("matchType").value;
  const matchNumber = document.getElementById("matchNumber").value;
  const robot = document.getElementById("robotNumber").value;
  if (!matchType || !matchNumber || !robot) return;
  if (!schedule) {
    console.log("Schedule not loaded yet. Reloading...");
    getSchedule(EVENT_CODE);
    return;
  }
  const team = getCurrentTeamNumberFromRobot();
  if (team) {
    document.getElementById("teamNumber").value = team.replace("frc", "");
    console.log("Auto-filled team number:", team.replace("frc", ""));
  } else {
    console.log("Match not found for key:", getCurrentMatchKey());
  }
}

/* ===== Build Short-Code Data String (no trailing semicolon) ===== */
function getFormDataString() {
  const fieldsMap = [
    { code: 'si', id: 'scouterInitials' },
    { code: 'mn', id: 'matchNumber' },
    { code: 'mt', id: 'matchType' },
    { code: 'rb', id: 'robotNumber' },
    { code: 'tn', id: 'teamNumber' },
    { code: 'sp', id: 'startingPosition' },
    { code: 'ns', id: 'noShow' },
    { code: 'cp', id: 'cagePosition' },
    
    { code: 'ma', id: 'movedAuto' },
    { code: 'c1a', id: 'coralL1Auto' },
    { code: 'c2a', id: 'coralL2Auto' },
    { code: 'c3a', id: 'coralL3Auto' },
    { code: 'c4a', id: 'coralL4Auto' },
    { code: 'baa', id: 'bargeAlgaeAuto' },
    { code: 'paa', id: 'processorAlgaeAuto' },
    { code: 'daa', id: 'dislodgedAlgaeAuto' },
    { code: 'af', id: 'autoFoul' },
    
    { code: 'dat', id: 'dislodgedAlgaeTele' },
    { code: 'pl', id: 'pickupLocation' },
    { code: 'c1t', id: 'coralL1Tele' },
    { code: 'c2t', id: 'coralL2Tele' },
    { code: 'c3t', id: 'coralL3Tele' },
    { code: 'c4t', id: 'coralL4Tele' },
    { code: 'bat', id: 'bargeAlgaeTele' },
    { code: 'pat', id: 'processorAlgaeTele' },
    { code: 'tf', id: 'teleFouls' },
    { code: 'cf', id: 'crossedField' },
    { code: 'tfell', id: 'tippedFell' },
    { code: 'toc', id: 'touchedOpposingCage' },
    
    { code: 'ep', id: 'endPosition' },
    { code: 'def', id: 'defended' },
    
    { code: 'ofs', id: 'offenseSkill' },
    { code: 'dfs', id: 'defenseSkill' },
    { code: 'cs', id: 'cardStatus' },
    { code: 'cm', id: 'comments' }
  ];
  
  let pairs = [];
  fieldsMap.forEach(fm => {
    const el = document.getElementById(fm.id);
    let val = '';
    if (!el) {
      val = '';
    } else if (fm.id === "startingPosition") {
      // Convert free selection coordinate to grid cell number (12×6).
      try {
        let coordsArr = JSON.parse(el.value);
        if (coordsArr.length > 0) {
          let parts = coordsArr[0].split(",");
          let x = parseFloat(parts[0]);
          let y = parseFloat(parts[1]);
          let img = document.querySelector("#fieldMap img");
          let rect = img.getBoundingClientRect();
          let cell = Math.ceil(x / (rect.width / 12)) + ((Math.ceil(y / (rect.height / 6)) - 1) * 12);
          val = cell;
        }
      } catch (e) {
        val = "";
      }
    } else if (el.type === 'checkbox') {
      val = el.checked ? 't' : 'f';
    } else {
      val = el.value;
      // Transform certain fields
      if (fm.id === "robotNumber") {
        val = val.toLowerCase().replace("red ", "r").replace("blue ", "b");
      }
      if (fm.id === "pickupLocation") {
        if (val.toLowerCase() === "none") val = "n";
        else if (val.toLowerCase() === "ground") val = "g";
        else if (val.toLowerCase() === "human player") val = "hp";
        else if (val.toLowerCase() === "both") val = "b";
      }
      if (fm.id === "cagePosition") {
        if (val.toLowerCase() === "shallow") val = "s";
        else if (val.toLowerCase() === "deep") val = "d";
      }
      if (fm.id === "matchType") {
        if (val === "qm") val = "q";
        else if (val === "qf") val = "p";
        else if (val === "f") val = "f";
      }
      if (fm.id === "endPosition") {
        if (val === "Not Parked") val = "np";
        else if (val === "Parked") val = "p";
        else if (val === "Shallow Climb") val = "sc";
        else if (val === "Deep Climb") val = "dc";
        else if (val === "Failed Climb") val = "fc";
      }
      if (fm.id === "cardStatus") {
        if (val === "No Card") val = "nc";
        else if (val === "Yellow Card") val = "yc";
        else if (val === "Red Card") val = "rc";
      }
    }
    pairs.push(`${fm.code}=${val}`);
  });
  return pairs.join(";");
}

/* ===== QR Modal Functions ===== */
function showQRModal(dataString) {
  const modal = document.getElementById('qrModal');
  const qrDataP = document.getElementById('qrData');
  const qrCodeContainer = document.getElementById('qrCode');
  qrCodeContainer.innerHTML = '';

  // Dynamically size the QR code based on the smaller dimension of the screen
  // so it fits without scrolling, with some padding for text
  const qrSize = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.8);

  new QRCode(qrCodeContainer, {
    text: dataString,
    width: 500,
    height: 500,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  qrDataP.textContent = dataString;
  modal.style.display = 'block';
}
function closeQRModal() {
  document.getElementById('qrModal').style.display = 'none';
}

/* ===== Reset Form (Auto-Increment Match Number) ===== */
function resetForm() {
  const matchInput = document.getElementById("matchNumber");
  let currentMatch = parseInt(matchInput.value, 10);
  if (!isNaN(currentMatch)) {
    matchInput.value = currentMatch + 1;
  }
  // Fields to retain between matches
  const retainIds = ["scouterInitials", "robotNumber", "matchType", "teamNumber"];
  document.querySelectorAll('input, select, textarea').forEach(el => {
    if (el.id === "matchNumber" || el.id === "eventCode") return;
    if (retainIds.includes(el.id)) return;
    if (el.type === 'checkbox') {
      el.checked = false;
    } else if (el.type === 'number') {
      el.value = 0;
    } else if (el.tagName.toLowerCase() === 'select') {
      el.selectedIndex = 0;
    } else {
      el.value = '';
    }
  });
  resetTimer();
  document.getElementById('redDot').style.display = 'none';
  document.getElementById('startingPosition').value = '';
  document.getElementById('commitButton').disabled = true;
  autoFillTeamNumber();
}

/* ===== Copy Column Names (Short Codes) ===== */
function copyColumnNames() {
  const columns = [
    'si','mn','mt','rb','tn','sp','ns','cp',
    'ma','c1a','c2a','c3a','c4a','baa','paa','daa','af',
    'dat','pl','c1t','c2t','c3t','c4t','bat','pat','tf','cf','tfell','toc',
    'ep','def','ofs','dfs','cs','cm'
  ].join(",");
  navigator.clipboard.writeText(columns)
    .then(() => alert('Short-code column names copied!'))
    .catch(err => console.error('Failed to copy column names', err));
}

/* ===== Window Onload: Initialize Everything ===== */
window.onload = () => {
  getTeams(EVENT_CODE);
  getSchedule(EVENT_CODE);

  document.getElementById('startStopTimerBtn') && document.getElementById('startStopTimerBtn').addEventListener('click', startStopTimer);
  document.getElementById('lapTimerBtn') && document.getElementById('lapTimerBtn').addEventListener('click', lapTimer);
  document.getElementById('resetTimerBtn') && document.getElementById('resetTimerBtn').addEventListener('click', resetTimer);

  document.getElementById('fieldMap').addEventListener('click', onFieldClick);
  document.getElementById('flipFieldBtn').addEventListener('click', () => {
    document.getElementById('fieldMap').classList.toggle('flipped');
  });
  document.getElementById('undoPositionBtn').addEventListener('click', () => {
    document.getElementById('redDot').style.display = 'none';
    document.getElementById('startingPosition').value = '';
    checkMandatory();
  });

  // When robot, match type, or match number change, auto-fill team number
  document.getElementById('robotNumber').addEventListener('change', () => {
    autoFillTeamNumber();
    checkMandatory();
  });
  document.getElementById('matchType').addEventListener('change', () => {
    autoFillTeamNumber();
  });
  document.getElementById('matchNumber').addEventListener('input', () => {
    autoFillTeamNumber();
  });

  // Watch mandatory fields
  document.querySelectorAll('#scouterInitials, #robotNumber, #startingPosition, #comments')
    .forEach(el => el.addEventListener('input', checkMandatory));

  // Commit button
  document.getElementById('commitButton').addEventListener('click', () => {
    if (!validateMandatoryFields()) {
      alert('Please fill out all required fields:\n- Scouter Name\n- Robot\n- Auto Start Position\n- Comments');
      return;
    }
    const dataStr = getFormDataString();
    showQRModal(dataStr);
  });

  // Reset form button
  document.getElementById('resetButton').addEventListener('click', resetForm);

  // Copy column names button
  document.getElementById('copyColumnNamesButton').addEventListener('click', copyColumnNames);

  // Modal close events
  document.getElementById('closeModal').addEventListener('click', closeQRModal);
  window.addEventListener('click', e => {
    if (e.target === document.getElementById('qrModal')) {
      closeQRModal();
    }
  });

  resetForm();
  updateTimerDisplay();
};

/* ------------------------------------------------------
   script.js
   - EVENT_CODE = "2024cthar"
   - TBA data pull, auto-fill team number, and short-code QR data (no trailing semicolon)
   - Reset form increments match number while retaining scouter name, robot, match type, and team number
   - QR code popup is full-screen; QR code is sized to 75% of the smaller screen dimension
------------------------------------------------------ */

var teams = null;
var schedule = null;
var authKey = "2XACou7MLBnRarV4LPD69OOTMzSccjEfedI2diYMvzuxbD6d2E9U9PEiPppOPjsE";
const EVENT_CODE = "2025ctwat";  // set your event code here

var LZString=function(){var f=String.fromCharCode,keyStrUriSafe="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",baseReverseDic={};function getBaseValue(alphabet,character){if(!baseReverseDic[alphabet]){baseReverseDic[alphabet]={};for(var i=0;i<alphabet.length;i++){baseReverseDic[alphabet][alphabet.charAt(i)]=i}}return baseReverseDic[alphabet][character]}function compressToEncodedURIComponent(input){if(input==null)return"";return _compress(input,6,function(a){return keyStrUriSafe.charAt(a)})}function decompressFromEncodedURIComponent(input){if(input==null)return"";if(input=="")return null;return _decompress(input.length,32,function(index){return getBaseValue(keyStrUriSafe,input.charAt(index))})}function _compress(uncompressed,bitsPerChar,getCharFromInt){if(uncompressed==null)return"";var i,context_dictionary={},context_dictionaryToCreate={},context_c="",context_wc="",context_w="",context_enlargeIn=2,context_dictSize=3,context_numBits=2,context_data=[],context_data_val=0,context_data_position=0;for(i=0;i<uncompressed.length;i+=1){context_c=uncompressed.charAt(i);if(!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)){context_dictionary[context_c]=context_dictSize++;context_dictionaryToCreate[context_c]=true}context_wc=context_w+context_c;if(Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)){context_w=context_wc}else{if(Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)){if(context_w.charCodeAt(0)<256){for(var value=0;context_numBits>value;value++){context_data_val=(context_data_val<<1)|(context_w.charCodeAt(0)>>value&1);if(++context_data_position==bitsPerChar){context_data.push(getCharFromInt(context_data_val));context_data_val=0;context_data_position=0}}}else{for(var value=0;context_numBits>value;value++){context_data_val=(context_data_val<<1)|1; if(++context_data_position==bitsPerChar){context_data.push(getCharFromInt(context_data_val));context_data_val=0;context_data_position=0}}}context_enlargeIn--;if(context_enlargeIn==0){context_enlargeIn=Math.pow(2,context_numBits);context_numBits++}delete context_dictionaryToCreate[context_w]}else{for(var value=0;context_numBits>value;value++){context_data_val=(context_data_val<<1)|(context_dictionary[context_w]>>value&1);if(++context_data_position==bitsPerChar){context_data.push(getCharFromInt(context_data_val));context_data_val=0;context_data_position=0}}}context_enlargeIn--;if(context_enlargeIn==0){context_enlargeIn=Math.pow(2,context_numBits);context_numBits++}context_dictionary[context_wc]=context_dictSize++;context_w=context_c}}if(""!==context_w){if(Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)){if(context_w.charCodeAt(0)<256){for(var value=0;context_numBits>value;value++){context_data_val=(context_data_val<<1)|(context_w.charCodeAt(0)>>value&1);if(++context_data_position==bitsPerChar){context_data.push(getCharFromInt(context_data_val));context_data_val=0;context_data_position=0}}}else{for(var value=0;context_numBits>value;value++){context_data_val=(context_data_val<<1)|1;if(++context_data_position==bitsPerChar){context_data.push(getCharFromInt(context_data_val));context_data_val=0;context_data_position=0}}}context_enlargeIn--;if(context_enlargeIn==0){context_enlargeIn=Math.pow(2,context_numBits);context_numBits++}delete context_dictionaryToCreate[context_w]}else{for(var value=0;context_numBits>value;value++){context_data_val=(context_data_val<<1)|(context_dictionary[context_w]>>value&1);if(++context_data_position==bitsPerChar){context_data.push(getCharFromInt(context_data_val));context_data_val=0;context_data_position=0}}}for(var value=0;context_numBits>value;value++){context_data_val=(context_data_val<<1);if(++context_data_position==bitsPerChar){context_data.push(getCharFromInt(context_data_val));context_data_val=0;context_data_position=0}}return context_data.join("")}function _decompress(length,resetValue,getNextValue){var dictionary=[], next, enlargeIn=4, dictSize=4, numBits=3, entry="", result=[], i, w, bits, resb, maxpower, power, c="", data={val:getNextValue(0), position:resetValue,index:1};for(i=0;i<3;i+=1)dictionary[i]=i;for(bits=0,maxpower=Math.pow(2,3);bits<maxpower;bits+=1){resb=data.val&data.position;data.position>>=1;if(data.position==0){data.position=resetValue;data.val=getNextValue(data.index++);}bits|=(resb>0?1:0)<<bits;}switch(next=bits){case 0:for(bits=0,maxpower=Math.pow(2,8);bits<maxpower;bits+=1){resb=data.val&data.position;data.position>>=1;if(data.position==0){data.position=resetValue;data.val=getNextValue(data.index++);}next|=(resb>0?1:0)<<bits;}c=f(next);break;case 1:for(bits=0,maxpower=Math.pow(2,16);bits<maxpower;bits+=1){resb=data.val&data.position;data.position>>=1;if(data.position==0){data.position=resetValue;data.val=getNextValue(data.index++);}next|=(resb>0?1:0)<<bits;}c=f(next);break;case 2:return"";}dictionary[3]=c;w=c;result.push(c);while(true){if(data.index>length)return "";for(bits=0,maxpower=Math.pow(2,numBits);bits<maxpower;bits+=1){resb=data.val&data.position;data.position>>=1;if(data.position==0){data.position=resetValue;data.val=getNextValue(data.index++);}bits|=(resb>0?1:0)<<bits;}switch(c=bits){case 0:for(bits=0,maxpower=Math.pow(2,8);bits<maxpower;bits+=1){resb=data.val&data.position;data.position>>=1;if(data.position==0){data.position=resetValue;data.val=getNextValue(data.index++);}c|=(resb>0?1:0)<<bits;}dictionary[dictSize++]=f(c);c=dictSize-1;enlargeIn--;break;case 1:for(bits=0,maxpower=Math.pow(2,16);bits<maxpower;bits+=1){resb=data.val&data.position;data.position>>=1;if(data.position==0){data.position=resetValue;data.val=getNextValue(data.index++);}c|=(resb>0?1:0)<<bits;}dictionary[dictSize++]=f(c);c=dictSize-1;enlargeIn--;break;case 2:return result.join("");}if(enlargeIn==0){enlargeIn=Math.pow(2,numBits);numBits++}if(dictionary[c]){entry=dictionary[c]}else{if(c!==dictSize)return null;entry=w+w.charAt(0)}result.push(entry);dictionary[dictSize++]=w+entry.charAt(0);enlargeIn--;w=entry;if(enlargeIn==0){enlargeIn=Math.pow(2,numBits);numBits++}}}return {compressToEncodedURIComponent:compressToEncodedURIComponent,decompressFromEncodedURIComponent:decompressFromEncodedURIComponent}}();


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
    console.log("Schedule not loaded yet. Attempting to reload...");
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

/* ===== Build Short-Code Data String ===== */
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

  // Use 75% of the smaller screen dimension for the QR code size
  const qrSize = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.75);

  new QRCode(qrCodeContainer, {
    text: dataString,
    width: qrSize,
    height: qrSize,
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

/* ===== Reset Form ===== */
function resetForm() {
  const matchInput = document.getElementById("matchNumber");
  let currentMatch = parseInt(matchInput.value, 10);
  if (!isNaN(currentMatch)) {
    matchInput.value = currentMatch + 1;
  }
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

/* ===== Copy Column Names ===== */
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

  document.querySelectorAll('#scouterInitials, #robotNumber, #startingPosition, #comments')
    .forEach(el => el.addEventListener('input', checkMandatory));

  document.getElementById('commitButton').addEventListener('click', () => {
    if (!validateMandatoryFields()) {
      alert('Please fill out all required fields:\n- Scouter Name\n- Robot\n- Auto Start Position\n- Comments');
      return;
    }
    const dataStr = getFormDataString();
    showQRModal(dataStr);
  });

  document.getElementById('resetButton').addEventListener('click', resetForm);
  document.getElementById('copyColumnNamesButton').addEventListener('click', copyColumnNames);

  document.getElementById('closeModal').addEventListener('click', closeQRModal);
  window.addEventListener('click', e => {
    if (e.target === document.getElementById('qrModal')) {
      closeQRModal();
    }
  });

  resetForm();
  updateTimerDisplay();
};

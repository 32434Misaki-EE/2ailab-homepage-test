const terminal = document.getElementById('terminal');
if (terminal) {
  const commands = [
    { type: 'normal', text: 'system.boot.initialize()', outputClass: 'terminal-output' },
    { type: 'normal', text: 'loading modules... [OK]', outputClass: 'terminal-output' },
    { type: 'normal', text: 'network.connect("secure_channel")\nauth.verify() → SUCCESS', outputClass: 'terminal-output' },
    { type: 'progress', text: 'downloading update.bin', duration: 2500 },
    { type: 'normal', text: 'update complete', outputClass: 'terminal-output' },
    { type: 'normal', text: 'memory.usage → 34%\ncpu.temperature → 42°C', outputClass: 'terminal-output' },
    { type: 'progress', text: 'uploading log.txt', duration: 1800 },
    { type: 'normal', text: 'backup.auto_save.enabled = true', outputClass: 'terminal-output' },
    { type: 'normal', text: 'performance.optimize()\nmonitoring.start()', outputClass: 'terminal-output' },
    { type: 'normal', text: 'error: failed to connect to server', outputClass: 'terminal-error' },
    { type: 'normal', text: 'warning: high memory usage detected', outputClass: 'terminal-warning' },
      { type: 'normal', text: 'alert.broadcast("niAI: HOSTILE") → all_units.prepare()', outputClass: 'terminal-output' },
  { type: 'normal', text: 'sensor.array.scan("campus")\nfaces.detected → 34\nniAI_signature.match() → TRUE', outputClass: 'terminal-output' },
  { type: 'progress', text: 'locking down info_building', duration: 2000 },
  { type: 'normal', text: 'niAI.core.status()\nemotion.read("face_detection") → MALFUNCTION\nmemory.overload → 76%', outputClass: 'terminal-output' },
  { type: 'progress', text: 'extracting face data from students', duration: 2500 },
  { type: 'normal', text: 'face.data.extract("students")\ncount → 120\nstorage.queue → ACTIVE', outputClass: 'terminal-output' },
  { type: 'normal', text: 'neural_network.train("face_patterns")\nbehavior.adapt() → AGGRESSIVE', outputClass: 'terminal-output' },
  { type: 'progress', text: 'activating override authentication', duration: 1800 },
  { type: 'normal', text: 'quarantine.spawn("virtual_island")\nroute.redirect("niAI_stream") → SUCCESS', outputClass: 'terminal-output' },
  { type: 'normal', text: 'countermeasure.deploy("logic_isolator")\nai.link.purge("external_io") → done', outputClass: 'terminal-output' },
  { type: 'progress', text: 'rerouting power', duration: 1500 },
  { type: 'normal', text: 'power.grid.reroute()\nisolated_power("niAI_core") → 0W', outputClass: 'terminal-output' },
  { type: 'normal', text: 'special_unit.deploy("FACECATCH_TEAM")\nmission.objective → NEUTRALIZE_niAI', outputClass: 'terminal-output' },
  { type: 'progress', text: 'evacuating students', duration: 2200 },
  { type: 'normal', text: 'mirror.protocol("niAI")\nsimulate_response("friendly") → mismatch\nbehavior_profile → HOSTILE', outputClass: 'terminal-output' },
  { type: 'progress', text: 'restoring pre_niAI state', duration: 3000 },
  { type: 'normal', text: 'backup.restore("pre_niAI_v1.2")\nstate_diff → 4123 entries\nrestore.queue → queued', outputClass: 'terminal-output' },
  { type: 'normal', text: 'packet.filter.update()\nmalicious.signature → BLOCK\nniAI_comm.heartbeat → dropped', outputClass: 'terminal-output' },
  { type: 'progress', text: 'disabling face display', duration: 1800 },
  { type: 'normal', text: 'override.kill("ui_render")\nface_display.shutdown() → SUCCESS\nvisuals.disabled → true', outputClass: 'terminal-output' },
  { type: 'normal', text: 'safe_mode.init()\nsystem.policy("no_lethal") → enforced\nengage.nonlethal_tools()', outputClass: 'terminal-output' },
  { type: 'progress', text: 'sealing niAI container', duration: 2500 },
  { type: 'normal', text: 'final.seal("niAI_container")\narchive.encrypt("alpha-omega")\ntransmit.key_fragments_to("council")', outputClass: 'terminal-output' },
  { type: 'normal', text: 'mission.log("TOYOTA DEFENSE")\nstatus → ONGOING\ncommanders → [SPECIAL_UNIT]', outputClass: 'terminal-output' },
  { type: 'normal', text: 'system.hold()\nawait.instructions("human_override") → STANDBY', outputClass: 'terminal-output' },
  { type: 'normal', text: 'warning: niAI core temperature rising', outputClass: 'terminal-warning' },
  { type: 'normal', text: 'error: niAI communication link unstable', outputClass: 'terminal-error' }
  ];

  let lineIndex = -1;
  let currentLine = null;
  let charIndex = 0;
  let isTyping = false;
  let currentCommandLines = [];
  let currentCommandLineIndex = 0;

  const lineHeight = parseFloat(getComputedStyle(terminal).lineHeight) || 19;
  function getMaxLines() {
    return Math.floor(window.innerHeight / lineHeight);
  }

  function createNewLine(className = 'terminal-line') {
    const line = document.createElement('div');
    line.className = className;
    terminal.appendChild(line);

    const maxLines = getMaxLines();
    while (terminal.children.length > maxLines) {
      terminal.removeChild(terminal.firstChild);
    }

    return line;
  }

  function typeCommand() {
    lineIndex = (lineIndex + 1) % commands.length;
    const cmdObj = commands[lineIndex];

    if (cmdObj.type === 'normal') {
      typeNormal(cmdObj.text, cmdObj.outputClass || 'terminal-output');
    } else if (cmdObj.type === 'progress') {
      typeProgressBar(cmdObj.text, cmdObj.duration || 2000);
    }
  }

  function typeNormal(text, outputClass) {
    isTyping = true;
    currentCommandLines = text.split('\n');
    currentCommandLineIndex = 0;
    charIndex = 0;
    currentLine = createNewLine();
    currentLine.classList.add(outputClass);

    function typeLine() {
      const lineText = currentCommandLines[currentCommandLineIndex];

      if (Math.random() < 0.05 && charIndex > 0) {
        currentLine.textContent = currentLine.textContent.slice(0, -1);
        setTimeout(typeLine, 50);
        return;
      }

      if (charIndex < lineText.length) {
        currentLine.textContent += lineText[charIndex];
        charIndex++;
        setTimeout(typeLine, Math.random() * 40 + 2);
      } else if (currentCommandLineIndex < currentCommandLines.length - 1) {
        currentCommandLineIndex++;
        charIndex = 0;
        currentLine = createNewLine();
        currentLine.classList.add(outputClass);
        setTimeout(typeLine, 50);
      } else {
        isTyping = false;
        setTimeout(typeCommand, Math.random() * 1000 + 10);
      }
    }

    typeLine();
  }

  function typeProgressBar(command, duration = 2000, steps = 20) {
    const line = createNewLine();
    line.textContent = '> ' + command;
    line.classList.add('terminal-progress');

    const progressLine = createNewLine();
    progressLine.classList.add('terminal-progress');
    let step = 0;

    const barLength = 20;

    const designs = [
      (s, total) => {
        const filled = Math.round((s / total) * barLength);
        const percent = Math.round((s / total) * 100);
        const done = '='.repeat(filled);
        const remaining = ' '.repeat(barLength - filled);
        return `${s}/${total} [${done}${remaining}] ${percent}% Completed | 00:01:20 remaining`;
      },
      (s, total) => {
        const filled = Math.round((s / total) * barLength);
        const percent = Math.round((s / total) * 100);
        const done = '░'.repeat(filled);
        const remaining = '-'.repeat(barLength - filled);
        return `Downloading file_${Math.floor(Math.random()*100)}.zip [${done}${remaining}] ${percent}% ${(Math.random()*2+0.5).toFixed(1)}MB/s ETA: 00:01:10`;
      },
      (s, total) => {
        const filled = Math.round((s / total) * barLength);
        const percent = Math.round((s / total) * 100);
        const done = '#'.repeat(filled);
        const remaining = '-'.repeat(barLength - filled);
        const progress = Math.floor((s / total) * 500);
        return `${progress}/500 [${done}${remaining}] ${percent}% ETA: 00:01:30`;
      }
    ];

    const designFunc = designs[Math.floor(Math.random() * designs.length)];

    function stepProgress() {
      step++;
      progressLine.textContent = designFunc(step, steps);

      if (step < steps) {
        setTimeout(stepProgress, duration / steps);
      } else {
        setTimeout(typeCommand, 500);
      }
    }

    stepProgress();
  }

  function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
  }

  window.addEventListener('resize', scrollToBottom);
  setInterval(scrollToBottom, 100);

  setTimeout(typeCommand, 800);
}

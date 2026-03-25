/* ================================================================
   FORGE — Workout Tracker  |  app.js
   ================================================================ */

/* ================================================================
   1. EXERCISE DATABASE
================================================================ */
const EXERCISES = [
  /* ── Chest ── */
  { id: 1, name: 'Bench Press', muscle: 'Chest', imgId: 'Barbell_Bench_Press_-_Medium_Grip' },
  { id: 2, name: 'Incline Bench Press', muscle: 'Chest', imgId: 'Barbell_Incline_Bench_Press_-_Medium_Grip' },
  { id: 3, name: 'Decline Bench Press', muscle: 'Chest', imgId: 'Decline_Barbell_Bench_Press' },
  { id: 4, name: 'Dumbbell Fly', muscle: 'Chest', imgId: 'Dumbbell_Flyes' },
  { id: 5, name: 'Cable Fly', muscle: 'Chest', imgId: 'Cable_Crossover' },
  { id: 6, name: 'Push-Up', muscle: 'Chest', imgId: 'Pushups' },
  { id: 7, name: 'Dip', muscle: 'Chest', imgId: 'Dips_-_Chest_Version' },
  { id: 8, name: 'Chest Press Machine', muscle: 'Chest', imgId: 'Machine_Bench_Press' },

  /* ── Back ── */
  { id: 9, name: 'Deadlift', muscle: 'Back', imgId: 'Barbell_Deadlift' },
  { id: 10, name: 'Pull-Up', muscle: 'Back', imgId: 'Pullups' },
  { id: 11, name: 'Barbell Row', muscle: 'Back', imgId: 'Bent_Over_Barbell_Row' },
  { id: 12, name: 'Lat Pulldown', muscle: 'Back', imgId: 'Wide-Grip_Lat_Pulldown' },
  { id: 13, name: 'Seated Cable Row', muscle: 'Back', imgId: 'Seated_Cable_Rows' },
  { id: 14, name: 'T-Bar Row', muscle: 'Back', imgId: 'Reverse_Grip_Bent-Over_Rows' },
  { id: 15, name: 'Single-Arm Dumbbell Row', muscle: 'Back', imgId: 'One-Arm_Dumbbell_Row' },
  { id: 16, name: 'Face Pull', muscle: 'Back', imgId: 'Face_Pull' },

  /* ── Shoulders ── */
  { id: 17, name: 'Overhead Press', muscle: 'Shoulders', imgId: 'Standing_Military_Press' },
  { id: 18, name: 'Dumbbell Shoulder Press', muscle: 'Shoulders', imgId: 'Dumbbell_Shoulder_Press' },
  { id: 19, name: 'Lateral Raise', muscle: 'Shoulders', imgId: 'Side_Lateral_Raise' },
  { id: 20, name: 'Front Raise', muscle: 'Shoulders', imgId: 'Front_Dumbbell_Raise' },
  { id: 21, name: 'Arnold Press', muscle: 'Shoulders', imgId: 'Arnold_Dumbbell_Press' },
  { id: 22, name: 'Upright Row', muscle: 'Shoulders', imgId: 'Upright_Barbell_Row' },

  /* ── Biceps ── */
  { id: 23, name: 'Barbell Curl', muscle: 'Biceps', imgId: 'Barbell_Curl' },
  { id: 24, name: 'Dumbbell Curl', muscle: 'Biceps', imgId: 'Dumbbell_Bicep_Curl' },
  { id: 25, name: 'Hammer Curl', muscle: 'Biceps', imgId: 'Hammer_Curls' },
  { id: 26, name: 'Preacher Curl', muscle: 'Biceps', imgId: 'Preacher_Curl' },
  { id: 27, name: 'Incline Dumbbell Curl', muscle: 'Biceps', imgId: 'Incline_Dumbbell_Curl' },
  { id: 28, name: 'Cable Curl', muscle: 'Biceps', imgId: 'Cable_Hammer_Curls' },

  /* ── Triceps ── */
  { id: 29, name: 'Tricep Pushdown', muscle: 'Triceps', imgId: 'Triceps_Pushdown' },
  { id: 30, name: 'Skull Crusher', muscle: 'Triceps', imgId: 'Lying_Triceps_Press' },
  { id: 31, name: 'Overhead Tricep Extension', muscle: 'Triceps', imgId: 'Standing_Dumbbell_Triceps_Extension' },
  { id: 32, name: 'Close-Grip Bench Press', muscle: 'Triceps', imgId: 'Close-Grip_Barbell_Bench_Press' },
  { id: 33, name: 'Diamond Push-Up', muscle: 'Triceps', imgId: 'Pushups' },

  /* ── Legs ── */
  { id: 34, name: 'Back Squat', muscle: 'Legs', imgId: 'Barbell_Squat' },
  { id: 35, name: 'Front Squat', muscle: 'Legs', imgId: 'Front_Barbell_Squat' },
  { id: 36, name: 'Leg Press', muscle: 'Legs', imgId: 'Leg_Press' },
  { id: 37, name: 'Romanian Deadlift', muscle: 'Legs', imgId: 'Romanian_Deadlift' },
  { id: 38, name: 'Leg Extension', muscle: 'Legs', imgId: 'Leg_Extensions' },
  { id: 39, name: 'Leg Curl', muscle: 'Legs', imgId: 'Seated_Leg_Curl' },
  { id: 40, name: 'Calf Raise', muscle: 'Legs', imgId: 'Standing_Calf_Raises' },
  { id: 41, name: 'Walking Lunge', muscle: 'Legs', imgId: 'Dumbbell_Lunges' },
  { id: 42, name: 'Bulgarian Split Squat', muscle: 'Legs', imgId: 'Single_Leg_Squat' },

  /* ── Core ── */
  { id: 43, name: 'Plank', muscle: 'Core', imgId: 'Plank' },
  { id: 44, name: 'Crunch', muscle: 'Core', imgId: 'Crunches' },
  { id: 45, name: 'Cable Crunch', muscle: 'Core', imgId: 'Cable_Crunch' },
  { id: 46, name: 'Hanging Leg Raise', muscle: 'Core', imgId: 'Hanging_Leg_Raise' },
  { id: 47, name: 'Ab Wheel Rollout', muscle: 'Core', imgId: 'Ab_Roller' },
  { id: 48, name: 'Russian Twist', muscle: 'Core', imgId: 'Russian_Twist' },

  /* ── Glutes ── */
  { id: 49, name: 'Hip Thrust', muscle: 'Glutes', imgId: 'Barbell_Hip_Thrust' },
  { id: 50, name: 'Cable Kickback', muscle: 'Glutes', imgId: 'Glute_Kickback' },
  { id: 51, name: 'Sumo Deadlift', muscle: 'Glutes', imgId: 'Sumo_Deadlift' },
  { id: 52, name: 'Glute Bridge', muscle: 'Glutes', imgId: 'Barbell_Glute_Bridge' },

  /* ── Forearms ── */
  { id: 53, name: 'Wrist Curl', muscle: 'Forearms', imgId: 'Palms-Down_Wrist_Curl_Over_A_Bench' },
  { id: 54, name: 'Reverse Wrist Curl', muscle: 'Forearms', imgId: 'Palms-Up_Barbell_Wrist_Curl_Over_A_Bench' },
  { id: 55, name: "Farmer's Walk", muscle: 'Forearms', imgId: 'Farmers_Walk' },
];

const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

/** Get exercise image URL with fallback */
function getExerciseImage(exercise) {
  if (exercise.imgId) {
    return `${IMG_BASE}/${exercise.imgId}/0.jpg`;
  }
  return `https://placehold.co/200x200/1a1a1e/AAEE00?text=${encodeURIComponent(exercise.name.charAt(0))}`;
}

/** Fallback handler for broken images */
function handleImgError(img, exercise) {
  img.onerror = null;
  const color = CHART_COLORS[exercise.muscle] || '#AAEE00';
  img.src = `https://placehold.co/200x200/1a1a1e/${color.replace('#','') }?text=${encodeURIComponent(exercise.name.charAt(0))}`;
}

/* ================================================================
   1b. EXERCISE ENHANCED DATA (MOCK)
================================================================ */
const MOCK_METADATA = {
  Chest: { diff: 3, equip: 'Barbell / Dumbbell', cues: ['Retract scapula', 'Control the eccentric', 'Push through the chest'], steps: ['Lie flat on the bench.', 'Grip the bar comfortably.', 'Lower the weight to your chest slowly.', 'Press back up to the starting position.'], mistakes: ['Flaring elbows out too wide', 'Bouncing the bar off the chest', 'Lifting hips off the bench'] },
  Back: { diff: 3, equip: 'Barbell / Cable', cues: ['Pull with your elbows', 'Keep chest up', 'Squeeze lats at the top'], steps: ['Hinge at your hips.', 'Keep a neutral spine.', 'Pull the weight towards your torso.', 'Lower the weight under control.'], mistakes: ['Rounding the lower back', 'Using too much momentum', 'Not getting a full stretch'] },
  Shoulders: { diff: 2, equip: 'Dumbbell', cues: ['Keep core engaged', "Don't use momentum", 'Slow and controlled'], steps: ['Stand or sit with a straight back.', 'Press the weight overhead.', 'Lower back down slowly to shoulder level.'], mistakes: ['Arching the lower back excessively', 'Using leg drive (unless intended)', 'Incomplete range of motion'] },
  Legs: { diff: 4, equip: 'Barbell / Machine', cues: ['Push through full foot', 'Keep knees in line with toes', 'Brace core hard'], steps: ['Set your stance shoulder-width apart.', 'Descend by bending knees and hips.', 'Keep your chest up as you go down.', 'Drive through your whole foot to stand up.'], mistakes: ['Knees caving inwards', 'Heels lifting off the ground', 'Rounding the lower back'] },
  Biceps: { diff: 1, equip: 'Dumbbell / Cable', cues: ['Keep elbows fixed', 'Squeeze at the top', 'Control the descent'], steps: ['Stand tall with arms fully extended.', 'Curl the weight up while keeping elbows pinned.', 'Squeeze the bicep hard at the top.', 'Lower the weight slowly.'], mistakes: ['Swinging the torso', 'Moving the elbows forward', 'Dropping the weight too fast'] },
  Triceps: { diff: 1, equip: 'Cable', cues: ['Keep elbows flared in', 'Lock out fully', 'Control the weight'], steps: ['Stand with a slight forward lean.', 'Keep elbows tucked to your sides.', 'Extend your arms down until fully locked out.', 'Return to the start slowly.'], mistakes: ['Letting the elbows drift forward', 'Incomplete lockout', 'Using rounded shoulders to push'] },
  Core: { diff: 2, equip: 'Bodyweight', cues: ['Breathe through the movement', 'Keep tension constant', "Don't pull on your neck"], steps: ['Lie on your back or setup position.', 'Contract your abs to initiate the movement.', 'Hold the peak contraction for a second.', 'Return to the start with control.'], mistakes: ['Pulling on the neck / head', 'Holding breath', 'Using hip flexors instead of abs'] },
  Glutes: { diff: 3, equip: 'Barbell / Bodyweight', cues: ['Squeeze glutes at the top', 'Drive through heels', 'Keep chin tucked'], steps: ['Position your upper back on a bench.', 'Plant your feet firmly.', 'Drive your hips up by squeezing your glutes.', 'Lower your hips under control.'], mistakes: ['Hyper-extending the lower back at the top', 'Foot placement too far or too close', 'Not achieving full hip extension'] },
  Forearms: { diff: 1, equip: 'Dumbbell', cues: ['Full range of motion', "Don't swing", 'High reps usually work best'], steps: ['Rest your forearms on your thighs or a bench.', 'Let the weight stretch your wrists down.', 'Curl your wrists up as far as possible.', 'Lower slowly.'], mistakes: ['Using too much weight', 'Shortening the range of motion', 'Involving the biceps'] },
};

function getExerciseExtendedData(exercise) {
  const generic = MOCK_METADATA[exercise.muscle] || { diff: 2, equip: 'Various', cues: ['Focus on form', 'Breathe properly'], steps: ['Prepare the equipment.', 'Perform the movement with good form.', 'Recover.'], mistakes: ['Poor breathing control', 'Rushing the reps'] };
  return {
    difficulty: exercise.difficulty || generic.diff,
    equipment: exercise.equipment || generic.equip,
    cues: exercise.cues || generic.cues,
    steps: exercise.steps || generic.steps,
    mistakes: exercise.mistakes || generic.mistakes,
    gif: getExerciseImage(exercise)
  };
}


/* ================================================================
   2. MUSCLE COLOR MAP
================================================================ */
const MUSCLE_COLORS = {
  Chest: 'mg-chest', Back: 'mg-back', Shoulders: 'mg-shoulders',
  Biceps: 'mg-biceps', Triceps: 'mg-triceps', Legs: 'mg-legs',
  Core: 'mg-core', Glutes: 'mg-glutes', Forearms: 'mg-forearms',
  Cardio: 'mg-cardio',
};


/* ================================================================
   3. APPLICATION STATE
================================================================ */
const state = {
  currentScreen: 'home',
  activeWorkout: null,
  workoutStartTime: null,
  timerInterval: null,
  pickerSelectedIds: new Set(),
  pickerFilter: 'All',
  workoutHistory: JSON.parse(localStorage.getItem('forge_history') || '[]'),
  muscleChartInstance: null,
  volumeChartInstance: null,
  pickerMode: 'workout', // 'workout' | 'browse'
  activeSplit: '4day',
  calendarDate: new Date(), // current month for calendar
};


/* ================================================================
   CHART COLORS
================================================================ */
const CHART_COLORS = {
  Chest: '#ff6b6b', Back: '#7b61ff', Shoulders: '#ff9f43',
  Biceps: '#54a0ff', Triceps: '#5f27cd', Legs: '#01cbd6',
  Core: '#e8ff47', Glutes: '#ff6b35', Forearms: '#a29bfe',
  Cardio: '#4ade80',
};


/* ================================================================
   4. NAVIGATION & SCREEN SWITCHING
================================================================ */
function showTab(tab) {
  // If workout is in progress and user tries to navigate away, warn them
  if (state.activeWorkout && tab !== 'exercises') {
    if (!confirm('You have an active workout. Leave this screen?')) return;
  }

  // Scroll to top on every tab switch
  window.scrollTo(0, 0);

  // Hide the workout screen (Add Exercise form) on every tab switch
  document.getElementById('workoutScreen').style.display = 'none';

  const tabs = document.querySelectorAll('.nav-tab');
  tabs[0].classList.toggle('active', tab === 'home');
  tabs[1].classList.toggle('active', tab === 'exercises');
  tabs[2].classList.toggle('active', tab === 'routines');
  tabs[3].classList.toggle('active', tab === 'history');

  if (tab === 'home') { showScreen('homeScreen'); updateDashboard(); }
  if (tab === 'exercises') { openPicker('browse'); }
  if (tab === 'routines') { showScreen('routinesScreen'); renderRoutines(); }
  if (tab === 'history') { showScreen('historyScreen'); renderHistory(); renderCalendar(); }
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  state.currentScreen = id;
}


/* ================================================================
   5. WORKOUT TIMER
================================================================ */
function startTimer() {
  const timerEl = document.getElementById('navTimer');
  const displayEl = document.getElementById('timerDisplay');
  timerEl.classList.add('visible');
  state.workoutStartTime = Date.now();
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    const totalSeconds = Math.floor((Date.now() - state.workoutStartTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    displayEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = null;
  document.getElementById('navTimer').classList.remove('visible');
}


/* ================================================================
   6. START WORKOUT
================================================================ */
function startWorkout() {
  state.activeWorkout = { exercises: [] };
  document.getElementById('workoutTitle').value = getDefaultWorkoutName();
  document.getElementById('workoutNote').value = '';
  document.getElementById('exerciseBlocks').innerHTML = '';
  // Make workout screen visible and show it
  document.getElementById('workoutScreen').style.display = '';
  showScreen('workoutScreen');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  startTimer();
  openPicker('workout');
}

function getDefaultWorkoutName() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning Workout';
  if (hour < 17) return 'Afternoon Workout';
  return 'Evening Workout';
}


/* ================================================================
   7. EXERCISE PICKER
================================================================ */

function openPicker(mode = 'workout') {
  state.pickerMode = mode;
  state.pickerSelectedIds = new Set();
  state.pickerFilter = 'All';
  document.getElementById('exerciseSearch').value = '';
  document.querySelectorAll('.muscle-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.muscle === 'All');
  });
  renderExerciseGrid();
  renderExercisePreview(null);

  // Update bottom bar based on mode
  const bottomBar = document.querySelector('.picker-fixed-bottom-bar');
  if (mode === 'browse') {
    bottomBar.innerHTML = `
      <button class="btn-secondary" onclick="cancelPicker()">Back</button>
      <button class="btn-primary" id="addSelectedBtn" onclick="startWorkoutFromBrowse()" disabled>Start Workout with Selected</button>
    `;
  } else {
    bottomBar.innerHTML = `
      <button class="btn-secondary" onclick="cancelPicker()">Cancel</button>
      <button class="btn-primary" id="addSelectedBtn" onclick="confirmExercises()" disabled>Add Exercises</button>
    `;
  }

  showScreen('pickerScreen');
}

function cancelPicker() {
  if (state.pickerMode === 'browse') {
    showTab('home');
  } else if (state.activeWorkout) {
    showScreen('workoutScreen');
  } else {
    showScreen('homeScreen');
  }
}

function startWorkoutFromBrowse() {
  state.activeWorkout = { exercises: [] };
  document.getElementById('workoutTitle').value = getDefaultWorkoutName();
  document.getElementById('workoutNote').value = '';
  document.getElementById('exerciseBlocks').innerHTML = '';

  state.pickerSelectedIds.forEach(id => {
    const exercise = EXERCISES.find(e => e.id === id);
    if (!exercise) return;
    state.activeWorkout.exercises.push({
      id: exercise.id, name: exercise.name, muscle: exercise.muscle,
      sets: [{ weight: '', reps: '', completed: false }],
    });
  });

  renderExerciseBlocks();
  document.getElementById('workoutScreen').style.display = '';
  showScreen('workoutScreen');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  startTimer();
}

function filterByMuscle(btn) {
  state.pickerFilter = btn.dataset.muscle;
  document.querySelectorAll('.muscle-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderExerciseGrid();
}

function filterExercises() { renderExerciseGrid(); }

function renderExerciseGrid() {
  const query = document.getElementById('exerciseSearch').value.toLowerCase().trim();
  const filter = state.pickerFilter;
  const filtered = EXERCISES.filter(exercise => {
    const matchesMuscle = filter === 'All' || exercise.muscle === filter;
    const matchesSearch = exercise.name.toLowerCase().includes(query) || exercise.muscle.toLowerCase().includes(query);
    return matchesMuscle && matchesSearch;
  });
  const grid = document.getElementById('exerciseGrid');
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-text">No exercises found.<br/>Try a different search or filter.</div></div>`;
    return;
  }
  grid.innerHTML = filtered.map(exercise => {
    const isSelected = state.pickerSelectedIds.has(exercise.id);
    const colorClass = MUSCLE_COLORS[exercise.muscle] || '';
    const imgSrc = getExerciseImage(exercise);
    return `
      <div class="exercise-item ${isSelected ? 'selected' : ''}"
           onclick="handleExerciseClick(event, ${exercise.id}, this)">
        <div class="exercise-layout">
          <div class="exercise-thumb">
            <img src="${imgSrc}" class="thumb-img" id="thumb-${exercise.id}"
                 onerror="this.onerror=null;this.src='https://placehold.co/56x56/1a1a1e/555568?text=${encodeURIComponent(exercise.name.charAt(0))}'" />
          </div>
          <div class="exercise-info">
            <div class="exercise-name">${exercise.name}</div>
            <div class="exercise-muscle">
              <span class="muscle-dot ${colorClass}" style="background: currentColor;"></span>
              ${exercise.muscle}
            </div>
          </div>
        </div>
        <div class="exercise-actions">
          <button class="icon-info-btn" onclick="event.stopPropagation(); openInfoModal(${exercise.id})">?</button>
          <div class="add-indicator" onclick="event.stopPropagation(); toggleExercise(${exercise.id}, this.closest('.exercise-item'))">
            ${isSelected ? '✓' : '+'}
          </div>
        </div>
      </div>`;
  }).join('');
}

function handleExerciseClick(e, id, rowEl) {
  toggleExercise(id, rowEl);
  renderExercisePreview(id);
}

function toggleExercise(id, el) {
  if (state.pickerSelectedIds.has(id)) {
    state.pickerSelectedIds.delete(id);
    el.classList.remove('selected');
    el.querySelector('.add-indicator').textContent = '+';
  } else {
    state.pickerSelectedIds.add(id);
    el.classList.add('selected');
    el.querySelector('.add-indicator').textContent = '✓';
  }
  const confirmBtn = document.getElementById('addSelectedBtn');
  const count = state.pickerSelectedIds.size;
  confirmBtn.disabled = count === 0;
  if (state.pickerMode === 'browse') {
    confirmBtn.textContent = count > 0 ? `Start Workout with ${count} Exercise${count > 1 ? 's' : ''}` : 'Start Workout with Selected';
  } else {
    confirmBtn.textContent = count > 0 ? `Add ${count} Exercise${count > 1 ? 's' : ''}` : 'Add Exercises';
  }
}

function confirmExercises() {
  state.pickerSelectedIds.forEach(id => {
    const exercise = EXERCISES.find(e => e.id === id);
    if (!exercise) return;
    if (state.activeWorkout.exercises.find(e => e.id === id)) return;
    state.activeWorkout.exercises.push({
      id: exercise.id, name: exercise.name, muscle: exercise.muscle,
      sets: [{ weight: '', reps: '', completed: false }],
    });
  });
  renderExerciseBlocks();
  document.getElementById('workoutScreen').style.display = '';
  showScreen('workoutScreen');
}

/* ================================================================
   1d. EXERCISE PREVIEW PANEL
================================================================ */
function renderExercisePreview(id) {
  const panel = document.getElementById('exercisePreviewPanel');
  if (!panel) return;
  if (!id) {
    panel.innerHTML = `<div class="preview-placeholder"><div class="preview-watermark">FORGE</div><div class="preview-hint">Select or hover an exercise to preview</div></div>`;
    return;
  }
  const exercise = EXERCISES.find(e => e.id === id);
  if (!exercise) return;
  const data = getExerciseExtendedData(exercise);
  const colorClass = MUSCLE_COLORS[exercise.muscle] || '';
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) { starsHtml += `<span class="${i <= data.difficulty ? '' : 'empty'}">★</span>`; }
  const cuesHtml = data.cues.map(cue => `<li>${cue}</li>`).join('');
  panel.innerHTML = `
    <div class="preview-content">
      <img src="${data.gif}" class="preview-gif" alt="Exercise"
           onerror="this.onerror=null;this.src='https://placehold.co/600x400/1a1a1e/AAEE00?text=${encodeURIComponent(exercise.name)}'" />
      <div class="preview-header">
        <div class="preview-title">${exercise.name}</div>
        <div class="preview-badges-row">
          <div class="badge badge-muscle"><span class="muscle-dot ${colorClass}" style="background: currentColor;"></span> ${exercise.muscle}</div>
          <div class="difficulty-stars">${starsHtml}</div>
          <div class="badge badge-equip">${data.equipment}</div>
        </div>
      </div>
      <div class="preview-body">
        <div class="preview-body-left">
          <div class="preview-section-title">Primary Muscles</div>
          <div class="preview-silhouette"><div class="silhouette-placeholder">Silhouette<br/>Diagram</div></div>
        </div>
        <div class="preview-body-right">
          <div class="preview-section-title">Form Cues</div>
          <ul class="preview-cues-list">${cuesHtml}</ul>
        </div>
      </div>
    </div>`;
}


/* ================================================================
   8. ACTIVE WORKOUT — EXERCISE BLOCKS
================================================================ */
function renderExerciseBlocks() {
  const container = document.getElementById('exerciseBlocks');
  container.innerHTML = state.activeWorkout.exercises.map((exercise, exerciseIndex) => buildExerciseBlock(exercise, exerciseIndex)).join('');
}

function buildExerciseBlock(exercise, exerciseIndex) {
  const colorClass = MUSCLE_COLORS[exercise.muscle] || '';
  const setsHTML = exercise.sets.map((set, setIndex) => buildSetRow(set, exerciseIndex, setIndex)).join('');
  return `
    <div class="exercise-block" id="block-${exerciseIndex}">
      <div class="exercise-block-header">
        <div class="exercise-block-name">${exercise.name} <span class="muscle-badge ${colorClass}">${exercise.muscle}</span></div>
        <button class="exercise-block-remove" onclick="removeExercise(${exerciseIndex})">✕</button>
      </div>
      <div class="sets-table">
        <div class="sets-header"><div>SET</div><div>PREV</div><div>KG</div><div>REPS</div><div></div></div>
        <div id="sets-${exerciseIndex}">${setsHTML}</div>
        <button class="add-set-btn" onclick="addSet(${exerciseIndex})">＋ Add Set</button>
      </div>
    </div>`;
}

function buildSetRow(set, exerciseIndex, setIndex) {
  const prevText = getPrevSet(state.activeWorkout.exercises[exerciseIndex].id, setIndex);
  const completedCls = set.completed ? 'completed' : '';
  const inputCls = set.completed ? 'completed-input' : '';
  const checkCls = set.completed ? 'checked' : '';
  return `
    <div class="set-row ${completedCls}" id="setrow-${exerciseIndex}-${setIndex}">
      <div class="set-num">${setIndex + 1}</div>
      <div class="prev-info">${prevText}</div>
      <input type="number" class="set-input ${inputCls}" id="w-${exerciseIndex}-${setIndex}" placeholder="—" value="${set.weight}" min="0" step="0.5" onchange="updateSet(${exerciseIndex}, ${setIndex}, 'weight', this.value)" />
      <input type="number" class="set-input ${inputCls}" id="r-${exerciseIndex}-${setIndex}" placeholder="—" value="${set.reps}" min="0" onchange="updateSet(${exerciseIndex}, ${setIndex}, 'reps', this.value)" />
      <button class="set-check ${checkCls}" id="chk-${exerciseIndex}-${setIndex}" onclick="toggleSetComplete(${exerciseIndex}, ${setIndex})"></button>
    </div>`;
}

function getPrevSet(exerciseId, setIndex) {
  for (let i = state.workoutHistory.length - 1; i >= 0; i--) {
    const workout = state.workoutHistory[i];
    const exercise = workout.exercises.find(e => e.id === exerciseId);
    if (exercise && exercise.sets[setIndex]) {
      const set = exercise.sets[setIndex];
      if (set.weight && set.reps) return `${set.weight}×${set.reps}`;
    }
  }
  return '—';
}

function updateSet(exerciseIndex, setIndex, field, value) {
  state.activeWorkout.exercises[exerciseIndex].sets[setIndex][field] = value;
}

function toggleSetComplete(exerciseIndex, setIndex) {
  const set = state.activeWorkout.exercises[exerciseIndex].sets[setIndex];
  const rowEl = document.getElementById(`setrow-${exerciseIndex}-${setIndex}`);
  const checkEl = document.getElementById(`chk-${exerciseIndex}-${setIndex}`);
  const weightEl = document.getElementById(`w-${exerciseIndex}-${setIndex}`);
  const repsEl = document.getElementById(`r-${exerciseIndex}-${setIndex}`);
  set.completed = !set.completed;
  set.weight = weightEl.value;
  set.reps = repsEl.value;
  rowEl.classList.toggle('completed', set.completed);
  checkEl.classList.toggle('checked', set.completed);
  weightEl.classList.toggle('completed-input', set.completed);
  repsEl.classList.toggle('completed-input', set.completed);
}

function addSet(exerciseIndex) {
  state.activeWorkout.exercises[exerciseIndex].sets.push({ weight: '', reps: '', completed: false });
  const exercise = state.activeWorkout.exercises[exerciseIndex];
  const newSetIndex = exercise.sets.length - 1;
  const newSet = exercise.sets[newSetIndex];
  const setsContainer = document.getElementById(`sets-${exerciseIndex}`);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = buildSetRow(newSet, exerciseIndex, newSetIndex);
  setsContainer.appendChild(wrapper.firstElementChild);
  setsContainer.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function removeExercise(exerciseIndex) {
  state.activeWorkout.exercises.splice(exerciseIndex, 1);
  renderExerciseBlocks();
}


/* ================================================================
   9. FINISH WORKOUT MODAL
================================================================ */
function openFinishModal() {
  const durationMin = Math.floor((Date.now() - state.workoutStartTime) / 60000);
  const exercises = state.activeWorkout.exercises;
  let totalSets = 0, totalVolume = 0;
  exercises.forEach(exercise => {
    exercise.sets.forEach(set => {
      if (set.completed || (set.weight && set.reps)) {
        totalSets++;
        totalVolume += (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0);
      }
    });
  });
  document.getElementById('modalDuration').textContent = `Duration: ${durationMin} min`;
  document.getElementById('modalExercises').textContent = exercises.length;
  document.getElementById('modalSets').textContent = totalSets;
  document.getElementById('modalVolume').textContent = Math.round(totalVolume).toLocaleString();
  document.getElementById('finishModal').classList.add('open');
}

function closeFinishModal() { document.getElementById('finishModal').classList.remove('open'); }

function finishWorkout() {
  const title = document.getElementById('workoutTitle').value.trim() || 'Workout';
  const note = document.getElementById('workoutNote').value.trim();
  const durationMin = Math.floor((Date.now() - state.workoutStartTime) / 60000);
  let totalVolume = 0, totalSets = 0;
  state.activeWorkout.exercises.forEach(exercise => {
    exercise.sets.forEach(set => {
      if (set.weight && set.reps) {
        totalVolume += parseFloat(set.weight) * parseInt(set.reps);
        totalSets++;
      }
    });
  });
  const record = {
    id: Date.now(), title, note,
    date: new Date().toISOString(),
    duration: durationMin,
    exercises: JSON.parse(JSON.stringify(state.activeWorkout.exercises)),
    totalVolume: Math.round(totalVolume), totalSets,
  };
  state.workoutHistory.push(record);
  localStorage.setItem('forge_history', JSON.stringify(state.workoutHistory));
  stopTimer();
  closeFinishModal();
  state.activeWorkout = null;
  document.querySelectorAll('.nav-tab').forEach((tab, i) => { tab.classList.toggle('active', i === 0); });
  showScreen('homeScreen');
  updateDashboard();
}


/* ================================================================
   10. DISCARD WORKOUT
================================================================ */
function discardWorkout() {
  if (!confirm('Discard this workout? All progress will be lost.')) return;
  stopTimer();
  state.activeWorkout = null;
  document.querySelectorAll('.nav-tab').forEach((tab, i) => { tab.classList.toggle('active', i === 0); });
  showScreen('homeScreen');
}


/* ================================================================
   10b. EXERCISE INFO MODAL
================================================================ */
function openInfoModal(id) {
  const exercise = EXERCISES.find(e => e.id === id);
  if (!exercise) return;
  const meta = getExerciseExtendedData(exercise);
  document.getElementById('infoTitle').textContent = exercise.name;
  const imgEl = document.getElementById('infoGif');
  imgEl.src = meta.gif;
  imgEl.onerror = function() { this.onerror = null; this.src = `https://placehold.co/600x240/1a1a1e/AAEE00?text=${encodeURIComponent(exercise.name)}`; };
  document.getElementById('infoSteps').innerHTML = meta.steps.map(step => `<li>${step}</li>`).join('');
  document.getElementById('infoMistakes').innerHTML = '<strong>Avoid:</strong> ' + meta.mistakes.join(' • ');
  document.getElementById('infoMuscleBadge').textContent = exercise.muscle;
  document.getElementById('exerciseInfoModal').classList.add('open');
}

function closeInfoModal() { document.getElementById('exerciseInfoModal').classList.remove('open'); }


/* ================================================================
   11. DASHBOARD / HOME SCREEN
================================================================ */
function animateCountUp(el, target, duration = 1200, formatFn) {
  if (!el) return;
  el.classList.add('counting');
  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.round(easeOut(progress) * target);
    el.textContent = formatFn ? formatFn(current) : current;
    if (progress < 1) { requestAnimationFrame(tick); }
    else { el.textContent = formatFn ? formatFn(target) : target; setTimeout(() => el.classList.remove('counting'), 400); }
  }
  requestAnimationFrame(tick);
}

(function initRipple() {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.start-btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
})();

function updateDashboard() {
  const history = state.workoutHistory;
  let totalVolume = 0, totalSets = 0;
  history.forEach(workout => { totalVolume += workout.totalVolume || 0; totalSets += workout.totalSets || 0; });
  const formatVolume = v => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v;
  animateCountUp(document.getElementById('statWorkouts'), history.length);
  animateCountUp(document.getElementById('statVolume'), totalVolume, 1200, formatVolume);
  animateCountUp(document.getElementById('statSets'), totalSets);
  renderRecentWorkouts();
  if (typeof Chart !== 'undefined') { updateMuscleChart(); updateVolumeChart(); }
}

function updateMuscleChart() {
  const history = state.workoutHistory;
  const container = document.getElementById('muscleChartContainer');
  const ctx = document.getElementById('muscleChart');
  if (!container || !ctx) return;
  if (history.length === 0) { container.style.display = 'none'; return; }
  const muscleCounts = {};
  history.forEach(workout => {
    if (workout.exercises) {
      workout.exercises.forEach(exercise => {
        const muscle = exercise.muscle;
        if (!muscle) return;
        let validSets = 0;
        exercise.sets.forEach(set => { if (set.completed || (set.weight && set.reps)) validSets++; });
        if (validSets > 0) muscleCounts[muscle] = (muscleCounts[muscle] || 0) + validSets;
      });
    }
  });
  const labels = Object.keys(muscleCounts);
  const data = Object.values(muscleCounts);
  if (data.length === 0) { container.style.display = 'none'; return; }
  container.style.display = 'block';
  const backgroundColors = labels.map(label => CHART_COLORS[label] || '#999');
  if (state.muscleChartInstance) {
    state.muscleChartInstance.data.labels = labels;
    state.muscleChartInstance.data.datasets[0].data = data;
    state.muscleChartInstance.data.datasets[0].backgroundColor = backgroundColors;
    state.muscleChartInstance.update();
  } else {
    Chart.defaults.color = '#8888a0';
    Chart.defaults.font.family = "'DM Sans', sans-serif";
    state.muscleChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: backgroundColors, borderWidth: 2, borderColor: '#1b1b1f', hoverBorderColor: '#BFFF00', hoverBorderWidth: 3, hoverOffset: 8 }] },
      options: { responsive: true, maintainAspectRatio: false, cutout: '65%', animation: { animateRotate: true, duration: 1200, easing: 'easeOutQuart' }, plugins: { legend: { position: 'right', labels: { boxWidth: 12, padding: 15, font: { size: 11 } } }, tooltip: { backgroundColor: '#222228', titleColor: '#f0f0f5', bodyColor: '#f0f0f5', borderColor: '#2e2e38', borderWidth: 1, padding: 10, displayColors: true, boxPadding: 4, callbacks: { label: ctx2 => (ctx2.label || '') + ': ' + ctx2.parsed + ' sets' } } } }
    });
  }
}

function updateVolumeChart() {
  const history = state.workoutHistory;
  const container = document.getElementById('volumeChartContainer');
  const ctx = document.getElementById('volumeChart');
  if (!container || !ctx) return;
  if (history.length === 0) { container.style.display = 'none'; return; }
  const days = [], volumes = [];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
    volumes.push(0);
  }
  history.forEach(workout => {
    const wDate = new Date(workout.date); wDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - wDate) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 6) volumes[6 - diffDays] += workout.totalVolume || 0;
  });
  container.style.display = 'block';
  if (state.volumeChartInstance) {
    state.volumeChartInstance.data.labels = days;
    state.volumeChartInstance.data.datasets[0].data = volumes;
    state.volumeChartInstance.update();
  } else {
    Chart.defaults.color = '#8888a0';
    Chart.defaults.font.family = "'DM Sans', sans-serif";
    const context2d = ctx.getContext('2d');
    let gradientFill = 'rgba(191, 255, 0, 0.2)';
    if (context2d) {
      gradientFill = context2d.createLinearGradient(0, 0, 0, 220);
      gradientFill.addColorStop(0, 'rgba(191, 255, 0, 0.4)');
      gradientFill.addColorStop(1, 'rgba(191, 255, 0, 0)');
    }
    state.volumeChartInstance = new Chart(ctx, {
      type: 'line',
      data: { labels: days, datasets: [{ label: 'Volume (kg)', data: volumes, fill: true, backgroundColor: gradientFill, borderColor: '#BFFF00', borderWidth: 2.5, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#BFFF00', pointBorderColor: '#1b1b1f', pointBorderWidth: 2, pointHoverRadius: 7 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#222228', titleColor: '#f0f0f5', bodyColor: '#f0f0f5', borderColor: '#2e2e38', borderWidth: 1, padding: 10, displayColors: false, callbacks: { label: ctx2 => ctx2.parsed.y + ' kg' } } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: '#2e2e38' }, ticks: { maxTicksLimit: 5 } } } }
    });
  }
}

function renderRecentWorkouts() {
  const listEl = document.getElementById('recentList');
  const recent = [...state.workoutHistory].reverse().slice(0, 5);
  if (recent.length === 0) {
    listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">🏋️</div><div class="empty-text">No workouts yet.<br>Start your first session above!</div></div>`;
    return;
  }
  listEl.innerHTML = recent.map(workout => buildWorkoutCard(workout)).join('');
}

function buildWorkoutCard(workout) {
  const date = new Date(workout.date);
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const names = workout.exercises.map(e => e.name);
  const preview = names.slice(0, 3).join(', ') + (names.length > 3 ? ` · +${names.length - 3} more` : '');
  return `
    <div class="history-card">
      <div>
        <div class="history-name">${workout.title}</div>
        <div class="history-meta">${dateStr} · ${workout.duration} min</div>
        <div class="history-exercises">${preview}</div>
      </div>
      <div class="history-vol">
        ${workout.totalVolume.toLocaleString()} kg
        <span>${workout.totalSets} sets</span>
      </div>
    </div>`;
}


/* ================================================================
   12. HISTORY SCREEN
================================================================ */
function renderHistory() {
  const listEl = document.getElementById('historyList');
  const history = [...state.workoutHistory].reverse();
  if (history.length === 0) {
    listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📅</div><div class="empty-text">No workout history yet.<br>Complete your first session to see it here.</div></div>`;
    return;
  }
  listEl.innerHTML = history.map(workout => buildWorkoutCard(workout)).join('');
}


/* ================================================================
   13. PRESET ROUTINES
================================================================ */
const PRESET_ROUTINES = {
  '4day': [
    {
      day: 'Day 1', name: 'Push (Chest, Shoulders, Triceps)',
      exerciseIds: [1, 2, 4, 17, 19, 29, 31]
    },
    {
      day: 'Day 2', name: 'Pull (Back, Biceps)',
      exerciseIds: [9, 11, 12, 15, 16, 23, 25]
    },
    {
      day: 'Day 3', name: 'Legs & Core',
      exerciseIds: [34, 36, 37, 38, 39, 40, 43, 46]
    },
    {
      day: 'Day 4', name: 'Upper Body',
      exerciseIds: [2, 5, 13, 18, 20, 24, 30]
    }
  ],
  '5day': [
    {
      day: 'Day 1', name: 'Chest & Triceps',
      exerciseIds: [1, 2, 4, 5, 29, 30, 31]
    },
    {
      day: 'Day 2', name: 'Back & Biceps',
      exerciseIds: [9, 11, 12, 14, 23, 26, 25]
    },
    {
      day: 'Day 3', name: 'Legs',
      exerciseIds: [34, 35, 36, 37, 38, 39, 40, 42]
    },
    {
      day: 'Day 4', name: 'Shoulders & Abs',
      exerciseIds: [17, 18, 19, 20, 22, 43, 45, 46]
    },
    {
      day: 'Day 5', name: 'Full Body',
      exerciseIds: [1, 10, 34, 17, 23, 29, 49]
    }
  ]
};

function switchSplit(splitType) {
  state.activeSplit = splitType;
  document.querySelectorAll('.split-toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(splitType === '4day' ? '4' : '5'));
  });
  renderRoutines();
}

function renderRoutines() {
  const listEl = document.getElementById('routinesList');
  if (!listEl) return;
  const routine = PRESET_ROUTINES[state.activeSplit];
  listEl.innerHTML = routine.map((day, index) => {
    const exercises = day.exerciseIds.map(id => EXERCISES.find(e => e.id === id)).filter(Boolean);
    const names = exercises.map(e => e.name);
    const exercisesText = names.slice(0, 4).join(', ') + (names.length > 4 ? ` · +${names.length - 4} more` : '');
    // Build mini muscle badges
    const muscles = [...new Set(exercises.map(e => e.muscle))];
    const muscleChips = muscles.map(m => {
      const colorClass = MUSCLE_COLORS[m] || '';
      return `<span class="routine-muscle-chip ${colorClass}">${m}</span>`;
    }).join('');

    return `
      <div class="routine-card">
        <div class="routine-card-content">
          <div class="routine-day">${day.day}</div>
          <div class="routine-name">${day.name}</div>
          <div class="routine-muscles">${muscleChips}</div>
          <div class="routine-exercises">${exercisesText}</div>
        </div>
        <div class="routine-actions">
          <button class="btn-routine start" onclick="startPresetRoutine('${state.activeSplit}', ${index})">
            ⚡ Start
          </button>
        </div>
      </div>`;
  }).join('');
}

function startPresetRoutine(splitType, dayIndex) {
  const day = PRESET_ROUTINES[splitType][dayIndex];
  const exercises = day.exerciseIds.map(id => EXERCISES.find(e => e.id === id)).filter(Boolean);
  state.activeWorkout = {
    exercises: exercises.map(ex => ({
      id: ex.id, name: ex.name, muscle: ex.muscle,
      sets: [{ weight: '', reps: '', completed: false }]
    }))
  };
  document.getElementById('workoutTitle').value = day.name;
  document.getElementById('workoutNote').value = '';
  document.getElementById('exerciseBlocks').innerHTML = '';
  renderExerciseBlocks();
  document.getElementById('workoutScreen').style.display = '';
  showScreen('workoutScreen');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  startTimer();
}


/* ================================================================
   14. WORKOUT HISTORY CALENDAR
================================================================ */
function renderCalendar() {
  const container = document.getElementById('calendarContainer');
  if (!container) return;

  const now = state.calendarDate;
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get workout dates for this month
  const workoutDates = new Set();
  state.workoutHistory.forEach(w => {
    const d = new Date(w.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      workoutDates.add(d.getDate());
    }
  });

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  let cellsHTML = '';
  // Day headers
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayHeaders.forEach(d => { cellsHTML += `<div class="cal-header-cell">${d}</div>`; });

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    cellsHTML += `<div class="cal-cell empty"></div>`;
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = isCurrentMonth && day === todayDate;
    const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isWorkoutDay = workoutDates.has(day);
    const isFuture = new Date(year, month, day) > today;

    let cls = 'cal-cell';
    if (isToday) cls += ' today';
    if (isWorkoutDay) cls += ' workout-day';
    else if (isPast || isToday) cls += ' rest-day';
    if (isFuture) cls += ' future';

    cellsHTML += `<div class="${cls}"><span>${day}</span></div>`;
  }

  // Stats for the month
  const totalWorkouts = workoutDates.size;
  const pastDays = isCurrentMonth ? todayDate : daysInMonth;
  const restDays = pastDays - totalWorkouts;

  container.innerHTML = `
    <div class="cal-nav">
      <button class="cal-nav-btn" onclick="changeCalMonth(-1)">‹</button>
      <div class="cal-month-title">${monthName}</div>
      <button class="cal-nav-btn" onclick="changeCalMonth(1)">›</button>
    </div>
    <div class="cal-grid">${cellsHTML}</div>
    <div class="cal-legend">
      <div class="cal-legend-item"><span class="cal-dot workout"></span> Workout (${totalWorkouts})</div>
      <div class="cal-legend-item"><span class="cal-dot rest"></span> Rest (${restDays})</div>
    </div>
  `;
}

function changeCalMonth(delta) {
  state.calendarDate.setMonth(state.calendarDate.getMonth() + delta);
  renderCalendar();
}


/* ================================================================
   15. INITIALISATION
================================================================ */
// Hide workout screen (Add Exercise form) on page load
document.getElementById('workoutScreen').style.display = 'none';
updateDashboard();

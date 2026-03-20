/* ================================================================
   FORGE — Workout Tracker  |  app.js
   ================================================================
   TABLE OF CONTENTS
   1.  Exercise Database
   2.  Muscle Color Map
   3.  Application State
   4.  Navigation & Screen Switching
   5.  Workout Timer
   6.  Start Workout
   7.  Exercise Picker
       7a. Open / Close Picker
       7b. Filter by Muscle Group
       7c. Filter by Search Query
       7d. Render Exercise Grid
       7e. Toggle Exercise Selection
       7f. Confirm & Add to Workout
   8.  Active Workout — Exercise Blocks
       8a. Render All Blocks
       8b. Build Exercise Block HTML
       8c. Build Set Row HTML
       8d. Get Previous Set Data
       8e. Update Set Field
       8f. Toggle Set Complete
       8g. Add New Set
       8h. Remove Exercise
   9.  Finish Workout Modal
   10. Discard Workout
   11. Dashboard / Home Screen
   12. History Screen
   13. Initialisation
================================================================ */


/* ================================================================
   1. EXERCISE DATABASE
   Add or remove exercises here. Each entry needs:
     id     — unique number (never reuse an id, even if deleted)
     name   — display name shown in the picker and workout blocks
     muscle — must match one of the muscle-chip data-muscle values
              and the MUSCLE_COLORS map below
================================================================ */
const EXERCISES = [
  /* ── Chest ── */
  { id: 1, name: 'Bench Press', muscle: 'Chest' },
  { id: 2, name: 'Incline Bench Press', muscle: 'Chest' },
  { id: 3, name: 'Decline Bench Press', muscle: 'Chest' },
  { id: 4, name: 'Dumbbell Fly', muscle: 'Chest' },
  { id: 5, name: 'Cable Fly', muscle: 'Chest' },
  { id: 6, name: 'Push-Up', muscle: 'Chest' },
  { id: 7, name: 'Dip', muscle: 'Chest' },
  { id: 8, name: 'Chest Press Machine', muscle: 'Chest' },

  /* ── Back ── */
  { id: 9, name: 'Deadlift', muscle: 'Back' },
  { id: 10, name: 'Pull-Up', muscle: 'Back' },
  { id: 11, name: 'Barbell Row', muscle: 'Back' },
  { id: 12, name: 'Lat Pulldown', muscle: 'Back' },
  { id: 13, name: 'Seated Cable Row', muscle: 'Back' },
  { id: 14, name: 'T-Bar Row', muscle: 'Back' },
  { id: 15, name: 'Single-Arm Dumbbell Row', muscle: 'Back' },
  { id: 16, name: 'Face Pull', muscle: 'Back' },

  /* ── Shoulders ── */
  { id: 17, name: 'Overhead Press', muscle: 'Shoulders' },
  { id: 18, name: 'Dumbbell Shoulder Press', muscle: 'Shoulders' },
  { id: 19, name: 'Lateral Raise', muscle: 'Shoulders' },
  { id: 20, name: 'Front Raise', muscle: 'Shoulders' },
  { id: 21, name: 'Arnold Press', muscle: 'Shoulders' },
  { id: 22, name: 'Upright Row', muscle: 'Shoulders' },

  /* ── Biceps ── */
  { id: 23, name: 'Barbell Curl', muscle: 'Biceps' },
  { id: 24, name: 'Dumbbell Curl', muscle: 'Biceps' },
  { id: 25, name: 'Hammer Curl', muscle: 'Biceps' },
  { id: 26, name: 'Preacher Curl', muscle: 'Biceps' },
  { id: 27, name: 'Incline Dumbbell Curl', muscle: 'Biceps' },
  { id: 28, name: 'Cable Curl', muscle: 'Biceps' },

  /* ── Triceps ── */
  { id: 29, name: 'Tricep Pushdown', muscle: 'Triceps' },
  { id: 30, name: 'Skull Crusher', muscle: 'Triceps' },
  { id: 31, name: 'Overhead Tricep Extension', muscle: 'Triceps' },
  { id: 32, name: 'Close-Grip Bench Press', muscle: 'Triceps' },
  { id: 33, name: 'Diamond Push-Up', muscle: 'Triceps' },

  /* ── Legs ── */
  { id: 34, name: 'Back Squat', muscle: 'Legs' },
  { id: 35, name: 'Front Squat', muscle: 'Legs' },
  { id: 36, name: 'Leg Press', muscle: 'Legs' },
  { id: 37, name: 'Romanian Deadlift', muscle: 'Legs' },
  { id: 38, name: 'Leg Extension', muscle: 'Legs' },
  { id: 39, name: 'Leg Curl', muscle: 'Legs' },
  { id: 40, name: 'Calf Raise', muscle: 'Legs' },
  { id: 41, name: 'Walking Lunge', muscle: 'Legs' },
  { id: 42, name: 'Bulgarian Split Squat', muscle: 'Legs' },

  /* ── Core ── */
  { id: 43, name: 'Plank', muscle: 'Core' },
  { id: 44, name: 'Crunch', muscle: 'Core' },
  { id: 45, name: 'Cable Crunch', muscle: 'Core' },
  { id: 46, name: 'Hanging Leg Raise', muscle: 'Core' },
  { id: 47, name: 'Ab Wheel Rollout', muscle: 'Core' },
  { id: 48, name: 'Russian Twist', muscle: 'Core' },

  /* ── Glutes ── */
  { id: 49, name: 'Hip Thrust', muscle: 'Glutes' },
  { id: 50, name: 'Cable Kickback', muscle: 'Glutes' },
  { id: 51, name: 'Sumo Deadlift', muscle: 'Glutes' },
  { id: 52, name: 'Glute Bridge', muscle: 'Glutes' },

  /* ── Forearms ── */
  { id: 53, name: 'Wrist Curl', muscle: 'Forearms' },
  { id: 54, name: 'Reverse Wrist Curl', muscle: 'Forearms' },
  { id: 55, name: "Farmer's Walk", muscle: 'Forearms' },
];

/* ================================================================
   1b. EXERCISE ENHANCED DATA (MOCK)
================================================================ */
const MOCK_METADATA = {
  Chest: { diff: 3, equip: 'Barbell / Dumbbell', cues: ['Retract scapula', 'Control the eccentric', 'Push through the chest'], steps: ['Lie flat on the bench.', 'Grip the bar comfortably.', 'Lower the weight to your chest slowly.', 'Press back up to the starting position.'], mistakes: ['Flaring elbows out too wide', 'Bouncing the bar off the chest', 'Lifting hips off the bench'] },
  Back: { diff: 3, equip: 'Barbell / Cable', cues: ['Pull with your elbows', 'Keep chest up', 'Squeeze lats at the top'], steps: ['Hinge at your hips.', 'Keep a neutral spine.', 'Pull the weight towards your torso.', 'Lower the weight under control.'], mistakes: ['Rounding the lower back', 'Using too much momentum', 'Not getting a full stretch'] },
  Shoulders: { diff: 2, equip: 'Dumbbell', cues: ['Keep core engaged', "Don't use momentum", 'Slow and controlled'], steps: ['Stand or sit with a straight back.', 'Press the weight overhead.', 'Lower back down slowly to shoulder level.'], mistakes: ['Arching the lower back excessively', 'Using leg drive (unless intended)', 'Incomplete range of motion'] },
  Legs: { diff: 4, equip: 'Barbell / Machine', cues: ['Push through full foot', 'Keep knees in line with toes', 'Brace core hard'], steps: ['Set your stance shoulder-width apart.', 'Descend by bending knees and hips.', 'Keep your chest up as you go down.', 'Drive through your whole foot to stand up.'], mistakes: ['Knees caving inwards (valgus collapse)', 'Heels lifting off the ground', 'Rounding the lower back (butt wink)'] },
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
    // Provide a placeholder GIF showing a dummy workout animation
    gif: exercise.gif || `https://placehold.co/600x400/1a1a1e/AAEE00?text=${encodeURIComponent(exercise.name)}+Preview`
  };
}


/* ================================================================
   1c. EXERCISE GIF CACHING & FETCHING
================================================================ */
const EXERCISEDB_API_KEY = '542d47a662msh53258908763abf1p1db2e9jsn60aa6753adf6'; // User will need to provide their API key
const gifCache = {};
let isMobile = window.innerWidth <= 800;
window.addEventListener('resize', () => isMobile = window.innerWidth <= 800);
const activeRows = new Set(); // For mobile toggle logic

async function fetchExerciseGif(name) {
  if (gifCache[name]) return gifCache[name];

  try {
    const url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(name.toLowerCase())}?offset=0&limit=1`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': EXERCISEDB_API_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        gifCache[name] = data[0].gifUrl;
        return data[0].gifUrl;
      }
    }
  } catch (error) {
    console.warn("ExerciseDB fetch failed", error);
  }

  const fallback = `https://placehold.co/56x56/111113/AAEE00?text=${name.charAt(0)}`;
  gifCache[name] = fallback;
  return fallback;
}

async function handleRowEnter(e, id, rowEl) {
  if (isMobile) return;
  playThumbGif(id);
}

function handleRowLeave(e, id, rowEl) {
  if (isMobile) return;
  stopThumbGif(id);
}

function handleRowClick(e, id, rowEl) {
  if (!isMobile) {
    toggleExercise(id, rowEl);
    return;
  }

  // Mobile tap: toggle GIF/preview behavior
  if (activeRows.has(id)) {
    activeRows.delete(id);
    stopThumbGif(id);
  } else {
    activeRows.add(id);
    playThumbGif(id);
  }
}

async function playThumbGif(id) {
  const imgEl = document.getElementById(`thumb-${id}`);
  if (!imgEl) return;
  const exercise = EXERCISES.find(e => e.id === id);
  if (!exercise) return;

  if (!gifCache[exercise.name]) {
    imgEl.style.opacity = '0.5';
  }

  const gifUrl = await fetchExerciseGif(exercise.name);
  imgEl.style.opacity = '1';
  imgEl.src = gifUrl;
}

function stopThumbGif(id) {
  const imgEl = document.getElementById(`thumb-${id}`);
  if (!imgEl) return;
  const staticSrc = imgEl.getAttribute('data-static');
  if (staticSrc) {
    imgEl.src = staticSrc;
  }
}

/* ================================================================
   2. MUSCLE COLOR MAP
   Maps a muscle group name → the CSS class defined in style.css
   (section 11 — Muscle Group Color System).
   Add a new entry here whenever you add a new muscle group.
================================================================ */
const MUSCLE_COLORS = {
  Chest: 'mg-chest',
  Back: 'mg-back',
  Shoulders: 'mg-shoulders',
  Biceps: 'mg-biceps',
  Triceps: 'mg-triceps',
  Legs: 'mg-legs',
  Core: 'mg-core',
  Glutes: 'mg-glutes',
  Forearms: 'mg-forearms',
  Cardio: 'mg-cardio',
};


/* ================================================================
   3. APPLICATION STATE
   Single source of truth for the entire app.
   Never mutate these directly from HTML — always go through
   the functions below so UI stays in sync.
================================================================ */
const state = {
  /* Which screen is active — tracked for logging / debugging */
  currentScreen: 'home',

  /* The workout currently in progress (null when not in session) */
  activeWorkout: null,

  /* Timestamp (ms) when the current workout session began */
  workoutStartTime: null,

  /* setInterval handle for the live timer — needed to clearInterval later */
  timerInterval: null,

  /* Set of exercise IDs the user has selected in the picker */
  pickerSelectedIds: new Set(),

  /* Currently active muscle filter in the picker ('All' or a muscle name) */
  pickerFilter: 'All',

  /* Full workout history — loaded from localStorage on page load */
  workoutHistory: JSON.parse(localStorage.getItem('forge_history') || '[]'),

  /* Chart instances */
  muscleChartInstance: null,
  volumeChartInstance: null,

  /* 7-day split data */
  weeklySplit: JSON.parse(localStorage.getItem('forge_split')) || [
    { day: 'Monday', name: 'Push Day', exercises: [] },
    { day: 'Tuesday', name: 'Pull Day', exercises: [] },
    { day: 'Wednesday', name: 'Leg Day', exercises: [] },
    { day: 'Thursday', name: 'Active Recovery', exercises: [] },
    { day: 'Friday', name: 'Upper Body', exercises: [] },
    { day: 'Saturday', name: 'Lower Body', exercises: [] },
    { day: 'Sunday', name: 'Rest', exercises: [] }
  ],

  /* Which day is currently being edited in the builder */
  activeRoutineDayIndex: null,

  /* Where should picker exercises go? 'workout' or 'routine' */
  pickerMode: 'workout',
};


/* ================================================================
   MARK: CHART COLORS
================================================================ */
/* Color codes mapping for Chart.js corresponding to MUSCLE_COLORS */
const CHART_COLORS = {
  Chest: '#ff6b6b',
  Back: '#7b61ff',
  Shoulders: '#ff9f43',
  Biceps: '#54a0ff',
  Triceps: '#5f27cd',
  Legs: '#01cbd6',
  Core: '#e8ff47',
  Glutes: '#ff6b35',
  Forearms: '#a29bfe',
  Cardio: '#4ade80',
};


/* ================================================================
   4. NAVIGATION & SCREEN SWITCHING
================================================================ */

/**
 * showTab(tab)
 * Switches between the Home and History top-level tabs.
 * Updates the nav-tab active class and shows the correct screen.
 * @param {string} tab - 'home' | 'history'
 */
function showTab(tab) {
  /* Update active state on nav tab buttons */
  const tabs = document.querySelectorAll('.nav-tab');
  tabs[0].classList.toggle('active', tab === 'home');
  tabs[1].classList.toggle('active', tab === 'routines');
  tabs[2].classList.toggle('active', tab === 'history');

  if (tab === 'home') {
    showScreen('homeScreen');
    updateDashboard(); /* Refresh stats in case history changed */
  }

  if (tab === 'routines') {
    showScreen('routinesScreen');
    renderRoutines();
  }

  if (tab === 'history') {
    showScreen('historyScreen');
    renderHistory();
  }
}

/**
 * showScreen(id)
 * Hides all .screen divs, then shows the one with the given id.
 * @param {string} id - The DOM id of the screen to show
 */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  state.currentScreen = id;
}


/* ================================================================
   5. WORKOUT TIMER
================================================================ */

/**
 * startTimer()
 * Shows the nav timer and starts a 1-second interval that
 * formats and displays elapsed time since workoutStartTime.
 */
function startTimer() {
  const timerEl = document.getElementById('navTimer');
  const displayEl = document.getElementById('timerDisplay');

  timerEl.classList.add('visible');
  state.workoutStartTime = Date.now();

  /* Clear any stale interval from a previous session */
  clearInterval(state.timerInterval);

  state.timerInterval = setInterval(() => {
    const totalSeconds = Math.floor((Date.now() - state.workoutStartTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    displayEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

/**
 * stopTimer()
 * Clears the interval and hides the timer from the nav bar.
 */
function stopTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = null;
  document.getElementById('navTimer').classList.remove('visible');
}


/* ================================================================
   6. START WORKOUT
================================================================ */

/**
 * startWorkout()
 * Initialises a new empty workout session and opens the exercise picker
 * so the user can choose their first exercises immediately.
 */
function startWorkout() {
  /* Create a fresh workout object */
  state.activeWorkout = { exercises: [] };

  /* Pre-fill the title input with a time-appropriate name */
  document.getElementById('workoutTitle').value = getDefaultWorkoutName();
  document.getElementById('workoutNote').value = '';
  document.getElementById('exerciseBlocks').innerHTML = '';

  /* Move to the workout screen (picker opens on top of it) */
  showScreen('workoutScreen');

  /* Deactivate nav tabs while workout is in progress */
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  /* Start the live timer */
  startTimer();

  /* Open the exercise picker immediately */
  openPicker();
}

/**
 * getDefaultWorkoutName()
 * Returns a time-based default workout name.
 * @returns {string}
 */
function getDefaultWorkoutName() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning Workout';
  if (hour < 17) return 'Afternoon Workout';
  return 'Evening Workout';
}


/* ================================================================
   7. EXERCISE PICKER
================================================================ */

/* ── 7a. Open / Close Picker ── */

/**
 * openPicker()
 * Resets picker state and shows the picker screen over the workout.
 */
function openPicker(mode = 'workout') {
  state.pickerMode = mode;

  /* Reset all selections */
  state.pickerSelectedIds = new Set();
  state.pickerFilter = 'All';

  /* Clear search input */
  document.getElementById('exerciseSearch').value = '';

  /* Reset muscle chip active state to "All" */
  document.querySelectorAll('.muscle-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.muscle === 'All');
  });

  /* Render the full unfiltered list */
  renderExerciseGrid();

  showScreen('pickerScreen');
}

/**
 * cancelPicker()
 * Closes the picker and returns to the active workout screen,
 * or to the home screen if no workout is in progress.
 */
function cancelPicker() {
  if (state.pickerMode === 'routine') {
    showScreen('routineBuilderScreen');
  } else if (state.activeWorkout) {
    showScreen('workoutScreen');
  } else {
    showScreen('homeScreen');
  }
}

/* ── 7b. Filter by Muscle Group ── */

/**
 * filterByMuscle(btn)
 * Called by muscle chip onclick. Updates the active chip and re-renders the grid.
 * @param {HTMLElement} btn - The chip button that was clicked
 */
function filterByMuscle(btn) {
  state.pickerFilter = btn.dataset.muscle;

  /* Toggle active class on chips */
  document.querySelectorAll('.muscle-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');

  renderExerciseGrid();
}

/* ── 7c. Filter by Search Query ── */

/**
 * filterExercises()
 * Called on every keystroke in the search input. Re-renders the grid.
 */
function filterExercises() {
  renderExerciseGrid();
}

/* ── 7d. Render Exercise Grid ── */

/**
 * renderExerciseGrid()
 * Filters EXERCISES by the current muscle filter and search query,
 * then renders exercise items into #exerciseGrid.
 */
function renderExerciseGrid() {
  const query = document.getElementById('exerciseSearch').value.toLowerCase().trim();
  const filter = state.pickerFilter;

  const filtered = EXERCISES.filter(exercise => {
    const matchesMuscle = filter === 'All' || exercise.muscle === filter;
    const matchesSearch = exercise.name.toLowerCase().includes(query)
      || exercise.muscle.toLowerCase().includes(query);
    return matchesMuscle && matchesSearch;
  });

  const grid = document.getElementById('exerciseGrid');

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-text">No exercises found.<br/>Try a different search or filter.</div>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(exercise => {
    const isSelected = state.pickerSelectedIds.has(exercise.id);
    const colorClass = MUSCLE_COLORS[exercise.muscle] || '';

    const staticThumb = `https://placehold.co/56x56/1a1a1e/555568?text=${encodeURIComponent(exercise.name.charAt(0))}`;
    return `
      <div class="exercise-item ${isSelected ? 'selected' : ''}"
           onclick="handleRowClick(event, ${exercise.id}, this)"
           onmouseenter="handleRowEnter(event, ${exercise.id}, this)"
           onmouseleave="handleRowLeave(event, ${exercise.id}, this)">
        <div class="exercise-layout">
          <div class="exercise-thumb">
             <img src="${staticThumb}" class="thumb-img" id="thumb-${exercise.id}" data-static="${staticThumb}" />
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

/* ── 7e. Toggle Exercise Selection ── */

/**
 * toggleExercise(id, el)
 * Adds or removes an exercise from the selection set.
 * Updates the item's visual state and the footer button label.
 * @param {number}      id - Exercise id
 * @param {HTMLElement} el - The .exercise-item element that was clicked
 */
function toggleExercise(id, el) {
  if (state.pickerSelectedIds.has(id)) {
    /* Deselect */
    state.pickerSelectedIds.delete(id);
    el.classList.remove('selected');
    el.querySelector('.add-indicator').textContent = '+';
  } else {
    /* Select */
    state.pickerSelectedIds.add(id);
    el.classList.add('selected');
    el.querySelector('.add-indicator').textContent = '✓';
  }

  /* Update the footer confirm button */
  const confirmBtn = document.getElementById('addSelectedBtn');
  const count = state.pickerSelectedIds.size;
  confirmBtn.disabled = count === 0;
  confirmBtn.textContent = count > 0
    ? `Add ${count} Exercise${count > 1 ? 's' : ''}`
    : 'Add Exercises';
}

/* ── 7g. Confirm & Add to Workout ── */

/**
 * confirmExercises()
 * Pushes selected exercises into state.activeWorkout.exercises,
 * each with one empty starter set, then returns to the workout screen.
 */
function confirmExercises() {
  state.pickerSelectedIds.forEach(id => {
    const exercise = EXERCISES.find(e => e.id === id);
    if (!exercise) return;

    if (state.pickerMode === 'routine') {
      const dayData = state.weeklySplit[state.activeRoutineDayIndex];
      if (dayData.exercises.find(e => e.id === id)) return;
      dayData.exercises.push({
        id: exercise.id,
        name: exercise.name,
        muscle: exercise.muscle
      });
    } else {
      if (state.activeWorkout.exercises.find(e => e.id === id)) return;
      state.activeWorkout.exercises.push({
        id: exercise.id,
        name: exercise.name,
        muscle: exercise.muscle,
        sets: [{ weight: '', reps: '', completed: false }],
      });
    }
  });

  if (state.pickerMode === 'routine') {
    renderRoutineExerciseBlocks();
    showScreen('routineBuilderScreen');
  } else {
    renderExerciseBlocks();
    showScreen('workoutScreen');
  }
}


/* ================================================================
   8. ACTIVE WORKOUT — EXERCISE BLOCKS
================================================================ */

/* ── 8a. Render All Blocks ── */

/**
 * renderExerciseBlocks()
 * Clears and re-renders the entire #exerciseBlocks container.
 * Called after adding or removing exercises.
 */
function renderExerciseBlocks() {
  const container = document.getElementById('exerciseBlocks');
  container.innerHTML = state.activeWorkout.exercises
    .map((exercise, exerciseIndex) => buildExerciseBlock(exercise, exerciseIndex))
    .join('');
}

/* ── 8b. Build Exercise Block HTML ── */

/**
 * buildExerciseBlock(exercise, exerciseIndex)
 * Returns the full HTML string for one exercise block,
 * including the header and all set rows.
 * @param {Object} exercise      - Exercise entry from state.activeWorkout.exercises
 * @param {number} exerciseIndex - Index in the exercises array (used for DOM ids)
 * @returns {string} HTML string
 */
function buildExerciseBlock(exercise, exerciseIndex) {
  const colorClass = MUSCLE_COLORS[exercise.muscle] || '';
  const setsHTML = exercise.sets
    .map((set, setIndex) => buildSetRow(set, exerciseIndex, setIndex))
    .join('');

  return `
    <div class="exercise-block" id="block-${exerciseIndex}">

      <!-- Block header: exercise name + muscle badge + remove button -->
      <div class="exercise-block-header">
        <div class="exercise-block-name">
          ${exercise.name}
          <span class="muscle-badge ${colorClass}">${exercise.muscle}</span>
        </div>
        <button class="exercise-block-remove" onclick="removeExercise(${exerciseIndex})">✕</button>
      </div>

      <!-- Sets table -->
      <div class="sets-table">
        <div class="sets-header">
          <div>SET</div>
          <div>PREV</div>
          <div>KG</div>
          <div>REPS</div>
          <div></div>
        </div>

        <!-- Set rows injected here -->
        <div id="sets-${exerciseIndex}">${setsHTML}</div>

        <!-- Add another set -->
        <button class="add-set-btn" onclick="addSet(${exerciseIndex})">＋ Add Set</button>
      </div>

    </div>`;
}

/* ── 8c. Build Set Row HTML ── */

/**
 * buildSetRow(set, exerciseIndex, setIndex)
 * Returns the HTML string for a single set row.
 * @param {Object} set           - { weight, reps, completed }
 * @param {number} exerciseIndex - Parent exercise index
 * @param {number} setIndex      - This set's index within the exercise
 * @returns {string} HTML string
 */
function buildSetRow(set, exerciseIndex, setIndex) {
  const prevText = getPrevSet(state.activeWorkout.exercises[exerciseIndex].id, setIndex);
  const completedCls = set.completed ? 'completed' : '';
  const inputCls = set.completed ? 'completed-input' : '';
  const checkCls = set.completed ? 'checked' : '';

  return `
    <div class="set-row ${completedCls}" id="setrow-${exerciseIndex}-${setIndex}">

      <!-- Set number label -->
      <div class="set-num">${setIndex + 1}</div>

      <!-- Previous workout reference (e.g. "80×8") -->
      <div class="prev-info">${prevText}</div>

      <!-- Weight input -->
      <input
        type="number"
        class="set-input ${inputCls}"
        id="w-${exerciseIndex}-${setIndex}"
        placeholder="—"
        value="${set.weight}"
        min="0"
        step="0.5"
        onchange="updateSet(${exerciseIndex}, ${setIndex}, 'weight', this.value)"
      />

      <!-- Reps input -->
      <input
        type="number"
        class="set-input ${inputCls}"
        id="r-${exerciseIndex}-${setIndex}"
        placeholder="—"
        value="${set.reps}"
        min="0"
        onchange="updateSet(${exerciseIndex}, ${setIndex}, 'reps', this.value)"
      />

      <!-- Complete/done checkmark button -->
      <button
        class="set-check ${checkCls}"
        id="chk-${exerciseIndex}-${setIndex}"
        onclick="toggleSetComplete(${exerciseIndex}, ${setIndex})"
      ></button>

    </div>`;
}

/* ── 8d. Get Previous Set Data ── */

/**
 * getPrevSet(exerciseId, setIndex)
 * Searches workout history (most recent first) for a matching
 * exercise and set position, returns "weight×reps" or "—".
 * @param {number} exerciseId - The exercise id to look up
 * @param {number} setIndex   - Which set position (0-based)
 * @returns {string}
 */
function getPrevSet(exerciseId, setIndex) {
  /* Iterate history from newest to oldest */
  for (let i = state.workoutHistory.length - 1; i >= 0; i--) {
    const workout = state.workoutHistory[i];
    const exercise = workout.exercises.find(e => e.id === exerciseId);

    if (exercise && exercise.sets[setIndex]) {
      const set = exercise.sets[setIndex];
      if (set.weight && set.reps) {
        return `${set.weight}×${set.reps}`;
      }
    }
  }
  return '—'; /* No history found */
}

/* ── 8e. Update Set Field ── */

/**
 * updateSet(exerciseIndex, setIndex, field, value)
 * Writes a value back into the state when an input changes.
 * @param {number} exerciseIndex
 * @param {number} setIndex
 * @param {string} field - 'weight' | 'reps'
 * @param {string} value - The new input value
 */
function updateSet(exerciseIndex, setIndex, field, value) {
  state.activeWorkout.exercises[exerciseIndex].sets[setIndex][field] = value;
}

/* ── 8f. Toggle Set Complete ── */

/**
 * toggleSetComplete(exerciseIndex, setIndex)
 * Marks a set as completed or incomplete.
 * Updates the row, inputs, and checkmark button classes in-place
 * (no full re-render needed for performance).
 * @param {number} exerciseIndex
 * @param {number} setIndex
 */
function toggleSetComplete(exerciseIndex, setIndex) {
  const set = state.activeWorkout.exercises[exerciseIndex].sets[setIndex];
  const rowEl = document.getElementById(`setrow-${exerciseIndex}-${setIndex}`);
  const checkEl = document.getElementById(`chk-${exerciseIndex}-${setIndex}`);
  const weightEl = document.getElementById(`w-${exerciseIndex}-${setIndex}`);
  const repsEl = document.getElementById(`r-${exerciseIndex}-${setIndex}`);

  /* Flip the completed flag */
  set.completed = !set.completed;

  /* Sync state with what's currently in the inputs */
  set.weight = weightEl.value;
  set.reps = repsEl.value;

  /* Update DOM classes */
  rowEl.classList.toggle('completed', set.completed);
  checkEl.classList.toggle('checked', set.completed);
  weightEl.classList.toggle('completed-input', set.completed);
  repsEl.classList.toggle('completed-input', set.completed);
}

/* ── 8g. Add New Set ── */

/**
 * addSet(exerciseIndex)
 * Appends a new empty set to an exercise and injects its row into the DOM
 * without re-rendering the whole block.
 * @param {number} exerciseIndex
 */
function addSet(exerciseIndex) {
  /* Add empty set to state */
  state.activeWorkout.exercises[exerciseIndex].sets.push({
    weight: '', reps: '', completed: false,
  });

  const exercise = state.activeWorkout.exercises[exerciseIndex];
  const newSetIndex = exercise.sets.length - 1;
  const newSet = exercise.sets[newSetIndex];

  /* Build and inject the new row */
  const setsContainer = document.getElementById(`sets-${exerciseIndex}`);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = buildSetRow(newSet, exerciseIndex, newSetIndex);
  setsContainer.appendChild(wrapper.firstElementChild);

  /* Scroll the new row into view */
  setsContainer.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── 8h. Remove Exercise ── */

/**
 * removeExercise(exerciseIndex)
 * Removes an exercise from the active workout and re-renders all blocks.
 * @param {number} exerciseIndex
 */
function removeExercise(exerciseIndex) {
  state.activeWorkout.exercises.splice(exerciseIndex, 1);
  renderExerciseBlocks(); /* Full re-render to fix indices */
}


/* ================================================================
   9. FINISH WORKOUT MODAL
================================================================ */

/**
 * openFinishModal()
 * Calculates summary stats from the current workout and opens
 * the finish modal overlay.
 */
function openFinishModal() {
  const durationMin = Math.floor((Date.now() - state.workoutStartTime) / 60000);
  const exercises = state.activeWorkout.exercises;
  let totalSets = 0;
  let totalVolume = 0;

  /* Tally completed (or filled) sets across all exercises */
  exercises.forEach(exercise => {
    exercise.sets.forEach(set => {
      if (set.completed || (set.weight && set.reps)) {
        totalSets++;
        totalVolume += (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0);
      }
    });
  });

  /* Inject stats into modal */
  document.getElementById('modalDuration').textContent = `Duration: ${durationMin} min`;
  document.getElementById('modalExercises').textContent = exercises.length;
  document.getElementById('modalSets').textContent = totalSets;
  document.getElementById('modalVolume').textContent = Math.round(totalVolume).toLocaleString();

  document.getElementById('finishModal').classList.add('open');
}

/**
 * closeFinishModal()
 * Dismisses the modal so the user can keep going.
 */
function closeFinishModal() {
  document.getElementById('finishModal').classList.remove('open');
}

/**
 * finishWorkout()
 * Builds a workout record from the current session, saves it to
 * localStorage, stops the timer, and navigates back to home.
 */
function finishWorkout() {
  const title = document.getElementById('workoutTitle').value.trim() || 'Workout';
  const note = document.getElementById('workoutNote').value.trim();
  const durationMin = Math.floor((Date.now() - state.workoutStartTime) / 60000);

  /* Calculate final volume and set count (only filled sets) */
  let totalVolume = 0;
  let totalSets = 0;

  state.activeWorkout.exercises.forEach(exercise => {
    exercise.sets.forEach(set => {
      if (set.weight && set.reps) {
        totalVolume += parseFloat(set.weight) * parseInt(set.reps);
        totalSets++;
      }
    });
  });

  /* Build the workout record */
  const record = {
    id: Date.now(),          /* Used as a unique identifier */
    title,
    note,
    date: new Date().toISOString(),
    duration: durationMin,
    exercises: JSON.parse(JSON.stringify(state.activeWorkout.exercises)), /* Deep copy */
    totalVolume: Math.round(totalVolume),
    totalSets,
  };

  /* Save to state and persist to localStorage */
  state.workoutHistory.push(record);
  localStorage.setItem('forge_history', JSON.stringify(state.workoutHistory));

  /* Clean up */
  stopTimer();
  closeFinishModal();
  state.activeWorkout = null;

  /* Return to home tab */
  document.querySelectorAll('.nav-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === 0);
  });
  showScreen('homeScreen');
  updateDashboard();
}


/* ================================================================
   10. DISCARD WORKOUT
================================================================ */

/**
 * discardWorkout()
 * Prompts for confirmation, then abandons the current session
 * without saving anything.
 */
function discardWorkout() {
  if (!confirm('Discard this workout? All progress will be lost.')) return;

  stopTimer();
  state.activeWorkout = null;

  /* Return to home tab */
  document.querySelectorAll('.nav-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === 0);
  });
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
  if (!gifCache[exercise.name]) {
    imgEl.style.opacity = '0.5';
    imgEl.src = meta.gif; // fallback temporarily
  } else {
    imgEl.src = gifCache[exercise.name];
  }
  
  // Actually start fetching GIF if not loaded
  fetchExerciseGif(exercise.name).then(url => {
    imgEl.src = url;
    imgEl.style.opacity = '1';
  });

  const stepsHTML = meta.steps.map(step => `<li>${step}</li>`).join('');
  document.getElementById('infoSteps').innerHTML = stepsHTML;
  
  const mistakesHTML = '<strong>Avoid:</strong> ' + meta.mistakes.join(' • ');
  document.getElementById('infoMistakes').innerHTML = mistakesHTML;
  
  document.getElementById('infoMuscleBadge').textContent = exercise.muscle;
  
  document.getElementById('exerciseInfoModal').classList.add('open');
}

function closeInfoModal() {
  document.getElementById('exerciseInfoModal').classList.remove('open');
}


/* ================================================================
   11. DASHBOARD / HOME SCREEN
================================================================ */

/**
 * updateDashboard()
 * Recalculates aggregate stats from history and updates the
 * stat cards on the home screen, then re-renders recent workouts.
 */
function updateDashboard() {
  const history = state.workoutHistory;
  let totalVolume = 0;
  let totalSets = 0;

  history.forEach(workout => {
    totalVolume += workout.totalVolume || 0;
    totalSets += workout.totalSets || 0;
  });

  /* Format large volume numbers (e.g. 12500 → "12.5k") */
  const volumeDisplay = totalVolume >= 1000
    ? (totalVolume / 1000).toFixed(1) + 'k'
    : totalVolume;

  document.getElementById('statWorkouts').textContent = history.length;
  document.getElementById('statVolume').textContent = volumeDisplay;
  document.getElementById('statSets').textContent = totalSets;

  renderRecentWorkouts();
  if (typeof Chart !== 'undefined') {
    updateMuscleChart();
    updateVolumeChart();
  }
}

/**
 * updateMuscleChart()
 * Tallies completed sets per muscle group across all history
 * and updates or creates the Chart.js circular graph.
 */
function updateMuscleChart() {
  const history = state.workoutHistory;
  const container = document.getElementById('muscleChartContainer');
  const ctx = document.getElementById('muscleChart');

  if (!container || !ctx) return;

  if (history.length === 0) {
    container.style.display = 'none';
    return;
  }

  /* Tally sets per muscle group */
  const muscleCounts = {};

  history.forEach(workout => {
    if (workout.exercises) {
      workout.exercises.forEach(exercise => {
        const muscle = exercise.muscle;
        if (!muscle) return;

        // Count sets that are either marked complete or have valid weight & reps
        // (Similar logic as finishWorkout summary)
        let validSets = 0;
        exercise.sets.forEach(set => {
          if (set.completed || (set.weight && set.reps)) {
            validSets++;
          }
        });

        if (validSets > 0) {
          muscleCounts[muscle] = (muscleCounts[muscle] || 0) + validSets;
        }
      });
    }
  });

  const labels = Object.keys(muscleCounts);
  const data = Object.values(muscleCounts);

  /* If no data to show, hide chart */
  if (data.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'block';
  const backgroundColors = labels.map(label => CHART_COLORS[label] || '#999');

  if (state.muscleChartInstance) {
    state.muscleChartInstance.data.labels = labels;
    state.muscleChartInstance.data.datasets[0].data = data;
    state.muscleChartInstance.data.datasets[0].backgroundColor = backgroundColors;
    state.muscleChartInstance.update();
  } else {
    // Need to configure defaults for Chart.js text colors
    Chart.defaults.color = '#8888a0';
    Chart.defaults.font.family = "'DM Sans', sans-serif";

    state.muscleChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 2,
          borderColor: '#111113' /* Matches surface background */
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              padding: 15,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            backgroundColor: '#222228',
            titleColor: '#f0f0f5',
            bodyColor: '#f0f0f5',
            borderColor: '#2a2a32',
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            boxPadding: 4,
            callbacks: {
              label: function (context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed + ' sets';
                }
                return label;
              }
            }
          }
        }
      }
    });
  }
}

/**
 * updateVolumeChart()
 * Calculates daily volume over the last 7 days from workout history
 * and creates/updates a vertical bar chart.
 */
function updateVolumeChart() {
  const history = state.workoutHistory;
  const container = document.getElementById('volumeChartContainer');
  const ctx = document.getElementById('volumeChart');

  if (!container || !ctx) return;

  if (history.length === 0) {
    container.style.display = 'none';
    return;
  }

  // Generate last 7 days labels
  const days = [];
  const volumes = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
    volumes.push(0);
  }

  // Iterate over history and aggregate volume by day if within last 7 days
  history.forEach(workout => {
    const wDate = new Date(workout.date);
    wDate.setHours(0, 0, 0, 0);
    const diffTime = today - wDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 0 && diffDays <= 6) {
      const index = 6 - diffDays;
      volumes[index] += workout.totalVolume || 0;
    }
  });

  container.style.display = 'block';

  const barColor = '#AAEE00';

  if (state.volumeChartInstance) {
    state.volumeChartInstance.data.labels = days;
    state.volumeChartInstance.data.datasets[0].data = volumes;
    state.volumeChartInstance.update();
  } else {
    Chart.defaults.color = '#8888a0';
    Chart.defaults.font.family = "'DM Sans', sans-serif";

    state.volumeChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          label: 'Volume (kg)',
          data: volumes,
          backgroundColor: barColor,
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#222228',
            titleColor: '#f0f0f5',
            bodyColor: '#f0f0f5',
            borderColor: '#2a2a32',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              label: function (context) {
                return context.parsed.y + ' kg';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#2a2a32',
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 5
            }
          }
        }
      }
    });
  }
}

/**
 * renderRecentWorkouts()
 * Shows the 5 most recent workouts in the home dashboard list.
 */
function renderRecentWorkouts() {
  const listEl = document.getElementById('recentList');
  /* Most recent first, capped at 5 */
  const recent = [...state.workoutHistory].reverse().slice(0, 5);

  if (recent.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🏋️</div>
        <div class="empty-text">No workouts yet.<br>Start your first session above!</div>
      </div>`;
    return;
  }

  listEl.innerHTML = recent.map(workout => buildWorkoutCard(workout)).join('');
}

/**
 * buildWorkoutCard(workout)
 * Returns the HTML string for a single workout summary card
 * used in both the home screen and the history screen.
 * @param {Object} workout - A saved workout record from history
 * @returns {string} HTML string
 */
function buildWorkoutCard(workout) {
  const date = new Date(workout.date);
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });

  /* Show up to 3 exercise names, then "+N more" */
  const names = workout.exercises.map(e => e.name);
  const preview = names.slice(0, 3).join(', ')
    + (names.length > 3 ? ` · +${names.length - 3} more` : '');

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

/**
 * renderHistory()
 * Renders all saved workouts (most recent first) in the history screen.
 */
function renderHistory() {
  const listEl = document.getElementById('historyList');
  /* Clone and reverse so newest is at the top */
  const history = [...state.workoutHistory].reverse();

  if (history.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📅</div>
        <div class="empty-text">No workout history yet.<br>Complete your first session to see it here.</div>
      </div>`;
    return;
  }

  listEl.innerHTML = history.map(workout => buildWorkoutCard(workout)).join('');
}


/* ================================================================
   13. ROUTINES / 7-DAY SPLIT
================================================================ */

function renderRoutines() {
  const listEl = document.getElementById('routinesList');
  if (!listEl) return;

  listEl.innerHTML = state.weeklySplit.map((dayData, index) => {
    const names = dayData.exercises.map(e => e.name);
    const exercisesText = names.length > 0
      ? names.slice(0, 3).join(', ') + (names.length > 3 ? ` · +${names.length - 3} more` : '')
      : 'No exercises planned';

    return `
      <div class="routine-card">
        <div>
          <div class="routine-day">${dayData.day}</div>
          <div class="routine-name">${dayData.name}</div>
          <div class="routine-exercises">${exercisesText}</div>
        </div>
        <div class="routine-actions">
          <button class="btn-routine" onclick="editRoutine(${index})">Edit</button>
          <button class="btn-routine start" onclick="startRoutine(${index})">Start</button>
        </div>
      </div>
    `;
  }).join('');
}

function editRoutine(dayIndex) {
  state.activeRoutineDayIndex = dayIndex;
  const dayData = state.weeklySplit[dayIndex];

  document.getElementById('routineTitle').value = dayData.name;
  renderRoutineExerciseBlocks();
  showScreen('routineBuilderScreen');

  /* Deactivate tabs */
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
}

function renderRoutineExerciseBlocks() {
  const container = document.getElementById('routineExerciseBlocks');
  if (!container) return;
  const dayData = state.weeklySplit[state.activeRoutineDayIndex];

  if (dayData.exercises.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 24px;">
        <div class="empty-icon">📝</div>
        <div class="empty-text">No exercises for this day yet.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = dayData.exercises.map((exercise, index) => {
    const colorClass = MUSCLE_COLORS[exercise.muscle] || '';
    return `
      <div class="exercise-block" style="margin-bottom: 8px;">
        <div class="exercise-block-header">
          <div class="exercise-block-name">
            ${exercise.name}
            <span class="muscle-badge ${colorClass}">${exercise.muscle}</span>
          </div>
          <button class="exercise-block-remove" onclick="removeRoutineExercise(${index})">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

function removeRoutineExercise(exerciseIndex) {
  const dayData = state.weeklySplit[state.activeRoutineDayIndex];
  dayData.exercises.splice(exerciseIndex, 1);
  renderRoutineExerciseBlocks();
}

function saveRoutine() {
  const dayData = state.weeklySplit[state.activeRoutineDayIndex];
  dayData.name = document.getElementById('routineTitle').value.trim() || dayData.day + ' Workout';

  localStorage.setItem('forge_split', JSON.stringify(state.weeklySplit));

  state.activeRoutineDayIndex = null;
  showTab('routines');
}

function cancelRoutineEdit() {
  state.weeklySplit = JSON.parse(localStorage.getItem('forge_split')) || [
    { day: 'Monday', name: 'Push Day', exercises: [] },
    { day: 'Tuesday', name: 'Pull Day', exercises: [] },
    { day: 'Wednesday', name: 'Leg Day', exercises: [] },
    { day: 'Thursday', name: 'Active Recovery', exercises: [] },
    { day: 'Friday', name: 'Upper Body', exercises: [] },
    { day: 'Saturday', name: 'Lower Body', exercises: [] },
    { day: 'Sunday', name: 'Rest', exercises: [] }
  ];
  state.activeRoutineDayIndex = null;
  showTab('routines');
}

function startRoutine(dayIndex) {
  const dayData = state.weeklySplit[dayIndex];

  /* Create a fresh workout object */
  state.activeWorkout = {
    exercises: dayData.exercises.map(ex => ({
      ...ex,
      sets: [{ weight: '', reps: '', completed: false }]
    }))
  };

  /* Pre-fill the title input */
  document.getElementById('workoutTitle').value = dayData.name;
  document.getElementById('workoutNote').value = '';

  /* Clear old blocks before render */
  document.getElementById('exerciseBlocks').innerHTML = '';

  renderExerciseBlocks();

  /* Move to the workout screen */
  showScreen('workoutScreen');

  /* Deactivate nav tabs */
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  /* Start the live timer */
  startTimer();
}


/* ================================================================
   14. INITIALISATION
   Runs once when the page loads.
================================================================ */

/* Populate the home dashboard from any data already in localStorage */
updateDashboard();


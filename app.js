(function () {
  const timetable = document.getElementById('timetable');
  const dayColumns = document.querySelectorAll('.day-column');
  const dayTabs = document.getElementById('dayTabs');
  const dayTabButtons = document.querySelectorAll('.day-tab');
  const courseSelect = document.getElementById('courseSelect');
  const timetableView = document.getElementById('timetableView');
  const changeCourseBtn = document.getElementById('changeCourseBtn');
  const headerSubtitle = document.getElementById('headerSubtitle');
  var selectedCourseCode = null;

  function showCourseSelect() {
    selectedCourseCode = null;
    if (courseSelect) courseSelect.style.display = '';
    if (timetableView) timetableView.style.display = 'none';
    if (changeCourseBtn) changeCourseBtn.style.display = 'none';
    if (dayTabs) dayTabs.style.display = 'none';
    if (headerSubtitle) headerSubtitle.textContent = 'Spring Term 2025';
  }

  function showTimetable(courseCode) {
    selectedCourseCode = courseCode;
    if (courseSelect) courseSelect.style.display = 'none';
    if (timetableView) timetableView.style.display = '';
    if (changeCourseBtn) changeCourseBtn.style.display = 'inline-block';
    if (dayTabs) dayTabs.style.display = 'flex';
    if (headerSubtitle) headerSubtitle.textContent = courseCode + ' · Spring Term 2025';
  }

  var courseListEl = document.getElementById('courseList');
  var courseSearchEl = document.getElementById('courseSearch');
  var courseListEmptyEl = document.getElementById('courseListEmpty');

  function filterCourses() {
    var q = (courseSearchEl && courseSearchEl.value) ? courseSearchEl.value.trim().toLowerCase() : '';
    var cards = courseListEl ? courseListEl.querySelectorAll('.course-card') : [];
    var visible = 0;
    cards.forEach(function (card) {
      var code = (card.dataset.course || '').toLowerCase();
      var text = (card.textContent || '').toLowerCase();
      var match = !q || code.indexOf(q) !== -1 || text.indexOf(q) !== -1;
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (courseListEmptyEl) courseListEmptyEl.style.display = visible ? 'none' : 'block';
  }

  if (courseListEl) {
    courseListEl.addEventListener('click', function (e) {
      var card = e.target.closest('.course-card');
      if (card && card.dataset.course && card.style.display !== 'none') showTimetable(card.dataset.course);
    });
  }
  if (courseSearchEl) {
    courseSearchEl.addEventListener('input', filterCourses);
    courseSearchEl.addEventListener('keydown', function (e) { if (e.key === 'Escape') { courseSearchEl.value = ''; filterCourses(); courseSearchEl.blur(); } });
  }
  if (changeCourseBtn) changeCourseBtn.addEventListener('click', function () { if (courseSearchEl) { courseSearchEl.value = ''; filterCourses(); } showCourseSelect(); });

  showCourseSelect();

  const LECTURERS = {
    chen:    { name: 'John Chen', title: 'Mathematics', office: 'Room 101, Block A', officeFloor: 1, classBuilding: 'Block A', consultation: 'Mon & Wed 14:00 – 16:00', email: 'j.chen@school.edu', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen&backgroundColor=6366f1' },
    okonkwo: { name: 'Dr. Amara Okonkwo', title: 'Physics & Biology', office: 'Lab A, Ground floor', officeFloor: 0, classBuilding: 'Science Building', consultation: 'Tue 10:00 – 12:00, Thu 11:00 – 13:00', email: 'a.okonkwo@school.edu', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Okonkwo&backgroundColor=22c55e' },
    rivera:  { name: 'Ms. Elena Rivera', title: 'English Literature', office: 'Room 204, Block B', officeFloor: 2, classBuilding: 'Block B', consultation: 'Mon 12:00 – 14:00, Fri 15:00 – 17:00', email: 'e.rivera@school.edu', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rivera&backgroundColor=f59e0b' },
    sato:    { name: 'Mr. Kenji Sato', title: 'History', office: 'Room 112, Block A', officeFloor: 1, classBuilding: 'Block A', consultation: 'Wed 09:00 – 11:00', email: 'k.sato@school.edu', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sato&backgroundColor=ec4899' },
    patel:   { name: 'Dr. Priya Patel', title: 'Chemistry', office: 'Lab B, Ground floor', officeFloor: 0, classBuilding: 'Science Building', consultation: 'Tue 14:00 – 16:00, Thu 09:00 – 10:30', email: 'p.patel@school.edu', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patel&backgroundColor=22c55e' },
    kim:     { name: 'Ms. Soo-Jin Kim', title: 'Computing', office: 'IT Lab, Block A', officeFloor: 1, classBuilding: 'Block A', consultation: 'Mon & Thu 15:00 – 17:00', email: 's.kim@school.edu', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kim&backgroundColor=8b5cf6' },
    torres:  { name: 'Mr. Marco Torres', title: 'Art & Design', office: 'Studio, Block C', officeFloor: 2, classBuilding: 'Block C', consultation: 'Fri 10:00 – 12:00 (by appointment)', email: 'm.torres@school.edu', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Torres&backgroundColor=8b5cf6' },
    novak:   { name: 'Ms. Petra Novak', title: 'Geography', office: 'Room 305, Block B', officeFloor: 3, classBuilding: 'Block B', consultation: 'Wed 13:00 – 15:00', email: 'p.novak@school.edu', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Novak&backgroundColor=ec4899' },
    williams:{ name: 'Mr. James Williams', title: 'Physical Education', office: 'Sports Hall office', officeFloor: 0, classBuilding: 'Sports Complex', consultation: 'Tue & Thu 12:00 – 13:00', email: 'j.williams@school.edu', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Williams&backgroundColor=06b6d4' }
  };

  // Placeholder images for directions: 1 campus, 2 building, 3 floor, 4 door, 5 inside
  const DIRECTION_IMAGES = {
    class: [
      'https://picsum.photos/seed/campus-map/600/400',
      'https://picsum.photos/seed/building-class/600/400',
      'https://picsum.photos/seed/floorplan-class/600/400',
      'https://picsum.photos/seed/door-class/600/400',
      'https://picsum.photos/seed/lecture-hall/600/400'
    ],
    office: [
      'https://picsum.photos/seed/campus-office/600/400',
      'https://picsum.photos/seed/building-office/600/400',
      'https://picsum.photos/seed/floor-office/600/400',
      'https://picsum.photos/seed/door-office/600/400',
      'https://picsum.photos/seed/office-inside/600/400'
    ]
  };

  function floorLabel(floorNum) {
    var n = parseInt(floorNum, 10);
    if (n === 0) return 'ground floor';
    if (n === 1) return 'first floor';
    if (n === 2) return 'second floor';
    if (n === 3) return 'third floor';
    return (n + 1) + 'th floor';
  }

  const dayToCol = { mon: 2, tue: 3, wed: 4, thu: 5, fri: 6, sat: 7 };

  function formatTime(hour) {
    return (hour < 10 ? '0' : '') + hour + ':00';
  }

  // Fill and position each slot
  dayColumns.forEach(function (col) {
    const day = col.dataset.day;
    const colIndex = dayToCol[day];
    const slots = col.querySelectorAll('.slot');
    slots.forEach(function (slot) {
      const start = parseInt(slot.dataset.start, 10);
      const span = parseInt(slot.dataset.span, 10) || 1;
      const rowStart = start - 6; /* row 1 = day header, row 2 = 08:00, ... row 9 = 15:00 */
      slot.style.gridColumn = colIndex;
      slot.style.gridRow = rowStart + ' / span ' + span;

      if (slot.classList.contains('break')) return;

      const timeEl = slot.querySelector('.slot-time');
      const venueEl = slot.querySelector('.slot-venue');
      const floorEl = slot.querySelector('.slot-floor');
      const typeEl = slot.querySelector('.slot-type');

      if (timeEl) timeEl.textContent = formatTime(start) + ' – ' + formatTime(start + span);
      if (venueEl && slot.dataset.venue) venueEl.textContent = slot.dataset.venue;
      if (floorEl && slot.dataset.floor !== undefined) floorEl.textContent = 'Floor ' + slot.dataset.floor;
      if (typeEl && slot.dataset.type) typeEl.textContent = slot.dataset.type.charAt(0).toUpperCase() + slot.dataset.type.slice(1);
    });
  });

  // Display options: show/hide time, venue, floor, type
  function toggleDisplay(optId, metaClass) {
    const opt = document.getElementById(optId);
    if (!opt) return;
    const slots = document.querySelectorAll('.slot:not(.break) .' + metaClass);
    function update() {
      slots.forEach(function (el) { el.classList.toggle('visible', opt.checked); });
    }
    opt.addEventListener('change', update);
    update();
  }
  toggleDisplay('opt-time', 'slot-time');
  toggleDisplay('opt-venue', 'slot-venue');
  toggleDisplay('opt-floor', 'slot-floor');
  toggleDisplay('opt-type', 'slot-type');

  // Day tab filter
  var dayTabsMobileHint = document.getElementById('dayTabsMobileHint');
  function updateMobileHint(day) {
    if (dayTabsMobileHint) dayTabsMobileHint.style.display = day === 'all' ? '' : 'none';
  }
  dayTabButtons.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const day = tab.dataset.day;
      dayTabButtons.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      timetable.classList.remove('filter-mon', 'filter-tue', 'filter-wed', 'filter-thu', 'filter-fri', 'filter-sat');
      if (day !== 'all') timetable.classList.add('filter-' + day);
      updateMobileHint(day);
    });
  });
  updateMobileHint('all');

  // Lecturer card modal
  const overlay = document.getElementById('lecturerOverlay');
  const backdrop = document.getElementById('lecturerBackdrop');
  const closeBtn = document.getElementById('lecturerClose');
  var currentLecturerId = null;
  var currentSlot = null;

  function openLecturerCard(lecturerId, slot) {
    currentLecturerId = lecturerId;
    currentSlot = slot ? { venue: slot.dataset.venue || '', floor: slot.dataset.floor !== undefined ? slot.dataset.floor : '1' } : null;
    const L = LECTURERS[lecturerId];
    if (!L) return;
    const img = document.getElementById('lecturerPhoto');
    img.src = L.photo;
    img.alt = L.name;
    img.onerror = function () {
      var nameParts = L.name.split(' ');
      var initials = (nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '')).toUpperCase();
      this.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(initials) + '&size=120&background=6366f1&color=fff';
      this.onerror = null;
    };
    document.getElementById('lecturerCardTitle').textContent = L.name;
    document.getElementById('lecturerTitle').textContent = L.title;
    document.getElementById('lecturerOffice').textContent = L.office;
    document.getElementById('lecturerHours').textContent = L.consultation;
    const emailEl = document.getElementById('lecturerEmail');
    emailEl.href = 'mailto:' + L.email;
    emailEl.textContent = L.email;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLecturerCard() {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.slot:not(.break)[data-lecturer]').forEach(function (slot) {
    slot.style.cursor = 'pointer';
    slot.addEventListener('click', function () {
      openLecturerCard(slot.dataset.lecturer, slot);
    });
  });

  if (backdrop) backdrop.addEventListener('click', closeLecturerCard);
  if (closeBtn) closeBtn.addEventListener('click', closeLecturerCard);
  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLecturerCard();
  });

  // Directions overlay (Go to class / Go to office)
  const directionsOverlay = document.getElementById('directionsOverlay');
  const directionsBackdrop = document.getElementById('directionsBackdrop');
  const directionsClose = document.getElementById('directionsClose');
  var currentStepInstructions = [];

  function openDirections(mode) {
    var L = currentLecturerId && LECTURERS[currentLecturerId] ? LECTURERS[currentLecturerId] : null;
    if (!L) return;
    var imgs = DIRECTION_IMAGES[mode] || DIRECTION_IMAGES.class;
    var building, floorLabelText, doorLabel;
    if (mode === 'class' && currentSlot) {
      building = L.classBuilding || 'the building';
      floorLabelText = floorLabel(currentSlot.floor);
      var roomPart = (currentSlot.venue || '').split(' · ')[0].trim() || 'the room';
      doorLabel = roomPart;
    } else {
      var officeParts = (L.office || '').split(',');
      building = (officeParts[1] || officeParts[0] || 'the building').trim();
      floorLabelText = floorLabel(L.officeFloor);
      doorLabel = (officeParts[0] || 'the office').trim();
    }
    currentStepInstructions = [
      'Look for this building (' + building + ').',
      'Look for this building (' + building + ').',
      'Go to the ' + floorLabelText + '.',
      'Look for this door (' + doorLabel + ').',
      'The venue should look like this.'
    ];
    for (var i = 1; i <= 5; i++) {
      var imgEl = document.getElementById('dirImg' + i);
      var instEl = document.getElementById('dirInst' + i);
      var triggerEl = document.getElementById('dirTrigger' + i);
      if (imgEl) imgEl.src = imgs[i - 1];
      if (instEl) { instEl.textContent = currentStepInstructions[i - 1] || ''; instEl.classList.remove('visible'); }
      if (triggerEl) { triggerEl.setAttribute('aria-expanded', 'false'); }
    }
    directionsOverlay.setAttribute('aria-hidden', 'false');
    directionsOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (directionsClose) directionsClose.focus();
  }

  function closeDirections() {
    directionsOverlay.setAttribute('aria-hidden', 'true');
    directionsOverlay.classList.remove('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  }

  document.getElementById('btnGoToClass').addEventListener('click', function () {
    openDirections('class');
  });
  document.getElementById('btnGoToOffice').addEventListener('click', function () {
    openDirections('office');
  });
  if (directionsBackdrop) directionsBackdrop.addEventListener('click', closeDirections);
  if (directionsClose) directionsClose.addEventListener('click', closeDirections);
  directionsOverlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDirections();
  });

  // Lightbox: enlarge direction image on click
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt, instructions) {
    if (!lightboxImg) return;
    lightboxImg.src = src || '';
    lightboxImg.alt = alt || 'Enlarged view';
    var instEl = document.getElementById('lightboxInstructions');
    if (instEl) instEl.textContent = instructions || '';
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('open');
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.classList.remove('open');
  }

  document.getElementById('directionsSteps').addEventListener('click', function (e) {
    var trigger = e.target.closest('.direction-step-trigger');
    if (!trigger) return;
    var step = trigger.closest('.direction-step');
    var stepNum = step && step.dataset.step;
    if (!stepNum) return;
    var instEl = document.getElementById('dirInst' + stepNum);
    var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    if (instEl) {
      instEl.classList.toggle('visible', !isExpanded);
      trigger.setAttribute('aria-expanded', !isExpanded);
    }
  });

  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();

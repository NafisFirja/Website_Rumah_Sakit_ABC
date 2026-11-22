const doctorSelect = document.getElementById('appointment-doctor');
const appointmentContent = document.getElementById('appointment-page-content');
const appointmentError = document.getElementById('appointment-page-error');
const initialDoctorId = new URLSearchParams(window.location.search).get('id');
let currentDoctorId = initialDoctorId && Object.prototype.hasOwnProperty.call(doctors, initialDoctorId)
	? initialDoctorId
	: null;

Object.entries(doctors).forEach(([id, doctor]) => {
	const option = document.createElement('option');
	option.value = id;
	option.textContent = `${doctor.name} — ${doctor.specialty}`;
	doctorSelect.append(option);
});

function renderDoctor(doctorId) {
	const doctor = doctors[doctorId];
	const image = document.getElementById('selected-doctor-image');
	image.src = doctor.image;
	image.alt = `Foto ${doctor.name}`;
	document.getElementById('selected-doctor-name').textContent = doctor.name;
	document.getElementById('selected-doctor-specialty').textContent = doctor.specialty;
	document.getElementById('selected-doctor-description').textContent = doctor.description;

	const scheduleBody = document.getElementById('selected-doctor-schedule');
	scheduleBody.replaceChildren();
	doctor.schedule.forEach(entry => {
		const row = document.createElement('tr');
		const daysCell = document.createElement('td');
		const hoursCell = document.createElement('td');
		daysCell.textContent = entry.days;
		hoursCell.textContent = entry.hours;
		row.append(daysCell, hoursCell);
		scheduleBody.append(row);
	});

	doctorSelect.value = doctorId;
	document.getElementById('back-to-doctor').href = `detail-dokter.html?id=${encodeURIComponent(doctorId)}`;
	document.title = `Janji Temu dengan ${doctor.name} - Rumah Sakit ABC`;
}

if (currentDoctorId) {
	renderDoctor(currentDoctorId);
} else {
	appointmentContent.hidden = true;
	appointmentError.hidden = false;
}

doctorSelect.addEventListener('change', () => {
	const requestedDoctorId = doctorSelect.value;
	if (!requestedDoctorId || requestedDoctorId === currentDoctorId) {
		return;
	}

	if (!window.confirm('Apakah anda yakin ingin mengganti dokter saat ini?')) {
		doctorSelect.value = currentDoctorId;
		return;
	}

	currentDoctorId = requestedDoctorId;
	renderDoctor(currentDoctorId);
	window.history.replaceState(
		null,
		'',
		`${window.location.pathname}?id=${encodeURIComponent(currentDoctorId)}`
	);
});

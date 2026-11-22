const doctorId = new URLSearchParams(window.location.search).get('id');
const doctor = doctorId && Object.prototype.hasOwnProperty.call(doctors, doctorId)
	? doctors[doctorId]
	: null;

if (doctor) {
	const image = document.getElementById('doctor-image');
	image.src = doctor.image;
	image.alt = `Foto ${doctor.name}`;
	document.getElementById('doctor-name').textContent = doctor.name;
	document.getElementById('doctor-specialty').textContent = doctor.specialty;
	document.getElementById('doctor-description').textContent = doctor.description;
	document.title = `${doctor.name} - Profil Dokter Rumah Sakit ABC`;
	document.getElementById('book-appointment-link').href = `janji-temu.html?id=${encodeURIComponent(doctorId)}`;

	const scheduleBody = document.getElementById('doctor-schedule');
	doctor.schedule.forEach(entry => {
		const row = document.createElement('tr');
		const daysCell = document.createElement('td');
		const hoursCell = document.createElement('td');
		daysCell.textContent = entry.days;
		hoursCell.textContent = entry.hours;
		row.append(daysCell, hoursCell);
		scheduleBody.append(row);
	});
} else {
	document.getElementById('doctor-profile').hidden = true;
	document.getElementById('practice-schedule').hidden = true;
	document.getElementById('doctor-profile-error').hidden = false;
}

/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2026 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
async function submitNetlifyForm(event) {
	event.preventDefault();

	const form = event.currentTarget;
	const popup = document.getElementById('formPopup');
	const submitButton = form.querySelector('button[type="submit"]');
	submitButton.disabled = true;

	try {
		const formData = new FormData(form);
		const response = await fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formData).toString(),
		});

		if (!response.ok) {
			throw new Error('Form submission failed');
		}

		showFormPopup('Thanks! Your email was sent successfully.');
		form.reset();
	} catch (error) {
		showFormPopup('There was an error. Please try again.', true);
	} finally {
		submitButton.disabled = false;
	}

	return false;
}

let popupTimeout;

function showFormPopup(message, isError = false) {
	const popup = document.getElementById('formPopup');
	popup.querySelector('.form-popup__message').textContent = message;
	popup.classList.toggle('form-popup--error', isError);
	popup.classList.add('form-popup--visible');
	popup.setAttribute('aria-hidden', 'false');
	clearTimeout(popupTimeout);
	popupTimeout = setTimeout(() => {
		popup.classList.remove('form-popup--visible', 'form-popup--error');
		popup.setAttribute('aria-hidden', 'true');
	}, 3000);
}
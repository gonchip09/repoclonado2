/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2026 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
document.addEventListener('DOMContentLoaded', () => {
	const forms = document.querySelectorAll('form[data-netlify="true"]');
	const popup = document.getElementById('formPopup');
	let popupTimeout;

	forms.forEach((form) => {
		form.addEventListener('submit', async (event) => {
			event.preventDefault();

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

				popup.classList.add('form-popup--visible');
				popup.setAttribute('aria-hidden', 'false');
				form.reset();
				clearTimeout(popupTimeout);
				popupTimeout = setTimeout(() => {
					popup.classList.remove('form-popup--visible');
					popup.setAttribute('aria-hidden', 'true');
				}, 3000);
			} catch (error) {
				popup.querySelector('.form-popup__message').textContent = 'There was an error. Please try again.';
				popup.classList.add('form-popup--error', 'form-popup--visible');
				popup.setAttribute('aria-hidden', 'false');
				clearTimeout(popupTimeout);
				popupTimeout = setTimeout(() => {
					popup.classList.remove('form-popup--visible', 'form-popup--error');
					popup.setAttribute('aria-hidden', 'true');
				}, 3000);
			} finally {
				submitButton.disabled = false;
			}
		});
	});
});
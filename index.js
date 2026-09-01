// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
menuToggle.addEventListener('click', () => {
	menuToggle.classList.toggle('active');
	mobileNav.classList.toggle('active');
});
mobileNavLinks.forEach(link => {
	link.addEventListener('click', () => {
		menuToggle.classList.remove('active');
		mobileNav.classList.remove('active');
	});
});

// Navbar scroll effect and scroll spy
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

let isManualScroll = false;
let manualScrollEndTimer;

function runScrollSpy() {
	const scrollY = window.pageYOffset;
	const navHeight = navbar.offsetHeight;

	sections.forEach(section => {
		const sectionHeight = section.offsetHeight;
		const sectionTop = section.offsetTop - navHeight - 10;
		const sectionId = section.getAttribute('id');

		if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
			navLinks.forEach(link => {
				link.classList.remove('active');
				if (link.getAttribute('href') === '#' + sectionId) {
					link.classList.add('active');
				}
			});
		}
	});

	if (scrollY < 100) {
		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === '#home') {
				link.classList.add('active');
			}
		});
	}
}

function updateActiveNav() {
	const scrollY = window.pageYOffset;

	// Navbar background on scroll (միշտ, manual scroll-ի ժամանակ էլ)
	if (scrollY > 100) {
		navbar.classList.add('scrolled');
	} else {
		navbar.classList.remove('scrolled');
	}

	if (isManualScroll) {
		// Scroll-ը դեռ ընթանում է (click-ից հետո) — spy-ն չի աշխատում,
		// բայց ամեն scroll event-ով վերսկսում ենք "սպասման" ժամանակաչափը
		clearTimeout(manualScrollEndTimer);
		manualScrollEndTimer = setTimeout(() => {
			isManualScroll = false;
			runScrollSpy(); // scroll-ը կանգնելուց հետո վերջնական sync
		}, 100);
		return;
	}

	runScrollSpy();
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('resize', updateActiveNav);
updateActiveNav(); // Call on load

const navLinksMenu = document.querySelectorAll('.nav-link');
navLinksMenu.forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault();

		isManualScroll = true;
		clearTimeout(manualScrollEndTimer);

		// Մեկ քլիքով active դնում ենք հենց հիմա
		document.querySelector('.nav-link.active')?.classList.remove('active');
		this.classList.add('active');

		const targetId = this.getAttribute('href');
		const target = document.querySelector(targetId);
		if (target) {
			const navHeight = navbar.offsetHeight;
			const offsetTop = targetId === '#home'
				? 0
				: target.offsetTop - navHeight;
			window.scrollTo({
				top: offsetTop,
				behavior: 'smooth'
			});
		}

		// Fallback, եթե scroll event-ներ ընդհանրապես չգան (օրինակ՝ արդեն այդ դիրքում ես)
		manualScrollEndTimer = setTimeout(() => {
			isManualScroll = false;
		}, 100);
	});
});
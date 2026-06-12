const navLinks = document.querySelectorAll('.nav-route, .btn-donation, .btn-cta-volunteer');
const pages = document.querySelectorAll('.page-view');

function navigateToRoute(targetRoute, preselectedSubject = null) {
    navLinks.forEach(l => {
        if (l.classList.contains('nav-route')) {
            l.classList.remove('active');
            if (l.getAttribute('data-route') === targetRoute) l.classList.add('active');
        }
    });

    pages.forEach(page => page.classList.add('d-none'));
    document.getElementById(`view-${targetRoute}`).classList.remove('d-none');
    
    if (preselectedSubject) {
        const radioToSelect = document.querySelector(`input[name="contact-subject"][value="${preselectedSubject}"]`);
        if (radioToSelect) {
            radioToSelect.checked = true;
            radioToSelect.dispatchEvent(new Event('change'));
        }
    }

    const newPageTitle = document.querySelector(`#view-${targetRoute} h1, #view-${targetRoute} h2`);
    if (newPageTitle) {
        newPageTitle.setAttribute('tabindex', '-1');
        newPageTitle.focus();
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetRoute = link.getAttribute('data-route');
        const subject = link.getAttribute('data-subject');
        navigateToRoute(targetRoute, subject);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroCta = document.getElementById('cta-hero-scroll');
    if (heroCta) {
        heroCta.addEventListener('click', () => {
            document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const faqLink = document.getElementById('link-to-faq');
    if (faqLink) {
        faqLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToRoute('home');
            setTimeout(() => {
                document.getElementById('faq-block').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    }
});

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = header.nextElementSibling;
        const isCurrentlyActive = item.classList.contains('active');

        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            i.querySelector('.accordion-content').setAttribute('aria-hidden', 'true');
            i.querySelector('.icon').textContent = '+';
        });

        if (!isCurrentlyActive) {
            item.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
            content.setAttribute('aria-hidden', 'false');
            header.querySelector('.icon').textContent = '−';
        }
    });
});

const subjectRadioButtons = document.querySelectorAll('input[name="contact-subject"]');
const priorityBadge = document.getElementById('priority-badge');

subjectRadioButtons.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const value = e.target.value;
        
        if (value === 'urgent') {
            priorityBadge.textContent = "Προτεραιότητα: Υψηλή (Άμεση Ανταπόκριση)";
            priorityBadge.style.backgroundColor = "#fdf2f2";
            priorityBadge.style.color = "#c0392b";
        } else if (value === 'volunteer' || value === 'donation') {
            priorityBadge.textContent = "Προτεραιότητα: Μέση";
            priorityBadge.style.backgroundColor = "#eaf2f8";
            priorityBadge.style.color = "#2980b9";
        } else {
            priorityBadge.textContent = "Προτεραιότητα: Κανονική";
            priorityBadge.style.backgroundColor = "#eaeded";
            priorityBadge.style.color = "#7f8c8d";
        }
    });
});

const animalsGrid = document.getElementById('animals-grid');
const resultsCounter = document.getElementById('results-counter');

function renderAnimals(animals) {
    if (!animalsGrid) return;
    animalsGrid.innerHTML = '';

    if (animals.length === 0) {
        resultsCounter.textContent = 'Δεν βρέθηκαν ζωάκια.';
        return;
    }
    resultsCounter.textContent = `Βρέθηκαν ${animals.length} ζωάκια.`;

    animals.forEach(animal => {
        const card = document.createElement('article');
        card.classList.add('animal-card');

        const ageLabel = animal.age === 'young' ? 'Νέο' : animal.age === 'adult' ? 'Ενήλικο' : 'Ηλικιωμένο';
        const cityLabel = animal.city === 'thessaloniki' ? 'Θεσσαλονίκη' : animal.city === 'athens' ? 'Αθήνα' : 'Πάτρα';

        card.innerHTML = `
            <img src="${animal.img}" alt="${animal.alt}">
            <div class="card-content">
                <h3>${animal.name}</h3>
                <div class="card-info">
                    <p><strong>Ηλικία:</strong> ${ageLabel}</p>
                    <p><strong>Πόλη:</strong> ${cityLabel}</p>
                </div>
                <div class="card-actions">
                    <button class="btn-adopt" data-id="${animal.id}" aria-label="Αίτηση υιοθεσίας για τον ${animal.name}">
                        Υιοθεσία
                    </button>
                    <button class="btn-share" data-name="${animal.name}" aria-label="Κοινοποίηση για τον ${animal.name}">
                        🔗 Μοιράσου το
                    </button>
                </div>
            </div>
        `;
        animalsGrid.appendChild(card);
    });
}

if (animalsGrid) {
    animalsGrid.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-share')) {
            const animalName = e.target.getAttribute('data-name');
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: `Υιοθέτησε τον ${animalName}!`,
                        text: `Δες αυτό το υπέροχο ζωάκι που ψάχνει σπίτι στο Paws & Home!`,
                        url: window.location.href
                    });
                } catch (err) { console.log(err); }
            } else {
                alert(`Αντιγράψτε το link για να μοιραστείτε τον ${animalName}: ${window.location.href}`);
            }
        }
    });
}

const validators = {
    name: (val) => {
        if (!val.trim()) return "Το ονοματεπώνυμο είναι υποχρεωτικό.";
        if (val.trim().length < 5) return "Παρακαλούμε εισάγετε ολόκληρο το ονοματεπώνυμό σας.";
        return "";
    },
    email: (val) => {
        if (!val.trim()) return "Το email είναι υποχρεωτικό.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) return "Η διεύθυνση email δεν είναι έγκυρη.";
        return "";
    },
    message: (val) => {
        if (!val.trim()) return "Το πεδίο δεν μπορεί να είναι άδειο.";
        if (val.trim().length < 15) return "Παρακαλούμε γράψτε τουλάχιστον 15 χαρακτήρες.";
        return "";
    }
};

function validateField(inputElement, type) {
    const errorSpan = document.getElementById(`${inputElement.id}-error`);
    const formGroup = inputElement.parentElement;
    const errorMessage = validators[type](inputElement.value);

    if (errorMessage) {
        formGroup.classList.add('invalid');
        errorSpan.textContent = errorMessage;
        inputElement.setAttribute('aria-invalid', 'true');
        return false;
    } else {
        formGroup.classList.remove('invalid');
        errorSpan.textContent = '';
        inputElement.setAttribute('aria-invalid', 'false');
        return true;
    }
}

function setupFormValidation(formId, fieldsConfig) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    fieldsConfig.forEach(config => {
        const input = document.getElementById(config.id);
        if (input) input.addEventListener('input', () => validateField(input, config.type));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        fieldsConfig.forEach(config => {
            const input = document.getElementById(config.id);
            if (input) {
                const isFieldValid = validateField(input, config.type);
                if (!isFieldValid) isFormValid = false;
            }
        });

        if (isFormValid) {
            alert("Η φόρμα υποβλήθηκε επιτυχώς!");
            form.reset();
            if (typeof closeModal === "function" && formId === 'adopt-form') closeModal();
        } else {
            const firstInvalid = form.querySelector('.form-group.invalid input, .form-group.invalid textarea');
            if (firstInvalid) firstInvalid.focus();
        }
    });
}

const modal = document.getElementById('adopt-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalAnimalName = document.getElementById('modal-animal-name');
let lastFocusedElement = null;

function openModal(animalName, triggerButton) {
    lastFocusedElement = triggerButton;
    modalAnimalName.textContent = animalName;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => document.getElementById('user-name').focus(), 50);
    document.addEventListener('keydown', handleModalNavigation);
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('adopt-form').reset();
    modal.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
    if (lastFocusedElement) lastFocusedElement.focus();
    document.remove('keydown', handleModalNavigation);
}

function handleModalNavigation(e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
        const focusables = modal.querySelectorAll('button, input, textarea');
        const first = focusables[0]; const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

const filterType = document.getElementById('filter-type');
const filterAge = document.getElementById('filter-age');
const filterCity = document.getElementById('filter-city');

function filterAnimals() {
    const fType = filterType.value; const fAge = filterAge.value; const fCity = filterCity.value;
    const filtered = animalsData.filter(animal => {
        return (fType === 'all' || animal.type === fType) &&
               (fAge === 'all' || animal.age === fAge) &&
               (fCity === 'all' || animal.city === fCity);
    });
    renderAnimals(filtered);
}

if (filterType) filterType.addEventListener('change', filterAnimals);
if (filterAge) filterAge.addEventListener('change', filterAnimals);
if (filterCity) filterCity.addEventListener('change', filterAnimals);

if (animalsGrid) {
    animalsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-adopt')) {
            const id = e.target.getAttribute('data-id');
            const animal = animalsData.find(a => a.id == id);
            openModal(animal.name, e.target);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof animalsData !== 'undefined') renderAnimals(animalsData);
    
    setupFormValidation('adopt-form', [
        { id: 'user-name', type: 'name' },
        { id: 'user-email', type: 'email' },
        { id: 'user-message', type: 'message' }
    ]);

    setupFormValidation('contact-page-form', [
        { id: 'contact-name', type: 'name' },
        { id: 'contact-email', type: 'email' },
        { id: 'contact-msg', type: 'message' }
    ]);
});
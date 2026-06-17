const modal = document.querySelector('#bread-inquiry-modal');
const modalPanel = modal?.querySelector('.inquiry-modal');
const selectedBreadName = document.querySelector('#selected-bread-name');
const inquiryForm = document.querySelector('#bread-inquiry-form');
const inquiryMessage = document.querySelector('#inquiry-message');
const closeButton = document.querySelector('.modal-close');
let lastFocusedElement = null;

const focusableSelector = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

function getFocusableElements() {
  return Array.from(modal.querySelectorAll(focusableSelector)).filter(
    (element) => !element.disabled && element.offsetParent !== null,
  );
}

function openInquiryModal(breadName) {
  lastFocusedElement = document.activeElement;
  selectedBreadName.textContent = breadName;
  inquiryForm.reset();
  inquiryMessage.textContent = '';
  modal.hidden = false;
  document.body.classList.add('modal-open');
  closeButton.focus();
}

function closeInquiryModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  lastFocusedElement?.focus();
}

document.addEventListener('click', (event) => {
  const orderButton = event.target.closest('.bread-order-button');

  if (orderButton) {
    const card = orderButton.closest('.bread-card');
    openInquiryModal(card.dataset.breadName || 'this bread');
    return;
  }

  if (event.target === modal || event.target.closest('.modal-close')) {
    closeInquiryModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (modal.hidden) return;

  if (event.key === 'Escape') {
    closeInquiryModal();
    return;
  }

  if (event.key !== 'Tab') return;

  const focusableElements = getFocusableElements();
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

inquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  inquiryMessage.textContent = 'Thanks! This inquiry form is a placeholder for now. Please contact Phyllie directly once contact details are added.';
  inquiryForm.reset();
  closeButton.focus();
});

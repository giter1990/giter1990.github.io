const manageModals = (windows, item, modal) => {
	windows.forEach(item => {
		item.style.display = "none";
	});
	
	modal.style.display = "block";
	document.body.style.overflow = "hidden";
};

export default manageModals;
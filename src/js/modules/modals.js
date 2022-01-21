import manageModals from "./manageModals";

const modals = () => {
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, dataSelectors) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll("[data-modal]"),
			scroll = calcScroll();
			
		trigger.forEach(item => {
			item.addEventListener("click", e => {
				if (e.target) {
					e.preventDefault();
				}
				
				let startModal = document.querySelector(".popup_calc"),
					data;
					
				if (modal.hasAttribute("data-modal-calc")) {
					data = document.querySelectorAll(dataSelectors);
				}
										
				if ((modal === startModal) || (!modal.hasAttribute("data-modal-calc"))) {
					manageModals(windows, item, modal);
					document.body.style.marginRight = `${scroll}px`;
				} else {
					let condition = true,
						checked = 0;
					
					data.forEach(item => {
						if ((item.type === "text") && (item.value === "")) {
							condition = false;
						}
						
						if (item.type === "checkbox") {
							if (item.checked) {
								checked++;
							}
						}
					});
					
					if ((data[0].type === "checkbox") && (checked !== 1)) {
						condition = false;
					}
										
					if (!condition) {
						console.log("Enter all data.");
					} else {
						manageModals(windows, item, modal);
						document.body.style.marginRight = `${scroll}px`;
					}
				}
			});
		});
		
		close.addEventListener("click", () => {
			windows.forEach(item => {
				item.style.display = "none";
			});
			
			modal.style.display = "none";
			document.body.style.overflow = "";
			document.body.style.marginRight = 0;
		});
		
		modal.addEventListener("click", e => {
			if ((e.target === modal) && (closeClickOverlay)) {
				windows.forEach(item => {
					item.style.display = "none";
				});
				
				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = 0;
			}
		});
	}
	
	function showModalByTime(selector, time) {
		setTimeout(() => {
			console.log(document.querySelector(selector));
			console.log(document.querySelector(`${selector}`));
			
			document.querySelector(selector).style.display = "block";
			document.body.style.overflow = "hidden";
		}, time);
	}
	
	function calcScroll() {
		let div = document.createElement("div");
		
		div.style.width = "50px";
		div.style.height = "50px";
		div.style.overflowY = "scroll";
		div.style.visibility = "hidden";
		
		document.body.appendChild(div);
		
		let scrollWidth = div.offsetWidth - div.clientWidth;
		
		div.remove();
		
		return scrollWidth;
	}
	
	bindModal(".popup_engineer_btn", ".popup_engineer", ".popup_engineer .popup_close");
	bindModal(".phone_link", ".popup", ".popup .popup_close");
	bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
	bindModal(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close", false, ".popup_calc .form-control");
	bindModal(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close", false, ".popup_calc_profile .checkbox");
	showModalByTime("body > .popup", 60000);
};

export default modals;
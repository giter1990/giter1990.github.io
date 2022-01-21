const images = () => {
	const imgPopup = document.createElement("div"),
		workSection = document.querySelector(".works"),
		bigImage = document.querySelector("img");
		
	imgPopup.classList.add("popup");
	workSection.appendChild(imgPopup);
	
	imgPopup.style.display = "none";
	imgPopup.style.justifyContent = "center";
	imgPopup.style.alignItems = "center";
	
	imgPopup.appendChild(bigImage);
	
	workSection.addEventListener("click", e => {
		e.preventDefault();
		
		let target = e.target;
		
		if ((target) && (target.classList.contains("preview"))) {
			imgPopup.style.display = "flex";
			
			const path = target.parentNode.getAttribute("href");
			
			bigImage.setAttribute("src", path);
			
			bigImage.style.maxWidth = "80%";
			bigImage.style.marginBottom = 0;
			document.body.style.overflow = "hidden";
		}
		
		if ((target) && (target.matches("div.popup"))) {
			imgPopup.style.display = "none";
			
			bigImage.style.maxWidth = "auto";
			bigImage.style.marginBottom = "3rem";
			document.body.style.overflow = "";
		}
	});
};

export default images;
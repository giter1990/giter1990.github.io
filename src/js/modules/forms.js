import checkNumInputs from "./checkNumInputs";

const forms = state => {
	const form = document.querySelectorAll("form"),
		inputs = document.querySelectorAll("input"),
		message = {
			loading: "Загрузка...",
			success: "Спасибо! Скоро мы с вами свяжемся",
			failure: "Что-то пошло не так..."
		},
		postData = async (url, data) => {
			document.querySelector(".status").textContent = message.loading;
			
			let result = await fetch(url, {
				method: "POST",
				body: data
			});
			
			return await result.text();
		},
		clearInputs = () => {
			inputs.forEach(item => {
				item.value = "";
			});
		};
		
	checkNumInputs("input[name='user_phone']");	
		
	form.forEach(item => {
		item.addEventListener("submit", e => {
			e.preventDefault();
			
			let statusMessage = document.createElement("div");
			
			statusMessage.classList.add("status");
			item.appendChild(statusMessage);
			
			const formData = new FormData(item);
			
			if (item.getAttribute("data-calc") === "end") {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}
			
			postData("assets/server.php", formData)
				.then(result => {
					statusMessage.textContent = message.success;
				})
				.catch(() => {
					statusMessage.textContent = message.failure;
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		})
	})
}

export default forms;
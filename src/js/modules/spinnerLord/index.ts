export const removeSpinnerLord = () => {
	const sl = document.getElementById("spinner-lord")!;

	sl.classList.remove("active");
	sl.classList.add("inactive");

	setTimeout(() => sl.remove(), 2000);
};

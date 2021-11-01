export default function rmSL(){
    const spinnerLord = document.getElementById("spinner-lord");

    spinnerLord.classList.remove("active");
    spinnerLord.classList.add("inactive");

    setTimeout(::spinnerLord.remove, 2000);
}
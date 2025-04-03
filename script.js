const themes = [
    [
        "248, 35, 32",  // scarlet
        "204, 122, 78", // red-orange
        "180, 173, 29", // orange-yellow
        "228, 243, 69", // yellow
    ],
    [
        "32, 248, 255", // cyan
        "29, 141, 180", // blue
        "91, 78, 204",  // indigo
        "192, 69, 243", // magenta
    ],
    [
        "248, 238, 32", // yellow
        "108, 204, 78", // light-green
        "29, 180, 110", // dark-green
        "69, 243, 226", // cyan
    ],
];

const randomThemeIndex = Math.floor(Math.random() * themes.length);
document.documentElement.style.setProperty("--theme-1", `${themes[randomThemeIndex][0]}`);
document.documentElement.style.setProperty("--theme-2", `${themes[randomThemeIndex][1]}`);
document.documentElement.style.setProperty("--theme-3", `${themes[randomThemeIndex][2]}`);
document.documentElement.style.setProperty("--theme-4", `${themes[randomThemeIndex][3]}`);

fetch("https://api.github.com/users/tristanparry/repos")
    .then(response => response.json())
    .then(data => {
        let returnHTML = "";
        data.forEach(project => {
            returnHTML += `<a href="${project.html_url ?? ""}" target="_blank">
                                <div class="project-row borderGradient">
                                    <div class="project-info-1">
                                        <h3 class="project-title">${project.name}</h3>
                                        <span class="project-description">${project.description}</span>
                                    </div>
                                    <div class="project-info-2">
                                        <img src="IMAGES/language.svg" alt="Language" height="25"><span>${project.language ?? "N/A"}</span>
                                        <img src="IMAGES/fork.svg" alt="Forks" height="25"><span>${project.forks_count ?? 0}</span>
                                        <img src="IMAGES/eye.svg" alt="Watchers" width="25"><span>${project.watchers_count ?? 0}</span>
                                    </div>
                                </div>
                            </a>`
        });
        document.getElementById("project-list").innerHTML = returnHTML;
        if ((data.length != null) && (data.length != undefined) && (data.length > 10)) {
            document.getElementById("project-list").setAttribute("expanded", "false");
            document.getElementById("project-list-arrow-button").setAttribute("active", "true");
            document.getElementById("arrow").innerText = "\u2193";
            document.getElementById("expand-collapse").innerText = "Open";
            document.getElementById("project-list-under").style.boxShadow = `${getComputedStyle(document.getElementById("projects")).getPropertyValue("background-color")} 0px -40px 20px 20px`;
        }
    })
    .catch(error => console.log(error));

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-container-ul");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});
document.querySelectorAll(".nav-container-ul-a").forEach(element => element.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

const projectList = document.getElementById("project-list");
const projectListArrowButton = document.getElementById("project-list-arrow-button");
const arrow = document.getElementById("arrow");
const expandCollapse = document.getElementById("expand-collapse")
const projectListUnder = document.getElementById("project-list-under");
projectListArrowButton.addEventListener("click", () => {
    if (projectListArrowButton.getAttribute("active") === "true") {
        projectListArrowButton.setAttribute("active", "false");
        arrow.innerText = "\u2191";
        expandCollapse.innerText = "Close";
        projectList.setAttribute("expanded", "true");
        projectListUnder.style.boxShadow = "";
    } else {
        projectListArrowButton.setAttribute("active", "true");
        arrow.innerText = "\u2193";
        expandCollapse.innerText = "Open";
        projectList.setAttribute("expanded", "false");
        projectListUnder.style.boxShadow = `${getComputedStyle(document.getElementById("projects")).getPropertyValue("background-color")} 0px -40px 20px 20px`;
    }
    projectListArrowButton.blur();
});

const hobbiesInner = document.getElementById("hobbies-inner");
hobbiesInner.addEventListener("wheel", e => {
    if (((e.deltaY > 0) && (hobbiesInner.offsetWidth + hobbiesInner.scrollLeft >= hobbiesInner.scrollWidth)) ||
        ((e.deltaY < 0) && (hobbiesInner.offsetLeft + hobbiesInner.scrollLeft <= hobbiesInner.offsetLeft))) {
        return
    }
    e.preventDefault();
    hobbiesInner.scrollLeft += e.deltaY;
});

const experienceContainer = document.getElementById("experience-inner");
const radioButtons = experienceContainer.querySelectorAll(':scope > div#experience-container-radio > label > input');
const experienceDetails = experienceContainer.querySelectorAll(":scope > div.experience-details");
radioButtons.forEach(e => {
    e.addEventListener("click", () => {
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].removeAttribute("checked");
            experienceDetails[i].style.display = "none";
            if (e === radioButtons[i]) {
                radioButtons[i].setAttribute("checked", "checked");
                experienceDetails[i].style.display = "block";
            }
        }
    });
});
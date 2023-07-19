const themes = [
    [
        '169, 32, 248', // violet
        '204, 78, 134', // pink
        '180, 132, 29', // orange
        '166, 243, 69', // yellow-green
    ],
    [
        '248, 35, 32',  // scarlet
        '204, 122, 78', // red-orange
        '180, 173, 29', // orange-yellow
        '228, 243, 69', // yellow
    ],
    [
        '32, 248, 255', // cyan
        '29, 141, 180', // blue
        '91, 78, 204',  // indigo
        '192, 69, 243', // magenta
    ],
    [
        '248, 238, 32', // yellow
        '108, 204, 78', // light-green
        '29, 180, 110', // dark-green
        '69, 243, 226', // cyan
    ],
];

const randomThemeIndex = Math.floor(Math.random() * themes.length);

document.documentElement.style.setProperty('--theme-1', `${themes[randomThemeIndex][0]}`);
document.documentElement.style.setProperty('--theme-2', `${themes[randomThemeIndex][1]}`);
document.documentElement.style.setProperty('--theme-3', `${themes[randomThemeIndex][2]}`);
document.documentElement.style.setProperty('--theme-4', `${themes[randomThemeIndex][3]}`);

fetch('https://api.github.com/users/tristanparry/repos')
    .then(response => response.json())
    .then(data => {
        let returnHTML = '';
        data.forEach(project => {
            returnHTML += `<a href="${project.html_url}" target="_blank">
                                <div class="project-row borderGradient">
                                    <div class="project-info-1">
                                        <h3 class="project-title">${project.name}</h3>
                                        <span class="project-description">${project.description}</span>
                                    </div>
                                    <div class="project-info-2">
                                        <img src="IMAGES/language.svg" alt="Language" height="25"><span>${project.language}</span>
                                        <img src="IMAGES/fork.svg" alt="Forks" height="25"><span>${project.forks_count}</span>
                                        <img src="IMAGES/eye.svg" alt="Watchers" width="25"><span>${project.watchers_count}</span>
                                    </div>
                                </div>
                            </a>`
        });
        document.getElementById('project-list').innerHTML = returnHTML;
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
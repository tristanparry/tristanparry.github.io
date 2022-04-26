fetch('https://api.github.com/users/tristanparry/repos')
    .then(response => response.json())
    .then(data => {
        let returnHTML = '';
        data.forEach(status => {
            returnHTML += `<a class="project-row-parent-a" href="${status.html_url}" target="_blank">
                                <div class="project-row">
                                    <div class="project-info-1">
                                        <h3 class="project-title">${status.name}</h3>
                                        <span class="project-description">${status.description}</span>
                                    </div>
                                    <div class="project-info-2">
                                        <img src="IMAGES/language.svg" alt="Language" height="25"><span>${((status.name === "SmiteBot") ? "JavaScript" : status.language)}</span>
                                        <img src="IMAGES/fork.svg" alt="Forks" height="25"><span>${status.forks_count}</span>
                                        <img src="IMAGES/eye.svg" alt="Watchers" width="25"><span>${status.watchers_count}</span>
                                    </div>
                                </div>
                            </a>`
        });
        document.getElementById('project-list').innerHTML = returnHTML;
    })
    .catch(error => console.log(error));

document.addEventListener('DOMContentLoaded', (e) => {


    let myForm = document.getElementById("github-form")

    let submitBtn = document.querySelector('[name="submit"]')

    myForm.addEventListener('submit', (e) => {

        e.preventDefault()

        let searchValue = document.getElementById("search").value

        let finalUrl = `https://api.github.com/search/users?q=${searchValue}`

        fetch(finalUrl)
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            removeUserChildNodes()
            data.items.forEach(user => {
                renderUsers(user)
            });
        })
        .then(data => {

            removeRepoChildNodes()
            displayRepos(data)
        })
    })

    function renderUsers(user) {

        let userCard = document.createElement("ul")

        userCard.className = "userCard"
        userCard.innerHTML = `
        <div>
            <body><br>
            <img src="${user.avatar_url}" id="userImg" height="60px" width="60px" />
            <h3>${user.login}</h3>
            <p>Click below to see this user's repos.</p>
            <button name="${user.repos_url}" class="userBtn">User Repos</button><br>
            <body><br>
        </div>`

        document.getElementById("user-list").append(userCard)
    }
    function renderRepos(repo) {

        removeRepoChildNodes()
        
        repo.forEach(repo => {
            console.log(repo)
            let repoCard = document.createElement("ul")
            repoCard.className = "repoCard"
            repoCard.innerHTML = `
            <div>
                <body>
                <h2>${repo.name}</h2>
                <p><a href="${repo.html_url}" target ="_blank">Click here<a></p>
                </body>
            </div>`
    
            document.getElementById("repos-list").append(repoCard)
        })


    }

    function displayRepos() {

        let repoBtn = document.querySelectorAll('.userBtn')

        repoBtn.forEach(btn => {
            btn.addEventListener("click", (e) => {

                e.preventDefault()

                let newUrl = e.target.name

                // console.log(newUrl)
                
                fetch(newUrl)
                .then(resp => resp.json())
                .then(data => renderRepos(data))
            })
        })
    }

    function removeUserChildNodes() {

        let parent = document.getElementById("user-list")

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }

    function removeRepoChildNodes() {

        let parent = document.getElementById("repos-list")

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }
})

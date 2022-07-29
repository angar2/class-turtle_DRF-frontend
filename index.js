window.onload = async function checkLogin() {
    let payload = localStorage.getItem("payload")
    let parsed_payload = await JSON.parse(payload)

    const username = document.getElementById("username")
    const loginout = document.getElementById("loginout")

    if (parsed_payload) {
        username.innerText = parsed_payload.username
        loginout.innerHTML ='로그아웃'
        loginout.setAttribute('onclick', 'handleLogout()')
    } else {
        username.innerText = "로그인 해주세요."
        loginout.innerHTML ='로그인'
        loginout.setAttribute('onclick', "location.href='/login.html'")
    }
}

window.onload = async function loadArticles() {
    articles = await getArticles()
    const article_list = document.getElementById("articles")
    
    articles.forEach(article => {
        const newArticle = document.createElement('div')
        const articleImage = document.createElement('img')
        articleImage.setAttribute("src", `${backend_base_url}${article.image}`)
        newArticle.setAttribute("id", article._id)
        newArticle.setAttribute("onclick", "articleDetail(this.id)")
        newArticle.innerText = article.title
        newArticle.appendChild(articleImage)
        article_list.appendChild(newArticle)
    });
}
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

checkLogin()
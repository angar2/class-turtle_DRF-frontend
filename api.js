const backend_base_url = "http://127.0.0.1:8000"
// const frontend_base_url = "http://127.0.0.1:5500"
const frontend_base_url = "https://62e383743d49f54e7bb0cdc3--classy-rolypoly-5c40a0.netlify.app/"


// 회원가입
async function handleSignin(){

    const signupData = {
        username : document.getElementById("floatingInput").value,
        password : document.getElementById('floatingPassword').value,
        email : document.getElementById('floatingInputEmail').value,
        fullname : document.getElementById('floatingInputFullname').value,
    }
    
    const response = await fetch(`${backend_base_url}/user/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )

    response_json = await response.json()

    if (response.status ==200){
        window.location.replace(`${frontend_base_url}/login.html`);
    }else{
        alert(response.status)
    }
}

// 로그인
async function handleLogin(){
    console.log("handle login")

    const loginData = {
        username : document.getElementById("floatingInput").value,
        password : document.getElementById('floatingPassword').value
    }
    const response = await fetch(`${backend_base_url}/user/api/token/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(loginData)
    }
    )
    response_json = await response.json()

    if (response.status ==200){
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        window.location.replace(`${frontend_base_url}/index.html`);
    }else{
        alert(response.status)
    }
}

// 로그아웃
function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload()
}

// 게시물 저장
async function postArticle() {
    const title = document.getElementById("article_create").value
    const content = document.getElementById("article_content").value
    const image = document.getElementById("article_image").files[0]

    let fomedata = new FormData();

    fomedata.append('title', title)
    fomedata.append('content', content)
    fomedata.append('image', image)

    const response = await fetch(`${backend_base_url}/article/`, {
        method:'POST',
        body: fomedata
    })

    if (response.status == 200) {
        alert('저장되었습니다.')
        window.location.reload(`${frontend_base_url}/`)
    } else {
        alert(response.stauts)
    }
}

// 게시물 불러오기
async function getArticles() {
    const response = await fetch(`${backend_base_url}/article/`, {
        method:'GET',
    })
    response_json = await response.json()

    if (response.status == 200) {
        return response_json
    } else {
        alert(response.stauts)
    }
}
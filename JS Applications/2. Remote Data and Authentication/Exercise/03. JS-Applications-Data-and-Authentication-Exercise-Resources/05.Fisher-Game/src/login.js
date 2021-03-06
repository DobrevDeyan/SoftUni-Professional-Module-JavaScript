let userData = null

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form#login")
  form.addEventListener("submit", onLogin)

  if (!userData) {
    document.getElementById("user").style.display = "none"
  }
})

async function onLogin(event) {
  event.preventDefault()
  const formData = new FormData(event.target)

  const email = formData.get("email").trim()
  const password = formData.get("password").trim()

  try {
    const url = `http://localhost:3030/users/login`
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    if (response.ok !== true) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()

    const userData = {
      email: data.email,
      id: data._id,
      token: data.accessToken,
    }

    sessionStorage.setItem("userData", JSON.stringify(userData))
    window.location = "index.html"

    const userName = document.getElementsByTagName("span")[0]
    userName.textContent = userData.email
  } catch (error) {
    alert(error.message)
  }
}

import { showSection, element } from "./dom.js"

const catalogSection = document.getElementById("catalogSection")
const ul = document.querySelector("#catalogSection ul")
catalogSection.remove()

export function showCatalogPage() {
  showSection(catalogSection)

  loadMovies()
}

async function loadMovies() {
  ul.replaceChildren(element("p", {}, "Loading..."))

  const options = { method: "get", headers: {} }
  const userData = JSON.parse(sessionStorage.getItem("userData"))

  if (userData != null) {
    options.headers["X-Authorization"] = userData.token
  }

  const response = await fetch("http://localhost:3030/data/movies", options)

  if (response.status == 403) {
    sessionStorage.removeItem("userData")
    alert("Error 403")
    updateNavigation()
    showLoginSection()
  }

  const movies = await response.json()

  ul.replaceChildren(...movies.map(createMovie))
}

function createMovie(movie) {
  return element("li", {}, movie.title)
}

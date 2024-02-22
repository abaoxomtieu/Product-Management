//button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href); //use new URL to can use searchParams
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      console.log(status);
      if (status) {
        url.searchParams.set("status", status); //add param to url
      }
      else{
        url.searchParams.delete("status");
      }
      console.log(url.href);
      window.location.href = url.href //use function to redirect
    });
  });
}
// End button status

console.log(buttonStatus);

//Form Seach
const formSearch = document.querySelector("#form-search")
if(formSearch){
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.elements.keyword.value)
    const keyword = e.target.elements.keyword.value
    if (keyword) {
      url.searchParams.set("keyword", keyword); //add param to url
    }
    else{
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href 
  })
}
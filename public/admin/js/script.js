//button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href); //use new URL to can use searchParams
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status); //add param to url
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href; //use function to redirect
    });
  });
}
// End button status

//Form Seach
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword); //add param to url
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//Form Seach End

//Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination");
if (buttonsPagination) {
  let url = new URL(window.location.href);
  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page); //add param to url

      window.location.href = url.href;
    });
  });
}

//+ Back page

//Pagination End

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });
  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = document.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
const inputIds = document.querySelector("input[name='ids']");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    const typeChange = e.target.elements.type.value;
    console.log(typeChange);
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    if (inputsChecked.length > 0) {
      const isConfirm = confirm(`Are you sure you want to apply all`);
      if (isConfirm) {
        let ids = [];
        inputsChecked.forEach((input) => {
          const id = input.getAttribute("value"); // or input.value
          const position = input
            .closest("tr")
            .querySelector("input[name = 'position']").value;
          console.log(position);
          if (typeChange == "change-position") {
            const path = id + "-" + position;
            ids.push(path);
          } else {
            ids.push(id);
          }
        });

        inputIds.value = ids.join(", ");
        formChangeMulti.submit();
      }
    } else {
      alert("Please select at least one!");
    }
  });
}
// End Form Change Multi

//

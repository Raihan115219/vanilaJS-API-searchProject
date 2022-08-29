const gallery = document.getElementById("gallery");
const searchBtn = document.getElementById("searchButton");
const spinner = document.getElementById("spinner");

// vent listenr create
searchBtn.addEventListener("click", getResult);

function getResult() {
  gallery.innerHTML = `
    <div class="text-center">
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
  `;
  const searchTxt = document.getElementById("searchValue");
  let searchValue = searchTxt.value.trim();
  fetch(
    ` https://pixabay.com/api/?key=24357815-a18ef174ca31639bec4066a17&q=${
      searchValue !== "" ? searchValue : "animal"
    }?&image_type=photo&per_page=30`
  )
    .then((response) => response.json())
    .then((data) => {
      let result = "";
      if (data.hits.length === 0) {
        searchTxt.value = "";
        gallery.innerHTML = `<h1 class="text-danger text-center p-5">Not Found</h1>`;
      } else {
        data.hits.forEach((item, index) => {
          result += `
         <div class="col-lg-4">
            <div class="card h-100 w-100 g-5 shadow-lg cursor-pointer" onclick="getDetails('${item.pageURL}')">
              <img
                src=${item.largeImageURL}
                class="card-img-top img-fluid h-100 w-100"
                alt="..."
              />
              <div class="text-center pb-2">
                <h5 class="card-title text-center">User Name : ${item.user}</h5>
              </div>
            </div>
          </div>
        `;
          searchTxt.value = "";
          gallery.innerHTML = result;
        });
      }
    });
}

const getDetails = (item) => {
  window.location.href = `${item}`;
};

getResult();

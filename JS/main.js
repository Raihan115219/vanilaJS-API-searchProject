const gallery = document.getElementById("gallery");
const searchBtn = document.getElementById("searchButton");

// vent listenr create
searchBtn.addEventListener("click", getResult);

function getResult() {
  let searchValue = document.getElementById("searchValue").value.trim();

  fetch(
    ` https://pixabay.com/api/?key=24357815-a18ef174ca31639bec4066a17&q=${
      searchValue !== "" ? searchValue : "rose"
    }?&image_type=photo`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data !== "") {
        data.hits.map((item, index) => {
          console.log(item);
          html += `
         <div class="col-lg-3">
            <div class="card h-100 w-100 g-5 shadow-lg">
              <img
                src=${item.webformatURL}
                class="card-img-top img-fluid h-100 w-100"
                alt="..."
              />
              <div>
                <h5 class="card-title text-center">Picture : ${item.user}</h5>
              </div>
            </div>
          </div>
        `;
        });
      } else {
        html += "Sorry! We did not find any result";
      }
      gallery.innerHTML = html;
    });
}
getResult();

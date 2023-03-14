// Fetch All AI Universe Hub
const loadAiData = async (dataLimit) => {
  try {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    displayAiData(data.data.tools, dataLimit);
  } catch (error) {
    console.log(error);
  }
};
// Display AI Universe Hub Data

const displayAiData = (data, dataLimit) => {
  const showMore = document.getElementById("show-all");
  if (dataLimit && data.length >= 6) {
    spinnerToggle(true);
    data = data.slice(0, 6);
    showMore.classList.remove("d-none");
  } else {
    showMore.classList.add("d-none");
  }
  const allData = () => {
    const aiContainer = document.getElementById("ai-container");
    aiContainer.textContent = "";
    data.forEach((element) => {
      const aiDiv = document.createElement("div");
      aiDiv.classList.add("col");
      aiDiv.innerHTML = `
            <div class="card">
                <img
                src=${element.image}
                class="card-img-top"
                alt="..."
                />
                <div class="card-body">
                        <ul>
                        ${element.features
                          .map((feature) => `<li>${feature}</li>`)
                          .join("")}
                      </ul>
                      <hr>
                    <div class="d-flex justify-content-between align-items-center">
                   
                    <div>
                        <h5 class="card-title">${element.name}</h5>
                        <p class="published"><i class="fa-solid fa-calendar-days"></i> ${element.published_in}</p>
                    </div>
                    <button onClick="handleDetails('${
                      element.id
                    }')"type="button"
                    class="btn btn-danger"data-bs-toggle="modal"data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                    
                    </div>
                </div>
            </div>  
                    `;
      aiContainer.appendChild(aiDiv);
      spinnerToggle(false);
    });
  };
  allData();
  // sort by date handler ---------------------------- start
  document.getElementById("sortByDate").addEventListener("click", () => {
    const published_in = data;
    published_in.sort(
      (a, b) => new Date(b.published_in) - new Date(a.published_in)
    );
    allData();
  });
  // sort by date handler ---------------------------- end
};
//   loader
const spinnerToggle = (isLoading) => {
  const loadingSection = document.getElementById("loader");
  if (isLoading) {
    loadingSection.classList.remove("d-none");
  } else {
    loadingSection.classList.add("d-none");
  }
};

// processDisplay
const processDisplay = (dataLimit) => {
  loadAiData();
};

// handle show all button
document.getElementById("btn-show-more").addEventListener("click", () => {
  processDisplay();
});

// modal
const detailsDisplay = (aiDetails) => {
  console.log("my define,", aiDetails.accuracy.score);

  const modleTitle = document.getElementById("aiModal");
  modleTitle.innerText = aiDetails.tool_name;
  const modalBody = document.getElementById("model-body");
  modalBody.innerHTML = `
   
  <div class="row">
  <div class="col-md-6 modal-left">
    <p>${aiDetails.description}</p>
    <div class="pricing">
      <div class="paln">
        <h6>${
          aiDetails.pricing != null
            ? aiDetails.pricing[0].price
            : `Free of Cost/`
        }</h6>
        <h6>${
          aiDetails.pricing != null ? aiDetails.pricing[0].plan : `Basic`
        }</h6>
      </div>

      <div class="paln">
      <h6>${
        aiDetails.pricing != null ? aiDetails.pricing[1].price : `Free Of Cost/`
      }</h6>
      <h6>${aiDetails.pricing != null ? aiDetails.pricing[1].plan : `Pro`}</h6>
    </div>

    <div class="paln">
    <h6>${
      aiDetails.pricing != null ? aiDetails.pricing[2].price : `Free of Cost /`
    }</h6>
    <h6>${
      aiDetails.pricing != null ? aiDetails.pricing[2].plan : `Enterprise`
    }</h6>
  </div>

  </div>
    <div class="d-flex justify-content-between gap-4 mt-4">
      <div>
        <h5>features</h5>
         <ul>
            <li>${aiDetails.features[1].feature_name}</li>
            <li>${aiDetails.features[2].feature_name}</li>
            <li>${aiDetails.features[3].feature_name}</li>
         </ul>
      </div>
      <div>
        <h5>integration</h5>
        <ul style="font-size: 15px">
        ${`${
          aiDetails.integrations != null
            ? ` ${aiDetails.integrations
                .map((integration) => `<li>${integration}</li>`)
                .join("")}`
            : `No data Found`
        }`}
         
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-6 modal-right text-center">
  <div class="position-relative">
      <img class="img img-fluid" src="${aiDetails.image_link[0]}" alt="" />
      
      ${
        aiDetails.accuracy.score != null
          ? `<h5 class="accuracy  position-absolute top-0 end-0 mt-2 me-3"> ${
              aiDetails.accuracy.score * 100
            }% accuracy </h5>`
          : ``
      }
  </div>
    <h5  class ="mt-3 font-weight-bold">${
      aiDetails.input_output_examples != null
        ? `${aiDetails.input_output_examples[0].input}`
        : `Can you give any example?`
    }</h5>
    <p class ="mt-3 font-weight-bold">${
      aiDetails.input_output_examples != null
        ? `${aiDetails.input_output_examples[0].output}`
        : `No! Not Yet! Take a break!!!`
    }</p>
  </div>
</div>
    `;
};

// handle details button
const handleDetails = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    detailsDisplay(data.data);
  } catch (error) {
    console.log(error.message);
  }
};

loadAiData(7);

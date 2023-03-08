const loadData =async () =>{
const url = `https://openapi.programming-hero.com/api/ai/tools`;
const res = await fetch(url)
const data = await res.json()
toggleSpinner(true);
showData(data.data.tools.slice(0,6))
}

const showData = (elements) =>{
const showElements = document.getElementById('show-elements');
showElements.innerHTML ="";
elements.forEach(element =>{
const {image,features,name,published_in,id} = element;
    const singleData = document.createElement('div');
    singleData.classList.add('col');
    singleData.innerHTML =`
                  <div class="card h-100 p-3">
                    <img src=${image} class="card-img-top" alt="..." height="200px">
                    <div class="card-body">
                      <h5 class="card-title fw-semibold">Features</h5>
                      <ol>
                      <li>${features[0]}</li>
                      <li>${features[1]}</li>
                      <li>${features[2] ? features[2] : "Text generation"}</li>
                      </ol>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                      <div>
                      <h5>${name}</h5>
                      <p><i class="fa-solid fa-calendar-days"></i>  ${published_in}</p> 
                      
                      </div>
                      <div>
                      <button onclick="loadItemDetails('${id}')" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-circle-arrow-right text-danger-emphasis"></i></button>
                      
                      </div>
                    </div>
                  </div>

`;
showElements.appendChild(singleData);

});
//Stop Loading Spinner
toggleSpinner(false);

};

// Modal
const loadItemDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayItemDetails(data.data)
}
const displayItemDetails = (item) =>{

    const {description,pricing,features,integrations,image_link,input_output_examples,accuracy} = item;
    const itemDetails = document.getElementById('item-details');
    itemDetails.innerHTML=`
    <div class="card border-danger m-2 p-5">
    <h4>${description}</h4>
    <div class="d-flex justify-content-evenly align-items-center my-4">
    <div class="me-2 bg-body-tertiary text-success fw-semibold text-center">${pricing ? pricing[0].price +' '+  pricing[0].plan : 'Free of Cost' }</div>
    <div class="me-2 bg-body-tertiary text-warning fw-semibold text-center">${pricing ? pricing[1].price +' '+  pricing[1].plan : 'Free of Cost'}</div>
    <div class="bg-body-tertiary text-danger fw-semibold text-center">${pricing ? pricing[2].price +' '+  pricing[2].plan : 'Free of Cost'}</div>
    </div>
    <div class="d-flex justify-content-between">
    <div>
    <h5 class="fw-semibold">Features</h5>
    <ul>
    <li>${features['1'].feature_name}</li>
    <li>${features['2'].feature_name}</li>
    <li>${features['3'].feature_name}</li>
    </ul>

    </div>
    <div>
    <h5 class="fw-semibold">Integrations</h5>
    <ul>
    <li>${integrations ? integrations[0] ? integrations[0]:'No Data Found': 'No Data Found'}</li>
    <li>${integrations ? integrations[1] ? integrations[1]:'No Data Found': 'No Data Found'}</li>
    <li>${integrations ? integrations[2] ? integrations[2]:'No Data Found': 'No Data Found'}</li>
    </ul>
    </div>

    </div>
    </div>

    <div class="card border-secondary-subtle m-2 p-5">
    
    
    <img class="position-relative"  src=${image_link[0]} alt="">
   
    <p id="accuracy" class="position-absolute top-0 end-0 p-2  mt-5 me-5 bg-danger rounded-pill text-white fw-semibold">${Math.round(accuracy.score*100)}% accuracy
    </p>
    
    
    <h5 class="fw-semibold my-3 text-center">${input_output_examples ?input_output_examples[0].input || input_output_examples[1].input: 'No Data Found'}</h5>
    <p class="text-center">${input_output_examples ?input_output_examples[0].output || input_output_examples[1].output : 'No Data Found'}</p>


    </div>
    
    
    `;
    // Accuracy data hide or show
  const accuracyScore = Math.round(accuracy.score * 100);
  const accuracyElement = document.getElementById("accuracy");

  if (accuracyScore === 0) {
    accuracyElement.style.display = "none";
  } else {
    accuracyElement.textContent = `${accuracyScore}% accuracy`;
  }

}



// Loading Spinner
const toggleSpinner = isLoading =>{
  const loadingSection = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSection.classList.remove('d-none');
  }
  else{
    loadingSection.classList.add('d-none');
  }
}




//See More Button
const seeMoredata=async()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    const res =await fetch(url);
    const data = await res.json();
    showData(data.data.tools);
};

document.getElementById('btn-see-more').addEventListener('click',function(e){
    e.target.classList.add('d-none');
});


// Sort By Date
const sortByDate = async() =>{
  const url=`https://openapi.programming-hero.com/api/ai/tools`;
    const res =await fetch(url);
    const data = await res.json();
   const date = data.data.tools.sort((a,b)=> new Date(a.published_in) - new Date(b.published_in));
    showData(date);
    const removeSeeMore = document.getElementById('see-more');
    removeSeeMore.innerHTML="";

}


loadData();



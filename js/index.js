let getData = [];
var isOpen = $(".nav").css("left")


$("#open-nav").click(function () {
    console.log(isOpen);
    if (isOpen == "0px") {
        console.log("is 0px")
    }
    $(".fa-align-justify").toggleClass("fa-times");
    $(".nav").toggleClass("animate")
    $(".menu").toggleClass("animate")
    $(".item1").animate({
        paddingTop: "25px"
    }, 1000)
    $(".item2").animate({
        paddingTop: "25px"
    }, 1200)
    $(".item3").animate({
        paddingTop: "25px"
    }, 1300)
    $(".item4").animate({
        paddingTop: "25px"
    }, 1400)
    $(".item5").animate({
        paddingTop: "25px"
    }, 1500)
});

// function reset() {
//     if (isOpen == "0px") {
//         console.log("yes");
//         $(".nav ul li").animate({
//             paddingTop: "500px"
//         }, 200)
//     }
//     else {
//         console.log("is closed");
//     }
// }

// ----------------------- start 1 sec-------------------------------------

displayHome()
// home api 
// gitHome()
async function gitHome(code) {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${code}`);
    console.log(x);
    x = await x.json();
    console.log(x);
    return (x)
    // $(".loading-screen").fadeOut(500);
}


async function gitCategory() {
    getData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    getData = await getData.json();
    getData = getData.categories;
    displayCategory()
}

function displayCategory() {
    let cartona = ``;
    for (let i = 0; i < getData.length; i++) {
        cartona += `<div class="col-md-3">
        <div onclick="filterCategory('${getData[i].strCategory}')" class="img1 position-relative">
            <img class="w-100 rounded" src="${getData[i].strCategoryThumb}" alt="food">
            <div class="layer">
                <h3 class="h-category">${getData[i].strCategory}</h3>
                 <p>${getData[i].strCategoryDescription}</p>

            </div>

        </div>
    </div>`
    }
    document.getElementById("rowData").innerHTML = cartona;
}


async function filterCategory(catName) {
    getData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`)
    getData = await getData.json();
    getData = getData.meals;
    displaySearch()
}





async function searchByName(name) {
    x = await gitHome(name)
    getData = x.meals;
    displaySearch();
}

async function searchByLitter(litter) {
    x = await gitHome(litter)
    getData = x.meals;
    displaySearch();
}

async function getItem(idMeal) {
    getData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    getData = await getData.json();
    getData = getData.meals[0];
    console.log(getData);
    displayItem()
}

function displayItem() {
    document.getElementById("rowData").innerHTML = `<div class="col-md-4 myM text-white">
    <img src="${getData.strMealThumb}" alt="pateto" class="w-100">
    <br>
    <h1>${getData.strMeal}</h1>
</div>
<div class="col-md-8 myM text-white text-left">
<h2>Instructions</h2>
  <p>${getData.strInstructions}</p>

<h4 class="title-h "><span class="title-span">Area: </span> ${getData.strArea}</h4>
<h4 class="title-h"><span class="title-span">Category: </span>  ${getData.strCategory} </h4>
<h3>Recipes :</h3>
<button class="btn btn1 "><a target="_blank" class="text-decoration-none text-white" href="${getData.strSource}">Source</a></button>
        <button class="btn btn2"><a target="_blank" class="text-decoration-none text-white" href="${getData.strYoutube}">Youtube</a></button>
</div>
`
}

function displaySearch() {
    let cartona = ``;
    for (let i = 0; i < getData.length; i++) {
        cartona += `<div class="col-md-3">
        <div onclick="getItem(${getData[i].idMeal})"  class="img1 position-relative">
            <img class="w-100 rounded" src="${getData[i].strMealThumb}" alt="food">
            <div class="layer">
                <h3 class="">${getData[i].strMeal}</h3>
            </div>

        </div>
    </div>`
    }
    document.getElementById("rowData").innerHTML = cartona;
}

async function displayHome() {
    x = await gitHome(" ")
    getData = x.meals;
    let cartona = ``;
    for (let i = 0; i < getData.length; i++) {
        cartona += `<div class="col-md-3">
        <div onclick="getItem(${getData[i].idMeal})" class="img1 position-relative">
            <img class="w-100 rounded" src="${getData[i].strMealThumb}" alt="food">
            <div class="layer">
                <h3 class="">${getData[i].strMeal}</h3>
            </div>

        </div>
    </div>`
    }
    document.getElementById("rowData").innerHTML = cartona;
}


// gitHome()
// async function gitHome() {
//     getData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
//     console.log(getData);
//     getData = await getData.json();
//     console.log(getData);
//     getData = getData.meals;
//     console.log(getData);
//     displayHome();
//     // $(".loading-screen").fadeOut(500);
// }




// async function gitCategory() {
//     getData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
//     console.log(getData);
//     getData = await getData.json();
//     console.log(getData);
//     getData = getData.meals;
//     console.log(getData);

//     // $(".loading-screen").fadeOut(500);
// }

let x;
async function getCategories(listBy) {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
    x = await x.json()
    // console.log(x);
    return x;

}

$(".menu a").click(async (e) => {
    let listBy = e.target.getAttribute("data-list")

    // document.getElementById("search-container").innerHTML = ""
    // row.innerHTML = ""

    let searchBox = document.getElementById("search").innerHTML = ``

    if (listBy == "search") {
        document.getElementById("search").innerHTML = `<form class="d-flex">
<div class="col-md-6">
<input type="text" class="form-control" id="searchInput" placeholder="search By Name" > 
</div>
<div class="col-md-6 ps-4">
<input type="text" class="form-control" id="letter" maxlength="1" placeholder="search By First Letter..." >

</div>

</form>`
        document.getElementById("rowData").innerHTML = ``;

        $("#letter").keyup(function (e) {
            searchByName(e.target.value);
        })

        $("#searchInput").keyup(function (e) {
            searchByName(e.target.value);
        })

    }


    else if (listBy == "categories") {
        gitCategory()
    }
    else if (listBy == "a") {
        searchBox = ``
        x = await getCategories("list.php?a=list")
        getData = x.meals.splice(0, 20);
        console.log(getData);
        displayArea()
    }
    else if (listBy == "i") {
        searchBox = ``

        x = await getCategories("list.php?i=list")
        getData = x.meals.splice(0, 20);
        console.log(getData);
        displayIngredients();
    }

    else if (listBy=="contact"){
        document.getElementById("rowData").innerHTML=` <div class=" row  mt-3 p-2" id="rowData">
        <h2 class="text-center text-white mb-5">ContacUs...</h2>
        <div class="col-md-6 myM text-white ">
            <div class="in-1">
                
                <input type="text" class="form-control" id="searchInput" placeholder="Enter Your Name">
                <input type="text" class="form-control" id="searchInput" placeholder="Enter Your phone">
                <input type="text" class="form-control" id="searchInput" placeholder="Enter Your password">
            </div>
        </div>
            <div class="col-md-6 myM text-white ">
                <input type="text" class="form-control" id="searchInput" placeholder="Enter Mail">
                <input type="text" class="form-control" id="searchInput" placeholder="Enter Age">
                <input type="text" class="form-control" id="searchInput" placeholder="Enter Repassword">
            </div>
        
            <button class="btn btn-3 ">submit</button>
    </div>`
    }
})

function displayArea() {
    let cartona = ``;

    for (let i = 0; i < getData.length; i++) {
        cartona += ` 
        <div class="col-md-3">
                    <div class="area">
                        <i class="fa-solid fa-city fa-3x"></i>
                        <h2>${getData[i].strArea}</h2>
                    </div>
                </div>`

    }

    document.getElementById("rowData").innerHTML = cartona;
}

function displayIngredients() {
    let cartona = ``;
    for (let i = 0; i < getData.length; i++) {
        cartona += `<div class="col-md-3">
        <div class="area">
            <i class="fa-solid fa-bowl-food fa-3x"></i>
            <h2>${getData[i].strIngredient}</h2>
            <p>${getData[i].strDescription.split(" ").splice(0, 20).join(" ")}</p>
        </div>
    </div>`

    }
    document.getElementById("rowData").innerHTML = cartona;

}
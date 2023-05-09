const str = new URL(document.location) ;
 const url = str.searchParams ;
 /**
  * le nom de la variables est mis dans fetch("blablabla/"+ nom variable)
  * le "id" est mis avec ?id=  ; avec le href="blabla.bla?id="+...
  */
 const addMeInFetchId = url.get("id") 
//Get with FETCH (Function Async with await and catch error)
const generalFunction = async () => {
    //Trouve pas le serveur modifiez entre http://localhost:3000
    const response = await fetch("http://localhost:3000/api/products/"+addMeInFetchId)
        .catch((error) => { console.log('Error of server:', error) })
    const data = await response.json()
    //erreur apres (" api/products ")
        .catch((error) => { console.log("Erreur : Impossible de récupérer les produits", error) })
        genererProduct(data)
    return data; 
}
generalFunction() 


function genererProduct(data){
    //creation balise et recuperation du parent
    const parentOfImgElement = document.querySelector(".item__img");
    const imageElement = document.createElement("img");
    imageElement.src = data.imageUrl ; 
    //Je rattache directement car c est le seul
    parentOfImgElement.appendChild(imageElement);
    //ajouts  automatique de contenu textuel nom
    const nameElement = document.querySelector(".item__content__titlePrice h1"); 
    nameElement.innerText = data.name ;
    //ajouts  automatique de contenu textuel prix
    const priceElement = document.querySelector("#price");
    priceElement.innerText =  data.price  ;
    //ajouts  automatique de contenu textuel description
    const descriptionElement = document.querySelector("#description");
    descriptionElement.innerText = data.description ;
    //recuperation <select>
    let parentColorsOption = document.querySelector("select");
    /**
    * je boucle puisque le nombre d option dans le <select> ne sont pas semblables
    */
    for (let i = 0; i < data["colors"].length; i++){
        //je recupere le parent la balise <select> et je mets les <option>
        //let parentColorsOption = document.querySelector("select");
        //juste plus clair pour moi
        const colorSelect = data["colors"][i];
        ////creation <option> et son attribut
        const optionElement = document.createElement("option");
        optionElement.innerText = colorSelect;
        optionElement.setAttribute("value",colorSelect)
        //Je rattache les options a <seclect>
        parentColorsOption.appendChild(optionElement);
        } 

    console.log(parentColorsOption)// Savoir si en declarant hors sa sera pareille
    const buttonPanier = document.querySelector("#addToCart"); 
    whileCickEvent(buttonPanier,data,parentColorsOption)
}


// function activant l addEvenListener click du bouton ajouter au panier
function whileCickEvent(buttonPanier,data,parentColorsOption){
    /**
    * au click sur ajouter panier 
    * Tes donnees inscrits ou selectionne seront  stocker en local
    */
    buttonPanier.addEventListener("click",(event)=>{
        // recuperer le input 
        const inputElement = document.querySelector("input");
        //information dont on veut/besoin de stocker
        let createDataObj = {
            id_product :  data._id,
            colorSelect:  parentColorsOption.value ,
            numberSelect:  inputElement.value   
        } 
        /**
        * colorSelect est un select avec des options a choisir
        * le if demande que si il y a pas de choix donc value=vide
        * envoyez alerte decrivant quoi faire
        */
        if (createDataObj.colorSelect == ""){
            event.preventDefault()
            alert("Veuillez choisir en cliqueant sur une couleur")
            return
        }
        /**
        * number est input 
        * je demande a ceux qu il y est que des chiffres entre 1-100
        */
        if(createDataObj.numberSelect < 1 || createDataObj.numberSelect >= 100 || createDataObj.numberSelect != parseInt(createDataObj.numberSelect)){
            event.preventDefault()
            alert("veuillez mettre un nombre superieur a 0 et inferieur a 100 et pas de lettre svp")
            return
        }
        //va rechercher une certaine donnee ("obj") puis parse pour que l object soit lisible
        let storageData = JSON.parse(localStorage.getItem("obj")) 
        //quand l id et la couleur sont pareille on augmente la quantite
        if(storageData){    
            let existanceJsonAchatUser = storageData.find(element =>  element.id_product == createDataObj.id_product && element.colorSelect == createDataObj.colorSelect )          
            if (existanceJsonAchatUser != undefined){
                let nouvellQt = parseInt(existanceJsonAchatUser.numberSelect) + parseInt(createDataObj.numberSelect)
                existanceJsonAchatUser.numberSelect = nouvellQt 
                localStorage.setItem("obj",JSON.stringify(storageData))
            }   
            //Sinon on cree juste un nouveau artcicle          
            else{
                storageData.push(createDataObj);
                localStorage.setItem("obj",JSON.stringify(storageData))
            }     
        }
         /**
        * Si le storage n est pas true donc vide
        */
        else{ 
            let storageData = [] ;
            storageData.push(createDataObj)
            localStorage.setItem("obj",JSON.stringify(storageData))
        } 
    })
}
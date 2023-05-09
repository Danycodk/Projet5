// Other way i could use GET FETCH ------------------SCRIPT.js--------------


// Bad cause no asynchrone method and no catch error too (FETCH GET)
const reponse = await fetch ("http://localhost:3000/api/products");
const products = await reponse.json();
console.log(products)

//Perfect ! got asynch and error
const getProduit = async () => {
    //Trouve pas le serveur modifiez entre http://localhost:3000
    const response = await fetch("http://localhost:3000/api/products")
        .catch((error) => { console.log('Error of server:', error) })
    const data = await response.json()
    //erreur apres (" api/products ")
        .catch((error) => { console.log("Erreur : Impossible de récupérer les produits", error) })
        generateurProduits(data)
    return data; 
}
getProduit()

// .then  asynch
const P1 = fetch("http://localhost:3000/api/products") 
P1
    .then(function getInTheThen(response)  {
        let urlGetProductJson = response.json()
        urlGetProductJson.then(function getInTheThenData(data){
            generateurProduits(data)
            return data    
        }) 
    } ) 
    .catch((err)=>{
        console.log(err + "desole erreur")
    })/////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    fetch("http://localhost:3000/api/products") 
    .then( (response) => {
        //let urlGetProductJson =
         return response.json() // TRES IMPORTANT LE RETURN
    } )    
    .then( (data)=>{
        console.log(data)
        return data    
    }) 
    .catch((err)=>{
        console.log(err + "desole erreur")
    })
//----------------------------------------------------------------------//
//------------Other way i could use GET FETCH ----------PRODUCT.js-----//
//--------------------------------------------------------------------//

//--------------------First---------------
const strProduct = new URL(document.location) ;
const urlProduct = strProduct.searchParams ;
const id = urlProduct.get("id")

const reponseProduct = await fetch("http://localhost:3000/api/products/"+id); 
const productUnSeul = await reponseProduct.json();
console.log(productUnSeul)

//---------------------Second-----------
const str = new URL(document.location) ;
 const url = str.searchParams ;
 const addMeInFetchId = url.get("id") 
const P1Product = fetch("http://localhost:3000/api/products/"+addMeInFetchId) 
P1Product
    .then((response) => {
        let urlGetProductJson = response.json()
        urlGetProductJson.then((data)=>{    
            genererProduitSelectionne(data);   
        })
    })
    .catch((err)=>{
        console.log(err)
    })

//----------------------------------------------------------------------//
//------------Other way i could use GET FETCH ----------CART.js--------//
//--------------------------------------------------------------------//

const getProduitCart = async (produit) => {
    //Trouve pas le serveur modifiez entre http://localhost:3000
    const response = await fetch("http://localhost:3000/api/products/"+produit.id_product)
        .catch((error) => { console.log('Error of server:', error) })
    const data = await response.json()
    //erreur apres (" api/products ")
        .catch((error) => { console.log("Erreur : Impossible de récupérer les produits", error) })
        const totalAllQuantityTimeAllPrice = document.querySelector("#firstName")
        let prixTotal = 0
        //prixTotal += calculeTotal(produit.numberSelect,data.price)
        //let allPrice = Array.from(prixTotal)
      //  let variablesOfMyFucn =[imgElement,nameElement,prixElement,prixTotal,data]
        //generateurProduits(data,produit)
//    return variablesOfMyFucn; 
}
getProduitCart(produit)
let storageDataInCart = JSON.parse(localStorage.getItem("obj"));
function genererStokageData(storageDataInCart){
    //let prixTotal = 0
    for(let i = 0 ; i < storageDataInCart.length ; i++){
        const produit = storageDataInCart[i] ;
       // getProduitCart(produit)
        /*
        const P1 = fetch("http://localhost:3000/api/products/"+produit.id_product) 
        P1
            .then((response) => {
                let urlGetProductJson = response.json()
                urlGetProductJson.then((data)=>{
                    imgElement.src = data.imageUrl
                    imgElement.setAttribute("alt",data.altTxt)
                    nameElement.innerText = data.name
                    prixElement.innerText = data.price  
                    const totalAllQuantityTimeAllPrice = document.querySelector("#firstName")
                    let prixTotal = 0
                    prixTotal += calculeTotal(produit.numberSelect,data.price)
                    let allPrice = Array.from(prixTotal)
                    console.log(allPrice)
                })
            })
    .catch((err)=>{
        console.log(err)
    })  */
        //Recuperation du parent qui tous les article(S)
        const sectionElement = document.querySelector("#cart__items") ;
        //Balise <article> qui acceuillera deux enfants <div>
        const articleElement = document.createElement("article") ; 
        articleElement.setAttribute("class","cart__item")
        //Balisse <div> contenant img
        const firstDivElement = document.createElement("div") 
        firstDivElement.setAttribute("class","cart__item__img")
        //Balise <img>
        const imgElement = document.createElement("img") 
        imgElement.src = data.imageUrl
        imgElement.setAttribute("alt",data.altTxt)
        // <div> contenant setting_description et setting_
        const secondDivElement = document.createElement("div")  
        secondDivElement.setAttribute("class","cart__item__content")
        //<div> contenant les settings_quality (nom produit,couleurs,prix)
        const divDescriptionElement = document.createElement("div") 
        divDescriptionElement.setAttribute("class","cart__item__content__description")
        // <h2> contenant le nom du produit
        const nameElement = document.createElement("h2"); 
        nameElement.innerText = data.name
        prixElement.innerText = data.price  
        //<p> conttenant la couleur 
        const colorsElement = document.createElement("p") 
        colorsElement.innerText = produit.colorSelect 
        //<p> conttenant le prix 
        const prixElement = document.createElement("p") ; 
        prixElement.innerText = produit.price 
        //<div> contenant les settings 
        const divSettingElement = document.createElement("div") 
        divSettingElement.setAttribute("class","cart__item__content__settings")
        // <div> div contenant settings_quantity
        const divSettingQuantity = document.createElement("div") 
        divSettingQuantity.setAttribute("class","cart__item__content__settings__quantity")
        // <p> tetxt quantite 
        const textquantiteElement = document.createElement("p")
        textquantiteElement.innerText = "Qte :"
         // <input> nombre de quantity 
        const inputElement = document.createElement("input")
        inputElement.setAttribute("type","number")
        inputElement.setAttribute("class","itemQuantity")
        inputElement.setAttribute("name","itemQuantity")
        inputElement.setAttribute("min","1")
        inputElement.setAttribute("max","100")
        inputElement.setAttribute("value",produit.numberSelect)
        inputElement.addEventListener("change",(e)=>{ 
            // inputElement.setAttribute("value",packProduct.numberSelect
            produit.numberSelect = inputElement.value
            localStorage.setItem("obj",JSON.stringify(storageDataInCart));         
        })
        // <div> settings__delete
        const divSupprimerElement = document.createElement("div") 
        divSupprimerElement.setAttribute("class","cart__item__content__settings__delete")
        const supprssionElement = document.createElement("p")// surrement le button supprimer
        supprssionElement.setAttribute("class","deleteItem");
        supprssionElement.innerText = "supprimer" ;
        supprssionElement.addEventListener("click",()=>{
            //window.localStorage.removeItem("obj");
            //localStorage.setItem("obj",JSON.stringify(testPackProduct));
            //sectionElement.innerHTML = "";
            //genererStokageData(storageDataInCart)
            delete localStorage.storageDataInCart //Marche super bien ne pas oublier de reenregistrer
            //localStorage.removeItem('storageDataInCart');
            localStorage.setItem("obj",JSON.stringify(testPackProduct));
            /////////////////////////////////////////////////////////
            /////////autre maniere deleste//////////////////////////
            testPackProduct.splice(packProduct,1)
            localStorage.removeItem(testPackProduct)
            localStorage.setItem("obj",JSON.stringify(testPackProduct));
            sectionElement.innerHTML = "";
            generchoixProduct(testPackProduct)
        })
        // console.log(total)
//console.log(produit.numberSelect)
//console.log(data.price)
        sectionElement.appendChild(articleElement);// deux enfants
        articleElement.appendChild(firstDivElement);
        firstDivElement.appendChild(imgElement);
        articleElement.appendChild(secondDivElement)
        secondDivElement.appendChild(divDescriptionElement)
        divDescriptionElement.appendChild(nameElement)
        divDescriptionElement.appendChild(colorsElement)
        divDescriptionElement.appendChild(prixElement)
        secondDivElement.appendChild(divSettingElement)
        divSettingElement.appendChild(divSettingQuantity)
        divSettingQuantity.appendChild(textquantiteElement)
        divSettingQuantity.appendChild(inputElement)
        divSettingElement.appendChild(divSupprimerElement)
        divSupprimerElement.appendChild(supprssionElement)
        //prixTotal += calculeTotal(produit.numberSelect,data.price)
        //console.log(produit.numberSelect)  
    //console.log(data)
    getProduitCart(produit)
    }
}
genererStokageData(storageDataInCart)
function genererForm(){
    const formElement = document.querySelector(".cart__order__form")
    const btnOrder = document.querySelector("#order")
   // console.log(formElement[0].value)
    btnOrder.addEventListener("click",()=>{
        //calcule prix * quantity   
})
}
genererForm()


/////////////////////////////////////////////////////////////////////
/////////////Deuxieme methode originale/////////////////////////////
///////////////////////////////////////////////////////////////////////



const url = "http://localhost:3000/api/products/"
let storageDataInCart = JSON.parse(localStorage.getItem("obj"));
let totalPriceAndQty = 0
const inputElementAll = document.getElementsByClassName("itemQuantity")  
//console.log(storageDataInCart)
function genererCodeHtml(produit,data,storageDataInCart,i){
    //console.log(produit)
    //console.log(data)
    //Recuperation du parent qui tous les article(S)
    const sectionElement = document.querySelector("#cart__items") ;
    //Balise <article> qui acceuillera deux enfants <div>
    const articleElement = document.createElement("article") ; 
    articleElement.setAttribute('data-id', data._id);
    
    articleElement.setAttribute('data-color', produit.colorSelect);
    articleElement.setAttribute("class","cart__item")

    //Balisse <div> contenant img
    const firstDivElement = document.createElement("div") 
    firstDivElement.setAttribute("class","cart__item__img")
    //Balise <img>
    const imgElement = document.createElement("img") 
    imgElement.src = data.imageUrl
    imgElement.setAttribute("alt",data.altTxt)
    // <div> contenant setting_description et setting_
    const secondDivElement = document.createElement("div")  
    secondDivElement.setAttribute("class","cart__item__content")
        
    //<div> contenant les settings_quality (nom produit,couleurs,prix)
    const divDescriptionElement = document.createElement("div") 
    divDescriptionElement.setAttribute("class","cart__item__content__description")
    // <h2> contenant le nom du produit
    const nameElement = document.createElement("h2");

    nameElement.innerText = data.name
    //prixElement.innerText = data.price  
    //<p> conttenant la couleur 
    const colorsElement = document.createElement("p") 
    colorsElement.innerText = produit.colorSelect 
    //<p> conttenant le prix 
    const prixElement = document.createElement("p") ; 
    prixElement.innerText = data.price  

    //<div> contenant les settings 
    const divSettingElement = document.createElement("div") 
    divSettingElement.setAttribute("class","cart__item__content__settings")
    // <div> div contenant settings_quantity
    const divSettingQuantity = document.createElement("div") 
    divSettingQuantity.setAttribute("class","cart__item__content__settings__quantity")
    // <p> tetxt quantite 
    const textquantiteElement = document.createElement("p")
    textquantiteElement.innerText = "Qte :"
    // <input> nombre de quantity 
    const inputElement = document.createElement("input")  
    // <div> settings__delete
    const divSupprimerElement = document.createElement("div") 
    divSupprimerElement.setAttribute("class","cart__item__content__settings__delete")
    const supprssionElement = document.createElement("p")// surrement le button supprimer   

    
    inputElement.setAttribute("type","number")
    inputElement.setAttribute("class","itemQuantity")
    inputElement.setAttribute("name","itemQuantity")
    inputElement.setAttribute("min","1")
    inputElement.setAttribute("max","100")
    inputElement.setAttribute("value",produit.numberSelect)
    //getElement un tableau

    //deletedProduct(produit,data,supprssionElement,sectionElement,storageDataInCart,i)
    sectionElement.appendChild(articleElement);// deux enfants

    articleElement.appendChild(firstDivElement);
    firstDivElement.appendChild(imgElement);
    //console.log(imgElement)
    articleElement.appendChild(secondDivElement)
    secondDivElement.appendChild(divDescriptionElement)
    divDescriptionElement.appendChild(nameElement)
    divDescriptionElement.appendChild(colorsElement)
    divDescriptionElement.appendChild(prixElement)

    secondDivElement.appendChild(divSettingElement)
    divSettingElement.appendChild(divSettingQuantity)
    divSettingQuantity.appendChild(textquantiteElement)
    divSettingQuantity.appendChild(inputElement)

    divSettingElement.appendChild(divSupprimerElement)
    divSupprimerElement.appendChild(supprssionElement)
} 


function calculTotalPriceAndQty(produit,data){
     totalPriceAndQty+= parseInt(data.price) * parseInt(produit.numberSelect)
    //console.log(totalPriceAndQty)
    const totalPriceElement = document.querySelector("#totalPrice")
    totalPriceElement.innerText = totalPriceAndQty
    //console.log(totalPriceAndQty)
}

function ChangementQty(produit){//   secondDivElement,divSettingElement,divSettingQuantity,textquantiteElement,inputElement){
/*
    inputElement.setAttribute("type","number")
    inputElement.setAttribute("class","itemQuantity")
    inputElement.setAttribute("name","itemQuantity")
    inputElement.setAttribute("min","1")
    inputElement.setAttribute("max","100")
    inputElement.setAttribute("value",produit.numberSelect) */
    //getElement un tableau
  
    //console.log(inputElementAll)
    console.log(produit)
    for (let i=0 ; i < inputElementAll.length; i++){
        
        let specifiqueInputElementAll= inputElementAll[i]
        specifiqueInputElementAll.addEventListener("change",()=>{ 
            
            let IdOfQuantitysArticle = specifiqueInputElementAll.closest('article').getAttribute('data-id');
            let ColorOfQuantitysArticle = specifiqueInputElementAll.closest('article').getAttribute('data-color');
            let changedQuantity = specifiqueInputElementAll.valueAsNumber;
            //console.log(IdOfQuantitysArticle)
            
            let findProduct = storageDataInCart.find((produit) => produit.id_product==IdOfQuantitysArticle && produit.numberSelect !== changedQuantity && produit.colorSelect==ColorOfQuantitysArticle);
            //console.log(findProduct)
            findProduct.numberSelect = changedQuantity;
            
            //originalQuantity = changedQuantity;
            // inputElement.setAttribute("value",packProduct.numberSelect
            //produit.numberSelect = inputElement.value
           
            localStorage.setItem("obj",JSON.stringify(storageDataInCart));
            //calculTotalPriceAndQty(produit,data)
            //sans window.location s il y vait 5 tu mets 6 et le prix etait 1000$
            //il aurait fait 6* 1000 au lieu +1000$
            window.location.reload()
        }) 
        /////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////

    }

     /*
    for (let i = 0; i < inputElement.length; i++) {
        let itemQuantityInput = inputElement[i]
        //console.log(itemQuantityInput)
        itemQuantityInput.addEventListener('change', () => {
           

            let IdOfQuantitysArticle = itemQuantityInput.closest('article').getAttribute('data-id');
            let ColorOfQuantitysArticle = itemQuantityInput.closest('article').getAttribute('data-color');
            let changedQuantity = itemQuantityInput.value;
            let findProduct = storageDataInCart.find((el) => el.id==IdOfQuantitysArticle && el.numberSelect !== changedQuantity && el.color==ColorOfQuantitysArticle);
            findProduct.quantity = changedQuantity;
            /*
            originalQuantity = changedQuantity;
            if (changedQuantity> 100 || changedQuantity <= 0 || changedQuantity != parseInt(changedQuantity)) {
                alert("Merci de bien vouloir sélectionner une quantité comprise entre 1 et 100.");
                return changedQuantity == undefined;
            } 
            localStorage.setItem('obj', JSON.stringify(storageDataInCart));
            window.location.reload()
        })
    } */
}

//supprimer un produit

(async function generale(){
    //si le panier est vide
    if (storageDataInCart == 0 || !storageDataInCart ){
        // creer quelque chose pour montrer que c est vide
    }
    else{
        for(let i= 0; i < storageDataInCart.length; i++){
            let produit = storageDataInCart[i]
            const response =   await fetch (url+produit.id_product)
            .catch((error) => { console.log('Error of server:', error) })
            const data = await response.json()
            //erreur apres (" api/products ")
            .catch((error) => { console.log("Erreur : Impossible de récupérer les produits", error) })
            genererCodeHtml(produit,data,storageDataInCart,i)
            calculTotalPriceAndQty(produit,data)
            ChangementQty(produit)
        }
        
    }
})() 

//
const formElement = document.querySelector(".cart__order__form") // console.log(formElement[0].value)
const firstNameElement = document.querySelector("#firstName")//formElement[0]
const lastNameElement = document.querySelector("#lastName")
const addressElement = document.querySelector("#address")
const cityElement = document.querySelector("#city")
const emailElement = document.querySelector("#email")
const btnOrder = document.querySelector("#order")
function genererForm(){
    btnOrder.addEventListener("click",(ev)=>{

        ev.preventDefault();
        
        if(conditionFormValues()==false){
            return 
        }
        if(storageDataInCart != null   ){  

            let contactFormValue ={
                firstName: firstNameElement.value,
                lastName:lastNameElement.value,
                address:addressElement.value,
                city:cityElement.value,
                email:emailElement.value
            }
           
                let produitIdentifications =[]
                for (let produitForm of storageDataInCart) {
                    produitIdentifications.push(produitForm.id_product)
                    //console.log(produitIdentifications)
                }
                let order = JSON.stringify({
                    contact: contactFormValue,
                    products: produitIdentifications
                })
                
                //JSON.stringify(order)
                //console.log(order)
                fetch(url + "order", {
                    method: 'POST',
                    body:order,
                    headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json',
                    },
                })
                .then(res =>
                    res.json()
                )
                .then((data) => {
                    localStorage.clear();
                    let orderId = data.orderId;
                    document.location.href = "./confirmation.html?order=" + orderId;
                    //console.log(data)
                })
                .catch(error => console.log('error', error));
            //}
        }

        else{
            console.log("yooo")
        }
        
    })
}
    

    //console.log(produit)
//}
genererForm()

function conditionFormValues(){
    let regexPenomAndNom= /^[a-z ,.'-]+$/i
    let regexAdress = /(([a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ'.]*\s)\d*(\s[a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ']*)*,)*\d*(\s[a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ']*)+,\s([\d]{5})\s[a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ']+/

    let regexCity = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
    let regexEmail = /^\S+@\S+\.\S+$/
    const wrongFirstNameElement = document.querySelector("#firstNameErrorMsg")
    const wrongLastNameElement = document.querySelector("#lastNameErrorMsg")
    const wrongAddressElement = document.querySelector("#addressErrorMsg")
    const wrongCityElement = document.querySelector("#cityErrorMsg")
    const wrongEmailElement = document.querySelector("#emailErrorMsg")
//alert("nopeeeeeeeee")
    if(regexPenomAndNom.test(firstNameElement.value)==false||firstNameElement.value == "" ){
        //ev.preventDefault()
        wrongFirstNameElement.innerText="erreur veuillez mettre une reponse valise"
        console.log("desole FirstName n est pas bopn")
        return false
    }
    else{      
        wrongFirstNameElement.innerText=""
    }
     if(regexPenomAndNom.test(lastNameElement.value)==false||lastNameElement.value == "" ){
        //ev.preventDefault()
        wrongLastNameElement.innerText="erreur veuillez mettre une reponse valise"
        console.log("desole lastNamme n est pas bopn")
        return false
    }
    else{
        
        wrongLastNameElement.innerText=""
    }
     if(regexAdress.test(addressElement.value)== false||addressElement.value == "" ){
        //177 Rue de Versailles, 78150 Le Chesnay-Rocquencourt, France
        //ev.preventDefault()
      
        wrongAddressElement.innerText="erreur veuillez mettre une reponse valise"
        console.log("desole L adress n est pas bopn")
        return false
    }
    else{
        
        wrongAddressElement.innerText=""
    }
     if(regexCity.test(cityElement.value)==false||cityElement.value == "" ){
        //ev.preventDefault()
        console.log("desole city n est pas bopn")
        return
    }
    else{
        
        wrongCityElement.innerText=""
    }
     if(regexEmail.test(emailElement.value)==false||emailElement.value == "" ){
        //ev.preventDefault()
       
        wrongEmailElement.innerText="erreur veuillez mettre une reponse valise"
        console.log("desole Email n est pas bopn")
        return false
    }
    else{
      
    wrongEmailElement.innerText=""
    }
    //else
    //window.location.href = './confirmation.html'
     
}











































/*


    cartArticle.setAttribute('data-id', product._id); Ici c est Data
    cartArticle.setAttribute('data-color', kanap.color); Le localStorage

    const changementQuantity = (kanap) => {
        for (let i = 0; i < itemsQuantityInput.length; i++) {
            let itemQuantityInput = itemsQuantityInput[i]
            itemQuantityInput.addEventListener('change', () => {
                let IdOfQuantitysArticle = itemQuantityInput.closest('article').getAttribute('data-id');
                let ColorOfQuantitysArticle = itemQuantityInput.closest('article').getAttribute('data-color');
                let changedQuantity = itemQuantityInput.valueAsNumber;
                let findProduct = tableauKanap.find((kanap) => kanap.id==IdOfQuantitysArticle && kanap.originalQuantity !== changedQuantity && kanap.color==ColorOfQuantitysArticle);
                findProduct.quantity = changedQuantity;
                
                originalQuantity = changedQuantity;
                if (changedQuantity> 100 || changedQuantity <= 0 || changedQuantity != parseInt(changedQuantity)) {
                    alert("Merci de bien vouloir sélectionner une quantité comprise entre 1 et 100.");
                    return changedQuantity == undefined;
                } 
                localStorage.setItem('listOfProduct', JSON.stringify(tableauKanap));
                window.location.reload()
            })
        }
    }


    //----------------------------------------------------------------
    envoiFormulaire = () => {
        let form = document.querySelector(".cart__order__form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (tableauKanap != null) {
                // On crée un tableau de produits
                let products = [];
                for (let listOfProduct of tableauKanap) {
                    products.push(listOfProduct.id)
                }
                // On crée un objet avec les champs saisis dans le formulaire
                let contact = {
                    'firstName': document.getElementById('firstName').value,
                    'lastName': document.getElementById('lastName').value,
                    'address': document.getElementById('address').value,
                    'city': document.getElementById('city').value,
                    'email': document.getElementById('email').value,
                };
                // On crée un objet qui contient le contact et la liste de produits du panier
                let order = JSON.stringify({
                    contact: contact,
                    products: products,
                });
                
                fetch(url + "order", {
                    method: 'POST',
                    body: order,
                    headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json',
                    },
                })
                .then(res =>
                    res.json()
                )
                .then((data) => {
                    localStorage.clear();
                    let orderId = data.orderId;
                    document.location.href = "./confirmation.html?order=" + orderId;
                })
                .catch(error => console.log('error', error));
            } else {
                alert("Erreur lors de la commande. Merci de vérifier votre panier.");
                return
            }
        })
    }
    */
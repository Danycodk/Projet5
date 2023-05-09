//Declaration de l url page
const url = "http://localhost:3000/api/products/"
let storageDataInCart = JSON.parse(localStorage.getItem("obj"));
let totalPriceAndQty = 0
const inputElementAll = document.getElementsByClassName("itemQuantity")  
const supprssionElementAll = document.getElementsByClassName("deleteItem")
const numberAritcleSelect = document.querySelector("#totalQuantity")
numberAritcleSelect.innerText= storageDataInCart.length
//console.log(storageDataInCart)
function genererCodeHtml(produit,data){//,storageDataInCart,i

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
    inputElement.setAttribute("type","number")
    inputElement.setAttribute("class","itemQuantity")
    inputElement.setAttribute("name","itemQuantity")
    inputElement.setAttribute("min","1")
    inputElement.setAttribute("max","100")
    inputElement.setAttribute("value",produit.numberSelect)
    // <div> settings__delete
    const divSupprimerElement = document.createElement("div") 
    divSupprimerElement.setAttribute("class","cart__item__content__settings__delete")
    const supprssionElement = document.createElement("p")// surrement le button supprimer   
    supprssionElement.setAttribute("class","deleteItem");
    supprssionElement.innerText = "supprimer" ;

    //Rattachement des des balises creer
    sectionElement.appendChild(articleElement);

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

} 
// on multiplie le prix fois la quantite de chaque article puis ces resultats s additionnent
function calculTotalPriceAndQty(produit,data){
     totalPriceAndQty+= parseInt(data.price) * parseInt(produit.numberSelect)
    const totalPriceElement = document.querySelector("#totalPrice")
    totalPriceElement.innerText = totalPriceAndQty
}
// supprimer l article sur laquelle la souris est le plus proche, puis soustrait du total
function deleteArticle(){//produit
    const sectionElement = document.querySelector("#cart__items") ;
    const articleElement = document.createElement("article") ; 
for(let i=0;i< supprssionElementAll.length; i++){
    let specifiqueSuppresionElementAll= supprssionElementAll[i]
    specifiqueSuppresionElementAll.addEventListener("click",()=>{
        let IdOfSupprssionEsArticle = specifiqueSuppresionElementAll.closest('article').getAttribute('data-id');
        let ColorOfSupprssionEArticle = specifiqueSuppresionElementAll.closest('article').getAttribute('data-color');
         
        let findProduct = storageDataInCart.find((produit) => produit.id_product===IdOfSupprssionEsArticle && produit.colorSelect===ColorOfSupprssionEArticle);
        if(findProduct){
            storageDataInCart.splice(findProduct,1)
            //localStorage.removeItem(findProduct)
            localStorage.setItem("obj",JSON.stringify(storageDataInCart));
            window.location.reload()
            console.log(findProduct) 
        }
    })
}
}
// mise a jour de la quantite de l article modifier, puis du prix total
function ChangementQty(){//produit
    //getElement un tableau
    for (let i=0 ; i < inputElementAll.length; i++){
        
        let specifiqueInputElementAll= inputElementAll[i]
        specifiqueInputElementAll.addEventListener("change",()=>{       
            let IdOfQuantitysArticle = specifiqueInputElementAll.closest('article').getAttribute('data-id');
            let ColorOfQuantitysArticle = specifiqueInputElementAll.closest('article').getAttribute('data-color');
            let changedQuantity = specifiqueInputElementAll.valueAsNumber;
            
            let findProduct = storageDataInCart.find((produit) => produit.id_product==IdOfQuantitysArticle && produit.numberSelect !== changedQuantity && produit.colorSelect==ColorOfQuantitysArticle);
            
            findProduct.numberSelect = changedQuantity;      
            /**
             * number est input 
             * je demande a ceux qu il y est que des chiffres entre 1-100
             */
            if(findProduct.numberSelect < 1 || findProduct.numberSelect >= 100 || findProduct.numberSelect != parseInt(findProduct.numberSelect)){
                alert("veuillez mettre un nombre superieur a 0 et inferieur a 100 et pas de lettre svp")
                return
            } 
            localStorage.setItem("obj",JSON.stringify(storageDataInCart));
            window.location.reload()
        }) 
    }
}

//La function generale si le panier n est pas vide 
//donne acces a (DATA et PRODUIT) aux function qui ont 
//puis ses actives
(async function generale(){
    //si le panier est vide(apparition d un message indiquant de d acheter un article)
    if (storageDataInCart == 0 || !storageDataInCart ){
        // creer quelque chose pour montrer que c est vide
        const nextToH1Baise= document.querySelector(".cartAndFormContainer h1")
        const emptyCart = document.createElement("p")
        emptyCart.innerText="Veuillez Ajouter des articles"
        emptyCart.style.color = "#FF0000"
        nextToH1Baise.appendChild(emptyCart)
        return
    }
    else{
        for(let i= 0; i < storageDataInCart.length; i++){
            let produit = storageDataInCart[i]
            const response =   await fetch (url+produit.id_product)
            .catch((error) => { console.log('Error of server:', error) })
            const data = await response.json()
            //erreur apres (" api/products ")
            .catch((error) => { console.log("Erreur : Impossible de récupérer les produits", error) })
            genererCodeHtml(produit,data)
            calculTotalPriceAndQty(produit,data)
            ChangementQty()
            deleteArticle()
        }        
    }
})() 
// Recuperation de Form et ses inputs
const formElement = document.querySelector(".cart__order__form") 
const firstNameElement = document.querySelector("#firstName");
const lastNameElement = document.querySelector("#lastName")
const addressElement = document.querySelector("#address")
const cityElement = document.querySelector("#city")
const emailElement = document.querySelector("#email")
const btnOrder = document.querySelector("#order")
/**
 * Si panier pas vide
 * stockages de l object contact et id_product
 * Envoie via une demande Post vers le Server
 * Puis redirection vers la page confirmation
 */
function genererForm(){
    btnOrder.addEventListener("click",(ev)=>{
        //empecher le reload direct
        ev.preventDefault();
        if (storageDataInCart == 0 || !storageDataInCart ){
            return
        }
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
            }
            let order = JSON.stringify({
                contact: contactFormValue,
                products: produitIdentifications
            })
                
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
        }      
    })
}
    
genererForm()
/**
 * Tesst de chaque input de la balise form avec des regex pour chacun
 * Message de text en d irespect des regex 
 */
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
//Get with FETCH (Function Async with await and catch error)
const generalFunction = async () => {
    //Trouve pas le serveur modifiez entre http://localhost:3000
    const response = await fetch("http://localhost:3000/api/products")
        .catch((error) => { console.log('Error of server:', error) })
    const data = await response.json()
    //erreur apres (" api/products ")
        .catch((error) => { console.log("Erreur : Impossible de récupérer les produits", error) })
        genererProduct(data)
    return data; 
}
generalFunction() 

function genererProduct(data){
    /**
    * Cette boucle automatisera la creation de tous les produits
    * cree l image d un premier product faciletera celle de futur produits
    */
    for(let product of data){
        //Je recupere le parent qui aceuillera les enfants crees
        const sectionItem = document.querySelector(".items");
        // cree un lien qui envera au click sur un produit vers la page product
        const linkElement = document.createElement("a")
        linkElement.href = "./product.html?id="+product._id // Url searchparametre regarder la ligne 1 de product.js
        //La balise qui determine Un PRODUIT
        const articleElement= document.createElement("article");
        // Création des autres balises informatif/descriptif  du Produit
        const nameElement = document.createElement("h3")
        nameElement.innerText += product.name ;
        //IMG
        const imageElement = document.createElement("img")
        imageElement.src= product.imageUrl 
        imageElement.setAttribute("alt",product.altTxt);
        //paragraphe descriptif
        const descriptionElement= document.createElement("p")
        descriptionElement.innerText += product.description;


        
        displayBalises(sectionItem,linkElement,articleElement,nameElement,imageElement,descriptionElement)
     
    }
}
// affiche les balises graces aux append()
function displayBalises(sectionItem,linkElement,articleElement,nameElement,imageElement,descriptionElement){
    //Je rattache les enfants aux parents
    sectionItem.append(linkElement);
    linkElement.append(articleElement);
    articleElement.append(nameElement,imageElement,descriptionElement);


}

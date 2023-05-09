const str = new URL(document.location) ;
 const url = str.searchParams ;
 /**
  * le nom de la variables est mis dans fetch("blablabla/"+ nom variable)
  * le "id" est mis avec ?id=  ; avec le href="blabla.bla?id="+...
  */ 
 //addMeInFetchId (= orderId) est numero aleatoire code dans le back end 
 const addMeInFetchId = url.get("order")  

document.querySelector("#orderId").innerText = addMeInFetchId
 const burger=document.querySelector('.burger');
   const lienav=document.querySelector('.nav-menu')
 

   
    const images=document.querySelector("#slides img");
    if(burger && lienav){
        burger.addEventListener('click',()=>{
            lienav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        })

    }
   
    /*function changer() {
      images.forEach(img=>img.classList.remove('active'));
      images[index].classList.classList.add('active');
      index=(index+1)% images.length;
    }*/
   /* changer();
    setInterval(changer,5000);*/

    //PANIER
let panier =[];
let total=0;
      function ajouter(nom,prix,btn){
        if(btn.textContent==="Visitez votre panier"){
          window.location.href="#panier";
          return;
        }
alert(`${nom}`+" a été ajouté au panier avec succès");
panier.push({nom,prix});
total+=prix;
afficher();
btn.textContent="Visitez votre panier";
   
      }
      function afficher(){
        const liste=document.getElementById("liste-panier");
        const totalE=document.getElementById("total");
        if(panier.length===0){
          liste.innerHTML="<li>Aucun gâteau <li>";
        }
        else{
          liste.innerHTML=panier.map(item=>`<li>.${item.nom}-${item.prix}$<li>`).join("");
        }
        totalE.textContent=total;
      }
      function commander() {
        if(total===0){
          alert("Votre panier est vide veuillez ajouter quelque chose ");
          return;
        }
        const confirmation=confirm
        (`Voulez-vous confirmer votre commande  ${panier.length}  pour un total de ${total}$ ?`);
        if(confirmation){
          alert("Votre commande a été confirmée! Merci pour votre achat");
          vider();
        }
        else{
          alert("Commande annulée");
        }
      }

      function vider(){
        panier=[];
        total=0;
        afficher();
      
      const bouton= document.querySelectorAll(".btn");
      bouton.forEach(btn=>{
        btn.textContent="Ajouter au panier";
      });}


      /*Galerie*/

      document.addEventListener('DOMContentLoaded',()=>{
        const image=document.querySelectorAll(".carousel-img");
        const prev=document.getElementById("ptn");
        const next=document.getElementById("svn");
        let currentI=0;
        function update(){
          image.forEach(  img=>{img.classList.remove('.active');
            
          });
          image[currentI].forEach(img=>{img.classList.add('.active');});
        }
        next.addEventListener('click',()=>{
          currentI=(currentI + 1 ) % image.length;
          update();
        });
        prev.addEventListener('click',()=>{
currentI=(currentI - 1 + image.length) % image.length;
          update();
        });
        update();
      });
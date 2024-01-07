// catturo il contenitore papa delle cards
let cardsWrapper = document.querySelector('#cardsWrapper');

//cattura bottone mostra contatto
let showContactsBtn = document.querySelector('#showContactsBtn');

// cattura bottone aggingi contatti
let addContactBtn = document.querySelector('#addContactBtn');

// cattura bottone rimuovi contatto
let removeContactBtn = document.querySelector('#removeContactBtn')

// cattura input
let nameInput = document.querySelector('#nameInput')
let numberInput = document.querySelector('#numberInput')


const RUBRICA = {

    contacts : [
        { name : 'Francesco', number : 346987654},
        { name : 'Mario', number : 346987652},
        { name : 'Luigi', number : 346987658},
    ],

    // metodo mostra contatti
    showContacts : function(){
         // per svuotare il contenitore e non far ricreare card molteplici
         cardsWrapper.innerHTML='';

         // creazione cards contatti

        this.contacts.forEach((contatto)=>{
        
            let div = document.createElement('div');

            div.classList.add('col-12', 'col-lg-8','my-3');
            div.innerHTML = `

                <div class="card-custom">

                <p class="m-0">${contatto.name}</p>
                <p class="m-0">${contatto.number}</p>
                <i class="fa-solid fa-trash-can fa-2x icon"></i>

                </div>          
            
            `;
            cardsWrapper.appendChild(div);
        });
        // catturo le icone delle cards
        let icons = document.querySelectorAll('.icon');
        // per ogni icona deve partire un evento che mi trova , in base all'icona cliccata, il nome corrispondente con lo stesso indice.
        // mi salva il nome all'interno di una variabile.
        // quel nome sara proprio il parametro reale da dare in pasto alla funzione removeContact()
        icons.forEach((icona, i)=> {
            icona.addEventListener('click', ()=>{
                let iconName = this.contacts[i].name
                this.removeContact(iconName);
            })

        });

    },

    // metodo aggiungi contatti
    addContact : function (newName, newNumber){
        this.contacts.push({name : newName , number : newNumber})
        this.showContacts();
    },

    // metodo rimuovi contatto
    removeContact: function(removedName){

        // creato un  clone dell'array di partenza , estrapolando solo i nomi di ogni singolo contatto all'interno del nuovo array.
        let names = this.contacts.map((contatto) => contatto.name.toLowerCase());        
        
        // calcolo l'indice all'interno dell'array names
        let index = names.indexOf(removedName.toLowerCase());

        // condizione per eliminare un contatto in rubrica
        if(index > -1){

            this.contacts.splice(index, 1);
            this.showContacts();
            showContactsBtn.innerHTML = 'Nascondi Rubrica';

        } else{
            alert('Contatto non presente in rubrica');

        }

    }

}

let confirm = false ;

// evento rimuovi contatto
removeContactBtn.addEventListener('click', ()=>{

    RUBRICA.removeContact(nameInput.value);
    confirm = true;
    nameInput.value = '';

});



// eventoaggiungi contatti
addContactBtn.addEventListener('click', ()=>{

    if(nameInput.value != '' && numberInput.value != '' ){

        RUBRICA.addContact(nameInput.value, numberInput.value);
        confirm = true;
        showContactsBtn.innerHTML = 'Nascondi Rubrica';
        nameInput.value = '';
        numberInput.value ='';

    }else{
        alert('Attenzione , devi inserire un nome e un numero ')
    }

   
    

})



// evento mostra contatti
showContactsBtn.addEventListener('click', ()=>{

    if( confirm == false){

        RUBRICA.showContacts();
        confirm = true;
        showContactsBtn.innerHTML = "Nascondi Rubrica";

    } else {

        cardsWrapper.innerHTML='';
        confirm = false;
        showContactsBtn.innerHTML = "Mostra Rubrica";

    }
    
});


// ======== GESTIONE INVIO FORM ========= //
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.querySelector("#nome");
    const cognome = document.querySelector("#cognome");
    const email = document.querySelector("#email");
    const password = document.querySelector("#psw");
    const conferma = document.querySelector("#pswConferma");

    const campi = [nome, cognome, email, password, conferma];

    // Reset classi valide/errore a ogni submit
    campi.forEach(input => input.classList.remove("valido", "errore"));

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        try {
            // ✅ Valida i campi uno per uno
            campi.forEach(input => {
                if (typeof input.validazione === "function") input.validazione();
            });

            // ✅ Crea nuovo utente
            const nuovoUtente = new Utente(
                nome.value,
                cognome.value,
                email.value,
                password.value,
                conferma.value
            );

            console.log("✅ Utente registrato:", nuovoUtente);

            // ✅ Mostra toast di conferma
            mostraToast("✅ Iscrizione completata con successo!");

            // ✅ Pulisce il form e gli stili solo se tutto è andato bene
            form.reset();
            [nome, cognome, email, password, conferma].forEach(input => {
                input.classList.remove("valido", "errore");
            });

        } catch (err) {
            console.warn("⚠️ Errore:", err.message);

            // ✅ Evidenzia i campi con errore
            if (err.message.includes("nome")) nome.classList.add("errore");
            if (err.message.includes("cognome")) cognome.classList.add("errore");
            if (err.message.includes("Email")) email.classList.add("errore");
            if (err.message.includes("password")) {
                password.classList.add("errore");
                conferma.classList.add("errore");
            }

            // ✅ Mostra il toast con il messaggio d'errore
            mostraToast(err.message, true);
        }
    });
});

/* Funzione mostraToast */
function mostraToast(messaggio, errore = false) {
    const toast = document.getElementById("toast");
    toast.textContent = messaggio;

    toast.className = "toast mostra"; // resetta le classi
    if (errore) toast.classList.add("errore");

    setTimeout(() => {
        toast.classList.remove("mostra", "errore");
    }, 3000);
}


// ======== FUNZIONE DI VALIDAZIONE ========= //
function validaInput(input, condizione, dipendenze = []) {
    function aggiornaColore() {
        const valido = condizione(input.value);
        input.classList.remove("valido", "errore");

        if (valido) {
            input.classList.add("valido");
        } else if (input.value.trim() !== "") {
            input.classList.add("errore");
        }
    }

    input.validazione = aggiornaColore;

    input.addEventListener("input", aggiornaColore);
    input.addEventListener("change", aggiornaColore);

    dipendenze.forEach(dep => {
        dep.addEventListener("input", aggiornaColore);
        dep.addEventListener("change", aggiornaColore);
    });
}


// ======== SELETTORI E VALIDAZIONI ========= //
const nome = document.querySelector("#nome");
const cognome = document.querySelector("#cognome");
const email = document.querySelector("#email");
const password = document.querySelector("#psw");
const conferma = document.querySelector("#pswConferma");

validaInput(nome, valore => valore.trim().length >= 3);
validaInput(cognome, valore => valore.trim().length >= 2);
validaInput(email, valore => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valore));
validaInput(password, valore => valore.length >= 8);
validaInput(conferma, valore => valore === password.value, [password]);


// ======== AUTOFILL FIX ========= //
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        [nome, cognome, email, password, conferma].forEach(input => {
            if (input.value) {
                input.dispatchEvent(new Event("input", { bubbles: true }));
                input.dispatchEvent(new Event("change", { bubbles: true }));
            }
        });
    }, 500);
});


// ======== RESET ========= //
const reset = document.querySelector(".btnForm.reset");

reset.addEventListener("click", () => {
    const campi = document.querySelectorAll("input");
    campi.forEach(input => {
        input.value = "";
        input.classList.remove("valido", "errore");
    });
});





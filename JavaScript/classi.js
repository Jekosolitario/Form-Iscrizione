/* Creo una classe per gestire gli utenti che si iscriveranno */
class Utente {
    #cognome;
    #email;
    #password;
    #confermaPsw;

    static utentiRegistrati = [];

    constructor(nome, cognome, email, password, confermaPsw) {
        // ✅ Convalida password
        if (password !== confermaPsw) {
            throw new Error("❌ Le password non coincidono.");
        }

        // ✅ Convalida nome
        if (typeof nome !== "string" || nome.length < 3) {
            throw new Error("❌ Inserisci un nome valido (almeno 3 caratteri).");
        }

        // ✅ Convalida cognome
        if (typeof cognome !== "string" || cognome.length < 2) {
            throw new Error("❌ Inserisci un cognome valido (almeno 2 caratteri).");
        }

        // ✅ Convalida email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            throw new Error("❌ Email non valida.");
        }

        // controllo utente gia registrato
        const utenteEsistente = Utente.utentiRegistrati.some(u => u.#email === email);
        if (utenteEsistente) {
            throw new Error("❌ Utente già registrato con questa email.");
        }


        this.nome = nome;
        this.#cognome = cognome;
        this.#email = email;
        this.#password = password;
        this.#confermaPsw = confermaPsw;

        Utente.utentiRegistrati.push(this);
    }

    // Getter per cognome
    get cognome() {
        return this.#cognome;
    }

    // Getter e Setter per email
    get email() {
        return this.#email;
    }

    set email(nuovaEmail) {
        if (nuovaEmail.includes('@')) {
            this.#email = nuovaEmail;
        } else {
            throw new Error("❌ Email non valida.");
        }
    }

    // Descrizione utente
    descrivi() {
        console.log(`Nome: ${this.nome} | Cognome: ${this.#cognome} | Email: ${this.#email}`);
    }

    // Login
    login(email, password) {
        return this.#email === email && this.#password === password;
    }

    // Cambio password
    cambioPassword(vecchia, nuova) {
        if (this.#password === vecchia) {
            this.#password = nuova;
            console.log("✅ Password aggiornata.");
        } else {
            console.log("❌ La password inserita non coincide con la vecchia.");
        }
    }

    // Numero di utenti registrati
    static mostraNumeroUtentiRegistrati() {
        return Utente.utentiRegistrati.length;
    }

    // Trova utente per email
    static trovaUtente(email) {
        return Utente.utentiRegistrati.find(u => u.#email === email);
    }
}

/* Una classe Admin per gestire gli utenti */
class Admin extends Utente {
    constructor(nome, cognome, email, password, confermaPsw) {
        super(nome, cognome, email, password, confermaPsw);
        this.ruolo = "admin";
    }

    visualizzaUtenti() {
        return Utente.utentiRegistrati;
    }

    eliminaUtente(email) {
        const index = Utente.utentiRegistrati.findIndex(u => u.email === email);
        if (index !== -1) {
            Utente.utentiRegistrati.splice(index, 1);
            return `✅ Utente con email ${email} eliminato.`;
        } else {
            return "❌ Utente non trovato.";
        }
    }
}

// Esempi di test (disattivare in produzione)
/*
const admin1 = new Admin("Zuhir", "Ichcho", "admin@ptplanner.it", "123456", "123456");
const utente1 = new Utente("Mario", "Rossi", "mario@gmail.com", "ciao123", "ciao123");

utente1.descrivi();
console.log(utente1.login("mario@gmail.com", "ciao123"));
utente1.cambioPassword("ciao123", "nuovaPass123");
console.log(admin1.eliminaUtente("mario@gmail.com"));
*/

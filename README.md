## Äripäev Kodune Ülesanne 1 - Palgatrendide analüüsi rakendus

### Autor: Christian Hindremäe

### Kirjeldus

See rakendus võimaldab kasutajal saada infot soovitud valdkonna palgatrendide kohta viimaste aastate jooksul ning saada ka nõu ja prognoosi tulevikuks. Rakendus kasutab andmete saamiseks Statistikaameti rakendusliidest ning analüüsi koostamiseks OpenAI rakendusliidest.

### Funktsionaalsused

* Kasutaja saab valida soovitud valdkonna/tegevusala eeltäidetud menüüst
* Rakendus pärib andmed valitud valdkonna/tegevusala kohta stat.ee API-st
* Rakendus pärib palgatrendide kohta analüüsi GPT-4o mudeli käest läbi OpenAI API
* Rakendus kuvab andmed visualiseeritud graafikuna
* Rakendus kuvab ChatGPT analüüsi tekstina graafiku all

### Tehniline kirjeldus

Rakendus on üles ehitatud React.js ja Next.js raamistike abil. Rõhku on pandud SOC (Separation of Concerns) printsiibi järgimisele ning Next.js parimatele praktikatele. Kasutusel on ka TypeScript. Tagarakenduse pooles on kirjeldatud väliste rakendusliideste loogika kausta "lib" all, ning neid realiseerivad teenused kausta "services" all. Eesrakenduse poolel on kirjeldatud rakenduse algpunkt, kirjeldatud marsruudid tagarakendusest andmete pärimiseks, ning kasutades SSR lähenemist kuvatakse kasutajale kasutajaliides eelnevalt allalaetud andmetega. Kasutajaliides on üles ehitatud Material UI teegi abil.

### Käivitamine

1. Lae alla antud repositoorium (git clone)
2. Olles rakenduse kaustas (cd aripaev-yl-1) lae alla vajaminevad NPM paketid (npm install)
3. Veendu .env faili olemasolus rakenduse juurkaustas (sisaldab OpenAI API võtit)
4. Käivita rakendus (npm run dev)
5. Rakendus on kasutatav lokaalsel aadressil http://localhost:3000
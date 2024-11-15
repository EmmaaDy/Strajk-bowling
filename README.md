# Strajk Bowling
Strajk Bowling är en webbapplikation som gör det enkelt för användare att boka bowlingbanor och skor för en rolig och smidig bowlingupplevelse. 
Appen är designad för att vara mobilanpassad och hjälper användare att boka en bana för ett specifikt datum och tid, samt ange antal spelare och skostorlekar.

## 📝 Projektbeskrivning
Strajk Bowling gör det möjligt att boka bowlingbanor med skor direkt via webben. Följande funktioner ingår i appen:

- Boka banor och spelare: Användare kan välja ett datum, en tid och antal spelare.
- Skobokning: När antal spelare är valt, visas ett formulär för att ange skostorlekar för varje spelare.
- Bekräftelse: Efter bokningen visas en bekräftelse med information om bokningen, inklusive pris och bokningsnummer.

## 📱 Funktioner
- Booking Page: Användaren kan boka datum, tid, antal spelare och skostorlekar.
- Confirmation Page: Visar en sammanfattning av bokningen med pris, antal banor, och bokningsnummer.
- Menyn: En enkel navigering via en meny som visas när användaren klickar på hamburgerikonen.
- Validering
- Antalet spelare måste matcha antalet skostorlekar (exakt antal för varje spelare).
- Max 4 spelare per bana, vilket valideras vid bokning.


## 🌐 Länk till Webbapplikationen
Appen kan nås här: Strajk Bowling App (länk till appen, om publicerad).

## 🛠️ Teknologier som används
- **Frontend**: React och Typescript för ett interaktivt och typat gränssnitt.
- **Backend**: API för att skicka och ta emot bokningar.
- **Styling**: Enkel responsiv design för mobila enheter, baserat på design från Figma.

## 📋 Instruktioner för installation

➡️ **Ladda ner zip-filen eller gör en fork av repot.**

➡️ **Öppna projektmappen i din terminal.**

➡️ **Installera nödvändiga beroenden genom att köra följande kommando:**
```
npm install

```
```
npm run dev

```
➡️ **Öppna webbläsaren: Gå till http://localhost:3000 för att använda applikationen.**

## 🛠️ Backend API
Appen skickar en bokningsförfrågan till Strajks backend och får tillbaka ett svar. API-nyckel krävs för att autentisera förfrågningar.

API Endpoint:
https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com

Bokningsmodell
Request (för att skicka en bokning):
```
{
  "when": "2022-11-11T18:00",
  "lanes": 1,
  "people": 4,
  "shoes": [38, 39, 44, 43]
}
```

Response (bekräftelse på bokningen):
```
{
  "when": "2022-11-11T18:00",
  "lanes": 1,
  "people": 4,
  "shoes": [38, 39, 44, 43],
  "price": 580,
  "id": "str7283472",
  "active": true
}
```

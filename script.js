
let identyfikatorLokalizacji = null;

const status = document.getElementById("status");
const szerokosc = document.getElementById("latitude");
const dlugosc = document.getElementById("longitude");
const dokladnosc = document.getElementById("accuracy");

document.getElementById("start").addEventListener("click", () => {
    if (!navigator.geolocation) {
        status.textContent = "Przeglądarka nie obsługuje lokalizacji";
        return;
    }

    if (identyfikatorLokalizacji !== null) {
        return;
    }

    status.textContent = "Pobieranie lokalizacji...";

    identyfikatorLokalizacji = navigator.geolocation.watchPosition(
        (pozycja) => {
            szerokosc.textContent = pozycja.coords.latitude;
            dlugosc.textContent = pozycja.coords.longitude;
            dokladnosc.textContent =
                pozycja.coords.accuracy.toFixed(1) + " m";

            status.textContent = "Lokalizacja aktywna";
        },
        (blad) => {
            status.textContent = "Błąd: " + blad.message;

            if (blad.code === 1) {
                navigator.geolocation.clearWatch(identyfikatorLokalizacji);
                identyfikatorLokalizacji = null;
            }
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 15000
        }
    );
});

document.getElementById("stop").addEventListener("click", () => {
    if (identyfikatorLokalizacji !== null) {
        navigator.geolocation.clearWatch(identyfikatorLokalizacji);
        identyfikatorLokalizacji = null;
    }

    status.textContent = "Lokalizacja zatrzymana";
});

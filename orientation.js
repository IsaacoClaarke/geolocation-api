
let pomiarAktywny = false;

const status = document.getElementById("status");
const alfa = document.getElementById("alpha");
const beta = document.getElementById("beta");
const gamma = document.getElementById("gamma");

function aktualizujOrientacje(zdarzenie) {
    if (zdarzenie.alpha !== null) {
        alfa.textContent = zdarzenie.alpha.toFixed(2) + "°";
    } else {
        alfa.textContent = "---";
    }

    if (zdarzenie.beta !== null) {
        beta.textContent = zdarzenie.beta.toFixed(2) + "°";
    } else {
        beta.textContent = "---";
    }

    if (zdarzenie.gamma !== null) {
        gamma.textContent = zdarzenie.gamma.toFixed(2) + "°";
    } else {
        gamma.textContent = "---";
    }

    status.textContent = "Pomiar aktywny";
}

document.getElementById("start").addEventListener("click", async () => {
    if (!window.DeviceOrientationEvent) {
        status.textContent = "Urządzenie nie obsługuje orientacji";
        return;
    }

    if (pomiarAktywny) {
        return;
    }

    if (typeof DeviceOrientationEvent.requestPermission === "function") {
        try {
            const zgoda = await DeviceOrientationEvent.requestPermission();

            if (zgoda !== "granted") {
                status.textContent = "Brak zgody na czujniki";
                return;
            }
        } catch (blad) {
            status.textContent = "Błąd: " + blad.message;
            return;
        }
    }

    window.addEventListener("deviceorientation", aktualizujOrientacje);

    pomiarAktywny = true;
    status.textContent = "Oczekiwanie na dane czujników...";
});

document.getElementById("stop").addEventListener("click", () => {
    window.removeEventListener("deviceorientation", aktualizujOrientacje);

    pomiarAktywny = false;
    status.textContent = "Pomiar zatrzymany";
});


let pomiarAktywny = false;

const status = document.getElementById("status");

const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");

const alfa = document.getElementById("alpha");
const beta = document.getElementById("beta");
const gamma = document.getElementById("gamma");

function aktualizujPomiar(zdarzenie) {
    const przyspieszenie = zdarzenie.acceleration;
    const obrot = zdarzenie.rotationRate;

    if (przyspieszenie !== null) {
        if (przyspieszenie.x !== null) {
            x.textContent = przyspieszenie.x.toFixed(2);
        } else {
            x.textContent = "---";
        }

        if (przyspieszenie.y !== null) {
            y.textContent = przyspieszenie.y.toFixed(2);
        } else {
            y.textContent = "---";
        }

        if (przyspieszenie.z !== null) {
            z.textContent = przyspieszenie.z.toFixed(2);
        } else {
            z.textContent = "---";
        }
    }

    if (obrot !== null) {
        if (obrot.alpha !== null) {
            alfa.textContent = obrot.alpha.toFixed(2);
        } else {
            alfa.textContent = "---";
        }

        if (obrot.beta !== null) {
            beta.textContent = obrot.beta.toFixed(2);
        } else {
            beta.textContent = "---";
        }

        if (obrot.gamma !== null) {
            gamma.textContent = obrot.gamma.toFixed(2);
        } else {
            gamma.textContent = "---";
        }
    }

    status.textContent = "Pomiar aktywny";
}

document.getElementById("start").addEventListener("click", async () => {
    if (!window.DeviceMotionEvent) {
        status.textContent = "Urządzenie nie obsługuje Device Motion API";
        return;
    }

    if (pomiarAktywny) {
        return;
    }

    if (typeof DeviceMotionEvent.requestPermission === "function") {
        try {
            const zgoda = await DeviceMotionEvent.requestPermission();

            if (zgoda !== "granted") {
                status.textContent = "Brak zgody na czujniki";
                return;
            }
        } catch (blad) {
            status.textContent = "Błąd: " + blad.message;
            return;
        }
    }

    window.addEventListener("devicemotion", aktualizujPomiar);

    pomiarAktywny = true;
    status.textContent = "Oczekiwanie na dane czujników...";
});

document.getElementById("stop").addEventListener("click", () => {
    window.removeEventListener("devicemotion", aktualizujPomiar);

    pomiarAktywny = false;
    status.textContent = "Pomiar zatrzymany";
});

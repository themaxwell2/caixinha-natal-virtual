import * as THREE from "three";
import { createChristmasScene } from "./scene.js";

const container = document.getElementById("cena-natalina");

if (!container) {
    console.error("Não foi encontrado o elemento #cena-natalina.");
} else {
    try {
        if (THREE.REVISION !== "187") {
            throw new Error(`Versão inesperada do Three.js: revision ${THREE.REVISION}.`);
        }

        createChristmasScene(THREE, container);
        container.classList.add("cena-natalina--webgl");
        console.info("Cena natalina 3D inicializada com Three.js 0.187.0.");
    } catch (error) {
        container.classList.remove("cena-natalina--webgl");
        console.error(
            "Não foi possível inicializar a cena 3D. A ilustração CSS continuará visível.",
            error,
        );
    }
}

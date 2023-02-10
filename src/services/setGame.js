import { doc, getFirestore, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
export const setGame = async (game) => {
    try {
        const db = getFirestore();
        await setDoc(doc(db, "games", game.id), game);
    } catch (error) {
        console.error("UPSS! ocurrió un error al añadir una nueva partida a la DB: ", error);
    }
}
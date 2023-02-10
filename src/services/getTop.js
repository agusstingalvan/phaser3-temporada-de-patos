import { collection, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";

export const getTop = async ()=>{
    try {
        const db = await getFirestore();
        const collectionRef = collection(db, "games");
        const q = query(collectionRef,  orderBy("counterMovement", "asc"), limit(10));
        const collectionSnap = await getDocs(q);

        const games = [];
        collectionSnap.forEach((doc) => games.push(doc.data()));

        return games;
    } catch (error) {
        console.error("UPS! Error en getTop()", error);
    }
}
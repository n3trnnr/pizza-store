import { PREFIX } from "../constants/constants"

export const getMenuItem = async (id: number) => {
    try {
        const res = await fetch(`${PREFIX}/menu/${id}`)
        if (!res.ok) {
            throw new Error()
        }

        const data = res.json()
        return data
    } catch (e) {
        console.log(e);
    }
}
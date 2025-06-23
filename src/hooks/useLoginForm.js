import { useState } from "react"

export function useLoginForm(initialId = "", initialPw = "") {
    const [id, setId] = useState(initialId)
    const [pw, setPw] = useState(initialPw)

    const onChangeId = (e) => setId(e.target.value)
    const onChangePw = (e) => setPw(e.target.value)

    const resetForm = () => {
        setId("")
        setPw("")
    }

    return { id, pw, onChangeId, onChangePw, resetForm }
}
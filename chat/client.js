const formElement = document.querySelector("#form")

formElement.addEventListener("submit", async (e) => {
    e.preventDefault()
    let data = {
        ady: e.target.elements.name.value,
        sms: e.target.elements.sms.value
    }
    const res = await fetch("/form/data", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const jog = await res.json()
    console.log(jog)

    e.target.elements.name.value = ""
    e.target.elements.sms.value = ""
})


const divElement = document.querySelector("#div")

function render(arr) {
    let mapped = arr.map(item => {
        return `
            <div style="margin-bottom: 2px; display: flex; gap: 20px; align-items: center;">
                <h4>${item.ady}:</h4>
                <p>${item.sms}</p>
            </div>
        `
    })
    divElement.innerHTML = mapped.join("")
}


async function getHistory() {
    const res = await fetch("/form/data")
    const data = await res.json()
    render(data)
    setTimeout(getHistory, 1000)
}

getHistory()

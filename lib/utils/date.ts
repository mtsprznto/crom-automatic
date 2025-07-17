export function getDateChile(): string {
    const formatter = new Intl.DateTimeFormat("es-CL", {
        timeZone: "America/Santiago",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })

    const parts = formatter.formatToParts(new Date())
    const day = parts.find((p) => p.type === "day")?.value
    const month = parts.find((p) => p.type === "month")?.value
    const year = parts.find((p) => p.type === "year")?.value

    return `${day}-${month}-${year}`
}
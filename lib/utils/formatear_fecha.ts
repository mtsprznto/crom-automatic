export function formatearFechaIso(fechaIso: string): string {
    try {
        const fecha = new Date(fechaIso);

        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
        const año = fecha.getFullYear();

        return `${dia}-${mes}-${año}`;
    } catch (error) {
        console.error("❌ Fecha inválida:", error);
        return "Fecha inválida";
    }
}
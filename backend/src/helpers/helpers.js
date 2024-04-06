class Helpers {
    getMondayAndSunday(dateString) {
        const date = new Date(dateString);
        const day = date.getDay();
        const monday = new Date(date);
        monday.setDate(date.getDate() - day + (day === 0 ? -6 : 1)); // переходим к понедельнику
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6); // переходим к воскресенью
        return {
            monday: monday.toISOString().slice(0, 10),
            sunday: sunday.toISOString().slice(0, 10)
        };
    }
}

export default new Helpers();
export const convertMinutesToHours = (minutes: number) => {
    const hours = (minutes / 60)
    var rHours: any = Math.floor(hours)
    const min = (hours - rHours) * 60
    var rMinutes: any = Math.round(min)
    if (rHours.toString().length === 1) {
        rHours = `0${rHours}`
    }
    if (rMinutes.toString().length === 1) {
        rMinutes = `0${rMinutes}`
    }
    return `${rHours}:${rMinutes}`
}

export const convertHoursToMinutes = (time: string) =>{
        const [hour, minutes] = time.split(':').map(Number)
        const timeInMinutes= (hour*60) + minutes
        return timeInMinutes
}

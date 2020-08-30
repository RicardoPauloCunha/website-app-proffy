export default function convertMinutesToHour(minutes: number) {
    const minutesIntime = Math.trunc(minutes / 60);

    return minutesIntime;
}
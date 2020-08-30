export default function convertMinutesToTime(minutes: number) {
    let hour = Math.trunc(minutes / 60);

    let minute = minutes - (hour * 60);

    const minutesInTime = `${hour}:${minute}`;

    return minutesInTime;
}
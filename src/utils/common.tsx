
export const getTimeInMilliSeconds = (time: string) => {
    const newTime = new Date();
    const givenTimeValues = time.split(':');
    newTime.setHours(Number(givenTimeValues[0]), Number(givenTimeValues[1]));
    return newTime.getTime();
};

export const getDurationInMilliSeconds = (start: string, stop: string) => {
    return getTimeInMilliSeconds(start) - getTimeInMilliSeconds(stop);
};

export const getDurationFromStartAndStop = (start: string, stop: string) => {
    const ms = getDurationInMilliSeconds(start, stop);
    const minutes = Math.abs(Number((ms / (1000 * 60)).toFixed(1)));
    if (minutes < 60) return minutes + "m";
    else return Math.trunc(minutes / 60) + "h " + (minutes % 60) + "m";
};

export const getMonthAndDay = (date: string) => {
    const dateObject = new Date(date);
    return dateObject.toLocaleString('default', { month: 'short' }) + " " + dateObject.getDate();
};

export const todaysDate = () => {
    return new Date().toISOString().split('T')[0];
};

export const getDateFromToday = (num: number) => {
    const tempDate = new Date().setDate(new Date().getDate() + num);
    return new Date(tempDate).toISOString().split('T')[0];
};
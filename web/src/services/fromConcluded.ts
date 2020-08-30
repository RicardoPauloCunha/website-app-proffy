export const KEY = '@Proffy:from-page-concluded';

export const setFromPageConcluded = (indexPage: number) => localStorage.setItem(KEY, JSON.stringify(indexPage.toString()));
export const getFromPageConcluded = () => Number(JSON.parse(localStorage.getItem(KEY) as string));

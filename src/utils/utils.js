import {v4 as uuidv4} from 'uuid';
export const toAbsoluteUrl = pathname => import.meta.env.BASE_URL + pathname;
export const getUniqueId = () => uuidv4()
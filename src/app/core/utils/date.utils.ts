import {parseISO} from 'date-fns';
import {formatInTimeZone, toZonedTime} from 'date-fns-tz';

export class DateUtils {

    public static convertToUTCString(date: Date): string {
        return formatInTimeZone(date, 'UTC', 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
    }

    public static convertUTCStringToUserTimeZone(dateString: string, timeZone: string, formatStr?: string): string {
        const date = parseISO(dateString); // Convertimos la cadena ISO a un objeto Date
        const zonedDate = toZonedTime(date, timeZone); // Convertimos la fecha a la zona horaria seleccionada
        return formatInTimeZone(zonedDate, timeZone, formatStr || 'yyyy-MM-dd HH:mm:ssXXX');
    }

    public static formatDateInTimeZone(date: Date, timeZone: string, formatStr?: string): string {
        const zonedDate = toZonedTime(date, timeZone);
        return formatInTimeZone(zonedDate, timeZone, formatStr || 'yyyy-MM-dd HH:mm:ssXXX');
    }

    public static convertFromUserTimeZoneToUTC(date: Date, timeZone: string): string {
        const zonedDate = toZonedTime(date, timeZone); // Convertimos la fecha a la zona horaria seleccionada
        return formatInTimeZone(zonedDate, 'UTC', 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
    }
}

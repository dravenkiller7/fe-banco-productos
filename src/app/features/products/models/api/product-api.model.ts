export interface ProductApiModel {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string; // el backend usa strings ISO
  date_revision: string;
}

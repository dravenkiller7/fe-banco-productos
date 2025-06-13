export interface MenuItemAction {
    label: string;
    icon?: string;
    routerLink?: any;
    command?: (element?: any) => void;
}

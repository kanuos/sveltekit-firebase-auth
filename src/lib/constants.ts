export enum URL_Patterns {
    // Public pages - anyone can access them
    home = "/",

    // non auth pages - only logged out users can access them
    login = "/login",
    forgot = "/forgot-password",

    // auth pages - only logged in admins can access these pages
    logout = "/logout",
    dashboard = "/dashboard",
}
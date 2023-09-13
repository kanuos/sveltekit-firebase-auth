export enum URL_Patterns {
    // Public pages - anyone can access them
    home = "/",

    // non auth pages - only logged out users can access them
    login = "/login",
    forgot = "/forgot-password",

    // auth pages - only logged in admins can access these pages
    dashboard = "/dashboard",
    logoutAction = "/dashboard?/logout",
    updatePasswordPage = "/dashboard?q=update-password",
    manageAdminPage = "/dashboard?q=manage-admin",

    updatePasswordAction = "/dashboard?/update-password",

    // superuser form actions
    addAdminAction = "/dashboard?/add",
    deleteAdminAction = "/dashboard?/delete",

}



export enum NavType {
    public,
    admin,
    superuser
}
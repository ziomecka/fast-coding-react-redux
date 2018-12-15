export enum ChangePasswordFormTypes {
    APP_CHANGEPASSWORDFORM_SET_LOGIN = '@@app_newuserForm/SET_LOGIN',
    APP_CHANGEPASSWORDFORM_SET_EMAIL = '@@app_newuserForm/SET_EMAIL',
    APP_CHANGEPASSWORDFORM_RESET = '@@app_newuserForm/RESET'
}

export enum ChangePasswordFormResponseEnum {
    'ERROR' = 0,
    'SUCCESS' = 1,
    'CURRENT_PASSWORD_ERROR' = 6
};

export type ChangePasswordFormErrorType = ChangePasswordFormResponseEnum.ERROR |
    ChangePasswordFormResponseEnum.CURRENT_PASSWORD_ERROR;

/** Interface
 *  @property {string} login
 *  @property {string} currentPassword
 *  @property {string} newPassword
*/
export interface SendFormChangePasswordI {
    currentPassword: string;
    newPassword: string;
};
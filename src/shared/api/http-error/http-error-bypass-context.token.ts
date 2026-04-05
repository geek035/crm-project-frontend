import { HttpContextToken } from '@angular/common/http';

export const HTTP_ERROR_BYPASS_CONTEXT_TOKEN = new HttpContextToken<boolean>(() => false);

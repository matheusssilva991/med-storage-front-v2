import { toast, type ToastTheme } from 'vue3-toastify';

export function toastSuccess (message: string, theme: ToastTheme = 'auto') {
  toast.success(message, {
    toastStyle: {
      fontSize: '0.9rem',
    },
    toastId: 'success',
    theme: theme,
  });
}

export function toastError (message: string, theme: ToastTheme = 'auto') {
  toast.error(message, {
    toastStyle: {
      fontSize: '0.9rem',
    },
    toastId: 'error',
    theme: theme,
  });
}

export function toastInfo (message: string, theme: ToastTheme = 'auto') {
  toast.info(message, {
    toastStyle: {
      fontSize: '0.9rem',
    },
    toastId: 'info',
    theme: theme,
  });
}

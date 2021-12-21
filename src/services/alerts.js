import Swal from 'sweetalert2';

const AlertError = (title = '', msg = '') => {
  Swal.fire(title, msg, 'error');
};

const AlertSuccess = (title = '', msg = '') => {
  Swal.fire(title, msg, 'success');
};

export { AlertError, AlertSuccess };

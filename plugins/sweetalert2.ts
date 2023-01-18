import Swal from 'sweetalert2';

export default defineNuxtPlugin(() => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  return {
    provide: {
      swal: Swal,
      toast: Toast
    }
  };
});

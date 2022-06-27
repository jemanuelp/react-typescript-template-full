import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);

export const handleConfirmCancel = () => {
  return MySwal.fire({
    title: '',
    text: 'Are you sure you would like to cancel your subscription?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1',
    },
    buttonsStyling: false,
  }).then(function(result) {
    if (result.value) {
      MySwal.fire({
        icon: 'success',
        title: 'Unsubscribed!',
        text: 'Your subscription cancelled successfully.',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      });
    } else if (result.dismiss === MySwal.DismissReason.cancel) {
      MySwal.fire({
        title: 'Cancelled',
        text: 'Unsubscription Cancelled!!',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      });
    }
  });
};
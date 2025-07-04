import Swal from "sweetalert2";
type NotificationType = "success" | "info" | "warning" | "error";

const notification = (message: string, icon: NotificationType) => {
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "center",
  //   showConfirmButton: false,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.onmouseenter = Swal.stopTimer;
  //     toast.onmouseleave = Swal.resumeTimer;
  //   },
  // });

  return Swal.fire({
    position: "center",
    icon: icon,
    title: message,
    // showConfirmButton: false,
    timer: 3000,
  });
};

export default notification;

// const asyncWrapper = async (cb: () => Promise<void>) => {
//   try {
//     await cb();
//   } catch (err: any) {
//     if (err.error) {
//       console.log(err.error.data.message);
//       notification("error", err.error.data.message as string);
//     } else {
//       notification("error", "Something went wrong!" as string);
//       console.log(err.error.data.message);
//     }
//   }
// };

import notification from "../../common/Notification/notification";

// export default asyncWrapper;

// import Swal from "sweetalert2";
// import notification from "../../common/Notification/notification";

const asyncWrapper = async (cb: () => Promise<void>): Promise<void> => {
  try {
    await cb();
  } catch (err: any) {
    if (err.error) {
      notification(err.error.data.message as string, "error");
    } else {
      notification("Something went wrong!", "error");
    }
  }
};

export default asyncWrapper;

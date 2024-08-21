import toast from "react-hot-toast";

export const showToast = () => {
    setTimeout(() => {
      toast('Only Vespr and Flint wallet are available at this time.');
    }, 2500);
  };
//backend url for frontend
const backendDomain = "https://grocerystore-ylri.onrender.com";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  currentUser: {
    url: `${backendDomain}/api/userDetails`,
    method: "get",
  },
  logoutUser: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  forgotUser: {
    url: `${backendDomain}/api/forgotpassword`,
    method: "post",
  },
  resetUser: {
    url: `${backendDomain}/api/resetpassword`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/uploadProduct`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomain}/api/getCategoryProduct`,
    method: "get",
  },
  allProduct: {
    url: `${backendDomain}/api/getAllProduct`,
    method: "get",
  },
  productDetail: {
    url: `${backendDomain}/api/productDetail`,
    method: "post",
  },
  addToCart: {
    url: `${backendDomain}/api/addToCart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomain}/api/viewCartProduct`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/api/updateCartProduct`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/deleteCartProduct`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomain}/api/searchProduct`,
    method: "get",
  },
};

export default SummaryApi;


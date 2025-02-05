import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [menu_list, setMenuList] = useState(null);
  const [product_list, setProductList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginResult, setLoginResult] = useState();
  const [companyData, setCompanyDetails] = useState();
  const [itemIds, setItemId] = useState();
  const [cartdata, setCartData] = useState(null);
  var [quantity, setQuantity] = useState();
  var [cartItemTotalAmount, setCartTotalAmount] = useState();
  

  const idArry = [];
  var quantityForCart=0;
  const navigate = useNavigate();

  const addToCartApiCall = (product_id) => {
    debugger;

    try {
      const body = {
        buyerID: localStorage.getItem("user_id"),
        productID: product_id,
        quantity: 18,
      };
      axios.post("http://localhost:8080/api/addCart", body).then((response) => {
        console.log("response", response);
        toast.success(response.data.success);
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const storeIds=(id)=>{
    debugger
    if(idArry.includes(id))
     idArry.pop(id);
    else
    idArry.push(id);
  
     console.log("idArry",idArry)
    
     addToCart(idArry);
   
  }
  const addToCart = (itemIds) => {
    debugger;

   
  
  

  //   if (!cartItems[itemId]) {
  //     setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  //   } else {
  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
     
  //   }
  //   // Get the current quantity of the item in the cart
  // const currentQuantity = cartItems[itemId] ? cartItems[itemId] : 0;
  // console.log(`Current quantity of item ${itemId}: ${currentQuantity}`);




  // Loop through the itemIds array and update quantities
  setCartItems((prev) => {
    const newCartItems = { ...prev };

    itemIds?.forEach(itemId => {
      if (!newCartItems[itemId]) {
        // If item not in cart, set initial quantity to 1
        newCartItems[itemId] = 1;
      } else {
        // If item exists, increase the quantity by 1
        newCartItems[itemId] += 1;
      }
    });

    return newCartItems;
  });

  // Now, to get the quantities of all the items, you can aggregate them
  const allQuantities = itemIds?.map(itemId => ({
    itemId,
    quantity: cartItems[itemId] ? cartItems[itemId] : 0
  }));

  console.log("Quantities of items:", allQuantities);

  

    const body = {
      buyerID: localStorage.getItem("user_id"),
      productID: itemIds,
      quantity: cartItems[1],
    };

    axios
      .post("http://localhost:8080/api/product/add/cart", body)
      .then((response) => {
        console.log("response", response);
        // setCartData(response.data.buyerCartList);
      });
  };

  const removeFromCart = async (itemId) => {
    debugger;
    var quantity = 1;

    if (cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      setQuantity(cartItems[1])
    }
    await axios
      .delete(
        "http://localhost:8080/api/remove/cart?buyer_id=" +
          localStorage.getItem("user_id") +
          "&product_id=" +
          itemId +
          "&quantity=" +
          quantity
      )
      .then((response) => {
        setCartData(response.data.buyerCartList);
      });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = product_list.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    setCartTotalAmount(totalAmount);
    return totalAmount;
  };

  const placeOrder = (deliveryData) => {
    debugger;
    console.log("delivery data", deliveryData);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:8080/api/get/product/category")
        .then((response) => {
          console.log("menu", response);
          setMenuList(response.data);
          console.log("menuList", menu_list);
          localStorage.setItem("menus", JSON.stringify(response.data));
        });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      axios.get("http://localhost:8080/api/get/product").then((response) => {
        setProductList(response.data);
        console.log("productList", product_list);
      });
    };
    getProducts();
  }, []);

  useEffect(() => {
    debugger
    const getCartData = async () => {
      debugger;
      await axios
        .get(
          "http://localhost:8080/api/get/cart?userid=" +
            localStorage.getItem("user_id")
        )
        .then((response) => {
          setCartData(response.data);
        });
    };
    getCartData();
  }, []);

  useEffect(() => {
    const getCompanyDetails = async () => {
      axios
        .get(
          "http://localhost:8080/api/get/comapanyDetails?buyer_id=" +
            localStorage.getItem("user_id")
        )
        .then((response) => {
          console.log("contact details", response.data);
          setCompanyDetails(response.data);
        });
    };
    getCompanyDetails();
  }, []);

  const register = (registerData) => {
    debugger;
    setLoading(true);
    try {
      const body = {
        name: registerData.name,
        email: registerData.email,
        mobile: registerData.mobile,
        password: registerData.password,
        userType: "Buyer",
      };
      axios
        .post("http://localhost:8080/api/register", body)
        .then((response) => {
          console.log("response", response.data);

          if (response.data.error) {
            toast.error(response.data.error);
          } else {
            toast.success(response.data.success);
          }
        });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const login = (loginData) => {
    debugger;
    try {
      const body = {
        email: loginData.email,
        password: loginData.password,
      };
      axios.post("http://localhost:8080/api/login", body).then((response) => {
        console.log("response", response);
        setLoginResult(response);

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user_id", response.data.loginUserData.id);
          localStorage.setItem(
            "login_result",
            JSON.stringify(response.data.loginUserData)
          );

          toast.success(response.data.success);
          navigate("/home");
        }
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const saveCompanyDetails = (companyName, companyAddress) => {
    debugger;
    try {
      const body = {
        buyer_id: localStorage.getItem("user_id"),
        company_name: companyName,
        company_address: companyAddress,
      };
      axios
        .post("http://localhost:8080/api/add/companyDetails", body)
        .then((response) => {
          console.log("response", response);

          if (response.data.error) {
            toast.error(response.data.error);
          } else {
            toast.success(response.data.success);
          }
        });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const setSearchQuery = (productName) => {
    debugger;
    axios
      .get(
        "http://localhost:8080/api/product/search?product_name=" + productName
      )
      .then((response) => {
        setProductList(response.data);
        console.log("productList", product_list);
      });
  };
  const filterProductByMenu = (category_name) => {
    debugger;
    axios
      .get(
        "http://localhost:8080/api/product/filter?category_name=" +
          category_name
      )
      .then((response) => {
        setProductList(response.data);
      });
  };

  const contextValue = {
    product_list,
    menu_list,
    cartItems,
    loginResult,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    cartItemTotalAmount,
    placeOrder,
    register,
    login,
    saveCompanyDetails,
    addToCartApiCall,
    setSearchQuery,
    filterProductByMenu,
    storeIds,
    quantity,
    cartdata,
    companyData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

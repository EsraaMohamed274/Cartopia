export interface Order {
  _id: string;
  id: number;
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;

  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };

  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };

  cartItems: {
    _id: string;
    count: number;
    price: number;
    product: {
      _id: string;
      title: string;
      imageCover: string;
      ratingsAverage: number;
      ratingsQuantity: number;
      category: {
        _id: string;
        name: string;
      };
      brand: {
        _id: string;
        name: string;
      };
    };
  }[];
}
type Product = {
  _id: string;
  name: string;
  status: {
    destaque: boolean;
    estreia: boolean;
    post: boolean;
  };
};
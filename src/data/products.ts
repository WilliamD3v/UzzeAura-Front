export type Product = {
  _id: string
  name: string
  image: string
  price: number

  status: {
    destaque: boolean
    estreia: boolean
    post: boolean
  }
}

export const products: Product[] = [
  {
    _id: '1',
    name: 'Vestido Aurora',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=80',
    price: 189.9,

    status: {
      destaque: false,
      estreia: true,
      post: false,
    },
  },

  {
    _id: '2',
    name: 'Conjunto Milano',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
    price: 259.9,

    status: {
      destaque: false,
      estreia: true,
      post: true,
    },
  },

  {
    _id: '3',
    name: 'Vestido Paris',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=80',
    price: 229.9,

    status: {
      destaque: false,
      estreia: true,
      post: false,
    },
  },
  {
    _id: '4',
    name: 'Blazer Premium',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80',
    price: 329.9,

    status: {
      destaque: false,
      estreia: true,
      post: false,
    },
  },
  {
    _id: '5',
    name: 'Blazer Premium',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80',
    price: 329.9,

    status: {
      destaque: false,
      estreia: false,
      post: false,
    },
  },
  {
    _id: '6',
    name: 'Blazer Premium',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80',
    price: 329.9,

    status: {
      destaque: true,
      estreia: false,
      post: false,
    },
  },
  {
    _id: '7',
    name: 'Blazer Premium',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80',
    price: 329.9,

    status: {
      destaque: true,
      estreia: false,
      post: false,
    },
  },
  {
    _id: '8',
    name: 'Blazer Premium',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80',
    price: 329.9,

    status: {
      destaque: true,
      estreia: false,
      post: false,
    },
  },
  {
    _id: '9',
    name: 'Blazer Premium',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80',
    price: 329.9,

    status: {
      destaque: true,
      estreia: false,
      post: false,
    },
  },
]

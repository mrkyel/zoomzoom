export interface IProduct {
  categoryCurrency: string;
  categoryName: string;
  data: ProductData[];
  pagination: Pagination;
  status: number;
  success: boolean;
}

export interface ProductData {
  type: string;
  id: number;
  kind: number;
  productType: number;
  imagePath: string;
  representativeImageUrl: string;
  price: number;
  krPrice: string;
  localPrice: string;
  viewed: number;
  currency: string;
  localCurrency: string;
  categoryId: number;
  categoryName: string;
  tourType: number;
  buyingType: number;
  sanitaries: string;
  score: string;
  reviewTotal: number;
  day: number;
  duration: number;
  ratings: number;
  title: string;
  data: string;
  mobilityType: number;
  productConfirmType: number;
  confirmPeriod: number;
  tourTime: string;
  displayPrice: string;
  displayLocalPrice: string;
  koreanWonPrice: string;
  discount: null;
  promotionVideoUrl: string;
  promotionVideoThumbnailUrl: null;
  confirmType: string;
  origin: string;
  dest: string;
  seller: Seller;
}

interface Seller {
  additionalContact: string;
  avatar: string;
  banner: string;
  businessType: number;
  cityId: number;
  commissionId: null;
  company: string;
  countryCategoryId: number;
  countryId: number;
  currency: string;
  dateCreated: string;
  description: string;
  imagePath: string;
  kakaotalk: string;
  listUntil: null;
  msSeller: MsSeller;
  nickname: string;
  numberSold: number;
  oldImage: string;
  paypal: string;
  productApproved: number;
  productId: number;
  productStatus: number;
  productValidation: number;
  sellerApproved: number;
  sellerGroup: number;
  sellerId: number;
  sellerStatus: number;
  sellerType: number;
  transactionType: number;
  website: string;
  withholdingTaxRate: null;
  zoneId: number;
}

interface MsSeller {
  sellerId: number;
  sellerType: number;
  nickname: string;
  company: string;
  countryId: number;
  zoneId: number;
  avatar: string;
  imagePath: string;
  oldImage: string;
  banner: string;
  sellerGroup: number;
  transactionType: number;
  currency: string;
  cityId: number;
  countryCategoryId: number;
  withholdingTaxRate: null;
}

interface Pagination {
  count: number;
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links: {
    next: string;
  };
}

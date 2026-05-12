export interface Asset {
  id: string;
  productName: string;
  color: string;
  view: string;
  status: 'Validated' | 'Needs Review' | 'Flagged' | 'Unmatched';
  confidence: number;
  brand: string;
  imageUrl: string;
  tags: string[];
  metadata: {
    dimensions: string;
    size: string;
    format: string;
    source: string;
  };
  aiAnalysis: {
    primaryColor: string;
    garmentType: string;
    neckline?: string;
    pattern: string;
    sleeveLength?: string;
    viewAngle: string;
  };
  productMatch?: {
    name: string;
    variant: string;
    sku: string;
    matchMethod: string;
  };
  crossValidation: {
    field: string;
    docValue: string;
    imageValue: string;
    match: boolean;
    notes?: string;
  }[];
}

export const assets: Asset[] = [
  {
    id: '1',
    productName: 'Summer Midi Dress',
    color: 'Red & White',
    view: 'Back',
    status: 'Validated',
    confidence: 96,
    brand: 'Zara',
    imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/fFvJIaoGloUCdJIM.jpg',
    tags: ['dress', 'midi', 'striped', 'summer'],
    metadata: { dimensions: '1365x2048', size: '1.2 MB', format: 'JPEG', source: 'Zara_SS26_Lookbook.pdf, Pg 5' },
    aiAnalysis: { primaryColor: 'Red', garmentType: 'Dress', neckline: 'Strapless', pattern: 'Striped', viewAngle: 'Back' },
    productMatch: { name: 'Striped Strapless Midi Dress', variant: 'Red/White', sku: 'DRS-001-RED', matchMethod: 'Auto-matched (0.96)' },
    crossValidation: [
      { field: 'Pattern', docValue: 'Striped', imageValue: 'Striped', match: true },
      { field: 'Color', docValue: 'Red', imageValue: 'Red', match: true }
    ]
  },
  {
    id: '2',
    productName: 'Classic Denim Jeans',
    color: 'Blue',
    view: 'Flat Lay',
    status: 'Validated',
    confidence: 98,
    brand: 'Levi\'s',
    imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/zGAlXgvMBtFmKgyM.jpeg',
    tags: ['jeans', 'denim', 'casual', 'blue'],
    metadata: { dimensions: '1125x750', size: '0.8 MB', format: 'JPEG', source: 'Levis_Catalog_2026.pdf, Pg 12' },
    aiAnalysis: { primaryColor: 'Blue', garmentType: 'Pants', pattern: 'Solid', viewAngle: 'Flat Lay' },
    productMatch: { name: '501 Original Fit Jeans', variant: 'Medium Wash', sku: 'JNS-501-BLU', matchMethod: 'Auto-matched (0.98)' },
    crossValidation: [
      { field: 'Material', docValue: 'Denim', imageValue: 'Denim', match: true }
    ]
  },
  {
    id: '3',
    productName: 'Leather Biker Jacket',
    color: 'Black',
    view: 'Flat Lay',
    status: 'Needs Review',
    confidence: 82,
    brand: 'AllSaints',
    imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/ueyCSvnQUGnrTZhT.jpeg',
    tags: ['jacket', 'leather', 'black', 'outerwear'],
    metadata: { dimensions: '500x750', size: '0.5 MB', format: 'JPEG', source: 'AllSaints_FW26_LineSheet.pdf, Pg 3' },
    aiAnalysis: { primaryColor: 'Black', garmentType: 'Jacket', neckline: 'Collared', pattern: 'Solid', viewAngle: 'Flat Lay' },
    productMatch: { name: 'Dalby Leather Biker Jacket', variant: 'Black', sku: 'JKT-DLB-BLK', matchMethod: 'Auto-matched (0.82)' },
    crossValidation: [
      { field: 'Material', docValue: 'Faux Leather', imageValue: 'Leather', match: false, notes: 'Texture analysis suggests genuine leather' }
    ]
  },
  {
    id: '4',
    productName: 'Chunky Sneakers',
    color: 'White',
    view: 'Product Shot',
    status: 'Validated',
    confidence: 95,
    brand: 'Puma',
    imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/jiglWLhOlYALNDdN.jpeg',
    tags: ['sneakers', 'footwear', 'white', 'sport'],
    metadata: { dimensions: '600x750', size: '0.4 MB', format: 'JPEG', source: 'Puma_SS26_Footwear.pdf, Pg 8' },
    aiAnalysis: { primaryColor: 'White', garmentType: 'Shoes', pattern: 'Solid', viewAngle: 'Side' },
    productMatch: { name: 'RS-X Reinvention', variant: 'White', sku: 'SHS-RSX-WHT', matchMethod: 'Auto-matched (0.95)' },
    crossValidation: [
      { field: 'Color', docValue: 'White', imageValue: 'White', match: true }
    ]
  },
  {
    id: '5',
    productName: 'Classic Trench Coat',
    color: 'Beige',
    view: 'Front',
    status: 'Validated',
    confidence: 92,
    brand: 'Burberry',
    imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/ojBiToehvUKBpYxI.png',
    tags: ['coat', 'trench', 'beige', 'outerwear'],
    metadata: { dimensions: '732x1200', size: '1.5 MB', format: 'PNG', source: 'Burberry_Classic_Collection.pdf, Pg 1' },
    aiAnalysis: { primaryColor: 'Beige', garmentType: 'Coat', neckline: 'Collared', pattern: 'Solid', viewAngle: 'Front' },
    productMatch: { name: 'Kensington Heritage Trench', variant: 'Honey', sku: 'COT-KEN-HNY', matchMethod: 'Auto-matched (0.92)' },
    crossValidation: [
      { field: 'Style', docValue: 'Double Breasted', imageValue: 'Double Breasted', match: true }
    ]
  },
  {
    id: '6',
    productName: 'Silk Floral Scarf',
    color: 'Green',
    view: 'Flat Lay',
    status: 'Flagged',
    confidence: 65,
    brand: 'Gucci',
    imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/HVqvGAuBGxhukcjU.jpg',
    tags: ['scarf', 'silk', 'green', 'floral'],
    metadata: { dimensions: '2287x3000', size: '2.1 MB', format: 'JPEG', source: 'Gucci_Accessories_SS26.pdf, Pg 15' },
    aiAnalysis: { primaryColor: 'Green', garmentType: 'Accessory', pattern: 'Floral', viewAngle: 'Flat Lay' },
    productMatch: { name: 'Flora Print Silk Scarf', variant: 'Green', sku: 'ACC-FLR-GRN', matchMethod: 'Auto-matched (0.65)' },
    crossValidation: [
      { field: 'Pattern', docValue: 'Geometric', imageValue: 'Floral', match: false, notes: 'MISMATCH' }
    ]
  },
  {
    id: '7',
    productName: 'Cable Knit Sweater',
    color: 'Yellow',
    view: 'Flat Lay',
    status: 'Validated',
    confidence: 89,
    brand: 'H&M',
    imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/VhpNDMFhAJiscZjM.jpeg',
    tags: ['sweater', 'knit', 'yellow', 'winter'],
    metadata: { dimensions: '2240x3360', size: '1.8 MB', format: 'JPEG', source: 'HM_Winter_Knits.pdf, Pg 4' },
    aiAnalysis: { primaryColor: 'Yellow', garmentType: 'Sweater', neckline: 'Crew Neck', pattern: 'Solid', viewAngle: 'Flat Lay' },
    productMatch: { name: 'Chunky Knit Sweater', variant: 'Mustard', sku: 'SWT-CHK-YLW', matchMethod: 'Auto-matched (0.89)' },
    crossValidation: [
      { field: 'Texture', docValue: 'Cable Knit', imageValue: 'Cable Knit', match: true }
    ]
  },
  {
    id: '8',
    productName: 'Leather Tote Bag',
    color: 'Brown',
    view: 'Product Shot',
    status: 'Validated',
    confidence: 97,
    brand: 'Coach',
    imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/DSMMHepyjvkMrIDI.jpeg',
    tags: ['bag', 'leather', 'brown', 'accessory'],
    metadata: { dimensions: '500x707', size: '0.3 MB', format: 'JPEG', source: 'Coach_Bags_2026.pdf, Pg 9' },
    aiAnalysis: { primaryColor: 'Brown', garmentType: 'Bag', pattern: 'Solid', viewAngle: 'Front' },
    productMatch: { name: 'Willow Tote', variant: 'Saddle', sku: 'BAG-WIL-SDL', matchMethod: 'Auto-matched (0.97)' },
    crossValidation: [
      { field: 'Material', docValue: 'Leather', imageValue: 'Leather', match: true }
    ]
  }
];

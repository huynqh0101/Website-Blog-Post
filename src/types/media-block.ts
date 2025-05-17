// Đơn giản hóa - chỉ giữ các trường cần thiết
export interface SimpleMediaFile {
  id: number;
  url: string;
}

// Đơn giản hóa MediaBlock - chỉ cần ID và URL
export interface MediaBlock {
  __component: "shared.media";
  id: number;
  file: {
    id: number;
    url: string;
  };
  fileUrl?: string;
}

// Đơn giản hóa SliderBlock
export interface SliderBlock {
  __component: "shared.slider";
  id: number;
  files: SimpleMediaFile[];
}

// Union type cho các loại block
export type ContentBlock =
  | MediaBlock
  | SliderBlock
  | { __component: string; id: number };

// Đơn giản hóa kiểu dữ liệu trả về
export interface MediaBlockResult {
  id: number;
  type: "media";
  fileUrl: string;
}

export interface SliderBlockResult {
  id: number;
  type: "slider";
  slides: {
    id: number;
    url: string;
  }[];
}

export type BlockResult =
  | MediaBlockResult
  | SliderBlockResult
  | { id: number; type: "unknown" };

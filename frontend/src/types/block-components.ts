interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null | string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface MediaFile {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: MediaFormat;
    large: MediaFormat;
    medium: MediaFormat;
    small: MediaFormat;
  };
  url: string;
}

export interface BlockComponent {
  id: number;
  __component: string;
}

export interface RichTextBlock extends BlockComponent {
  __component: "shared.rich-text";
  body: string;
}

export interface QuoteBlock extends BlockComponent {
  __component: "shared.quote";
  title: string;
  body: string;
}

export interface MediaBlock extends BlockComponent {
  __component: "shared.media";
  file: MediaFile;
}

export interface SliderBlock extends BlockComponent {
  __component: "shared.slider";
  files: MediaFile[];
}

export type Block = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock;

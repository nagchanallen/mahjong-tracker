// The code below has been modified from the original code which comes from tenhou official page.

export const danMap = [
  '新人',
  '９級',
  '８級',
  '７級',
  '６級',
  '５級',
  '４級',
  '３級',
  '２級',
  '１級',
  '初段',
  '二段',
  '三段',
  '四段',
  '五段',
  '六段',
  '七段',
  '八段',
  '九段',
  '十段',
  '天鳳位',
];

export const GT_TAKU = (w: number): number => {
  return ((w & 0x0020) >> 4) | ((w & 0x0080) >> 7);
};
export const GT_ISDAN = (w: number): boolean => {
  return !(w & (0x0200 | 0x0400 | 0x0800));
};
export const GT_ISJANS = (w: number): boolean => {
  return (w & (0x0200 | 0x0400)) != 0;
};

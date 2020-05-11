export interface Coin {
  s: string;
  st: string;
  b: string;
  q: string;
  ba: string;
  qa: string;
  i: number;
  ts: number;
  an: string;
  qn: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  qv: number;
  y: number;
  as: number;
  pm: string;
  pn: string;
  cs: number;
}

export interface Response {
  code: string;
  message: string;
  messageDetail: string;
  data: Coin[];
}

export interface LiveUpdateData {
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
}

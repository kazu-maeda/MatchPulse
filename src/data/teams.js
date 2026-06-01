/**
 * 2026 FIFA World Cup — 全48チーム
 * TLA コードは Football-Data.org API に準拠
 */
export const TEAMS = {

  // ── Asia (6) ──────────────────────────────────
  JPN: { id: 'JPN', name: '日本',              nameEn: 'Japan',             flag: '🇯🇵' },
  KOR: { id: 'KOR', name: '韓国',              nameEn: 'South Korea',       flag: '🇰🇷' },
  IRN: { id: 'IRN', name: 'イラン',             nameEn: 'Iran',              flag: '🇮🇷' },
  KSA: { id: 'KSA', name: 'サウジアラビア',     nameEn: 'Saudi Arabia',      flag: '🇸🇦' },
  AUS: { id: 'AUS', name: 'オーストラリア',     nameEn: 'Australia',         flag: '🇦🇺' },
  UZB: { id: 'UZB', name: 'ウズベキスタン',     nameEn: 'Uzbekistan',        flag: '🇺🇿' },

  // ── Europe (16) ───────────────────────────────
  GER: { id: 'GER', name: 'ドイツ',             nameEn: 'Germany',           flag: '🇩🇪' },
  FRA: { id: 'FRA', name: 'フランス',           nameEn: 'France',            flag: '🇫🇷' },
  ESP: { id: 'ESP', name: 'スペイン',           nameEn: 'Spain',             flag: '🇪🇸' },
  ENG: { id: 'ENG', name: 'イングランド',       nameEn: 'England',           flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  POR: { id: 'POR', name: 'ポルトガル',         nameEn: 'Portugal',          flag: '🇵🇹' },
  NED: { id: 'NED', name: 'オランダ',           nameEn: 'Netherlands',       flag: '🇳🇱' },
  BEL: { id: 'BEL', name: 'ベルギー',           nameEn: 'Belgium',           flag: '🇧🇪' },
  ITA: { id: 'ITA', name: 'イタリア',           nameEn: 'Italy',             flag: '🇮🇹' },
  CRO: { id: 'CRO', name: 'クロアチア',         nameEn: 'Croatia',           flag: '🇭🇷' },
  SUI: { id: 'SUI', name: 'スイス',             nameEn: 'Switzerland',       flag: '🇨🇭' },
  AUT: { id: 'AUT', name: 'オーストリア',       nameEn: 'Austria',           flag: '🇦🇹' },
  SCO: { id: 'SCO', name: 'スコットランド',     nameEn: 'Scotland',          flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  NOR: { id: 'NOR', name: 'ノルウェー',         nameEn: 'Norway',            flag: '🇳🇴' },
  TUR: { id: 'TUR', name: 'トルコ',             nameEn: 'Turkey',            flag: '🇹🇷' },
  CZE: { id: 'CZE', name: 'チェコ',             nameEn: 'Czechia',           flag: '🇨🇿' },
  BIH: { id: 'BIH', name: 'ボスニア・ヘルツェゴビナ', nameEn: 'Bosnia-Herzegovina', flag: '🇧🇦' },

  // ── South America (6) ─────────────────────────
  BRA: { id: 'BRA', name: 'ブラジル',           nameEn: 'Brazil',            flag: '🇧🇷' },
  ARG: { id: 'ARG', name: 'アルゼンチン',       nameEn: 'Argentina',         flag: '🇦🇷' },
  COL: { id: 'COL', name: 'コロンビア',         nameEn: 'Colombia',          flag: '🇨🇴' },
  URY: { id: 'URY', name: 'ウルグアイ',         nameEn: 'Uruguay',           flag: '🇺🇾' },
  ECU: { id: 'ECU', name: 'エクアドル',         nameEn: 'Ecuador',           flag: '🇪🇨' },
  PAR: { id: 'PAR', name: 'パラグアイ',         nameEn: 'Paraguay',          flag: '🇵🇾' },

  // ── North/Central America & Caribbean (6) ─────
  USA: { id: 'USA', name: 'アメリカ',           nameEn: 'USA',               flag: '🇺🇸' },
  MEX: { id: 'MEX', name: 'メキシコ',           nameEn: 'Mexico',            flag: '🇲🇽' },
  CAN: { id: 'CAN', name: 'カナダ',             nameEn: 'Canada',            flag: '🇨🇦' },
  PAN: { id: 'PAN', name: 'パナマ',             nameEn: 'Panama',            flag: '🇵🇦' },
  CUW: { id: 'CUW', name: 'キュラソー',         nameEn: 'Curaçao',           flag: '🇨🇼' },
  HAI: { id: 'HAI', name: 'ハイチ',             nameEn: 'Haiti',             flag: '🇭🇹' },

  // ── Africa (9) ────────────────────────────────
  MAR: { id: 'MAR', name: 'モロッコ',           nameEn: 'Morocco',           flag: '🇲🇦' },
  SEN: { id: 'SEN', name: 'セネガル',           nameEn: 'Senegal',           flag: '🇸🇳' },
  EGY: { id: 'EGY', name: 'エジプト',           nameEn: 'Egypt',             flag: '🇪🇬' },
  GHA: { id: 'GHA', name: 'ガーナ',             nameEn: 'Ghana',             flag: '🇬🇭' },
  CIV: { id: 'CIV', name: 'コートジボワール',   nameEn: 'Ivory Coast',       flag: '🇨🇮' },
  COD: { id: 'COD', name: 'コンゴ民主共和国',   nameEn: 'Congo DR',          flag: '🇨🇩' },
  ALG: { id: 'ALG', name: 'アルジェリア',       nameEn: 'Algeria',           flag: '🇩🇿' },
  TUN: { id: 'TUN', name: 'チュニジア',         nameEn: 'Tunisia',           flag: '🇹🇳' },
  RSA: { id: 'RSA', name: '南アフリカ',         nameEn: 'South Africa',      flag: '🇿🇦' },

  // ── Middle East / West Asia (3) ───────────────
  IRQ: { id: 'IRQ', name: 'イラク',             nameEn: 'Iraq',              flag: '🇮🇶' },
  JOR: { id: 'JOR', name: 'ヨルダン',           nameEn: 'Jordan',            flag: '🇯🇴' },
  QAT: { id: 'QAT', name: 'カタール',           nameEn: 'Qatar',             flag: '🇶🇦' },

  // ── Oceania (1) ───────────────────────────────
  NZL: { id: 'NZL', name: 'ニュージーランド',   nameEn: 'New Zealand',       flag: '🇳🇿' },

  // ── Other / dummy data compat ─────────────────
  CPV: { id: 'CPV', name: 'カーボベルデ',       nameEn: 'Cape Verde',        flag: '🇨🇻' },
  CRC: { id: 'CRC', name: 'コスタリカ',         nameEn: 'Costa Rica',        flag: '🇨🇷' },
  JAM: { id: 'JAM', name: 'ジャマイカ',         nameEn: 'Jamaica',           flag: '🇯🇲' },
  SWE: { id: 'SWE', name: 'スウェーデン',       nameEn: 'Sweden',            flag: '🇸🇪' },
}

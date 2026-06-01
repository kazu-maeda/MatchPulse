/**
 * SVG → PNG アイコン生成スクリプト
 * 使い方: node scripts/generate-icons.js
 *
 * アイコンを差し替えたいときは public/icons/icon-source.svg を編集して再実行。
 */

import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const svgPath = resolve(root, 'public/icons/icon-source.svg')
const svgBuffer = readFileSync(svgPath)

mkdirSync(resolve(root, 'public/icons'), { recursive: true })

for (const size of [192, 512]) {
  const outPath = resolve(root, `public/icons/icon-${size}.png`)
  await sharp(svgBuffer).resize(size, size).png().toFile(outPath)
  console.log(`✓ public/icons/icon-${size}.png  (${size}×${size})`)
}

console.log('\nDone. Add to vite.config.js → manifest.icons if not yet configured.')

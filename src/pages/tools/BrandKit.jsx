import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RefreshCw, Copy, Check, ArrowLeft, Heart, X, Bookmark } from 'lucide-react'

// -- Seed palettes per vibe -----------------------------------------------
// Each entry: [bg, text, muted, accent, surface]
const SEED_PALETTES = {
  premium: [
    ['#0f0e0d', '#f5f0e8', '#8a8478', '#c2722d', '#1c1c1c'],
    ['#1c1917', '#f5f5f4', '#a8a29e', '#dc2626', '#292524'],
    ['#0c1116', '#e8edf2', '#8b97a5', '#d4af37', '#161d24'],
    ['#1a1a2e', '#f2eee6', '#8a8493', '#e94560', '#252540'],
    ['#0d0d0d', '#e5e5e5', '#737373', '#fb923c', '#1a1a1a'],
    ['#1a1611', '#e8d9bf', '#8a7b65', '#c89858', '#251f17'],
    ['#0f1419', '#e8e3d8', '#7d8590', '#b5894e', '#1a2128'],
    ['#0d1f1c', '#e8e0d3', '#7d8a83', '#c89968', '#152825'],
    ['#1a0d0d', '#f0e6dd', '#8a7868', '#c87856', '#241715'],
    ['#0d0d0f', '#e8e8eb', '#7c7c84', '#9d4edd', '#1a1a1c'],
    ['#0c0c0e', '#ece6dd', '#83796b', '#a8856b', '#181818'],
    ['#13110f', '#ebd9be', '#8c7b62', '#8b7355', '#1d1a17'],
    ['#0a1814', '#dfe8df', '#7a8d83', '#c4a06d', '#10221d'],
    ['#1a1217', '#f0e3dd', '#8a7882', '#d4837c', '#241a20'],
    ['#0d0f1a', '#e8eaf5', '#7c7e94', '#fbbf24', '#161a2a'],
    ['#0e0f10', '#ecebe7', '#7b7c7a', '#84a98c', '#1a1b1c'],
    ['#1a1612', '#ebe2d4', '#86796a', '#b8956a', '#221d18'],
    ['#0c1410', '#e5ddc8', '#7d806b', '#cba35e', '#15201a'],
    ['#1a1612', '#e8d9c0', '#8a7e68', '#7a8f4f', '#241e18'],
    ['#0d0e10', '#ece6dd', '#7d7c7c', '#a87c52', '#1a1b1d'],
    ['#15101a', '#ebdfe5', '#8a7d87', '#c4855e', '#1f1a25'],
    ['#0a0f0d', '#e5e0d3', '#7a8077', '#b59266', '#15201c'],
    ['#1a1110', '#e8d9c8', '#8c7d6e', '#3e6d6b', '#251a19'],
    ['#0d0d0a', '#ece4d2', '#7d7565', '#c47b56', '#1a1814'],
    ['#10141a', '#e5e0d8', '#7c8085', '#a8895e', '#1a1f25'],
    ['#0f1517', '#e6dcd0', '#7e8085', '#a76a50', '#1a2125'],
    ['#0a0d12', '#dee0db', '#788287', '#b58957', '#15191f'],
    ['#1a1014', '#e8d9d8', '#8a7d80', '#b8836b', '#251a1f'],
    ['#0d0c08', '#e5d8b8', '#7d745c', '#a06738', '#1a1812'],
    ['#0e0f15', '#e6e2d6', '#7e8085', '#b5905a', '#181a20'],
  ],
  calm: [
    ['#f4f1ea', '#1d201d', '#6b6d68', '#7a8870', '#ebe6dc'],
    ['#fafaf7', '#1c1917', '#78716c', '#84cc16', '#f5f5f4'],
    ['#eef0ec', '#1f2937', '#6b7280', '#0891b2', '#dde2dc'],
    ['#f5f1ec', '#292524', '#78716c', '#65a30d', '#e7e2d8'],
    ['#f0ede4', '#2d2a26', '#6b6357', '#a16207', '#e3ddd0'],
    ['#f5f0e7', '#2d2a24', '#7a6f5e', '#7a8870', '#ebe5d8'],
    ['#e8f0eb', '#1f2937', '#6b7d75', '#5b8b6f', '#d8e3dc'],
    ['#f5ede1', '#2b2520', '#7a6e5f', '#9c7c4e', '#ebe1d0'],
    ['#eef1f3', '#1f2937', '#6b7785', '#8b7e9e', '#dde3e8'],
    ['#f0eee8', '#2d2a25', '#776e5e', '#5b7068', '#e5e2d8'],
    ['#f5f0e8', '#252320', '#766d5e', '#8d6e58', '#ebe4d6'],
    ['#e8ebe5', '#1d1f1c', '#6a6e68', '#7e8a72', '#d8ddd2'],
    ['#f3eddf', '#252020', '#7a6e64', '#a08868', '#e9e1d4'],
    ['#eef0eb', '#1f2421', '#6b736d', '#5e7d6f', '#dde3dc'],
    ['#f5f0e2', '#1f1a14', '#7a6f5a', '#a07e4c', '#ebe3cf'],
    ['#eeeae0', '#1a1813', '#736c5c', '#5e6a5e', '#e0dac9'],
    ['#f0eeea', '#1a1817', '#736e69', '#9e7e7e', '#e5e1da'],
    ['#f5e8e2', '#1a1414', '#7c6e68', '#7e8470', '#ebdcd2'],
    ['#eef0f5', '#1d2027', '#717786', '#8c95a8', '#dde3eb'],
    ['#f0e6d2', '#1a1410', '#7a6e58', '#857058', '#e5d8b8'],
    ['#e8ece5', '#1a201c', '#6d756e', '#85745c', '#d8ddd2'],
    ['#f5e8d8', '#1f1815', '#7e6e5e', '#7a8870', '#ead8c0'],
    ['#f0ece4', '#1a1814', '#736e64', '#85878c', '#e5e0d4'],
    ['#f0e8e0', '#1a1614', '#7c706a', '#9c8475', '#e3d8ce'],
    ['#eeeae5', '#1a1816', '#736e68', '#7e8c83', '#dfd9d0'],
    ['#f3eed5', '#1a1812', '#7c715e', '#5e8b6f', '#e8e0c0'],
    ['#ebebe5', '#1f201d', '#717366', '#9c5a3e', '#dadbcf'],
    ['#f5e8de', '#1f1a17', '#7e6c64', '#5b8b6f', '#ebd9c8'],
    ['#f0eddc', '#1d1a14', '#776e5e', '#a1845e', '#e5dfc4'],
    ['#f5f0e2', '#1a1812', '#7a715e', '#3e6d6b', '#ebe3cf'],
    ['#f0e3d2', '#1f1a14', '#7c6c58', '#7a8870', '#e3d4b8'],
    ['#f5ede4', '#1a1815', '#7c7068', '#7e6b5a', '#ebe1d2'],
    ['#f0e8e8', '#1f1818', '#7c7070', '#9e7560', '#e3d6d6'],
    ['#eeeae0', '#1c1816', '#7a716a', '#5b7068', '#dfd9c5'],
  ],
  bold: [
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#fbbf24', '#1a1a1a'],
    ['#fffbeb', '#1c1917', '#78716c', '#dc2626', '#fef3c7'],
    ['#18181b', '#fafafa', '#a1a1aa', '#22d3ee', '#27272a'],
    ['#0f0a19', '#fafafa', '#9ca3af', '#a855f7', '#1e1b2e'],
    ['#fff7ed', '#1c1917', '#78716c', '#f97316', '#fed7aa'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#10b981', '#1a1a1a'],
    ['#fef3c7', '#1a1a1a', '#737373', '#dc2626', '#fde68a'],
    ['#0f0f0f', '#fafafa', '#9ca3af', '#ec4899', '#1c1c1c'],
    ['#fef2f2', '#1f1717', '#7a6a6a', '#dc2626', '#fecaca'],
    ['#0a0a14', '#fafafa', '#9ca3af', '#3b82f6', '#15151f'],
    ['#fff7e8', '#1a1410', '#73685c', '#ea580c', '#fce4c0'],
    ['#0a0e0a', '#fafaf2', '#9ca39c', '#84cc16', '#15201a'],
    ['#0a0a0a', '#fefefa', '#a3a3a3', '#facc15', '#1a1a1a'],
    ['#fff1f2', '#1a0e10', '#806a6e', '#e11d48', '#ffe4e6'],
    ['#0d0a14', '#fafafa', '#a3a3b3', '#6366f1', '#1a1822'],
    ['#0a0a0a', '#fafaeb', '#a3a38a', '#f59e0b', '#1a1a14'],
    ['#1a0a0a', '#fafafa', '#a3a3a3', '#fbbf24', '#250f0f'],
    ['#fefce8', '#0a0a0a', '#737373', '#ec4899', '#fde68a'],
    ['#0a0a0a', '#fafafa', '#9c9c9c', '#06b6d4', '#1a1a1a'],
    ['#fdf2f8', '#0a0a0a', '#7a6a6e', '#a855f7', '#fce7f3'],
    ['#0a0a14', '#fafafa', '#9c9caf', '#22d3ee', '#15151f'],
    ['#fff5cc', '#0a0a0a', '#8a8273', '#0f172a', '#fde68a'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#84cc16', '#1a1a1a'],
    ['#fff7ed', '#1a1414', '#7a6c6c', '#000000', '#ffe8d4'],
    ['#0a0014', '#fafafa', '#a3a3b3', '#ec4899', '#15001f'],
    ['#fafafa', '#0a0a0a', '#737373', '#dc2626', '#f5f5f5'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#fb7185', '#1a1a1a'],
    ['#0d0d14', '#fafafa', '#9ca3b3', '#f59e0b', '#1a1a25'],
    ['#fff0e6', '#0d0a0a', '#7a6a6a', '#0ea5e9', '#ffe4d2'],
    ['#0d0a14', '#fafafa', '#a3a3b3', '#84cc16', '#181522'],
    ['#fefefa', '#0a0a0a', '#737373', '#7c3aed', '#f5f5f0'],
    ['#0a0a0a', '#fafaf0', '#a3a397', '#22c55e', '#1a1a14'],
    ['#fdf4ff', '#0a0a0a', '#7a6a7a', '#7c3aed', '#f3e8ff'],
    ['#0a0a14', '#fafafa', '#9ca3af', '#fbbf24', '#15151f'],
  ],
  warm: [
    ['#ede4d0', '#0a0a0a', '#6b614e', '#b46a1f', '#e0d4b8'],
    ['#f5efe6', '#1f1a16', '#6b5a4d', '#94632d', '#ece4d4'],
    ['#fbf3e4', '#1c1311', '#7a6450', '#a04621', '#f3e6cf'],
    ['#f0e6d2', '#2d1f15', '#7a5d40', '#c2410c', '#e3d4b5'],
    ['#faf4ea', '#1a1410', '#6b5847', '#854d0e', '#f0e6d5'],
    ['#f5ebd6', '#1f1a14', '#7a6e58', '#aa6228', '#ebe0c4'],
    ['#f5ead3', '#211712', '#7d685a', '#8c4a2b', '#ebdfc4'],
    ['#f7eedc', '#1a1612', '#766b58', '#8d4f1a', '#ede3cd'],
    ['#f0e3c8', '#221912', '#7e6e58', '#9c5e2a', '#e5d6b5'],
    ['#fbf2dc', '#1d1813', '#82715a', '#a25a25', '#f0e6c8'],
    ['#f4e8ce', '#1f1a14', '#7a6c56', '#92571f', '#e8dabb'],
    ['#f8ecd4', '#1c1610', '#7e6e58', '#a76c3a', '#eddfc1'],
    ['#f0e3cc', '#2b1f14', '#7d6c56', '#b8773a', '#e5d6b8'],
    ['#f7eed8', '#1a1410', '#7c6d57', '#9c5226', '#ede1c5'],
    ['#f0e5cf', '#251a12', '#776852', '#7e4524', '#e5d6b6'],
    ['#fbf2d8', '#1a1410', '#7c6c54', '#aa6c30', '#f0e4c0'],
    ['#f5ead0', '#1f1611', '#776854', '#b06f30', '#ebdfb8'],
    ['#f0e6c8', '#251a14', '#7a6c54', '#7e4f1f', '#e5d6b4'],
    ['#f8edd2', '#1f1814', '#7c6e54', '#9c4a1f', '#eddfbc'],
    ['#f0e0c0', '#1c1610', '#7a6650', '#8b4f2a', '#e3d2ab'],
    ['#fbf0d0', '#1a1410', '#7e6e54', '#b06b25', '#f0e2bb'],
    ['#f5e8c8', '#1d1610', '#7a6c50', '#76411e', '#ebdaab'],
    ['#f0ddb4', '#1a1410', '#7a6850', '#a85a25', '#e5cf9c'],
    ['#fff5e0', '#1a1410', '#7c6e58', '#a8551c', '#fae8c8'],
    ['#f8eccc', '#1d1610', '#7a6c54', '#7e4220', '#eddfb8'],
    ['#f5ead8', '#1a1410', '#7c6e5c', '#6b4528', '#ebdec5'],
    ['#fbf3e0', '#1a1410', '#7c6e58', '#8b5524', '#f0e6cf'],
    ['#f0e0b8', '#1a1410', '#7a684e', '#a25a25', '#e5d2a3'],
    ['#f8edd0', '#1a1410', '#7c6e54', '#8b4f1c', '#eddfba'],
    ['#f5e3b8', '#251a14', '#7c6a50', '#7e3f1a', '#ead4a3'],
    ['#f0ddb8', '#1f1612', '#7a6850', '#9c5e2a', '#e5cea3'],
    ['#fbf0d2', '#1f1814', '#7c6c54', '#8b3a1a', '#f0e2bb'],
    ['#f0e3c0', '#221a14', '#7a6c52', '#a55a28', '#e5d4a8'],
    ['#f8ead2', '#1a1410', '#7c6e58', '#9c4a1f', '#eddfba'],
  ],
  modern: [
    ['#fafafa', '#0a0a0a', '#737373', '#3b82f6', '#f5f5f5'],
    ['#ffffff', '#171717', '#737373', '#10b981', '#fafafa'],
    ['#f8fafc', '#0f172a', '#64748b', '#6366f1', '#e2e8f0'],
    ['#fafafa', '#171717', '#737373', '#ec4899', '#f5f5f5'],
    ['#ffffff', '#0f172a', '#64748b', '#0ea5e9', '#f1f5f9'],
    ['#fafafa', '#0a0a0a', '#737373', '#22c55e', '#f5f5f5'],
    ['#fafafa', '#171717', '#737373', '#f59e0b', '#f5f5f5'],
    ['#f1f5f9', '#0f172a', '#64748b', '#a855f7', '#e2e8f0'],
    ['#ffffff', '#171717', '#737373', '#14b8a6', '#fafafa'],
    ['#fafafa', '#0a0a0a', '#737373', '#f43f5e', '#f5f5f5'],
    ['#f8f9fa', '#1a1a1a', '#6c757d', '#4361ee', '#e9ecef'],
    ['#fafafa', '#171717', '#737373', '#06b6d4', '#f5f5f5'],
    ['#ffffff', '#0a0a0a', '#737373', '#84cc16', '#fafafa'],
    ['#f1f5f9', '#0f172a', '#64748b', '#fb7185', '#e2e8f0'],
    ['#f5f5f4', '#1c1917', '#78716c', '#3b82f6', '#e7e5e4'],
    ['#fafafa', '#0a0a0a', '#737373', '#0d9488', '#f5f5f5'],
    ['#ffffff', '#171717', '#737373', '#7c3aed', '#fafafa'],
    ['#fafafa', '#0a0a0a', '#737373', '#fb7185', '#f5f5f5'],
    ['#f1f5f9', '#0f172a', '#64748b', '#fbbf24', '#e2e8f0'],
    ['#fafafa', '#171717', '#737373', '#e11d48', '#f5f5f5'],
    ['#ffffff', '#0a0a0a', '#737373', '#2563eb', '#fafafa'],
    ['#fafafa', '#0a0a0a', '#737373', '#0891b2', '#f5f5f5'],
    ['#f8fafc', '#0f172a', '#64748b', '#16a34a', '#e2e8f0'],
    ['#ffffff', '#171717', '#737373', '#d946ef', '#fafafa'],
    ['#fafafa', '#0a0a0a', '#737373', '#65a30d', '#f5f5f5'],
    ['#f1f5f9', '#0f172a', '#64748b', '#06b6d4', '#e2e8f0'],
    ['#fafafa', '#171717', '#737373', '#ea580c', '#f5f5f5'],
    ['#ffffff', '#0a0a0a', '#737373', '#9333ea', '#fafafa'],
    ['#fafafa', '#0a0a0a', '#737373', '#0284c7', '#f5f5f5'],
    ['#f8fafc', '#0f172a', '#64748b', '#65a30d', '#e2e8f0'],
    ['#fafafa', '#171717', '#737373', '#db2777', '#f5f5f5'],
    ['#ffffff', '#0a0a0a', '#737373', '#0891b2', '#fafafa'],
    ['#fafafa', '#0a0a0a', '#737373', '#84cc16', '#f5f5f5'],
    ['#f1f5f9', '#0f172a', '#64748b', '#f59e0b', '#e2e8f0'],
  ],
  editorial: [
    ['#0a0a0a', '#f5f0e8', '#8a8478', '#8b1a1a', '#1c1c1c'],
    ['#f5efe6', '#1f1a16', '#6b5a4d', '#0f3d2e', '#ece4d4'],
    ['#1c1917', '#f5f5f4', '#a8a29e', '#a16207', '#292524'],
    ['#f7f3ed', '#1a1614', '#736559', '#5b3a1a', '#ebe5d8'],
    ['#0f0d0b', '#ede5d6', '#857b6e', '#d4af37', '#1a1714'],
    ['#fafaf5', '#1c1917', '#78716c', '#7c2d12', '#f5f5f4'],
    ['#1a1614', '#f0e5d2', '#867866', '#8b6f47', '#251f1a'],
    ['#f5f0e6', '#1a1411', '#7a6c5e', '#1e3a5f', '#ebe2d2'],
    ['#0a0a0a', '#ebe1cd', '#84775f', '#7a8f5b', '#1a1a1a'],
    ['#f0e8d4', '#1a1410', '#7a6e58', '#8b1a1a', '#e5dbc0'],
    ['#0d0c0a', '#e5dbc0', '#7d7361', '#7b5a30', '#1a1916'],
    ['#f3eddf', '#19140e', '#776e5c', '#0f4f4a', '#e8e1cd'],
    ['#1c1815', '#ebe0c5', '#8a7d63', '#b96929', '#262017'],
    ['#f7f0e1', '#1a1410', '#7c6e56', '#4a2c2a', '#ede3d0'],
    ['#0a0a0a', '#ecdfc8', '#857a64', '#a87236', '#1a1a1a'],
    ['#1c1612', '#e8d9bf', '#8b7d65', '#c4a06d', '#251f17'],
    ['#f3ead1', '#1c1612', '#7c6e54', '#a04621', '#e9dfc0'],
    ['#0a0a0a', '#ede5d2', '#857d68', '#0f4f4a', '#1a1a1a'],
    ['#f5ead0', '#1f1814', '#7c6e56', '#5b3a1a', '#ebdfb8'],
    ['#1a1612', '#ebe2d4', '#867866', '#3e6d6b', '#251f1a'],
    ['#f0e8d4', '#1a1410', '#7c6e58', '#85745c', '#e5dbc0'],
    ['#0a0a0a', '#e8ddc5', '#857a63', '#7e8a4f', '#1a1a1a'],
    ['#f3ead4', '#1a1611', '#7c6e58', '#2d4b1f', '#e9dec0'],
    ['#1c1815', '#ecdfc8', '#8b7d65', '#7e6048', '#262017'],
    ['#f5f0e2', '#1a1610', '#7c6f5c', '#714328', '#ebe3cf'],
    ['#0d0d0a', '#ebe1cd', '#857a64', '#5b8b6f', '#1a1916'],
    ['#f3eed5', '#1d1813', '#7c715e', '#852a1a', '#e8e0c4'],
    ['#0a0a0a', '#e8dec5', '#857a62', '#a85a30', '#1a1a1a'],
    ['#f7f0e1', '#1a1410', '#7c6e56', '#0f3d2e', '#ede3d0'],
    ['#1c1612', '#e8d9c0', '#8c7e6a', '#a26b3e', '#251f18'],
    ['#f5e8d4', '#1c1612', '#7c6c52', '#7e3a25', '#ebdcbc'],
    ['#0a0a0a', '#e8dcc0', '#857a63', '#b08545', '#1a1a1a'],
    ['#f3eddc', '#1a1411', '#7c6e58', '#5b3e2a', '#e8e1c8'],
    ['#1c1817', '#ebe0c5', '#8a7e6b', '#4a6b6b', '#262017'],
  ],
  minimal: [
    ['#ffffff', '#000000', '#737373', '#000000', '#f5f5f5'],
    ['#fafafa', '#0a0a0a', '#737373', '#171717', '#f5f5f5'],
    ['#f5f5f4', '#1c1917', '#78716c', '#1c1917', '#e7e5e4'],
    ['#f8fafc', '#0f172a', '#64748b', '#0f172a', '#e2e8f0'],
    ['#fefefe', '#171717', '#737373', '#525252', '#fafafa'],
    ['#fafaf7', '#1c1917', '#78716c', '#44403c', '#f5f5f4'],
    ['#f4f4f5', '#18181b', '#71717a', '#27272a', '#e4e4e7'],
    ['#ffffff', '#0a0a0a', '#525252', '#262626', '#f5f5f5'],
    ['#fafafa', '#171717', '#737373', '#3f3f46', '#f4f4f5'],
    ['#f5f5f5', '#0a0a0a', '#737373', '#171717', '#e7e5e4'],
    ['#fafaf9', '#1c1917', '#78716c', '#292524', '#e7e5e4'],
    ['#ffffff', '#171717', '#737373', '#404040', '#fafafa'],
    ['#f5f4f3', '#1c1917', '#78716c', '#3f3f46', '#e7e5e4'],
    ['#fafafa', '#0a0a0a', '#737373', '#1f2937', '#f5f5f5'],
    ['#f8fafc', '#0f172a', '#475569', '#1e293b', '#e2e8f0'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#fafafa', '#1a1a1a'],
    ['#171717', '#fafafa', '#a3a3a3', '#e5e5e5', '#262626'],
    ['#1c1917', '#f5f5f4', '#a8a29e', '#f5f5f4', '#292524'],
    ['#18181b', '#fafafa', '#a1a1aa', '#e4e4e7', '#27272a'],
    ['#0a0a0a', '#fafaf9', '#a8a29e', '#f5f5f4', '#1c1917'],
    ['#0f172a', '#f8fafc', '#94a3b8', '#e2e8f0', '#1e293b'],
    ['#1a1a1a', '#fafafa', '#737373', '#a3a3a3', '#262626'],
    ['#0a0a0a', '#e5e5e5', '#737373', '#fafafa', '#1a1a1a'],
    ['#171717', '#fafafa', '#a3a3a3', '#525252', '#262626'],
    ['#1c1917', '#fafaf9', '#78716c', '#44403c', '#292524'],
  ],
  playful: [
    ['#fef3c7', '#1f2937', '#6b7280', '#f97316', '#fde68a'],
    ['#fce7f3', '#1f2937', '#6b7280', '#9333ea', '#fbcfe8'],
    ['#e0f2fe', '#0f172a', '#64748b', '#ec4899', '#bae6fd'],
    ['#ecfccb', '#1c1917', '#78716c', '#f97316', '#d9f99d'],
    ['#ffe4e6', '#1f1717', '#6b5d5d', '#0891b2', '#fecdd3'],
    ['#dbeafe', '#0f172a', '#475569', '#f59e0b', '#bfdbfe'],
    ['#fef3c7', '#1c1917', '#6b6260', '#ec4899', '#fde68a'],
    ['#d1fae5', '#1c1917', '#6b7280', '#f97316', '#a7f3d0'],
    ['#fce7f3', '#1f1717', '#7a6a6e', '#06b6d4', '#fbcfe8'],
    ['#fed7aa', '#1c1917', '#6b6260', '#16a34a', '#fdba74'],
    ['#e9d5ff', '#1f1717', '#7a6a7a', '#facc15', '#d8b4fe'],
    ['#fef9c3', '#1c1917', '#7d7567', '#dc2626', '#fef08a'],
    ['#bae6fd', '#0f172a', '#64748b', '#ec4899', '#7dd3fc'],
    ['#fce7f3', '#1f1717', '#7a6a6e', '#7c3aed', '#fbcfe8'],
    ['#dcfce7', '#1c1917', '#6b7280', '#f43f5e', '#bbf7d0'],
    ['#fff1f2', '#1a0e10', '#806a6e', '#22d3ee', '#ffe4e6'],
    ['#fffbeb', '#1c1917', '#78716c', '#3b82f6', '#fef3c7'],
    ['#fed7aa', '#1c1110', '#7d6058', '#0ea5e9', '#fdba74'],
    ['#e0e7ff', '#1e1b4b', '#6b7280', '#f97316', '#c7d2fe'],
    ['#fef3c7', '#0f1419', '#5d6e7e', '#dc2626', '#fde68a'],
    ['#fce7f3', '#1c1917', '#7a6a6e', '#16a34a', '#fbcfe8'],
    ['#a7f3d0', '#0f172a', '#475569', '#f59e0b', '#6ee7b7'],
    ['#fed7aa', '#1f1717', '#7a6260', '#7c3aed', '#fdba74'],
    ['#ffe4e6', '#1c1917', '#6b5d5d', '#84cc16', '#fecdd3'],
    ['#fef3c7', '#1c1917', '#6b6260', '#ec4899', '#fde68a'],
  ],
  vintage: [
    ['#f0e3c8', '#221912', '#7e6e58', '#704220', '#e5d6b5'],
    ['#ede0b8', '#1f1814', '#76685a', '#3e5934', '#e3d4a5'],
    ['#f5e8c8', '#1d1814', '#7d685a', '#854d0e', '#ebdfb8'],
    ['#f0e3a0', '#251f14', '#766850', '#a04621', '#e5d28e'],
    ['#e8c98f', '#1f1814', '#7c6850', '#3e5934', '#dec07e'],
    ['#d4a574', '#1a1410', '#7c6852', '#3e2818', '#c8965f'],
    ['#c19a6b', '#1a1410', '#766852', '#3e2818', '#b88955'],
    ['#e8d4a8', '#1f1814', '#7a6e58', '#854d0e', '#decd9a'],
    ['#fce4d0', '#2a1f1f', '#7a6e6e', '#5b8aa8', '#f5d7c0'],
    ['#ffd5c8', '#2a1f1f', '#7a6e6e', '#3e4d5b', '#f5c2b5'],
    ['#e8d4d4', '#1c1414', '#7a6e6e', '#5b6e8a', '#dec8c8'],
    ['#e8c5a5', '#1c1414', '#76685c', '#5b3e1a', '#dec095'],
    ['#d8b896', '#1f1814', '#7a6c58', '#3e4d5b', '#cbab83'],
    ['#e0b870', '#1a1410', '#766852', '#3e2818', '#d4a85e'],
    ['#f0c590', '#221814', '#7c6c54', '#5b3e1a', '#e3b87a'],
    ['#d8a878', '#1a1410', '#766852', '#3e2818', '#c89665'],
    ['#a89978', '#0f0a08', '#5d5546', '#3e2818', '#988a6c'],
    ['#8a7f5e', '#0a0805', '#4d4636', '#1f1410', '#7e735a'],
    ['#9a8762', '#0f0a08', '#594f3e', '#2a1810', '#8c7a56'],
    ['#a89070', '#0a0805', '#5d5040', '#1f1410', '#988260'],
    ['#736548', '#0a0805', '#4a4030', '#1c1208', '#5d513a'],
    ['#d4b896', '#1a1410', '#766852', '#3e2818', '#c4a878'],
    ['#fbf3d8', '#1c1612', '#7d6e54', '#7e3f1a', '#f0e6c5'],
    ['#f5ead8', '#1c1610', '#7d6e58', '#854d0e', '#ebdfc0'],
    ['#ede4ba', '#221b15', '#7c6e52', '#a04621', '#e3d6a5'],
  ],
  futuristic: [
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#22d3ee', '#1a1a1a'],
    ['#0d0d14', '#fafafa', '#a3a3b3', '#a855f7', '#1a1a25'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#10b981', '#1a1a1a'],
    ['#0a0014', '#fafafa', '#a3a3b3', '#ec4899', '#15001f'],
    ['#0a0a14', '#fafafa', '#a3a3b3', '#3b82f6', '#15151f'],
    ['#0d0a14', '#fafafa', '#a3a3b3', '#fbbf24', '#181522'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#06b6d4', '#1a1a1a'],
    ['#0d0d0d', '#fafafa', '#a3a3a3', '#84cc16', '#1a1a1a'],
    ['#0a0014', '#fafafa', '#a3a3b3', '#fb7185', '#15001f'],
    ['#0a0a0f', '#fafafa', '#a3a3a8', '#22d3ee', '#15151a'],
    ['#0d0d14', '#fafafa', '#a3a3b3', '#9333ea', '#1a1a25'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#f59e0b', '#1a1a1a'],
    ['#0a1414', '#fafafa', '#a3a8a8', '#22d3ee', '#152525'],
    ['#0a0a14', '#fafafa', '#a3a3b3', '#84cc16', '#15151f'],
    ['#0d0814', '#fafafa', '#a3a3b3', '#a855f7', '#1a1525'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#0ea5e9', '#1a1a1a'],
    ['#0a0a14', '#fafafa', '#a3a3b3', '#ec4899', '#15151f'],
    ['#0a0d0a', '#fafafa', '#a3a8a3', '#22c55e', '#15201a'],
    ['#0a0a14', '#fafafa', '#a3a3b3', '#06b6d4', '#15151f'],
    ['#0d0a14', '#fafafa', '#a3a3b3', '#fbbf24', '#181525'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#d946ef', '#1a1a1a'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#7c3aed', '#1a1a1a'],
    ['#0a0a14', '#fafafa', '#a3a3b3', '#facc15', '#15151f'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#14b8a6', '#1a1a1a'],
    ['#0d0a14', '#fafafa', '#a3a3b3', '#22c55e', '#181525'],
  ],
}

// Curated locked combos — palette + fonts pre-paired
const CURATED_PRESETS = [
  { name: 'NYT Editorial', palette: ['#f5efe6', '#1f1a16', '#6b5a4d', '#8b1a1a', '#ece4d4'], display: 'Fraunces', body: 'DM Sans' },
  { name: 'Linear Dark', palette: ['#0a0a0a', '#fafafa', '#a3a3a3', '#9d4edd', '#1a1a1a'], display: 'Inter Tight', body: 'Inter Tight' },
  { name: 'Stripe Classic', palette: ['#ffffff', '#0a0a0a', '#737373', '#635bff', '#f5f5f5'], display: 'Inter Tight', body: 'Inter Tight' },
  { name: 'Vercel Pure', palette: ['#0a0a0a', '#fafafa', '#a3a3a3', '#fafafa', '#1a1a1a'], display: 'Manrope', body: 'Manrope' },
  { name: 'Apple Modern', palette: ['#ffffff', '#1d1d1f', '#86868b', '#0066cc', '#f5f5f7'], display: 'Manrope', body: 'Manrope' },
  { name: 'Brutalist Bold', palette: ['#fafafa', '#0a0a0a', '#737373', '#ff0000', '#f5f5f5'], display: 'Archivo Black', body: 'Karla' },
  { name: 'Editorial Magazine', palette: ['#f5efe6', '#1a1411', '#7a6c5e', '#7c2d12', '#ece4d4'], display: 'Playfair Display', body: 'Karla' },
  { name: 'Warm Bistro', palette: ['#f5efe6', '#1f1a16', '#6b5a4d', '#94632d', '#ece4d4'], display: 'Crimson Pro', body: 'Manrope' },
  { name: 'Minimal Studio', palette: ['#f5f5f4', '#1c1917', '#78716c', '#1c1917', '#e7e5e4'], display: 'Inter Tight', body: 'Inter Tight' },
  { name: 'Luxury Brand', palette: ['#0d0d0d', '#e5dbc0', '#7d7361', '#d4af37', '#1a1916'], display: 'Cormorant Garamond', body: 'Karla' },
  { name: 'Tech Startup', palette: ['#fafafa', '#0a0a0a', '#737373', '#3b82f6', '#f5f5f5'], display: 'Plus Jakarta Sans', body: 'Plus Jakarta Sans' },
  { name: 'Cyberpunk', palette: ['#0a0a0a', '#fafafa', '#a3a3a3', '#22d3ee', '#1a1a1a'], display: 'Space Grotesk', body: 'Sora' },
  { name: 'Wellness Studio', palette: ['#f4f1ea', '#1d201d', '#6b6d68', '#7a8870', '#ebe6dc'], display: 'Lora', body: 'Manrope' },
  { name: 'Boutique Femme', palette: ['#fce7f3', '#1f1717', '#7a6a6e', '#1c1917', '#fbcfe8'], display: 'DM Serif Display', body: 'DM Sans' },
  { name: 'Premium Hotel', palette: ['#0c1116', '#e8edf2', '#8b97a5', '#d4af37', '#161d24'], display: 'Cormorant Garamond', body: 'DM Sans' },
  { name: 'Editorial Cool', palette: ['#f5efe6', '#1f1a16', '#6b5a4d', '#0f3d2e', '#ece4d4'], display: 'EB Garamond', body: 'Inter Tight' },
  { name: 'Fashion Forward', palette: ['#f5f0e8', '#1a1411', '#7a6c5e', '#1a1411', '#ebe2d2'], display: 'Instrument Serif', body: 'Inter Tight' },
  { name: 'Indie Magazine', palette: ['#fef3c7', '#1c1917', '#7d7567', '#dc2626', '#fef08a'], display: 'Bricolage Grotesque', body: 'Manrope' },
  { name: 'Sustainable Brand', palette: ['#eef0ec', '#1f2937', '#6b7280', '#5b8b6f', '#dde2dc'], display: 'Cardo', body: 'Karla' },
  { name: 'Bold Editorial', palette: ['#0a0a0a', '#f5f0e8', '#8a8478', '#fbbf24', '#1c1c1c'], display: 'Big Shoulders Display', body: 'Manrope' },
]

const FONT_PAIRS = [
  // Editorial / serif display + clean body
  { display: 'Fraunces', body: 'DM Sans', vibes: ['editorial', 'premium', 'warm'] },
  { display: 'Fraunces', body: 'Manrope', vibes: ['editorial', 'premium', 'calm'] },
  { display: 'Crimson Pro', body: 'Manrope', vibes: ['warm', 'calm', 'editorial'] },
  { display: 'Crimson Pro', body: 'Inter Tight', vibes: ['warm', 'editorial'] },
  { display: 'Playfair Display', body: 'Karla', vibes: ['premium', 'editorial'] },
  { display: 'Playfair Display', body: 'Inter Tight', vibes: ['premium', 'editorial'] },
  { display: 'DM Serif Display', body: 'DM Sans', vibes: ['editorial', 'warm', 'premium'] },
  { display: 'Cormorant Garamond', body: 'Karla', vibes: ['premium', 'editorial'] },
  { display: 'Instrument Serif', body: 'Inter Tight', vibes: ['editorial', 'premium'] },
  { display: 'Spectral', body: 'Karla', vibes: ['warm', 'editorial', 'calm'] },
  { display: 'EB Garamond', body: 'Inter Tight', vibes: ['premium', 'editorial'] },
  { display: 'Libre Caslon Text', body: 'Karla', vibes: ['premium', 'editorial', 'calm'] },
  { display: 'Cardo', body: 'Outfit', vibes: ['warm', 'editorial', 'calm'] },
  { display: 'Domine', body: 'Karla', vibes: ['warm', 'editorial'] },
  { display: 'Lora', body: 'Manrope', vibes: ['warm', 'calm'] },
  { display: 'Lora', body: 'Karla', vibes: ['warm', 'calm'] },
  { display: 'Source Serif 4', body: 'Source Sans 3', vibes: ['editorial', 'calm', 'modern'] },

  // Bold display
  { display: 'Big Shoulders Display', body: 'Manrope', vibes: ['bold', 'modern'] },
  { display: 'Big Shoulders Display', body: 'Inter Tight', vibes: ['bold', 'modern'] },
  { display: 'Archivo Black', body: 'Archivo', vibes: ['bold', 'modern'] },
  { display: 'Anton', body: 'Karla', vibes: ['bold', 'editorial'] },
  { display: 'Bebas Neue', body: 'Inter Tight', vibes: ['bold', 'modern'] },
  { display: 'Oswald', body: 'Open Sans', vibes: ['bold', 'modern'] },

  // Modern sans-only
  { display: 'Bricolage Grotesque', body: 'Manrope', vibes: ['modern', 'calm', 'bold'] },
  { display: 'Outfit', body: 'Inter Tight', vibes: ['modern', 'calm'] },
  { display: 'Plus Jakarta Sans', body: 'Plus Jakarta Sans', vibes: ['modern', 'bold'] },
  { display: 'Sora', body: 'Sora', vibes: ['modern', 'calm'] },
  { display: 'Hanken Grotesk', body: 'Hanken Grotesk', vibes: ['modern', 'calm', 'bold'] },
  { display: 'Work Sans', body: 'Work Sans', vibes: ['modern', 'calm'] },
  { display: 'Space Grotesk', body: 'Inter Tight', vibes: ['modern', 'bold'] },

  // More editorial variants
  { display: 'Cormorant Garamond', body: 'Inter Tight', vibes: ['premium', 'editorial'] },
  { display: 'Cormorant Garamond', body: 'Manrope', vibes: ['premium', 'editorial', 'calm'] },
  { display: 'Cormorant Garamond', body: 'DM Sans', vibes: ['premium', 'editorial'] },
  { display: 'Cardo', body: 'Karla', vibes: ['warm', 'editorial', 'calm'] },
  { display: 'Cardo', body: 'Manrope', vibes: ['warm', 'editorial', 'calm'] },
  { display: 'DM Serif Display', body: 'Karla', vibes: ['editorial', 'warm', 'premium'] },
  { display: 'DM Serif Display', body: 'Manrope', vibes: ['editorial', 'warm', 'premium'] },
  { display: 'Instrument Serif', body: 'Karla', vibes: ['editorial', 'premium', 'warm'] },
  { display: 'Instrument Serif', body: 'DM Sans', vibes: ['editorial', 'premium', 'warm'] },
  { display: 'Tinos', body: 'Karla', vibes: ['editorial', 'calm'] },
  { display: 'Tinos', body: 'Inter Tight', vibes: ['editorial', 'modern'] },
  { display: 'Spectral', body: 'Inter Tight', vibes: ['warm', 'editorial'] },
  { display: 'Spectral', body: 'Manrope', vibes: ['warm', 'editorial', 'calm'] },
  { display: 'Crimson Text', body: 'Karla', vibes: ['warm', 'editorial', 'calm'] },
  { display: 'Old Standard TT', body: 'Karla', vibes: ['editorial', 'premium'] },

  // More sans-only
  { display: 'Inter Tight', body: 'Inter Tight', vibes: ['modern', 'calm'] },
  { display: 'Manrope', body: 'Manrope', vibes: ['modern', 'calm'] },
  { display: 'DM Sans', body: 'DM Sans', vibes: ['modern', 'calm'] },
  { display: 'Karla', body: 'Karla', vibes: ['modern', 'calm', 'warm'] },
  { display: 'Outfit', body: 'Outfit', vibes: ['modern', 'calm', 'bold'] },
  { display: 'Outfit', body: 'Karla', vibes: ['modern', 'calm'] },

  // More bold
  { display: 'Anton', body: 'Inter Tight', vibes: ['bold', 'editorial'] },
  { display: 'Bebas Neue', body: 'Karla', vibes: ['bold', 'editorial'] },
  { display: 'Oswald', body: 'Karla', vibes: ['bold', 'modern'] },
  { display: 'Archivo Black', body: 'Karla', vibes: ['bold', 'modern'] },
  { display: 'Archivo Black', body: 'Inter Tight', vibes: ['bold', 'modern'] },
  { display: 'Big Shoulders Display', body: 'Karla', vibes: ['bold', 'editorial'] },

  // More warm/elegant
  { display: 'Fraunces', body: 'Inter Tight', vibes: ['editorial', 'premium', 'warm'] },
  { display: 'Fraunces', body: 'Karla', vibes: ['editorial', 'warm', 'calm'] },
  { display: 'Lora', body: 'Inter Tight', vibes: ['warm', 'calm'] },
  { display: 'Lora', body: 'DM Sans', vibes: ['warm', 'calm'] },
  { display: 'Crimson Pro', body: 'Karla', vibes: ['warm', 'calm', 'editorial'] },
  { display: 'Crimson Pro', body: 'DM Sans', vibes: ['warm', 'calm'] },
  { display: 'Playfair Display', body: 'Manrope', vibes: ['premium', 'editorial'] },
  { display: 'Playfair Display', body: 'DM Sans', vibes: ['premium', 'editorial', 'warm'] },
  { display: 'EB Garamond', body: 'Karla', vibes: ['premium', 'editorial', 'warm'] },
  { display: 'EB Garamond', body: 'Manrope', vibes: ['premium', 'editorial'] },
  { display: 'Libre Caslon Text', body: 'Inter Tight', vibes: ['premium', 'editorial'] },
  { display: 'Libre Caslon Text', body: 'Manrope', vibes: ['premium', 'editorial', 'calm'] },
]

const VIBES = [
  { id: 'any', label: 'Any', desc: 'A random vibe each shuffle — surprise me' },
  { id: 'curated', label: 'Curated ✦', desc: '20 hand-paired presets where palette and fonts are locked together' },
  { id: 'premium', label: 'Premium', desc: 'Dark, sophisticated — luxury brand, fine dining, high-end studio' },
  { id: 'calm', label: 'Calm', desc: 'Soft, peaceful — wellness, yoga, spa, therapist' },
  { id: 'bold', label: 'Bold', desc: 'High contrast, attention-grabbing — bold startups, statements' },
  { id: 'warm', label: 'Warm', desc: 'Earthy tones — café, bakery, hospitality, artisans' },
  { id: 'modern', label: 'Modern', desc: 'Clean, tech-y — SaaS, startups, agencies' },
  { id: 'editorial', label: 'Editorial', desc: 'Magazine sophistication — design studios, publications' },
  { id: 'minimal', label: 'Minimal', desc: 'Mono or near-mono — galleries, minimalist brands' },
  { id: 'playful', label: 'Playful', desc: 'Bright, friendly — kids, food, lifestyle brands' },
  { id: 'vintage', label: 'Vintage', desc: 'Retro 70s/80s warm earth tones — heritage, craft' },
  { id: 'futuristic', label: 'Futuristic', desc: 'Dark + electric neon — tech, gaming, sci-fi' },
]

const VIBE_IDS = VIBES.filter((v) => v.id !== 'any' && v.id !== 'curated').map((v) => v.id)

function resolveVibe(selectedVibe) {
  if (selectedVibe === 'any') {
    return VIBE_IDS[Math.floor(Math.random() * VIBE_IDS.length)]
  }
  return selectedVibe
}

// -- Helpers --------------------------------------------------------------
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  const l = (max + min) / 2
  if (max === min) { h = s = 0 }
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break
      case g: h = ((b - r) / d + 2) * 60; break
      case b: h = ((r - g) / d + 4) * 60; break
      default: h = 0
    }
  }
  return [h, s * 100, l * 100]
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360
  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const k = (n + h / 30) % 12
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(c * 255).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function jitter(hex, range = { h: 4, s: 4, l: 2 }) {
  const [h, s, l] = hexToHsl(hex)
  const newH = h + (Math.random() * 2 - 1) * range.h
  const newS = s + (Math.random() * 2 - 1) * range.s
  const newL = l + (Math.random() * 2 - 1) * range.l
  return hslToHex(newH, newS, newL)
}

function generatePalette(vibe) {
  const actualVibe = resolveVibe(vibe)
  const seeds = SEED_PALETTES[actualVibe]
  const seed = seeds[Math.floor(Math.random() * seeds.length)]
  return seed.map((hex, i) => {
    // Slightly looser jitter than before so the same seed produces more
    // visibly different results between shuffles.
    const range = i < 2 ? { h: 3, s: 4, l: 2 } : { h: 10, s: 12, l: 5 }
    return jitter(hex, range)
  })
}

function pickFontPair(vibe) {
  if (vibe === 'any' || vibe === 'curated') {
    return FONT_PAIRS[Math.floor(Math.random() * FONT_PAIRS.length)]
  }
  const filtered = FONT_PAIRS.filter((p) => p.vibes.includes(vibe))
  const pool = filtered.length ? filtered : FONT_PAIRS
  return pool[Math.floor(Math.random() * pool.length)]
}

function pickCuratedPreset() {
  return CURATED_PRESETS[Math.floor(Math.random() * CURATED_PRESETS.length)]
}

// localStorage helpers
const STORAGE_KEY = 'sahari-brand-kit-saved'

function loadSaved() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persistSaved(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // ignore quota / privacy mode
  }
}

function kitKey(palette, display, body) {
  return [...palette, display, body].join('|')
}

function getContrastColor(bg) {
  const [, , l] = hexToHsl(bg)
  return l > 50 ? '#000000' : '#ffffff'
}

export default function BrandKit() {
  const [vibe, setVibe] = useState('any')
  const [palette, setPalette] = useState(() => generatePalette('any'))
  const [fontPair, setFontPair] = useState(() => pickFontPair('any'))
  const [presetName, setPresetName] = useState(null)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(loadSaved)
  const [savedOpen, setSavedOpen] = useState(false)

  const applyCombo = useCallback((newPalette, newFont, newPresetName = null) => {
    setPalette(newPalette)
    setFontPair(newFont)
    setPresetName(newPresetName)
  }, [])

  const regenerate = useCallback(() => {
    if (vibe === 'curated') {
      const preset = pickCuratedPreset()
      applyCombo(preset.palette, { display: preset.display, body: preset.body }, preset.name)
    } else {
      applyCombo(generatePalette(vibe), pickFontPair(vibe))
    }
  }, [vibe, applyCombo])

  useEffect(() => {
    if (vibe === 'curated') {
      const preset = pickCuratedPreset()
      applyCombo(preset.palette, { display: preset.display, body: preset.body }, preset.name)
    } else {
      applyCombo(generatePalette(vibe), pickFontPair(vibe))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vibe])

  const currentKey = kitKey(palette, fontPair.display, fontPair.body)
  const isCurrentSaved = saved.some((s) => s.key === currentKey)

  const toggleSave = useCallback(() => {
    if (isCurrentSaved) {
      const next = saved.filter((s) => s.key !== currentKey)
      setSaved(next)
      persistSaved(next)
    } else {
      const item = {
        key: currentKey,
        palette,
        display: fontPair.display,
        body: fontPair.body,
        name: presetName,
        savedAt: Date.now(),
      }
      const next = [item, ...saved]
      setSaved(next)
      persistSaved(next)
    }
  }, [isCurrentSaved, saved, currentKey, palette, fontPair, presetName])

  const removeSaved = useCallback((key) => {
    const next = saved.filter((s) => s.key !== key)
    setSaved(next)
    persistSaved(next)
  }, [saved])

  const applySaved = useCallback((item) => {
    applyCombo(item.palette, { display: item.display, body: item.body }, item.name)
    setSavedOpen(false)
  }, [applyCombo])

  useEffect(() => {
    const onKey = (e) => {
      if (savedOpen) return
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        regenerate()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [regenerate, savedOpen])

  useEffect(() => {
    const id = 'brand-kit-fonts'
    let link = document.getElementById(id)
    if (!link) {
      link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    const displayParam = fontPair.display.replace(/\s+/g, '+')
    const bodyParam = fontPair.body.replace(/\s+/g, '+')
    const sameFont = fontPair.display === fontPair.body
    link.href = sameFont
      ? `https://fonts.googleapis.com/css2?family=${displayParam}:wght@400;500;600;700;800&display=swap`
      : `https://fonts.googleapis.com/css2?family=${displayParam}:wght@400;500;600;700;800&family=${bodyParam}:wght@400;500;600;700&display=swap`
  }, [fontPair])

  useEffect(() => {
    document.title = 'Brand Kit Generator · Sahari Tools'
  }, [])

  const copyCSS = () => {
    const css = `:root {
  --color-bg: ${palette[0]};
  --color-text: ${palette[1]};
  --color-muted: ${palette[2]};
  --color-accent: ${palette[3]};
  --color-surface: ${palette[4]};
  --font-display: "${fontPair.display}", serif;
  --font-body: "${fontPair.body}", sans-serif;
}`
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const [bg, text, muted, accent, surface] = palette
  const buttonTextColor = getContrastColor(accent)

  const swatches = [
    { label: 'Background', hex: palette[0] },
    { label: 'Text', hex: palette[1] },
    { label: 'Muted', hex: palette[2] },
    { label: 'Accent', hex: palette[3] },
    { label: 'Surface', hex: palette[4] },
  ]

  return (
    <div className="h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col overflow-hidden" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Top bar */}
      <header className="border-b border-white/5 backdrop-blur bg-[#0a0a0a]/85 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs md:text-sm">
            <ArrowLeft size={14} />
            <span>Sahari</span>
          </Link>
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-amber-400 font-semibold">
            Brand Kit Generator
          </span>
          <span className="hidden md:block text-xs text-zinc-500">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">space</kbd> to shuffle
          </span>
        </div>
      </header>

      {/* Vibe + actions row */}
      <div className="border-b border-white/5 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center gap-2 md:gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {VIBES.map((v) => (
              <div key={v.id} className="relative group">
                <button
                  onClick={() => setVibe(v.id)}
                  title={v.desc}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                    vibe === v.id
                      ? 'bg-amber-400 text-black'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {v.label}
                </button>
                <div
                  className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1a1a1a] border border-white/15 rounded-lg text-xs text-zinc-200 w-56 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-xl z-50 text-center leading-snug"
                  role="tooltip"
                >
                  {v.desc}
                  <span
                    aria-hidden
                    className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 -mt-1 rotate-45 bg-[#1a1a1a] border-r border-b border-white/15"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={regenerate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded-lg text-xs md:text-sm font-medium hover:bg-zinc-200 transition-all"
            >
              <RefreshCw size={12} />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
            <button
              onClick={toggleSave}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all border ${
                isCurrentSaved
                  ? 'bg-amber-400/10 border-amber-400/40 text-amber-300 hover:bg-amber-400/20'
                  : 'bg-white/5 border-white/10 text-zinc-200 hover:bg-white/10'
              }`}
              title={isCurrentSaved ? 'Remove from saved' : 'Save this kit'}
            >
              <Heart size={12} fill={isCurrentSaved ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline">{isCurrentSaved ? 'Saved' : 'Save'}</span>
            </button>
            {saved.length > 0 && (
              <button
                onClick={() => setSavedOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-zinc-200 border border-white/10 rounded-lg text-xs md:text-sm font-medium hover:bg-white/10 transition-all"
              >
                <Bookmark size={12} />
                <span>{saved.length}</span>
              </button>
            )}
            <button
              onClick={copyCSS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-zinc-200 border border-white/10 rounded-lg text-xs md:text-sm font-medium hover:bg-white/10 transition-all"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy CSS'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main split */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_360px] overflow-hidden">
        {/* Preview */}
        <motion.div
          key={`${vibe}-${palette[0]}-${fontPair.display}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-y-auto"
          style={{ backgroundColor: bg, color: text }}
        >
          <div className="p-6 md:p-10 lg:p-12 h-full flex flex-col">
            {/* Mini "navbar" */}
            <div
              className="flex items-center justify-between mb-10 md:mb-14"
              style={{ fontFamily: `"${fontPair.body}", sans-serif` }}
            >
              <span
                style={{ fontFamily: `"${fontPair.display}", serif`, fontWeight: 700 }}
                className="text-base md:text-lg tracking-tight"
              >
                Your Brand
              </span>
              <nav className="hidden sm:flex items-center gap-5 text-[10px] tracking-widest uppercase" style={{ color: muted }}>
                <span>Work</span>
                <span>About</span>
                <span>Contact</span>
              </nav>
              <span
                className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1.5 rounded-md"
                style={{ backgroundColor: accent, color: buttonTextColor }}
              >
                Book
              </span>
            </div>

            {/* Hero */}
            <div className="max-w-2xl flex-1">
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-4"
                style={{ color: accent, fontFamily: `"${fontPair.body}", sans-serif`, fontWeight: 600 }}
              >
                ¶ {presetName || 'A real layout'}
              </p>
              <h2
                style={{
                  fontFamily: `"${fontPair.display}", serif`,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                }}
                className="text-4xl md:text-6xl lg:text-7xl mb-5"
              >
                Made by hand,<br />
                <span style={{ color: accent, fontStyle: 'italic', fontWeight: 400 }}>for real.</span>
              </h2>
              <p
                style={{ color: muted, fontFamily: `"${fontPair.body}", sans-serif` }}
                className="text-sm md:text-base leading-relaxed mb-6 max-w-lg"
              >
                This is how your palette and typography look together on a
                real page. Hit space to try another combination, or pick a
                different vibe above.
              </p>
              <div className="flex flex-wrap items-center gap-3" style={{ fontFamily: `"${fontPair.body}", sans-serif` }}>
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: accent, color: buttonTextColor }}
                >
                  Primary action
                  <ArrowRight size={13} />
                </button>
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border"
                  style={{ borderColor: muted, color: text }}
                >
                  Secondary
                </button>
              </div>
            </div>

            {/* Surface sample at the bottom */}
            <div
              className="mt-8 p-5 rounded-xl flex items-center gap-4"
              style={{ backgroundColor: surface }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: accent, color: buttonTextColor }}
              >
                01
              </div>
              <div>
                <p
                  style={{ fontFamily: `"${fontPair.display}", serif`, fontWeight: 600 }}
                  className="text-base md:text-lg leading-tight"
                >
                  Surface card
                </p>
                <p
                  style={{ color: muted, fontFamily: `"${fontPair.body}", sans-serif` }}
                  className="text-xs md:text-sm"
                >
                  This is how a card or callout looks on this palette.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: specs */}
        <aside className="border-t lg:border-t-0 lg:border-l border-white/5 bg-[#0d0d0d] overflow-y-auto">
          <div className="p-5 md:p-6 space-y-6">
            {/* Palette */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-400 mb-3 font-semibold">
                Palette
              </p>
              <div className="space-y-2">
                {swatches.map((swatch) => (
                  <button
                    key={swatch.label}
                    onClick={() => navigator.clipboard.writeText(swatch.hex)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    title="Click to copy"
                  >
                    <div
                      className="w-9 h-9 rounded-md border border-white/10 flex-shrink-0"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className="flex-1 flex items-baseline justify-between min-w-0">
                      <span className="text-xs text-zinc-400">{swatch.label}</span>
                      <span className="text-xs font-mono text-zinc-500 tabular-nums group-hover:text-zinc-300">
                        {swatch.hex}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Typography */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-400 mb-3 font-semibold">
                Typography
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Display</p>
                  <p
                    className="text-xl text-white leading-tight truncate"
                    style={{ fontFamily: `"${fontPair.display}", serif`, fontWeight: 700 }}
                  >
                    {fontPair.display}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Body</p>
                  <p
                    className="text-base text-white truncate"
                    style={{ fontFamily: `"${fontPair.body}", sans-serif` }}
                  >
                    {fontPair.body}
                  </p>
                </div>
                <a
                  href={`https://fonts.google.com/?query=${encodeURIComponent(fontPair.display)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs transition-colors"
                >
                  Find on Google Fonts
                  <ArrowRight size={11} />
                </a>
              </div>
            </section>

            {/* Sahari CTA */}
            <section className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-4">
              <p
                className="text-sm font-semibold text-white mb-2 leading-snug"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Like the vibe? I can build a real site with it.
              </p>
              <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                Sahari builds custom websites from DKK 4,995.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-zinc-200 text-black font-medium rounded-lg text-xs transition-all"
              >
                See pricing
                <ArrowRight size={12} />
              </Link>
            </section>
          </div>
        </aside>
      </div>

      {/* Saved panel */}
      <AnimatePresence>
        {savedOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSavedOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0d0d0d] border-l border-white/10 flex flex-col"
            >
              <header className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-semibold">Saved kits</p>
                  <p className="text-sm text-zinc-400 mt-0.5">{saved.length} stored locally</p>
                </div>
                <button
                  onClick={() => setSavedOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {saved.length === 0 ? (
                  <div className="text-center text-zinc-500 text-sm py-12">
                    Nothing saved yet. Hit <Heart size={12} className="inline align-text-bottom" /> on a kit you like.
                  </div>
                ) : (
                  saved.map((item) => (
                    <div
                      key={item.key}
                      className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden group hover:border-white/20 transition-colors"
                    >
                      <button
                        onClick={() => applySaved(item)}
                        className="w-full text-left"
                      >
                        <div className="flex">
                          {item.palette.map((hex, i) => (
                            <div
                              key={i}
                              className="flex-1 h-12"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>
                      </button>
                      <div className="px-4 py-3 flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          {item.name && (
                            <p className="text-xs text-amber-400 font-medium truncate">{item.name}</p>
                          )}
                          <p
                            className="text-sm text-white truncate"
                            style={{ fontFamily: `"${item.display}", serif` }}
                          >
                            {item.display}
                          </p>
                          <p
                            className="text-xs text-zinc-500 truncate"
                            style={{ fontFamily: `"${item.body}", sans-serif` }}
                          >
                            + {item.body}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => applySaved(item)}
                            className="px-2.5 py-1.5 bg-white text-black text-xs rounded-md hover:bg-zinc-200 font-medium"
                          >
                            Apply
                          </button>
                          <button
                            onClick={() => removeSaved(item.key)}
                            className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                            aria-label="Delete"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

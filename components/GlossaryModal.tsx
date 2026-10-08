'use client';

import React, { useState } from 'react';
import { GLOSSARY_DATA } from '@/lib/gameData';
import { BookOpen, Search, X } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  if (!isOpen) return null;

  const categories = [
    'Tất cả',
    'Triết học & Quy luật',
    'Giai cấp & Cách mạng',
    'Kinh tế & Quá độ',
    'Nhà nước & Xã hội',
  ];

  const filteredItems = GLOSSARY_DATA.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.significance.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-[#0d121b] border border-amber-900/60 p-6 shadow-2xl max-h-[85vh] flex flex-col rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-amber-200">
                Từ Điển Lý Luận Triết Học & XHCN Khoa Học
              </h2>
              <p className="text-xs text-stone-400">
                Tra cứu các khái niệm và quy luật lịch sử then chốt
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded flex items-center justify-center cursor-pointer border border-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="py-3 space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Tìm kiếm thuật ngữ (ví dụ: sứ mệnh, thặng dư, quá độ, dân chủ...)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/60 transition-colors"
            />
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium whitespace-nowrap rounded transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-stone-950 font-semibold'
                    : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto space-y-3 pr-1 flex-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              Không tìm thấy thuật ngữ phù hợp với từ khóa &ldquo;{searchTerm}&rdquo;
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 border border-stone-800 rounded bg-stone-900/40 hover:border-stone-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-semibold text-amber-300 text-xs sm:text-sm">{item.term}</h3>
                  <span className="text-[10px] text-stone-400 font-mono tracking-wide">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">{item.definition}</p>
                <div className="mt-2 text-[11px] text-stone-400 border-l-2 border-amber-500/50 pl-2.5">
                  <strong className="text-amber-300/90 font-medium">Ý nghĩa thực tiễn: </strong>
                  {item.significance}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded border border-stone-700 cursor-pointer"
          >
            Đóng Tra Cứu
          </button>
        </div>
      </div>
    </div>
  );
}

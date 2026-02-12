'use client';
import { useState } from 'react';
import { calculateDentPrice } from '../../lib/priceCalculator';
import { ImagePreview } from './ImagePreview'; // Importujeme naši novou komponentu
import { DENT_DIAMETERS } from './config';
import { parse } from 'path';

export default function FormPart({
    id,
    label,
    formData,
    onImageChange,
    onRemoveImage,
    onChange,
    onCheckboxChange,
    realPrice,
    hidePhotos = false,
}) {
    const [isOpen, setIsOpen] = useState(
        (parseInt(formData[`${id}Count`]) || 0) > 0
    );
    const images = formData[id] || [];
    const filledImages = images.filter((img) => img instanceof File);

    const canAddMore = filledImages.length < 5;

    const count = parseInt(formData[`${id}Count`]) || 0;
    const diameter = formData[`${id}Diameter`];

    const currentPrice = calculateDentPrice(
        count,
        diameter,
        formData[`${id}Alu`],
        formData[`${id}Lak`]
    );

    const hasNoImage = filledImages.length === 0;

    return (
        <div className="form-field border-b mb-10 bg-gray-50 p-4 rounded-xl shadow-sm transition-all duration-300">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    {/* Šipka indikující stav */}
                    <span
                        className={`text-maingreen transition-transform duration-300 ${
                            isOpen ? 'rotate-0' : '-rotate-90'
                        }`}
                    >
                        ▼
                    </span>
                    <div className="flex flex-col gap-0.5">
                        <p
                            className={`font-bold uppercase tracking-tight ${
                                count > 0 ? 'text-maingreen' : 'text-gray-600'
                            }`}
                        >
                            {label}
                        </p>
                    </div>
                </div>
                {currentPrice > 0 && (
                    <div className="flex flex-col items-end min-w-[160px] relative">
                        <span className="absolute bottom-4  px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold border border-green-200">
                            Orient. cena: {realPrice.toLocaleString()} Kč
                        </span>

                        {formData[`${id}Count`] > 0 &&
                            realPrice <
                                calculateDentPrice(
                                    parseInt(formData[`${id}Count`]),
                                    formData[`${id}Diameter`],
                                    formData[`${id}Alu`],
                                    formData[`${id}Lak`]
                                ) && (
                                <span className="absolute -bottom-1 text-[10px] text-orange-700 font-bold uppercase mt-1">
                                    Aktivována sleva 50%
                                </span>
                            )}
                    </div>
                )}
            </div>

            {/* Fotodokumentace - kompaktní zobrazení */}
            {isOpen && (
                <div>
                    {!hidePhotos && hasNoImage && count > 0 && (
                        <span className="text-[#8f2215] text-[9px] font-black uppercase tracking-tighter">
                            ⚠ Chybí foto
                        </span>
                    )}
                    {!hidePhotos && (
                        <div className="mb-6">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">
                                Fotodokumentace (max 5):
                            </p>
                            <div className="grid grid-cols-3 gap-2 items-center">
                                {/* Renderování existujících fotek */}
                                {images.map(
                                    (file, index) =>
                                        file instanceof File && (
                                            <ImagePreview
                                                key={`${id}-img-${index}`}
                                                file={file}
                                                onRemove={() =>
                                                    onRemoveImage(id, index)
                                                }
                                            />
                                        )
                                )}

                                {/* Slot pro přidání další fotky */}
                                {canAddMore && (
                                    <label className="h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-white hover:border-maingreen cursor-pointer transition-colors">
                                        <span className="text-2xl text-gray-400">
                                            +
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-bold">
                                            FOTO
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*; capture=camera"
                                            className="hidden"
                                            //capture="camera"
                                            onChange={(e) =>
                                                onImageChange(
                                                    id,
                                                    images.findIndex(
                                                        (img) => img === ''
                                                    ),
                                                    e.target.files[0]
                                                )
                                            }
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Parametry dílu */}
                    <div className="grid grid-cols-2 gap-4">
                        <label>
                            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                Počet důlků
                            </span>
                            <input
                                type="number"
                                name={`${id}Count`}
                                value={formData[`${id}Count`] || 0}
                                onChange={onChange}
                                className="w-full p-2 border rounded-lg bg-white h-[42px]"
                                min="0"
                            />
                        </label>
                        <label>
                            <span className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                Průměr
                            </span>
                            <select
                                name={`${id}Diameter`}
                                value={formData[`${id}Diameter`] || ''}
                                onChange={onChange}
                                className="w-full p-2 border rounded-lg bg-white h-[42px]"
                            >
                                <option value="" disabled>
                                    Vyberte...
                                </option>
                                {DENT_DIAMETERS.map((d) => (
                                    <option key={d} value={d}>
                                        {d} mm
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {/* Checkboxy - v jedné řadě pro úsporu místa */}
                    <div className="flex flex-wrap justify-between gap-4 mt-4 bg-white p-3 rounded-lg border border-gray-100">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name={`${id}Lak`}
                                checked={formData[`${id}Lak`] || false}
                                onChange={onCheckboxChange}
                                className="w-5 h-5 rounded border-gray-300 text-maingreen focus:ring-maingreen"
                            />
                            <span className="text-sm">Lakování</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name={`${id}Vymena`}
                                checked={formData[`${id}Vymena`] || false}
                                onChange={onCheckboxChange}
                                className="w-5 h-5 rounded border-gray-300 text-maingreen focus:ring-maingreen"
                            />
                            <span className="text-sm">Výměna</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name={`${id}Alu`}
                                checked={formData[`${id}Alu`] || false}
                                onChange={onCheckboxChange}
                                className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm text-orange-700 font-medium">
                                Hliník (+20%)
                            </span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}

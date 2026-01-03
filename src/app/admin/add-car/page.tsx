'use client'

import { addCar } from '@/actions/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddCarPage() {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen py-24 px-4 max-w-4xl mx-auto">
            <div className="mb-12">
                <Link href="/admin" className="flex items-center text-white/40 hover:text-gold transition-all group mb-8">
                    <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Retour au tableau de bord</span>
                </Link>
                <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">Administration</p>
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Nouveau <span className="text-gradient">Véhicule</span></h1>
            </div>

            <form action={addCar} className="space-y-12">
                {/* Image Upload Area */}
                <div className="relative">
                    <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Visuel du véhicule</p>
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                            relative h-80 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center
                            ${isDragging ? 'border-gold bg-gold/5 scale-[0.99]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'}
                        `}
                    >
                        <input
                            type="file"
                            name="image"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            required
                        />

                        {preview ? (
                            <>
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center">
                                        <ImageIcon className="h-4 w-4 mr-2" />
                                        Modifier l'image
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreview(null);
                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                    className="absolute top-4 right-4 bg-red-500/80 p-2 rounded-full hover:bg-red-500 transition-colors"
                                >
                                    <X className="h-4 w-4 text-white" />
                                </button>
                            </>
                        ) : (
                            <div className="text-center p-10">
                                <div className="bg-white/5 p-6 rounded-full inline-block mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                                    <Upload className="h-10 w-10 text-gold" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tighter">Glissez & Déposez</h3>
                                <p className="text-gray-500 text-sm font-light italic">ou cliquez pour parcourir vos fichiers (JPG, PNG)</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Fields Section */}
                <div className="glass-card rounded-[2.5rem] p-10 md:p-16 border border-white/10 shadow-3xl space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <label className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400 mb-3 block">Identité</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="brand" placeholder="Marque (ex: Ferrari)" className="bg-white/[0.03] border-white/10 h-14 rounded-xl px-6" required />
                                    <Input name="name" placeholder="Modèle (ex: SF90)" className="bg-white/[0.03] border-white/10 h-14 rounded-xl px-6" required />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400 mb-3 block">Catégorie & Transmission</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="category" placeholder="Style (ex: Hypercar)" className="bg-white/[0.03] border-white/10 h-14 rounded-xl px-6" required />
                                    <Input name="transmission" placeholder="Boîte (ex: Automatique)" className="bg-white/[0.03] border-white/10 h-14 rounded-xl px-6" required />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400 mb-3 block">Tarification Journalière</label>
                                <div className="relative">
                                    <Input type="number" name="pricePerDay" placeholder="0.00" className="bg-white/[0.03] border-white/10 h-14 rounded-xl px-6 pl-12 text-2xl font-black italic" required />
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gold font-bold">€</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400 mb-3 block">Spécifications Techniques</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest text-center">Puissance (ch)</p>
                                        <Input type="number" name="power" className="bg-white/[0.03] border-white/10 h-14 rounded-xl text-center font-bold" required />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest text-center">0-100 (s)</p>
                                        <Input type="number" step="0.1" name="acceleration" className="bg-white/[0.03] border-white/10 h-14 rounded-xl text-center font-bold" required />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest text-center">V-Max (km/h)</p>
                                        <Input type="number" name="maxSpeed" className="bg-white/[0.03] border-white/10 h-14 rounded-xl text-center font-bold" required />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400 mb-3 block">Histoire & Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Décrivez l'expérience au volant de ce monstre..."
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 min-h-[160px] resize-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-white/5">
                        <Button type="submit" className="btn-premium w-full h-16 text-lg tracking-[0.2em] uppercase italic">
                            Enregistrer dans la Flotte
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

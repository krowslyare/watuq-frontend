import React, { useState } from 'react';
import { mockEcosystems } from '@avp/mocks';
import type { Ecosystem } from '@avp/api-client';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import {
  Settings,
  Save,
  Palette,
  Image,
  Globe,
  Type,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EcosystemSettingsPage() {
  // Default to first ecosystem for mockup
  const eco = mockEcosystems[0];

  const [name, setName] = useState(eco.name);
  const [description, setDescription] = useState(eco.description);
  const [purpose, setPurpose] = useState(eco.purpose);
  const [primaryColor, setPrimaryColor] = useState(eco.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(eco.secondaryColor);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-text">Configuración del Ecosistema</h1>
        <p className="text-text-muted text-sm">
          Personalice la identidad visual y datos del ecosistema.
        </p>
      </div>

      {/* Datos Básicos */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-text-muted" />
          <h2 className="text-sm font-semibold text-text">Datos Básicos</h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Nombre del Ecosistema</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[100px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Propósito</label>
            <Input value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Image className="w-4 h-4 text-text-muted" />
          <h2 className="text-sm font-semibold text-text">Logo e Identidad</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-slate-50">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <span className="text-white font-bold text-sm">{name.split(' ').map(w => w[0]).join('').slice(0, 3)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-text-muted">
              Suba el logo del ecosistema. Recomendado: PNG transparente, 256×256px.
            </p>
            <Button variant="outline" size="sm">
              <Image className="w-4 h-4 mr-2" />
              Subir Logo
            </Button>
          </div>
        </div>
      </div>

      {/* Paleta de Colores */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-text-muted" />
          <h2 className="text-sm font-semibold text-text">Paleta de Colores</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Color Primario</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border border-border"
              />
              <div className="flex-1">
                <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                <p className="text-xs text-text-muted mt-1">Botones, links, header</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Color Secundario</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border border-border"
              />
              <div className="flex-1">
                <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                <p className="text-xs text-text-muted mt-1">Acentos, badges</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 p-4 rounded-lg border border-border bg-background">
          <p className="text-xs font-medium text-text-muted mb-3">Vista previa</p>
          <div className="flex items-center gap-3">
            <div className="h-10 px-4 rounded-md flex items-center text-white text-sm font-medium" style={{ backgroundColor: primaryColor }}>
              Botón Primario
            </div>
            <div className="h-10 px-4 rounded-md flex items-center text-white text-sm font-medium" style={{ backgroundColor: secondaryColor }}>
              Botón Secundario
            </div>
            <span className="text-sm font-medium" style={{ color: primaryColor }}>Link de ejemplo</span>
          </div>
        </div>
      </div>

      {/* Tipografía */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-4 h-4 text-text-muted" />
          <h2 className="text-sm font-semibold text-text">Tipografía</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Fuente Principal</label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <option>Inter</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Lato</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Fuente Títulos</label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <option>Inter</option>
              <option>Outfit</option>
              <option>Poppins</option>
              <option>Montserrat</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          {saved ? 'Guardado ✓' : 'Guardar Configuración'}
        </Button>
      </div>
    </motion.div>
  );
}

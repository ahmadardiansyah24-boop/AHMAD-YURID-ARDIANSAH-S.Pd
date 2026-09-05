import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { GeneratorView } from './components/GeneratorView';
import { PPMPreview } from './components/PPMPreview';
import { RiwayatView } from './components/RiwayatView';
import { TemplateView } from './components/TemplateView';
import { PanduanView } from './components/PanduanView';
import { CpanelPackageView } from './components/CpanelPackageView';
import { AdminConsoleView } from './components/AdminConsoleView';
import { SettingsView } from './components/SettingsView';
import { TentangView } from './components/TentangView';
import { PPMDocument, AppUser, GeneratorFormData } from './types';
import { PRESET_TEMPLATES, convertTemplateToPPM } from './data/templates';

const STORAGE_KEY = 'generator_ppm_pro_docs_v1';
const USER_KEY = 'generator_ppm_pro_user_v1';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // User Profile & Role State
  const [user, setUser] = useState<AppUser>(() => {
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return {
      id: 1,
      name: 'Ahmad Yurid Ardiansah, S.Pd.',
      email: 'ahmad.yurid@guru.kemdikbud.go.id',
      school: 'SMP Negeri 1 Sleman',
      nip: '198905142015031002',
      role: 'GURU'
    };
  });

  // PPM Documents State
  const [documents, setDocuments] = useState<PPMDocument[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    // Seed with the first 2 curated templates as ready-to-use documents
    return [convertTemplateToPPM(PRESET_TEMPLATES[1]), convertTemplateToPPM(PRESET_TEMPLATES[0])];
  });

  // Current Active PPM Document (for Preview)
  const [currentDocument, setCurrentDocument] = useState<PPMDocument | null>(() => {
    return convertTemplateToPPM(PRESET_TEMPLATES[1]); // default active preview
  });

  // Initial Generator Form State (when user clicks "Gunakan Template")
  const [generatorInitialData, setGeneratorInitialData] = useState<Partial<GeneratorFormData> | undefined>(undefined);

  // Persist Documents to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (e) {
      console.warn('Failed to save documents to localStorage:', e);
    }
  }, [documents]);

  // Persist User to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to save user to localStorage:', e);
    }
  }, [user]);

  // Role Switcher
  const handleToggleRole = () => {
    setUser((prev) => ({
      ...prev,
      role: prev.role === 'GURU' ? 'ADMIN' : 'GURU'
    }));
  };

  // Handler: Generated new PPM
  const handlePPMGenerated = (doc: PPMDocument) => {
    setDocuments((prev) => [doc, ...prev]);
    setCurrentDocument(doc);
    setActiveTab('preview');
  };

  // Handler: Open Preview for an existing document
  const handleOpenPPM = (doc: PPMDocument) => {
    setCurrentDocument(doc);
    setActiveTab('preview');
  };

  // Handler: Update an edited document
  const handleUpdateDocument = (updated: PPMDocument) => {
    setDocuments((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setCurrentDocument(updated);
  };

  // Handler: Duplicate PPM
  const handleDuplicatePPM = (doc: PPMDocument) => {
    const duplicated: PPMDocument = {
      ...doc,
      id: 'ppm-' + Date.now(),
      title: `${doc.title} (Salinan)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setDocuments((prev) => [duplicated, ...prev]);
    setCurrentDocument(duplicated);
    setActiveTab('preview');
  };

  // Handler: Delete PPM
  const handleDeletePPM = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (currentDocument?.id === id) {
      setCurrentDocument(null);
    }
  };

  // Handler: Use Template in Generator
  const handleUseTemplate = (formData: Partial<GeneratorFormData>) => {
    setGeneratorInitialData(formData);
    setActiveTab('generator');
  };

  // Handler: Preview a Template directly in the A4 Previewer
  const handlePreviewTemplateDoc = (doc: PPMDocument) => {
    setCurrentDocument(doc);
    setActiveTab('preview');
  };

  // Handler: Reset all local documents
  const handleClearAllDocs = () => {
    setDocuments([]);
    setCurrentDocument(null);
    localStorage.removeItem(STORAGE_KEY);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Header */}
      <Header
        user={user}
        onToggleRole={handleToggleRole}
        onNavigate={setActiveTab}
        activeTab={activeTab}
      />

      {/* Main Workspace Layout */}
      <div className={`flex-1 flex w-full mx-auto transition-all ${activeTab === 'preview' ? 'max-w-[1600px] px-2 sm:px-4' : 'max-w-7xl'}`}>
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          user={user}
          savedCount={documents.length}
          isOpenMobile={isMobileMenuOpen}
          onToggleMobile={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Dynamic Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {activeTab === 'dashboard' && (
            <DashboardView
              documents={documents}
              onNavigate={setActiveTab}
              onOpenPPM={handleOpenPPM}
              user={user}
            />
          )}

          {activeTab === 'generator' && (
            <GeneratorView
              onPPMGenerated={handlePPMGenerated}
              initialData={generatorInitialData}
              onCancel={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'preview' && currentDocument && (
            <PPMPreview
              document={currentDocument}
              onUpdateDocument={handleUpdateDocument}
              onBack={() => setActiveTab('riwayat')}
            />
          )}

          {activeTab === 'preview' && !currentDocument && (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-800">
                Tidak ada dokumen aktif yang dipilih untuk preview.
              </h3>
              <p className="text-xs text-slate-500">
                Silakan buat PPM baru atau pilih dari daftar Riwayat atau Template.
              </p>
              <button
                onClick={() => setActiveTab('generator')}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Buat PPM Baru
              </button>
            </div>
          )}

          {activeTab === 'riwayat' && (
            <RiwayatView
              documents={documents}
              onOpenPPM={handleOpenPPM}
              onDuplicatePPM={handleDuplicatePPM}
              onDeletePPM={handleDeletePPM}
              onCreateNew={() => {
                setGeneratorInitialData(undefined);
                setActiveTab('generator');
              }}
            />
          )}

          {activeTab === 'template' && (
            <TemplateView
              onUseTemplate={handleUseTemplate}
              onPreviewTemplateDoc={handlePreviewTemplateDoc}
            />
          )}

          {activeTab === 'panduan' && <PanduanView />}

          {activeTab === 'cpanel' && <CpanelPackageView />}

          {activeTab === 'admin' && user.role === 'ADMIN' && (
            <AdminConsoleView
              documents={documents}
              onClearAllDocs={handleClearAllDocs}
            />
          )}

          {activeTab === 'pengaturan' && (
            <SettingsView user={user} onUpdateUser={setUser} />
          )}

          {activeTab === 'tentang' && <TentangView />}
        </main>
      </div>

      {/* Official Footer (Hidden during printing) */}
      <footer className="no-print bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-bold text-slate-700">GENERATOR PPM PRO PREMIUM</span> • Perencanaan Pembelajaran Mendalam
          </div>
          <div className="font-semibold text-blue-700">
            © 2026 Generator PPM Pro Premium By Ahmad Yurid Ardiansah, S.Pd.
          </div>
        </div>
      </footer>
    </div>
  );
}

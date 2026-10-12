/**
 * Main Application Controller for HumanizeAI Platform
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Components
    const detector = new AIDetector();
    const humanizer = new TextHumanizer();
    const apiService = new ApiService();

    // 2. Application State
    const state = {
        inputText: '',
        outputText: '',
        tone: 'academic',
        intensity: 'ultra', // Default to Ultra for highest bypass rate
        lang: 'id',
        viewMode: 'raw', // 'raw', 'diff', 'analysis'
        engineMode: localStorage.getItem('humanize_engine_mode') || 'neural', // 'neural' or 'offline'
        history: [],
        theme: localStorage.getItem('humanize_theme') || 'system',
        // Document mode state
        activeDoc: null    // DocumentProcessor instance when a file is loaded
    };

    // 3. Cache DOM Elements
    const elements = {
        themeToggle: document.getElementById('themeToggle'),
        langSelect: document.getElementById('langSelect'),
        sourceText: document.getElementById('sourceText'),
        outputText: document.getElementById('outputText'),
        diffContainer: document.getElementById('diffContainer'),
        analysisContainer: document.getElementById('analysisContainer'),
        btnHumanize: document.getElementById('btnHumanize'),
        btnCopy: document.getElementById('btnCopy'),
        btnClear: document.getElementById('btnClear'),
        btnPaste: document.getElementById('btnPaste'),
        btnDownload: document.getElementById('btnDownload'),
        btnRehumanize: document.getElementById('btnRehumanize'),

        // Engine Mode Switcher
        modeBtnNeural: document.getElementById('modeBtnNeural'),
        modeBtnOffline: document.getElementById('modeBtnOffline'),
        engineStatusLabel: document.getElementById('engineStatusLabel'),
        
        // Stats
        inputWordCount: document.getElementById('inputWordCount'),
        inputCharCount: document.getElementById('inputCharCount'),
        outputWordCount: document.getElementById('outputWordCount'),
        outputCharCount: document.getElementById('outputCharCount'),
        
        // Gauge & Scores
        gaugeCircle: document.getElementById('gaugeCircle'),
        gaugeText: document.getElementById('gaugeText'),
        burstinessBadge: document.getElementById('burstinessBadge'),
        perplexityBadge: document.getElementById('perplexityBadge'),
        readabilityBadge: document.getElementById('readabilityBadge'),
        aiRiskScore: document.getElementById('aiRiskScore'),

        // View Tabs
        tabEditor: document.getElementById('tabEditor'),
        tabDiff: document.getElementById('tabDiff'),
        tabAnalysis: document.getElementById('tabAnalysis'),

        // Modals & Drawers
        btnOpenSettings: document.getElementById('btnOpenSettings'),
        modalSettings: document.getElementById('modalSettings'),
        btnCloseSettings: document.getElementById('btnCloseSettings'),
        btnSaveSettings: document.getElementById('btnSaveSettings'),
        apiProviderSelect: document.getElementById('apiProviderSelect'),
        apiKeyInput: document.getElementById('apiKeyInput'),
        apiModelInput: document.getElementById('apiModelInput'),
        
        btnOpenHistory: document.getElementById('btnOpenHistory'),
        modalHistory: document.getElementById('modalHistory'),
        btnCloseHistory: document.getElementById('btnCloseHistory'),
        historyList: document.getElementById('historyList'),
        btnClearHistory: document.getElementById('btnClearHistory'),

        // Support QRIS Modal
        btnOpenSupport: document.getElementById('btnOpenSupport'),
        btnOpenSupportCallout: document.getElementById('btnOpenSupportCallout'),
        modalSupport: document.getElementById('modalSupport'),
        btnCloseSupport: document.getElementById('btnCloseSupport'),
        btnCloseSupportBtn: document.getElementById('btnCloseSupportBtn'),

        // Samples
        sampleTuton: document.getElementById('sampleTuton'),
        sampleAcademic: document.getElementById('sampleAcademic'),
        sampleFormal: document.getElementById('sampleFormal'),
        sampleCasual: document.getElementById('sampleCasual'),

        toast: document.getElementById('toastNotification'),
        toastMessage: document.getElementById('toastMessage'),

        // Document Upload & Download
        btnUploadDoc:    document.getElementById('btnUploadDoc'),
        fileInput:       document.getElementById('fileInput'),
        activeFileBadge: document.getElementById('activeFileBadge'),
        activeFileName:  document.getElementById('activeFileName'),
        activeFileType:  document.getElementById('activeFileType'),
        btnClearDoc:     document.getElementById('btnClearDoc'),
        btnDownloadDoc:  document.getElementById('btnDownloadDoc'),
        btnDownloadTxt:  document.getElementById('btnDownloadTxt'),
        btnDownloadDocx: document.getElementById('btnDownloadDocx'),
        downloadMenu:    document.getElementById('downloadMenu'),
        downloadMenuWrap: document.getElementById('downloadMenuWrap'),

        // Settings, Two-Pass & Voice Profile
        twoPassCheckbox:     document.getElementById('twoPassCheckbox'),
        toggleVoiceProfile:  document.getElementById('toggleVoiceProfile'),
        voiceProfileAccordionHeader: document.getElementById('voiceProfileAccordionHeader'),
        voiceProfilePanel:   document.getElementById('voiceProfilePanel'),
        voiceProfileChevron: document.getElementById('voiceProfileChevron'),
        voiceProfileStatusBadge: document.getElementById('voiceProfileStatusBadge'),
        voiceProfileSubtitle: document.getElementById('voiceProfileSubtitle'),
        voiceProfileToggle:  document.getElementById('voiceProfileToggle'),
        voiceFormalitySelect: document.getElementById('voiceFormalitySelect'),
        voiceAudienceSelect: document.getElementById('voiceAudienceSelect'),
        voiceAudienceInput:  document.getElementById('voiceAudienceInput'),
        voicePreferredInput: document.getElementById('voicePreferredInput'),
        voiceAvoidInput:     document.getElementById('voiceAvoidInput'),
        voiceSampleTextarea: document.getElementById('voiceSampleTextarea'),
        btnResetVoiceProfile: document.getElementById('btnResetVoiceProfile'),
        btnClearApiConfig:   document.getElementById('btnClearApiConfig'),
        qualityStatusBadge:  document.getElementById('qualityStatusBadge'),

        // Mobile Header & Dropdown
        btnMobileMenu:       document.getElementById('btnMobileMenu'),
        mobileMenuDropdown:  document.getElementById('mobileMenuDropdown'),
        btnMobileHistory:    document.getElementById('btnMobileHistory'),
        btnMobileSupport:    document.getElementById('btnMobileSupport'),
        langSelectMobile:    document.getElementById('langSelectMobile')
    };

    // 4. Initialize Theme (3-Mode: system / light / dark)
    const systemMedia = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    function getEffectiveTheme(theme) {
        if (theme === 'system') {
            return (systemMedia && systemMedia.matches) ? 'dark' : 'light';
        }
        return theme;
    }

    function applyTheme(theme, showNotification = false) {
        state.theme = theme;
        localStorage.setItem('humanize_theme', theme);

        const effective = getEffectiveTheme(theme);
        if (effective === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Update Theme Toggle Icon & Tooltip
        const icon = document.getElementById('themeToggleIcon') || elements.themeToggle?.querySelector('i');
        if (icon) {
            let iconName = 'laptop';
            let titleText = 'Tema: Mengikuti Sistem (Klik untuk ganti)';
            if (theme === 'light') {
                iconName = 'sun';
                titleText = 'Tema: Terang (Klik untuk ganti)';
            } else if (theme === 'dark') {
                iconName = 'moon';
                titleText = 'Tema: Gelap (Klik untuk ganti)';
            }
            icon.setAttribute('data-lucide', iconName);
            if (elements.themeToggle) elements.themeToggle.setAttribute('title', titleText);
            if (window.lucide) lucide.createIcons();
        }

        // Update Settings Modal Theme Buttons Active State
        document.querySelectorAll('.settings-theme-btn').forEach(btn => {
            const choice = btn.getAttribute('data-theme-choice');
            if (choice === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (showNotification && typeof showToast === 'function') {
            const labelMap = {
                system: 'Mengikuti Sistem Perangkat',
                light: 'Terang (Light Mode)',
                dark: 'Gelap (Dark Mode)'
            };
            showToast(`Tema diubah: ${labelMap[theme] || theme}`);
        }
    }

    // Media query listener for system theme changes
    if (systemMedia) {
        systemMedia.addEventListener('change', () => {
            if (state.theme === 'system') {
                applyTheme('system', false);
            }
        });
    }

    // Toggle button in header cycles: system -> light -> dark -> system
    elements.themeToggle?.addEventListener('click', () => {
        const cycle = { system: 'light', light: 'dark', dark: 'system' };
        const next = cycle[state.theme] || 'system';
        applyTheme(next, true);
    });

    // Theme buttons inside settings modal
    document.querySelectorAll('.settings-theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const chosen = btn.getAttribute('data-theme-choice');
            if (chosen) {
                applyTheme(chosen, true);
            }
        });
    });

    applyTheme(state.theme);

    // 5. Load History from Storage
    function loadHistory() {
        try {
            const saved = localStorage.getItem('humanize_history_v1');
            state.history = saved ? JSON.parse(saved) : [];
        } catch (e) {
            state.history = [];
        }
    }

    function saveHistoryEntry(original, humanized, humanScore) {
        const item = {
            id: Date.now(),
            date: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
            original,
            humanized,
            humanScore,
            tone: state.tone,
            lang: state.lang
        };
        state.history.unshift(item);
        if (state.history.length > 20) state.history.pop();
        try {
            localStorage.setItem('humanize_history_v1', JSON.stringify(state.history));
        } catch (e) {}
    }

    loadHistory();

    // 6. UI Notification Toast
    let toastTimeout;
    function showToast(msg, type = 'success') {
        if (!elements.toast) return;
        clearTimeout(toastTimeout);
        elements.toastMessage.textContent = msg;
        elements.toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
        elements.toast.classList.add('opacity-100', 'translate-y-0');
        
        toastTimeout = setTimeout(() => {
            elements.toast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
            elements.toast.classList.remove('opacity-100', 'translate-y-0');
        }, 2800);
    }

    // 7. Circular Gauge Update (Honest Natural Quality Score)
    function updateScoreGauge(score) {
        if (!elements.gaugeCircle || !elements.gaugeText) return;
        const radius = 38;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (score / 100) * circumference;

        elements.gaugeCircle.style.strokeDasharray = `${circumference}`;
        elements.gaugeCircle.style.strokeDashoffset = `${offset}`;

        let color = '#10b981'; // Green for >= 80%
        if (score < 60) color = '#ef4444'; // Red
        else if (score < 80) color = '#6366f1'; // Indigo

        elements.gaugeCircle.style.stroke = color;
        elements.gaugeText.textContent = `${score}%`;
        elements.gaugeText.style.color = color;

        if (elements.aiRiskScore) {
            elements.aiRiskScore.textContent = `Indeks Kualitas Alami: ${score}/100`;
        }

        if (elements.qualityStatusBadge) {
            if (score >= 85) {
                elements.qualityStatusBadge.textContent = 'Mengalir Alami';
                elements.qualityStatusBadge.className = 'px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold';
            } else if (score >= 70) {
                elements.qualityStatusBadge.textContent = 'Cukup Alami';
                elements.qualityStatusBadge.className = 'px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold';
            } else {
                elements.qualityStatusBadge.textContent = 'Perlu Penyelarasan';
                elements.qualityStatusBadge.className = 'px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold';
            }
        }
    }

    // 8. Text Input Counting & Live Analysis
    function updateInputStats() {
        const text = elements.sourceText.value || '';
        state.inputText = text;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        elements.inputWordCount.textContent = `${words} kata`;
        elements.inputCharCount.textContent = `${text.length} karakter`;

        if (words === 0) {
            updateScoreGauge(88);
            return;
        }

        const analysis = detector.analyze(text);
        if (!elements.outputText.value) {
            updateScoreGauge(analysis.qualityScore);
            updateMetricBadges(analysis);
        }
    }

    function updateMetricBadges(analysis) {
        if (elements.burstinessBadge) {
            elements.burstinessBadge.textContent = analysis.burstiness.label;
            elements.burstinessBadge.className = `inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                analysis.burstiness.sd >= 6.0
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : (analysis.burstiness.sd >= 3.5
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300')
            }`;
        }
        if (elements.perplexityBadge) {
            elements.perplexityBadge.textContent = analysis.perplexity.label;
            elements.perplexityBadge.className = `inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                analysis.perplexity.ttr >= 0.55
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : (analysis.perplexity.ttr >= 0.40
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300')
            }`;
        }
        if (elements.readabilityBadge) {
            elements.readabilityBadge.textContent = analysis.readability;
        }
    }

    elements.sourceText?.addEventListener('input', updateInputStats);

    // Engine Mode Switcher Logic
    function applyEngineMode(mode, silent = false) {
        state.engineMode = mode;
        localStorage.setItem('humanize_engine_mode', mode);

        if (mode === 'neural') {
            elements.modeBtnNeural?.classList.add('active');
            elements.modeBtnNeural?.classList.remove('text-slate-600', 'dark:text-slate-300');
            elements.modeBtnOffline?.classList.remove('active');
            elements.modeBtnOffline?.classList.add('text-slate-600', 'dark:text-slate-300');

            const hasApiKey = !!apiService.config.apiKey && apiService.config.provider !== 'offline';
            if (elements.engineStatusLabel) {
                elements.engineStatusLabel.textContent = hasApiKey
                    ? `Mode Neural AI Aktif (${apiService.config.provider.toUpperCase()} LLM Cloud)`
                    : "Mode Neural AI (API Key belum diisi di Pengaturan)";
            }
            if (!silent) {
                if (hasApiKey) {
                    showToast(`Mode Neural AI Aktif: Terhubung ke ${apiService.config.provider.toUpperCase()}`);
                } else {
                    showToast("Mode Neural AI dipilih. Buka Pengaturan untuk memasukkan API Key.", "warning");
                }
            }
        } else {
            elements.modeBtnOffline?.classList.add('active');
            elements.modeBtnOffline?.classList.remove('text-slate-600', 'dark:text-slate-300');
            elements.modeBtnNeural?.classList.remove('active');
            elements.modeBtnNeural?.classList.add('text-slate-600', 'dark:text-slate-300');
            if (elements.engineStatusLabel) {
                elements.engineStatusLabel.textContent = "Mode Editor Lokal Aktif (Offline & di Perangkat)";
            }
            if (!silent) showToast("Mode Editor Lokal Aktif: Berjalan offline tanpa kuota internet");
        }
    }

    elements.modeBtnNeural?.addEventListener('click', () => applyEngineMode('neural'));
    elements.modeBtnOffline?.addEventListener('click', () => applyEngineMode('offline'));
    applyEngineMode(state.engineMode, true);

    // 9. Tone & Intensity Buttons
    document.querySelectorAll('[data-tone]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-tone]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.tone = btn.getAttribute('data-tone');
            const cleanName = btn.innerText.replace(/^\s*•?\s*/, '').trim();
            showToast(`Gaya bahasa dipilih: ${cleanName}`);
        });
    });

    document.querySelectorAll('[data-intensity]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-intensity]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.intensity = btn.getAttribute('data-intensity');
            const cleanLevel = btn.innerText.replace(/^\s*•?\s*/, '').trim();
            showToast(`Intensitas bypass: ${cleanLevel}`);
        });
    });

    // Language selector change
    elements.langSelect?.addEventListener('change', (e) => {
        state.lang = e.target.value;
        showToast(`Bahasa diubah ke ${elements.langSelect.options[elements.langSelect.selectedIndex].text}`);
    });

    // 10. Sample Buttons
    function loadSampleText(type) {
        const langData = window.LANGUAGES[state.lang] || window.LANGUAGES['id'];
        const sample = langData.samplePrompts[type] || langData.samplePrompts['academic'];
        elements.sourceText.value = sample;
        elements.outputText.value = '';
        updateInputStats();
        showToast(`Sampel teks ${type} dimuat.`);
    }

    elements.sampleTuton?.addEventListener('click', () => loadSampleText('tuton'));
    elements.sampleAcademic?.addEventListener('click', () => loadSampleText('academic'));
    elements.sampleFormal?.addEventListener('click', () => loadSampleText('formal'));
    elements.sampleCasual?.addEventListener('click', () => loadSampleText('casual'));

    // 11. Clear & Paste
    elements.btnClear?.addEventListener('click', () => {
        elements.sourceText.value = '';
        elements.outputText.value = '';
        elements.diffContainer.innerHTML = '';
        elements.analysisContainer.innerHTML = '';
        clearActiveDoc();
        updateInputStats();
        elements.outputWordCount.textContent = '0 kata';
        elements.outputCharCount.textContent = '0 karakter';
        updateScoreGauge(100);
        showToast("Teks dibersihkan.");
    });

    elements.btnPaste?.addEventListener('click', async () => {
        try {
            const clipText = await navigator.clipboard.readText();
            if (clipText) {
                elements.sourceText.value = clipText;
                updateInputStats();
                showToast("Teks berhasil ditempel dari clipboard.");
            }
        } catch (e) {
            elements.sourceText.focus();
            showToast("Silakan gunakan Ctrl+V untuk menempel.", "info");
        }
    });

    // 12. View Mode Switchers
    function setViewMode(mode) {
        state.viewMode = mode;
        [elements.tabEditor, elements.tabDiff, elements.tabAnalysis].forEach(t => {
            t?.classList.remove('bg-indigo-600', 'text-white');
            t?.classList.add('text-slate-600', 'dark:text-slate-300');
        });

        elements.outputText.classList.add('hidden');
        elements.diffContainer.classList.add('hidden');
        elements.analysisContainer.classList.add('hidden');

        if (mode === 'raw') {
            elements.tabEditor?.classList.add('bg-indigo-600', 'text-white');
            elements.outputText.classList.remove('hidden');
        } else if (mode === 'diff') {
            elements.tabDiff?.classList.add('bg-indigo-600', 'text-white');
            elements.diffContainer.classList.remove('hidden');
            renderDiff();
        } else if (mode === 'analysis') {
            elements.tabAnalysis?.classList.add('bg-indigo-600', 'text-white');
            elements.analysisContainer.classList.remove('hidden');
            renderSentenceAnalysis();
        }
    }

    elements.tabEditor?.addEventListener('click', () => setViewMode('raw'));
    elements.tabDiff?.addEventListener('click', () => setViewMode('diff'));
    elements.tabAnalysis?.addEventListener('click', () => setViewMode('analysis'));

    // 13. Render Diff View
    function renderDiff() {
        if (!state.outputText) {
            elements.diffContainer.innerHTML = `<div class="p-8 text-center text-slate-400">Konversikan teks terlebih dahulu untuk melihat perbandingan perubahan kata.</div>`;
            return;
        }

        const originalWords = (state.inputText || '').split(/\s+/).filter(Boolean);
        const origSet = new Set(originalWords.map(w => w.toLowerCase().replace(/[^a-zA-Zà-ž0-9_-]/g, '')));

        const lines = (state.outputText || '').split(/\r?\n/);
        let html = '<div class="leading-relaxed p-4 font-sans text-slate-800 dark:text-slate-200 space-y-2">';

        lines.forEach(line => {
            if (line.trim().length === 0) {
                html += '<div class="h-4"></div>';
                return;
            }
            let lineHtml = '<div>';
            const words = line.split(/[ \t]+/).filter(Boolean);
            words.forEach(word => {
                const clean = word.toLowerCase().replace(/[^a-zA-Zà-ž0-9_-]/g, '');
                if (clean && !origSet.has(clean)) {
                    lineHtml += `<span class="diff-added">${word}</span> `;
                } else {
                    lineHtml += `${word} `;
                }
            });
            lineHtml += '</div>';
            html += lineHtml;
        });

        html += '</div>';
        elements.diffContainer.innerHTML = html;
    }

    // 14. Render Sentence-by-Sentence Writing Quality Analysis
    function renderSentenceAnalysis() {
        if (!state.outputText) {
            elements.analysisContainer.innerHTML = `<div class="p-8 text-center text-slate-400">Belum ada hasil penyuntingan untuk dianalisis.</div>`;
            return;
        }

        const analysis = detector.analyze(state.outputText);
        let html = `<div class="p-4 space-y-3">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
                <span class="text-slate-500">Pemindaian Kejernihan & Karakteristik Kalimat</span>
                <div class="flex items-center gap-2">
                    <span class="flex items-center gap-1 text-emerald-600"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Alami & Mengalir</span>
                    <span class="flex items-center gap-1 text-indigo-600"><span class="w-2 h-2 rounded-full bg-indigo-500"></span> Cukup Alami</span>
                    <span class="flex items-center gap-1 text-amber-600"><span class="w-2 h-2 rounded-full bg-amber-500"></span> Perlu Penyelarasan</span>
                </div>
            </div>`;

        analysis.sentences.forEach((s, idx) => {
            let badgeClass = 'highlight-human';
            let labelText = 'Alami & Mengalir';

            if (s.qualityScore < 60) {
                badgeClass = 'highlight-ai';
                labelText = 'Perlu Penyelarasan Diksi';
            } else if (s.qualityScore < 80) {
                badgeClass = 'highlight-mixed';
                labelText = 'Cukup Alami';
            }

            html += `<div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 text-sm">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-slate-400 font-mono">Kalimat #${idx + 1} (${s.wordCount} kata)</span>
                    <span class="text-xs px-2 py-0.5 rounded font-medium ${badgeClass}">${labelText}</span>
                </div>
                <p class="text-slate-700 dark:text-slate-300">${s.text}</p>
            </div>`;
        });

        html += `</div>`;
        elements.analysisContainer.innerHTML = html;
    }

    // 15. The Humanize Execution Flow
    async function handleHumanize() {
        const text = elements.sourceText.value.trim();
        if (!text) {
            showToast("Masukkan teks terlebih dahulu.", "warning");
            elements.sourceText.focus();
            return;
        }

        if (state.engineMode === 'neural') {
            if (!apiService.config.apiKey || apiService.config.provider === 'offline') {
                showToast("Mode Neural AI membutuhkan API Key. Masukkan API Key di Pengaturan, atau beralih ke Editor Lokal.", "warning");
                openSettings();
                return;
            }
        }

        elements.btnHumanize.disabled = true;
        elements.btnHumanize.classList.add('opacity-70', 'cursor-not-allowed');
        const origBtnHtml = elements.btnHumanize.innerHTML;
        elements.btnHumanize.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Menyempurnakan Naskah...
        `;

        try {
            let result = "";
            let usedEngine = state.engineMode;

            if (state.engineMode === 'neural') {
                result = await apiService.humanizeWithAI(text, {
                    tone: state.tone,
                    lang: state.lang,
                    intensity: state.intensity
                });
                usedEngine = apiService.config.provider;
            } else {
                result = humanizer.humanize(text, {
                    tone: state.tone,
                    lang: state.lang,
                    intensity: state.intensity,
                    voiceProfile: apiService.voiceProfile
                });
                usedEngine = 'offline';
            }

            if (!result || !result.trim()) {
                throw new Error("Hasil penyuntingan kosong. Silakan coba lagi.");
            }

            state.outputText = result;
            elements.outputText.value = result;

            // Output stats
            const outWords = result.trim() ? result.trim().split(/\s+/).length : 0;
            elements.outputWordCount.textContent = `${outWords} kata`;
            elements.outputCharCount.textContent = `${result.length} karakter`;

            // Run genuine writing quality analysis without score faking
            const analysis = detector.analyze(result, text);
            updateScoreGauge(analysis.qualityScore);
            updateMetricBadges(analysis);
            saveHistoryEntry(text, result, analysis.qualityScore);

            // Re-render subviews if active
            if (state.viewMode === 'diff') renderDiff();
            if (state.viewMode === 'analysis') renderSentenceAnalysis();

            const isProfileActive = !!(apiService.voiceProfile && apiService.voiceProfile.enabled);
            let engineLabel = usedEngine === 'offline' ? 'Editor Lokal' : `Neural AI (${usedEngine.toUpperCase()})`;
            if (isProfileActive) engineLabel += ' [Profil Gaya Aktif]';
            showToast(`Naskah berhasil disempurnakan via ${engineLabel}`);
        } catch (err) {
            console.error(err);
            showToast(err.message || "Gagal menyempurnakan naskah.", "error");
        } finally {
            elements.btnHumanize.disabled = false;
            elements.btnHumanize.classList.remove('opacity-70', 'cursor-not-allowed');
            elements.btnHumanize.innerHTML = origBtnHtml;
            if (window.lucide) lucide.createIcons();
        }
    }

    elements.btnHumanize?.addEventListener('click', handleHumanize);
    elements.btnRehumanize?.addEventListener('click', handleHumanize);

    // 16. Copy to Clipboard
    elements.btnCopy?.addEventListener('click', async () => {
        const text = elements.outputText.value;
        if (!text) {
            showToast("Tidak ada teks untuk disalin.", "warning");
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            showToast("Teks humanize berhasil disalin ke clipboard!");
        } catch (e) {
            elements.outputText.select();
            document.execCommand('copy');
            showToast("Teks berhasil disalin!");
        }
    });

    // 17. Download File (.txt) — always available
    function downloadTxt() {
        const text = elements.outputText.value;
        if (!text) { showToast("Tidak ada teks untuk diunduh.", "warning"); return; }
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `humanized-text-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("File .txt berhasil diunduh.");
    }

    // Download dropdown toggle
    elements.btnDownload?.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = elements.downloadMenu;
        if (!menu) return;
        menu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        const wrap = elements.downloadMenuWrap;
        if (wrap && !wrap.contains(e.target)) {
            elements.downloadMenu?.classList.add('hidden');
        }
    });

    // Download TXT from dropdown
    elements.btnDownloadTxt?.addEventListener('click', () => {
        elements.downloadMenu?.classList.add('hidden');
        downloadTxt();
    });

    // Download DOCX from dropdown (fresh DOCX from humanized text — no source doc needed)
    elements.btnDownloadDocx?.addEventListener('click', async () => {
        elements.downloadMenu?.classList.add('hidden');
        const text = elements.outputText.value;
        if (!text) { showToast("Tidak ada teks untuk diunduh.", "warning"); return; }

        if (typeof DocumentProcessor === 'undefined') {
            showToast("Modul dokumen belum dimuat, coba refresh halaman.", "warning");
            return;
        }

        // If there's an active uploaded doc, use format-preserving download
        if (state.activeDoc) {
            try {
                showToast("Menyusun dokumen...");
                await state.activeDoc.download(text);
                showToast("Dokumen berhasil diunduh dengan format asli dipertahankan!");
            } catch (err) {
                console.error(err);
                showToast("Gagal menghasilkan dokumen: " + err.message, "warning");
            }
        } else {
            // Create a fresh DOCX from plain humanized text
            try {
                const proc = new DocumentProcessor();
                proc.sourceFile = { name: 'humanized-document.pdf' }; // triggers PDF→DOCX path
                proc._downloadDocxFromText(text, 'humanized-output.pdf');
                showToast("Dokumen Word (.docx) berhasil diunduh!");
            } catch (err) {
                console.error(err);
                showToast("Gagal membuat DOCX: " + err.message, "warning");
            }
        }
    });

    // 17b. Document Upload & Format-Preserving Download
    // ──────────────────────────────────────────────────
    function showActiveFileBadge(file) {
        const ext = file.name.split('.').pop().toUpperCase();
        if (elements.activeFileBadge) elements.activeFileBadge.classList.remove('hidden');
        if (elements.activeFileName) elements.activeFileName.textContent = file.name;
        if (elements.activeFileType) elements.activeFileType.textContent = ext;
        if (elements.btnDownloadDoc) elements.btnDownloadDoc.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    }

    function clearActiveDoc() {
        state.activeDoc = null;
        if (elements.activeFileBadge) elements.activeFileBadge.classList.add('hidden');
        if (elements.btnDownloadDoc) elements.btnDownloadDoc.classList.add('hidden');
        if (elements.fileInput) elements.fileInput.value = '';
    }

    async function handleDocumentUpload(file) {
        if (!file) return;

        const ext = file.name.split('.').pop().toLowerCase();
        if (!['pdf', 'docx'].includes(ext)) {
            showToast("Format tidak didukung. Pilih file .pdf atau .docx", "warning");
            return;
        }

        if (typeof DocumentProcessor === 'undefined') {
            showToast("Modul dokumen belum siap, coba refresh halaman.", "warning");
            return;
        }

        // Show loading state
        if (elements.btnUploadDoc) {
            elements.btnUploadDoc.disabled = true;
            const origHtml = elements.btnUploadDoc.innerHTML;
            elements.btnUploadDoc.innerHTML = '<svg class="animate-spin w-3.5 h-3.5 inline" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>';

            try {
                const proc = new DocumentProcessor();
                const extractedText = await proc.load(file);

                if (!extractedText || !extractedText.trim()) {
                    showToast("Dokumen tidak mengandung teks yang dapat diproses.", "warning");
                    return;
                }

                state.activeDoc = proc;
                elements.sourceText.value = extractedText;
                updateInputStats();
                showActiveFileBadge(file);

                const wordCount = extractedText.trim().split(/s+/).length;
                showToast(`Dokumen dimuat: ${wordCount} kata dari ${file.name}`);

                // Scroll to input area
                elements.sourceText.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (err) {
                console.error(err);
                showToast("Gagal memuat dokumen: " + err.message, "warning");
                clearActiveDoc();
            } finally {
                elements.btnUploadDoc.disabled = false;
                elements.btnUploadDoc.innerHTML = origHtml;
                if (window.lucide) lucide.createIcons();
            }
        }
    }

    // Upload button click → open file picker
    elements.btnUploadDoc?.addEventListener('click', () => {
        elements.fileInput?.click();
    });

    // File picker change → process selected file
    elements.fileInput?.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) handleDocumentUpload(file);
    });

    // Drag-and-drop onto the source textarea area
    const dropTarget = elements.sourceText?.closest('.card-soft');
    if (dropTarget) {
        dropTarget.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropTarget.classList.add('ring-2', 'ring-indigo-400', 'ring-offset-1');
        });
        dropTarget.addEventListener('dragleave', () => {
            dropTarget.classList.remove('ring-2', 'ring-indigo-400', 'ring-offset-1');
        });
        dropTarget.addEventListener('drop', (e) => {
            e.preventDefault();
            dropTarget.classList.remove('ring-2', 'ring-indigo-400', 'ring-offset-1');
            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            if (file) handleDocumentUpload(file);
        });
    }

    // Clear active document
    elements.btnClearDoc?.addEventListener('click', () => {
        clearActiveDoc();
        elements.sourceText.value = '';
        elements.outputText.value = '';
        updateInputStats();
        elements.outputWordCount.textContent = '0 kata';
        elements.outputCharCount.textContent = '0 karakter';
        updateScoreGauge(100);
        showToast("Dokumen dihapus, area teks dikosongkan.");
    });

    // "Unduh Dokumen" primary button (only visible when a doc is uploaded)
    elements.btnDownloadDoc?.addEventListener('click', async () => {
        const text = elements.outputText.value;
        if (!text) { showToast("Humanize teks terlebih dahulu sebelum mengunduh.", "warning"); return; }
        if (!state.activeDoc) { downloadTxt(); return; }

        try {
            showToast("Menyusun dokumen dengan format asli...");
            await state.activeDoc.download(text);
            showToast("Dokumen berhasil diunduh! Format asli (margin, font, spasi) dipertahankan.");
        } catch (err) {
            console.error(err);
            showToast("Gagal mengunduh dokumen: " + err.message, "warning");
        }
    });


    // 18. Settings Modal (BYOK & Voice Profile)
    function updateVoiceProfileUIState() {
        const isEnabled = elements.voiceProfileToggle ? elements.voiceProfileToggle.checked : false;
        if (elements.voiceProfileStatusBadge) {
            if (isEnabled) {
                elements.voiceProfileStatusBadge.textContent = 'Aktif';
                elements.voiceProfileStatusBadge.className = 'text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
            } else {
                elements.voiceProfileStatusBadge.textContent = 'Nonaktif';
                elements.voiceProfileStatusBadge.className = 'text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
            }
        }

        if (elements.voiceProfileSubtitle) {
            elements.voiceProfileSubtitle.textContent = state.engineMode === 'offline'
                ? 'Editor Lokal (Di Perangkat, Tanpa Cloud LLM)'
                : 'Neural AI (Prompt Injection LLM)';
        }
    }

    function openSettings() {
        elements.apiProviderSelect.value = apiService.config.provider || 'offline';
        elements.apiKeyInput.value = apiService.config.apiKey || '';
        elements.apiModelInput.value = apiService.config.model || '';
        if (elements.twoPassCheckbox) {
            elements.twoPassCheckbox.checked = !!apiService.config.twoPassReview;
        }

        // Voice Profile Configuration
        if (elements.voiceProfileToggle) {
            elements.voiceProfileToggle.checked = !!apiService.voiceProfile.enabled;
        }
        if (elements.voiceFormalitySelect) {
            elements.voiceFormalitySelect.value = apiService.voiceProfile.formality || 'balanced';
        }
        if (elements.voiceAudienceSelect) {
            const currentAud = apiService.voiceProfile.audience || '';
            const opts = Array.from(elements.voiceAudienceSelect.options).map(o => o.value);
            elements.voiceAudienceSelect.value = opts.includes(currentAud) ? currentAud : '';
        }
        if (elements.voiceAudienceInput) {
            elements.voiceAudienceInput.value = apiService.voiceProfile.audience || '';
        }
        if (elements.voicePreferredInput) {
            elements.voicePreferredInput.value = apiService.voiceProfile.preferredPhrases || '';
        }
        if (elements.voiceAvoidInput) {
            elements.voiceAvoidInput.value = apiService.voiceProfile.avoidPhrases || '';
        }
        if (elements.voiceSampleTextarea) {
            elements.voiceSampleTextarea.value = apiService.voiceProfile.sampleText || '';
        }
        updateVoiceProfileUIState();

        document.querySelectorAll('.settings-theme-btn').forEach(btn => {
            const choice = btn.getAttribute('data-theme-choice');
            if (choice === state.theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.body.classList.add('modal-open');
        elements.modalSettings.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    }

    function closeSettings() {
        elements.modalSettings.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }

    elements.btnOpenSettings?.addEventListener('click', openSettings);
    elements.btnCloseSettings?.addEventListener('click', closeSettings);
    elements.modalSettings?.addEventListener('click', (e) => {
        if (e.target === elements.modalSettings) closeSettings();
    });

    // Voice Profile Accordion Toggle
    function toggleVoiceAccordion() {
        const panel = elements.voiceProfilePanel;
        if (!panel) return;
        const isHidden = panel.classList.toggle('hidden');
        if (elements.voiceProfileChevron) {
            elements.voiceProfileChevron.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
        }
        if (window.lucide) lucide.createIcons();
    }

    elements.voiceProfileAccordionHeader?.addEventListener('click', toggleVoiceAccordion);
    elements.toggleVoiceProfile?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleVoiceAccordion();
    });

    elements.voiceProfileToggle?.addEventListener('change', updateVoiceProfileUIState);

    // Sync audience select with input
    elements.voiceAudienceSelect?.addEventListener('change', () => {
        if (elements.voiceAudienceSelect.value && elements.voiceAudienceInput) {
            elements.voiceAudienceInput.value = elements.voiceAudienceSelect.value;
        }
    });

    // Reset Voice Profile
    elements.btnResetVoiceProfile?.addEventListener('click', () => {
        apiService.resetVoiceProfile();
        if (elements.voiceProfileToggle) elements.voiceProfileToggle.checked = false;
        if (elements.voiceFormalitySelect) elements.voiceFormalitySelect.value = 'balanced';
        if (elements.voiceAudienceSelect) elements.voiceAudienceSelect.value = '';
        if (elements.voiceAudienceInput) elements.voiceAudienceInput.value = '';
        if (elements.voicePreferredInput) elements.voicePreferredInput.value = '';
        if (elements.voiceAvoidInput) elements.voiceAvoidInput.value = '';
        if (elements.voiceSampleTextarea) elements.voiceSampleTextarea.value = '';
        updateVoiceProfileUIState();
        showToast("Profil gaya penulis berhasil direset ke pengaturan bawaan.");
    });

    // Save Settings
    elements.btnSaveSettings?.addEventListener('click', () => {
        apiService.saveConfig({
            provider: elements.apiProviderSelect.value,
            apiKey: elements.apiKeyInput.value.trim(),
            model: elements.apiModelInput.value.trim(),
            twoPassReview: elements.twoPassCheckbox ? elements.twoPassCheckbox.checked : false
        });

        const effectiveAudience = elements.voiceAudienceInput ? elements.voiceAudienceInput.value.trim() : '';

        apiService.saveVoiceProfile({
            enabled: elements.voiceProfileToggle ? elements.voiceProfileToggle.checked : false,
            formality: elements.voiceFormalitySelect ? elements.voiceFormalitySelect.value : 'balanced',
            audience: effectiveAudience,
            preferredPhrases: elements.voicePreferredInput ? elements.voicePreferredInput.value.trim() : '',
            avoidPhrases: elements.voiceAvoidInput ? elements.voiceAvoidInput.value.trim() : '',
            sampleText: elements.voiceSampleTextarea ? elements.voiceSampleTextarea.value.trim() : ''
        });

        applyEngineMode(state.engineMode, true);
        closeSettings();
        showToast("Pengaturan engine dan profil gaya penulis berhasil disimpan.");
    });

    elements.btnClearApiConfig?.addEventListener('click', () => {
        apiService.clearConfig();
        elements.apiKeyInput.value = '';
        elements.apiModelInput.value = '';
        elements.apiProviderSelect.value = 'offline';
        applyEngineMode('offline', true);
        showToast("Kunci API berhasil dihapus dari browser Anda.");
    });

    // Mobile Header Dropdown Menu Handlers
    elements.btnMobileMenu?.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = elements.mobileMenuDropdown;
        if (!dropdown) return;
        const isClosed = dropdown.classList.toggle('hidden');
        elements.btnMobileMenu.setAttribute('aria-expanded', !isClosed);
    });

    document.addEventListener('click', (e) => {
        if (elements.mobileMenuDropdown && !elements.mobileMenuDropdown.classList.contains('hidden')) {
            if (!elements.btnMobileMenu?.contains(e.target) && !elements.mobileMenuDropdown.contains(e.target)) {
                elements.mobileMenuDropdown.classList.add('hidden');
                elements.btnMobileMenu?.setAttribute('aria-expanded', 'false');
            }
        }
    });

    elements.btnMobileHistory?.addEventListener('click', () => {
        elements.mobileMenuDropdown?.classList.add('hidden');
        openHistory();
    });

    elements.btnMobileSupport?.addEventListener('click', () => {
        elements.mobileMenuDropdown?.classList.add('hidden');
        openSupport();
    });

    elements.langSelectMobile?.addEventListener('change', (e) => {
        state.lang = e.target.value;
        if (elements.langSelect) elements.langSelect.value = state.lang;
        elements.mobileMenuDropdown?.classList.add('hidden');
        showToast(`Bahasa diubah ke ${elements.langSelectMobile.options[elements.langSelectMobile.selectedIndex].text}`);
    });

    // 19. History Drawer/Modal
    function renderHistory() {
        if (!state.history.length) {
            elements.historyList.innerHTML = `<div class="text-center py-12 text-slate-400">Belum ada riwayat konversi.</div>`;
            return;
        }

        let html = '';
        state.history.forEach(item => {
            html += `<div class="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>${item.date} • Gaya ${item.tone.toUpperCase()}</span>
                    <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">${item.humanScore}% Manusia</span>
                </div>
                <p class="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">${item.humanized}</p>
                <div class="flex justify-end">
                    <button data-restore-id="${item.id}" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Buka Teks Ini</button>
                </div>
            </div>`;
        });

        elements.historyList.innerHTML = html;

        // Restore listeners
        document.querySelectorAll('[data-restore-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.getAttribute('data-restore-id'));
                const found = state.history.find(h => h.id === id);
                if (found) {
                    elements.sourceText.value = found.original;
                    elements.outputText.value = found.humanized;
                    state.inputText = found.original;
                    state.outputText = found.humanized;
                    updateInputStats();
                    updateScoreGauge(found.humanScore);
                    elements.outputWordCount.textContent = `${found.humanized.split(/\s+/).filter(Boolean).length} kata`;
                    elements.outputCharCount.textContent = `${found.humanized.length} karakter`;
                    closeHistory();
                    showToast("Teks dipulihkan dari riwayat.");
                }
            });
        });
    }

    function openHistory() {
        renderHistory();
        document.body.classList.add('modal-open');
        elements.modalHistory.classList.remove('hidden');
    }

    function closeHistory() {
        elements.modalHistory.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }

    elements.btnOpenHistory?.addEventListener('click', openHistory);
    elements.btnCloseHistory?.addEventListener('click', closeHistory);
    elements.modalHistory?.addEventListener('click', (e) => {
        if (e.target === elements.modalHistory) closeHistory();
    });

    elements.btnClearHistory?.addEventListener('click', () => {
        state.history = [];
        localStorage.removeItem('humanize_history_v1');
        renderHistory();
        showToast("Riwayat berhasil dihapus.");
    });

    // 20. Support QRIS Modal
    function openSupport() {
        if (elements.modalSupport) {
            document.body.classList.add('modal-open');
            elements.modalSupport.classList.remove('hidden');
        }
    }

    function closeSupport() {
        if (elements.modalSupport) {
            elements.modalSupport.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }
    }

    elements.btnOpenSupport?.addEventListener('click', openSupport);
    elements.btnOpenSupportCallout?.addEventListener('click', openSupport);
    elements.btnCloseSupport?.addEventListener('click', closeSupport);
    elements.btnCloseSupportBtn?.addEventListener('click', closeSupport);
    elements.modalSupport?.addEventListener('click', (e) => {
        if (e.target === elements.modalSupport) closeSupport();
    });

    // Close any modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSupport();
            closeSettings();
            closeHistory();
        }
    });

    // 21. Load Initial Academic Sample for immediate ready-to-test experience
    loadSampleText('academic');
    updateScoreGauge(88);
});

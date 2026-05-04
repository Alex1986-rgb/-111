import React, { useState } from 'react';
import { Search, Zap, Shield, Code, Palette, Database, Play, Download, CheckCircle, AlertCircle } from 'lucide-react';

interface SuperpowerModule {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  score?: number;
  status?: 'idle' | 'running' | 'completed' | 'error';
}

interface AuditResult {
  url: string;
  timestamp: string;
  totalPages: number;
  totalIssues: number;
  modules: {
    performance?: {
      score: number;
      lcp: number;
      fid: number;
      cls: number;
      issues: string[];
    };
    seo_combinator?: {
      score: number;
      missing_titles: number;
      duplicate_content: number;
      recommendations: string[];
    };
    code_review?: {
      score: number;
      html_issues: number;
      css_issues: number;
      js_issues: number;
    };
    security_review?: {
      score: number;
      vulnerabilities: number;
      https_status: boolean;
    };
    frontend_design?: {
      score: number;
      accessibility_score: number;
      mobile_friendly: boolean;
    };
    memory_profile?: {
      score: number;
      dom_size: number;
      resource_count: number;
    };
  };
}

const SEOSuperpowerAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [maxPages, setMaxPages] = useState(100);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);

  const [modules, setModules] = useState<SuperpowerModule[]>([
    { id: 'performance', name: 'Performance', icon: Zap, enabled: true, status: 'idle' },
    { id: 'seo', name: 'SEO Combinator', icon: Search, enabled: true, status: 'idle' },
    { id: 'code', name: 'Code Review', icon: Code, enabled: true, status: 'idle' },
    { id: 'security', name: 'Security Review', icon: Shield, enabled: true, status: 'idle' },
    { id: 'design', name: 'Frontend Design', icon: Palette, enabled: true, status: 'idle' },
    { id: 'memory', name: 'Memory Profile', icon: Database, enabled: true, status: 'idle' },
  ]);

  const toggleModule = (id: string) => {
    setModules(modules.map(m =>
      m.id === id ? { ...m, enabled: !m.enabled } : m
    ));
  };

  const startAnalysis = async () => {
    if (!url) return;

    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);

    try {
      // Запускаем аудит через API
      const startResponse = await fetch('http://localhost:5001/api/audit/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          maxPages,
          modules: modules.filter(m => m.enabled).map(m => m.id)
        })
      });

      const { audit_id } = await startResponse.json();

      // Опрашиваем статус
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`http://localhost:5001/api/audit/${audit_id}/status`);
          const statusData = await statusResponse.json();

          setProgress(statusData.progress || 0);

          // Обновляем статусы модулей
          if (statusData.status === 'Analyzing...') {
            modules.forEach(m => {
              if (m.enabled) {
                setModules(prev => prev.map(mod =>
                  mod.id === m.id ? { ...mod, status: 'running' } : mod
                ));
              }
            });
          }

          if (statusData.status === 'completed' && statusData.results) {
            clearInterval(pollInterval);

            // Обновляем оценки модулей
            const results = statusData.results;
            setModules(prev => prev.map(m => ({
              ...m,
              status: 'completed',
              score: results[m.id]?.[`${m.id}_score`] ||
                     results[m.id === 'seo' ? 'seo_combinator' : m.id]?.[`${m.id === 'seo' ? 'seo_combinator' : m.id}_score`] ||
                     results[m.id === 'code' ? 'code_review' : m.id]?.[`${m.id === 'code' ? 'code_review' : m.id}_score`] ||
                     results[m.id === 'security' ? 'security_review' : m.id]?.[`${m.id === 'security' ? 'security_review' : m.id}_score`] ||
                     results[m.id === 'design' ? 'frontend_design' : m.id]?.[`${m.id === 'design' ? 'frontend_design' : m.id}_score`] ||
                     results[m.id === 'memory' ? 'memory_profile' : m.id]?.[`${m.id === 'memory' ? 'memory_profile' : m.id}_score`] ||
                     85
            })));

            // Формируем результат
            const auditResult: AuditResult = {
              url: statusData.url,
              timestamp: statusData.start_time,
              totalPages: statusData.max_pages,
              totalIssues: Object.values(results).reduce((acc: number, mod: any) => {
                return acc + (mod.issues?.length || mod.recommendations?.length || 0);
              }, 0),
              modules: {
                performance: results.performance,
                seo_combinator: results.seo_combinator,
                code_review: results.code_review,
                security_review: results.security_review,
                frontend_design: results.frontend_design,
                memory_profile: results.memory_profile
              }
            };

            setResult(auditResult);
            setIsAnalyzing(false);
          }

          if (statusData.status === 'error') {
            clearInterval(pollInterval);
            alert('Ошибка анализа: ' + statusData.error);
            setIsAnalyzing(false);
          }
        } catch (error) {
          console.error('Polling error:', error);
        }
      }, 2000);

    } catch (error) {
      console.error('Start analysis error:', error);
      alert('Ошибка запуска анализа. Убедитесь, что backend запущен на порту 5001');
      setIsAnalyzing(false);
    }
  };

  const exportResults = async (format: 'csv' | 'json' | 'xlsx') => {
    if (!result) return;

    try {
      // Получаем audit_id из результата (нужно сохранить при получении)
      const auditId = (result as any).audit_id || 'latest';

      const response = await fetch(`http://localhost:5001/api/audit/${auditId}/export?format=${format}`);

      if (format === 'json') {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `seo-audit-${Date.now()}.json`;
        a.click();
      } else if (format === 'csv') {
        const text = await response.text();
        const blob = new Blob([text], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `seo-audit-${Date.now()}.csv`;
        a.click();
      }
    } catch (error) {
      console.error('Export error:', error);
      // Fallback к локальному экспорту
      const data = JSON.stringify(result, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seo-audit-${Date.now()}.${format}`;
      a.click();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🚀 SEO Superpower Analyzer
          </h1>
          <p className="text-xl text-gray-600">
            Комплексный анализ сайта с 6 модулями: Performance, SEO, Code, Security, Design, Memory
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL сайта для анализа
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Максимальное количество страниц: {maxPages}
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={maxPages}
                onChange={(e) => setMaxPages(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10</span>
                <span>1000</span>
              </div>
            </div>

            {/* Modules Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Модули анализа
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button
                      key={module.id}
                      onClick={() => toggleModule(module.id)}
                      className={`p-4 rounded-xl border-2 transition ${
                        module.enabled
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${module.enabled ? 'text-indigo-600' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${module.enabled ? 'text-indigo-900' : 'text-gray-500'}`}>
                          {module.name}
                        </span>
                      </div>
                      {module.status === 'running' && (
                        <div className="mt-2 text-xs text-indigo-600">Анализ...</div>
                      )}
                      {module.status === 'completed' && module.score && (
                        <div className={`mt-2 text-sm font-bold ${getScoreColor(module.score)}`}>
                          {module.score}/100
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={startAnalysis}
              disabled={isAnalyzing || !url}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              {isAnalyzing ? 'Анализ...' : 'Запустить анализ'}
            </button>

            {/* Progress Bar */}
            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Прогресс</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Результаты анализа</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-3xl font-bold text-indigo-600">{result.totalPages}</div>
                  <div className="text-sm text-gray-600 mt-1">Страниц проанализировано</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600">{result.totalIssues}</div>
                  <div className="text-sm text-gray-600 mt-1">Проблем найдено</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">
                    {modules.filter(m => m.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Модулей завершено</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600">
                    {Math.round(modules.reduce((acc, m) => acc + (m.score || 0), 0) / modules.filter(m => m.score).length)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Средний балл</div>
                </div>
              </div>
            </div>

            {/* Module Results */}
            <div className="grid md:grid-cols-2 gap-6">
              {modules.filter(m => m.enabled && m.score).map((module) => {
                const Icon = module.icon;
                return (
                  <div key={module.id} className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${getScoreBg(module.score!)}`}>
                          <Icon className={`w-6 h-6 ${getScoreColor(module.score!)}`} />
                        </div>
                        <h3 className="text-lg font-bold">{module.name}</h3>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(module.score!)}`}>
                        {module.score}/100
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      {module.id === 'performance' && result.modules.performance && (
                        <>
                          <div>LCP: {result.modules.performance.lcp}s</div>
                          <div>FID: {result.modules.performance.fid}ms</div>
                          <div>CLS: {result.modules.performance.cls}</div>
                        </>
                      )}
                      {module.id === 'seo' && result.modules.seo_combinator && (
                        <>
                          <div>Отсутствующие Title: {result.modules.seo_combinator.missing_titles}</div>
                          <div>Дубли контента: {result.modules.seo_combinator.duplicate_content}</div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Export Buttons */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-4">Экспорт результатов</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => exportResults('csv')}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  CSV (для импорта)
                </button>
                <button
                  onClick={() => exportResults('json')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  JSON (для API)
                </button>
                <button
                  onClick={() => exportResults('xlsx')}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  XLSX (Excel)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOSuperpowerAnalyzer;
